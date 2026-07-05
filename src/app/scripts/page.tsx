import type { Metadata } from 'next'
import { scripts } from '@/data/scripts'
import ScriptCard from '@/components/cards/ScriptCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import StructuredData from '@/components/StructuredData'
import { buildCategoryMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const pageTitle = 'PowerShell Script Library'
const pageDescription =
  'PowerShell script implementation guides for endpoint management, compliance reporting, and Windows automation. Each page clearly labels whether full downloadable code is available.'
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
  searchParams: Promise<{ language?: string }>
}) {
  const { language } = await searchParams
  const filtered = language ? scripts.filter((s) => s.language === language) : scripts

  const pageUrl = language
    ? `https://www.adminsignal.com/scripts?language=${encodeURIComponent(language)}`
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
          <p className="font-semibold text-foreground">Script download status</p>
          <p className="mt-2">
            Full downloadable script files are not published in this repository yet. Current script
            pages provide implementation guidance, prerequisites, permissions, parameters, example
            usage, expected output, validation steps, safety notes, and version history. Real
            GitHub or download links will be added only after the full source exists.
          </p>
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
