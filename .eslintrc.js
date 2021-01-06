module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/standard',
  ],

  plugins: ['@typescript-eslint'],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2020
  },

  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'error',
    'no-eval': 'error',
    '@typescript-eslint/camelcase': 'off',
  },

  globals: {
    uni: true
  }
}
