import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Microsoft 365'
const topicDescription =
  'Published Microsoft 365 coverage currently on AdminSignal: Exchange Online SMTP AUTH migration, admin-centre MFA readiness, and Conditional Access policy mapping. This hub does not yet include SharePoint or Teams tutorials.'
const topicPath = '/microsoft-365'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'microsoft-365',
})

export default function Microsoft365Page() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Microsoft 365', 'Exchange Online', 'SMTP AUTH', 'MFA'],
    newsCategories: ['Microsoft 365'],
    guideTags: ['Microsoft 365', 'Exchange Online', 'SMTP AUTH', 'Conditional Access', 'MFA'],
    guideCategories: ['Microsoft 365'],
    troubleshootingCategories: ['Microsoft 365'],
    affectedProducts: ['Microsoft 365', 'Exchange Online', 'Microsoft Entra ID'],
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
            title: 'Mail flow and admin access are the current published work',
            body: 'The live Microsoft 365 articles on this site cover SMTP AUTH Basic Authentication retirement, mandatory MFA for the admin centre, and Conditional Access policy mapping. They are operational playbooks, not a SharePoint, Teams, or licensing catalogue.',
          },
          {
            title: 'Inventory senders before you close the protocol',
            body: 'Printers, scanners, report servers, and stored-credential Exchange Online scripts fail independently of user MFA. Collect the SMTP AUTH Clients report and Entra sign-in evidence before changing tenant or mailbox controls.',
          },
          {
            title: 'Treat break-glass as part of the MFA project',
            body: 'Admin MFA readiness is incomplete if emergency access accounts, security defaults, and Conditional Access exclusions are still undecided. Locking out the only remaining admin role is a change-control failure, not a security win.',
          },
          {
            title: 'What this hub will not claim',
            body: 'There are no published Teams voice, SharePoint migration, or Microsoft 365 Copilot tutorials here yet. Those topics stay off this page until a complete, sourced article exists.',
          },
        ]}
        news={news}
        tutorials={tutorials}
        troubleshooting={troubleshooting}
        relatedTopics={[
          { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'Patch Management', href: '/patch-management' },
        ]}
      />
    </>
  )
}
