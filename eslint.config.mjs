import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import boundariesPlugin from 'eslint-plugin-boundaries';
import prettierPlugin from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        RequestInit: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': fixupPluginRules(hooksPlugin),
      '@next/next': nextPlugin,
      boundaries: boundariesPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'prettier/prettier': [
        'error',
        {
          plugins: ['prettier-plugin-tailwindcss'],
        },
      ],
      // FSD settings
      'boundaries/element-types': [
        'error',
        {
          rules: [
            {
              from: 'shared',
              disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
              message: 'Shared layer can only import from itself',
            },
            {
              from: 'entities',
              disallow: ['app', 'pages', 'widgets', 'features'],
              message: 'Entities can only import from shared or itself',
            },
            {
              from: 'features',
              disallow: ['app', 'pages', 'widgets'],
              message: 'Features can only import from entities, shared or itself',
            },
            {
              from: 'widgets',
              disallow: ['app', 'pages'],
              message: 'Widgets can only import from features, entities, shared or itself',
            },
            {
              from: 'pages',
              disallow: ['app'],
              message: 'Pages can only import from widgets, features, entities, shared or itself',
            },
          ],
        },
      ],
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];

export default eslintConfig;
