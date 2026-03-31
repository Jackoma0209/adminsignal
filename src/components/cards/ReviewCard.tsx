import Link from 'next/link'
import { Star, ArrowUpRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { type Review } from '@/data/reviews'

interface ReviewCardProps {
  review: Review
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={[
            'h-3 w-3',
            i < full
              ? 'fill-amber-400 text-amber-400'
              : i === full && hasHalf
                ? 'fill-amber-400/50 text-amber-400'
                : 'fill-none text-muted/40',
          ].join(' ')}
        />
      ))}
      <span className="ml-1 text-xs font-medium text-foreground-soft">{rating}</span>
    </div>
  )
}

const badgeVariant: Record<NonNullable<Review['badge']>, 'new' | 'category' | 'difficulty'> = {
  'Editors Choice': 'new',
  'Best Value': 'difficulty',
  Recommended: 'category',
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted/60">
            {review.category}
          </span>
          <h3 className="text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            <Link href={`/reviews/${review.slug}`}>{review.title}</Link>
          </h3>
        </div>
        {review.badge && (
          <Badge variant={badgeVariant[review.badge]}>{review.badge}</Badge>
        )}
      </div>

      <RatingStars rating={review.rating} />

      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{review.excerpt}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted/60">{review.date}</span>
        <Link
          href={`/reviews/${review.slug}`}
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`Read review of ${review.productName}`}
        >
          Read review
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
