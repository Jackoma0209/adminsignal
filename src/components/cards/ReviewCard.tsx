import Link from 'next/link'
import { ArrowUpRight, ClipboardCheck } from 'lucide-react'
import { type Review } from '@/data/reviews'

interface ReviewCardProps {
  review: Review
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
        <ClipboardCheck className="h-5 w-5 shrink-0 text-primary/70" aria-hidden="true" />
      </div>

      <p className="text-xs font-medium uppercase tracking-wider text-primary/80">
        Research-based evaluation guide
      </p>

      <p className="line-clamp-4 flex-1 text-sm leading-relaxed text-muted">{review.excerpt}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted/60">{review.date}</span>
        <Link
          href={`/reviews/${review.slug}`}
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`Read evaluation notes for ${review.productName}`}
        >
          Read evaluation
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
