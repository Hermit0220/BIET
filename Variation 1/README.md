# React + TypeScript + Vite
# British Institute of Engineering and Technology (BIET) — React Website

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.
High-fidelity React 19 + TypeScript + Vite 8 + Tailwind CSS v4 implementation of the **British Institute of Engineering and Technology (BIET), Sri Lanka** website (`https://cybergriffith.github.io/BIET-NEW/`).

Currently, two official plugins are available:
## Quick Start

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
```powershell
# Install dependencies (already installed)
npm install

## React Compiler
# Start development server
npm run dev

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
# Type-check and build production bundle
npm run build

## Expanding the Oxlint configuration
# Preview production build
npm run preview

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
# Run automated Playwright E2E + pixelmatch visual verification
node scripts/verify-and-compare.mjs
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
## Project Structure

- `src/pages/` — All 9 page views (`HomePage`, `AboutPage`, `ProgrammesPage`, `ProgrammeDetailPage`, `AdmissionsPage`, `StudentLifePage`, `NewsPage`, `ContactPage`, `FindMyPathPage`)
- `src/sections/HeroSlider.tsx` — 4-slide auto-advancing hero showcase with progress bar, keyboard/touch/button controls, and pause/resume toggle
- `src/components/layout/` — `Header`, `Footer`, `WhatsAppFloat`, `ScrollToTop`
- `src/components/modals/` — `ApplicationModal`, `ProgrammeQuickViewModal`, `ProspectusModal`, `NewsArticleModal`, `PathwayAdminModal`
- `src/components/ui/SmartImage.tsx` — Local WebP resolver and custom technical SVG schematics (`civil`, `mechanical`, `electrical`, `software`, `cyber`, `quantity-surveying`)
- `src/data/` — Complete data layer (`programmes.ts`, `site.ts`, `pathways.ts`)
- `public/assets/` — Official BIET logo (`biet-logo.png`) and all 66 photographic assets in local WebP (`images/photo-*.webp`)
- `screenshots/` — Reference captures (`screenshots/reference/`), implementation captures (`screenshots/impl/`), pixel diff heatmaps (`screenshots/diff/`), and `visual-diff-report.json`
