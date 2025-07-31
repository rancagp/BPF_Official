/** @type {import('next').NextConfig} */
const nextConfig = {
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
