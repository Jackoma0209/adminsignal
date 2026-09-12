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
