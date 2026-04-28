import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Rss } from 'lucide-react'
import PrivacySettingsButton from '@/components/PrivacySettingsButton'

const footerLinks = [
  {
    heading: 'Content',
    links: [
      { label: 'News', href: '/news' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Troubleshooting', href: '/troubleshooting' },
      { label: 'Scripts', href: '/scripts' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Comparisons', href: '/comparisons' },
    ],
  },
  {
    heading: 'Topics',
    links: [
      { label: 'All Topics', href: '/topics' },
      { label: 'Microsoft Intune', href: '/intune' },
      { label: 'PowerShell', href: '/powershell' },
      { label: 'Windows Server', href: '/windows-server' },
      { label: 'Endpoint Security', href: '/endpoint-security' },
      { label: 'Microsoft 365', href: '/microsoft-365' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Best Tools', href: '/best-tools' },
      { label: 'Script Library', href: '/scripts' },
      { label: 'Comparisons', href: '/comparisons' },
      { label: 'SCCM / MECM', href: '/sccm-mecm' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Editorial Policy', href: '/editorial-policy' },
      { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
      { label: 'Advertise', href: '/advertise' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="group mb-4 flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="AdminSignal logo"
                width={32}
                height={32}
                className="transition-opacity group-hover:opacity-85"
              />
              <span className="text-[17px] font-bold tracking-tight text-foreground">
                Admin<span className="text-primary">Signal</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Practitioner-focused guides, scripts, and analysis for enterprise sysadmins and endpoint engineers.
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-surface/60 p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted/80">
                Written by a senior enterprise sysadmin with 12+ years managing Windows fleets, Intune tenants, and AD environments. Everything is tested in production before it goes on the page.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              <Link href="/about" className="text-xs text-muted/60 hover:text-foreground-soft transition-colors">
                About the author →
              </Link>
              <Link href="/editorial-policy" className="text-xs text-muted/60 hover:text-foreground-soft transition-colors">
                Editorial policy →
              </Link>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted/60">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted/60">
              © {new Date().getFullYear()} AdminSignal. All rights reserved.
            </p>
            <a
              href="/rss.xml"
              className="flex items-center gap-1.5 text-xs text-muted/50 transition-colors hover:text-primary"
              aria-label="RSS Feed"
            >
              <Rss className="h-3.5 w-3.5" aria-hidden="true" />
              RSS
            </a>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted/60 hover:text-foreground-soft">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-muted/60 hover:text-foreground-soft">
              Cookies
            </Link>
            <Link href="/terms" className="text-sm text-muted/60 hover:text-foreground-soft">
              Terms
            </Link>
            <Link href="/editorial-policy" className="text-sm text-muted/60 hover:text-foreground-soft">
              Editorial Policy
            </Link>
            <Link href="/affiliate-disclosure" className="text-sm text-muted/60 hover:text-foreground-soft">
              Affiliate Disclosure
            </Link>
            <PrivacySettingsButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
