module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'airbnb-base',
    // 'plugin:prettier/recommended',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    // 'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    // 'prettier/prettier': 'error',
    // 'import/extensions': 'off',
    // 'import/no-unresolved': 'off',
    // 'arrow-body-style': 'off',
    // // 'prefer-arrow-callback': 'off',
    // 'no-console': 'off',
    // 'import/order': [
    //   'off',
    //   {
    //     'newlines-between': 'never',
    //     groups: [
    //       ['builtin', 'external'],
    //       ['internal', 'parent', 'sibling', 'index'],
    //     ],
    //   },
    // ],
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-var-requires': 'off',
    // 'import/no-mutable-exports': 'off',
    // 'import/no-dynamic-require': 'off',
    // 'global-require': 'off',
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': 'off',
    // 'lines-between-class-members': 'off',
    // 'class-methods-use-this': 'off',
    // 'no-use-before-define': 'off',
    // 'no-return-await': 'off',
    // 'import/first': 'off',
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // 'dot-notation': 'off',
    // 'no-unneeded-ternary': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: './tsconfig.json',
      },
    },
  },
}
