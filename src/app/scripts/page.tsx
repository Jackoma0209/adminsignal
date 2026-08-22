import type { Metadata } from 'next'
import { scripts } from '@/data/scripts'
import ScriptCard from '@/components/cards/ScriptCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'

const pageTitle = 'PowerShell Implementation Notes'
const pageDescription =
  'Design notes and example fragments for endpoint administration. These pages document permissions, assumptions, and command shape. They are not a downloadable script catalogue and are excluded from search indexing.'
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
      description="Implementation notes for endpoint management, reporting, and automation. Each page records example fragments, permissions, and validation checks. None of these pages is a complete copy-and-run source file."
      itemCount={filtered.length}
      itemLabel="notes"
      categories={languages}
      activeCategory={category}
      basePath="/scripts"
    >
      <div className="mb-8 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <h2 className="font-semibold text-foreground">What these pages are</h2>
        <p className="mt-2">
          AdminSignal publishes implementation notes here so an administrator can see the intended
          inputs, permissions, and output shape before rebuilding a report or lab workflow. The
          archive is kept out of search results because the pages are notes, not complete script
          releases.
        </p>
      </div>

      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">Safe use</h2>
          <p>
            Read prerequisites and permissions first. Replace example values, review every command,
            and test only on authorised lab or pilot systems.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">What is included</h2>
          <p>
            Example fragments, environment assumptions, required permissions, intended output, and
            safety notes. Rebuild any implementation from reviewed requirements.
          </p>
        </section>
        <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          <h2 className="mb-2 text-sm font-semibold text-foreground">What is not included</h2>
          <p>
            Complete .ps1 files, signed releases, automated tests, and a public issue history. Do
            not treat a fragment on this site as production automation.
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
