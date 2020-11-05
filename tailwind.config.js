const sans = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji',
];
const serif = ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'];
const macklin = ['MacklinSlab', ...serif];
const josefin = ['JosefinSans', ...sans];
const munken = ['MunkenSans', ...sans];

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px', // @screen sm => @media (min-width: 640px) { ... }
      md: '792px', // @screen md => @media (min-width: 792px) { ... }
      lg: '996px', // @screen lg => @media (min-width: 996px) { ... }
      xl: '1200px', // @screen xl => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      h1: macklin,
      h2: macklin,
      h3: macklin,
      h4: macklin,
      h5: josefin,
      h6: josefin,
      body1: macklin, // excerpts
      body2: munken,
      body3: munken,
      text1: munken,
      text2: munken,
      callout: munken,
      button: josefin,
      'nav-link': josefin,
      link: josefin,
      caption: munken,
      input: munken,
    },
    colors: {
      black: '#000',
      white: '#FFF',
      error: '#DA1E28',
      primary: {
        main: 'var(--color-primary-main)',
        light: 'var(--color-primary-light)',
        dark: 'var(--color-primary-dark)',
      },
      secondary: {
        main: 'var(--color-secondary-main)',
        light: 'var(--color-secondary-light)',
        dark: 'var(--color-secondary-dark)',
      },
      tertiary: {
        main: 'var(--color-tertiary-main)',
        light: 'var(--color-tertiary-light)',
        dark: 'var(--color-tertiary-dark)',
      },
      gray: {
        main: 'var(--color-gray)',
        light: 'var(--color-gray-light)',
        dark: 'var(--color-gray-dark)',
        border: 'var(--color-gray-border)',
        background: 'var(--color-gray-background)',
      },
    },
    container: {
      center: true,
    },
    extend: {
      fontSize: {
        h1: [
          '4.5rem', // 72px
          {
            lineHeight: '1.06',
          },
        ],
        h2: [
          '3.125rem', // 50px
          {
            lineHeight: '1.08',
          },
        ],
        h3: [
          '2.375rem', // 38px
          {
            lineHeight: '1.05',
          },
        ],
        h4: [
          '2rem', // 32px
          {
            lineHeight: '1.13',
          },
        ],
        h5: [
          '1rem', // 16px
          {
            letterSpacing: '0.4px',
            lineHeight: '1.38',
          },
        ],
        h6: [
          '0.875rem', // 14px
          {
            letterSpacing: '0.4px',
            lineHeight: '1.14',
          },
        ],
        body1: [
          '1.625rem', // 26px
          {
            lineHeight: '1.38',
          },
        ],
        body2: [
          '1rem', // 16px
          {
            lineHeight: '1.5',
          },
        ],
        body3: [
          '0.875rem', // 14px
          {
            lineHeight: '1.43',
          },
        ],
        text1: [
          '1.125rem', // 18px
          {
            letterSpacing: '-0.4px',
            lineHeight: '1.33',
          },
        ],
        text2: [
          '0.875rem', // 14px
          {
            lineHeight: '1.29',
          },
        ],
        callout: [
          '2rem', // 32px
          {
            lineHeight: '1.25',
          },
        ],
        button: [
          '0.875rem', // 14px
          {
            letterSpacing: '0.4px',
            lineHeight: '1.29',
          },
        ],
        'nav-link': [
          '0.875rem', // 14px
          {
            letterSpacing: '0.35px',
            lineHeight: '1.29',
          },
        ],
        'mobile-nav-link': [
          '1.125rem', // 18px
          {
            letterSpacing: '0.4px',
            lineHeight: '1.22',
          },
        ],
        link: [
          '0.875rem', // 14px
          {
            letterSpacing: '0.4px',
            lineHeight: '1.29',
          },
        ],
        caption: [
          '0.75rem', // 12px
          {
            lineHeight: '1.17',
          },
        ],
        input: [
          '1rem', // 16px
          {
            lineHeight: '1.5',
          },
        ],
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line
  plugins: [require('@tailwindcss/forms')],
};
