import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink, FileCheck2, ShieldCheck, UserRound } from 'lucide-react'
import Container from '@/components/layout/Container'
import { primaryAuthor } from '@/data/authors'

const editorialChecks = [
  {
    icon: UserRound,
    label: 'Written and maintained by a named author',
  },
  {
    icon: FileCheck2,
    label: 'Primary vendor documentation cited where it supports technical claims',
  },
  {
    icon: ShieldCheck,
    label: 'Prerequisites, validation evidence, and operational risk called out where relevant',
  },
]

const internalLinks = [
  { label: 'Intune guides', href: '/intune' },
  { label: 'Troubleshooting', href: '/troubleshooting' },
  { label: 'Windows Server', href: '/windows-server' },
  { label: 'All topics', href: '/topics' },
  { label: 'About Jack', href: '/about' },
]

export default function AuthorBioSection() {
  return (
    <section className="border-t border-border py-24" aria-labelledby="author-heading">
      <Container>
        <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-primary">
          About the Author
        </p>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5">
              {primaryAuthor.avatarUrl ? (
                <Image
                  src={primaryAuthor.avatarUrl}
                  alt={`${primaryAuthor.name}, ${primaryAuthor.role}`}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-primary/20"
                />
              ) : (
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-3xl font-bold text-primary ring-1 ring-primary/20"
                  role="img"
                  aria-label={`${primaryAuthor.name} author initials`}
                >
                  {primaryAuthor.initials}
                </div>
              )}
              <div>
                <p className="text-xl font-bold tracking-tight text-foreground">{primaryAuthor.name}</p>
                <p className="mt-0.5 text-sm leading-snug text-muted">{primaryAuthor.role}</p>
              </div>
            </div>

            <ul className="flex flex-col gap-3" aria-label="Editorial checks">
              {editorialChecks.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                    <Icon className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                  </div>
                  <span className="text-sm leading-snug text-muted">{label}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {primaryAuthor.linkedIn && (
                <a
                  href={primaryAuthor.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
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
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  GitHub
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-2">
            <div>
              <h2
                id="author-heading"
                className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                Practical guidance without inflated credentials.
              </h2>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-muted">
                <p>
                  I am Jack, an endpoint specialist and the author of AdminSignal. I write for administrators who need to understand prerequisites, make safe rollout decisions, collect evidence, and troubleshoot Microsoft environments methodically.
                </p>
                <p>
                  Articles combine primary documentation with clearly labelled examples and operational interpretation. A guide does not claim universal testing, a production deployment, or measured results unless that evidence is explicitly stated on the page.
                </p>
                <p>
                  Coverage focuses on Microsoft Intune, Windows endpoints, Active Directory, PowerShell, Microsoft 365, identity, patching, and endpoint security. Product behaviour and licensing can change, so current vendor documentation remains the final source for purchase or change-control decisions.
                </p>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted/60">
                Explore the publication
              </p>
              <div className="flex flex-wrap gap-2">
                {internalLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    {label}
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted/50">
              Editorial corrections and material updates are recorded on the affected page. Read the{' '}
              <Link href="/editorial-policy" className="underline underline-offset-2 hover:text-muted">
                editorial policy
              </Link>{' '}
              for sourcing, update, and disclosure standards.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
