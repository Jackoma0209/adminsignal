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

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="category">{guide.category}</Badge>
        <Badge variant={difficultyVariant[guide.difficulty]}>{guide.difficulty}</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/tutorials/${guide.slug}`}>
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
          href={`/tutorials/${guide.slug}`}
          className="flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-primary"
          aria-label={`Read ${guide.title}`}
        >
          Read guide
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
