import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { mdxComponents } from '@/components/ui/MdxComponents'
import { scripts } from '@/data/scripts'
import { getAuthor } from '@/data/authors'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { articleMdxOptions } from '@/lib/mdx'
import { buildArticleMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'
import { breadcrumbSchema } from '@/lib/schema'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import TableOfContents from '@/components/article/TableOfContents'
import AuthorBox from '@/components/article/AuthorBox'
import RelatedContent from '@/components/article/RelatedContent'
import ScriptSafetyNotice from '@/components/article/ScriptSafetyNotice'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'
import StructuredData from '@/components/StructuredData'

const siteUrl = 'https://www.adminsignal.com'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('scripts').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const script = scripts.find((item) => item.slug === slug)
  if (!script) return {}

  return withNoindex(
    buildArticleMetadata({
      title: `${script.title}: implementation pattern`,
      description: `${script.description} This page is an implementation note with example fragments, not a complete script release, and is excluded from search indexing.`,
      url: `${siteUrl}/scripts/${slug}`,
      category: script.language,
      tags: script.tags,
    }),
  )
}

export default async function ScriptDetailPage({ params }: Props) {
  const { slug } = await params
  const script = scripts.find((item) => item.slug === slug)
  if (!script) notFound()

  let content = ''
  let headings: { id: string; text: string; level: number }[] = []
  let frontmatter: Record<string, unknown> = {}

  try {
    const item = getContentItem('scripts', slug)
    content = item.content
    headings = item.headings
    frontmatter = item.frontmatter
  } catch {
    notFound()
  }

  const authorId = typeof frontmatter.authorId === 'string' ? frontmatter.authorId : undefined
  const author = authorId ? getAuthor(authorId) : undefined

  const relatedScripts = scripts
    .filter((item) => item.id !== script.id && item.language === script.language)
    .slice(0, 3)
    .map((item) => ({
      title: item.title,
      href: `/scripts/${item.slug}`,
      type: 'script' as const,
      excerpt: item.description,
      meta: 'Implementation notes',
    }))

  const pageUrl = `${siteUrl}/scripts/${slug}`
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Implementation patterns', url: `${siteUrl}/scripts` },
    { name: script.title, url: pageUrl },
  ])

  const languageVariant: Record<
    typeof script.language,
    'category' | 'difficulty' | 'language' | 'new'
  > = {
    PowerShell: 'language',
    Python: 'difficulty',
    Bash: 'category',
    Registry: 'new',
  }

  return (
    <>
      <StructuredData data={jsonLdBreadcrumb} />

      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Implementation patterns', href: '/scripts' },
              { label: script.title },
            ]}
          />
        </Container>
      </div>

      <Container>
        <div className="py-10 lg:py-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article>
              <header className="mb-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant={languageVariant[script.language]}>{script.language}</Badge>
                  <Badge variant="difficulty">Reference only</Badge>
                </div>
                <h1 className="mb-3 font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {script.title}
                </h1>
                <p className="mb-4 text-base leading-relaxed text-muted">{script.description}</p>
                <div className="flex flex-wrap gap-2">
                  {script.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-surface px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <div className="mb-6 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
                <h2 className="font-semibold text-foreground">Implementation notes — example fragments only</h2>
                <p className="mt-2">
                  This page records design guidance, permissions, and command shape. It is not a
                  complete .ps1 file, signed release, or production-ready automation. Rebuild any
                  implementation from reviewed requirements and test it on authorised systems.
                </p>
              </div>

              <ScriptSafetyNotice script={script} />

              <Prose>
                <MDXRemote
                  source={content}
                  options={articleMdxOptions}
                  components={mdxComponents}
                />
              </Prose>

              {author && (
                <div className="mt-12">
                  <AuthorBox author={author} />
                </div>
              )}
            </article>

            <aside>
              <div className="sticky top-20">
                {headings.length >= 2 && (
                  <div className="mb-6 rounded-xl border border-border bg-surface p-5">
                    <TableOfContents headings={headings} />
                  </div>
                )}
                <div className="rounded-xl border border-border bg-surface p-5 text-xs leading-relaxed text-muted">
                  <p className="font-semibold text-foreground">Indexing status</p>
                  <p className="mt-2">
                    These notes stay out of search results because they are implementation
                    fragments, not complete script releases.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {relatedScripts.length > 0 && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedScripts} heading="Related implementation patterns" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
