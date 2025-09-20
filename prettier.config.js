import codfish from '@codfish/eslint-config/prettier';

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  ...codfish,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/app.css',
  tailwindFunctions: ['clsx'], // optional
};
