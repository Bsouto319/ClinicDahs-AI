/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#39ff14',
          500: '#39ff14',
        },
        secondary: {
          DEFAULT: '#9333ea',
          500: '#9333ea',
        },
      },
    },
  },
  plugins: [],
}
