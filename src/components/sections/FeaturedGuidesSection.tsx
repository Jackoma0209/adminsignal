import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock, ShieldCheck } from 'lucide-react'
import Container from '@/components/layout/Container'
import SectionHeader from '@/components/ui/SectionHeader'
import GuideCard from '@/components/cards/GuideCard'
import Badge from '@/components/ui/Badge'
import { guides } from '@/data/guides'

const categoryGradients: Record<string, string> = {
  'Microsoft Intune': 'from-cyan-950 via-slate-900 to-slate-950',
  'Endpoint Security': 'from-emerald-950 via-slate-900 to-slate-950',
  'Group Policy': 'from-amber-950 via-slate-900 to-slate-950',
  'Windows Server': 'from-slate-800 via-slate-900 to-slate-950',
  'PowerShell': 'from-violet-950 via-slate-900 to-slate-950',
  'Microsoft Entra ID': 'from-blue-950 via-slate-900 to-slate-950',
}

export default function FeaturedGuidesSection() {
  const featured = guides.filter((g) => g.isFeatured).slice(0, 4)
  const hero = featured[0]
  const rest = featured.slice(1, 4)

  if (!hero) return null

  const heroGradient = categoryGradients[hero.category] ?? 'from-slate-900 via-slate-900 to-slate-950'
  const heroHref = hero.href ?? `/tutorials/${hero.slug}`

  return (
    <section className="border-t border-border bg-surface/20 py-20">
      <Container>
        <SectionHeader
          eyebrow="Featured Guides"
          title="The depth your vendor docs don't cover"
          description="Step-by-step technical guides that go where official documentation stops — from GPO internals to Graph API edge cases."
          action={
            <Link
              href="/tutorials"
              className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              Browse all guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        {/* ── Hero featured guide ───────────────────────────────────────── */}
        <article className="group mb-5 overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-colors hover:border-border-strong hover:bg-surface-elevated/40">
          <div className={`relative bg-linear-to-br ${heroGradient}`}>
            {/* dot grid */}
            <div
              className="absolute inset-0 opacity-[0.055]"
              aria-hidden="true"
              style={{
                backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            {/* cyan glow */}
            <div
              className="pointer-events-none absolute -top-24 right-0 h-64 w-96 opacity-[0.12]"
              aria-hidden="true"
              style={{
                background: 'radial-gradient(ellipse, rgba(34,211,238,1) 0%, transparent 70%)',
              }}
            />

            <div className="relative px-7 py-8 sm:px-10 sm:py-10 lg:flex lg:items-center lg:gap-12">
              {/* Left: text */}
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge variant="category">{hero.category}</Badge>
                  <Badge variant="language">{hero.difficulty}</Badge>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    <ShieldCheck className="h-3 w-3" />
                    Updated April 2026
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
                    <Clock className="h-3.5 w-3.5" />
                    <span>{hero.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Right: decorative terminal-style block */}
              <div
                className="mt-8 hidden shrink-0 lg:mt-0 lg:block lg:w-72"
                aria-hidden="true"
              >
                <div className="rounded-lg border border-border/50 bg-black/40 p-4 font-mono text-xs leading-relaxed text-muted/70">
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-muted/40">preflight.ps1</span>
                  </div>
                  <div className="space-y-0.5 text-[11px]">
                    <p><span className="text-cyan-400">function</span> <span className="text-yellow-300">Test-AutopilotReadiness</span> {'{'}</p>
                    <p className="pl-3 text-muted/50">  # TPM + SecureBoot + OS build</p>
                    <p className="pl-3"><span className="text-green-400">$tpm</span> = Get-Tpm</p>
                    <p className="pl-3"><span className="text-green-400">$sb</span>  = Confirm-SecureBootUEFI</p>
                    <p className="pl-3"><span className="text-green-400">$os</span>  = Get-CimInstance Win32_OS</p>
                    <p className="pl-3 text-muted/50">  # Network reachability check</p>
                    <p className="pl-3">Test-NetConnection -Port 443</p>
                    <p>{'}'}</p>
                    <p className="pt-1 text-green-400">✓ TPM Present · PASS</p>
                    <p className="text-green-400">✓ Secure Boot  · PASS</p>
                    <p className="text-green-400">✓ Build 26100  · PASS</p>
                    <p className="text-green-400">✓ Intune reachable · PASS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ── Supporting guide cards ────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </Container>
    </section>
  )
}
