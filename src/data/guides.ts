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
    id: '17',
    title: 'When to keep ConfigMgr task-sequence OSD next to Autopilot',
    slug: 'retain-configmgr-osd-alongside-autopilot',
    category: 'Configuration Manager',
    excerpt:
      'Provisioning is not a co-management workload. Separate bare-metal, existing-device refresh, new-device Autopilot and recovery before you retire task-sequence OSD.',
    date: 'Sep 10, 2026',
    publishedAt: '2026-09-10',
    readTime: '11 min read',
    difficulty: 'Intermediate',
    authorId: 'jack',
    tags: ['Configuration Manager', 'OSD', 'Autopilot', 'Provisioning', 'MECM'],
  },
