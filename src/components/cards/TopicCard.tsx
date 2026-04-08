import Link from 'next/link'
import {
  Monitor,
  Server,
  Terminal,
  KeyRound,
  Shield,
  Settings,
  PackageCheck,
  Cloud,
  ArrowUpRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Topic } from '@/data/topics'

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Monitor,
  Server,
  Terminal,
  KeyRound,
  Shield,
  Settings,
  PackageCheck,
  Cloud,
}

interface TopicCardProps {
  topic: Topic
}

export default function TopicCard({ topic }: TopicCardProps) {
  const Icon = iconMap[topic.icon] ?? Monitor

  return (
    <Link
      href={`/${topic.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40"
    >
      <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', topic.iconBg)}>
        <Icon className={cn('h-4 w-4', topic.iconColor)} strokeWidth={1.75} />
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
          {topic.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
          {topic.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted/60">Curated topic hub</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted/40 transition-colors group-hover:text-primary" />
      </div>
    </Link>
  )
}
