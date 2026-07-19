import type { Metadata } from 'next'
import { signals } from '@/data/signals'
import SignalCard from '@/components/cards/SignalCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import Container from '@/components/layout/Container'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { isNoindexNewsSlug } from '@/lib/noindex'

const pageTitle = 'IT News & Security Alerts'
const pageDescription =
  'Current signals from the Microsoft ecosystem: Patch Tuesday analysis, vulnerability alerts, Intune updates, and enterprise IT news for Windows administrators.'
const pagePath = '/news'

export const metadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const publicSignals = signals.filter((signal) => !isNoindexNewsSlug(signal.slug))
const categories = [...new Set(publicSignals.map((signal) => signal.category))]

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category
    ? publicSignals.filter((signal) => signal.category === category)
    : publicSignals
  const allDemo = filtered.length > 0 && filtered.every((signal) => signal.isDemo)
  const pageUrl = category
    ? `https://www.adminsignal.com/news?category=${encodeURIComponent(category)}`
    : 'https://www.adminsignal.com/news'

  const jsonLdCollection = collectionPageSchema({
    title: category ? `${pageTitle} — ${category}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((signal) => ({
      name: signal.title,
      url: `https://www.adminsignal.com/news/${signal.slug}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'News', url: 'https://www.adminsignal.com/news' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      {allDemo && (
        <div className="border-b border-amber-500/20 bg-amber-500/5 py-2.5">
          <Container>
            <p className="text-center text-xs font-medium text-amber-400">
              Archival content — this feed is temporarily showing sourced reference articles while live news coverage is being prepared.
            </p>
          </Container>
        </div>
      )}
      <CategoryPageTemplate
        eyebrow="News & Alerts"
        title={pageTitle}
        description="Current signals from the Microsoft ecosystem: Patch Tuesday analysis, vulnerability alerts, Intune feature releases, and actionable enterprise IT news."
        itemCount={publicSignals.length}
        categories={categories}
        activeCategory={category}
        basePath="/news"
      >
        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">How to use signals</h2>
            <p>
              Treat each item as an admin briefing: what changed, who is affected, what evidence
              to check, and which follow-up actions belong in your patch, security, or endpoint
              operations queue.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">What gets covered</h2>
            <p>
              Coverage focuses on Microsoft 365, Intune, Windows, identity, endpoint security,
              patching, and incidents that create real administrative work rather than general
              technology headlines.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Verification habit</h2>
            <p>
              News pages link to official advisories or vendor sources where useful. Recheck source
              material before making emergency changes, because severity, mitigations, and rollout
              guidance can change.
            </p>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
