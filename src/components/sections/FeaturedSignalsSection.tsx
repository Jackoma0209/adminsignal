import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import SignalCard from '@/components/cards/SignalCard'
import { signals } from '@/data/signals'

export default function FeaturedSignalsSection() {
  const featured = signals.filter((s) => s.isFeatured).slice(0, 3)

  return (
    <section className="border-b border-border py-20">
      <Container>
        <SectionHeader
          eyebrow="Latest Signals"
          title="What's happening in IT right now"
          action={
            <Link
              href="/news"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              View all signals
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </Container>
    </section>
  )
}
