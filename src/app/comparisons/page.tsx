import type { Metadata } from 'next'
import { comparisons } from '@/data/comparisons'
import ComparisonCard from '@/components/cards/ComparisonCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'Product Comparisons'
const pageDescription =
  'Side-by-side enterprise IT comparisons with decision criteria, caveats, freshness notes, and operational questions for Microsoft admin teams.'
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
        description="Side-by-side analysis for enterprise IT teams, focused on operating model, migration risk, licensing caveats, supportability, and the questions to validate in your own environment."
        itemCount={comparisons.length}
        categories={categories}
        activeCategory={category}
        basePath="/comparisons"
      >
        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">How comparisons are structured</h2>
            <p>
              Each comparison starts with the admin decision being made, then looks at capability,
              operating model, migration effort, support boundaries, and what to validate before
              committing to a direction.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">What not to assume</h2>
            <p>
              A product can be the better fit for one tenant and the wrong fit for another. Treat
              the recommendation as a starting position, then test it against your estate size,
              licensing, network constraints, support model, and audit requirements.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Freshness caveat</h2>
            <p>
              Microsoft and vendor packaging changes quickly. Comparison pages include review
              dates and official source links where useful, but current documentation should be
              checked before procurement or migration planning.
            </p>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((comparison) => (
            <ComparisonCard key={comparison.id} comparison={comparison} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
