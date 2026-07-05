import type { Metadata } from 'next'
import { reviews } from '@/data/reviews'
import ReviewCard from '@/components/cards/ReviewCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'Tool & Product Reviews'
const pageDescription =
  'Admin buyer notes for endpoint security, management, and Microsoft 365 tools, with evaluation basis, caveats, and independent editorial disclosures.'
const pagePath = '/reviews'

export const metadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const categories = [...new Set(reviews.map((r) => r.category))]

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category ? reviews.filter((r) => r.category === category) : reviews

  const pageUrl = category
    ? `https://www.adminsignal.com/reviews?category=${encodeURIComponent(category)}`
    : 'https://www.adminsignal.com/reviews'

  const jsonLdCollection = collectionPageSchema({
    title: category ? `${pageTitle} — ${category}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((review) => ({
      name: review.title,
      url: `https://www.adminsignal.com/reviews/${review.slug}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Reviews', url: 'https://www.adminsignal.com/reviews' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <CategoryPageTemplate
        eyebrow="Reviews"
        title={pageTitle}
        description="Admin buyer notes for endpoint security, management, and Microsoft 365 tools, focused on operating model, licensing caveats, supportability, and rollout questions."
        itemCount={reviews.length}
        itemLabel="reviews"
        categories={categories}
        activeCategory={category}
        basePath="/reviews"
      >
        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">How to read these reviews</h2>
            <p>
              These pages are admin decision aids, not lab benchmarks. They identify operational
              fit, support boundaries, licensing questions, and pilot checks that a buyer should
              validate before adopting a tool.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">What changes over time</h2>
            <p>
              Pricing, packaging, feature names, support terms, and platform coverage can change
              quickly. Each review includes a freshness note, but current vendor documentation and
              procurement terms should be checked before renewal or purchase.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Editorial independence</h2>
            <p>
              Vendors and advertisers do not control ratings, recommendations, conclusions, or
              comparison outcomes. Sponsored or affiliate relationships are disclosed when they
              exist.
            </p>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
