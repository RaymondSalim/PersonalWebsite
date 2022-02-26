module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx,css}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'theme-loader': {
          light: "#FAFAFA",
          dark: "#201f28"
        },
        'theme-navbar': {
          light: "#FAFAFA",
          dark: "#222831"
        },
        'theme-primary': {
          light: "#00ADB5",
          lighter: "#00DFE7"
        },
        'theme-secondary': {
          light: "#EEEEEE",
          dark: '#2D323A'
        }
      },
      screens: {
        '2xl': '1536px',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['dark'],
    },
  },
  plugins: [],
}