import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/ui/MdxComponents'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, CalendarDays, ShieldCheck, ChevronRight } from 'lucide-react'
import { guides } from '@/data/guides'
import { getAuthor } from '@/data/authors'
import { getContentItem } from '@/lib/content'
import { buildArticleMetadata } from '@/lib/metadata'
import { articleSchema, breadcrumbSchema } from '@/lib/schema'
import Container from '@/components/layout/Container'
import Breadcrumbs from '@/components/article/Breadcrumbs'
import TableOfContents from '@/components/article/TableOfContents'
import AuthorBox from '@/components/article/AuthorBox'
import RelatedContent from '@/components/article/RelatedContent'
import AdSlot from '@/components/article/AdSlot'
import TrustBanner from '@/components/article/TrustBanner'
import AffiliateBlock from '@/components/article/AffiliateBlock'
import Prose from '@/components/ui/Prose'
import Badge from '@/components/ui/Badge'
import StructuredData from '@/components/StructuredData'
import NewsletterSection from '@/components/sections/NewsletterSection'

const SLUG = 'windows-11-25h2-autopilot-v2'
const PAGE_URL = 'https://www.adminsignal.com/guides/windows-11-25h2-autopilot-v2'

export async function generateMetadata(): Promise<Metadata> {
  const guide = guides.find((g) => g.slug === SLUG)
  if (!guide) return {}
  const author = guide.authorId ? getAuthor(guide.authorId) : undefined
  return buildArticleMetadata({
    title: guide.title,
    description: guide.excerpt,
    url: PAGE_URL,
    category: guide.category,
    publishedTime: guide.publishedAt,
    tags: guide.tags,
    authorName: author?.name,
  })
}

