import type { Metadata } from 'next'
import { troubleshootingArticles } from '@/data/troubleshooting'
import TroubleshootingCard from '@/components/cards/TroubleshootingCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'
import { isNoindexTroubleshootingSlug } from '@/lib/noindex'

const pageTitle = 'Troubleshooting Guides'
const pageDescription =
  'Systematic diagnosis guides for common Windows, Intune, Group Policy, and Entra ID issues, with decision trees, log locations, validation steps, and practical fixes.'
const pagePath = '/troubleshooting'

export const metadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const publicArticles = troubleshootingArticles.filter(
  (article) => !isNoindexTroubleshootingSlug(article.slug),
)
const categories = [...new Set(publicArticles.map((article) => article.category))]

export default async function TroubleshootingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category
    ? publicArticles.filter((article) => article.category === category)
    : publicArticles

  const pageUrl = category
    ? `https://www.adminsignal.com/troubleshooting?category=${encodeURIComponent(category)}`
    : 'https://www.adminsignal.com/troubleshooting'

  const jsonLdCollection = collectionPageSchema({
    title: category ? `${pageTitle} — ${category}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((article) => ({
      name: article.title,
      url: `https://www.adminsignal.com/troubleshooting/${article.slug}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Troubleshooting', url: 'https://www.adminsignal.com/troubleshooting' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <CategoryPageTemplate
        eyebrow="Troubleshooting"
        title={pageTitle}
        description="Systematic diagnosis guides for Intune, Windows, Group Policy, and Entra ID, with decision trees, log locations, validation steps, and practical fixes."
        itemCount={publicArticles.length}
        categories={categories}
        activeCategory={category}
        basePath="/troubleshooting"
      >
        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Start with evidence</h2>
            <p>
              Each troubleshooting page is written around observable state: logs, portal status,
              Graph output, event IDs, policy assignments, and device-side symptoms.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Avoid destructive first fixes</h2>
            <p>
              AdminSignal favours diagnosis before reset actions. Clear caches, delete registry
              keys, or re-enrol devices only when evidence points there and rollback impact is
              understood.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Close the loop</h2>
            <p>
              Validation matters as much as the fix. Use the follow-up checks to confirm policy
              state, reporting, user impact, and whether the same fault is likely to recur.
            </p>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <TroubleshootingCard key={article.id} article={article} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
