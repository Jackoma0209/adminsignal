import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Group Policy diagnosis and Intune coexistence'
const description =
  'Prove why a Group Policy setting is not applying, then decide whether Active Directory or Intune Settings Catalog owns it. Use the three published paths: diagnosis, dual-channel conflict, and Settings Catalog migration.'
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
  {
    title: 'Group Policy and Intune both apply',
    href: '/troubleshooting/group-policy-intune-conflict-which-policy-won',
    excerpt:
      'When a GPO and an Intune profile target the same Windows setting, prove the winning channel before anyone enables MDMWinsOverGP.',
    meta: 'Published guidance',
  },
]

const tutorials = [
  {
    title: 'Moving settings into Intune',
    href: '/tutorials/intune-admin-templates-to-settings-catalog-migration',
    excerpt:
      'Inventory the current Administrative Template or GPO value, assign one owner, then move only that setting into Settings Catalog.',
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
            title: 'How to use the published paths',
            body: 'Use the diagnosis guide when RSoP is empty or the GPO is filtered. Use the conflict guide when both a GPO and an Intune profile are assigned. Use the Settings Catalog migration guide only after the current winner is proven and you have picked one owner.',
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
