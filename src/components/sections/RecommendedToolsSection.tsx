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
          title="Tools for enterprise admin workflows"
          description="Tools selected for practical fit, documentation quality, and operational usefulness, not referral fees."
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

        {/* Disclosure banner */}
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-primary/15 bg-primary-soft/50 px-4 py-3 text-sm text-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p>
            Links go directly to each vendor&apos;s official site. Listings are based on practical
            fit, official documentation, and relevance to Microsoft admin work.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Footer disclosure */}
        <p className="mt-8 text-center text-xs text-muted/50">
          These are editorial recommendations. If affiliate arrangements are ever established,
          they will be clearly disclosed.{' '}
          <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-muted transition-colors">
            Full disclosure policy →
          </Link>
        </p>
      </Container>
    </section>
  )
}
