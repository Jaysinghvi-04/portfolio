/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kali-black': '#0c0c0c',
        'kali-red': '#ff5555',
        'kali-green': '#50fa7b',
        'kali-yellow': '#f1fa8c',
        'kali-blue': '#bd93f9',
        'kali-purple': '#ff79c6',
        'kali-cyan': '#8be9fd',
        'kali-white': '#f8f8f2',
        'kali-gray': '#44475a',
        'amber': '#FFB000',
      },
    },
  },
  plugins: [],
}
