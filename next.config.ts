import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = {
  images: {
    domains: ['your-domain.com'], // Add domains where your images are hosted
    formats: ['image/jpeg', 'image/jpg'],
  },
}

export default nextConfig;
