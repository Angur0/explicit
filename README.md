# EXPLICIT Website

Official website for **EXPLICIT — Explorers in Communication and Information Technology**.

This project is built with Next.js App Router, TypeScript, Tailwind CSS, and static JSON content stored in `src/data/**`.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server on port `9002`:

```bash
npm run dev
```

Open `http://localhost:9002`.

## Build Commands

```bash
npm run typecheck
npm run build
```

- `npm run typecheck`: runs `tsc --noEmit`
- `npm run build`: regenerates `public/search-index.json` and creates the production build

This app is configured for static export, so production output is generated into `out/`.

## Project Structure

```text
src/app              Next.js routes and layouts
src/components       UI, layout, and public-facing components
src/data             Site content (news, events, achievements, officers, etc.)
src/lib              Shared helpers and loaders
src/hooks            Reusable React hooks
src/scripts          Build-time utilities
public/images        Static assets
```

## Content Editing

Most site updates happen in `src/data/**`.

Common files:

- `src/data/news/articles.json`
- `src/data/events/all-events.json`
- `src/data/achievements/featured.json`
- `src/data/achievements/timeline.json`
- `src/data/officers/*.json`

After changing content, run:

```bash
npm run build
```

This refreshes the generated search index used by the site search page.

## Notes

- `public/search-index.json` is generated; do not edit it by hand.
- The site uses static export in `next.config.ts`, so unsupported server-only Next.js features should be avoided unless deployment changes.
