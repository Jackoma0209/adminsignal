'use client'

import { useState, type FormEvent } from 'react'
import { Mail, ArrowRight } from 'lucide-react'
import Container from '@/components/layout/Container'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className="border-y border-border bg-surface/10 py-20">
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
            delivered every Tuesday. Read by 28,000+ IT engineers.
          </p>

          {submitted ? (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-8 py-6">
              <p className="font-semibold text-emerald-400">You&apos;re in. Check your inbox.</p>
              <p className="mt-1 text-sm text-muted">
                Welcome to the signal. First issue lands next Tuesday.
              </p>
            </div>
          ) : (
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
                className="flex-1 rounded-lg border border-border-strong bg-surface px-4 py-3 text-sm text-foreground placeholder-muted/50 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
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
