import Link from 'next/link'
import { ArrowUpRight, ArrowLeftRight } from 'lucide-react'
import { type Comparison } from '@/data/comparisons'

interface ComparisonCardProps {
  comparison: Comparison
}

export default function ComparisonCard({ comparison }: ComparisonCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted/60">
          {comparison.category}
        </span>
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
        <Link href={`/comparisons/${comparison.slug}`}>{comparison.title}</Link>
      </h3>

      {/* Product vs row */}
      <div className="flex items-center gap-2">
        <span className="rounded border border-border bg-surface-elevated px-2 py-0.5 text-xs text-foreground-soft">
          {comparison.productA}
        </span>
        <ArrowLeftRight className="h-3 w-3 shrink-0 text-muted/40" aria-hidden="true" />
        <span className="rounded border border-border bg-surface-elevated px-2 py-0.5 text-xs text-foreground-soft">
          {comparison.productB}
        </span>
      </div>

      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{comparison.excerpt}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted/60">{comparison.date}</span>
        <Link
          href={`/comparisons/${comparison.slug}`}
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`Read ${comparison.title}`}
        >
          Read comparison
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
