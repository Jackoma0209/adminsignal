import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Microsoft Intune'
const topicDescription =
  'Published AdminSignal coverage for Microsoft Intune: Settings Catalog migration, Windows Update rings, Win32 app failures, device sync, remediations, Company Portal enrolment, and Autopilot hardware-hash imports.'
const topicPath = '/intune'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'intune',
})

export default function IntunePage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Intune', 'Microsoft Intune'],
    newsCategories: ['Microsoft Intune'],
    guideTags: ['Intune', 'Microsoft Intune', 'Windows Autopilot'],
    guideCategories: ['Microsoft Intune'],
    troubleshootingCategories: ['Microsoft Intune'],
    affectedProducts: ['Microsoft Intune', 'Windows Autopilot'],
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
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'Patch Management', href: '/patch-management' },
          { name: 'SCCM / MECM', href: '/sccm-mecm' },
          { name: 'PowerShell', href: '/powershell' },
        ]}
      />
    </>
  )
}
