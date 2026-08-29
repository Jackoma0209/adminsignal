'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, Sun, Moon, Rss } from 'lucide-react'

const nav = [
  { label: 'Troubleshooting', href: '/troubleshooting' },
  { label: 'Tutorials', href: '/tutorials' },
  { label: 'News', href: '/news' },
  { label: 'Topics', href: '/topics' },
  { label: 'About', href: '/about' },
]

function useTheme() {
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
  const mobileSearchRef = useRef<HTMLInputElement>(null)
  const { dark, toggle: toggleTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  function submitSearch(q: string) {
    const trimmed = q.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    setSearchOpen(false)
    setQuery('')
  }

  function handleDesktopKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitSearch(query)
    }
    if (e.key === 'Escape') {
      setSearchOpen(false)
      setQuery('')
    }
  }

  function handleDesktopBlur() {
    setTimeout(() => {
      setSearchOpen(false)
      setQuery('')
    }, 150)
  }

  function handleMobileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const value = mobileSearchRef.current?.value ?? ''
    submitSearch(value)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
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

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
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

          <div className="hidden items-center gap-2 lg:flex">
            <div className="relative flex items-center">
              {searchOpen ? (
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleDesktopKeyDown}
                  onBlur={handleDesktopBlur}
                  placeholder="Search AdminSignal…"
                  aria-label="Search AdminSignal"
                  className="w-52 rounded-md border border-border-strong bg-surface px-3 py-1.5 text-sm text-foreground placeholder-muted/50 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="rounded-md p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <a
              href="/rss.xml"
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-primary"
              aria-label="RSS feed"
            >
              <Rss className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-md p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            <form onSubmit={handleMobileSubmit} className="mb-3">
              <div className="flex items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-2.5">
                <Search className="h-4 w-4 shrink-0 text-muted/60" aria-hidden="true" />
                <input
                  ref={mobileSearchRef}
                  type="search"
                  placeholder="Search AdminSignal…"
                  aria-label="Search AdminSignal"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder-muted/50 outline-none"
                />
              </div>
            </form>

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

            <div className="mt-2 flex items-center justify-end gap-2 border-t border-border pt-3">
              <a
                href="/rss.xml"
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface-elevated hover:text-primary"
                aria-label="RSS feed"
              >
                <Rss className="h-4 w-4" aria-hidden="true" />
                RSS
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-md border border-border p-2.5 text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
