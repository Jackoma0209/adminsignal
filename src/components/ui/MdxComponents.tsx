/**
 * MdxComponents — custom element overrides supplied to every MDXRemote call.
 *
 * pre  → CodeBlock (Shiki syntax highlighting + CopyButton)
 * table → overflow-scroll wrapper (unchanged)
 */

import type { MDXComponents } from 'mdx/types'
import type React from 'react'
import CodeBlock from '@/components/ui/CodeBlock'
import Checklist from '@/components/ui/Checklist'
import { slugifyHeading } from '@/lib/content'

// ── Helpers ────────────────────────────────────────────────────────────────

/** Recursively flatten React children to a plain string (for extracting code). */
function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in (node as object)) {
    const el = node as { props: { children?: React.ReactNode } }
    return extractText(el.props.children)
  }
  return ''
}

// ── Pre ────────────────────────────────────────────────────────────────────

/**
 * MDX renders fenced code blocks as:
 *   <pre><code className="language-powershell">…raw code…</code></pre>
 *
 * We unwrap the inner <code> element, pull out the language identifier and the
 * raw text, then hand them to CodeBlock which runs Shiki server-side.
 */
function Pre({ children }: React.HTMLAttributes<HTMLPreElement>) {
  // MDX always wraps code in a single <code> child; handle both scalar and array
  const child = Array.isArray(children) ? children[0] : children

  let lang: string | undefined
  let code = ''

  if (child && typeof child === 'object' && 'props' in (child as object)) {
    const el = child as React.ReactElement<{
      className?: string
      children?: React.ReactNode
    }>
    // className is "language-powershell", "language-tsx", etc.
    const match = (el.props.className ?? '').match(/language-([\w.+-]+)/)
    if (match) lang = match[1]
    code = extractText(el.props.children)
  } else {
    // Bare <pre> without a <code> wrapper — rare but handle gracefully
    code = extractText(children)
  }

  // Trim the trailing newline MDX appends so Shiki doesn't render a blank line
  code = code.replace(/\n$/, '')

  // CodeBlock is an async Server Component; React resolves it during SSR/SSG
  return <CodeBlock code={code} lang={lang} />
}

// ── Table ──────────────────────────────────────────────────────────────────

function Table({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-5 max-w-full overflow-x-auto rounded-lg border border-border">
      <table {...props}>{children}</table>
    </div>
  )
}

// ── Headings ────────────────────────────────────────────────────────────────

function createHeading(level: 1 | 2 | 3) {
  const Tag = `h${level}` as const

  function Heading({ children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const headingId = id ?? slugifyHeading(extractText(children))
    return (
      <Tag id={headingId} {...props}>
        {children}
      </Tag>
    )
  }

  return Heading
}

// ── Exports ────────────────────────────────────────────────────────────────

export const mdxComponents: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  pre: Pre,
  table: Table,
  Checklist,
}
