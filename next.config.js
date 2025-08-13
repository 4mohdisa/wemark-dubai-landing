/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Removed images: { unoptimized: true } for proper Vercel deployment
  // https://github.com/vercel/next.js/issues/79588#issuecomment-2972850452
  experimental: {
    preloadEntriesOnStart: false,
    webpackMemoryOptimizations: true,
  },
}

module.exports = nextConfig
