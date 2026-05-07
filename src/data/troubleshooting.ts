export interface TroubleshootingArticle {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  affectedProducts: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  date: string
  publishedAt: string
  readTime: string
  authorId: string
  isFeatured?: boolean
}

export const troubleshootingArticles: TroubleshootingArticle[] = [
  {
    id: '12',
    title: 'Windows Autopilot Device Not Importing: Hardware Hash CSV, Duplicate Records, and Profile Assignment',
    slug: 'autopilot-device-not-importing-hardware-hash',
    category: 'Microsoft Intune',
    excerpt:
      'A practical troubleshooting guide for Windows Autopilot import failures, covering hardware hash collection, CSV validation, duplicate records, tenant permissions, Intune Connector checks, deployment profile assignment, dynamic groups, Graph, safe retry, and recovery.',
    affectedProducts: ['Windows Autopilot', 'Microsoft Intune', 'Microsoft Entra ID', 'Microsoft Graph'],
    difficulty: 'Intermediate',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '22 min read',
    authorId: 'jack',
  },
  {
    id: '11',
    title: 'Intune Device Not Syncing: Last Check-in Stale, Sync Button Not Helping, or Policies Not Arriving',
    slug: 'intune-device-not-syncing',
    category: 'Microsoft Intune',
    excerpt:
      'A practical troubleshooting guide for Windows devices that stop syncing with Intune, covering portal checks, MDM enrolment state, Company Portal, scheduled tasks, event logs, registry evidence, IME health, network issues, Entra device objects, Graph checks, safe retry, and recovery.',
    affectedProducts: ['Microsoft Intune', 'Windows 11', 'Windows 10', 'Microsoft Entra ID'],
    difficulty: 'Intermediate',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '21 min read',
    authorId: 'jack',
  },
  {
    id: '10',
    title: 'Microsoft Entra Dynamic Group Not Updating: Users, Devices, and Intune Assignments',
    slug: 'entra-dynamic-group-not-updating',
    category: 'Microsoft Entra ID',
    excerpt:
      'A practical troubleshooting guide for Microsoft Entra dynamic groups that do not update, including rule syntax, user and device attributes, Graph checks, processing delays, Intune assignment impact, Autopilot targeting, stale device objects, and safe recovery.',
    affectedProducts: ['Microsoft Entra ID', 'Microsoft Intune', 'Autopilot', 'Microsoft Graph'],
    difficulty: 'Intermediate',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '20 min read',
    authorId: 'jack',
  },
  {
    id: '9',
    title: 'Intune Remediation Script Not Running, Detecting, Remediating, or Reporting',
    slug: 'intune-remediation-script-not-running',
    category: 'Microsoft Intune',
    excerpt:
      'A practical troubleshooting guide for Intune Remediations that do not run, detect, remediate, or report correctly, covering licensing, exit codes, schedules, IME logs, PowerShell context, reporting delay, retry, and rollback.',
    affectedProducts: ['Microsoft Intune', 'Remediations', 'Intune Management Extension', 'PowerShell'],
    difficulty: 'Intermediate',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '18 min read',
    authorId: 'jack',
  },
  {
    id: '8',
    title: 'Intune Win32 App Install Stuck at Waiting, Pending, Installing, or Failed',
    slug: 'intune-win32-app-install-stuck-waiting',
    category: 'Microsoft Intune',
    excerpt:
      'A practical troubleshooting guide for stuck Intune Win32 app installs, covering IME health, AppWorkload.log, detection and requirement rules, targeting, dependencies, supersedence, Company Portal sync, retry, and rollback.',
    affectedProducts: ['Microsoft Intune', 'Intune Management Extension', 'Win32 apps', 'Windows 11'],
    difficulty: 'Intermediate',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '19 min read',
    authorId: 'jack',
  },
  {
    id: '7',
    title: 'Windows Update for Business Deferral Policy Not Applying in Intune: Practical Diagnosis',
    slug: 'wufb-deferral-not-respected',
    category: 'Microsoft Intune',
    excerpt:
      'A practical diagnostic guide for Windows Update for Business deferrals that are ignored, overwritten, or blocked by feature update policies, quality update policies, Group Policy, WSUS, MECM, or co-management.',
    affectedProducts: ['Microsoft Intune', 'Windows Update for Business', 'Windows 11', 'Windows 10'],
    difficulty: 'Intermediate',
    date: 'May 7, 2026',
    publishedAt: '2026-05-07',
    readTime: '18 min read',
    authorId: 'jack',
  },
  {
    id: '1',
    title: 'Windows Autopilot Enrollment Status Page Stuck at 0% — Causes and Fixes',
    slug: 'autopilot-enrollment-status-page-stuck',
    category: 'Microsoft Intune',
    excerpt:
      'The ESP hanging at 0% is one of the most common Autopilot failures. This guide walks through the diagnostic sequence: Event Viewer locations, MDM logs, and the six most frequent root causes.',
    affectedProducts: ['Windows Autopilot', 'Microsoft Intune', 'Windows 11'],
    difficulty: 'Intermediate',
    date: 'Mar 15, 2025',
    publishedAt: '2025-03-15',
    readTime: '10 min read',
    authorId: 'sarah-chen',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Group Policy Not Applying to Users or Computers: A Systematic Diagnosis',
    slug: 'group-policy-not-applying-diagnosis',
    category: 'Group Policy',
    excerpt:
      'Before running gpupdate /force for the third time, follow this decision tree: scope filtering, link order, security filtering, loopback processing, and slow-link detection are all common culprits.',
    affectedProducts: ['Windows Server', 'Active Directory', 'Group Policy'],
    difficulty: 'Beginner',
    date: 'Mar 5, 2025',
    publishedAt: '2025-03-05',
    readTime: '8 min read',
    authorId: 'james-holbrook',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Intune Compliance Policy Not Evaluating: End-to-End Troubleshooting Checklist',
    slug: 'intune-compliance-policy-not-evaluating',
    category: 'Microsoft Intune',
    excerpt:
      'When Intune reports a device as "Not evaluated" or stuck in a compliance state that does not reflect reality, the issue is usually one of four things — and this checklist covers all of them.',
    affectedProducts: ['Microsoft Intune', 'Entra ID', 'Windows 11'],
    difficulty: 'Intermediate',
    date: 'Feb 24, 2025',
    publishedAt: '2025-02-24',
    readTime: '9 min read',
    authorId: 'sarah-chen',
    isFeatured: true,
  },
  {
    id: '4',
    title: 'BitLocker Recovery Key Not Backed Up to Entra ID: Why and How to Fix It',
    slug: 'bitlocker-recovery-key-not-backed-up-entra',
    category: 'Endpoint Security',
    excerpt:
      'BitLocker keys failing to escrow to Entra ID is a silent failure — no error on the device, no alert in Intune. Here is how to detect it, force escrow, and prevent it from recurring.',
    affectedProducts: ['BitLocker', 'Microsoft Intune', 'Entra ID'],
    difficulty: 'Intermediate',
    date: 'Feb 12, 2025',
    publishedAt: '2025-02-12',
    readTime: '15 min read',
    authorId: 'jack',
  },
  {
    id: '6',
    title: 'Fixing the April 2026 BitLocker Recovery Loop (KB5082063 Secure Boot Issue)',
    slug: 'april-2026-bitlocker-recovery-loop-kb5082063',
    category: 'Endpoint Security',
    excerpt:
      'KB5082063 rotates the Windows UEFI CA certificates, breaking PCR7 binding on Dell and Lenovo hardware and triggering BitLocker recovery loops fleet-wide. Here is how to stop it before it hits your next patch ring — and recover devices that are already stuck.',
    affectedProducts: ['BitLocker', 'Microsoft Intune', 'Windows 11', 'Secure Boot'],
    difficulty: 'Intermediate',
    date: 'Apr 17, 2026',
    publishedAt: '2026-04-17',
    readTime: '10 min read',
    authorId: 'jack',
    isFeatured: true,
  },
]
