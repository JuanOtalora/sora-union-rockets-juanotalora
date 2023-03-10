const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  plugins: [
    require('tw-elements/dist/plugin')
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jura)', ...fontFamily.sans],
      },
      colors: {
        'regal-black': '#010101',
        'r-white': '#FEF5EF',
        'dark-brown': '#44231A',
        'mid-brown': '#6B402D',
        'space-purp': '#5643fd',
        'space-pink': '#7649fe',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
}
