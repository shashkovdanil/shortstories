/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
