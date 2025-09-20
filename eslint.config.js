import codfish from '@codfish/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    extends: [codfish],
    rules: {
      // temporary
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
