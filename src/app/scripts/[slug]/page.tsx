import { permanentRedirect } from 'next/navigation'

/**
 * Withdrawn archive. Permanent redirect so old links do not land on a 404.
 */
export default function WithdrawnScriptPage() {
  permanentRedirect('/powershell')
}
