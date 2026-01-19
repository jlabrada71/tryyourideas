# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start dev server at http://localhost:3000
pnpm build            # Build for production
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

## Testing

- `test/unit/` - Unit tests (Node environment)
- `test/nuxt/` - Component tests using `mountSuspended` from `@nuxt/test-utils/runtime`
- `tests/` - Playwright E2E tests
