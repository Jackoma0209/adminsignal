import type { Metadata } from 'next'
import { tools } from '@/data/tools'
import ToolCard from '@/components/cards/ToolCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'

export const metadata: Metadata = withNoindex(buildCategoryMetadata({
  title: 'Admin Tool Notes',
  description:
    'Admin tool notes for Windows administrators and endpoint specialists, with operational-fit criteria and independent disclosure.',
  path: '/best-tools',
}))

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
      eyebrow="Tool Notes"
      title="Admin Tool Notes"
      description="Tool notes for common sysadmin workflows. Selection is based on operational fit, documentation quality, deployment model, security posture, and supportability."
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
      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Directory status</h2>
          <p>
            This directory is kept available as a quick pointer to relevant admin tools while
            fuller individual evaluations are built. Use it as a starting point, not a replacement
            for a procurement review.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Procurement checks</h2>
          <p>
            Before selecting any tool, confirm licensing terms, data residency, admin roles,
            support boundaries, audit logging, rollback options, and whether the vendor has
            documentation your helpdesk can actually use.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Commercial disclosure</h2>
          <p>
            Links currently point to official vendor sites. If affiliate arrangements are added,
            affected links will be labelled and editorial conclusions will remain independent.
          </p>
        </section>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </CategoryPageTemplate>
  )
}
