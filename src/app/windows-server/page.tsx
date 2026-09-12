import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Windows Server'
const topicDescription =
  'Published Windows Server coverage on AdminSignal: Group Policy processing against Active Directory, Secure Boot CA 2023 readiness for server fleets, and related servicing notes. This hub is not a DNS, DHCP, backup, or monitoring library.'
const topicPath = '/windows-server'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'windows-server',
})

export default function WindowsServerPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Windows Server', 'Active Directory', 'Secure Boot'],
    newsCategories: ['Windows Server'],
    guideTags: ['Windows Server', 'Active Directory', 'Group Policy', 'Secure Boot'],
    guideCategories: ['Windows Server'],
    troubleshootingCategories: ['Windows Server', 'Group Policy'],
    affectedProducts: ['Windows Server', 'Active Directory', 'Group Policy'],
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
        introSections={[
          {
            title: 'What this hub currently publishes',
            body: 'AdminSignal’s Windows Server pages cover Group Policy processing against Active Directory, Secure Boot CA 2023 readiness for server fleets, and related servicing notes. They are not a DNS, DHCP, file-services, clustering, or backup tutorial library.',
          },
          {
            title: 'Collect RSoP evidence before another gpupdate',
            body: 'Most “the GPO did not apply on the server” tickets are scope problems: wrong OU, blocked inheritance, security filtering, or a competing cloud policy. Capture computer and user RSoP or gpresult before forcing another refresh cycle.',
          },
          {
            title: 'Secure Boot CA 2023 is a fleet change',
            body: 'The 2023 certificate authority rollout is a sequenced firmware and OS trust change, not a single BIOS tick-box. Use the published readiness guide for inventory and rollback ownership rather than assuming every server can flip in one window.',
          },
          {
            title: 'Out of scope on this hub',
            body: 'This hub does not publish DNS, DHCP, file-server, clustering, or backup runbooks. Those subjects stay off the page until a complete, sourced article exists.',
          },
        ]}
        news={news}
        tutorials={tutorials}
        troubleshooting={troubleshooting}
        relatedTopics={[
          { name: 'Patch Management', href: '/patch-management' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'Configuration Manager', href: '/sccm-mecm' },
        ]}
      />
    </>
  )
}
