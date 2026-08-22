import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Group Policy'
const topicDescription =
  'Published Group Policy coverage currently on AdminSignal is two diagnosis articles — RSoP/gpresult and GPO not applying — plus coexistence notes in the Intune Settings Catalog migration guide.'
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
        introSections={[
          {
            title: 'Start with scope and evidence, not gpupdate',
            body: 'Most Group Policy failures are scope problems: wrong OU, blocked inheritance, security filtering, WMI filters, loopback mode, or a competing cloud policy. Collect RSoP or gpresult evidence before forcing another refresh cycle.',
          },
          {
            title: 'Coexistence with Intune and security baselines',
            body: 'Treat GPO and Intune Settings Catalog as one control plane in design reviews. Duplicate settings create conflict winners that are hard to explain to helpdesk and auditors. Inventory overlapping controls before hardening or migrating baselines.',
          },
          {
            title: 'What this hub currently publishes',
            body: 'Two diagnosis articles are live: Group Policy troubleshooting with RSoP and gpresult, and Group Policy not applying. Coexistence with Intune is covered in the Settings Catalog migration guide. There is not a GPO design catalogue or a loopback-mode tutorial yet.',
          },
          {
            title: 'When not to add another GPO',
            body: 'Do not create one-off GPOs for single machines or temporary exceptions without an expiry owner. Prefer a pilot OU, security group filtering, or an Intune assignment group with a removal date. Unowned exceptions become permanent drift.',
          },
        ]}
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
