import type { Metadata } from 'next'
import { scripts } from '@/data/scripts'
import ScriptCard from '@/components/cards/ScriptCard'
import CategoryPageTemplate from '@/components/templates/CategoryPageTemplate'
import { buildCategoryMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildCategoryMetadata({
  title: 'PowerShell Script Library',
  description:
    'Production-tested PowerShell scripts for endpoint management, compliance reporting, and Windows automation. Every script is documented with parameters, usage examples, and prerequisites.',
  path: '/scripts',
})

const languages = [...new Set(scripts.map((s) => s.language))]

export default async function ScriptsPage({
  searchParams,
}: {
  searchParams: Promise<{ language?: string }>
}) {
  const { language } = await searchParams
  const filtered = language ? scripts.filter((s) => s.language === language) : scripts

  return (
    <CategoryPageTemplate
      eyebrow="Script Library"
      title="PowerShell Script Library"
      description="Production-tested scripts for endpoint management, compliance, and automation. Every script ships with parameters, usage examples, and prerequisites."
      itemCount={scripts.length}
      categories={languages}
      activeCategory={language}
      basePath="/scripts"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((script) => (
          <ScriptCard key={script.id} script={script} />
        ))}
      </div>
    </CategoryPageTemplate>
  )
}
