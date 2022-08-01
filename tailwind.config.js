module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'current': 'currentColor',
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

        'bp-max-1080': {
          'max': '1080px',
        },
        'bp-max-768': {
          'max': '768px',
        },
        'bp-max-600': {
          'max': '600px'
        },
        'bp-max-480': {
          'max': '480px'
        }
      },
    },
  },
  plugins: [],
}
