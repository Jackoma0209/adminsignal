import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/tutorials/group-policy-troubleshooting-rsop-gpresult',
        destination: '/troubleshooting/group-policy-not-applying-diagnosis',
        permanent: true,
      },
      {
        source: '/comparisons/windows-defender-vs-crowdstrike-falcon',
        destination: '/tutorials/microsoft-defender-for-endpoint-intune-rollout',
        permanent: true,
      },
      {
        source: '/tutorials/windows-11-25h2-autopilot-v2',
        destination: '/comparisons/autopilot-v1-vs-v2-2026',
        permanent: true,
      },
      {
        source: '/tutorials/autopilot-v2-enrollment-esp-troubleshooting',
        destination: '/troubleshooting/autopilot-enrollment-status-page-stuck',
        permanent: true,
      },
      {
        source: '/guides/windows-11-25h2-autopilot-v2',
        destination: '/comparisons/autopilot-v1-vs-v2-2026',
        permanent: true,
      },
      {
        source: '/news/april-2026-patch-tuesday-breakdown',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/troubleshooting/april-2026-bitlocker-recovery-loop-kb5082063',
        destination: '/troubleshooting/bitlocker-recovery-key-not-backed-up-entra',
        permanent: true,
      },
      {
        source: '/reviews',
        destination: '/comparisons',
        permanent: true,
      },
      {
        source: '/reviews/:slug*',
        destination: '/comparisons',
        permanent: true,
      },
      {
        source: '/best-tools',
        destination: '/topics',
        permanent: true,
      },
      {
        source: '/scripts',
        destination: '/powershell',
        permanent: true,
      },
      {
        source: '/scripts/export-intune-device-report',
        destination: '/tutorials/azuread-msonline-to-microsoft-graph-powershell-migration',
        permanent: true,
      },
      {
        source: '/scripts/get-stale-devices',
        destination: '/tutorials/azuread-msonline-to-microsoft-graph-powershell-migration',
        permanent: true,
      },
      {
        source: '/scripts/:slug*',
        destination: '/powershell',
        permanent: true,
      },
      // Reviewer and old-internal guesses under /topics/{name} → canonical hub.
      {
        source: '/topics/microsoft-intune',
        destination: '/intune',
        permanent: true,
      },
      {
        source: '/topics/intune',
        destination: '/intune',
        permanent: true,
      },
      {
        source: '/topics/microsoft-entra-id',
        destination: '/microsoft-entra-id',
        permanent: true,
      },
      {
        source: '/topics/entra-id',
        destination: '/microsoft-entra-id',
        permanent: true,
      },
      {
        source: '/topics/entra',
        destination: '/microsoft-entra-id',
        permanent: true,
      },
      {
        source: '/topics/powershell',
        destination: '/powershell',
        permanent: true,
      },
      {
        source: '/topics/configuration-manager',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/topics/sccm-mecm',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/topics/sccm',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/topics/mecm',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/topics/configmgr',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/topics/group-policy',
        destination: '/group-policy',
        permanent: true,
      },
      {
        source: '/topics/windows-server',
        destination: '/windows-server',
        permanent: true,
      },
      {
        source: '/topics/endpoint-security',
        destination: '/endpoint-security',
        permanent: true,
      },
      {
        source: '/topics/patch-management',
        destination: '/patch-management',
        permanent: true,
      },
      {
        source: '/topics/microsoft-365',
        destination: '/microsoft-365',
        permanent: true,
      },
      // Short-name guesses for canonical hubs. Exact paths only; no wildcards.
      {
        source: '/entra',
        destination: '/microsoft-entra-id',
        permanent: true,
      },
      {
        source: '/entra-id',
        destination: '/microsoft-entra-id',
        permanent: true,
      },
      {
        source: '/gpo',
        destination: '/group-policy',
        permanent: true,
      },
      {
        source: '/configuration-manager',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/mecm',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/configmgr',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/sccm',
        destination: '/sccm-mecm',
        permanent: true,
      },
      {
        source: '/windows',
        destination: '/windows-server',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
