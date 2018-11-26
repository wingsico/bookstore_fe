module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'arrow-parens': 'off',
    'import/prefer-default-export': 'off',
    'quote-props': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
