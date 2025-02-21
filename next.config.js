/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['i.postimg.cc', 'postimg.cc']
  },
  basePath: '/garena',
  assetPrefix: '/garena/',
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'out'
}

module.exports = nextConfig 