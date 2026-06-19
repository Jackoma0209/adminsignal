import type { Metadata } from 'next'

export const NOINDEX_ROBOTS: NonNullable<Metadata['robots']> = {
  index: false,
  follow: true,
}

export const NOINDEX_STATIC_PATHS = new Set(['/advertise', '/best-tools', '/reviews'])

export const NOINDEX_NEWS_SLUGS = new Set([
  'windows-driver-cross-signed-trust-removal',
  'windows-app-rd-client-deprecation-2026',
  'intune-security-best-practices-2026',
  'intune-opt-in-mdm-enrollment-preview',
  'intune-frontline-mobile-migration',
])

export const NOINDEX_TROUBLESHOOTING_SLUGS = new Set([
  'intune-compliance-policy-not-evaluating',
  'april-2026-bitlocker-recovery-loop-kb5082063',
])

export const NOINDEX_COMPARISON_SLUGS = new Set([
  'windows-defender-vs-crowdstrike-falcon',
])

export const NOINDEX_TUTORIAL_SLUGS = new Set(['powershell-software-inventory-system'])

const DUPLICATE_TUTORIAL_REDIRECTS = new Map([
  ['windows-11-25h2-autopilot-v2', '/guides/windows-11-25h2-autopilot-v2'],
])

export function withNoindex(metadata: Metadata): Metadata {
  return {
    ...metadata,
    robots: NOINDEX_ROBOTS,
  }
}

export function getDuplicateTutorialRedirect(slug: string): string | undefined {
  return DUPLICATE_TUTORIAL_REDIRECTS.get(slug)
}

export function isNoindexPath(path: string): boolean {
  return NOINDEX_STATIC_PATHS.has(path)
}

export function isNoindexNewsSlug(slug: string): boolean {
  return NOINDEX_NEWS_SLUGS.has(slug)
}

export function isNoindexTroubleshootingSlug(slug: string): boolean {
  return NOINDEX_TROUBLESHOOTING_SLUGS.has(slug)
}

export function isNoindexComparisonSlug(slug: string): boolean {
  return NOINDEX_COMPARISON_SLUGS.has(slug)
}

export function isNoindexTutorialSlug(slug: string): boolean {
  return NOINDEX_TUTORIAL_SLUGS.has(slug)
}

export function isNoindexContentRoute(segment: string, slug: string): boolean {
  switch (segment) {
    case 'news':
      return isNoindexNewsSlug(slug)
    case 'reviews':
      return true
    case 'troubleshooting':
      return isNoindexTroubleshootingSlug(slug)
    case 'comparisons':
      return isNoindexComparisonSlug(slug)
    case 'tutorials':
      return isNoindexTutorialSlug(slug)
    default:
      return false
  }
}

export function isNoindexHref(href: string): boolean {
  const [path] = href.split(/[?#]/)
  if (isNoindexPath(path)) return true

  const [segment, slug] = path.split('/').filter(Boolean)
  if (!segment || !slug) return false

  return isNoindexContentRoute(segment, slug)
}
