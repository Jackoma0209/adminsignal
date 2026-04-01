import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { type Signal } from '@/data/signals'
import { isRecentItem } from '@/lib/utils'

interface SignalCardProps {
  signal: Signal
}

export default function SignalCard({ signal }: SignalCardProps) {
  const isNew = !signal.isDemo && isRecentItem(signal.publishedAt)

  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="category">{signal.category}</Badge>
        <div className="flex items-center gap-1.5">
          {signal.isDemo && (
            <span className="rounded border border-amber-500/20 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-400">
              Demo
            </span>
          )}
          {isNew && <Badge variant="new">New</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/news/${signal.slug}`}>
          <h3 className="line-clamp-3 text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {signal.title}
          </h3>
        </Link>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{signal.excerpt}</p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted/60">
          <time dateTime={signal.publishedAt}>{signal.date}</time>
          <span>·</span>
          <span>{signal.readTime}</span>
          {signal.source && (
            <>
              <span>·</span>
              <span className="truncate max-w-[100px]" title={signal.source}>{signal.source}</span>
            </>
          )}
        </div>
        <Link
          href={`/news/${signal.slug}`}
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`Read ${signal.title}`}
        >
          Read
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
