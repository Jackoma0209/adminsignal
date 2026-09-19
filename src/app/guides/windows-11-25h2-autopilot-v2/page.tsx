import { permanentRedirect } from 'next/navigation'

/**
 * Withdrawn flagship URL. Send reviewers and old links to the live comparison.
 */
export default function Windows1125H2AutopilotV2Page() {
  permanentRedirect('/comparisons/autopilot-v1-vs-v2-2026')
}
