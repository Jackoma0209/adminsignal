import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import { guides } from '@/data/guides'
import { scripts } from '@/data/scripts'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildTopicMetadata({
  topicName: 'PowerShell',
  description:
    'Automation, scripting, modules, DSC, and Graph API integration for Windows and Microsoft 365 administrators.',
  slug: 'powershell',
})

export default function PowerShellPage() {
  const news = signals
    .filter((s) => s.tags?.includes('PowerShell'))
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/news/${s.slug}`,
      excerpt: s.excerpt,
      meta: s.date,
    }))

  const tutorials = guides
    .filter((g) => g.tags?.includes('PowerShell') || g.category === 'PowerShell')
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/tutorials/${g.slug}`,
      excerpt: g.excerpt,
      meta: `${g.readTime} · ${g.difficulty}`,
    }))

  const scriptItems = scripts
    .filter((s) => s.language === 'PowerShell')
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      excerpt: s.description,
      meta: `${s.language} · ${s.stars} stars`,
    }))

  const relatedTopics = [
    { name: 'Microsoft Intune', href: '/intune' },
    { name: 'Windows Server', href: '/windows-server' },
    { name: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
    { name: 'Script Library', href: '/scripts' },
    { name: 'SCCM / MECM', href: '/sccm-mecm' },
  ]

  return (
    <TopicHubPageTemplate
      topicName="PowerShell"
      description="Automation scripts, modules, DSC, and Graph API integration. Everything you need to automate your Windows and Microsoft 365 environment with PowerShell."
      articleCount={311}
      news={news}
      tutorials={tutorials}
      scripts={scriptItems}
      relatedTopics={relatedTopics}
    />
  )
}
