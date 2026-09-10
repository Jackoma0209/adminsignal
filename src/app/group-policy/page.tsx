import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Group Policy diagnosis and Intune coexistence'
const description = 'Diagnose Group Policy that does not apply, collect gpresult evidence, and map overlapping settings before an Intune Settings Catalog migration.'
const items = [
  { title: 'A Group Policy setting is not applying', href: '/troubleshooting/group-policy-not-applying-diagnosis', excerpt: 'Start with the affected user and computer, then use gpresult, scope checks and event logs to distinguish filtering, replication and processing failures.', meta: 'Published guidance' },
  { title: 'Moving settings into Intune', href: '/tutorials/intune-admin-templates-to-settings-catalog-migration', excerpt: 'Use the coexistence and conflict checks to inventory existing settings and assign one owner before changing the management source.', meta: 'Published guidance' },
]
const url = 'https://www.adminsignal.com/group-policy'
export const metadata: Metadata = buildTopicMetadata({ topicName, description, slug: 'group-policy' })

export default function TopicPage() {
  return <>
    <StructuredData data={collectionPageSchema({ title: topicName, description, url,
      items: items.map(item => ({ name: item.title, url: `https://www.adminsignal.com${item.href}` })),
    })} />
    <StructuredData data={breadcrumbSchema([
      { name: 'Home', url: 'https://www.adminsignal.com' },
      { name: 'Topics', url: 'https://www.adminsignal.com/topics' },
      { name: topicName, url },
    ])} />
    <TopicHubPageTemplate topicName={topicName} description={description}
      introSections={[{ title: 'Choose a starting point', body: 'Choose diagnosis for an existing failure, or migration guidance for a planned change. Both paths ask you to collect the current effective settings before changing policy; neither replaces a full domain design review.' }]}
      news={[]} tutorials={items} tutorialTitle="Start with your administrative problem"
      relatedTopics={[
        { name: 'Microsoft Intune', href: '/intune' },
        { name: 'Patch Management', href: '/patch-management' },
        { name: 'Group Policy', href: '/group-policy' },
        { name: 'Configuration Manager', href: '/sccm-mecm' },
      ].filter(item => item.href !== '/group-policy')} />
  </>
}
