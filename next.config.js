/** @type {import('next').NextConfig} */
export default () => ({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: process.env.VERCEL_ENV === 'production' ? '/robots.prod.txt' : '/robots.dev.txt',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/biography',
        destination: '/about',
        permanent: true,
      },
    ];
  },
});
