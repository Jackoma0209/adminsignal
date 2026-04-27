'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
      aria-live="polite"
      className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] font-medium text-white/45 transition-all hover:bg-white/5 hover:text-white/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      {copied ? (
        <Check className="h-3 w-3 shrink-0 text-emerald-400" aria-hidden="true" />
      ) : (
        <Copy className="h-3 w-3 shrink-0" aria-hidden="true" />
      )}
      <span className="select-none">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}
