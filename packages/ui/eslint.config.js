import importPlugin from 'eslint-plugin-import';

import internalEslintConfig from '@packages/eslint/internal';

/** @type {import("eslint").Linter.Config} */
export default [
  ...internalEslintConfig,
  {
    plugins: {
      import: importPlugin,
    },
  },
];
