export interface Signal {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  date: string
  readTime: string
  authorId?: string
  tags?: string[]
  isNew?: boolean
  isFeatured?: boolean
}

export const signals: Signal[] = [
  {
    id: '1',
    title: 'Microsoft Patches Critical Elevation of Privilege Flaw in Windows Kernel — April 2025 Patch Tuesday',
    slug: 'april-2025-patch-tuesday-kernel-eop',
    category: 'Patch Tuesday',
    excerpt:
      'CVE-2025-21204 carries a CVSS score of 8.8 and affects all supported Windows versions. Deployment teams should prioritize this patch ahead of the standard 30-day window.',
    date: 'Apr 8, 2025',
    readTime: '4 min read',
    authorId: 'marcus-webb',
    tags: ['Patch Tuesday', 'Windows', 'CVE', 'Security'],
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Intune Gains Native LAPS Integration for Microsoft Entra-Joined Devices',
    slug: 'intune-native-laps-entra-joined',
    category: 'Microsoft Intune',
    excerpt:
      'Microsoft has shipped native Local Administrator Password Solution support for Entra ID-joined endpoints, removing the dependency on legacy on-prem AD LAPS infrastructure.',
    date: 'Apr 2, 2025',
    readTime: '5 min read',
    authorId: 'sarah-chen',
    tags: ['Intune', 'LAPS', 'Entra ID', 'Endpoint Management'],
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Windows 11 24H2 Enterprise Rollout Expands: GPO and ADMX Template Changes to Know',
    slug: 'windows-11-24h2-enterprise-gpo-changes',
    category: 'Windows 11',
    excerpt:
      'As the 24H2 wave reaches Autopilot and staged deployment rings, endpoint teams are discovering new ADMX template entries and deprecated settings that affect hardened baselines.',
    date: 'Mar 29, 2025',
    readTime: '6 min read',
    authorId: 'james-holbrook',
    tags: ['Windows 11', 'Group Policy', 'ADMX', 'Enterprise'],
    isFeatured: true,
  },
  {
    id: '4',
    title: 'CISA Issues Emergency Directive on Active Exploitation of Ivanti Connect Secure Vulnerabilities',
    slug: 'cisa-ivanti-connect-secure-exploit',
    category: 'Security Alert',
    excerpt:
      'Federal agencies and critical infrastructure operators have been ordered to apply mitigations within 48 hours as threat actors exploit a pre-auth RCE chain in Ivanti Connect Secure.',
    date: 'Mar 26, 2025',
    readTime: '3 min read',
    authorId: 'marcus-webb',
    tags: ['CISA', 'Ivanti', 'CVE', 'Security Alert'],
  },
  {
    id: '5',
    title: 'CrowdStrike Releases Full Post-Incident Report: What Enterprise Security Teams Should Action',
    slug: 'crowdstrike-post-incident-report-analysis',
    category: 'Endpoint Security',
    excerpt:
      'The full PIR is now public. We break down the most actionable findings for endpoint teams, including sensor update validation strategies and rollback playbooks.',
    date: 'Mar 22, 2025',
    readTime: '8 min read',
    authorId: 'marcus-webb',
    tags: ['CrowdStrike', 'EDR', 'Endpoint Security', 'Incident Response'],
  },
]
