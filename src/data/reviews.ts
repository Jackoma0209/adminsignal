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
    title: 'CrowdStrike Falcon Go: Admin Buyer Notes for SMB Endpoint Protection',
    slug: 'crowdstrike-falcon-go-review',
    productName: 'CrowdStrike Falcon Go',
    category: 'Endpoint Security',
    excerpt:
      'Admin buyer notes for Falcon Go: where the lower tier can fit, where investigation depth is limited, and what to check before replacing or supplementing Defender.',
    rating: 4.2,
    pros: [
      'Dedicated endpoint protection console for smaller teams',
      'Falcon platform upgrade path if needs grow',
      'Policy and exclusion model is familiar across Falcon tiers',
      'Strong integration with the broader Falcon platform',
    ],
    cons: [
      'Limited custom detection rules compared to Enterprise tier',
      'Threat graph analysis is read-only at this tier',
      'Support terms vary by package and need checking before purchase',
    ],
    verdict:
      'Falcon Go is a credible option for smaller organisations that want dedicated endpoint protection, but the tier needs careful checking for investigation, support, update control, and exclusion workflow limits.',
    date: 'Mar 18, 2025',
    publishedAt: '2025-03-18',
    readTime: '8 min read',
    authorId: 'marcus-webb',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Nerdio for Intune: Admin Buyer Notes for AVD Management',
    slug: 'nerdio-for-intune-review',
    productName: 'Nerdio for Intune',
    category: 'Endpoint Management',
    excerpt:
      'A practical evaluation guide for Nerdio for Intune, covering AVD host pool management, image lifecycle, licensing, admin delegation, and rollback planning.',
    rating: 4.5,
    pros: [
      'Centralises common AVD and Windows 365 administration tasks',
      'Can make host pool scaling and image lifecycle more repeatable',
      'Useful operational view across AVD, Intune, and session hosts',
      'Good fit where manual AVD runbooks are becoming hard to maintain',
    ],
    cons: [
      'Licensing model can be complex for mixed AVD/physical device environments',
      'Reporting depth should be validated against actual requirements',
    ],
    verdict:
      'Nerdio is worth evaluating when AVD or Windows 365 administration has become a regular operational burden. Validate licensing, delegation, reporting, and fallback processes before making it the main control plane.',
    date: 'Feb 28, 2025',
    publishedAt: '2025-02-28',
    readTime: '10 min read',
    authorId: 'sarah-chen',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Veeam Backup for Microsoft 365: Admin Buyer Notes',
    slug: 'veeam-backup-m365-review',
    productName: 'Veeam Backup for Microsoft 365',
    category: 'Microsoft 365',
    excerpt:
      "Microsoft's native M365 retention is not the same as backup. These admin notes cover Veeam's fit, storage design, restore testing, permissions, and operating model.",
    rating: 4.6,
    pros: [
      'Granular restore for Exchange, SharePoint, Teams, and OneDrive',
      'Flexible storage targets including immutable object storage',
      'Supports immutable object storage designs',
      'Restore workflows cover common mailbox and content recovery needs',
    ],
    cons: [
      'Initial storage sizing can be underestimated without guidance',
      'UI for Teams data restore is less intuitive than Exchange restore',
    ],
    verdict:
      'Veeam is a serious option for Microsoft 365 backup when the team is ready to own storage, monitoring, restore testing, and backup-server operations. Teams wanting fully managed SaaS backup should compare operating models carefully.',
    date: 'Feb 10, 2025',
    publishedAt: '2025-02-10',
    readTime: '9 min read',
    authorId: 'priya-nair',
    isFeatured: true,
  },
]
