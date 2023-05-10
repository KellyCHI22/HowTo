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
      fontSize: {
        xxs: ['10px', '14px'],
      },
      boxShadow: {
        basic: '0px 4px 15px 0px rgba(0,0,0,0.04)',
        teal: '0px 5px 39px -12px rgba(45,212,191,0.65)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
