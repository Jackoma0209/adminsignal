import { AlertTriangle, ShieldCheck } from 'lucide-react'
import type { Script } from '@/data/scripts'

interface ScriptSafetyNoticeProps {
  script: Script
}

export default function ScriptSafetyNotice({ script }: ScriptSafetyNoticeProps) {
  const hasSource = Boolean(script.sourceUrl || script.sourceFileUrl)

  return (
    <div className="mb-8 space-y-4">
      <section
        aria-labelledby="script-source-status"
        className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-5"
      >
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
          <div className="text-sm leading-relaxed text-muted">
            <h2 id="script-source-status" className="text-sm font-semibold text-foreground">
              Source status
            </h2>
            {hasSource ? (
              <div className="mt-1 space-y-2">
                <p>
                  Complete source is linked below. Review the entire file, dependencies, release history, and validation evidence before considering use.
                </p>
                <div className="flex flex-wrap gap-2">
                  {script.sourceUrl && (
                    <a
                      href={script.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground-soft hover:border-border-strong"
                    >
                      View source repository
                    </a>
                  )}
                  {script.sourceFileUrl && (
                    <a
                      href={script.sourceFileUrl}
                      className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground-soft hover:border-border-strong"
                    >
                      Open source file
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="mt-1">
                This page contains design notes and example fragments only. It is not a
                downloadable, tested, supported, or production-ready script. Rebuild any
                implementation from reviewed requirements.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="authorised-admin-use"
        className="rounded-lg border border-primary/20 bg-primary-soft p-5"
      >
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <div className="space-y-3 text-sm leading-relaxed text-muted">
            <div>
              <h2 id="authorised-admin-use" className="text-sm font-semibold text-foreground">
                Authorised evaluation only
              </h2>
              <p className="mt-1">
                Use the notes only on systems you are authorised to administer. Rebuild any implementation from reviewed requirements, use report-only or dry-run behaviour first, and obtain change approval before altering devices, identities, policies, or security controls.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground-soft">Environment assumptions to validate</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {script.environmentAssumptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground-soft">Potential permission requirements</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {script.requiredPermissions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground-soft">Intended output</p>
                <p className="mt-1">{script.intendedOutput}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground-soft">Publication state</p>
                <p className="mt-1">
                  Status: implementation pattern. Editorial label: {script.version}. These notes
                  are not a tested, signed, or supported script release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
