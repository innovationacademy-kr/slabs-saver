module.exports = {
  root: true,
  env: {
    browser: true,
    es5: true,
    node: true,
  },
  rules: {
    'linebreak-style': 0,
    'no-unused-vars': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
};
