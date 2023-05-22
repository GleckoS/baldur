/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baldur.headlesshub.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  }
}

module.exports = nextConfig
