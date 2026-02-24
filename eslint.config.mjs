import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['node_modules/**/*', 'dist/**/*', 'coverage/**/*'],
  },
  ...compat.extends('airbnb', 'prettier'),
  {
    plugins: {
      prettier,
      'react-hooks': fixupPluginRules(reactHooks),
    },

    languageOptions: {
      globals: {
        ...globals.node,
        it: true,
        expect: true,
        describe: true,
        jest: true,
        document: true,
        test: true,
        window: true,
        fetch: true,
        WebSocket: true,
        alert: true,
        URLSearchParams: true,
        defaultProps: true,
        childContextTypes: true,
        contextTypes: true,
        state: true,
        Event: true,
        fail: true,
        afterEach: true,
        beforeEach: true,
        afterAll: true,
        KeyboardEvent: true,
        MouseEvent: true,
        requestAnimationFrame: true,
        ShadowRoot: true,
      },

      parser: babelParser,
    },

    rules: {
      'default-param-last': 0,
      'import/prefer-default-export': 0,
      indent: 'off',
      'comma-dangle': ['error', 'always-multiline'],

      'max-len': [
        2,
        {
          ignoreUrls: true,
          ignoreRegExpLiterals: true,
        },
      ],

      'no-console': 0,

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['useLayoutEffect'],
              message:
                'Please import from use-isomorphic-layout-effect instead.',
            },
          ],
        },
      ],

      'no-useless-concat': 0,
      'react/destructuring-assignment': 0,
      'react/function-component-definition': 0,
      'react/jsx-curly-newline': 0,
      'react/jsx-filename-extension': 0,
      'react/jsx-indent': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-props-no-spreading': 0,
      'react/jsx-wrap-multilines': 0,
      'react/prop-types': 0,

      'react/require-default-props': [
        'error',
        {
          functions: 'ignore',
        },
      ],

      'react/sort-comp': 0,
      'react/state-in-constructor': 0,
      'react/static-property-placement': 0,
      'react-hooks/exhaustive-deps': 2,
      'react-hooks/rules-of-hooks': 2,
      semi: [2, 'always'],
    },
  },
  {
    files: ['**/doc.js', '**/prop-types.js', '**/router.js'],

    rules: {
      'import/no-extraneous-dependencies': 0,
    },
  },
  {
    files: ['**/*.stories.js', '**/stories/**'],

    rules: {
      'import/no-unresolved': 0,
      'import/extensions': 0,
      'import/no-extraneous-dependencies': 0,
      'react/no-multi-comp': 0,
      'react/no-unstable-nested-components': 0,
    },
  },
  {
    files: ['**/anchor.stories.js'],

    rules: {
      'react/jsx-one-expression-per-line': 0,
    },
  },
  ...compat.extends('plugin:testing-library/react').map((config) => ({
    ...config,
    files: ['**/Accordion/__tests__/**.tsx'],
  })),
];
