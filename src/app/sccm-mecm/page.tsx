import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'SCCM / MECM'
const topicDescription =
  'Configuration Manager deployments, OSD, software distribution, patch management, co-management, and migration to Intune.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
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
      meta: `${s.language}`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'PowerShell', href: '/powershell' },
  ]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/sccm-mecm',
    items: [...news, ...tutorials, ...scriptItems].map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/sccm-mecm' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <TopicHubPageTemplate
        topicName={topicName}
        description="Configuration Manager for OSD, software distribution, patch management, and co-management with Intune. Guidance for teams running hybrid or on-premises endpoint management."
        news={news}
        tutorials={tutorials}
        scripts={scriptItems}
        relatedTopics={relatedTopics}
      />
    </>
  )
}
