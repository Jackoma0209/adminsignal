import type { Metadata } from 'next'
import { comparisons } from '@/data/comparisons'
import { isNoindexComparisonSlug } from '@/lib/noindex'
import ComparisonCard from '@/components/cards/ComparisonCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'Product Comparisons'
const pageDescription =
  'Four admin decisions: Intune versus Configuration Manager, Autopilot versus Device Preparation, Windows 11 25H2 versus 26H1, and Entra ID P1 versus P2.'
const pagePath = '/comparisons'

const baseMetadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

export async function generateMetadata({ searchParams }: {
  searchParams: Promise<{ category?: string }>
}): Promise<Metadata> {
  const { category } = await searchParams
  return category ? { ...baseMetadata, robots: { index: false, follow: true } } : baseMetadata
}


const categories = [
  ...new Set(comparisons.filter((c) => !isNoindexComparisonSlug(c.slug)).map((c) => c.category)),
]

export default async function ComparisonsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const visibleComparisons = comparisons.filter((c) => !isNoindexComparisonSlug(c.slug))
  const filtered = category
    ? visibleComparisons.filter((c) => c.category === category)
    : visibleComparisons

  const pageUrl = category
    ? `https://www.adminsignal.com/comparisons?category=${encodeURIComponent(category)}`
    : 'https://www.adminsignal.com/comparisons'

  const jsonLdCollection = collectionPageSchema({
    title: category ? `${pageTitle} — ${category}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((comparison) => ({
      name: comparison.title,
      url: `https://www.adminsignal.com/comparisons/${comparison.slug}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Comparisons', url: 'https://www.adminsignal.com/comparisons' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <CategoryPageTemplate
        eyebrow="Comparisons"
        title={pageTitle}
        description="Each comparison starts from a decision an administrator has to make this year: which management plane, which enrolment path, which Windows 11 target, and which Entra ID SKU."
        itemCount={filtered.length}
        categories={categories}
        activeCategory={category}
        basePath="/comparisons"
      >
        <div className="mb-10 grid gap-5 sm:grid-cols-2">
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Intune or Configuration Manager?</h2>
            <p>
              Start here when you are choosing a management plane or planning co-management.
              Licensing entitlement is not the same as retiring task-sequence OSD.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Autopilot v1 or Device Preparation?</h2>
            <p>
              Start here when you are picking an enrolment path for new Windows 11 devices.
              Hybrid join, pre-provisioning, and ESP control still keep classic Autopilot in play.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Windows 11 25H2 or 26H1?</h2>
            <p>
              Start here when you are setting the feature-update target for a managed fleet.
              26H1 is a device-scoped release, not a broad in-place upgrade from 24H2 or 25H2.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Entra ID P1 or P2?</h2>
            <p>
              Start here when Conditional Access is already in use and you are deciding whether
              privileged-identity and access-review features change the SKU.
            </p>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((comparison) => (
            <ComparisonCard key={comparison.id} comparison={comparison} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
