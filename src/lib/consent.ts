/**
 * Consent and analytics configuration layer.
 *
 * Environment flags (set in .env.local or Vercel env vars):
 *   NEXT_PUBLIC_GA_ENABLED=true          — enables Google Analytics loading
 *   NEXT_PUBLIC_ADS_ENABLED=true         — enables live AdSense ad units (future)
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...  — GA4 measurement ID
 *
 * CMP integration point:
 *   When a Google-certified CMP is connected, call:
 *     gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ... })
 *   after the user grants consent. The consent defaults below keep all storage
 *   denied until that update fires.
 */

export const analyticsEnabled = process.env.NEXT_PUBLIC_GA_ENABLED === 'true'
export const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true'

/**
 * Google Consent Mode v2 defaults.
 * Injected before gtag.js loads so GA operates in cookieless/aggregate mode
 * until a CMP calls gtag('consent', 'update', {...}).
 */
export const CONSENT_DEFAULTS = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500,
} as const
