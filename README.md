# Sanity Template

Welcome to the Sanity template! This starter kit combines Sanity CMS with a modern monorepo structure, making it easier
for our team to build and maintain client projects.

## Documentation

### Applications
- [Web Application](apps/web/README.md) - Next.js frontend application
- [Sanity Studio](apps/studio/README.md) - Sanity CMS studio

### Packages
- [Assets](packages/assets/README.md) - Shared assets and resources
- [ESLint Config](packages/eslint/README.md) - Shared ESLint configuration
- [TypeScript Config](packages/typescript/README.md) - Shared TypeScript configuration
- [UI Components](packages/ui/README.md) - Shared UI component library
- [Utils](packages/utils/README.md) - Shared utility functions

## Contributing

We value collaboration and continuous improvement. If you have suggestions, questions, or run into any issues, please
don't hesitate to:

- Open a GitHub issue
- Start a discussion in our team channels
- Submit a pull request with improvements

Let's build amazing things together! 🚀

## Prerequisites

- Node.js 20.19.x (use nvm for version management)
- Yarn 4.5.0

## Spire Setup

1. Install Spire CLI:

   ```bash
   curl -fsSL https://install.spire.rs | sh
   ```

2. Initialize Spire in your project:

   ```bash
   spire init
   ```

3. Run Spire:

   ```bash
   spire up
   ```

## Getting Started

1. Clone the repository:

   ```bash
   git clone [your-repo-url]
   cd sanity-template
   ```

2. Set up Node.js version:

   ```bash
   nvm use
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Configure environment variables:

   a. For Sanity Studio (`apps/studio`):

   ```bash
   cp apps/studio/env.example apps/studio/.env
   ```

   Update the following in `.env`:

   - `SANITY_STUDIO_PROJECT_ID`: Your Sanity project ID

   b. For Web Application (`apps/web`):

   ```bash
   cp apps/web/env.example apps/web/.env
   ```

   Update the following in `.env`:

   - `NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID`: Same Sanity project ID as above
   - `SANITY_READ_TOKEN`: Your Sanity API read token (generate from Sanity dashboard)

5. Update configuration files:

   a. Studio Constants (`apps/studio/lib/constants.ts`):

   - Review and update `PRESENTATION_PATHS` for your content types
   - Modify `PAGE_TYPES` and `REFERENCEABLE_DOCUMENT_TYPES` based on your schema

   b. Web Constants (`apps/web/src/constants/general.ts`):

   - Update `SITE_NAME` with your website's name
   - Set `SITE_DOMAIN` to your production domain
   - Add a `SITE_DESCRIPTION` for SEO purposes

## Development

- Run the entire development environment:

  ```bash
  yarn dev
  ```

- Run only the CMS (Sanity Studio):

  ```bash
  yarn dev:cms
  ```

- Run only the web application:
  ```bash
  yarn dev:web
  ```

## Available Scripts

- `yarn build`: Build all applications
- `yarn dev`: Run all applications in development mode
- `yarn dev:cms`: Run only the Sanity Studio
- `yarn dev:web`: Run only the web application
- `yarn lint`: Run linting across all packages
- `yarn format`: Format code using Prettier
- `yarn validate`: Run validation (linting, types, and formatting)
- `yarn check-types`: Run TypeScript type checking
- `yarn setup-sprites`: Set up icon sprites for both web and studio apps

## Project Structure

```
├── apps/
│   ├── studio/    # Sanity Studio
│   └── web/       # Web application
├── packages/
│   ├── assets/    # Shared assets and resources
│   ├── eslint/    # ESLint configuration
│   ├── typescript/# TypeScript configuration
│   ├── ui/        # Shared UI components
│   └── utils/     # Common utilities and helpers
└── turbo.json     # Turborepo configuration
```

## Commit Guidelines

This project uses conventional commits and semantic-release for versioning, with Husky v9 for Git hooks. Pre-commit
hooks run using npx to ensure consistent behavior across environments.

Commits should follow the format:

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

Example: `feat(web): add new hero component`

Common types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates, etc

## Contributing

1. Create a new branch from `main`
2. Make your changes following our coding standards
3. Write/update tests as needed
4. Update documentation
5. Submit a pull request
6. Ensure all checks pass

Refer to individual package READMEs for specific development guidelines.

## Deploying to Vercel

This project requires two separate Vercel projects: one for Sanity Studio and one for the web application.

### Sanity Studio Deployment

1. Create a new Vercel project for the Studio
2. Under Build and Development Settings:
   - Framework Preset: `Sanity`
   - Root Directory: `apps/studio`
   - Build Command: `yarn build`
   - Output Directory: `dist`
3. Add environment variables:
   - `SANITY_STUDIO_PROJECT_ID`: Your Sanity project ID
   - `SANITY_STUDIO_DATASET`: Your dataset name (usually 'production')
   - `SANITY_STUDIO_API_VERSION`: Set to current date (e.g., '2024-04-15')
   - `ENABLE_EXPERIMENTAL_COREPACK`: Set to `1` to enable Yarn

### Web Application Deployment

1. Create a new Vercel project for the web app
2. Under Build and Development Settings:
   - Framework Preset: `Next.js`
   - Root Directory: `apps/web`
   - Build Command: `yarn build`
   - Output Directory: `.next`
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Same Sanity project ID as above
   - `NEXT_PUBLIC_SANITY_DATASET`: Same dataset name as above
   - `SANITY_STUDIO_API_VERSION`: Set to current date (e.g., '2024-04-15')
   - `SANITY_API_READ_TOKEN`: Token with read permissions (generate from Sanity manage)
   - `ENABLE_EXPERIMENTAL_COREPACK`: Set to `1` to enable Yarn
   - Any additional environment variables from `apps/web/.env.example`

## License

Private - All Rights Reserved
