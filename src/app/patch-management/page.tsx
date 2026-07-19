import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Patch Management'
const topicDescription =
  'Verified patch-management coverage for Windows Update for Business, Intune update policy, WSUS, rollout planning, compliance reporting, and update troubleshooting.'
const topicPath = '/patch-management'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'patch-management',
})

export default function PatchManagementPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Patch Management', 'Patch Tuesday', 'Windows Update', 'WSUS'],
    newsCategories: ['Patch Management', 'Patch Tuesday'],
    guideTags: ['Patch Management', 'Windows Update', 'WSUS', 'Update Rings'],
    guideCategories: ['Patch Management'],
    troubleshootingCategories: ['Patch Management'],
    affectedProducts: ['Windows Update', 'WSUS', 'Microsoft Intune'],
    newsLimit: 6,
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
          { name: 'Windows Server', href: '/windows-server' },
          { name: 'SCCM / MECM', href: '/sccm-mecm' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'PowerShell', href: '/powershell' },
        ]}
      />
    </>
  )
}
