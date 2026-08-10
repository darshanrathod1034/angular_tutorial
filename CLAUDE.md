# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` / `ng serve` — run dev server at `http://localhost:4200/`, auto-reloads on source changes
- `ng build` — production build, output to `dist/` (dev build: `ng build --configuration development`)
- `npm run watch` — incremental dev build in watch mode
- `ng test` — run unit tests via Vitest
- `ng generate component <name>` — scaffold a new component (`ng generate --help` for other schematics)

There is no lint script configured in `package.json`. Prettier is configured (`.prettierrc`: single quotes, 100 print width, Angular parser for `*.html`) but not wired to an npm script — run via `npx prettier --write .` if needed.

## Architecture

This is an Angular 22 application using the standalone-component API (no `NgModule`s) and the new `@angular/build` builder (esbuild-based, replaces `@angular-devkit/build-angular`).

- **Bootstrap**: [src/main.ts](src/main.ts) bootstraps the standalone `App` component using `appConfig` from [src/app/app.config.ts](src/app/app.config.ts).
- **App config**: [src/app/app.config.ts](src/app/app.config.ts) is the single place providers are registered (currently `provideBrowserGlobalErrorListeners` and `provideRouter(routes)`). Add new global providers (e.g. `provideHttpClient`) here.
- **Routing**: [src/app/app.routes.ts](src/app/app.routes.ts) exports the `routes` array consumed by `provideRouter`. It is currently empty — this is where feature routes get registered.
- **Root component**: [src/app/app.ts](src/app/app.ts) is the standalone `App` component (selector `app-root`), templated by `app.html`/`app.css`. New standalone components should follow the same pattern: `imports: [...]` directly on the `@Component` decorator instead of declaring an `NgModule`.
- **Testing**: uses Vitest (via `@angular/build:unit-test`) rather than Karma/Jasmine — the newer Angular CLI default test runner.
- **Backend**: [.env](.env) defines `Backend_URL` pointing at a dev-tunnel URL for the API this app is meant to consume. Angular does not read `.env` files at build/serve time — there is no dotenv integration wired up yet, so this value is not currently accessible from app code. If backend integration is added, it will need to go through Angular's `environment.ts` mechanism or a build-time env-injection step, plus `provideHttpClient` in `app.config.ts`.

The project is currently just past initial `ng new` scaffolding: no feature components, services, guards, or HTTP wiring exist yet beyond the generated root `App` component.
