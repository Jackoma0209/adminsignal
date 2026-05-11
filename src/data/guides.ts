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
  coverImage?: {
    src: string
    alt: string
  }
  isFeatured?: boolean
}

export const guides: Guide[] = [
  {
    id: '13',
    title: 'Exchange Online SMTP AUTH Basic Authentication 2026 Migration Planning',
    slug: 'exchange-online-smtp-auth-basic-auth-2026-migration',
    category: 'Microsoft 365',
    excerpt:
      'A practical operational guide for planning Exchange Online SMTP AUTH Basic Authentication and credential-based Exchange Online PowerShell automation migrations, covering inventory, EAC and Entra checks, mailbox and tenant settings, OAuth, High Volume Email, Azure Communication Services Email, relay caveats, app-only PowerShell, managed identity, rollback, and prevention controls.',
    date: 'May 8, 2026',
    publishedAt: '2026-05-08',
    readTime: '32 min read',
    difficulty: 'Advanced',
    authorId: 'jack',
    tags: ['Exchange Online', 'SMTP AUTH', 'Basic Authentication', 'PowerShell', 'Microsoft Entra ID'],
    coverImage: {
      src: '/images/article-covers/exchange-online-smtp-auth-basic-auth-2026-migration.svg',
      alt: 'Abstract mail flow path with authentication lock and secure routing nodes',
    },
    isFeatured: true,
  },
  {
    id: '12',
    title: 'Migrating AzureAD and MSOnline PowerShell Scripts to Microsoft Graph PowerShell SDK',
    slug: 'azuread-msonline-to-microsoft-graph-powershell-migration',
    category: 'PowerShell',
    excerpt:
      'A practical migration guide for replacing production AzureAD and MSOnline PowerShell scripts with Microsoft Graph PowerShell SDK, covering module strategy, delegated and app-only authentication, managed identity, permission discovery, cmdlet mapping, paging, OData filters, eventual consistency, throttling, beta endpoint risk, logging, rollback, and prevention checks.',
    date: 'May 8, 2026',
    publishedAt: '2026-05-08',
    readTime: '34 min read',
    difficulty: 'Advanced',
    authorId: 'jack',
    tags: ['PowerShell', 'Microsoft Graph', 'Microsoft Entra ID', 'MSOnline', 'AzureAD'],
    coverImage: {
      src: '/images/article-covers/azuread-msonline-to-microsoft-graph-powershell-migration.svg',
      alt: 'Abstract terminal panel connected to Microsoft Graph style automation nodes',
    },
    isFeatured: true,
  },
  {
    id: '11',
    title: 'Rolling Out Microsoft Defender for Endpoint with Intune in a Managed Windows Fleet',
    slug: 'microsoft-defender-for-endpoint-intune-rollout',
    category: 'Endpoint Security',
    excerpt:
      'A practical operational guide for rolling out Microsoft Defender for Endpoint with Intune across a managed Windows fleet, covering tenant connection, licensing, Plan 1 versus Plan 2, onboarding, endpoint security policies, antivirus, firewall, ASR, EDR, baselines, pilot rings, reporting, coexistence, rollback, and prevention checks.',
    date: 'May 8, 2026',
    publishedAt: '2026-05-08',
    readTime: '30 min read',
    difficulty: 'Advanced',
    authorId: 'jack',
    tags: ['Microsoft Defender for Endpoint', 'Intune', 'Endpoint Security', 'EDR', 'Windows Security'],
    coverImage: {
      src: '/images/article-covers/microsoft-defender-for-endpoint-intune-rollout.svg',
      alt: 'Abstract managed endpoint fleet with shield and telemetry lines',
    },
    isFeatured: true,
  },
  {
    id: '10',
    title: 'Migrating Intune Administrative Templates to Settings Catalog Without Breaking Policy Behaviour',
    slug: 'intune-admin-templates-to-settings-catalog-migration',
    category: 'Microsoft Intune',
    excerpt:
      'A practical migration guide for moving Intune Administrative Templates and older configuration profiles to Settings Catalog, covering inventory, duplicate settings, assignments, Graph PowerShell checks, conflict detection, pilot design, validation, reporting, rollback, and prevention controls.',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '26 min read',
    difficulty: 'Advanced',
    authorId: 'jack',
    tags: ['Intune', 'Settings Catalog', 'Administrative Templates', 'Graph PowerShell', 'Endpoint Management'],
    coverImage: {
      src: '/images/article-covers/intune-admin-templates-to-settings-catalog-migration.svg',
      alt: 'Abstract policy tiles moving into a structured settings catalog grid',
    },
    isFeatured: true,
  },
  {
    id: '9',
    title: 'Microsoft 365 Admin Centre Mandatory MFA Readiness for Admins',
    slug: 'microsoft-365-admin-centre-mfa-readiness',
    category: 'Microsoft 365',
    excerpt:
      'A practical operational guide for Microsoft 365 admin centre mandatory MFA readiness, covering affected admins, break-glass accounts, security defaults, Conditional Access, per-user MFA, phishing-resistant methods, Graph PowerShell audits, sign-in checks, service-style admin accounts, Phase 2 tooling impact, safe rollout, and recovery planning.',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '22 min read',
    difficulty: 'Advanced',
    authorId: 'jack',
    tags: ['Microsoft 365', 'MFA', 'Microsoft Entra ID', 'Conditional Access', 'Graph PowerShell'],
    coverImage: {
      src: '/images/article-covers/microsoft-365-admin-centre-mfa-readiness.svg',
      alt: 'Abstract admin identity checkpoint with MFA signal and emergency access key',
    },
    isFeatured: true,
  },
  {
    id: '8',
    title: 'Secure Boot CA 2023 Rollout Readiness for Enterprise Windows Fleets',
    slug: 'secure-boot-ca-2023-rollout-enterprise-readiness',
    category: 'Endpoint Security',
    excerpt:
      'A practical enterprise readiness guide for the Secure Boot CA 2023 rollout, covering 2026 certificate expirations, client and server differences, Intune readiness checks, PowerShell verification, registry and event evidence, BitLocker risk, Hyper-V Generation 2 VMs, firmware coordination, rollout rings, and recovery planning.',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '24 min read',
    difficulty: 'Advanced',
    authorId: 'jack',
    tags: ['Secure Boot', 'BitLocker', 'Windows Server', 'Intune', 'Patch Management', 'Firmware'],
    coverImage: {
      src: '/images/article-covers/secure-boot-ca-2023-rollout-enterprise-readiness.svg',
      alt: 'Abstract firmware chip linked to certificate chain and secure boot path',
    },
    isFeatured: true,
  },
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
    coverImage: {
      src: '/images/article-covers/windows-11-25h2-autopilot-v2.svg',
      alt: 'Abstract device provisioning flow with staged deployment rings',
    },
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
    coverImage: {
      src: '/images/article-covers/deploy-windows-laps-intune.svg',
      alt: 'Abstract local admin key rotation flow across managed devices',
    },
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
    coverImage: {
      src: '/images/article-covers/hardening-windows-11-cis-benchmark.svg',
      alt: 'Abstract hardened workstation with baseline checklist and security controls',
    },
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
    coverImage: {
      src: '/images/article-covers/autopilot-v2-enrollment-esp-troubleshooting.svg',
      alt: 'Abstract setup progress ring with diagnostic nodes for Autopilot troubleshooting',
    },
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
    coverImage: {
      src: '/images/article-covers/powershell-software-inventory-system.svg',
      alt: 'Abstract terminal linked to endpoint inventory grid and export path',
    },
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
    coverImage: {
      src: '/images/article-covers/conditional-access-m365-policy-map.svg',
      alt: 'Abstract identity access gate with device compliance signal',
    },
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
    coverImage: {
      src: '/images/article-covers/group-policy-troubleshooting-rsop-gpresult.svg',
      alt: 'Abstract organisational unit tree with policy link and diagnostic path',
    },
  },
]
