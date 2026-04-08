'use client'

import { useState, type FormEvent } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'
import { trackEvent } from '@/lib/analytics'

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'not_configured' | 'error'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  function reset() {
    setEmail('')
    setStatus('idle')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.ok) {
        if (data.alreadySubscribed) {
          setStatus('duplicate')
          trackEvent('newsletter_signup_duplicate')
        } else {
          setEmail('')
          setStatus('success')
          trackEvent('newsletter_signup_success')
        }
      } else if (data.error === 'not_configured') {
        setStatus('not_configured')
      } else {
        setStatus('error')
        trackEvent('newsletter_signup_error', { reason: data.error ?? 'unknown' })
      }
    } catch {
      setStatus('error')
      trackEvent('newsletter_signup_error', { reason: 'network' })
    }
  }

  return (
    <section id="newsletter" className="border-y border-border bg-surface/10 py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft ring-1 ring-primary/20">
            <Mail className="h-5 w-5 text-primary" />
          </div>

          <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Get the AdminSignal Weekly
          </h2>
          <p className="mb-8 text-base leading-relaxed text-muted">
            A curated weekly digest of the most important signals, new guides, and fresh scripts —
            delivered every Tuesday. No noise, no spam.
          </p>

          {status === 'success' && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-8 py-6">
              <p className="font-semibold text-emerald-400">You&apos;re subscribed.</p>
              <p className="mt-1 text-sm text-muted">
                Check your inbox for a confirmation email before the first issue arrives.
              </p>
            </div>
          )}

          {status === 'duplicate' && (
            <div className="rounded-xl border border-border bg-surface px-8 py-6">
              <p className="font-semibold text-foreground-soft">Already subscribed.</p>
              <p className="mt-1 text-sm text-muted">That email is already on the list.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-3 text-xs text-muted/70 underline hover:text-foreground-soft"
              >
                Try a different email
              </button>
            </div>
          )}

          {status === 'not_configured' && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-8 py-6">
              <p className="font-semibold text-amber-400">Sign-up coming soon.</p>
              <p className="mt-1 text-sm text-muted">
                The newsletter isn&apos;t accepting subscribers yet — check back shortly.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-8 py-6">
              <p className="font-semibold text-red-400">Something went wrong.</p>
              <p className="mt-1 text-sm text-muted">
                Please try again in a moment. If the problem persists, email us directly.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-3 text-xs text-muted/70 underline hover:text-foreground-soft"
              >
                Try again
              </button>
            </div>
          )}

          {(status === 'idle' || status === 'loading') && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={status === 'loading'}
                className="flex-1 rounded-lg border border-border-strong bg-surface px-4 py-3 text-sm text-foreground placeholder-muted/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-60"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted/60">
            No spam. Unsubscribe any time. We never share your email.
          </p>
        </div>
      </Container>
    </section>
  )
}
