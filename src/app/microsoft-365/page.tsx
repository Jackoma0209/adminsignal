import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Microsoft 365'
const topicDescription =
  'Verified Microsoft 365 coverage for Exchange Online, SharePoint, Teams, tenant governance, security, compliance, and administrative troubleshooting.'
const topicPath = '/microsoft-365'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'microsoft-365',
})

export default function Microsoft365Page() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Microsoft 365', 'Exchange Online', 'Microsoft Teams', 'SharePoint'],
    newsCategories: ['Microsoft 365'],
    guideTags: ['Microsoft 365', 'Exchange Online', 'Microsoft Teams', 'SharePoint'],
    guideCategories: ['Microsoft 365'],
    troubleshootingCategories: ['Microsoft 365'],
    affectedProducts: ['Microsoft 365', 'Exchange Online', 'Microsoft Teams', 'SharePoint Online'],
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
          { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'Patch Management', href: '/patch-management' },
        ]}
      />
    </>
  )
}
