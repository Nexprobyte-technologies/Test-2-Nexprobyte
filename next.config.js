/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV || process.env.NOW_BUILDER);

const nextConfig = {
  reactStrictMode: false,
  output: isVercel ? undefined : (isProd ? 'export' : undefined),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  devIndicators: false,
  webpack: (config) => {
    // Disable persistent disk caching on Windows
    // This prevents stale pack manifests and 'Cannot find module' prerender errors
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
