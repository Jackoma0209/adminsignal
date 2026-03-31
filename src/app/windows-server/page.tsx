import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildTopicMetadata({
  topicName: 'Windows Server',
  description:
    'Active Directory, DNS, DHCP, file services, and server hardening for Windows Server administrators.',
  slug: 'windows-server',
})

export default function WindowsServerPage() {
  const news = signals
    .filter((s) => s.tags?.includes('Windows') || s.category === 'Windows Server')
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Windows Server') || g.tags?.includes('Active Directory'))
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Active Directory') || s.tags.includes('Windows Server'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language} · ${s.stars} stars`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Group Policy', href: '/group-policy' },
    { name: 'Patch Management', href: '/patch-management' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
  ]

  return (
    <TopicHubPageTemplate
      topicName="Windows Server"
      description="Active Directory, DNS, DHCP, file services, and server hardening. Practical guidance for administrators managing Windows Server environments."
      articleCount={214}
      news={news}
      tutorials={tutorials}
      scripts={scriptItems}
      relatedTopics={relatedTopics}
    />
  )
}
