module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      impliedStrict: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  extends: [
    'airbnb-base',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-plusplus': 'off',
  },
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/build/**/*.js'],
      rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
        'global-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['service-worker.ts', '**/service-worker/**/*.ts'],
      rules: {
        'no-restricted-globals': 'off',
      },
    },
  ],
};
