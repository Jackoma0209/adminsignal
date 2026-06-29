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
    id: 'live-7',
    title: 'June 2026 Patch Tuesday: Windows Admin Priorities',
    slug: 'june-2026-patch-tuesday-admin-priorities',
    category: 'Patch Tuesday',
    excerpt:
      'June 2026 Patch Tuesday guidance for Windows admins: key CVEs, KBs, known issues, Intune rollout checks, Secure Boot readiness, and post-deployment monitoring.',
    date: '10 Jun 2026',
    publishedAt: '2026-06-10',
    readTime: '10 min read',
    source: 'AdminSignal',
    isOfficial: false,
    authorId: 'jack',
    tags: [
      'June 2026 Patch Tuesday',
      'Windows security updates',
      'Microsoft Security Update Guide',
      'Windows admins',
      'Intune',
      'Windows Update for Business',
      'endpoint management',
      'Secure Boot certificates',
    ],
    isNew: true,
    isFeatured: true,
    image: '/images/article-covers/june-2026-patch-tuesday-admin-priorities.svg',
  },
  {
    id: 'live-8',
    title: 'Securing Your Intune Tenant: An Operational Hardening Plan for Enterprise Admins',
    slug: 'intune-security-best-practices-2026',
    category: 'Microsoft Intune',
    excerpt:
      'Turn Microsoft\'s Intune security guidance into an operational plan: least-privilege roles, phishing-resistant MFA, PIM, Multi Admin Approval, audit checks, and rollout sequencing for enterprise admins.',
    date: '29 Jun 2026',
    publishedAt: '2026-06-29',
    readTime: '11 min read',
    source: 'AdminSignal',
    isOfficial: false,
    authorId: 'jack',
    tags: ['Intune', 'Security', 'Zero Trust', 'Admin Roles', 'Conditional Access', 'PIM'],
    isNew: true,
    isFeatured: true,
    image: '/images/article-covers/intune-security-best-practices-2026.svg',
  },
  {
    id: 'live-6',
    title: 'May 2026 Patch Tuesday: admin deployment notes and checks',
    slug: 'may-2026-patch-tuesday-readiness',
    category: 'Patch Tuesday',
    excerpt:
      'May 2026 Patch Tuesday deployment notes covering KB5089549 for Windows 11, Windows Server updates, BitLocker PCR7 known issue, Secure Boot certificate readiness, Intune Autopatch hotpatch, and WSUS deployment checks.',
    date: '13 May 2026',
    publishedAt: '2026-05-13',
    readTime: '10 min read',
    source: 'AdminSignal',
    isOfficial: false,
    authorId: 'jack',
    tags: [
      'Patch Tuesday',
      'Windows',
      'Windows Server',
      'Intune',
      'Windows Update for Business',
      'WSUS',
      'MECM',
      'Microsoft 365',
      'Endpoint Security',
    ],
    isNew: true,
    isFeatured: true,
    image: '/images/article-covers/may-2026-patch-tuesday-readiness.svg',
  },
  {
    id: 'live-0',
    title: 'April 2026 Patch Tuesday Breakdown – What Sysadmins Must Do This Month',
    slug: 'april-2026-patch-tuesday-breakdown',
    category: 'Patch Tuesday',
    excerpt:
      'Three zero-days confirmed exploited in the wild, plus KB5055523 fixes the Autopilot OOBE timeout regression on Dell and HP hardware that has been blocking zero-touch deployments for six weeks. Prioritise this month.',
    date: 'Apr 8, 2026',
    publishedAt: '2026-04-08',
    readTime: '7 min read',
    source: 'AdminSignal',
    isOfficial: false,
    authorId: 'jack',
    tags: ['Patch Tuesday', 'Windows 11', 'Intune', 'Autopilot', 'Security', 'CVE'],
    isNew: true,
    isFeatured: true,
    image: '/images/article-covers/april-2026-patch-tuesday-breakdown.svg',
  },
  {
    id: 'live-1',
    title: 'Windows Cross-Signed Driver Trust Removal: Enterprise Readiness and Rollout Plan',
    slug: 'windows-driver-cross-signed-trust-removal',
    category: 'Windows Security',
    excerpt:
      'Enterprise admin guide to Microsoft\'s cross-signed driver trust removal: evaluation mode, Event Viewer checks, driver audit, Intune rollout sequencing, and vendor escalation.',
    date: '26 Mar 2026',
    publishedAt: '2026-03-26',
    readTime: '9 min read',
    source: 'AdminSignal',
    isOfficial: false,
    authorId: 'jack',
    tags: ['Windows Security', 'Drivers', 'Windows 11', 'Windows Server 2025', 'Secure Boot'],
    isFeatured: true,
    image: '/images/article-covers/windows-driver-cross-signed-trust-removal.svg',
  },
  {
    id: 'live-4',
    title: 'Intune Opt-In MDM Enrollment: When To Block Automatic Enrollment at Sign-In',
    slug: 'intune-opt-in-mdm-enrollment-preview',
    category: 'Microsoft Intune',
    excerpt:
      'Practical guide to Intune opt-in MDM enrollment preview: blocking automatic enrollment at Windows sign-in, BYOD scenarios, pilot design, user comms, and validation checks.',
    date: '5 Mar 2026',
    publishedAt: '2026-03-05',
    readTime: '8 min read',
    source: 'AdminSignal',
    isOfficial: false,
    authorId: 'jack',
    tags: ['Intune', 'MDM', 'BYOD', 'Enrollment', 'Autopilot'],
    image: '/images/article-covers/intune-opt-in-mdm-enrollment-preview.svg',
  },
]

