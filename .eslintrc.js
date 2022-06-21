module.exports = {
  extends: ['@qsalatiel/eslint-config-typescript'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@pages', './src/pages'],
          ['@components', './src/components'],
          ['@config', './src/config'],
          ['@assets', './src/assets'],
          ['@services', './src/services'],
          ['@requests', './src/requests'],
          ['@enums', './src/enums'],
          ['@utils', './src/utils'],
        ],
        extensions: ['.ts', '.tsx'],
      },
    },
  },
}
