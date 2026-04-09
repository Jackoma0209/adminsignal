import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Windows Server'
const topicDescription =
  'Active Directory, DNS, DHCP, file services, and server hardening for Windows Server administrators.'

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'windows-server',
})

export default function WindowsServerPage() {
  const news = signals
    .filter((s) => s.tags?.includes('Windows') || s.category === 'Windows Server')
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Windows Server') || g.tags?.includes('Active Directory'))
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Active Directory') || s.tags.includes('Windows Server'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language}`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Group Policy', href: '/group-policy' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
  ]

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: 'https://www.adminsignal.com/windows-server',
    items: [...news, ...tutorials, ...scriptItems].map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: 'https://www.adminsignal.com/windows-server' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <TopicHubPageTemplate
        topicName={topicName}
        description="Active Directory, DNS, DHCP, file services, and server hardening. Practical guidance for administrators managing Windows Server environments."
        news={news}
        tutorials={tutorials}
        scripts={scriptItems}
        relatedTopics={relatedTopics}
      />
    </>
  )
}
