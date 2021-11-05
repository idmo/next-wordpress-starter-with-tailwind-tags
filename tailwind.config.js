const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto'],
      serif: ['Roboto Slab'],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'current',
        cyan: colors.cyan,
        logo: colors.amber,
        paper: colors.warmGray,
        primary: colors.emerald,
        secondary: colors.blueGray,
      },
      fontFamily: { logo: ['Fredoka One'] },
      typography: {
        DEFAULT: {
          css: {
            color: {},
            a: {
              color: defaultTheme.paper,
              textDecoration: 'none',
            },
            h1: {
              color: defaultTheme.paper,
            },
            h2: {
              color: defaultTheme.paper,
            },
            h3: {
              color: defaultTheme.paper,
            },
            h4: {
              color: defaultTheme.paper,
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
