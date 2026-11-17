/**
 * Triggers a crisp two-pulse tactile haptic confirmation pattern on supported mobile devices
 * (mirrors the two-tone confirmation chime) after an inquiry is verified as delivered.
 * Safely no-ops on desktop browsers or devices without Web Vibration API support.
 */
export function triggerDeliverySuccessHaptic(): boolean {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      return navigator.vibrate([35, 45, 75]);
    }
  } catch {
    // Ignore restricted/sandboxed browser errors
  }
  return false;
}
