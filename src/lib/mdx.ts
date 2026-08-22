import remarkGfm from 'remark-gfm'

/**
 * Shared MDX compile options. GFM must be registered here or pipe tables
 * render as collapsed paragraph text (`| Field | Notes | |---|---|`).
 */
export const articleMdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
}

/**
 * Normalise GitHub-flavoured markdown tables so MDX/micromark always sees a
 * valid GFM table instead of a paragraph of raw pipes.
 */
export function normalizeGfmTables(markdown: string): string {
  const lines = markdown.split('\n')
  const out: string[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const next = lines[i + 1]
    const isTableHeader = isPipeRow(line)
    const isSeparator = next !== undefined && isSeparatorRow(next)

    if (isTableHeader && isSeparator) {
      if (out.length > 0 && out[out.length - 1].trim() !== '') {
        out.push('')
      }

      const rows: string[] = []
      while (i < lines.length && isPipeRow(lines[i])) {
        rows.push(normaliseTableRow(lines[i]))
        i += 1
      }
      out.push(...rows)
      continue
    }

    out.push(line)
    i += 1
  }

  return out.join('\n')
}

function isPipeRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('|') && trimmed.includes('|', 1)
}

function isSeparatorRow(line: string): boolean {
  const trimmed = line.trim()
  if (!trimmed.startsWith('|')) return false
  return /^\|[\s:|-]+\|$/.test(trimmed) && trimmed.includes('-')
}

function normaliseTableRow(line: string): string {
  const trimmed = line.trim()
  const cells = trimmed
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => {
      const value = cell.trim()
      if (value === '') return '—'
      if (/^:?-{3,}:?$/.test(value)) return '---'
      return value
    })
  return `| ${cells.join(' | ')} |`
}
