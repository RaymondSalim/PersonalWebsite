module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx,css}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        logo: '42px'
      },
      width: {
        logo: '42px'
      },
      colors: {
        'theme-loader': {
          light: "#FAFAFA",
          dark: "#201f28"
        },
        'theme-navbar': {
          light: "#FAFAFA",
          dark: "#222831"
        },
        'theme-primary': "#00ADB5",
        'theme-primary-hover': "#00c8d0",
        'theme-secondary': {
          light: "#EEEEEE",
          dark: '#2D323A'
        }
      },
      outline: {
        theme: '2px dashed '
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