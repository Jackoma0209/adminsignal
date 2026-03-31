import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildTopicMetadata({
  topicName: 'Microsoft 365',
  description:
    'Exchange Online, Teams, SharePoint, licensing, conditional access, and tenant governance for IT admins and sysadmins.',
  slug: 'microsoft-365',
})

export default function Microsoft365Page() {
  const news = signals
    .filter((s) => s.tags?.includes('Microsoft 365') || s.category === 'Microsoft 365')
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Microsoft 365') || g.category === 'Microsoft 365')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Graph API') || s.tags.includes('Intune'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language} · ${s.stars} stars`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Endpoint Management', href: '/endpoint-management' },
    { name: 'Security & Defender', href: '/security-defender' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
    { name: 'PowerShell', href: '/powershell' },
  ]

  return (
    <TopicHubPageTemplate
      topicName="Microsoft 365"
      description="Exchange Online, Teams, SharePoint, Entra ID, and tenant governance. Practical guidance for IT teams managing cloud-first Microsoft environments."
      articleCount={174}
      news={news}
      tutorials={tutorials}
      scripts={scriptItems}
      relatedTopics={relatedTopics}
    />
  )
}
