# UI Assets

This package contains shared UI assets used across the project.

## Sprites

The `icons/sprites.svg` file in this package is the single source of truth for all sprite icons used in both the web and studio apps.

### Important Notes:

1. **DO NOT** edit the sprite files directly in the apps:
   - ❌ `apps/web/public/icons/sprites.svg`
   - ❌ `apps/studio/static/icons/sprites.svg`

2. **ALWAYS** edit the source file:
   - ✅ `packages/ui-assets/icons/sprites.svg`

3. After making changes to the sprites file:
   ```bash
   yarn copy-sprites
   ```
   This will update the copies in both apps automatically.

4. The copied sprite files are gitignored to prevent accidental commits of local changes.

## How it works

- The source sprite file lives in this package
- During build and install, the file is copied to both apps
- Changes should only be made to the source file
- Run `yarn copy-sprites` to manually update the copies
