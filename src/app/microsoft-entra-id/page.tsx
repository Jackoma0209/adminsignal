import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Microsoft Entra ID'
const topicDescription =
  'Verified Microsoft Entra ID coverage for identity management, Conditional Access, privileged access, app registrations, device identity, and audit-focused troubleshooting.'
const topicPath = '/microsoft-entra-id'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'microsoft-entra-id',
})

export default function MicrosoftEntraIdPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Microsoft Entra ID', 'Entra ID', 'Conditional Access', 'Identity'],
    newsCategories: ['Microsoft Entra ID'],
    guideTags: ['Microsoft Entra ID', 'Entra ID', 'Conditional Access', 'Identity'],
    guideCategories: ['Microsoft Entra ID'],
    troubleshootingCategories: ['Microsoft Entra ID'],
    affectedProducts: ['Microsoft Entra ID', 'Entra ID', 'Conditional Access'],
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
          { name: 'Microsoft 365', href: '/microsoft-365' },
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'Group Policy', href: '/group-policy' },
        ]}
      />
    </>
  )
}
