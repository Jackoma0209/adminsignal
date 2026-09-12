import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Group Policy diagnosis and Intune coexistence'
const description =
  'Published Group Policy coverage on AdminSignal: prove why a setting is not applying, then decide whether that setting should stay in Active Directory or move to Intune Settings Catalog. This hub is not a domain-design library or a GPO tool catalogue.'
const topicPath = '/group-policy'
const topicUrl = `https://www.adminsignal.com${topicPath}`

const troubleshooting = [
  {
    title: 'A Group Policy setting is not applying',
    href: '/troubleshooting/group-policy-not-applying-diagnosis',
    excerpt:
      'Start with the affected user and computer, then use gpresult, scope checks and event logs to distinguish filtering, replication and processing failures.',
    meta: 'Published guidance',
  },
]

const tutorials = [
  {
    title: 'Moving settings into Intune',
    href: '/tutorials/intune-admin-templates-to-settings-catalog-migration',
    excerpt:
      'Use the coexistence and conflict checks to inventory existing settings and assign one owner before changing the management source.',
    meta: 'Published guidance',
  },
]

const allItems = [...troubleshooting, ...tutorials]

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description,
  slug: 'group-policy',
})

export default function TopicPage() {
  return (
    <>
      <StructuredData
        data={collectionPageSchema({
          title: topicName,
          description,
          url: topicUrl,
          items: allItems.map((item) => ({
            name: item.title,
            url: `https://www.adminsignal.com${item.href}`,
          })),
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://www.adminsignal.com' },
          { name: 'Topics', url: 'https://www.adminsignal.com/topics' },
          { name: topicName, url: topicUrl },
        ])}
      />
      <TopicHubPageTemplate
        topicName={topicName}
        description={description}
        introSections={[
          {
            title: 'Name the computer and user first',
            body: 'Most “the GPO did not apply” tickets start at the wrong object. Capture the affected computer, the affected user, the setting name, and whether the expected result is computer or user configuration. A link that looks correct in GPMC is not evidence that the target object is in scope.',
          },
          {
            title: 'Collect RSoP before another gpupdate',
            body: 'Run gpresult or an RSoP report on the failing object before forcing a refresh. Use that output to separate security filtering, WMI filters, blocked inheritance, loopback, slow-link behaviour, and a competing cloud policy. Repeating gpupdate /force does not invent missing scope.',
          },
          {
            title: 'One owner before an Intune move',
            body: 'Do not migrate a setting you cannot prove is in effect. Inventory the current Administrative Template or GPO value, decide whether Active Directory or Intune Settings Catalog owns it, then move only that setting. Dual-source the same control and you will spend the next incident arguing about which policy won.',
          },
          {
            title: 'Out of scope on this hub',
            body: 'This hub does not publish forest design, SYSVOL rebuild, AGPM, or third-party GPO-tool reviews. Those subjects stay off the page until a complete, sourced article exists. The two published paths are diagnosis of an existing failure, and ownership when a setting is moving to Intune.',
          },
        ]}
        news={[]}
        tutorials={tutorials}
        tutorialTitle="Migration and coexistence"
        troubleshooting={troubleshooting}
        relatedTopics={[
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'Patch Management', href: '/patch-management' },
          { name: 'PowerShell', href: '/powershell' },
        ]}
      />
    </>
  )
}
