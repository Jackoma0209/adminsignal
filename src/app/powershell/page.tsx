import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'PowerShell'
const topicDescription =
  'Published PowerShell coverage currently on AdminSignal: AzureAD/MSOnline to Graph SDK migration, software inventory patterns, and Graph examples used in Intune and Microsoft 365 guides. This hub is not a downloadable script catalogue.'
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
        introSections={[
          {
            title: 'Inventory the script before rewriting the cmdlet',
            body: 'Most AzureAD and MSOnline failures are not a missing Graph equivalent. They are an undocumented identity, a write action nobody owns, or a scheduled task that still authenticates with a stored password. Capture the host, identity, permissions, output, and rollback owner before you replace a single command.',
          },
          {
            title: 'Graph work is permission discovery, not search-and-replace',
            body: 'Map the Graph resource, delegated versus application permissions, paging, and throttling for each script. A renamed cmdlet that still pulls every user in the tenant, or that silently uses the beta endpoint, is not a completed migration.',
          },
          {
            title: 'Example fragments are not a script library',
            body: 'AdminSignal PowerShell pages show command shape, expected output, and safety notes. They are not signed releases or copy-and-run production tools. Rebuild any automation from reviewed requirements and test it in an authorised lab first.',
          },
          {
            title: 'When not to automate yet',
            body: 'Do not wrap a write action — licence assignment, group membership, session revocation, or device delete — in a scheduled job until the read-only report is trusted and a named owner can reverse the change.',
          },
        ]}
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
