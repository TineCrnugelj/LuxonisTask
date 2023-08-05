/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    '.src/pages/**/*.{html,js,ts,tsx}',
    '.src/components/**/*.{html,js,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

