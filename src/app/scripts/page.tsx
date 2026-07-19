import type { Metadata } from 'next'
import { scripts } from '@/data/scripts'
import ScriptCard from '@/components/cards/ScriptCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'

const pageTitle = 'PowerShell Implementation Patterns'
const pageDescription =
  'Reference notes and example patterns for endpoint administration. Complete downloadable source files are not currently published, so this archive is excluded from search indexing.'
const pagePath = '/scripts'

export const metadata: Metadata = withNoindex(
  buildCategoryMetadata({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
  }),
)

const languages = [...new Set(scripts.map((script) => script.language))]

export default async function ScriptsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filtered = category
    ? scripts.filter((script) => script.language === category)
    : scripts

  return (
    <CategoryPageTemplate
      eyebrow="Reference archive"
      title={pageTitle}
      description="Implementation notes for endpoint management, reporting, and automation. These pages contain examples and design guidance, not complete copy-and-run source files."
      itemCount={filtered.length}
      itemLabel="patterns"
      categories={languages}
      activeCategory={category}
      basePath="/scripts"
    >
      <div className="mb-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm leading-relaxed text-muted">
        <h2 className="font-semibold text-foreground">Why this archive is not indexed</h2>
        <p className="mt-2">
          Complete .ps1 files, test evidence, release packages, and source-history links are not yet available. Until each resource can stand alone as a complete and reviewable script, AdminSignal treats these pages as supporting implementation patterns and keeps them out of search results and the XML sitemap.
        </p>
      </div>

      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Safe use</h2>
          <p>
            Read prerequisites and permissions first. Replace example values, review every command, and test only on authorised lab or pilot systems.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">What is missing</h2>
          <p>
            The archive does not yet provide complete source files, signed releases, automated tests, reproducible test environments, or a public issue history.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Publication threshold</h2>
          <p>
            A page will become indexable only after its complete source, dependencies, parameters, error handling, validation, rollback guidance, and version history are published and reviewed.
          </p>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((script) => (
          <ScriptCard key={script.id} script={script} />
        ))}
      </div>
    </CategoryPageTemplate>
  )
}
