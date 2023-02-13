module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // staging off
    // https://eslint.org/docs/rules/no-console
    'no-console': 'off',
    'vue/require-prop-types': 'off',
    'import/named': 'off',
  },
};
