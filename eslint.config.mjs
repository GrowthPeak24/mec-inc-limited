import { defineConfig, globalIgnores } from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import nextParser from 'eslint-config-next/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

// Mirrors eslint-config-next/core-web-vitals, minus its typescript-eslint block.
// The project runs TypeScript 7 (native), which typescript-eslint cannot load yet
// (https://github.com/typescript-eslint/typescript-eslint/issues/10940), and
// importing the packaged config crashes on that check. Next's own Babel parser
// reads .ts/.tsx fine, and type errors are covered by `npm run typecheck`.
// Once typescript-eslint supports TS 7, this file can go back to spreading
// `eslint-config-next/core-web-vitals`.
export default defineConfig([
  {
    name: 'next',
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parser: nextParser,
      parserOptions: {
        requireConfigFile: false,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        babelOptions: {
          presets: ['next/babel'],
          caller: { supportsTopLevelAwait: true },
        },
      },
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
      'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'] }],
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },
  },
  { name: 'next/core-web-vitals', rules: nextPlugin.configs['core-web-vitals'].rules },
  {
    // Dwell-time honeypot: `useRef(Date.now())` records the mount time once and
    // is only read on submit, so the render-purity rule is a false positive here.
    files: ['src/components/contact/ContactForm.tsx', 'src/components/feedback/FeedbackForm.tsx'],
    rules: { 'react-hooks/purity': 'off' },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'scripts/.raw/**']),
]);
