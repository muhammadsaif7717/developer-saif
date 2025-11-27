import type { NextConfig } from 'next';
import { join } from 'path';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  webpack(config) {
    config.resolve.alias['@'] = join(__dirname, 'src');
    return config;
  },
  //   eslint: {
  //     ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
