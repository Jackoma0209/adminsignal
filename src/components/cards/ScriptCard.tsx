import Link from 'next/link'
import { Star, ArrowUpRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { type Script } from '@/data/scripts'

interface ScriptCardProps {
  script: Script
}

export default function ScriptCard({ script }: ScriptCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="language">{script.language}</Badge>
        {script.isNew && <Badge variant="new">New</Badge>}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/scripts/${script.slug}`}>
          <h3 className="font-mono text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">
            {script.title}
          </h3>
        </Link>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{script.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {script.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded border border-border bg-surface-elevated px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted/60">
          <Star className="h-3 w-3 fill-current" />
          <span>{script.stars.toLocaleString()}</span>
        </div>
        <Link
          href={`/scripts/${script.slug}`}
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`View ${script.title}`}
        >
          View script
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
