export interface Review {
  id: string
  title: string
  slug: string
  productName: string
  category: string
  excerpt: string
  documentedStrengths: string[]
  validationQuestions: string[]
  summary: string
  date: string
  publishedAt: string
  readTime: string
  authorId: string
  isFeatured?: boolean
  /**
   * Legacy compatibility only. Numerical review scores are intentionally not
   * populated while these research notes remain noindex and evidence-limited.
   */
  rating?: number
}

/**
 * Research-based product evaluation notes.
 *
 * These records deliberately contain no numerical ratings, awards, deployment
 * claims, benchmark claims, or implied firsthand-use claims. The associated
 * routes remain noindex until stronger evidence and source coverage are added.
 * A neutral category keeps legacy topic templates from promoting them as
 * scored product reviews.
 */
export const reviews: Review[] = [
  {
    id: '1',
    title: 'CrowdStrike Falcon Go: Evaluation Notes for SMB Endpoint Protection',
    slug: 'crowdstrike-falcon-go-review',
    productName: 'CrowdStrike Falcon Go',
    category: 'Product Evaluation',
    excerpt:
      'Research notes for evaluating Falcon Go, focused on tier boundaries, deployment planning, investigation requirements, update control, support terms, and comparison with existing Microsoft licensing.',
    documentedStrengths: [
      'A dedicated endpoint-protection console aimed at smaller organisations',
      'An upgrade path within the broader Falcon platform',
      'Central policy, device, alert, and exclusion workflows described in vendor documentation',
    ],
    validationQuestions: [
      'Which investigation and threat-hunting capabilities are included in the exact package being quoted?',
      'What sensor update controls, support terms, retention limits, and response services are included?',
      'Does existing Microsoft 365 licensing already cover the required Defender capabilities?',
    ],
    summary:
      'Falcon Go may belong on a shortlist for smaller teams seeking a dedicated endpoint-protection product, but package boundaries, investigation depth, update control, support, and coexistence with Microsoft Defender must be verified before purchase.',
    date: 'Mar 29, 2026',
    publishedAt: '2026-03-29',
    readTime: '8 min read',
    authorId: 'jack',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Nerdio for Intune: Evaluation Notes for AVD Management',
    slug: 'nerdio-for-intune-review',
    productName: 'Nerdio for Intune',
    category: 'Product Evaluation',
    excerpt:
      'A source-backed planning guide for evaluating Nerdio alongside Azure Virtual Desktop, Windows 365, Intune, image management, delegated administration, licensing, and rollback requirements.',
    documentedStrengths: [
      'A management layer designed to bring common AVD, Windows 365, and endpoint workflows together',
      'Automation features intended to reduce repetitive host-pool and image-lifecycle administration',
      'Delegation and operational views that may help teams managing multiple environments',
    ],
    validationQuestions: [
      'How does the quoted licensing model apply to physical devices, AVD hosts, Windows 365, and mixed estates?',
      'Which tasks remain dependent on Azure, Intune, or custom runbooks outside Nerdio?',
      'Can the team export configuration, recover from automation failure, and operate temporarily without the management layer?',
    ],
    summary:
      'Nerdio is worth structured evaluation where AVD or Windows 365 administration creates sustained operational overhead. Licensing, delegated access, reporting, change control, and fallback processes need tenant-specific validation.',
    date: 'Mar 26, 2026',
    publishedAt: '2026-03-26',
    readTime: '10 min read',
    authorId: 'jack',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Veeam Backup for Microsoft 365: Evaluation Notes',
    slug: 'veeam-backup-m365-review',
    productName: 'Veeam Backup for Microsoft 365',
    category: 'Product Evaluation',
    excerpt:
      'Research notes for evaluating Microsoft 365 backup requirements, Veeam deployment models, storage ownership, permissions, restore testing, monitoring, and operational responsibility.',
    documentedStrengths: [
      'Workload-level backup and restore coverage described for Exchange, SharePoint, OneDrive, and Teams data',
      'Deployment options that allow organisations to choose and manage supported storage targets',
      'Restore workflows intended for granular content recovery rather than retention policy alone',
    ],
    validationQuestions: [
      'Who owns storage sizing, immutability, monitoring, upgrades, and restore testing?',
      'Which Microsoft 365 data types, metadata, and Teams components are included in the current version?',
      'Would a managed SaaS backup model better match the organisation’s support capacity?',
    ],
    summary:
      'Veeam can be evaluated where the organisation wants a Microsoft 365 backup platform and is prepared to own the selected operating model. Storage, permissions, recovery objectives, restore testing, and ongoing administration require explicit design decisions.',
    date: 'Mar 24, 2026',
    publishedAt: '2026-03-24',
    readTime: '9 min read',
    authorId: 'jack',
    isFeatured: true,
  },
]
