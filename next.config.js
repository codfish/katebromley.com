const { PHASE_PRODUCTION_SERVER } = require('next/constants');

module.exports = phase => ({
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: phase === PHASE_PRODUCTION_SERVER ? '/robots.prod.txt' : '/robots.dev.txt',
      },
    ];
  },
});
