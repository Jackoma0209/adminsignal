import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Group Policy'
const topicDescription =
  'Verified Group Policy coverage for GPO design, processing order, scope, RSoP, gpresult, troubleshooting, and coexistence with cloud-managed policy.'
const topicPath = '/group-policy'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'group-policy',
})

export default function GroupPolicyPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Group Policy', 'GPO'],
    newsCategories: ['Group Policy'],
    guideTags: ['Group Policy', 'GPO', 'RSoP'],
    guideCategories: ['Group Policy'],
    troubleshootingCategories: ['Group Policy'],
    affectedProducts: ['Group Policy', 'Active Directory'],
    guideLimit: 6,
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
          { name: 'Windows Server', href: '/windows-server' },
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'SCCM / MECM', href: '/sccm-mecm' },
        ]}
      />
    </>
  )
}
