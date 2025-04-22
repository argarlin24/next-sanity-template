# Sanity Studio App

This is the Sanity Studio application, a real-time content management system (CMS) that provides a powerful and
customizable interface for managing your content.

## Features

- TypeScript support with strong type definitions
- Real-time collaborative editing
- Modular and reusable schema components
- GraphQL API deployment
- Internationalization support
- Organized schema architecture

## Getting Started

### Available Components

The template includes these pre-built components:

1. **Content Components**

   - `accordion`: Collapsible content sections
   - `heading`: Flexible heading component
   - `hero`: Main banner/hero sections
   - `switchback`: Alternating content layout
   - `resourceCardDeck`: Collection of blog cards
   - `testimonials`: Customer/user testimonials
   - `table`: Structured table data

2. **Field Customization**

   - **Heading Fields**: By default, headings use `defineSingleLineRichText` to allow for text decorators (bold, italic,
     etc.). If you don't need text decorators:

     ```typescript
     // Before (with rich text)
     defineSingleLineRichText({
       name: 'heading',
       title: 'Heading',
       decorators: ['em'],
     });

     // After (simple string)
     defineField({
       name: 'heading',
       title: 'Heading',
       type: 'string',
     });
     ```

     Remember to update your GROQD queries accordingly when changing field types.

3. **UI Package Integration**
   - Some fields (like badges and buttons) use enums from `@packages/ui`
   - Example: Badge colors are synced with `BadgeVariations`
   - When adding new variations in the UI package:
     1. Add the new option to the relevant enum
     2. Update the corresponding schema field options
     3. Implement the styling in the UI package

### Common Gotchas

1. Always keep UI package enums and schema options synchronized
2. Test rich text to string conversions in both studio and frontend
3. Update all relevant GROQD queries when changing field types

## Schema Structure

The schema is organized into three main categories:

### 1. Documents (`/src/schemas/documents`)

Top-level content types that represent full pages or major content entities:

- Organized in individual directories for better maintainability
- Each document type uses `defineType` for type-safe schema definitions
- Grouped fields for better content organization (e.g., Content, SEO, Settings)

### 2. Components (`/src/schemas/components`)

Reusable content blocks that can be embedded in documents:

- Modular approach using `definePageComponent`
- Consistent structure with variations support
- Built-in layout and styling options
- Examples include: Hero, Accordion, Switchback

### 3. Fields (`/src/schemas/fields`)

Shared field definitions that can be reused across schemas:

- Common fields like SEO, buttons, and headings
- Structured link handling (internal/external/download)
- Consistent component layouts and settings

## Schema Best Practices

1. **Type Safety**

   - Use `defineType` and `defineField` from Sanity
   - Leverage TypeScript for better type checking

2. **Modular Design**

   - Break down complex schemas into reusable components
   - Use shared field definitions for consistency
   - Implement variations using radio buttons or select fields

3. **Organization**

   - Group related fields using Sanity's group feature
   - Use meaningful icons for better visual organization
   - Keep schemas in dedicated directories by type

4. **Field Configuration**
   - Set appropriate initial values
   - Use validation rules when necessary
   - Implement custom input components when needed

## Schema Definitions

The `/schemas/definitions` directory contains reusable schema builders that provide consistent patterns across the
application:

### 1. `definePageComponent`

A higher-order function for creating consistent page components:

- Automatically adds standard group organization (Content, Form, Layout, Settings)
- Includes common fields for component layout and settings
- Provides consistent typing and validation

Example usage:

```typescript
const hero = definePageComponent({
  name: 'hero',
  title: 'Hero',
  fields: [
    heading,
    defineField({
      name: 'variation',
      type: 'string',
      options: {
        list: ['centered', 'leftAligned'],
      },
    }),
  ],
});
```

### 2. `defineRichText`

A powerful rich text field builder with configurable features:

- Customizable text decorators (bold, italic, underline)
- Configurable annotations (links, references)
- Optional horizontal rule support
- Flexible text and list styling options

Example usage:

```typescript
const bodyField = defineRichText({
  name: 'body',
  title: 'Content',
  decorators: ['bold', 'italic'],
  annotations: ['link'],
  includeHorizontalRule: true,
});
```

### Other Definitions

- `defineImage`: Standardized image field configuration
- `defineAsyncSelect`: Remote data selection fields
- `defineCallout`: Styled message blocks

These definitions ensure:

- Consistent field patterns across schemas
- Type-safe schema construction
- Reusable configurations
- Standardized UI components

## Studio Structure

The Sanity Studio's document structure and navigation is configured in `/src/lib/structure.ts`. This defines how
documents are organized and displayed in the CMS:

### Configuration

```typescript
// Example structure configuration
const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      mainSitePagesMenu(S),
      S.divider(),
      blogMenu(S),
      // ... other menus
    ]);
```

### Features

1. **Custom Document Organization**

   - Group related documents into logical sections
   - Create nested navigation menus
   - Add custom icons for better visual organization

2. **Singleton Documents**

   - Use `singletonDocumentListItem` for unique documents
   - Perfect for settings, homepage, or footer content

   ```typescript
   singletonDocumentListItem(S, {
     type: 'settings',
     title: 'Site Settings',
     icon: CogIcon,
   });
   ```

3. **Custom Views**

   - Create filtered document lists
   - Add custom actions and views
   - Implement role-based navigation

4. **Best Practices**
   - Keep related content grouped together
   - Use clear, descriptive titles
   - Implement consistent icons
   - Add dividers for visual separation
   - Consider user roles when organizing content

The structure is automatically loaded by the `sanity.config.ts` file through the `structureTool` plugin.

## Type Generation

This template includes automatic type generation that creates TypeScript types from your Sanity schemas. The types are
generated in the web application for seamless integration:

1. **Configuration**

   - `sanity-typegen.json` configures the type generation process
   - Types are generated to `../web/src/types/sanity.types.ts`
   - Schema extraction enforces required fields for type safety

2. **Usage**

   ```bash
   # Generate types from current schema (from repository root)
   yarn typegen
   ```

3. **Process**

   - First extracts schema to `schema.json` in the studio
   - Then generates TypeScript types in the web app
   - Includes proper typing for all document and component types
   - Maintains type safety between CMS and frontend

4. **Benefits**
   - Full type safety when querying Sanity data
   - Autocomplete for document and component fields
   - Catch errors before runtime
   - Seamless integration between CMS and frontend

## Contributing

Before committing, ensure:

1. All tests pass
2. Code is properly formatted
3. TypeScript types are checked

The project uses Husky for Git hooks to maintain code quality.

## License

UNLICENSED - All rights reserved
