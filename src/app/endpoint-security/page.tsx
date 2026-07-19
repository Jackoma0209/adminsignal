import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Endpoint Security'
const topicDescription =
  'Verified endpoint-security coverage for Microsoft Defender, BitLocker, Windows hardening, local administrator control, compliance, and incident-focused troubleshooting.'
const topicPath = '/endpoint-security'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'endpoint-security',
})

export default function EndpointSecurityPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Security', 'Endpoint Security', 'Microsoft Defender'],
    newsCategories: ['Endpoint Security', 'Security Alert'],
    guideTags: ['Endpoint Security', 'Hardening', 'CIS Benchmark', 'LAPS', 'BitLocker'],
    guideCategories: ['Endpoint Security'],
    troubleshootingCategories: ['Endpoint Security'],
    affectedProducts: ['Microsoft Defender', 'BitLocker', 'Windows LAPS'],
    troubleshootingLimit: 6,
  })

  const jsonLdCollection = collectionPageSchema({
    title: topicName,
    description: topicDescription,
    url: topicUrl,
    items: allItems.map((item) => ({
      name: item.title,
      url: `https://www.adminsignal.com${item.href}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Topic Hubs', url: 'https://www.adminsignal.com/topics' },
    { name: topicName, url: topicUrl },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />
      <TopicHubPageTemplate
        topicName={topicName}
        description={topicDescription}
        news={news}
        tutorials={tutorials}
        troubleshooting={troubleshooting}
        relatedTopics={[
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
          { name: 'Patch Management', href: '/patch-management' },
          { name: 'Group Policy', href: '/group-policy' },
          { name: 'Windows Server', href: '/windows-server' },
        ]}
      />
    </>
  )
}
