import type { Metadata } from 'next'
import { guides } from '@/data/guides'
import GuideCard from '@/components/cards/GuideCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'Tutorials & Deep-Dive Guides',
  description:
    'Step-by-step technical guides for Windows administrators — Intune deployments, Group Policy, PowerShell, Entra ID, and endpoint security. Written for engineers who manage real environments.',
  path: '/tutorials',
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

  return (
    <CategoryPageTemplate
      eyebrow="Tutorials"
      title="Tutorials & Deep-Dive Guides"
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
  )
}
