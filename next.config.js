module.exports = () => ({
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
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
