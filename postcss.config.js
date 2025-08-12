// Note: If your postcss.config.js needs to support other non-Next.js tools in
// the same project, you must use the interoperable object-based format instead:
module.exports = {
  plugins: [
    '@tailwindcss/postcss',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
};
