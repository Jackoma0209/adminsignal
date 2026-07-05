import type { Metadata } from 'next'
import { scripts } from '@/data/scripts'
import ScriptCard from '@/components/cards/ScriptCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'PowerShell Script Library'
const pageDescription =
  'PowerShell implementation guides and script patterns for endpoint management, compliance reporting, and Windows automation. Each page clearly labels source availability.'
const pagePath = '/scripts'

export const metadata: Metadata = buildCategoryMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
})

const languages = [...new Set(scripts.map((s) => s.language))]

export default async function ScriptsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const language = category
  const filtered = language ? scripts.filter((s) => s.language === language) : scripts

  const pageUrl = language
    ? `https://www.adminsignal.com/scripts?category=${encodeURIComponent(language)}`
    : 'https://www.adminsignal.com/scripts'

  const jsonLdCollection = collectionPageSchema({
    title: language ? `${pageTitle} — ${language}` : pageTitle,
    description: pageDescription,
    url: pageUrl,
    items: filtered.map((script) => ({
      name: script.title,
      url: `https://www.adminsignal.com/scripts/${script.slug}`,
    })),
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Scripts', url: 'https://www.adminsignal.com/scripts' },
  ])

  return (
    <>
      <StructuredData data={jsonLdCollection} />
      <StructuredData data={jsonLdBreadcrumb} />

      <CategoryPageTemplate
        eyebrow="Script Library"
        title={pageTitle}
        description="Implementation guides for endpoint management, compliance, and automation. Each script page includes availability status, permissions, usage examples, validation steps, and authorised-use safety notes."
        itemCount={scripts.length}
        categories={languages}
        activeCategory={language}
        basePath="/scripts"
      >
        <div className="mb-8 rounded-lg border border-amber-500/25 bg-amber-500/5 p-5 text-sm leading-relaxed text-muted">
          <p className="font-semibold text-foreground">Source availability</p>
          <p className="mt-2">
            Complete .ps1 source files are not published in this repository yet. Current script
            pages are implementation guides and example patterns with prerequisites, permissions,
            parameters, example usage, expected output, validation steps, safety notes, and version
            history. Source links will be added only after the complete script exists and has been
            reviewed.
          </p>
        </div>
        <div className="mb-10 grid gap-5 lg:grid-cols-3">
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">How to use these guides</h2>
            <p>
              Treat each page as a pattern to adapt, not a blind copy-and-run artifact. Read the
              supported environments, permissions, and parameters first, then test with a pilot
              group before expanding scope.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Before production use</h2>
            <p>
              Confirm Graph scopes, role assignments, output paths, logging, rollback options, and
              change approval. Capture expected output from a known-good test so validation is not
              guesswork later.
            </p>
          </section>
          <section className="rounded-lg border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
            <h2 className="mb-2 text-sm font-semibold text-foreground">Authorised systems only</h2>
            <p>
              The library is written for defensive administration, troubleshooting, compliance,
              and audit work on systems you are authorised to manage. Destructive or broad changes
              should be tested, backed up, and staged.
            </p>
          </section>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((script) => (
            <ScriptCard key={script.id} script={script} />
          ))}
        </div>
      </CategoryPageTemplate>
    </>
  )
}
