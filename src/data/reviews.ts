export interface Review {
  id: string
  title: string
  slug: string
  productName: string
  category: string
  excerpt: string
  rating: number
  pros: string[]
  cons: string[]
  verdict: string
  date: string
  publishedAt: string
  readTime: string
  authorId: string
  badge?: 'Editors Choice' | 'Best Value' | 'Recommended'
  isFeatured?: boolean
}

export const reviews: Review[] = [
  {
    id: '1',
    title: 'CrowdStrike Falcon Go: Is It Right for SMB Endpoint Protection?',
    slug: 'crowdstrike-falcon-go-review',
    productName: 'CrowdStrike Falcon Go',
    category: 'Endpoint Security',
    excerpt:
      'CrowdStrike Falcon Go brings enterprise-grade EDR to smaller teams at a lower price point — but does it deliver enough visibility for engineers who need more than antivirus?',
    rating: 4.2,
    pros: [
      'Lightweight sensor with minimal performance impact',
      'Excellent threat intelligence and behavioral detection',
      'Clean, intuitive management console',
      'Strong integration with the broader Falcon platform',
    ],
    cons: [
      'Limited custom detection rules compared to Enterprise tier',
      'Threat graph analysis is read-only at this tier',
      'Support response times slower than Enterprise contracts',
    ],
    verdict:
      'Falcon Go is a credible choice for SMBs that have outgrown basic AV but cannot justify full Enterprise pricing. The sensor quality and detection engine are the same — what you lose is depth of investigation and customisation.',
    date: 'Mar 18, 2025',
    publishedAt: '2025-03-18',
    readTime: '8 min read',
    authorId: 'marcus-webb',
    badge: 'Recommended',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Nerdio for Intune: Azure Virtual Desktop Management Reviewed',
    slug: 'nerdio-for-intune-review',
    productName: 'Nerdio for Intune',
    category: 'Endpoint Management',
    excerpt:
      'Nerdio positions itself as the missing management layer for Azure Virtual Desktop and Windows 365. We put it through its paces for six weeks across a real client deployment.',
    rating: 4.5,
    pros: [
      'Dramatically simplifies AVD host pool scaling and lifecycle',
      'Cost optimisation engine shows genuine savings',
      'Strong Intune policy sync and reporting',
      'Excellent support and documentation',
    ],
    cons: [
      'Licensing model can be complex for mixed AVD/physical device environments',
      'Some reporting features lag behind the roadmap promises',
    ],
    verdict:
      "If you're managing more than 50 AVD sessions, Nerdio pays for itself in reduced operational overhead within the first month. The Intune integration is tighter than most competitors.",
    date: 'Feb 28, 2025',
    publishedAt: '2025-02-28',
    readTime: '10 min read',
    authorId: 'sarah-chen',
    badge: 'Editors Choice',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Veeam Backup for Microsoft 365: Complete Review for IT Teams',
    slug: 'veeam-backup-m365-review',
    productName: 'Veeam Backup for Microsoft 365',
    category: 'Microsoft 365',
    excerpt:
      "Microsoft's native M365 retention is not a backup. Veeam fills the gap — but the licensing model and storage architecture require careful planning before you commit.",
    rating: 4.6,
    pros: [
      'Granular restore for Exchange, SharePoint, Teams, and OneDrive',
      'Flexible storage targets including immutable object storage',
      'REST API for automation and reporting',
      'No per-user overage surprises on most licensing tiers',
    ],
    cons: [
      'Initial storage sizing can be underestimated without guidance',
      'UI for Teams data restore is less intuitive than Exchange restore',
    ],
    verdict:
      'Veeam remains the benchmark for M365 backup. The granular recovery options and storage flexibility make it the default recommendation for any organisation that has done an honest audit of what Microsoft actually retains.',
    date: 'Feb 10, 2025',
    publishedAt: '2025-02-10',
    readTime: '9 min read',
    authorId: 'priya-nair',
    badge: 'Editors Choice',
    isFeatured: true,
  },
]
