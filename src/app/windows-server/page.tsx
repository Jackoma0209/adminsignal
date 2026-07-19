import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Windows Server'
const topicDescription =
  'Verified Windows Server coverage for Active Directory, DNS, DHCP, patching, hardening, backup, monitoring, and administrative troubleshooting.'
const topicPath = '/windows-server'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'windows-server',
})

export default function WindowsServerPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Windows Server', 'Active Directory', 'DNS'],
    newsCategories: ['Windows Server'],
    guideTags: ['Windows Server', 'Active Directory', 'DNS', 'DHCP'],
    guideCategories: ['Windows Server'],
    troubleshootingCategories: ['Windows Server'],
    affectedProducts: ['Windows Server', 'Active Directory', 'DNS', 'DHCP'],
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
          { name: 'Group Policy', href: '/group-policy' },
          { name: 'Patch Management', href: '/patch-management' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'SCCM / MECM', href: '/sccm-mecm' },
        ]}
      />
    </>
  )
}
