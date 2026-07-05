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
                  Complete source is available from the linked repository or source file location.
                  Review the code before running it in any environment.
                </p>
                <div className="flex flex-wrap gap-2">
                  {script.sourceUrl && (
                    <a
                      href={script.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground-soft hover:border-border-strong"
                    >
                      View source
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
                Complete .ps1 source is not published yet. This page is an implementation guide
                with example patterns, safety notes, and validation steps.
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
                Authorised admin use only
              </h2>
              <p className="mt-1">
                These scripts are intended for authorised IT administration, auditing,
                troubleshooting, compliance, hardening, and defensive operations only. Test in a
                lab or pilot group first. Review the code before running it in production. You are
                responsible for validating suitability for your environment.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground-soft">Supported environments</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {script.supportedEnvironments.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground-soft">Required permissions</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {script.requiredPermissions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground-soft">Expected output</p>
                <p className="mt-1">{script.expectedOutput}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground-soft">Last tested and version</p>
                <p className="mt-1">
                  Last tested: {script.lastTested}. Version: {script.version}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
