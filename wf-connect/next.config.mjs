/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.overframe.gg',
        pathname: '/v2/256x/Lotus/Interface/Icons/StoreIcons/Weapons/**',
      },
    ],
  },
};

export default nextConfig;
