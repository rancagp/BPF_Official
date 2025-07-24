import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'kpf-backend.test',
      'localhost',
      '127.0.0.1',
      // tambahkan domain lain jika diperlukan
    ],
  },
};

export default nextConfig;
