export interface Signal {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  date: string
  publishedAt: string
  readTime: string
  source?: string
  sourceUrl?: string
  isOfficial?: boolean
  isDemo?: boolean
  authorId?: string
  tags?: string[]
  isNew?: boolean
  isFeatured?: boolean
  image?: string
}

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
    image: '/images/article-covers/september-2026-patch-tuesday-admin-priorities.svg',
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
