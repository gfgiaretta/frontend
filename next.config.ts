import { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'thispersondoesnotexist.com' },
      { hostname: 'example.com' },
      { hostname: 'i.pinimg.com' },
      { hostname: 'projeto-creative-flow.s3.us-east-2.amazonaws.com' },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/onboarding',
        permanent: true,
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
