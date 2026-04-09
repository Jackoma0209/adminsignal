import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Group Policy'
const topicDescription =
  'GPO design, ADMX templates, WMI filters, and loopback processing for Windows administrators.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'group-policy',
})

export default function GroupPolicyPage() {
  const news = signals
    .filter((s) => s.tags?.includes('Group Policy') || s.tags?.includes('ADMX'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Group Policy') || g.category === 'Group Policy')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Group Policy') || s.tags.includes('Active Directory'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language}`,
    }))

  const relatedTopics = [
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'PowerShell', href: '/powershell' },
  ]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/group-policy',
    items: [...news, ...tutorials, ...scriptItems].map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/group-policy' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <TopicHubPageTemplate
        topicName={topicName}
        description="GPO design, ADMX templates, WMI filters, and loopback processing. Deep-dive guidance for administrators managing Windows through Group Policy."
        news={news}
        tutorials={tutorials}
        scripts={scriptItems}
        relatedTopics={relatedTopics}
      />
    </>
  )
}
