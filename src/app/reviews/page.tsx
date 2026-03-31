import type { Metadata } from 'next'
import { reviews } from '@/data/reviews'
import ReviewCard from '@/components/cards/ReviewCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'Tool & Product Reviews',
  description:
    'Practitioner reviews of endpoint security, management, and Microsoft 365 tools. Real deployment experience, honest verdicts — no sponsored content.',
  path: '/reviews',
})

const categories = [...new Set(reviews.map((r) => r.category))]

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category ? reviews.filter((r) => r.category === category) : reviews

  return (
    <CategoryPageTemplate
      eyebrow="Reviews"
      title="Tool & Product Reviews"
      description="Practitioner reviews of endpoint security, management, and Microsoft 365 tools. Real deployments, honest verdicts."
      itemCount={reviews.length}
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
  )
}