export default async function Windows1125H2AutopilotV2Page() {
  const guide = guides.find((g) => g.slug === SLUG)!
  const author = guide.authorId ? getAuthor(guide.authorId) : undefined

  const { content, headings, frontmatter } = getContentItem('tutorials', SLUG)
  const lastReviewed = frontmatter.lastReviewed as string | undefined
  const reviewNote = frontmatter.reviewNote as string | undefined

  const relatedItems = [
    {
      title: 'Understanding Autopilot v2: Enrollment Profiles, ESP, and Common Failure Modes',
      href: '/tutorials/autopilot-v2-enrollment-esp-troubleshooting',
      type: 'tutorial' as const,
      excerpt:
        'Windows Autopilot v2 changes how enrollment profiles work. Covers device preparation, the Enrollment Status Page, and a decision tree for diagnosing the most common deployment failures.',
      meta: '16 min read · Intermediate',
    },
    {
      title: 'Deploying Windows LAPS with Microsoft Intune: A Complete Walkthrough',
      href: '/tutorials/deploy-windows-laps-intune',
      type: 'tutorial' as const,
      excerpt:
        'Step-by-step guide to rolling out Windows Local Administrator Password Solution across your Intune-managed fleet — the essential companion to any zero-touch deployment.',
      meta: '14 min read · Intermediate',
    },
    {
      title: 'Hardening Windows 11 Endpoints with CIS Benchmark Level 1',
      href: '/tutorials/hardening-windows-11-cis-benchmark',
      type: 'tutorial' as const,
      excerpt:
        'Apply CIS Level 1 controls to Windows 11 25H2 using Intune profiles and a validation script that reports compliance gaps. Run this after Autopilot provisioning.',
      meta: '20 min read · Advanced',
    },
  ]

  const jsonLd = articleSchema({
    title: guide.title,
    description: guide.excerpt,
    publishedTime: guide.publishedAt,
    modifiedTime: lastReviewed,
    authorName: author?.name,
    url: PAGE_URL,
    tags: guide.tags,
  })

  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://www.adminsignal.com' },
    { name: 'Guides', url: 'https://www.adminsignal.com/tutorials' },
    { name: guide.title, url: PAGE_URL },
  ])

  return (
    <>
      <StructuredData data={jsonLd} />
      <StructuredData data={jsonLdBreadcrumb} />

      {/* ── Breadcrumbs ─────────────────────────────────────────────────── */}
      <div className="border-b border-border bg-surface/10 py-4">
        <Container>
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Tutorials', href: '/tutorials' },
              { label: guide.title },
            ]}
          />
        </Container>
      </div>

      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border bg-surface/30">
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Cyan radial glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-125 w-225 -translate-x-1/2 opacity-[0.07]"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse, rgba(34,211,238,1) 0%, transparent 70%)',
          }}
        />

        <Container>
          <div className="relative py-12 lg:py-16">
            {/* Category + difficulty badges */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge variant="category">{guide.category}</Badge>
              <Badge variant="language">{guide.difficulty}</Badge>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                Updated April 2026
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {guide.title}
            </h1>

            {/* Excerpt / deck */}
            <p className="mb-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {guide.excerpt}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted">
              {author && (
                <span className="flex items-center gap-2">
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary"
                    aria-hidden="true"
                  >
                    {author.initials}
                  </span>
                  {author.name}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-muted/50" aria-hidden="true" />
                <time dateTime={guide.publishedAt}>{guide.date}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-muted/50" aria-hidden="true" />
                {guide.readTime}
              </span>
            </div>

            {/* Quick navigation shortcuts */}
            <nav
              aria-label="Jump to section"
              className="mt-8 flex flex-wrap gap-2"
            >
              {[
                { label: 'Tenant readiness', href: '#tenant-readiness-checklist' },
                { label: 'Device prep policy', href: '#configuring-the-autopilot-v2-device-preparation-policy' },
                { label: 'App strategy', href: '#app-deployment-strategy-during-autopilot' },
                { label: 'Rollout sequence', href: '#production-rollout-sequence' },
                { label: 'Troubleshooting', href: '#troubleshooting-common-failure-points' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {label}
                  <ChevronRight className="h-3 w-3 text-muted/50" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <Container>
        <div className="py-10 lg:py-14">
          {lastReviewed && <TrustBanner lastReviewed={lastReviewed} note={reviewNote} />}

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            {/* ── Article body ──────────────────────────────────────────── */}
            <article>
              <AdSlot variant="banner" className="mb-8" />

              <Prose>
                <MDXRemote source={content} components={mdxComponents} />
              </Prose>

              {/* ── Affiliate block ─────────────────────────────────────── */}
              <AffiliateBlock
                toolName="Microsoft Intune"
                tagline="Manage, secure, and report on all your endpoints from a single cloud-native console. The platform this entire guide is built around."
                href="https://intune.microsoft.com"
                badge="Recommended"
                external
              />

              {/* ── Author box ──────────────────────────────────────────── */}
              {author && (
                <div className="mt-12">
                  <AuthorBox author={author} />
                </div>
              )}

              {/* ── Internal linking section ────────────────────────────── */}
              <div className="mt-10 rounded-xl border border-border bg-surface p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
                  Explore the full Intune toolkit
                </p>
                <ul className="space-y-2.5">
                  {[
                    { label: 'All Intune guides and news', href: '/intune' },
                    { label: 'Autopilot troubleshooting index', href: '/troubleshooting' },
                    { label: 'PowerShell script library', href: '/scripts' },
                    { label: 'Windows Server topic hub', href: '/windows-server' },
                    { label: 'Browse all tutorials', href: '/tutorials' },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-primary/50" aria-hidden="true" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside>
              <div className="sticky top-20 space-y-6">
                {headings.length >= 2 && (
                  <div className="rounded-xl border border-border bg-surface p-5">
                    <TableOfContents headings={headings} />
                  </div>
                )}
                <AdSlot variant="sidebar" />
              </div>
            </aside>
          </div>

          {/* ── Related tutorials ────────────────────────────────────── */}
          <div className="mt-14 border-t border-border pt-12">
            <RelatedContent items={relatedItems} heading="Related tutorials" />
          </div>
        </div>
      </Container>

      {/* ── Newsletter CTA ──────────────────────────────────────────────── */}
      <NewsletterSection />
    </>
  )
}
