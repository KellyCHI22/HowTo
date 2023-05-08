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
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
