module.exports = {
  style: {
    postcss: {
      loaderOptions: (postcssLoaderOptions) => {
        postcssLoaderOptions.postcssOptions.plugins = [
          require('postcss-import'),
          require('tailwindcss/nesting'),
          require('tailwindcss')('./tailwind.config.js'),
          require('autoprefixer'),
        ];

        return postcssLoaderOptions;
      },
    },
  },
}