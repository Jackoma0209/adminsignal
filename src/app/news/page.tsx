import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import SignalCard from '@/components/cards/SignalCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import Container from '@/components/layout/Container'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'IT News & Security Alerts',
  description:
    'The latest signals from the Microsoft ecosystem — Patch Tuesday analysis, vulnerability alerts, Intune updates, and enterprise IT news for Windows administrators.',
  path: '/news',
})

const categories = [...new Set(signals.map((s) => s.category))]

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category ? signals.filter((s) => s.category === category) : signals
  const allDemo = filtered.length > 0 && filtered.every((s) => s.isDemo)

  return (
    <>
      {allDemo && (
        <div className="border-b border-amber-500/20 bg-amber-500/5 py-2.5">
          <Container>
            <p className="text-center text-xs font-medium text-amber-400">
              Archival content — this feed shows placeholder articles while the live news pipeline is being populated. Source links are real.
            </p>
          </Container>
        </div>
      )}
      <CategoryPageTemplate
        eyebrow="News & Alerts"
        title="IT News & Security Alerts"
        description="The latest signals from the Microsoft ecosystem — Patch Tuesday analysis, vulnerability alerts, Intune feature releases, and actionable enterprise IT news."
        itemCount={signals.length}
        categories={categories}
        activeCategory={category}
        basePath="/news"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
