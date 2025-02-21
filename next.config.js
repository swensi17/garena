/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'postimg.cc',
        pathname: '/**',
      }
    ]
  },
  output: 'export',
  basePath: '',
  assetPrefix: '',
  trailingSlash: true
}

module.exports = nextConfig 