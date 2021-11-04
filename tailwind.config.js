const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
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
      },
      fontFamily: { logo: ['Fredoka One'] },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#555',
              textDecoration: 'none',
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
