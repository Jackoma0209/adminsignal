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
}

/**
 * Live news items — genuinely current, clearly attributable official sources.
 * Sorted newest-first. Add new items at the top.
 * Leave empty until real current items are ready to publish.
 */
export const liveSignals: Signal[] = []

/**
 * Archival/demo items — real events from 2025 used as structural placeholders
 * while the live feed is being populated. Shown with a demo banner.
 * These have accurate source URLs and can serve as editorial templates.
 */
export const demoSignals: Signal[] = [
  {
    id: 'demo-1',
    title: 'Microsoft Patches Critical Elevation of Privilege Flaw in Windows Kernel — April 2025 Patch Tuesday',
    slug: 'april-2025-patch-tuesday-kernel-eop',
    category: 'Patch Tuesday',
    excerpt:
      'CVE-2025-21204 carries a CVSS score of 8.8 and affects all supported Windows versions. Deployment teams should prioritize this patch ahead of the standard 30-day window.',
    date: 'Apr 8, 2025',
    publishedAt: '2025-04-08',
    readTime: '4 min read',
    source: 'Microsoft Security Response Center',
    sourceUrl: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-21204',
    isOfficial: true,
    isDemo: true,
    authorId: 'marcus-webb',
    tags: ['Patch Tuesday', 'Windows', 'CVE', 'Security'],
    isFeatured: true,
  },
  {
    id: 'demo-2',
    title: 'Intune Gains Native LAPS Integration for Microsoft Entra-Joined Devices',
    slug: 'intune-native-laps-entra-joined',
    category: 'Microsoft Intune',
    excerpt:
      'Microsoft has shipped native Local Administrator Password Solution support for Entra ID-joined endpoints, removing the dependency on legacy on-prem AD LAPS infrastructure.',
    date: 'Apr 2, 2025',
    publishedAt: '2025-04-02',
    readTime: '5 min read',
    source: 'Microsoft Tech Community',
    sourceUrl: 'https://techcommunity.microsoft.com/blog/microsoftentraidblog/microsoft-entra-id-and-microsoft-intune-support-for-windows-laps/4116521',
    isOfficial: true,
    isDemo: true,
    authorId: 'sarah-chen',
    tags: ['Intune', 'LAPS', 'Entra ID', 'Endpoint Management'],
    isFeatured: true,
  },
  {
    id: 'demo-3',
    title: 'Windows 11 24H2 Enterprise Rollout Expands: GPO and ADMX Template Changes to Know',
    slug: 'windows-11-24h2-enterprise-gpo-changes',
    category: 'Windows 11',
    excerpt:
      'As the 24H2 wave reaches Autopilot and staged deployment rings, endpoint teams are discovering new ADMX template entries and deprecated settings that affect hardened baselines.',
    date: 'Mar 29, 2025',
    publishedAt: '2025-03-29',
    readTime: '6 min read',
    source: 'Microsoft Windows IT Pro Blog',
    sourceUrl: 'https://techcommunity.microsoft.com/category/windows-itpro',
    isOfficial: true,
    isDemo: true,
    authorId: 'james-holbrook',
    tags: ['Windows 11', 'Group Policy', 'ADMX', 'Enterprise'],
    isFeatured: true,
  },
  {
    id: 'demo-4',
    title: 'CISA Issues Emergency Directive on Active Exploitation of Ivanti Connect Secure Vulnerabilities',
    slug: 'cisa-ivanti-connect-secure-exploit',
    category: 'Security Alert',
    excerpt:
      'Federal agencies and critical infrastructure operators have been ordered to apply mitigations within 48 hours as threat actors exploit a pre-auth RCE chain in Ivanti Connect Secure.',
    date: 'Mar 26, 2025',
    publishedAt: '2025-03-26',
    readTime: '3 min read',
    source: 'CISA',
    sourceUrl: 'https://www.cisa.gov/news-events/directives/ed-25-01',
    isOfficial: true,
    isDemo: true,
    authorId: 'marcus-webb',
    tags: ['CISA', 'Ivanti', 'CVE', 'Security Alert'],
  },
  {
    id: 'demo-5',
    title: 'CrowdStrike Releases Full Post-Incident Report: What Enterprise Security Teams Should Action',
    slug: 'crowdstrike-post-incident-report-analysis',
    category: 'Endpoint Security',
    excerpt:
      'The full PIR is now public. We break down the most actionable findings for endpoint teams, including sensor update validation strategies and rollback playbooks.',
    date: 'Mar 22, 2025',
    publishedAt: '2025-03-22',
    readTime: '8 min read',
    source: 'CrowdStrike',
    sourceUrl: 'https://www.crowdstrike.com/blog/falcon-content-update-remediation-and-guidance-hub/',
    isOfficial: true,
    isDemo: true,
    authorId: 'marcus-webb',
    tags: ['CrowdStrike', 'EDR', 'Endpoint Security', 'Incident Response'],
  },
]

/**
 * The public feed consumed by all pages and components.
 * Live items are shown without any banner.
 * Falls back to demo items (shown with banner) when liveSignals is empty.
 */
export const signals: Signal[] =
  liveSignals.length > 0 ? liveSignals : demoSignals
