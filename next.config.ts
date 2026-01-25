import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: '/online-ticket-booking',
  assetPrefix: '/online-ticket-booking/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
