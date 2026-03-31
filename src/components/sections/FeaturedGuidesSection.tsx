import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import GuideCard from '@/components/cards/GuideCard'
import { guides } from '@/data/guides'

export default function FeaturedGuidesSection() {
  const featured = guides.filter((g) => g.isFeatured).slice(0, 3)

  return (
    <section className="border-t border-border bg-surface/20 py-20">
      <Container>
        <SectionHeader
          eyebrow="Featured Guides"
          title="The depth your vendor docs don't cover"
          description="Step-by-step technical guides that go where official documentation stops — from GPO internals to Graph API edge cases."
          action={
            <Link
              href="/tutorials"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              Browse all guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </Container>
    </section>
  )
}
