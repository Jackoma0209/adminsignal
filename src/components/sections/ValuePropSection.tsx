import { BookOpen, FileSearch, ShieldCheck, Wrench } from 'lucide-react'
import Container from '@/components/layout/Container'

const pillars = [
  {
    icon: Wrench,
    title: 'Task and Failure State First',
    description:
      'Guides start with the administrative outcome or symptom, then identify prerequisites, scope, evidence, and the next safe check.',
  },
  {
    icon: BookOpen,
    title: 'Primary Sources',
    description:
      'Technical and licensing claims are checked against Microsoft Learn, security advisories, release notes, and current vendor documentation where available.',
  },
  {
    icon: FileSearch,
    title: 'Validation Evidence',
    description:
      'Portal paths, commands, expected output, event logs, registry locations, and reporting checks are included when they help prove what happened.',
  },
  {
    icon: ShieldCheck,
    title: 'Operational Risk',
    description:
      'Rollout sequencing, pilot scope, permissions, blast radius, rollback criteria, and situations where a change should not be used are called out clearly.',
  },
]

export default function ValuePropSection() {
  return (
    <section className="border-y border-border bg-surface/20 py-20">
      <Container>
        <div className="mb-12 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Editorial approach
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Useful evidence instead of generic administration summaries
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 shadow-card"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft">
                <pillar.icon className="h-4 w-4 text-primary" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
