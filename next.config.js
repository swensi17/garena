/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true,
    domains: ['postimg.cc', 'i.postimg.cc']
  },
  reactStrictMode: true,
  output: 'export',
  basePath: '/garena',
  assetPrefix: '/garena/'
}

module.exports = nextConfig 