import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildTopicMetadata({
  topicName: 'Microsoft Entra ID',
  description:
    'Identity, Conditional Access, PIM, SSPR, and hybrid join for Microsoft Entra ID administrators.',
  slug: 'microsoft-entra-id',
})

export default function EntraIdPage() {
  const news = signals
    .filter((s) => s.tags?.includes('Entra ID') || s.category === 'Microsoft Entra ID')
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('Entra ID') || g.category === 'Microsoft Entra ID')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.tags.includes('Entra ID') || s.tags.includes('Graph API'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language} · ${s.stars} stars`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Microsoft 365', href: '/microsoft-365' },
    { name: 'Endpoint Security', href: '/endpoint-security' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'PowerShell', href: '/powershell' },
  ]

  return (
    <TopicHubPageTemplate
      topicName="Microsoft Entra ID"
      description="Identity management, Conditional Access, PIM, SSPR, and hybrid join. Authoritative guidance for securing and governing your Entra ID tenant."
      articleCount={126}
      news={news}
      tutorials={tutorials}
      scripts={scriptItems}
      relatedTopics={relatedTopics}
    />
  )
}
