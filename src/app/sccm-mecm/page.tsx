import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Configuration Manager and co-management'
const description = 'ConfigMgr and Intune decision guidance: compare entitlement, separate provisioning from workloads, and diagnose app delivery and Windows Update ownership.'
const items = [
  { title: 'Intune or Configuration Manager?', href: '/comparisons/intune-vs-sccm-mecm-2025', excerpt: 'Start here to compare licence entitlement and retained infrastructure, then plan workload pilots separately from OS provisioning.', meta: 'Published guidance' },
  { title: 'Windows Update policy ownership', href: '/troubleshooting/wufb-deferral-not-respected', excerpt: 'Use this when update timing ignores Intune: check WSUS, Group Policy and co-management authority before editing another ring.', meta: 'Published guidance' },
  { title: 'Win32 delivery after moving app management', href: '/troubleshooting/intune-win32-app-install-stuck-waiting', excerpt: 'Separate content download, installation and detection failures when evaluating or supporting Intune app delivery.', meta: 'Published guidance' },
]
const url = 'https://www.adminsignal.com/sccm-mecm'
export const metadata: Metadata = buildTopicMetadata({ topicName, description, slug: 'sccm-mecm' })

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
      introSections={[{ title: 'Choose a starting point', body: 'These reading paths support decisions in an existing ConfigMgr estate. The troubleshooting guides diagnose the Intune side of coexistence; they are not task-sequence or distribution-point repair procedures.' }]}
      news={[]} tutorials={items} tutorialTitle="Start with your administrative problem"
      relatedTopics={[
        { name: 'Microsoft Intune', href: '/intune' },
        { name: 'Patch Management', href: '/patch-management' },
        { name: 'Group Policy', href: '/group-policy' },
        { name: 'Configuration Manager', href: '/sccm-mecm' },
      ].filter(item => item.href !== '/sccm-mecm')} />
  </>
}
