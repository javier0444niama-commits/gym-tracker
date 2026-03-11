/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Si tu repo se llama gym-tracker, cambia esto:
  // basePath: '/gym-tracker',
  // assetPrefix: '/gym-tracker/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
