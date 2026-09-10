export interface Signal {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  /** Human-readable display date, e.g. "Apr 8, 2025" */
  date: string
  /** ISO 8601 date string for machine use, e.g. "2025-04-08" */
  publishedAt: string
  readTime: string
  /** Original source name, e.g. "Microsoft Security Response Center" */
  source?: string
  /** URL of the original source article or advisory */
  sourceUrl?: string
  /** True when the content originates from or is verified against an official vendor source */
  isOfficial?: boolean
  /**
   * True when this item is sample/placeholder data not intended for production display.
   * Real items should omit this field or set it to false.
   */
  isDemo?: boolean
  authorId?: string
  tags?: string[]
  isNew?: boolean
  isFeatured?: boolean
  /** Absolute URL of the featured image used in article header and card thumbnail */
  image?: string
}

/**
 * Live news items — genuinely current, clearly attributable official sources.
 * Sorted newest-first. Add new items at the top.
 * Leave empty until real current items are ready to publish.
 */
export const liveSignals: Signal[] = [
  {
    id: 'live-11',
    title: 'September 2026 Patch Tuesday: Windows Admin Priorities',
    slug: 'september-2026-patch-tuesday-admin-priorities',
    category: 'Patch Tuesday',
    excerpt:
      'September 8 2026 Patch Tuesday for Windows admins: exploited CVE-2026-81963 and CVE-2026-85880, DNS RCE CVE-2026-69730, Exchange SUs, official KBs and builds, and a ring plan that does not invent lab results.',
    date: '10 Sep 2026',
    publishedAt: '2026-09-10',
    readTime: '14 min read',
    source: 'AdminSignal',
    isOfficial: false,
    authorId: 'jack',
    isNew: true,
    isFeatured: true,
    tags: [
      'September 2026 Patch Tuesday',
      'CVE-2026-81963',
      'CVE-2026-85880',
      'CVE-2026-69730',
      'Windows security updates',
      'Intune',
      'Windows Update for Business',
      'Exchange Server',
      'Secure Boot certificates',
    ],
  },
