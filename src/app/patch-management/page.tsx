import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildTopicMetadata({
  topicName: 'Patch Management',
  description:
    'WSUS, Windows Update for Business, patch rings, and compliance reporting for enterprise environments.',
  slug: 'patch-management',
})

export default function PatchManagementPage() {
  const news = signals
    .filter(
      (s) =>
        s.tags?.includes('Patch Tuesday') ||
        s.category === 'Patch Tuesday' ||
        s.tags?.includes('CVE')
    )
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Patch Management') || g.category === 'Patch Management')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Reporting') || s.tags.includes('Compliance'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language}`,
    }))

  const relatedTopics = [
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Group Policy', href: '/group-policy' },
  ]

  return (
    <TopicHubPageTemplate
      topicName="Patch Management"
      description="WSUS, Windows Update for Business, patch rings, and compliance reporting. Operational guidance for keeping enterprise endpoints current and secure."
      news={news}
      tutorials={tutorials}
      scripts={scriptItems}
      relatedTopics={relatedTopics}
    />
  )
}
