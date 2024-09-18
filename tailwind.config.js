/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#08D9D6',   // Light cyan
        secondary: '#252A34', // Dark grey/blue
        accent: '#FF2E63',    // Bright red/pink
        light: '#EAEAEA',     // Very light grey/white
      },
    },
  },
  plugins: [],
}

