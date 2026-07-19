import { isNoindexHref } from '@/lib/noindex'

/**
 * Consent, analytics, and advertising configuration layer.
 *
 * Environment flags (set in .env.local or Vercel env vars):
 *   NEXT_PUBLIC_GA_ENABLED=true
 *   NEXT_PUBLIC_ADSENSE_ENABLED=true
 *   NEXT_PUBLIC_ADS_ENABLED=true
 *   NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED=true
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
 *
 * AdminSignal does not ship a Google-certified CMP implementation in this repo.
 * Keep all Google tag flags disabled until a certified CMP with the required
 * regional consent support is configured and verified in production.
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
 * Non-essential Google tags stay disabled unless a real certified CMP has been
 * configured. This prevents the site from claiming consent readiness while
 * loading analytics or advertising code without the intended consent layer.
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
 * Keep the AdSense loader off legal, search, noindex, listing, topic, unfinished
 * script, and research-only product-evaluation pages. Detail pages still require
 * the certified CMP and feature flags above.
 */
export function isAdScriptEligiblePath(pathname: string): boolean {
  const normalized = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')

  if (AD_SCRIPT_SUPPRESSED_PATHS.has(normalized)) return false
  if (isNoindexHref(normalized)) return false

  return AD_SCRIPT_ELIGIBLE_PREFIXES.some((prefix) => normalized.startsWith(prefix))
}

export const CONSENT_DEFAULTS = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500,
} as const
