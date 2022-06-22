module.exports = {
  extends: ['@qsalatiel/eslint-config-typescript'],
  rules: {
    'import/no-extraneous-dependencies': 0,
  },
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
