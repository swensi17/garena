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
  basePath: process.env.NODE_ENV === 'production' ? '/garena' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/garena/' : '',
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'out'
}

module.exports = nextConfig 