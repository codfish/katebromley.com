import '@testing-library/jest-dom';

// Polyfill scrollTo for jsdom
Object.defineProperty(window, 'scrollTo', {
  value: (x: number, y: number) => {
    // noop for tests
  },
  writable: true,
});


