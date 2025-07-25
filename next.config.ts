import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Configure webpack for better development experience
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
    ],
  },
  // Disable TypeScript type checking during build for faster development
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
