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
