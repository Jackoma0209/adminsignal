import Link from 'next/link'
import { ArrowUpRight, FileWarning } from 'lucide-react'
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
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
          <FileWarning className="h-3.5 w-3.5" aria-hidden="true" />
          Notes only
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/scripts/${script.slug}`}>
          <h3 className="font-mono text-[15px] font-semibold text-foreground transition-colors group-hover:text-primary">
            {script.title}
          </h3>
        </Link>
        <p className="line-clamp-4 text-sm leading-relaxed text-muted">{script.description}</p>
      </div>

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

      {script.codePreview && (
        <pre className="overflow-x-auto rounded-lg border border-border bg-background px-4 py-3 font-mono text-[11px] leading-relaxed text-muted/80" aria-label="Illustrative code fragment">
          <code>{script.codePreview}</code>
        </pre>
      )}

      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted/60">Implementation notes</span>
        <Link
          href={`/scripts/${script.slug}`}
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`View ${script.title} implementation pattern`}
        >
          View notes
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
