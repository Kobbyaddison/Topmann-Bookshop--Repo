/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D47A1',
        secondary: '#1976D2',
        accent: '#F59E0B'
      }
    },
  },
  plugins: [],
}