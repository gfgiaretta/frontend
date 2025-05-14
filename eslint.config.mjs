import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      // 'no-console': ['error'],
      'no-async-promise-executor': ['error'],
      'getter-return': ['error'],
      'no-compare-neg-zero': ['error'],
      'no-cond-assign': ['error', 'except-parens'],
      'no-control-regex': ['error'],
      'no-debugger': ['error'],
      'no-dupe-args': ['error'],
      'no-dupe-keys': ['error'],
      'no-duplicate-case': ['error'],
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'no-ex-assign': ['error'],
      'no-sparse-arrays': ['error'],
      'no-template-curly-in-string': ['warn'],
      'no-unreachable': ['warn'],
      'valid-typeof': [
        'warn',
        {
          requireStringLiterals: true,
        },
      ],
      'array-callback-return': ['warn'],
      'default-case': ['warn'],
      'dot-notation': ['warn'],
      eqeqeq: [
        'warn',
        'always',
        {
          null: 'never',
        },
      ],
      'max-classes-per-file': ['off'],
      'no-alert': ['error'],
      'no-case-declarations': ['error'],
      'no-else-return': [
        'warn',
        {
          allowElseIf: false,
        },
      ],
      'no-eval': ['error'],
      'no-extra-label': ['warn'],
      'no-fallthrough': ['error'],
      'no-global-assign': ['error'],
      'no-implied-eval': ['error'],
      'no-invalid-this': ['error'],
      'no-magic-numbers': [
        'warn',
        {
          ignoreClassFieldInitialValues: true,
          ignoreDefaultValues: true,
          ignoreArrayIndexes: true,
        },
      ],
      'no-new': ['warn'],
      'no-new-wrappers': ['error'],
      'no-octal': ['error'],
      'no-param-reassign': ['warn'],
      'no-return-assign': ['error'],
      'no-return-await': ['error'],
      'no-script-url': ['error'],
      'no-self-assign': ['warn'],
      'no-self-compare': ['error'],
      'no-sequences': ['error'],
      'no-throw-literal': ['error'],
      'no-unused-labels': ['warn'],
      'no-useless-concat': ['warn'],
      'no-delete-var': ['error'],
      'no-shadow-restricted-names': ['error'],
      'no-undef': ['error'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-array-constructor': ['error'],
      'no-this-before-super': ['error'],
      'no-var': ['error'],
      'prefer-const': ['warn'],
      'prefer-spread': ['error'],
      'prefer-rest-params': ['error'],
      'prefer-template': ['warn'],
      'require-yield': ['error'],
    },
  },
]

export default eslintConfig
