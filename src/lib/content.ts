import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentRoot = path.join(process.cwd(), 'src', 'content')

export interface Heading {
  id: string
  text: string
  level: number
}

export interface ContentItem {
  slug: string
  content: string
  frontmatter: Record<string, unknown>
  readTime: string
  headings: Heading[]
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function stripCodeBlocks(markdown: string): string {
  // Remove fenced code blocks (``` or ~~~, with optional language tag)
  return markdown.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?\n\1[ \t]*$/gm, '')
}

function extractHeadings(markdown: string): Heading[] {
  const stripped = stripCodeBlocks(markdown)
  const regex = /^(#{1,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match: RegExpExecArray | null
  while ((match = regex.exec(stripped)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = slugifyHeading(text)
    headings.push({ level, text, id })
  }
  return headings
}

export function getContentItem(type: string, slug: string): ContentItem {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  const stats = readingTime(content)
  const headings = extractHeadings(content)
  return {
    slug,
    content,
    frontmatter: data,
    readTime: stats.text,
    headings,
  }
}

export function getContentSlugs(type: string): string[] {
  const dir = path.join(contentRoot, type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function contentExists(type: string, slug: string): boolean {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`)
  return fs.existsSync(filePath)
}

/** Used in MDX components to give headings anchor IDs matching TOC extraction. */
export { slugifyHeading }
