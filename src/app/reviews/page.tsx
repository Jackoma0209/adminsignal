import type { Metadata } from 'next'
import { reviews } from '@/data/reviews'
import ReviewCard from '@/components/cards/ReviewCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'

const pageTitle = 'Product Evaluation Notes'
const pageDescription =
  'Research-based evaluation notes for endpoint, security, and Microsoft 365 products. These pages do not claim firsthand deployment evidence, lab benchmarks, or numerical ratings and are currently excluded from search indexing.'
const pagePath = '/reviews'

export const metadata: Metadata = withNoindex(
  buildCategoryMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
  }),
)

const categories = [...new Set(reviews.map((review) => review.category))]

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category
    ? reviews.filter((review) => review.category === category)
    : reviews

  return (
    <CategoryPageTemplate
      eyebrow="Research archive"
      title={pageTitle}
      description="Source-backed planning notes for administrators evaluating products, licensing, support boundaries, operating models, and rollout questions."
      itemCount={filtered.length}
      itemLabel="evaluation guides"
      categories={categories}
      activeCategory={category}
      basePath="/reviews"
    >
      <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm leading-relaxed text-muted">
        <h2 className="font-semibold text-foreground">Not represented as firsthand reviews</h2>
        <p className="mt-2">
          These pages are research and procurement-planning aids. They do not claim independent product testing, real customer deployments, measured support performance, benchmark results, or personal use unless a page explicitly provides verifiable evidence. Numerical scores and review structured data have been removed.
        </p>
      </div>

      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">What the notes cover</h2>
          <p>
            Documented capabilities, package boundaries, permissions, licensing questions, operational ownership, deployment checks, fallback planning, and areas requiring a vendor demonstration.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">What they do not prove</h2>
          <p>
            A documented feature is not proof of performance, support quality, usability, security efficacy, or fit for a particular tenant. Those points require a controlled evaluation and current commercial terms.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Indexing status</h2>
          <p>
            This section remains noindex until each page has stronger primary-source coverage, a repeatable methodology, current evidence, and enough original analysis to justify a standalone search result.
          </p>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </CategoryPageTemplate>
  )
}
