import type { Metadata } from 'next'
import { comparisons } from '@/data/comparisons'
import ComparisonCard from '@/components/cards/ComparisonCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'Product Comparisons'
const pageDescription =
  'Side-by-side comparisons of enterprise IT tools — Intune vs SCCM, Defender vs CrowdStrike, and more. Help your organisation make the right call.'
const pagePath = '/comparisons'

export const metadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const categories = [...new Set(comparisons.map((c) => c.category))]

export default async function ComparisonsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category ? comparisons.filter((c) => c.category === category) : comparisons

  const pageUrl = category
    ? `https://www.adminsignal.com/comparisons?category=${encodeURIComponent(category)}`
    : 'https://www.adminsignal.com/comparisons'

  const jsonLdCollection = collectionPageSchema({
    title: category ? `${pageTitle} — ${category}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((comparison) => ({
      name: comparison.title,
      url: `https://www.adminsignal.com/comparisons/${comparison.slug}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Comparisons', url: 'https://www.adminsignal.com/comparisons' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <CategoryPageTemplate
        eyebrow="Comparisons"
        title={pageTitle}
        description="Side-by-side analysis of the tools that matter to enterprise IT teams — with clear verdicts and the context to make the right call for your environment."
        itemCount={comparisons.length}
        categories={categories}
        activeCategory={category}
        basePath="/comparisons"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((comparison) => (
            <ComparisonCard key={comparison.id} comparison={comparison} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
