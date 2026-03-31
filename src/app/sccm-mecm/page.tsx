import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildTopicMetadata({
  topicName: 'SCCM / MECM',
  description:
    'Configuration Manager deployments, OSD, software distribution, patch management, co-management, and migration to Intune.',
  slug: 'sccm-mecm',
})

export default function SccmMecmPage() {
  const news = signals
    .filter((s) => s.tags?.includes('SCCM') || s.tags?.includes('MECM') || s.category === 'SCCM / MECM')
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('SCCM') || g.tags?.includes('MECM') || g.category === 'SCCM / MECM')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('WSUS') || s.tags.includes('Patch Management'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language} · ${s.stars} stars`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'PowerShell', href: '/powershell' },
  ]

  return (
    <TopicHubPageTemplate
      topicName="SCCM / MECM"
      description="Configuration Manager for OSD, software distribution, patch management, and co-management with Intune. Guidance for teams running hybrid or on-premises endpoint management."
      articleCount={112}
      news={news}
      tutorials={tutorials}
      scripts={scriptItems}
      relatedTopics={relatedTopics}
    />
  )
}
