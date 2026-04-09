import type { Metadata } from 'next'
import { guides } from '@/data/guides'
import GuideCard from '@/components/cards/GuideCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'Tutorials & Deep-Dive Guides'
const pageDescription =
  'Step-by-step technical guides for Windows administrators — Intune deployments, Group Policy, PowerShell, Entra ID, and endpoint security. Written for engineers who manage real environments.'
const pagePath = '/tutorials'

export const metadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const categories = [...new Set(guides.map((g) => g.category))]

export default async function TutorialsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; difficulty?: string }>
}) {
  const { category, difficulty } = await searchParams
  let filtered = guides
  if (category) filtered = filtered.filter((g) => g.category === category)
  if (difficulty) filtered = filtered.filter((g) => g.difficulty === difficulty)

  const pageUrl = category
    ? `https://www.adminsignal.com/tutorials?category=${encodeURIComponent(category)}`
    : 'https://www.adminsignal.com/tutorials'

  const jsonLdCollection = collectionPageSchema({
    title: category ? `${pageTitle} — ${category}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((guide) => ({
      name: guide.title,
      url: `https://www.adminsignal.com/tutorials/${guide.slug}`,
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
        description="Technical guides that go where official documentation stops. Step-by-step walkthroughs for Intune, Group Policy, PowerShell, Entra ID, and endpoint security."
        itemCount={guides.length}
        categories={categories}
        activeCategory={category}
        basePath="/tutorials"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
