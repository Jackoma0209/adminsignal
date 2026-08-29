import Link from 'next/link'
import Image from 'next/image'
import { ShieldCheck, Rss } from 'lucide-react'
import PrivacySettingsButton from '@/components/PrivacySettingsButton'

const footerLinks = [
  {
    heading: 'Content',
    links: [
      { label: 'Home', href: '/' },
      { label: 'News', href: '/news' },
      { label: 'Troubleshooting', href: '/troubleshooting' },
      { label: 'Templates', href: '/templates' },
      { label: 'Tutorials', href: '/tutorials' },
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
    heading: 'Administration',
    links: [
      { label: 'Microsoft Entra ID', href: '/microsoft-entra-id' },
      { label: 'Patch Management', href: '/patch-management' },
      { label: 'Group Policy', href: '/group-policy' },
      { label: 'SCCM / MECM', href: '/sccm-mecm' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About the Author', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Editorial Policy', href: '/editorial-policy' },
      { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
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
              Independent technical guidance for endpoint specialists, Windows administrators, and Microsoft cloud administrators.
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-surface/60 p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-muted/80">
                Articles identify prerequisites, source material, validation evidence, and operational risk where those details matter.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {footerLinks.map((column) => (
              <div key={column.heading}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted/60">
                  {column.heading}
                </p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="text-sm text-muted/60">
              © {new Date().getFullYear()} AdminSignal. All rights reserved.
            </p>
            <a
              href="/rss.xml"
              className="flex items-center gap-1.5 text-xs text-muted/50 transition-colors hover:text-primary"
              aria-label="RSS feed"
            >
              <Rss className="h-3.5 w-3.5" aria-hidden="true" />
              RSS
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-end">
            <Link href="/privacy" className="text-sm text-muted/60 hover:text-foreground-soft">Privacy</Link>
            <Link href="/cookies" className="text-sm text-muted/60 hover:text-foreground-soft">Cookies</Link>
            <Link href="/terms" className="text-sm text-muted/60 hover:text-foreground-soft">Terms</Link>
            <Link href="/editorial-policy" className="text-sm text-muted/60 hover:text-foreground-soft">Editorial Policy</Link>
            <PrivacySettingsButton />
          </div>
        </div>
      </div>
    </footer>
  )
}
