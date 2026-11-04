/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: false,
  output: isProd ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config) => {
    // Disable persistent disk caching on Windows
    // This prevents stale pack manifests and 'Cannot find module' prerender errors
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
