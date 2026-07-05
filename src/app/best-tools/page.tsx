import type { Metadata } from 'next'
import { tools } from '@/data/tools'
import ToolCard from '@/components/cards/ToolCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'Recommended Admin Tools',
  description:
    'Practitioner-curated tool notes for Windows administrators and endpoint specialists, with operational-fit criteria and independent disclosure.',
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
      title="Recommended Admin Tools"
      description="Practitioner-reviewed tool notes for common sysadmin workflows. Selection is based on operational fit, documentation quality, deployment model, security posture, and supportability."
      itemCount={tools.length}
      itemLabel="tools"
      categories={categories}
      activeCategory={category}
      basePath="/best-tools"
    >
      <div className="mb-8 rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <p className="font-semibold text-foreground">How these tools are evaluated</p>
        <p className="mt-2">
          AdminSignal does not sell rankings. Tool notes are based on admin workflow fit,
          deployment and rollback considerations, security controls, documentation quality,
          licensing clarity, and how easy the tool is to operate in a real Microsoft environment.
          Pricing, licensing, availability, and features can change, so verify current details
          on the vendor&apos;s official site before buying.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </CategoryPageTemplate>
  )
}
