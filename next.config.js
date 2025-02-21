/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  },
  basePath: '/garena',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/garena/' : '',
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = nextConfig 