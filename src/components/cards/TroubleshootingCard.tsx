import Link from 'next/link'
import { ArrowUpRight, AlertCircle } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { type TroubleshootingArticle } from '@/data/troubleshooting'

interface TroubleshootingCardProps {
  article: TroubleshootingArticle
}

const difficultyVariant: Record<
  TroubleshootingArticle['difficulty'],
  'category' | 'difficulty' | 'language'
> = {
  Beginner: 'category',
  Intermediate: 'difficulty',
  Advanced: 'language',
}

export default function TroubleshootingCard({ article }: TroubleshootingCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted/60">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          <span>{article.category}</span>
        </div>
        <Badge variant={difficultyVariant[article.difficulty]}>{article.difficulty}</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/troubleshooting/${article.slug}`}>
          <h3 className="line-clamp-3 text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
      </div>

      {/* Affected products */}
      <div className="flex flex-wrap gap-1.5">
        {article.affectedProducts.slice(0, 3).map((product) => (
          <span
            key={product}
            className="rounded border border-border bg-surface-elevated px-2 py-0.5 text-xs text-muted"
          >
            {product}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted/60">{article.date} · {article.readTime}</span>
        <Link
          href={`/troubleshooting/${article.slug}`}
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`Read ${article.title}`}
        >
          View fix
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
