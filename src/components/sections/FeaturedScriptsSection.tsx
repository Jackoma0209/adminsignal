import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import ScriptCard from '@/components/cards/ScriptCard'
import { scripts } from '@/data/scripts'

export default function FeaturedScriptsSection() {
  const featured = scripts.filter((s) => s.isFeatured).slice(0, 3)

  return (
    <section className="border-b border-border py-20">
      <Container>
        <SectionHeader
          eyebrow="Script Library"
          title="Production-ready PowerShell for real environments"
          description="Tested, documented scripts for endpoint management, compliance, and automation."
          action={
            <Link
              href="/scripts"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              Browse all scripts
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </div>
      </Container>
    </section>
  )
}
