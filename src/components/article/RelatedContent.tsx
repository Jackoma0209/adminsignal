import Link from 'next/link'
import { ArrowRight, BookOpen, Terminal, Newspaper, FlaskConical } from 'lucide-react'

export interface RelatedItem {
  title: string
  href: string
  type: 'news' | 'tutorial' | 'script' | 'troubleshooting' | 'review' | 'comparison'
  excerpt: string
  meta?: string
}

const typeConfig: Record<
  RelatedItem['type'],
  { label: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  news: { label: 'News', Icon: Newspaper },
  tutorial: { label: 'Tutorial', Icon: BookOpen },
  script: { label: 'Script', Icon: Terminal },
  troubleshooting: { label: 'Troubleshooting', Icon: FlaskConical },
  review: { label: 'Review', Icon: BookOpen },
  comparison: { label: 'Comparison', Icon: BookOpen },
}

interface RelatedContentProps {
  items: RelatedItem[]
  heading?: string
}

export default function RelatedContent({
  items,
  heading = 'Related reading',
}: RelatedContentProps) {
  if (items.length === 0) return null

  return (
    <section aria-label="Related content">
      <h2 className="mb-6 text-lg font-bold text-foreground">{heading}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const { label, Icon } = typeConfig[item.type]
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-muted/60" />
                <span className="text-xs font-medium uppercase tracking-wide text-muted/60">
                  {label}
                </span>
              </div>
              <p className="line-clamp-3 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </p>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted">{item.excerpt}</p>
              <div className="mt-auto flex items-center gap-1 text-xs font-medium text-muted transition-colors group-hover:text-primary">
                Read <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
