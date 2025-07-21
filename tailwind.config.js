/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#EBEBEB",
          200:"#E2E4E8",
          600: "#E6E8EA",
          
        },
        purple: {
          300: "#DDE4FE",
          600: "#4444DB"
        }
      },
      height: {
        'screen-75': '90vh',
        'screen-50': '50vh'
      },
      fontFamily: {
        'main': ['"Open Sans"']
      }
      
    },
  },
  plugins: [],
}

