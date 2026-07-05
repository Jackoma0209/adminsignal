import { isNoindexHref } from '@/lib/noindex'

/**
 * Consent, analytics, and advertising configuration layer.
 *
 * Environment flags (set in .env.local or Vercel env vars):
 *   NEXT_PUBLIC_GA_ENABLED=true                  — requests Google Analytics loading
 *   NEXT_PUBLIC_ADSENSE_ENABLED=true             — requests AdSense script loading
 *   NEXT_PUBLIC_ADS_ENABLED=true                 — requests live AdSense ad units
 *   NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED=true
 *                                                — confirms a Google-certified CMP
 *                                                   with IAB TCF support is configured
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...          — GA4 measurement ID
 *
 * CMP integration point:
 *   AdminSignal does not ship a Google-certified CMP implementation in this repo.
 *   Before enabling personalised ads for users in the UK, EEA, or Switzerland,
 *   configure a Google-certified CMP integrated with IAB Europe's TCF and set
 *   NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED=true only after verification.
 *
 *   When a Google-certified CMP is connected, call:
 *     gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ... })
 *   after the user grants consent. The consent defaults below keep all storage
 *   denied until that update fires.
 */

export const ADSENSE_SELLER_PUBLISHER_ID = 'pub-5563142788194204'
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? 'ca-pub-5563142788194204'

export const googleCertifiedCmpConfigured =
  process.env.NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED === 'true'

export const googleTagsRequested =
  process.env.NEXT_PUBLIC_GA_ENABLED === 'true' ||
  process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' ||
  process.env.NEXT_PUBLIC_ADS_ENABLED === 'true'

/**
 * Non-essential Google tags are disabled unless a real CMP has been configured.
 * This is intentionally conservative for AdSense review: the repo should not
 * load analytics or ad scripts while claiming consent readiness it does not have.
 */
export const analyticsEnabled =
  process.env.NEXT_PUBLIC_GA_ENABLED === 'true' && googleCertifiedCmpConfigured
export const adsenseScriptEnabled =
  process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' && googleCertifiedCmpConfigured
export const adsEnabled =
  process.env.NEXT_PUBLIC_ADS_ENABLED === 'true' && googleCertifiedCmpConfigured

const AD_SCRIPT_ELIGIBLE_PREFIXES = [
  '/news/',
  '/tutorials/',
  '/troubleshooting/',
  '/reviews/',
  '/comparisons/',
  '/guides/',
]

const AD_SCRIPT_SUPPRESSED_PATHS = new Set([
  '/',
  '/about',
  '/advertise',
  '/affiliate-disclosure',
  '/best-tools',
  '/contact',
  '/cookies',
  '/editorial-policy',
  '/privacy',
  '/reviews',
  '/search',
  '/scripts',
  '/terms',
  '/topics',
])

/**
 * Keep the AdSense loader off legal, search/noindex, listing, and topic pages.
 * Detail pages still require the CMP and AdSense feature flags above.
 */
export function isAdScriptEligiblePath(pathname: string): boolean {
  const normalized = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')

  if (AD_SCRIPT_SUPPRESSED_PATHS.has(normalized)) return false
  if (isNoindexHref(normalized)) return false

  return AD_SCRIPT_ELIGIBLE_PREFIXES.some((prefix) => normalized.startsWith(prefix))
}

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
