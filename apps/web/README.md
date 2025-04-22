# Web App Development Guide

This guide outlines the best practices and key technologies used in our web application.

## Table of Contents

- [Component Architecture](#component-architecture)
- [GROQD and Type-Safe Queries](#groqd-and-type-safe-queries)
- [UI Component Libraries](#ui-component-libraries)
- [State Management](#state-management)

## Component Architecture

Our application follows an atomic design pattern with the following structure:

### 1. Global (`src/global/`)

- Components that appear on every page
- Injected into layouts
- Examples:
  - [`global/navigation/index.tsx`](src/global/navigation/index.tsx)
  - [`global/footer/index.tsx`](src/global/footer/index.tsx)
  - Announcement bars
  - Cookie consent
  - Other site-wide UI elements

### 2. Molecules (`src/molecules/`)

- Basic building blocks (buttons, icons, badges)
- Self-contained and reusable
- Examples:
  - [`molecules/badge/index.tsx`](src/molecules/badge/index.tsx)
  - [`molecules/icon/index.tsx`](src/molecules/icon/index.tsx)
  - [`molecules/button/index.tsx`](src/molecules/button/index.tsx)

### 3. Organisms (`src/organisms/`)

- Complex UI components
- Composed of multiple molecules
- Examples:
  - [`organisms/cards/resource/index.tsx`](src/organisms/cards/resource/index.tsx)
  - [`organisms/richText/index.tsx`](src/organisms/richText/index.tsx)
  - [`organisms/heading/index.tsx`](src/organisms/heading/index.tsx)

### 4. Components (`src/components/`)

- Feature-specific sectional components that build pages
- Can include business logic, queries, and multiple molecules or organisms
- Examples:
  - [`components/hero/index.tsx`](src/components/hero/index.tsx)
  - [`components/cardDeck/resource/index.tsx`](src/components/cardDeck/resource/index.tsx)
  - [`components/switchback/index.tsx`](src/components/switchback/index.tsx)

### 5. Templates (`src/templates/`)

- Reusable page templates
- Handle specific page type layouts
- Examples:
  - [`templates/legal/index.tsx`](src/templates/legal/index.tsx)

### 6. Pages (`src/app/`)

- Next.js app router pages
- Handle data fetching and routing
- Compose layouts and components
- Examples:
  - [`app/page.tsx`](src/app/page.tsx)
  - [`app/404.tsx`](src/app/404.tsx)

## GROQD and Type-Safe Queries

[GROQD](https://github.com/FormidableLabs/groqd) is used for type-safe Sanity.io queries. GROQD provides several key
benefits:

- **Type Safety**: Full TypeScript support with inferred types from your Sanity schema
- **Query Building**: Fluent API for building GROQ queries with autocompletion
- **Runtime Validation**: Uses Zod for runtime type validation of query results
- **Reusability**: Create reusable fragments for common query patterns

### Type Generation

- Types are automatically generated using `yarn typegen`
- Generated types are stored in `src/types/sanity.types.ts`
- Always use the generated types for type safety
- Use `ExtractSanityType` utility to extract nested types from generated types

### Understanding `z` vs `q`

GROQD provides two main utilities for working with types and queries:

- `q`: A complex utility for building GROQ queries and schema structures

  - Used for defining the query structure (e.g., `q.fragment()`, `q.filterByType()`)
  - Can be used for type validation but is more complex
  - Primary purpose is query building

- `z`: A simplified Zod reskin with GROQD type inference
  - Used for simple type validation (e.g., `z.string()`, `z.boolean()`)
  - Cleaner syntax for basic type definitions
  - Preferred for simple type validations

Example:

```typescript
// Prefer this (using z)
title: z.string(),
optional: z.boolean().nullable(),

// Instead of this (using q)
title: q.string(),
optional: q.boolean().nullable()
```

### Fragments

Fragments are reusable query parts that help maintain consistency and type safety. There are two main ways to create
fragments:

#### 1. Using `fragmentForType`

This approach uses Sanity's type generation to infer types directly from your schema:

```typescript
// Example fragment for a blog post using schema types
export const blogPostFragment = q.fragmentForType<'blog'>().project(post => ({
  _id: z.string(),
  title: post.field('title').asString(), // Type is inferred from schema
  slug: post.field('slug.current').asString(),
  content: post.field('content[]').project(richTextFragment),
}));
```

#### 2. Using `fragment` with Custom Types

This approach uses custom TypeScript types, typically constructed using `ExtractSanityType`:

```typescript
// Define custom type using ExtractSanityType
type HeroSection = ExtractSanityType<Page, 'body.hero'>;

// Create fragment using custom type
export const heroFragment = q.fragment<HeroSection>().project(hero => ({
  _key: z.string(),
  heading: hero.field('heading').project(headingFragment),
  subheading: hero.field('subheading').asString().nullable(),
  image: hero.field('image').project(imageFragment).nullable(),
}));
```

The key differences are:

- `fragmentForType`: Uses generated Sanity types, provides better type inference
- `fragment`: More flexible, allows custom types, useful for nested or complex structures

### Using Queries

```typescript
// Define the query using GROQD
const pageQuery = q
  .parameters<{ slug: string }>()
  .star.filterByType('page')
  .filterBy('seo.slug.current == $slug')
  .project(page => ({
    title: page.field('title').asString(),
    seo: page.field('seo').project(seoFragment),
    body: page.field('body[]').project(componentGeneratorFragment),
  }));

// The above GROQD query generates this GROQ:
/*
*[_type == "page" && seo.slug.current == $slug] {
  title,
  seo {
    pageTitle,
    pageDescription,
    openGraphImage {...},
    noIndex,
    noFollow
  },
  body[] {
    _key,
    _type,
    heading {...},
    content[] {...}
  }
}
*/

// Using the query with type safety
const page = await runQuery(pageQuery, { slug: 'home' });
// page is fully typed with all fields
```

### Best Practices

1. Always use fragments for reusable query parts and store them as close to the component code as possible
2. Prefer `fragmentForType` when querying root-level documents
3. Use `fragment` with `ExtractSanityType` for nested or complex types
4. Leverage Zod's validation features for runtime type safety
5. Keep fragments focused and composable
6. Use `z` for simple type validations and `q` for complex query structures

## UI Component Libraries

### Radix UI

Radix UI is our preferred library for accessible, unstyled components. The following components are currently
implemented, but developers are encouraged to add any additional Radix components as needed:

- `@radix-ui/react-accordion`: Collapsible content
- `@radix-ui/react-dialog`: Modal dialogs
- `@radix-ui/react-navigation-menu`: Navigation components
- `@radix-ui/react-tooltip`: Tooltip components

Best practices:

- Always maintain ARIA attributes
- Use Radix's built-in state management
- Customize using Tailwind CSS

### Zag.js

While Radix UI is preferred, we use Zag.js in cases where:

- A component isn't available in Radix
- Complex state machine behaviors are needed
- Zag.js provides a more suitable implementation

Currently implemented Zag components:

- `@zag-js/pagination`: Pagination component
- `@zag-js/select`: Select component

Feel free to add more Zag.js components when they better suit your needs.

## State Management

### Zustand

Zustand is our primary state management solution for sharing state between components. Use it when:

- State needs to be shared across multiple components
- State needs to persist between page navigations
- Complex state logic needs to be encapsulated

Example usage:

```typescript
// store/example.ts
interface ExampleStore {
  heading: string;
}

const defaultState = {
  heading: '',
};

const useExampleStore = create<ExampleStore>()(() => defaultState);

// Getter
export const useExampleHeading = () => useExampleStore(state => state.heading);

// Setter
export const setExampleHeading = (heading: string) => useExampleStore.setState({ heading });

// Usage in components
// components/ExampleComponent.tsx
const ExampleComponent = () => {
  // Get state
  const heading = useExampleHeading();

  // Update state
  const handleClick = () => setExampleHeading('New Heading');

  return (
    <div>
      <h1>{heading}</h1>
      <button onClick={handleClick}>Update Heading</button>
    </div>
  );
};
```

### State Management Best Practices

1. Use local `useState` for component-specific state
2. Use Zustand for shared state between components
3. Keep stores focused and minimal
4. Place store files close to their related components
5. Use TypeScript for type-safe stores
6. Separate getters and setters into their own exported functions
7. `useContext` is available but discouraged unless there's a specific need
