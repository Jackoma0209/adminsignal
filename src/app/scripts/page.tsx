import type { Metadata } from 'next'
import { scripts } from '@/data/scripts'
import ScriptCard from '@/components/cards/ScriptCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'

const pageTitle = 'PowerShell Implementation Notes'
const pageDescription =
  'Unfinished PowerShell implementation notes. These pages are not a production-tested script library, not signed releases, and not copy-and-run tools. They are excluded from search indexing.'
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
      description="Unfinished notes only. Each page records example fragments, permissions, and validation checks. None of these pages is a complete, production-tested, or copy-and-run source file."
      itemCount={filtered.length}
      itemLabel="notes"
      categories={languages}
      activeCategory={category}
      basePath="/scripts"
    >
      <div className="mb-8 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
        <h2 className="font-semibold text-foreground">What these pages are</h2>
        <p className="mt-2">
          This archive is unfinished. AdminSignal keeps these pages out of search results because
          they are implementation notes, not a finished production-tested PowerShell library. Do
          not treat a fragment here as a tested, signed, or supported release. Rebuild any
          automation from reviewed requirements in an authorised lab.
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
