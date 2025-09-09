/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // Only use basePath and assetPrefix in production
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/low-code',
    assetPrefix: '/low-code',
  }),
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    resolveAlias: {
      '@/*': 'app/*',
    },
  },
};

export default nextConfig;
