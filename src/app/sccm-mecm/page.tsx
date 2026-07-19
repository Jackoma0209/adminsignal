import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'SCCM / MECM'
const topicDescription =
  'Verified Configuration Manager coverage for operating-system deployment, software distribution, patching, co-management, migration planning, and client troubleshooting.'
const topicPath = '/sccm-mecm'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'sccm-mecm',
})

export default function SccmMecmPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['SCCM', 'MECM', 'Configuration Manager', 'Co-management'],
    newsCategories: ['SCCM / MECM', 'Endpoint Management'],
    guideTags: ['SCCM', 'MECM', 'Configuration Manager', 'Co-management'],
    guideCategories: ['SCCM / MECM', 'Endpoint Management'],
    troubleshootingCategories: ['SCCM / MECM', 'Endpoint Management'],
    affectedProducts: ['Microsoft Configuration Manager', 'SCCM', 'MECM'],
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
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'Patch Management', href: '/patch-management' },
          { name: 'Windows Server', href: '/windows-server' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'Group Policy', href: '/group-policy' },
        ]}
      />
    </>
  )
}
