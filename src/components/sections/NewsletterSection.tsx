'use client'

import { useState, type FormEvent } from 'react'
import { Mail, ArrowRight, Shield } from 'lucide-react'
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
    <section id="newsletter" className="relative overflow-hidden border-y border-border py-24 sm:py-32">
      {/* Background gradient accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(59,130,246,0.12), transparent)',
        }}
      />
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.018]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft ring-1 ring-primary/25">
            <Mail className="h-6 w-6 text-primary" />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            AdminSignal Weekly
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The signal, every Tuesday.
          </h2>
          <p className="mb-10 text-base leading-relaxed text-muted">
            A curated digest of the most important security alerts, new guides, and fresh
            PowerShell scripts — sent once a week. No filler, no vendor hype.
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
                className="flex-1 rounded-lg border border-border-strong bg-surface px-4 py-3.5 text-base text-foreground placeholder-muted/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-60"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
                {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          )}

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted/60">
            <Shield className="h-3.5 w-3.5" />
            <span>No spam&nbsp;•&nbsp;Unsubscribe any time&nbsp;•&nbsp;We never share your email.</span>
          </div>
        </div>
      </Container>
    </section>
  )
}
