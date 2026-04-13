import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { type Guide } from '@/data/guides'

interface GuideCardProps {
  guide: Guide
}

const difficultyVariant: Record<Guide['difficulty'], 'category' | 'difficulty' | 'language'> = {
  Beginner: 'category',
  Intermediate: 'difficulty',
  Advanced: 'language',
}

const categoryGradients: Record<string, string> = {
  'Microsoft Intune': 'from-cyan-950 via-slate-900 to-slate-950',
  'Endpoint Security': 'from-emerald-950 via-slate-900 to-slate-950',
  'Group Policy': 'from-amber-950 via-slate-900 to-slate-950',
  'Windows Server': 'from-slate-800 via-slate-900 to-slate-950',
  'PowerShell': 'from-violet-950 via-slate-900 to-slate-950',
  'Microsoft Entra ID': 'from-blue-950 via-slate-900 to-slate-950',
}

const categoryAccents: Record<string, string> = {
  'Microsoft Intune': 'text-cyan-400/40',
  'Endpoint Security': 'text-emerald-400/40',
  'Group Policy': 'text-amber-400/40',
  'Windows Server': 'text-slate-400/40',
  'PowerShell': 'text-violet-400/40',
  'Microsoft Entra ID': 'text-blue-400/40',
}

export default function GuideCard({ guide }: GuideCardProps) {
  const gradient = categoryGradients[guide.category] ?? 'from-slate-900 via-slate-900 to-slate-950'
  const accent = categoryAccents[guide.category] ?? 'text-slate-500/40'

  return (
    <article className="group flex flex-col gap-0 rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40 overflow-hidden">
      {/* Thumbnail */}
      <div
        className={`relative h-36 w-full bg-linear-to-br ${gradient} flex items-end px-5 pb-3 shrink-0`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <span className={`relative font-mono text-[11px] font-semibold uppercase tracking-widest ${accent}`}>
          {guide.category}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="category">{guide.category}</Badge>
          <Badge variant={difficultyVariant[guide.difficulty]}>{guide.difficulty}</Badge>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <Link href={guide.href ?? `/tutorials/${guide.slug}`}>
            <h3 className="line-clamp-3 text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {guide.title}
            </h3>
          </Link>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">{guide.excerpt}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted/60">
            <Clock className="h-3 w-3" />
            <span>{guide.readTime}</span>
          </div>
          <Link
            href={guide.href ?? `/tutorials/${guide.slug}`}
            className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
            aria-label={`Read ${guide.title}`}
          >
            Read guide
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  )
}
