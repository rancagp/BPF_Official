/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://kpf-backend.test',
  },
  images: {
    domains: [
      'placehold.co',
      'images.unsplash.com',
      'source.unsplash.com',
      'via.placeholder.com',
      'kpf-backend.test',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'kpf-backend.test',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
