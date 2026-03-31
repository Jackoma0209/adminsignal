import type { Metadata } from 'next'
import { troubleshootingArticles } from '@/data/troubleshooting'
import TroubleshootingCard from '@/components/cards/TroubleshootingCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'Troubleshooting Guides',
  description:
    'Systematic diagnosis guides for common Windows, Intune, Group Policy, and Entra ID issues. Decision trees, log locations, and tested fixes — no generic advice.',
  path: '/troubleshooting',
})

const categories = [...new Set(troubleshootingArticles.map((a) => a.category))]

export default async function TroubleshootingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category
    ? troubleshootingArticles.filter((a) => a.category === category)
    : troubleshootingArticles

  return (
    <CategoryPageTemplate
      eyebrow="Troubleshooting"
      title="Troubleshooting Guides"
      description="Systematic diagnosis guides for Intune, Windows, Group Policy, and Entra ID. Decision trees and tested fixes — not generic advice."
      itemCount={troubleshootingArticles.length}
      categories={categories}
      activeCategory={category}
      basePath="/troubleshooting"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <TroubleshootingCard key={article.id} article={article} />
        ))}
      </div>
    </CategoryPageTemplate>
  )
}
