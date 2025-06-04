/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "@/*": "app/*",
    },
  },
};

export default nextConfig;
