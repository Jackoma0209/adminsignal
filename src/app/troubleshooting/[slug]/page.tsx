import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { troubleshootingArticles } from '@/data/troubleshooting'
import { getAuthor } from '@/data/authors'
import { getContentItem, getContentSlugs } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import { articleSchema, breadcrumbSchema, safeJsonLd } from '@/lib/schema'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import TableOfContents from '@/components/article/TableOfContents'
import AuthorBox from '@/components/article/AuthorBox'
import RelatedContent from '@/components/article/RelatedContent'
import AdSlot from '@/components/article/AdSlot'
import TrustBanner from '@/components/article/TrustBanner'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getContentSlugs('troubleshooting').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = troubleshootingArticles.find((a) => a.slug === slug)
  if (!article) return {}
  const author = getAuthor(article.authorId)
  return buildArticleMetadata({
    title: article.title,
    description: article.excerpt,
    url: `https://adminsignal.com/troubleshooting/${slug}`,
    category: article.category,
    publishedTime: article.date,
    authorName: author?.name,
  })
}

export default async function TroubleshootingArticlePage({ params }: Props) {
  const { slug } = await params
  const article = troubleshootingArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  let content = ''
  let headings: { id: string; text: string; level: number }[] = []
  let lastReviewed: string | undefined
  let reviewNote: string | undefined

  try {
    const item = getContentItem('troubleshooting', slug)
    content = item.content
    headings = item.headings
    lastReviewed = item.frontmatter.lastReviewed as string | undefined
    reviewNote = item.frontmatter.reviewNote as string | undefined
  } catch {
    notFound()
  }

  const author = getAuthor(article.authorId)

  const relatedArticles = troubleshootingArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3)
    .map((a) => ({
      title: a.title,
      href: `/troubleshooting/${a.slug}`,
      type: 'troubleshooting' as const,
      excerpt: a.excerpt,
      meta: `${a.readTime} · ${a.difficulty}`,
    }))

  const jsonLd = articleSchema({
    title: article.title,
    description: article.excerpt,
    publishedTime: article.date,
    authorName: author?.name,
    url: `https://adminsignal.com/troubleshooting/${slug}`,
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://adminsignal.com' },
    { name: 'Troubleshooting', url: 'https://adminsignal.com/troubleshooting' },
    { name: article.title, url: `https://adminsignal.com/troubleshooting/${slug}` },
  ])

  const difficultyVariant: Record<typeof article.difficulty, 'category' | 'difficulty' | 'language'> = {
    Beginner: 'category',
    Intermediate: 'difficulty',
    Advanced: 'language',
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
              { label: 'Troubleshooting', href: '/troubleshooting' },
              { label: article.title },
            ]}
          />
        </Container>
      </div>

      <Container>
        <div className="py-10 lg:py-14">
          {lastReviewed && <TrustBanner lastReviewed={lastReviewed} note={reviewNote} />}

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            <article>
              <header className="mb-8">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="category">{article.category}</Badge>
                  <Badge variant={difficultyVariant[article.difficulty]}>{article.difficulty}</Badge>
                </div>
                <h1 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {article.title}
                </h1>
                <div className="mb-4 flex flex-wrap gap-2">
                  {article.affectedProducts.map((product) => (
                    <span
                      key={product}
                      className="rounded border border-border bg-surface px-2 py-0.5 text-xs text-muted"
                    >
                      {product}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted/70">
                  {author && <span>{author.name}</span>}
                  {author && <span aria-hidden="true">·</span>}
                  <time dateTime={article.date}>{article.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
              </header>

              <AdSlot variant="banner" className="mb-8" />

              <Prose>
                <MDXRemote source={content} />
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
                <AdSlot variant="sidebar" />
              </div>
            </aside>
          </div>

          {relatedArticles.length > 0 && (
            <div className="mt-14 border-t border-border pt-12">
              <RelatedContent items={relatedArticles} heading="More troubleshooting guides" />
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
