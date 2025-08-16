/** @type {import('next').NextConfig} */
const nextConfig = {
  // Clean production build configuration
  // Removed dangerous ignoreBuildErrors and ignoreDuringBuilds
  
  // Keep webpack optimizations for Vercel
  experimental: {
    webpackMemoryOptimizations: true,
  },
  
  // Optimize images for production
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Temporarily disable some ESLint rules for deployment
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
