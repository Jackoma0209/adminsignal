import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import TopicHubPageTemplate from '@/components/templates/TopicHubPageTemplate'
import { buildTopicMetadata } from '@/lib/metadata'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema'

const topicName = 'Configuration Manager and co-management'
const description = 'ConfigMgr and Intune decision guidance: compare entitlement, separate provisioning from workloads, and diagnose app delivery and Windows Update ownership.'
const items = [
  { title: 'Intune or Configuration Manager?', href: '/comparisons/intune-vs-sccm-mecm-2025', excerpt: 'Start here to compare licence entitlement and retained infrastructure, then plan workload pilots separately from OS provisioning.', meta: 'Published guidance' },
  { title: 'Prove which service owns Windows Update', href: '/troubleshooting/comanagement-windows-update-workload-ownership', excerpt: 'Use this when an Intune ring looks assigned but the ConfigMgr client still scans WSUS. Workload sliders are not the same as OSD.', meta: 'Published guidance' },
  { title: 'Content failure versus detection failure', href: '/troubleshooting/configmgr-app-content-vs-detection-before-intune', excerpt: 'Classify a ConfigMgr application failure before you wrap the same source as Intune Win32.', meta: 'Published guidance' },
  { title: 'Keep task-sequence OSD next to Autopilot', href: '/tutorials/retain-configmgr-osd-alongside-autopilot', excerpt: 'Provisioning is not a co-management workload. Decide which rebuild jobs still need boot media.', meta: 'Published guidance' },
  { title: 'Windows Update policy after Intune owns the workload', href: '/troubleshooting/wufb-deferral-not-respected', excerpt: 'Use this when update timing ignores Intune after scan source is already Windows Update.', meta: 'Published guidance' },
  { title: 'Win32 delivery after moving app management', href: '/troubleshooting/intune-win32-app-install-stuck-waiting', excerpt: 'Separate content download, installation and detection failures on the Intune side.', meta: 'Published guidance' },
]

const guideSections = [
  {
    title: 'Who this hub is for',
    paragraphs: [
      'This hub is for administrators who still run a Configuration Manager site and have co-management switched on, or are about to. The estate is usually mixed: some devices built by task sequence years ago, some arriving through Autopilot, and a ConfigMgr client on most of them. The recurring question is not “Intune or ConfigMgr?” in the abstract. It is “which service is supposed to own this setting, on this device, today?”',
      'Answer that before you open a ticket queue. Most co-management incidents are ownership incidents: two services both believe they are in charge, or neither is, and the portal on each side reports success.',
    ],
  },
  {
    title: 'The first workload-ownership questions',
    paragraphs: [
      'Microsoft documents seven co-management workloads: compliance policies, Windows Update policies, resource access policies, Endpoint Protection, device configuration, Office Click-to-Run apps and client apps. Each slider can sit at Configuration Manager, Pilot Intune or Intune, and each Pilot Intune setting points at a pilot collection. Write down the current value and the pilot collection for every workload before anyone changes a policy on either side.',
      'Then answer these questions for the device in front of you:',
    ],
    bullets: [
      'Is the device in the pilot collection for this workload, or only in an Intune group? An Intune assignment does not move a workload on its own.',
      'Windows Update policies: once Intune owns the workload, have the ConfigMgr software update client settings for those devices been changed as well? Microsoft says that step is manual, and a device still pointed at the software update point will not behave like a Windows Update for Business device.',
      'Device configuration: moving it also moves resource access and Endpoint Protection, and Settings Catalog policies follow this slider whatever they contain. Know which ConfigMgr baselines are marked to apply to co-managed clients anyway.',
      'Endpoint Protection: ConfigMgr policy stays on the device until an Intune policy replaces it. Plan the replacement policy before the slide, not after.',
      'Office Click-to-Run: after the slide, Microsoft 365 Apps deployed from ConfigMgr stop installing on co-managed clients because of a default global condition. Decide who owns Office servicing first.',
      'Client apps: after the slide, Intune available apps appear in Company Portal while ConfigMgr apps stay in Software Center. Users will see two catalogues unless you plan for it.',
      'Pilot or all? Keep each slider at Pilot Intune on a small, named collection until evidence on those devices matches what the portal claims. Switching back is supported, but Windows and Office stay at whatever later version Intune installed.',
    ],
  },
  {
    title: 'When not to wrap a broken ConfigMgr app as Win32',
    paragraphs: [
      'A common shortcut is to take a ConfigMgr application that fails on some clients, export the source, wrap it as an .intunewin file and hope Intune does better. Sometimes the failure genuinely was ConfigMgr-specific: a boundary group with no distribution point, or content that never reached the DP the client was told to use. Intune Win32 content is delivered by the Intune service rather than located through ConfigMgr boundary groups, so that particular problem does not travel.',
      'Everything else does. A detection method that lies moves with the package: if the ConfigMgr rule looks at the installer cache, the wrong registry view or a bootstrapper product code, the Intune detection rule copied from it will report the same false result. A non-silent install command, an unmapped return code or a user-context install quietly turned into a device-context assignment will fail the same way under the Intune Management Extension.',
      'So classify first. Decide whether the ConfigMgr failure is a content miss or a detection lie, fix it on one clean client, and only then export the source for an Intune pilot. If you cannot get the package to install and detect correctly under ConfigMgr, you do not yet have a package to migrate.',
    ],
  },
  {
    title: 'OSD and Autopilot are a separate decision',
    paragraphs: [
      'Operating system deployment is not one of the seven workloads. Moving every slider to Intune does not retire task sequences, boot media or PXE, and it does not give Autopilot a device it has never seen. Treat provisioning as its own architecture decision.',
      'Task-sequence OSD still earns its place for bare-metal builds of unregistered hardware, wipe-and-reload recovery, in-place refreshes that need drivers injected before Windows Setup, and rebuild rooms where a technician needs repeatable offline media. Autopilot is the better fit for user-driven provisioning of registered devices shipped straight to the user, where the Enrollment Status Page and Win32 apps carry the payload after Entra join.',
      'The two coexist. Plenty of estates use Autopilot for new devices and keep a task sequence for recovery and repurposing. The decision to make is which rebuild jobs still need boot media, who owns drivers and BitLocker recovery for each path, and what evidence would let you retire the OSD path later.',
    ],
  },
]

