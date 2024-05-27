module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],

  rules: {
    // React Refresh rule
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // ✅ Added rules to prevent unused imports from causing build errors
    'no-unused-vars': 'warn', // downgrade error to warning
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // Optional: If you're using eslint-plugin-unused-imports
    // 'unused-imports/no-unused-imports': 'warn',
    // 'unused-imports/no-unused-vars': [
    //   'warn',
    //   { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    // ],
  },
};
