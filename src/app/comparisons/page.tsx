import type { Metadata } from 'next'
import { comparisons } from '@/data/comparisons'
import ComparisonCard from '@/components/cards/ComparisonCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'Product Comparisons',
  description:
    'Side-by-side comparisons of enterprise IT tools — Intune vs SCCM, Defender vs CrowdStrike, and more. Help your organisation make the right call.',
  path: '/comparisons',
})

const categories = [...new Set(comparisons.map((c) => c.category))]

export default async function ComparisonsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category ? comparisons.filter((c) => c.category === category) : comparisons

  return (
    <CategoryPageTemplate
      eyebrow="Comparisons"
      title="Product Comparisons"
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
  )
}
