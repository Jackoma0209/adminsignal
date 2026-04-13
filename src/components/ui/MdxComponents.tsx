import type { MDXComponents } from 'mdx/types'
import CopyButton from '@/components/ui/CopyButton'

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

function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const text = extractText(children)
  return (
    <div className="group relative my-5">
      {/* Button is opacity-0 at rest, fades in on hover/focus-within for clean look
          It's always focusable for keyboard users regardless of opacity */}
      <div className="absolute right-2.5 top-2.5 z-10 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
        <CopyButton text={text} />
      </div>
      <pre {...props}>{children}</pre>
    </div>
  )
}

function Table({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-border">
      <table {...props}>{children}</table>
    </div>
  )
}

export const mdxComponents: MDXComponents = {
  pre: Pre,
  table: Table,
}
