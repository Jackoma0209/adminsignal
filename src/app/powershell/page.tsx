import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'PowerShell'
const topicDescription =
  'Verified PowerShell tutorials and troubleshooting for Windows, Microsoft 365, Graph API, endpoint reporting, and repeatable administrative automation.'
const topicPath = '/powershell'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'powershell',
})

export default function PowerShellPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['PowerShell', 'Microsoft Graph'],
    newsCategories: ['PowerShell'],
    guideTags: ['PowerShell', 'Microsoft Graph', 'Graph API', 'Automation'],
    guideCategories: ['PowerShell'],
    troubleshootingCategories: ['PowerShell'],
    affectedProducts: ['PowerShell', 'Microsoft Graph'],
    guideLimit: 6,
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
          { name: 'Microsoft 365', href: '/microsoft-365' },
          { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
          { name: 'Windows Server', href: '/windows-server' },
          { name: 'SCCM / MECM', href: '/sccm-mecm' },
        ]}
      />
    </>
  )
}
