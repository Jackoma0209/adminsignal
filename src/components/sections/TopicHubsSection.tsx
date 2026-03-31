import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import TopicCard from '@/components/cards/TopicCard'
import { topics } from '@/data/topics'

export default function TopicHubsSection() {
  return (
    <section className="border-t border-border bg-surface/20 py-20">
      <Container>
        <SectionHeader
          eyebrow="Topic Hubs"
          title="Browse by discipline"
          description="Focused hubs for every discipline in your stack — signals, guides, and scripts in one place."
          action={
            <Link
              href="/topics"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              All topics
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </Container>
    </section>
  )
}
