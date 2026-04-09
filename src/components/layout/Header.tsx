'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, Menu, X } from 'lucide-react'
const nav = [
  { label: 'News', href: '/news' },
  { label: 'Tutorials', href: '/tutorials' },
  { label: 'Troubleshooting', href: '/troubleshooting' },
  { label: 'Scripts', href: '/scripts' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Tools', href: '/best-tools' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary transition-opacity group-hover:opacity-85">
              <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-foreground">
              Admin<span className="text-primary">Signal</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/#newsletter"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            >
              Get the Newsletter
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2.5 text-sm text-foreground-soft transition-colors hover:bg-surface-elevated hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              <Link
                href="/#newsletter"
                className="block rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-85"
                onClick={() => setMobileOpen(false)}
              >
                Get the Newsletter
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
