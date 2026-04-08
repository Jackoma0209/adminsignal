/**
 * Thin wrapper around window.gtag for firing GA4 custom events.
 * Only fires when gtag is available (GA loaded). Never sends PII.
 */

type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: GtagFn
  }
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params ?? {})
  }
}
