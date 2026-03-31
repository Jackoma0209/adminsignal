import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import ToolCard from '@/components/cards/ToolCard'
import { tools } from '@/data/tools'

export default function RecommendedToolsSection() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Recommended Tools"
          title="Tools the AdminSignal team actually uses"
          description="Practitioner-reviewed. No affiliate fluff — just the tools that show up in real sysadmin toolkits."
          action={
            <Link
              href="/tools"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              View all tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </Container>
    </section>
  )
}
