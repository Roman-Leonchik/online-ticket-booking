import type { NextConfig } from 'next';
import { IS_PROD } from '@shared/config';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath: IS_PROD ? '/online-ticket-booking' : '',
  assetPrefix: IS_PROD ? '/online-ticket-booking/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
