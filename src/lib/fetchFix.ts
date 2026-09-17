/**
 * Global fetch accessor fix & runtime error suppressor.
 * 
 * In sandboxed iframes or specialized web environments, `window.fetch` can be configured
 * as a getter-only property on `window` or `Window.prototype`. When scripts, ponyfills,
 * or environment harnesses attempt to assign `window.fetch = ...`,
 * V8 throws `TypeError: Cannot set property fetch of #<Window> which has only a getter`.
 *
 * This module ensures `window.fetch` has a cooperative getter and setter across `window`
 * and its prototype chain, while intercepting unhandled getter-only runtime exceptions.
 */

(function initFetchFix() {
  if (typeof window === 'undefined') return;

  try {
    const isFetchGetterError = (e: any) => {
      if (!e) return false;
      const msg = typeof e === 'string' ? e : e.message || '';
      return msg.includes('fetch') && (msg.includes('only a getter') || msg.includes('Cannot set property'));
    };

    // 1. Intercept capture-phase window error events to swallow the benign TypeError
    window.addEventListener(
      'error',
      (event) => {
        if (isFetchGetterError(event.error) || isFetchGetterError(event.message)) {
          if (event.preventDefault) event.preventDefault();
          if (event.stopPropagation) event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          return true;
        }
      },
      true
    );

    // 2. Wrap window.onerror
    const prevOnError = window.onerror;
    window.onerror = function (message, source, lineno, colno, error) {
      if (isFetchGetterError(message) || isFetchGetterError(error)) {
        return true;
      }
      if (typeof prevOnError === 'function') {
        return prevOnError.apply(this, arguments as any);
      }
      return false;
    };

    // 3. Proactively configure window.fetch with cooperative getter/setter
    const win = window as any;
    const nativeFetch = typeof win.fetch === 'function' ? win.fetch.bind(win) : null;
    if (nativeFetch) {
      let activeFetch = nativeFetch;
      const targets = [
        win,
        Object.getPrototypeOf(win),
        typeof Window !== 'undefined' ? Window.prototype : null
      ].filter(Boolean);

      targets.forEach((target) => {
        try {
          const descriptor = Object.getOwnPropertyDescriptor(target, 'fetch');
          if (!descriptor || descriptor.configurable !== false) {
            Object.defineProperty(target, 'fetch', {
              get() {
                return activeFetch;
              },
              set(newVal: any) {
                if (typeof newVal === 'function') {
                  activeFetch = newVal;
                }
              },
              configurable: true,
              enumerable: true
            });
          }
        } catch {
          // Ignore non-configurable targets
        }
      });
    }
  } catch {
    // Fail silently
  }
})();

