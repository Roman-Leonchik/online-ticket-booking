import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3022',
        pathname: '/static/images/**',
      },
    ],
  },
};

export default nextConfig;
