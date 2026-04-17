import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Briefcase, CalendarCheck, ExternalLink, Award } from 'lucide-react'
import Container from '@/components/layout/Container'
import { primaryAuthor } from '@/data/authors'

const credentials = [
  { icon: Briefcase, label: '12+ years enterprise Windows & Intune' },
  { icon: BadgeCheck, label: 'Production-tested — not lab theory' },
  { icon: CalendarCheck, label: 'Content updated regularly, not published once and forgotten' },
]

const internalLinks = [
  { label: 'Intune guides', href: '/intune' },
  { label: 'PowerShell scripts', href: '/scripts' },
  { label: 'Windows Server', href: '/windows-server' },
  { label: 'All topics', href: '/topics' },
  { label: 'About AdminSignal', href: '/about' },
]

export default function AuthorBioSection() {
  return (
    <section className="border-t border-border py-24" aria-labelledby="author-heading">
      <Container>
        {/* Eyebrow */}
        <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-primary">
          About the Author
        </p>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
          {/* ── Left column: identity card ── */}
          <div className="flex flex-col gap-6">
            {/* Avatar */}
            <div className="flex items-center gap-5">
              {primaryAuthor.avatarUrl ? (
                <Image
                  src={primaryAuthor.avatarUrl}
                  alt={`${primaryAuthor.name} — ${primaryAuthor.role}`}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-primary/20"
                  priority
                />
              ) : (
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-3xl font-bold text-primary ring-1 ring-primary/20"
                  role="img"
                  aria-label={`${primaryAuthor.name} — author avatar placeholder`}
                >
                  {primaryAuthor.initials}
                </div>
              )}
              <div>
                <p className="text-xl font-bold tracking-tight text-foreground">
                  {primaryAuthor.name}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-muted">{primaryAuthor.role}</p>
              </div>
            </div>

            {/* Credential badges */}
            <ul className="flex flex-col gap-3" aria-label="Credentials">
              {credentials.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <Icon className="h-3 w-3 text-emerald-400" strokeWidth={2} />
                  </div>
                  <span className="text-sm leading-snug text-muted">{label}</span>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="flex flex-wrap gap-2">
              {primaryAuthor.linkedIn && (
                <a
                  href={primaryAuthor.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  aria-label="LinkedIn profile (opens in new tab)"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  LinkedIn
                </a>
              )}
              {primaryAuthor.github && (
                <a
                  href={primaryAuthor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  aria-label="GitHub profile (opens in new tab)"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
            </div>

            {/* Microsoft certifications */}
            {primaryAuthor.certifications && primaryAuthor.certifications.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted/50">
                  Certifications
                </p>
                <ul className="flex flex-col gap-1.5" aria-label="Microsoft certifications">
                  {primaryAuthor.certifications.map((cert) => (
                    <li key={cert} className="flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 shrink-0 text-primary/60" aria-hidden="true" />
                      <span className="text-xs leading-snug text-muted">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Last updated trust signal */}
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
              <p className="text-xs leading-relaxed text-emerald-400">
                <span className="font-semibold">Content kept current.</span> All guides and scripts
                are reviewed and updated as Microsoft ships changes — not published once and left to
                rot.
              </p>
              <p className="mt-1 text-xs text-muted/50">
                Last site-wide review:{' '}
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* ── Right column: bio + links ── */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div>
              <h2
                id="author-heading"
                className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Practitioner-written. Not a content farm.
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-muted">
                <p>
                  AdminSignal exists because I kept hitting the same wall: Microsoft docs that stop
                  at &quot;click Apply&quot;, blog posts written by people who clearly haven&apos;t
                  touched a real fleet, and Reddit threads that end with &quot;it depends.&quot;
                </p>
                <p>
                  Everything I publish here is drawn from 12+ years managing Windows environments —
                  Intune tenants with 10,000+ devices, Active Directory migrations, endpoint security
                  hardening for regulated industries, and the kind of PowerShell that gets written at
                  2 AM when something breaks. If a guide is on AdminSignal, it has been run in
                  production, not just a dev VM.
                </p>
                <p>
                  The site covers{' '}
                  <Link href="/intune" className="text-foreground underline underline-offset-2 hover:text-primary">
                    Microsoft Intune
                  </Link>
                  ,{' '}
                  <Link href="/powershell" className="text-foreground underline underline-offset-2 hover:text-primary">
                    PowerShell automation
                  </Link>
                  ,{' '}
                  <Link href="/windows-server" className="text-foreground underline underline-offset-2 hover:text-primary">
                    Windows Server
                  </Link>
                  ,{' '}
                  <Link href="/endpoint-security" className="text-foreground underline underline-offset-2 hover:text-primary">
                    endpoint security
                  </Link>
                  , and the day-to-day reality of running enterprise IT. I write the content I
                  wish existed when I was learning — and the content I still reach for when I&apos;m
                  stuck.
                </p>
              </div>
            </div>

            {/* Internal navigation links */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted/60">
                Explore the library
              </p>
              <div className="flex flex-wrap gap-2">
                {internalLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    {label}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Editorial trust line */}
            <p className="text-xs text-muted/50">
              AdminSignal content is produced independently.{' '}
              <Link
                href="/editorial-policy"
                className="underline underline-offset-2 hover:text-muted"
              >
                Editorial policy
              </Link>{' '}
              ·{' '}
              <Link
                href="/about"
                className="underline underline-offset-2 hover:text-muted"
              >
                About this site
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
