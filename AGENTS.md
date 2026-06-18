<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# BenTelega.github.io

Personal portfolio site — Next.js 16 App Router, static HTML export deployed to GitHub Pages.

## Commands

```sh
npm run dev       # local dev at http://localhost:3000
npm run build     # static export to out/
npm run lint      # ESLint (no typecheck script — run npx tsc --noEmit manually)
npm start         # starts production server (not used, static export only)
```

No test framework.

## Key facts

- **Static export**: `next.config.ts` sets `output: "export"`, `images.unoptimized: true`, `trailingSlash: true`. No API routes, no `next/image` optimization, no server features.
- **GitHub Pages deploy**: CI in `.github/workflows/deploy.yml` — push to `main` triggers `npm ci && npm run build`, uploads `out/` via `actions/upload-pages-artifact`.
- **Tailwind CSS v4**: Uses `@import "tailwindcss"` (not `@tailwind` directives), `@theme inline {}` for design tokens, and `@tailwindcss/postcss` PostCSS plugin.
- **Path alias**: `@/*` maps to `./src/*` (configured in tsconfig paths).
- **Route structure** (all under `src/app/`):
  - `layout.tsx` — root layout with Geist fonts, nav header, dark mode support
  - `page.tsx` — `/` (About)
  - `projects/page.tsx` — `/projects`
  - `blog/page.tsx` — `/blog`
  - `contact/page.tsx` — `/contact`
- **No tests**, no monorepo, no codegen, no migration tooling.
