import type { Author } from '@/data/authors'

interface AuthorBoxProps {
  author: Author
}

export default function AuthorBox({ author }: AuthorBoxProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-6">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary"
        aria-hidden="true"
      >
        {author.initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{author.name}</p>
        <p className="mb-2 text-xs text-muted">{author.role}</p>
        <p className="text-sm leading-relaxed text-muted">{author.bio}</p>
      </div>
    </div>
  )
}
