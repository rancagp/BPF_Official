import type { NextConfig } from "next";
import nextI18nConfig from './next-i18next.config';

const nextConfig: NextConfig = {
  // Konfigurasi i18n
  i18n: {
    ...nextI18nConfig.i18n,
    // Pastikan localeDetection false
    localeDetection: false,
  },
  // Nonaktifkan trailing slash untuk konsistensi
  trailingSlash: false,
  // Pastikan URL selalu memiliki locale untuk non-default
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: 'en',
          },
        ],
        destination: '/en',
        permanent: false,
        locale: false,
      },
    ];
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://kpf-backend.test',
  },
  
  // Strict Mode
  reactStrictMode: true,
  
  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Enable source maps in development
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
  
  // Image optimization
  images: {
    domains: [
      'kpf-backend.test',
      'localhost',
      '127.0.0.1',
      'placehold.co',
      'images.unsplash.com',
      'source.unsplash.com',
      'via.placeholder.com'
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
  
  // TypeScript configuration
  typescript: {
    // Enable type checking in production
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    // Enable ESLint in production
    ignoreDuringBuilds: false,
  },
  
  // Enable SWC minification
  swcMinify: true,
};

export default nextConfig;
