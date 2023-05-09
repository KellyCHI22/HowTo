/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
        slabo: ['"Slabo 13px"', 'serif'],
      },
      boxShadow: {
        basic: '0px 4px 15px 0px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
