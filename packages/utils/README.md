# @packages/utils

A collection of TypeScript utility functions providing common operations for arrays, objects, strings, and type manipulation.

## Features

- Type-safe utility functions
- Zero external dependencies
- Modular organization by category
- Comprehensive TypeScript support

## Categories

- `arrays.ts` - Array manipulation utilities
- `objects.ts` - Object transformation and handling
- `strings.ts` - String manipulation and formatting
- `typeUtils.ts` - TypeScript type helpers
- `misc.ts` - Miscellaneous utility functions

## Installation

This package is private and meant to be used as a local dependency. It's automatically handled through the workspace's package manager.

```bash
pnpm install
```

## Usage

Import specific utilities:

```typescript
import { arrayUtils, stringUtils, objectUtils } from '@packages/utils';
```

Or import individual functions:

```typescript
import { someArrayFunction } from '@packages/utils/arrays';
import { someStringFunction } from '@packages/utils/strings';
```

## Development

- Built with TypeScript
- Includes ESLint configuration
- Zero external runtime dependencies

## Requirements

- Node.js
- pnpm
- TypeScript ^5.8.2

## License

Private - All rights reserved