/**
 * Draft news — held offline until expanded to original operational depth.
 * Not included in the public feed, RSS, sitemap, or static page generation.
 */
export const draftSignals: Signal[] = [
  {
    id: 'live-2',
    title: 'Windows App Updates: Remote Desktop Client for Windows (MSI) and Web Client Deprecated in Commercial Clouds',
    slug: 'windows-app-rd-client-deprecation-2026',
    category: 'Windows 365 / Remote Access',
    excerpt:
      'The Remote Desktop client for Windows (MSI) and the Remote Desktop web client are no longer supported in commercial clouds as of March 27, 2026. Microsoft is directing organisations to the Windows App, which also gains keyboard input protection in this update.',
    date: 'Mar 30, 2026',
    publishedAt: '2026-03-30',
    readTime: '3 min read',
    source: 'Windows IT Pro Blog',
    sourceUrl: 'https://techcommunity.microsoft.com/blog/windows-itpro-blog/windows-app-updates-reliability-productivity-and-security-improvements/4494681',
    isOfficial: true,
    tags: ['Windows App', 'Remote Desktop', 'Windows 365', 'Commercial Cloud'],
    isNew: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'live-5',
    title: 'Migrating Frontline Mobile Devices: A Frontline-First Approach to Moving to Microsoft Intune',
    slug: 'intune-frontline-mobile-migration',
    category: 'Microsoft Intune',
    excerpt:
      'Practical migration guidance for organisations moving frontline mobile fleets to Intune, covering reliability planning, app continuity, connectivity, certificate dependencies, and infrastructure prerequisites.',
    date: 'Mar 30, 2026',
    publishedAt: '2026-03-30',
    readTime: '4 min read',
    source: 'Intune Customer Success',
    sourceUrl: 'https://techcommunity.microsoft.com/blog/intunecustomersuccess/migrating-frontline-mobile-devices-a-frontline-first-approach-to-moving-to-micro/4501347',
    isOfficial: true,
    tags: ['Intune', 'Frontline Workers', 'Mobile', 'Migration'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  },
]

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
    authorId: 'jack',
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
    authorId: 'jack',
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
    authorId: 'jack',
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
    authorId: 'jack',
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
    authorId: 'jack',
    tags: ['CrowdStrike', 'EDR', 'Endpoint Security', 'Incident Response'],
  },
]

/**
 * The public feed consumed by listings, topic hubs, search, and the homepage.
 * Falls back to demo items (shown with banner) when liveSignals is empty.
 */
export const signals: Signal[] = liveSignals.length > 0 ? liveSignals : demoSignals
