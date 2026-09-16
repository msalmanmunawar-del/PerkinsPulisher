/**
 * Global fetch accessor fix.
 * 
 * In sandboxed iframes or specialized web environments, `window.fetch` can be configured
 * as a getter-only property on `window` or `Window.prototype`. When scripts or ponyfills
 * (such as whatwg-fetch or third-party widgets) evaluate statements like `this.fetch = false`
 * on objects inheriting from `window`, or attempt to assign `window.fetch = ...`,
 * V8 throws `TypeError: Cannot set property fetch of #<Window> which has only a getter`.
 *
 * This module ensures `window.fetch` has a cooperative getter and setter across `window`
 * and its prototype chain, preventing uncaught runtime exceptions while preserving native fetch behavior.
 */

(function initFetchFix() {
  if (typeof window === 'undefined') return;

  try {
    const win = window as any;
    const nativeFetch = win.fetch ? win.fetch.bind(win) : null;
    if (!nativeFetch) return;

    let activeFetch = nativeFetch;

    const targets = [
      win,
      Object.getPrototypeOf(win),
      typeof Window !== 'undefined' ? Window.prototype : null
    ].filter(Boolean);

    targets.forEach((target) => {
      try {
        const descriptor = Object.getOwnPropertyDescriptor(target, 'fetch');
        if (!descriptor || (descriptor.get && !descriptor.set) || (!descriptor.writable && !descriptor.set)) {
          Object.defineProperty(target, 'fetch', {
            get() {
              return activeFetch;
            },
            set(newVal: any) {
              if (this === win || this === globalThis || this === target) {
                if (typeof newVal === 'function') {
                  activeFetch = newVal;
                }
              } else {
                try {
                  Object.defineProperty(this, 'fetch', {
                    value: newVal,
                    writable: true,
                    configurable: true,
                    enumerable: true
                  });
                } catch {
                  // Ignore if non-extensible
                }
              }
            },
            configurable: true,
            enumerable: true
          });
        }
      } catch {
        // Ignore errors on non-configurable targets
      }
    });
  } catch {
    // Fail silently
  }
})();
