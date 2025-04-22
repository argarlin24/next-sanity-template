# `eslint`

A comprehensive ESLint configuration preset for modern TypeScript and React projects. This package provides a robust set of rules and best practices for maintaining high-quality, consistent code across your applications.

## Features

- TypeScript support with strict type checking
- React and JSX best practices
- Import/export organization and sorting
- Accessibility (jsx-a11y) rules
- Prettier integration
- No inline styles enforcement
- Absolute import paths
- Arrow function preferences

## Installation

```bash
npm install -D @packages/eslint
```

## Usage

Add the following to your `.eslintrc.js` or `eslint.config.js`:

```javascript
import baseConfig from '@packages/eslint';

export default baseConfig;
```

## Key Rules and Configurations

### TypeScript
- Strict type checking enabled
- Consistent type imports
- Unused variables checking with underscore prefix ignored

### React
- Function components as arrow functions
- JSX file extensions: `.tsx`, `.jsx`, `.mdx`
- No inline styles
- Proper prop types usage

### Imports
- Organized import groups (builtin → external → internal)
- Alphabetical sorting
- No relative import paths (absolute imports from `src`)
- Automatic import sorting

### Code Style
- Single quotes for strings
- Double quotes for JSX
- Arrow functions preferred
- Consistent curly braces
- Smart equality comparisons
- No nested ternaries

### Prettier Integration
- Seamless integration with Prettier
- Automatic code formatting

## Supported File Types

- `.ts`, `.tsx` (TypeScript)
- `.js`, `.jsx` (JavaScript)
- `.mjs` (ES Modules)
- `.mdx` (MDX files)
