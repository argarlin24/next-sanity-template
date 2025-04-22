# @packages/ui

A shared UI component library built with TypeScript and Tailwind CSS, providing a consistent design system for the
Sanity template applications.

## Features

- Modern, reusable UI components
- Built with TypeScript for type safety
- Tailwind CSS for styling
- Customizable theming
- Includes common components like buttons, badges, and sections
- Icon system integration

## Installation

This package is private and meant to be used as a local dependency. It's automatically handled through the workspace's
package manager.

```bash
pnpm install
```

## Usage

Import components from the package:

```typescript
import { Button, Badge, Section } from '@packages/ui';
```

For styling, import the theme:

```typescript
import '@packages/ui/theme/global.css';
```

## Available Components

- `Button` - Customizable button component
- `Badge` - Display status or labels
- `Section` - Container component for layout organization
- `Icons` - Icon system utilities

## Theme Customization

The package includes a customizable theme system based on Tailwind CSS. Theme configurations can be found in the `theme`
directory.

## Development

- Built with TypeScript
- Uses Tailwind CSS v4.0.0
- Includes ESLint and Prettier configurations

## Requirements

- Node.js
- pnpm
- Tailwind CSS ^4.0.0

## License

Private - All rights reserved
