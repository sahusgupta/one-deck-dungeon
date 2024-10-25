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
    'bg-yellow-500', 'bg-red-500', 'bg-pink-500', 'bg-blue-500', 'bg-gray-500', 'bg-green-500','border-yellow-500', 'border-red-500', 'border-pink-500', 
  'border-blue-500', 'border-gray-500', 'border-green-500'
  ],
  plugins: [],
}