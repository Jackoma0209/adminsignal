import { isNoindexHref } from '@/lib/noindex'

/**
 * Consent, analytics, advertising, and CMP configuration layer.
 *
 * Environment flags (set in .env.local or Vercel env vars):
 *   NEXT_PUBLIC_GA_ENABLED=true
 *   NEXT_PUBLIC_ADSENSE_ENABLED=true
 *   NEXT_PUBLIC_ADS_ENABLED=true
 *   NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED=false
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
 *
 * Google Funding Choices / Privacy & messaging is implemented in this repo as
 * the Google-certified CMP (IAB TCF v2.3). NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED
 * gates that CMP loader only. Leave it unset to load Funding Choices. Set it to
 * "false" to disable the loader. It is not a switch for ads or Analytics.
 *
 * Keep NEXT_PUBLIC_GA_ENABLED, NEXT_PUBLIC_ADSENSE_ENABLED, and
 * NEXT_PUBLIC_ADS_ENABLED unset or false. Advertising tags must stay off.
 *
 * Publishing the European regulations (UK/EEA/CH) message still has to be done
 * in AdSense → Privacy & messaging. Include Google Advertising Products
 * (IAB TCF vendor ID 755) in that message. Code cannot publish the banner.
 */

export const ADSENSE_SELLER_PUBLISHER_ID = 'pub-5563142788194204'
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? 'ca-pub-5563142788194204'

/** IAB TCF vendor ID for Google Advertising Products. Configure this in AdSense. */
export const GOOGLE_ADVERTISING_PRODUCTS_VENDOR_ID = 755

export const FUNDING_CHOICES_SCRIPT_SRC = `https://fundingchoicesmessages.google.com/i/${ADSENSE_SELLER_PUBLISHER_ID}?ers=1`

/**
 * Gates the Funding Choices / Privacy & messaging loader. Default on because
 * the CMP is implemented in this repo. Set the env var to "false" to opt out.
 */
export const fundingChoicesEnabled =
  process.env.NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_ENABLED !== 'false'

export const googleCertifiedCmpConfigured = fundingChoicesEnabled

export const googleTagsRequested =
  process.env.NEXT_PUBLIC_GA_ENABLED === 'true' ||
  process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' ||
  process.env.NEXT_PUBLIC_ADS_ENABLED === 'true'

/**
 * Consent Mode v2 defaults must be present before Funding Choices can update
 * them. Load the gtag consent stub when the CMP loader is on, even if ads and
 * Analytics flags stay false.
 */
export const consentDefaultsRequired = fundingChoicesEnabled || googleTagsRequested

/**
 * Non-essential Google tags stay disabled unless their own flags are on and a
 * certified CMP is in place. Funding Choices loading does not enable ads.
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
  '/templates',
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
