export interface TroubleshootingArticle {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  affectedProducts: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  date: string
  readTime: string
  authorId: string
  isFeatured?: boolean
}

export const troubleshootingArticles: TroubleshootingArticle[] = [
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
    readTime: '7 min read',
    authorId: 'marcus-webb',
  },
  {
    id: '5',
    title: 'Windows Update for Business Deferral Not Being Respected',
    slug: 'wufb-deferral-not-respected',
    category: 'Patch Management',
    excerpt:
      'Devices ignoring WUfB deferral settings is almost always a policy conflict — consumer update policies from the Microsoft account, WSUS redirection, or a stale ring assignment.',
    affectedProducts: ['Windows Update for Business', 'Group Policy', 'Intune'],
    difficulty: 'Beginner',
    date: 'Jan 30, 2025',
    readTime: '6 min read',
    authorId: 'james-holbrook',
  },
]
