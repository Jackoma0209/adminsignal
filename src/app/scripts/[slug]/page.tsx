import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { scripts } from '@/data/scripts'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import { softwareApplicationSchema, breadcrumbSchema, safeJsonLd } from '@/lib/schema'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import TableOfContents from '@/components/article/TableOfContents'
import RelatedContent from '@/components/article/RelatedContent'
import AdSlot from '@/components/article/AdSlot'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('scripts').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const script = scripts.find((s) => s.slug === slug)
  if (!script) return {}
  return buildArticleMetadata({
    title: script.title,
    description: script.description,
    category: script.language,
  })
}

export default async function ScriptDetailPage({ params }: Props) {
  const { slug } = await params
  const script = scripts.find((s) => s.slug === slug)
  if (!script) notFound()

  let content = ''
  let headings: { id: string; text: string; level: number }[] = []

  try {
    const item = getContentItem('scripts', slug)
    content = item.content
    headings = item.headings
  } catch {
    notFound()
  }

  const relatedScripts = scripts
    .filter((s) => s.id !== script.id && s.language === script.language)
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      href: `/scripts/${s.slug}`,
      type: 'script' as const,
      excerpt: s.description,
      meta: `${s.language} · ${s.stars} stars`,
    }))

  const jsonLd = softwareApplicationSchema({
    name: script.title,
    description: script.description,
    url: `https://adminsignal.com/scripts/${slug}`,
    applicationCategory: 'UtilitiesApplication',
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://adminsignal.com' },
    { name: 'Scripts', url: 'https://adminsignal.com/scripts' },
    { name: script.title, url: `https://adminsignal.com/scripts/${slug}` },
  ])

  const languageVariant: Record<typeof script.language, 'category' | 'difficulty' | 'language' | 'new'> = {
    PowerShell: 'language',
    Python: 'difficulty',
    Bash: 'category',
    Registry: 'new',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLdBreadcrumb) }} />

      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Scripts', href: '/scripts' },
              { label: script.title },
            ]}
          />
        </Container>
      </div>

      <Container>
        <div className="py-10 lg:py-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            <article>
              <header className="mb-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant={languageVariant[script.language]}>{script.language}</Badge>
                  {script.isNew && <Badge variant="new">New</Badge>}
                </div>
                <h1 className="mb-3 font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {script.title}
                </h1>
                <p className="mb-4 text-base leading-relaxed text-muted">{script.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {script.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border bg-surface px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-xs text-muted/60">{script.stars} stars</span>
                </div>
              </header>

              <AdSlot variant="banner" className="mb-8" />

              <Prose>
                <MDXRemote source={content} />
              </Prose>
            </article>

            <aside>
              <div className="sticky top-20">
                {headings.length >= 2 && (
                  <div className="mb-6 rounded-xl border border-border bg-surface p-5">
                    <TableOfContents headings={headings} />
                  </div>
                )}
                <AdSlot variant="sidebar" />
              </div>
            </aside>
          </div>

          {relatedScripts.length > 0 && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedScripts} heading="More scripts" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
