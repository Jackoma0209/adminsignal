'use client'

import { type FormEvent, useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'inactive' | 'error'

interface NewsletterSignupFormProps {
  enabled: boolean
}

export default function NewsletterSignupForm({ enabled }: NewsletterSignupFormProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmitState>(enabled ? 'idle' : 'inactive')
  const [message, setMessage] = useState(
    enabled
      ? 'Your email is sent to the newsletter provider only when you submit this form.'
      : 'Newsletter signup is being connected. Until it is active, please use the contact page for updates or corrections.'
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!enabled) {
      setState('inactive')
      setMessage(
        'Newsletter signup is not active yet because the provider credentials are not configured.'
      )
      return
    }

    setState('submitting')
    setMessage('Submitting your email to the newsletter provider...')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.ok) {
        setState('success')
        setMessage('You are subscribed. Check your inbox if the provider sends a confirmation.')
        setEmail('')
        return
      }

      if (response.status === 503 || data.error === 'not_configured') {
        setState('inactive')
        setMessage(
          'Newsletter signup is not active yet because the provider credentials are not configured.'
        )
        return
      }

      if (response.status === 400 || data.error === 'invalid_email') {
        setState('error')
        setMessage('Enter a valid email address and try again.')
        return
      }

      setState('error')
      setMessage('The newsletter provider did not accept the request. Please try again later.')
    } catch {
      setState('error')
      setMessage('The signup request could not be sent. Please try again later.')
    }
  }

  const disabled = !enabled || state === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-lg border border-border bg-surface p-4 shadow-card"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={disabled}
          className="min-h-11 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled}
          className="min-h-11 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>

      <p
        className={[
          'mt-3 text-left text-xs leading-relaxed',
          state === 'success'
            ? 'text-accent'
            : state === 'error'
              ? 'text-red-400'
              : 'text-muted/70',
        ].join(' ')}
        role={state === 'idle' ? undefined : 'status'}
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  )
}
