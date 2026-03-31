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
      'For new deployments and cloud-first organisations, Intune is the clear path. SCCM still has a role in environments with complex OSD requirements, large software distribution needs, or significant on-premises infrastructure — but plan your exit strategy.',
    date: 'Mar 24, 2025',
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
      'Defender for Endpoint has closed the gap significantly, but CrowdStrike still leads in threat intelligence depth and cross-platform visibility. Here is where each excels.',
    productA: 'Microsoft Defender for Endpoint',
    productB: 'CrowdStrike Falcon',
    verdict:
      'For Microsoft-only environments already on E5 licensing, Defender for Endpoint is compelling and economical. CrowdStrike wins on threat intelligence, cross-platform coverage, and speed of response in hybrid environments.',
    date: 'Mar 10, 2025',
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
      'P2 adds Privileged Identity Management, Identity Protection risk policies, and access reviews — but not every organisation needs all three. Here is how to make the call.',
    productA: 'Entra ID P1',
    productB: 'Entra ID P2',
    winner: 'Entra ID P2',
    verdict:
      'If you have privileged accounts, external access, or compliance requirements around access certification, P2 pays back in risk reduction and audit defensibility. For smaller tenants without those drivers, P1 covers the Conditional Access and SSPR fundamentals well.',
    date: 'Feb 20, 2025',
    readTime: '8 min read',
    authorId: 'priya-nair',
    isFeatured: true,
  },
]