const startHere = [
  { condition: 'You are still deciding what to keep in ConfigMgr and what to move:', title: 'Intune vs Configuration Manager', href: '/comparisons/intune-vs-sccm-mecm-2025' },
  { condition: 'An Intune update ring shows as assigned but the client still scans WSUS:', title: 'Prove which service owns Windows Update', href: '/troubleshooting/comanagement-windows-update-workload-ownership' },
  { condition: 'A ConfigMgr app fails and someone wants to repackage it for Intune:', title: 'Content failure versus detection failure', href: '/troubleshooting/configmgr-app-content-vs-detection-before-intune' },
  { condition: 'The Win32 app is already in Intune and sits at Waiting, Pending or Failed:', title: 'Intune Win32 app install stuck at Waiting', href: '/troubleshooting/intune-win32-app-install-stuck-waiting' },
  { condition: 'Intune owns Windows Update but deferrals or deadlines are ignored:', title: 'Windows Update for Business deferral not applying', href: '/troubleshooting/wufb-deferral-not-respected' },
  { condition: 'Someone wants to switch off task sequences because Autopilot exists:', title: 'Keep ConfigMgr OSD alongside Autopilot', href: '/tutorials/retain-configmgr-osd-alongside-autopilot' },
]

const verificationNote = 'This hub summarises the six linked guides and Microsoft Learn’s co-management workload documentation. The guides are reviewed against Microsoft documentation; neither this page nor those guides include captured tenant or client logs.'

const url = 'https://www.adminsignal.com/sccm-mecm'
export const metadata: Metadata = buildTopicMetadata({ topicName, description, slug: 'sccm-mecm' })

export default function TopicPage() {
  return <>
    <StructuredData data={collectionPageSchema({ title: topicName, description, url,
      items: items.map(item => ({ name: item.title, url: `https://www.adminsignal.com${item.href}` })),
    })} />
    <StructuredData data={breadcrumbSchema([
      { name: 'Home', url: 'https://www.adminsignal.com' },
      { name: 'Topics', url: 'https://www.adminsignal.com/topics' },
      { name: topicName, url },
    ])} />
    <TopicHubPageTemplate topicName={topicName} description={description}
      guideSections={guideSections}
      startHere={startHere}
      news={[]} tutorials={items} tutorialTitle="Published guides in this hub"
      verificationNote={verificationNote}
      relatedTopics={[
        { name: 'Microsoft Intune', href: '/intune' },
        { name: 'Patch Management', href: '/patch-management' },
        { name: 'Group Policy', href: '/group-policy' },
        { name: 'Configuration Manager', href: '/sccm-mecm' },
      ].filter(item => item.href !== '/sccm-mecm')} />
  </>
}
