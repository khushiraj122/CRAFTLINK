import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: '*.cloudinary.com' },
    ],
  },
  serverExternalPackages: ['mongoose'],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
