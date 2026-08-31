import type { Metadata } from 'next'

export const NOINDEX_ROBOTS: NonNullable<Metadata['robots']> = {
  index: false,
  follow: true,
}

/**
 * Accessible sections that are intentionally excluded from search while they are
 * incomplete, commercially weak, thin hub pages, or not a useful standalone
 * search result. AdSense reviewers still see linked thin pages, so keep these
 * out of the sitemap, ads, and indexation until they meet publication standard.
 */
export const NOINDEX_STATIC_PATHS = new Set<string>([
  '/best-tools',
  '/reviews',
  '/scripts',
  '/search',
  '/advertise',
  '/templates',
  '/guides/windows-11-25h2-autopilot-v2',
])

/**
 * News records retained for editorial development but excluded from listings,
 * sitemap output, advertising, structured data, and search indexing.
 * Keep this empty when liveSignals contains only publishable articles.
 */
export const DRAFT_NEWS_SLUGS = new Set<string>([])

/**
 * Published records held out of search while an official-source review is in
 * progress. These routes remain addressable so old links do not become opaque,
 * but they are excluded from listings, sitemap output, ads, and rich-result data.
 */
export const NOINDEX_NEWS_SLUGS = new Set<string>([
  'april-2026-patch-tuesday-breakdown',
])

export const NOINDEX_TROUBLESHOOTING_SLUGS = new Set<string>([
  'april-2026-bitlocker-recovery-loop-kb5082063',
])

export const NOINDEX_COMPARISON_SLUGS = new Set<string>()

export const NOINDEX_TUTORIAL_SLUGS = new Set<string>([
  'autopilot-v2-enrollment-esp-troubleshooting',
  'windows-11-25h2-autopilot-v2',
])

export const NOINDEX_GUIDE_SLUGS = new Set<string>([
  'windows-11-25h2-autopilot-v2',
])

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

export function isDraftNewsSlug(slug: string): boolean {
  return DRAFT_NEWS_SLUGS.has(slug)
}

export function isEditorialReviewNewsSlug(slug: string): boolean {
  return NOINDEX_NEWS_SLUGS.has(slug)
}

export function isNoindexNewsSlug(slug: string): boolean {
  return DRAFT_NEWS_SLUGS.has(slug) || NOINDEX_NEWS_SLUGS.has(slug)
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

export function isNoindexGuideSlug(slug: string): boolean {
  return NOINDEX_GUIDE_SLUGS.has(slug)
}

export function isNoindexContentRoute(segment: string, slug: string): boolean {
  switch (segment) {
    case 'news':
      return isNoindexNewsSlug(slug)
    case 'reviews':
    case 'scripts':
      // These archives 404 on the public surface until they meet publication standard.
      return true
    case 'troubleshooting':
      return isNoindexTroubleshootingSlug(slug)
    case 'comparisons':
      return isNoindexComparisonSlug(slug)
    case 'tutorials':
      return isNoindexTutorialSlug(slug)
    case 'guides':
      return isNoindexGuideSlug(slug)
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
