/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        primary: '#1A2E45',
        secondary: '#FF8C42',
        accent: '#5A9BD6',
        text: '#EAEAEA',
      },
    },
  },
  plugins: [],
}