export interface Guide {
  id: string
  title: string
  slug: string
  /** Override the default /tutorials/{slug} link — used for flagship guides with a dedicated page */
  href?: string
  category: string
  excerpt: string
  date: string
  publishedAt: string
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  authorId?: string
  tags?: string[]
  isFeatured?: boolean
}

export const guides: Guide[] = [
  {
    id: '7',
    title: 'Deploy Windows 11 25H2 with Intune + Autopilot v2 (Zero-Touch, Production-Ready)',
    slug: 'windows-11-25h2-autopilot-v2',
    href: '/guides/windows-11-25h2-autopilot-v2',
    category: 'Microsoft Intune',
    excerpt:
      'A production-grade walkthrough for deploying Windows 11 25H2 across existing x86/x64 fleets using Autopilot v2 Device Preparation policies. Covers tenant readiness, ESP configuration, app tiering, update rings, a phased rollout sequence, and a PowerShell pre-flight toolkit.',
    date: 'Apr 10, 2026',
    publishedAt: '2026-04-10',
    readTime: '28 min read',
    difficulty: 'Advanced',
    authorId: 'jack',
    tags: ['Windows 11', 'Autopilot', 'Intune', '25H2', 'Zero-Touch', 'Deployment', 'Endpoint Management'],
    isFeatured: true,
  },
  {
    id: '1',
    title: 'Deploying Windows LAPS with Microsoft Intune: A Complete Walkthrough',
    slug: 'deploy-windows-laps-intune',
    category: 'Microsoft Intune',
    excerpt:
      'A step-by-step guide to rolling out Windows Local Administrator Password Solution across your Intune-managed fleet, including policy configuration, reporting, and migration from legacy LAPS.',
    date: 'Mar 20, 2025',
    publishedAt: '2025-03-20',
    readTime: '14 min read',
    difficulty: 'Intermediate',
    authorId: 'sarah-chen',
    tags: ['Intune', 'LAPS', 'Entra ID', 'Security Baseline'],
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Hardening Windows 11 Endpoints with CIS Benchmark Level 1',
    slug: 'hardening-windows-11-cis-benchmark',
    category: 'Endpoint Security',
    excerpt:
      'Apply the CIS Level 1 benchmark to Windows 11 22H2 and 24H2 endpoints using Group Policy, Intune profiles, and a validation script that reports compliance gaps.',
    date: 'Mar 14, 2025',
    publishedAt: '2025-03-14',
    readTime: '20 min read',
    difficulty: 'Advanced',
    authorId: 'marcus-webb',
    tags: ['CIS Benchmark', 'Windows 11', 'Hardening', 'Endpoint Security'],
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Understanding Autopilot v2: Enrollment Profiles, ESP, and Common Failure Modes',
    slug: 'autopilot-v2-enrollment-esp-troubleshooting',
    category: 'Microsoft Intune',
    excerpt:
      'Windows Autopilot v2 changes how enrollment profiles work. This guide covers device preparation, the Enrollment Status Page, and a decision tree for diagnosing the most common deployment failures.',
    date: 'Mar 7, 2025',
    publishedAt: '2025-03-07',
    readTime: '16 min read',
    difficulty: 'Intermediate',
    authorId: 'sarah-chen',
    tags: ['Autopilot', 'Intune', 'Windows 11', 'Enrollment'],
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Building a PowerShell-Driven Software Inventory System for Unmanaged Endpoints',
    slug: 'powershell-software-inventory-system',
    category: 'PowerShell',
    excerpt:
      'Use WMI, the registry, and a lightweight SQLite output to build a software inventory pipeline that runs without an RMM agent — useful for legacy environments and incident response.',
    date: 'Feb 28, 2025',
    publishedAt: '2025-02-28',
    readTime: '18 min read',
    difficulty: 'Intermediate',
    authorId: 'james-holbrook',
    tags: ['PowerShell', 'WMI', 'Inventory', 'Automation'],
  },
  {
    id: '5',
    title: 'Configuring Conditional Access for a Microsoft 365 Tenant: The Complete Policy Map',
    slug: 'conditional-access-m365-policy-map',
    category: 'Microsoft Entra ID',
    excerpt:
      'A policy-by-policy walkthrough of building a Conditional Access baseline for Microsoft 365, from MFA requirements and compliant device enforcement to emergency access accounts.',
    date: 'Feb 21, 2025',
    publishedAt: '2025-02-21',
    readTime: '22 min read',
    difficulty: 'Advanced',
    authorId: 'priya-nair',
    tags: ['Conditional Access', 'Entra ID', 'Microsoft 365', 'Identity'],
  },
  {
    id: '6',
    title: 'Group Policy Troubleshooting with RSoP, gpresult, and Policy Scope Analysis',
    slug: 'group-policy-troubleshooting-rsop-gpresult',
    category: 'Group Policy',
    excerpt:
      'A practical troubleshooting methodology for Group Policy: reading RSoP, interpreting gpresult /h output, diagnosing WMI filter failures, and resolving OUlinking conflicts.',
    date: 'Feb 14, 2025',
    publishedAt: '2025-02-14',
    readTime: '12 min read',
    difficulty: 'Beginner',
    authorId: 'james-holbrook',
    tags: ['Group Policy', 'Active Directory', 'Windows Server', 'Troubleshooting'],
  },
]
