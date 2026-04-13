import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { type Signal } from '@/data/signals'
import { isRecentItem } from '@/lib/utils'

interface SignalCardProps {
  signal: Signal
}

const categoryGradients: Record<string, string> = {
  'Windows Security': 'from-blue-950 via-slate-900 to-slate-950',
  'Endpoint Management': 'from-emerald-950 via-slate-900 to-slate-950',
  'Microsoft 365': 'from-indigo-950 via-slate-900 to-slate-950',
  'Active Directory': 'from-violet-950 via-slate-900 to-slate-950',
  'Patch Management': 'from-amber-950 via-slate-900 to-slate-950',
  'Intune': 'from-cyan-950 via-slate-900 to-slate-950',
}

const categoryAccents: Record<string, string> = {
  'Windows Security': 'text-blue-400/40',
  'Endpoint Management': 'text-emerald-400/40',
  'Microsoft 365': 'text-indigo-400/40',
  'Active Directory': 'text-violet-400/40',
  'Patch Management': 'text-amber-400/40',
  'Intune': 'text-cyan-400/40',
}

export default function SignalCard({ signal }: SignalCardProps) {
  const isNew = !signal.isDemo && isRecentItem(signal.publishedAt)
  const gradient = categoryGradients[signal.category] ?? 'from-slate-900 via-slate-900 to-slate-950'
  const accent = categoryAccents[signal.category] ?? 'text-slate-500/40'

  return (
    <article className="group flex flex-col gap-0 rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40 overflow-hidden">
      {/* Thumbnail */}
      <div
        className={`relative h-36 w-full shrink-0 overflow-hidden bg-linear-to-br ${gradient}`}
        aria-hidden="true"
      >
        {signal.image ? (
          <>
            <Image
              src={signal.image}
              alt=""
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            />
            {/* Gradient overlay so category watermark stays readable */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          </>
        ) : (
          /* Faint grid overlay for gradient-only cards */
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        )}
        {/* Category watermark — always visible above image or gradient */}
        <span className={`absolute bottom-3 left-5 font-mono text-[11px] font-semibold uppercase tracking-widest ${signal.image ? 'text-white/50' : accent}`}>
          {signal.category}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
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
                <span className="max-w-25 truncate" title={signal.source}>{signal.source}</span>
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
      </div>
    </article>
  )
}
