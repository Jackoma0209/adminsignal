/**
 * CodeBlock — async Server Component
 *
 * Renders a syntax-highlighted code block using Shiki (dark-plus theme) with
 * a language label on the left and a CopyButton on the right.
 *
 * The highlighter is a module-level singleton so it is initialised once per
 * worker/build process and shared across all code blocks on the page.
 */

import { getSingletonHighlighter, bundledLanguages, isSpecialLang } from 'shiki'
import type { BundledLanguage, SpecialLanguage } from 'shiki'
import CopyButton from '@/components/ui/CopyButton'

// ── Constants ──────────────────────────────────────────────────────────────

const THEME = 'dark-plus' as const

/**
 * Replace the dark-plus background (#1E1E1E) with true black.
 * Token colours (keywords, strings, comments) are kept exactly as-is.
 */
const COLOR_REPLACEMENTS = { '#1E1E1E': '#000000' } as const

/**
 * Langs to pre-load at startup. Every language used in site content should
 * appear here so there is no per-render cold-load delay at build time.
 */
const PRELOAD_LANGS: BundledLanguage[] = [
  'powershell',
  'bash',
  'typescript',
  'tsx',
  'javascript',
  'jsx',
  'json',
  'xml',
  'yaml',
  'toml',
  'css',
  'html',
  'markdown',
  'mdx',
  'sql',
  'ini',
  'diff',
  // Note: 'text' / 'plaintext' are SpecialLanguage — no preload needed
]

/**
 * Normalise informal language aliases to their Shiki bundled names.
 * MDX authors often write ```sh, ```ps1, ```shell, etc.
 */
const LANG_ALIASES: Record<string, string> = {
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  ps: 'powershell',
  ps1: 'powershell',
  pwsh: 'powershell',
  plain: 'text',
  txt: 'text',
  csharp: 'c#',
}

// ── Singleton highlighter ──────────────────────────────────────────────────

// Called once; subsequent calls return the cached instance.
function getHighlighter() {
  return getSingletonHighlighter({
    themes: [THEME],
    langs: PRELOAD_LANGS,
  })
}

// ── Component ──────────────────────────────────────────────────────────────

interface CodeBlockProps {
  /** Raw code string (no trailing newline required). */
  code: string
  /**
   * Language identifier exactly as written in the MDX fence (e.g. "powershell",
   * "tsx", "bash"). Unknown values fall back to plain text rendering.
   */
  lang?: string
}

export default async function CodeBlock({ code, lang }: CodeBlockProps) {
  const h = await getHighlighter()

  // Resolve aliases and normalise to lower-case
  const rawLang = (lang ?? 'plaintext').toLowerCase()
  const resolvedLang = LANG_ALIASES[rawLang] ?? rawLang

  // Classify the resolved language
  const isBundled = resolvedLang in bundledLanguages
  const isSpecial = isSpecialLang(resolvedLang)

  // effectiveLang is the value we pass to codeToHtml.
  // BundledLanguage | SpecialLanguage covers all Shiki-accepted strings.
  const effectiveLang: BundledLanguage | SpecialLanguage = isBundled
    ? (resolvedLang as BundledLanguage)
    : isSpecial
    ? (resolvedLang as SpecialLanguage)
    : ('text' as SpecialLanguage)

  let html: string
  try {
    // Lazy-load only bundled langs that weren't in PRELOAD_LANGS.
    // SpecialLanguages (text, plain, etc.) never need loading.
    if (isBundled) {
      await h.loadLanguage(effectiveLang as BundledLanguage)
    }
    html = h.codeToHtml(code, { lang: effectiveLang, theme: THEME, colorReplacements: COLOR_REPLACEMENTS })
  } catch {
    // Hard fallback — render as plain text, never crash the page
    html = h.codeToHtml(code, { lang: 'text' as SpecialLanguage, theme: THEME, colorReplacements: COLOR_REPLACEMENTS })
  }

  // Label shown in the top-left bar — hide for generic / unspecified blocks
  const displayLang = !isSpecialLang(resolvedLang) && resolvedLang !== '' ? resolvedLang : ''

  return (
    <div className="shiki-wrapper group relative my-5 overflow-hidden rounded-xl border border-white/[0.08] bg-black">
      {/* ── Top bar ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <span
          className="font-mono text-[11px] font-medium uppercase tracking-widest text-white/30"
          aria-hidden={!displayLang}
        >
          {displayLang}
        </span>

        {/* CopyButton fades in on hover; always focusable for keyboard users */}
        <div className="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
          <CopyButton text={code} />
        </div>
      </div>

      {/* ── Highlighted code ───────────────────────────────────────────── */}
      {/*
        overflow-x-auto lives here so horizontal scroll doesn't affect the
        top bar. The inner <pre> emitted by Shiki gets its prose styles
        neutralised by the .prose pre.shiki rule in globals.css.
      */}
      <div
        className="overflow-x-auto"
        // biome-ignore lint: Shiki output is safe — it comes from our own code strings
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
