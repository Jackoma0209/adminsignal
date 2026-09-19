import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { buildTopicContent } from '@/lib/topic-content'

const topicName = 'Microsoft Entra ID'
const topicDescription =
  'Microsoft Entra ID work published on AdminSignal: Conditional Access policy maps, emergency access account design, and dynamic group troubleshooting for assignment misses.'
const topicPath = '/microsoft-entra-id'
const topicUrl = `https://www.adminsignal.com${topicPath}`

export const metadata: Metadata = buildTopicMetadata({
  topicName,
  description: topicDescription,
  slug: 'microsoft-entra-id',
})

export default function MicrosoftEntraIdPage() {
  const { news, tutorials, troubleshooting, allItems } = buildTopicContent({
    newsTags: ['Microsoft Entra ID', 'Entra ID', 'Conditional Access', 'Identity'],
    newsCategories: ['Microsoft Entra ID'],
    guideTags: ['Microsoft Entra ID', 'Entra ID', 'Conditional Access', 'Identity'],
    guideCategories: ['Microsoft Entra ID'],
    troubleshootingCategories: ['Microsoft Entra ID'],
    affectedProducts: ['Microsoft Entra ID', 'Entra ID', 'Conditional Access'],
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
            title: 'Start with Conditional Access and emergency access',
            body: 'The published Entra articles on this site are the Conditional Access policy map, emergency access account design, and dynamic group troubleshooting. Those three topics cause more tenant lockouts and assignment misses than most portal walkthroughs admit.',
          },
          {
            title: 'Dynamic groups are an assignment dependency, not a nice-to-have',
            body: 'Intune, Autopilot, and licence assignment all fail quietly when a dynamic rule does not match. Capture the rule, the user or device attribute, and the processing timestamp before rebuilding the group.',
          },
          {
            title: 'Break-glass is an operations control',
            body: 'Emergency accounts need cloud-only identities, phishing-resistant factors or offline custody, Conditional Access exclusions that are monitored, and a quarterly live test. An unused Global Administrator in a password manager is not a recovery plan.',
          },
          {
            title: 'How to use these articles',
            body: 'Start with the Conditional Access policy map when you are changing who can reach cloud apps. Use the emergency-access guide before tightening MFA. Use the dynamic-group article when Intune, Autopilot, or licence assignment silently misses a user or device.',
          },
        ]}
        news={news}
        tutorials={tutorials}
        troubleshooting={troubleshooting}
        relatedTopics={[
          { name: 'Microsoft 365', href: '/microsoft-365' },
          { name: 'Microsoft Intune', href: '/intune' },
          { name: 'Endpoint Security', href: '/endpoint-security' },
          { name: 'PowerShell', href: '/powershell' },
          { name: 'Group Policy', href: '/group-policy' },
        ]}
      />
    </>
  )
}
