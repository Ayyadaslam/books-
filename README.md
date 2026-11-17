# Steary Books

An animated, spatial glassmorphic book discovery platform and interactive digital reader built with React, TypeScript, Tailwind CSS v4, and Motion.

## Features

- **Spatial Glassmorphic Interface**: Frosted glass workspace layered over selectable ambient study backdrops (`Warm Study`, `Midnight Archive`, `Sunlit Atrium`).
- **Interactive Discovery & Filtering**: Live book search, category tabs (`Discover`, `Fiction`, `Non-fiction`, `Mystery`, `Fantasy`, `Sci-Fi`, `Biography`), and sortable **New Releases** (`Latest`, `Title`, `Rating`).
- **Featured Book Carousel**: Animated hero showcase featuring custom 3D hardcover book artwork, synopsis previews, quick save, and instant reader launch.
- **Interactive Digital Reader**: Multi-chapter reader with `dark`, `sepia`, and `paper` surfaces, adjustable typography scale, chapter table of contents, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), and real-time reading progress syncing.
- **Persistent Personal Library**: Bookmarks, offline downloads, reading progress, and workspace preferences automatically persist in `localStorage`.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**: Motion (`motion/react`)
- **Icons**: Lucide React

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build & Typecheck

```bash
npm run lint
npm run build
```

## Deploying to Vercel

### Option 1: GitHub + Vercel Dashboard (Recommended)
1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
3. Vercel automatically detects `vercel.json` and Vite (`npm run build` -> `dist/`).
4. Click **Deploy** — no environment variables are required for the static frontend.

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```
