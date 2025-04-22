# `tsconfig`

A collection of base TypeScript configurations designed for modern React and Next.js applications. These shared `tsconfig.json` files serve as the foundation for all other TypeScript configurations in your workspace.

## Features

- Modern TypeScript features with `ESNext` target
- Strict type checking enabled
- Optimized for React and Next.js development
- Path aliases support
- JSON module resolution
- Bundler-based module resolution

## Available Configurations

### Base Configuration (`base.json`)

The foundation configuration with modern TypeScript settings:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "skipLibCheck": true
    // ... and more
  }
}
```

### Next.js Configuration (`web.json`)

Extends the base configuration with Next.js-specific settings:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

### Studio Configuration (`studio.json`)

Minimal configuration for React library development:

```json
{
  "extends": "./base.json",
  "include": ["./*.d.ts"]
}
```

## Key Features Explained

### Type Safety
- `strict: true`: Enables all strict type checking options
- `strictNullChecks: true`: Ensures null and undefined are handled explicitly
- `noUnusedLocals` & `noUnusedParameters`: Prevents unused code

### Modern JavaScript
- `target: "ESNext"`: Latest ECMAScript features
- `module: "ESNext"`: Modern module system
- `moduleResolution: "bundler"`: Optimized for modern bundlers

### Development Experience
- `noErrorTruncation: true`: Shows full error messages
- `incremental: true`: Faster subsequent builds
- `isolatedModules: true`: Better compatibility with transpilers

## Usage

1. Install the package:
```bash
npm install -D @packages/typescript
```

2. Extend the appropriate configuration in your `tsconfig.json`:

```json
{
  "extends": "@packages/typescript/web.json",
  // Add your project-specific settings here
}
```

## Supported Environments

- Next.js applications
- React libraries
- TypeScript modules
- Browser and Node.js environments
