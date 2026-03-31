import Link from 'next/link'
import type { Heading } from '@/lib/content'

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length < 2) return null

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted/60">
        Contents
      </p>
      <ol className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className={[
                'block rounded py-1 text-sm leading-snug text-muted transition-colors hover:text-primary',
                heading.level === 3 ? 'pl-4 text-xs' : '',
              ]
                .join(' ')
                .trim()}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
