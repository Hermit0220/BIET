# BIET Campus — Variation 2 (TCU-Inspired Editorial Design)

Isolated second variation built in React 19 + TypeScript + Vite 8 + Tailwind CSS v4 + GSAP (`@gsap/react`) using the visual and architectural grammar inspired by `https://www.tcu.edu/`, strictly expressed through BIET Campus's yellow (`#FFCC00`), charcoal (`#111111`), and white palette and official BIET logo.

## Local Setup & Scripts

```powershell
# Install dependencies (already installed)
npm install

# Run development server
npm run dev

# Run automated Pathfinder & Consultation invariant tests (Node SSR)
node scripts/test-variation2.mjs

# Type-check & build production bundle (root "/" base)
npm run build

# Build for subpath deployment (e.g. GitHub Pages /BIET-NEW/)
$env:BASE_PATH="/BIET-NEW/"; npm run build; Remove-Item Env:\BASE_PATH

# Run Playwright + Edge multi-viewport QA & subpath screenshot verification
node scripts/qa-variation2.mjs
```

## Runtime Environment Configuration

Create a `.env` file (or configure CI build variables) before production launch:

- `VITE_CONSULTATION_ENDPOINT` — Approved server/CRM HTTPS POST endpoint accepting consultation JSON payloads with `X-Idempotency-Key`. When unset, the form preserves student inputs and reports an honest unconfigured notice with direct telephone/email contact alternatives instead of faking submission.
- `VITE_WHATSAPP_NUMBER` — Verified BIET Admissions WhatsApp number in international digits-only format (e.g., `947XXXXXXXX`). Audited fallback placeholder `94112345678` is explicitly blocked in `src/config/siteConfig.ts`.

Never place server-side secrets or private API tokens inside `VITE_*` variables.

## Handoff Documentation

- [CONTENT_DEPENDENCIES.md](./CONTENT_DEPENDENCIES.md) — Explicit register of content, intake, awarding-body, and integration items awaiting BIET confirmation.
- [MEDIA_MANIFEST.md](./MEDIA_MANIFEST.md) — Inventory of local Pexels videos and local illustrative learning images.
- [QA_REPORT.md](./QA_REPORT.md) — Automated unit test results, dual-base build logs, 7-viewport browser QA verification, and honest release readiness statement.
