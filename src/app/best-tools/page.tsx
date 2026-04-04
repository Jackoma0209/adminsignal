import type { Metadata } from 'next'
import { tools } from '@/data/tools'
import ToolCard from '@/components/cards/ToolCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'Best Tools for Sysadmins',
  description:
    'Practitioner-curated tool recommendations for Windows administrators and endpoint specialists. No affiliate fluff — just tools that experienced sysadmins actually reach for.',
  path: '/best-tools',
})

const categories = [...new Set(tools.map((t) => t.category))]

export default async function BestToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category ? tools.filter((t) => t.category === category) : tools

  return (
    <CategoryPageTemplate
      eyebrow="Recommended Tools"
      title="Best Tools for Sysadmins"
      description="Practitioner-curated recommendations from the AdminSignal team. No affiliate fluff — just the tools that show up in real sysadmin toolkits on hard days."
      itemCount={tools.length}
      itemLabel="tools"
      categories={categories}
      activeCategory={category}
      basePath="/best-tools"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </CategoryPageTemplate>
  )
}
