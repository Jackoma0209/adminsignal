import type { Metadata } from 'next'
import { reviews } from '@/data/reviews'
import ReviewCard from '@/components/cards/ReviewCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'Tool & Product Reviews'
const pageDescription =
  'Practitioner reviews of endpoint security, management, and Microsoft 365 tools. Real deployment experience, honest verdicts — no sponsored content.'
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
        description="Practitioner reviews of endpoint security, management, and Microsoft 365 tools. Real deployments, honest verdicts."
        itemCount={reviews.length}
        itemLabel="reviews"
        categories={categories}
        activeCategory={category}
        basePath="/reviews"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
