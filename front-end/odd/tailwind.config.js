/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      },
    },
  },
  safelist: [
    'bg-yellow-500', 'bg-red-500', 'bg-pink-500', 'bg-blue-500', 'bg-gray-500', 'bg-green-500'
  ],
  plugins: [],
}