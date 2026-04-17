import Link from 'next/link'
import { ExternalLink, Wrench } from 'lucide-react'

interface AffiliateBlockProps {
  toolName: string
  tagline: string
  href: string
  badge?: string
  external?: boolean
}

export default function AffiliateBlock({
  toolName,
  tagline,
  href,
  badge,
  external = false,
}: AffiliateBlockProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'nofollow noopener noreferrer sponsored' }
    : {}

  return (
    <div className="my-8 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary-soft p-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Wrench className="h-4 w-4 text-primary" strokeWidth={1.75} />
      </div>
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{toolName}</p>
          {badge && (
            <span className="rounded border border-primary/20 bg-primary-soft px-1.5 py-0.5 text-xs font-medium text-primary">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-muted">{tagline}</p>
      </div>
      <Link
        href={href}
        {...linkProps}
        className="shrink-0 self-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-85"
      >
        <span className="flex items-center gap-1.5">
          {external ? (
            <>
              Try it <ExternalLink className="h-3 w-3" />
            </>
          ) : (
            'Learn more'
          )}
        </span>
      </Link>
    </div>
  )
}
