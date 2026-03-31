import { CheckCircle2, ExternalLink } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { type Tool } from '@/data/tools'

interface ToolCardProps {
  tool: Tool
}

const badgeVariant: Record<Tool['badge'], 'new' | 'category' | 'language' | 'default'> = {
  Free: 'new',
  'Open Source': 'language',
  Freemium: 'category',
  Paid: 'default',
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted/60">
            {tool.category}
          </span>
          <h3 className="text-[15px] font-semibold text-foreground">{tool.name}</h3>
        </div>
        <Badge variant={badgeVariant[tool.badge]}>{tool.badge}</Badge>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>

      <div className="mt-auto flex items-center justify-between">
        {tool.isVerified && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Verified</span>
          </div>
        )}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`Learn more about ${tool.name}`}
        >
          Learn more
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
