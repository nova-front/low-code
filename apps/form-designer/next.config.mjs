/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        "@/*": "app/*",
      },
    },
  },
};

export default nextConfig;
