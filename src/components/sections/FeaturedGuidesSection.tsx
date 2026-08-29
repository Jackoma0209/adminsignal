import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import GuideCard from '@/components/cards/GuideCard'
import Badge from '@/components/ui/Badge'
import { guides, type Guide } from '@/data/guides'
import { troubleshootingArticles } from '@/data/troubleshooting'
import { isNoindexHref } from '@/lib/noindex'

const categoryGradients: Record<string, string> = {
  'Microsoft Intune': 'from-cyan-950 via-slate-900 to-slate-950',
  'Endpoint Security': 'from-emerald-950 via-slate-900 to-slate-950',
  'Group Policy': 'from-amber-950 via-slate-900 to-slate-950',
  'Windows Server': 'from-slate-800 via-slate-900 to-slate-950',
  'PowerShell': 'from-violet-950 via-slate-900 to-slate-950',
  'Microsoft Entra ID': 'from-blue-950 via-slate-900 to-slate-950',
}

const HOMEPAGE_FEATURED: { kind: 'guide' | 'troubleshooting'; slug: string }[] = [
  { kind: 'guide', slug: 'azuread-msonline-to-microsoft-graph-powershell-migration' },
  { kind: 'guide', slug: 'intune-admin-templates-to-settings-catalog-migration' },
  { kind: 'guide', slug: 'microsoft-defender-for-endpoint-intune-rollout' },
  { kind: 'guide', slug: 'exchange-online-smtp-auth-basic-auth-2026-migration' },
  { kind: 'troubleshooting', slug: 'autopilot-device-not-importing-hardware-hash' },
  { kind: 'troubleshooting', slug: 'intune-device-not-syncing' },
]

function featuredAsGuide(entry: (typeof HOMEPAGE_FEATURED)[number]): Guide | undefined {
  if (entry.kind === 'guide') {
    return guides.find((guide) => guide.slug === entry.slug)
  }
  const article = troubleshootingArticles.find((item) => item.slug === entry.slug)
  if (!article) return undefined
  return {
    id: `ts-${article.id}`,
    title: article.title,
    slug: article.slug,
    href: `/troubleshooting/${article.slug}`,
    category: article.category,
    excerpt: article.excerpt,
    date: article.date,
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    difficulty: article.difficulty,
    authorId: article.authorId,
  }
}

export default function FeaturedGuidesSection() {
  const featured = HOMEPAGE_FEATURED.map(featuredAsGuide).filter((guide): guide is Guide => {
    if (!guide) return false
    const href = guide.href ?? `/tutorials/${guide.slug}`
    return !isNoindexHref(href)
  })
  const hero = featured[0]
  const rest = featured.slice(1)

  if (!hero) return null

  const heroGradient = categoryGradients[hero.category] ?? 'from-slate-900 via-slate-900 to-slate-950'
  const heroHref = hero.href ?? `/tutorials/${hero.slug}`
  const updatedLabel = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${hero.publishedAt}T00:00:00Z`))

  return (
    <section className="border-t border-border bg-surface/20 py-20">
      <Container>
        <SectionHeader
          eyebrow="Featured Guides"
          title="The depth your vendor docs don't cover"
          description="Command-heavy operator guides: Graph migrations, Settings Catalog, Defender rollout, SMTP AUTH, Autopilot imports, and Intune sync failures."
          action={
            <div className="flex flex-col items-end gap-2">
              <Link
                href="/troubleshooting"
                className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                Browse troubleshooting
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tutorials"
                className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                Browse all guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          }
        />

        <article className="group mb-5 overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
          <div className={`relative bg-linear-to-br ${heroGradient}`}>
            <div
              className="absolute inset-0 opacity-[0.055]"
              aria-hidden="true"
              style={{
                backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div
              className="pointer-events-none absolute -top-24 right-0 h-64 w-96 opacity-[0.12]"
              aria-hidden="true"
              style={{
                background: 'radial-gradient(ellipse, rgba(34,211,238,1) 0%, transparent 70%)',
              }}
            />

            <div className="relative px-7 py-8 sm:px-10 sm:py-10 lg:flex lg:items-center lg:gap-12">
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="category">{hero.category}</Badge>
                  <Badge variant="language">{hero.difficulty}</Badge>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    <ShieldCheck className="h-3 w-3" />
                    Updated {updatedLabel}
                  </span>
                </div>

                <Link href={heroHref}>
                  <h3 className="mb-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                    {hero.title}
                  </h3>
                </Link>

                <p className="mb-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {hero.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={heroHref}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                  >
                    Read the guide
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <div className="flex items-center gap-1.5 text-xs text-muted/70">
                    <time dateTime={hero.publishedAt}>{hero.date}</time>
                    <span aria-hidden="true">·</span>
                    <Clock className="h-3.5 w-3.5" />
                    <span>{hero.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 hidden shrink-0 lg:mt-0 lg:block lg:w-72">
                {hero.coverImage ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-border/50 bg-black/40 shadow-card">
                    <Image
                      src={hero.coverImage.src}
                      alt={hero.coverImage.alt}
                      fill
                      className="object-cover opacity-95 transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="288px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div
                    className="rounded-lg border border-border/50 bg-black/40 p-4 font-mono text-xs leading-relaxed text-muted/70"
                    aria-hidden="true"
                  >
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                      <span className="ml-2 text-muted/40">preflight.ps1</span>
                    </div>
                    <div className="space-y-0.5 text-[11px]">
                      <p><span className="text-cyan-400">function</span> <span className="text-yellow-300">Test-Readiness</span> {'{'}</p>
                      <p className="pl-3 text-muted/50">  # Validate prerequisites</p>
                      <p className="pl-3"><span className="text-green-400">$state</span> = Get-ComputerInfo</p>
                      <p className="pl-3">Test-NetConnection -Port 443</p>
                      <p>{'}'}</p>
                      <p className="pt-1 text-green-400">✓ Prerequisites · PASS</p>
                      <p className="text-green-400">✓ Connectivity · PASS</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </Container>
    </section>
  )
}
