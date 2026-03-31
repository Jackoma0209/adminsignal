import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import TopicCard from '@/components/cards/TopicCard'
import { topics } from '@/data/topics'

export const metadata: Metadata = {
  title: 'Topic Hubs',
  description:
    'Browse all AdminSignal topic hubs — focused collections of guides, scripts, and news for every discipline in your stack.',
}

export default function TopicsPage() {
  const totalArticles = topics.reduce((sum, t) => sum + t.count, 0)

  return (
    <div className="py-14">
      <Container>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Topic Hubs
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Browse by discipline
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted">
          Focused hubs for every discipline in your stack — signals, guides, and scripts in one
          place.
        </p>
        <p className="mt-4 text-xs text-muted/60">{totalArticles.toLocaleString()}+ articles across {topics.length} topic hubs</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </Container>
    </div>
  )
}
