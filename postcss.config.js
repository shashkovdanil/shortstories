/* eslint-disable perfectionist/sort-objects */
module.exports = {
  plugins: {
    'postcss-easy-import': {
      extensions: ['.css'],
    },
    'postcss-global-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    '@csstools/postcss-oklab-function': { preserve: true },
    autoprefixer: {},
  },
}
