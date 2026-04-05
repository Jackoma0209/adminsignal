import Link from 'next/link'
import { Zap } from 'lucide-react'
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
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary transition-opacity group-hover:opacity-85">
                <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-[17px] font-bold tracking-tight text-foreground">
                Admin<span className="text-primary">Signal</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The signal source for sysadmins, endpoint specialists, and Microsoft admins.
            </p>
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
          <p className="text-sm text-muted/60">
            © {new Date().getFullYear()} AdminSignal. All rights reserved.
          </p>
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
