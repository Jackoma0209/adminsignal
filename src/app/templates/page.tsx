import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, Download, FileSpreadsheet } from 'lucide-react'
import Container from '@/components/layout/Container'
import ArticleNewsletter from '@/components/article/ArticleNewsletter'
import { buildCategoryMetadata } from '@/lib/metadata'
import { withNoindex } from '@/lib/noindex'
import { primaryAuthor } from '@/data/authors'

const pageTitle = 'Operator templates'
const pageDescription =
  'Free starter CSVs for Autopilot hardware-hash import and Graph PowerShell migration registers. Replace placeholder values, redact identifying data, and test in a lab. These are not production automation.'

export const metadata: Metadata = withNoindex(
  buildCategoryMetadata({
    title: pageTitle,
    description: pageDescription,
    path: '/templates',
  }),
)

const templates = [
  {
    title: 'Autopilot hardware-hash CSV',
    description:
      'Microsoft Autopilot bulk-import headers, with one clearly labelled placeholder row. Replace the serial and hardware hash from Get-WindowsAutopilotInfo. Leave Windows Product ID and Assigned User blank unless you have a real value.',
    href: '/templates/autopilot-hardware-hash.csv',
    filename: 'autopilot-hardware-hash.csv',
    relatedHref: '/troubleshooting/autopilot-device-not-importing-hardware-hash',
    relatedLabel: 'Diagnose Autopilot hardware-hash import failures',
    columns: [
      'Device Serial Number',
      'Windows Product ID',
      'Hardware Hash',
      'Group Tag',
      'Assigned User',
    ],
    usage: [
      'Keep the header row exactly as shipped. A renamed column is a common reason the Intune import rejects the file.',
      'Collect the hash from the device that will actually go through Autopilot. The starter row uses REPLACE-WITH-SERIAL and REPLACE-WITH-HASH-FROM-Get-WindowsAutopilotInfo, not a captured hash.',
      'Leave Windows Product ID and Assigned User empty unless you have a real product ID or user principal name. The starter file already leaves those two cells blank.',
      'Group Tag is optional. The example uses PILOT so a dynamic group rule that matches that tag can be tested. Change it only if your tenant rule expects a different value.',
      'Open the CSV as data, not as a spreadsheet. Spreadsheet tools wrap the hardware hash, change delimiters, and add quotes that the portal then rejects.',
      'Validate with Import-Csv before you upload, then import one device first. A one-row file is easier to reason about than a batch when the portal reports a rejected row.',
    ],
  },
  {
    title: 'Graph migration register CSV',
    description:
      'Starter inventory columns for an AzureAD/MSOnline to Microsoft Graph PowerShell rewrite. One example row for UserReport.ps1 in inventory status. Replace owner, auth, data, write-action, and criticality before you treat it as a live register.',
    href: '/templates/graph-migration-register.csv',
    filename: 'graph-migration-register.csv',
    relatedHref: '/tutorials/azuread-msonline-to-microsoft-graph-powershell-migration',
    relatedLabel: 'Read the Graph PowerShell migration guide',
    columns: [
      'ScriptName',
      'Owner',
      'CurrentModule',
      'AuthType',
      'DataTouched',
      'WriteActions',
      'Criticality',
      'Status',
      'Notes',
    ],
    usage: [
      'The example row is UserReport.ps1 from the migration article, with CurrentModule set to MSOnline and Status set to inventory. It is a blank to complete, not evidence from a live tenant.',
      'Replace Owner, AuthType, DataTouched, WriteActions, Criticality, and Notes before you treat the file as a working register. Do not invent tenant IDs, object IDs, or production user names to fill the gaps.',
      'Status is the migration stage, not a health score. The article uses inventory, mapped, built, tested, deployed, and retired. Leave a script at inventory until the Graph cmdlets and permissions are actually mapped.',
      'Record write actions honestly. Session revocation, licence assignment, and group membership changes belong in WriteActions so the rewrite is not treated as a read-only report.',
      'Do not treat this as a search-and-replace job. Classify the script, map the Graph command and least-privilege permission, rewrite the query, compare output in a lab, then change the production job.',
    ],
  },
]

export default function TemplatesPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Free downloads
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Operator templates
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Starter files for jobs that fail in the portal when the CSV is wrong. They are not
            production automation, a paid store, or a Microsoft download. Replace every REPLACE-
            value, redact serial numbers and hashes before you share a filled copy, and test the
            import or script in a lab tenant first.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted/80">
            Prepared by {primaryAuthor.name} for AdminSignal. Independent operator notes.
          </p>
        </div>

        <div className="mt-10 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
            <div className="text-sm leading-relaxed text-muted">
              <p className="font-semibold text-foreground">
                Treat these as blanks, not samples of a live estate
              </p>
              <p className="mt-1">
                The Autopilot row uses a placeholder serial and a placeholder hash token, not a
                captured hardware hash. The Graph row keeps the article example script name and
                inventory status only. Do not invent tenant IDs, object IDs, or real hashes to
                complete the file.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            How to use these starter files
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Both files are headers plus one labelled placeholder row. Use them when the Intune
            Autopilot import rejects a CSV, or when an AzureAD/MSOnline rewrite still has no
            inventory of what each script touches. The linked articles hold the diagnostic steps;
            these downloads only give you a file that already has the right columns.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            <li>
              Download the CSV, then replace every REPLACE- value from the real device or script.
              Do not paste production serials, hashes, or UPNs back onto this page or into a ticket
              without redaction.
            </li>
            <li>
              Keep the files as CSV. If a spreadsheet has already wrapped a hardware hash or changed
              the delimiter, collect a fresh Autopilot export or re-copy the Graph register rather
              than repairing the damaged cells.
            </li>
            <li>
              Test in a lab tenant or against one approved object first. An Autopilot import of a
              one-row file, or a Graph rewrite that only reads, is the safe retry before a batch or
              a write action.
            </li>
            <li>
              These templates do not register devices, grant Graph consent, or replace Microsoft
              Learn. If the portal still rejects the Autopilot row, use the hardware-hash article.
              If a legacy module command has no mapped Graph cmdlet yet, stay on inventory in the
              register and use the migration guide.
            </li>
          </ul>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] lg:items-start">
          <div className="grid gap-5">
            {templates.map((item) => (
              <article
                key={item.href}
                className="rounded-xl border border-border bg-surface p-6 shadow-card"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft ring-1 ring-primary/20">
                    <FileSpreadsheet className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted/70">
                      Columns
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.columns.join(', ')}</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
                      {item.usage.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={item.href}
                        download={item.filename}
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        Download CSV
                      </a>
                      <Link
                        href={item.relatedHref}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {item.relatedLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <ArticleNewsletter
            heading="Tuesday digest"
            description="When Autopilot imports or Graph cmdlets break again, the notes go here. Signup is live only when the newsletter provider is configured."
            inputId="templates-newsletter-email"
            className="mt-0 lg:sticky lg:top-24"
          />
        </div>
      </Container>
    </div>
  )
}
