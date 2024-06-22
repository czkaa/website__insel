/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    // classes that are generated dynamically, e.g. `rounded-${size}` and must
    // be kept
    safeList: [],
    content: [
      './index.html',
      './src/**/*.{vue,js,ts}',
      // etc.
    ],
  },
  theme: {
    fontFamily: {
      ciao: ['Ciao', 'sans-serif'],
      sans: 'sans-serif',
      serif: 'serif',
    },
    fontSize: {
      'root-desktop': '2vw',
      'root-mobile': 'max(1.1vw, 14px)',

      lg: [
        '5rem', // 32
        {
          lineHeight: '1.1', // 38
          letterSpacing: '0.025em',
        },
      ],
      md: [
        '2.5rem', // 20
        {
          lineHeight: '0.9', // 26
          letterSpacing: '-0.025em',
        },
      ],
      sm: [
        '2rem', // 20
        {
          lineHeight: '0.9', // 26
          letterSpacing: '-0.025em',
        },
      ],
    },

    // analog to image.config.js
    screens: {
      lg: { min: '1600px' },
      md: { max: '800px' },
      sm: { max: '600px' },
      xs: { max: '400px' },
      betterhover: { raw: '(hover: hover)' },
      'betterhover-group': { raw: '(hover: hover) {.group :hover}' },
    },
    extend: {
      spacing: {},
      borderRadius: {},
      transitionDuration: {
        custom: '500ms',
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        lightgrey: 'var(--lightgrey)',
        darkgrey: 'var(--darkgrey)',
      },
      boxShadow: {
        custom: 'inset 0px 0px 25px 5px var(--darkgrey)',
      },
    },
  },
};
