module.exports = () => ({
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
    ]
  },

  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination:
          process.env.VERCEL_ENV === 'production' ? '/robots.prod.txt' : '/robots.dev.txt',
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
    ]
  },
});
