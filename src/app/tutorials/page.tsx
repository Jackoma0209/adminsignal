import type { Metadata } from 'next'
import { guides } from '@/data/guides'
import GuideCard from '@/components/cards/GuideCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { isNoindexHref } from '@/lib/noindex'

const pageTitle = 'Tutorials & Deep-Dive Guides'
const pageDescription =
  'Step-by-step technical guides for Windows administrators: Intune deployments, Group Policy, PowerShell, Entra ID, and endpoint security. Written for engineers managing business environments.'
const pagePath = '/tutorials'

export const metadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const publicGuides = guides.filter(
  (guide) => !isNoindexHref(guide.href ?? `/tutorials/${guide.slug}`),
)
const categories = [...new Set(publicGuides.map((guide) => guide.category))]

export default async function TutorialsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; difficulty?: string }>
}) {
  const { category, difficulty } = await searchParams
  let filtered = publicGuides
  if (category) filtered = filtered.filter((guide) => guide.category === category)
  if (difficulty) filtered = filtered.filter((guide) => guide.difficulty === difficulty)

  const pageUrl = category
    ? `https://www.adminsignal.com/tutorials?category=${encodeURIComponent(category)}`
    : 'https://www.adminsignal.com/tutorials'

  const jsonLdCollection = collectionPageSchema({
    title: category ? `${pageTitle} — ${category}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((guide) => ({
      name: guide.title,
      url: `https://www.adminsignal.com${guide.href ?? `/tutorials/${guide.slug}`}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Tutorials', url: 'https://www.adminsignal.com/tutorials' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <CategoryPageTemplate
        eyebrow="Tutorials"
        title={pageTitle}
        description="Technical guides for the operational details that official quickstarts often skip: prerequisites, permissions, validation, rollback, and support handover."
        itemCount={publicGuides.length}
        categories={categories}
        activeCategory={category}
        basePath="/tutorials"
      >
        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Choose a guide by risk</h2>
            <p>
              Start with the topic that matches the change you are planning, then scan the
              prerequisites, permissions, pilot scope, and rollback sections before touching a
              broad device or user group.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">What the guides include</h2>
            <p>
              AdminSignal tutorials favour commands, portal checkpoints, Graph examples, validation
              steps, failure modes, and operational caveats over generic feature summaries.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Pilot first</h2>
            <p>
              Use lab devices, test tenants, pilot users, and staged assignments where possible.
              Many Microsoft admin changes are easy to deploy and much harder to unwind cleanly.
            </p>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
