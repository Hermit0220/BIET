# BIET Campus Website — Variations

This repository contains two frontend variations built in React + TypeScript + Vite for the **BIET Campus** website.

## Folder Structure

- **[Variation 1](./Variation%201/)** — BIET Campus website recreation built with React, TypeScript, and Vite using an Oxford Navy (`#002147`) and Academic Gold (`#fdc800`) palette across 16 programmes and 9 routes, with `[plugin:vite:oxc]` duplicate-line JSX/CSS build errors resolved.
- **[Variation 2](./Variation%202/)** — TCU-inspired editorial edition built with React 19, TypeScript, Vite 8, Tailwind CSS v4, and GSAP (`@gsap/react`) using BIET Campus's yellow (`#FFCC00`), charcoal (`#111111`), and white (`#FFFFFF`) palette, local desktop and portrait Pexels hero videos, 5 priority programmes alongside the reconciled legacy catalogue, a 4-step 3-valued `Find My Path` engine, a reusable `ConsultationForm` with honest delivery states, verified-only `WhatsAppLink`, and a single persistent `ActionBar`.

## Quick Start

### Variation 1

```powershell
cd "Variation 1"
npm install
npm run dev
npm run build
```

### Variation 2

```powershell
cd "Variation 2"
npm install
npm run dev
node scripts/test-variation2.mjs
npm run build
```

## Variation 2 Documentation

- [Variation 2/README.md](./Variation%202/README.md) — Setup, dual-base build commands, and environment configuration
- [Variation 2/CONTENT_DEPENDENCIES.md](./Variation%202/CONTENT_DEPENDENCIES.md) — Content, academic rule, and integration items pending institutional confirmation
- [Variation 2/MEDIA_MANIFEST.md](./Variation%202/MEDIA_MANIFEST.md) — Local Pexels video and illustrative imagery inventory
- [Variation 2/QA_REPORT.md](./Variation%202/QA_REPORT.md) — Automated invariant test results, builds, and multi-viewport QA summary
