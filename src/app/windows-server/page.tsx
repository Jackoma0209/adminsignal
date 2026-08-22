import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Windows Server'
const topicDescription =
  'Published Windows Server coverage currently on AdminSignal: Group Policy processing against Active Directory, and Secure Boot CA 2023 readiness for server fleets. This hub does not yet include DNS, DHCP, backup, or monitoring tutorials.'
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
        introSections={[
          {
            title: 'Treat identity, DNS, and patching as one operational chain',
            body: 'Windows Server issues rarely stay inside one role. Authentication failures often involve DNS, time sync, certificate trust, or Group Policy delivery. Capture which service failed, which dependency it needs, and which event logs prove the failure before changing production settings.',
          },
          {
            title: 'Patch and reboot ownership must be explicit',
            body: 'Domain controllers, file servers, and application hosts need different maintenance windows and rollback plans. Document who approves reboots, how cluster or failover roles are protected, and which monitoring alert confirms the service returned healthy after patching.',
          },
          {
            title: 'Hardening without breaking line-of-business paths',
            body: 'Baseline changes for SMB, TLS, local admin rights, and audit policy should go through a pilot OU or pilot server group first. Record the application owners who signed off and the exact setting that caused a regression if rollback is required.',
          },
          {
            title: 'When not to rush cloud-only replacement',
            body: 'Some server workloads still depend on local AD, on-premises file services, or network-adjacent management tools. Move the workloads that are ready, keep the ones that are not, and avoid deleting recovery paths before the replacement is proven under failure conditions.',
          },
        ]}
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
