module.exports = {
  extends: ['airbnb-base', 'prettier', 'eslint-config-prettier'],
  globals: {
    window: true,
    sessionStorage: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
};
