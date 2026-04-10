import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import ToolCard from '@/components/cards/ToolCard'
import { tools } from '@/data/tools'

export default function RecommendedToolsSection() {
  return (
    <section className="py-24 border-t border-border">
      <Container>
        <SectionHeader
          eyebrow="Recommended Tools"
          title="Tools I use in enterprise environments"
          description="These are the exact tools I reach for when managing real fleets. Commissions help keep AdminSignal free — they never influence what I recommend."
          action={
            <Link
              href="/best-tools"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              View all tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        {/* Affiliate disclosure banner */}
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-primary/15 bg-primary-soft/50 px-4 py-3 text-sm text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p>
            As an affiliate partner I earn a small commission if you purchase through these links —
            at no extra cost to you. I only list tools I&apos;ve personally verified in production.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Footer disclosure */}
        <p className="mt-8 text-center text-xs text-muted/50">
          Affiliate disclosure: AdminSignal participates in affiliate programmes. Earned commissions
          help keep this site free.{' '}
          <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-muted transition-colors">
            Full disclosure policy →
          </Link>
        </p>
      </Container>
    </section>
  )
}
