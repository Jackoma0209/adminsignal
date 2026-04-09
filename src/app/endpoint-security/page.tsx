import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Endpoint Security'
const topicDescription =
  'AV, EDR, attack surface reduction, and Microsoft Defender for Endpoint configuration and operations.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'endpoint-security',
})

export default function EndpointSecurityPage() {
  const news = signals
    .filter(
      (s) =>
        s.tags?.includes('Security') ||
        s.category === 'Endpoint Security' ||
        s.category === 'Security Alert'
    )
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Endpoint Security') || g.category === 'Endpoint Security')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Security') || s.tags.includes('Hardening'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language}`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Comparisons', href: '/comparisons' },
  ]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/endpoint-security',
    items: [...news, ...tutorials, ...scriptItems].map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/endpoint-security' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <TopicHubPageTemplate
        topicName={topicName}
        description="Antivirus, EDR, attack surface reduction rules, and Microsoft Defender for Endpoint. Practical guidance for hardening and monitoring endpoints at scale."
        news={news}
        tutorials={tutorials}
        scripts={scriptItems}
        relatedTopics={relatedTopics}
      />
    </>
  )
}
