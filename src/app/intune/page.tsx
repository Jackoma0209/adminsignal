import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildTopicMetadata({
  topicName: 'Microsoft Intune',
  description:
    'MDM policy, Autopilot, compliance baselines, app deployment, and co-management. Everything you need to run Intune at scale.',
  slug: 'intune',
})

export default function IntunePage() {
  const news = signals
    .filter((s) => s.tags?.includes('Intune') || s.category === 'Microsoft Intune')
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Intune') || g.category === 'Microsoft Intune')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Intune'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language} · ${s.stars} stars`,
    }))

  const relatedTopics = [
    { name: 'Endpoint Management', href: '/endpoint-management' },
    { name: 'Windows', href: '/windows' },
    { name: 'Microsoft 365', href: '/microsoft-365' },
    { name: 'PowerShell', href: '/powershell' },
    { name: 'Security & Defender', href: '/security-defender' },
  ]

  return (
    <TopicHubPageTemplate
      topicName="Microsoft Intune"
      description="MDM policy, Autopilot, compliance baselines, app deployment, and co-management. Everything you need to run Intune at enterprise scale — from onboarding to remediation."
      articleCount={148}
      news={news}
      tutorials={tutorials}
      scripts={scriptItems}
      relatedTopics={relatedTopics}
    />
  )
}
