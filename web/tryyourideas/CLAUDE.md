# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Database
docker compose up -d  # Start MongoDB (required for invite-requests API)
docker compose down   # Stop MongoDB

# Development
pnpm dev              # Start dev server at http://localhost:3000
pnpm build            # Build for production

# Testing
pnpm test             # Run all tests (unit + Nuxt component)
pnpm test:unit        # Run unit tests only
pnpm test:nuxt        # Run Nuxt component tests only
pnpm test:e2e         # Run Playwright E2E tests

# Run single test file
pnpm vitest run test/unit/example.test.ts
pnpm playwright test tests/example.spec.ts
```

## Architecture

Nuxt 4 content site using `@nuxt/content` for file-based Markdown rendering.

**Content Flow:** Markdown files in `content/` → processed by @nuxt/content → rendered by catch-all route `app/pages/[...slug].vue` using `<ContentRenderer>`. File paths map to routes (`content/about.md` → `/about`).

**Embedding Components in Markdown:**
```md
::alert{color="green"}
Content here
::
```

Components in `app/components/` are auto-imported and usable via `::componentName{props}` syntax.

**Database:** MongoDB is used for storing invite requests. Connection is managed in `server/utils/db.ts` with models in `server/models/`. Environment variable `MONGODB_URI` defaults to `mongodb://localhost:27017/tryyourideas`.

## Implementing features
Always refactor the code extracting reusable components, and removing duplication

## Implementing UI 
Always extract reusable components

## Testing

- `test/unit/` - Unit tests (Node environment)
- `test/nuxt/` - Component tests using `mountSuspended` from `@nuxt/test-utils/runtime`
- `tests/` - Playwright E2E tests
- For each feature implemented create unit tests including edge cases
- When creating tests for the UI use testing-library for testing UI accessibility.

