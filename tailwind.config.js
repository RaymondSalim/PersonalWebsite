module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'card': {
          light: "#FFFFFF",
          dark: "#201f28"
        },
        'body': {
          light: "#FFFFFF",
          dark: '#130f17'
        }
      },
      transitionDuration: {
        '250': '250ms'
      }
    },
  },
  variants: {
    extend: {
      opacity: ['dark'],
    },
  },
  plugins: [],
}