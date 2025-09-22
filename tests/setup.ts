import '@testing-library/jest-dom';

// Polyfill scrollTo for jsdom
Object.defineProperty(window, 'scrollTo', {
  value: () => {
    // noop for tests
  },
  writable: true,
});
