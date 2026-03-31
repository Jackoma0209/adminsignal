import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { type Signal } from '@/data/signals'

interface SignalCardProps {
  signal: Signal
}

export default function SignalCard({ signal }: SignalCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="category">{signal.category}</Badge>
        {signal.isNew && <Badge variant="new">New</Badge>}
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
          <time dateTime={signal.date}>{signal.date}</time>
          <span>·</span>
          <span>{signal.readTime}</span>
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
