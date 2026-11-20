# BIET Campus Website — Variation 1

This repository contains **Variation 1** of the **BIET Campus** website built with React, TypeScript, and Vite (`./Variation 1/`).

*(Note: Variation 2 has been moved into its own standalone repository.)*

## Features

- Oxford Navy (`#002147`) and Academic Gold (`#fdc800`) colour palette
- 16 programmes across Engineering, Computing, Business, Languages, and Psychology
- 9 routes (`/`, `/about`, `/programmes`, `/programmes/:programmeId`, `/admissions`, `/student-life`, `/news`, `/contact`, `/find-my-path`)
- `[plugin:vite:oxc]` duplicate-line JSX/CSS build fixes and Vercel SPA routing (`Variation 1/vercel.json`)

## Quick Start

```powershell
cd "Variation 1"
npm install
npm run dev
npm run build
```

## Deploying to Vercel

1. Import `https://github.com/Hermit0220/BIET` in Vercel.
2. Set **Root Directory** to `Variation 1`.
3. Keep the detected **Vite** preset (`Build Command`: `npm run build`, `Output Directory`: `dist`).
4. `Variation 1/vercel.json` handles SPA client-side route rewrites to `/index.html`.
