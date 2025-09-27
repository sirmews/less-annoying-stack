# CRUSH.md - Guidelines for Agentic Coding in Less Annoying Stack

## Commands

- Install: `make install` (uses Bun)
- Dev (Chrome): `make dev` or `bun wxt`
- Dev (Firefox): `make dev-firefox` or `bun wxt -b firefox`
- Build (Chrome): `make build` or `bun wxt build`
- Build (Firefox): `make build-firefox` or `bun wxt build -b firefox`
- Type Check: `make check` or `bun tsc --noEmit`
- Clean: `make clean`
- Zip: `make zip` (for Chrome) or `make zip-firefox`
- No test/lint scripts found; add Vitest/ESLint if needed. For single test: `bun test path/to/test.ts`

## Code Style

- Language: TypeScript (strict mode via tsconfig.json)
- Formatting: Standard TS; use 2-space indent, semicolons. Run `bun tsc --noEmit` post-edit.
- Imports: ES modules. Group node_modules (e.g., WXT APIs), then local files. No unused imports.
- Types: Use explicit types/generics (e.g., `querySelector<HTMLDivElement>`). Handle optionals with `?.`.
- Naming: camelCase for variables/functions, PascalCase for components/classes.
- Error Handling: Check for undefined/null (e.g., `if (element)`). Use try-catch for promises; log errors to console.
- Browser API: Use WebExt types (e.g., `browser.tabs.query`). Avoid direct DOM manipulation in content scripts.
- Comments: Minimal; only for complex logic. No inline comments unless clarifying intent.
- Security: Never hardcode secrets. Validate user input in popup/content scripts.

This repo uses WXT for extensions. Follow DEVELOPMENT.md for structure. No Cursor/Copilot rules found.
