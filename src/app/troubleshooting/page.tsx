import type { Metadata } from 'next'
import { troubleshootingArticles } from '@/data/troubleshooting'
import TroubleshootingCard from '@/components/cards/TroubleshootingCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'Troubleshooting Guides'
const pageDescription =
  'Systematic diagnosis guides for common Windows, Intune, Group Policy, and Entra ID issues. Decision trees, log locations, and tested fixes — no generic advice.'
const pagePath = '/troubleshooting'

export const metadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
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

  const pageUrl = category
    ? `https://www.adminsignal.com/troubleshooting?category=${encodeURIComponent(category)}`
    : 'https://www.adminsignal.com/troubleshooting'

  const jsonLdCollection = collectionPageSchema({
    title: category ? `${pageTitle} — ${category}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((article) => ({
      name: article.title,
      url: `https://www.adminsignal.com/troubleshooting/${article.slug}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Troubleshooting', url: 'https://www.adminsignal.com/troubleshooting' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <CategoryPageTemplate
        eyebrow="Troubleshooting"
        title={pageTitle}
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
    </>
  )
}
