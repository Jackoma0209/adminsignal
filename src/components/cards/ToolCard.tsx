import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
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
    <a
      href={tool.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label={`Get ${tool.name} — affiliate link`}
      className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-all hover:border-primary/40 hover:bg-surface-elevated/40 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted/60">
            {tool.category}
          </span>
          <h3 className="text-[15px] font-semibold text-foreground group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
        </div>
        <Badge variant={badgeVariant[tool.badge]}>{tool.badge}</Badge>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>

      <div className="mt-auto flex items-center justify-between gap-3">
        {tool.isVerified && (
          <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span>Verified in production</span>
          </div>
        )}
        <span className="ml-auto flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:gap-2">
          Get it
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  )
}
