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
      'portalnews.test',
      'localhost',
      '127.0.0.1',
      'kpf-backend.test',
      'ewf-backend.test',
      'kpf-backpanel-production.up.railway.app',
      'kpf-backpanel-production.up.railway.app:443',
      'placehold.co',
      'images.unsplash.com',
      'source.unsplash.com',
      'via.placeholder.com',
      'portalnews.newsmaker.id'
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'portalnews.test',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'kpf-backpanel-production.up.railway.app',
        port: '',
        pathname: '/storage/banners/**',
      },
      {
        protocol: 'https',
        hostname: 'portalnews.newsmaker.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'ewf-backend.test',
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
