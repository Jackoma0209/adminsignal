export interface Comparison {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  productA: string
  productB: string
  winner?: string
  verdict: string
  date: string
  publishedAt: string
  readTime: string
  authorId: string
  isFeatured?: boolean
}

export const comparisons: Comparison[] = [
  {
    id: '1',
    title: 'Microsoft Intune vs. SCCM/MECM in 2025: Which Should You Use?',
    slug: 'intune-vs-sccm-mecm-2025',
    category: 'Endpoint Management',
    excerpt:
      'Co-management has blurred the lines, but the strategic direction is clear. We break down when SCCM still earns its place and when Intune-only is the right call.',
    productA: 'Microsoft Intune',
    productB: 'SCCM / MECM',
    winner: 'Microsoft Intune',
    verdict:
      'For new cloud-managed endpoints, Intune is usually the right starting point. SCCM still has a role in complex OSD, large software distribution, detailed on-prem reporting, and restricted networks. Many estates need staged co-management rather than a rushed replacement.',
    date: 'Mar 24, 2025',
    publishedAt: '2025-03-24',
    readTime: '12 min read',
    authorId: 'sarah-chen',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Windows Defender vs. CrowdStrike Falcon: Enterprise Endpoint Protection Compared',
    slug: 'windows-defender-vs-crowdstrike-falcon',
    category: 'Endpoint Security',
    excerpt:
      'Defender for Endpoint and CrowdStrike Falcon fit different operating models. Compare licensing, investigation workflow, estate mix, update control, and SOC needs before choosing.',
    productA: 'Microsoft Defender for Endpoint',
    productB: 'CrowdStrike Falcon',
    verdict:
      'For Microsoft-centred environments already on E5, Defender for Endpoint is often easier to operate. CrowdStrike remains strong where investigation depth, cross-platform coverage, and specialist SOC workflows matter more than licensing consolidation.',
    date: 'Mar 10, 2025',
    publishedAt: '2025-03-10',
    readTime: '11 min read',
    authorId: 'marcus-webb',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Entra ID Premium P1 vs. P2: Is the Upgrade Worth It?',
    slug: 'entra-id-p1-vs-p2',
    category: 'Microsoft Entra ID',
    excerpt:
      'P2 adds Privileged Identity Management, Identity Protection risk policies, and access reviews, but not every organisation needs all three. Here is how to make the call.',
    productA: 'Entra ID P1',
    productB: 'Entra ID P2',
    winner: 'Entra ID P2',
    verdict:
      'P2 is worthwhile when privileged access, external access reviews, or compliance evidence are owned operational processes. For smaller tenants without those drivers, P1 covers Conditional Access and SSPR fundamentals well.',
    date: 'Feb 20, 2025',
    publishedAt: '2025-02-20',
    readTime: '8 min read',
    authorId: 'priya-nair',
    isFeatured: true,
  },
]
