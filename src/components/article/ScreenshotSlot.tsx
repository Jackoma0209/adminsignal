/**
 * Empty capture slot for operator evidence.
 *
 * Jack must paste a redacted tenant screenshot of the named blade or
 * console output. Do not generate fake Intune, Entra, or Exchange admin
 * centre images, and do not wire the mock PNGs under public/images/evidence.
 */
export default function ScreenshotSlot({
  alt,
  caption,
}: {
  alt: string
  caption?: string
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-dashed border-border bg-surface">
      <div
        className="flex min-h-48 items-center justify-center bg-background-soft px-6 py-10 text-center"
        role="img"
        aria-label={alt}
      >
        <p className="max-w-xl text-sm leading-relaxed text-muted">
          Screenshot slot. Paste a redacted capture of: {alt}
        </p>
      </div>
      <figcaption className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted">
        {caption ?? alt} Operator capture required — redact tenant name, UPN,
        device names, and object IDs before publishing.
      </figcaption>
    </figure>
  )
}
