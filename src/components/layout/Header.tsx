'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, Sun, Moon, Rss } from 'lucide-react'

const nav = [
  { label: 'Signals', href: '/news' },
  { label: 'Guides', href: '/tutorials' },
  { label: 'Scripts', href: '/scripts' },
  { label: 'Topics', href: '/topics' },
  { label: 'Tools', href: '/best-tools' },
  { label: 'Weekly', href: '/#newsletter' },
]

function useTheme() {
  // Initialise from localStorage on mount — avoid setState in effect by reading directly
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return localStorage.getItem('theme') !== 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !dark)
  }, [dark])

  function toggle() {
    const next = !dark
    setDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return { dark, toggle }
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)
  const { dark, toggle: toggleTheme } = useTheme()

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="AdminSignal logo"
              width={32}
              height={32}
              className="transition-opacity group-hover:opacity-85"
              priority
            />
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

          {/* Desktop right controls */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Expandable search */}
            <div className="relative flex items-center">
              {searchOpen ? (
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onBlur={() => {
                    setSearchOpen(false)
                    setQuery('')
                  }}
                  placeholder="Search AdminSignal…"
                  className="w-52 rounded-md border border-border-strong bg-surface px-3 py-1.5 text-sm text-foreground placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="rounded-md p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* RSS feed */}
            <a
              href="/rss.xml"
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-primary"
              aria-label="RSS Feed"
            >
              <Rss className="h-4 w-4" aria-hidden="true" />
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

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
            {/* Mobile search */}
            <div className="mb-3 flex items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-muted/60" />
              <input
                type="search"
                placeholder="Search AdminSignal…"
                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted/50 outline-none"
              />
            </div>

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

            <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
              <Link
                href="/#newsletter"
                className="flex-1 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-85"
                onClick={() => setMobileOpen(false)}
              >
                Get the Newsletter
              </Link>
              <button
                onClick={toggleTheme}
                className="rounded-md border border-border p-2.5 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
