# QA & Release Readiness Report — BIET Campus Variation 2

## 1. Completion Status Breakdown (Per Brief Section 24)

| Workstream | Status | Evidence & Notes |
|---|---|---|
| **Visual implementation** | **Complete** | Implemented TCU-inspired full-bleed video hero, oversized filled/outlined typography, frosted ~60° diagonal hero transition, charcoal header (`#111111`), expansive menu drawer, high-contrast search, equal-weight 5 priority cards (`3+2` desktop / `2+1` tablet / `1` mobile), alternating light/charcoal editorial splits, and single persistent ActionBar using exact BIET `#FFCC00` / `#111111` / `#FFFFFF` tokens. Verified visually across captured screenshots in `screenshots/`. |
| **Routes & content templates** | **Complete** | All 9 routes (`/`, `/about`, `/programmes`, `/programmes/:programmeId`, `/admissions`, `/student-life`, `/news`, `/contact`, `/find-my-path`) built and verified across `/BIET-NEW/` subpath & deep-link reload, including archived legacy URL state. |
| **Pathfinder interaction & academic rules** | **Interaction Complete · Official Rules Pending BIET Approval** | Full 4-stage interactive wizard + Results view complete with zero prefilled grades/passes, focus management, ARIA announcements, non-colour status badges, and honest 3-valued matching contract (`met` / `not_met` / `unknown`). Official entry rule matrices await BIET academic sign-off (`CD-02`). |
| **Consultation UI & backend integration** | **UI Complete · Receiving Integration Pending** | Reusable `ConsultationForm` & `ConsultationDialog` complete with dynamic contact-method validation, idempotency keys, separate optional marketing checkbox, and honest unconfigured/failed/timeout handling. Live server endpoint (`VITE_CONSULTATION_ENDPOINT`) awaits configuration (`CD-03`). |
| **WhatsApp destination** | **Configured Safely · Number Verification Pending** | Shared `WhatsAppLink` & `siteConfig.whatsapp` block audited placeholder `94112345678` and remain dormant until verified `VITE_WHATSAPP_NUMBER` is supplied (`CD-04`). |
| **Media optimisation & usage** | **Optimised · Institutional Creative Review Pending** | Local 1080p desktop hero MP4 (6.64 MB), 9:16 portrait mobile MP4 (7.87 MB), WebP posters/images, orientation-selective video loading, `prefers-reduced-motion` + `saveData` poster fallback, and illustrative captions active (`CD-06`). |
| **Production release readiness** | **Not Ready for Live Public Cutover (Preview Ready)** | Reviewable internal preview is complete and passing technical QA; live public release is blocked on BIET approval of programme specs/rules (`CD-01`, `CD-02`), live consultation endpoint (`CD-03`), verified WhatsApp number (`CD-04`), and official campus/legal confirmation (`CD-05`, `CD-07`). |

---

## 2. Automated Verification Summary

- **Unit Invariant Tests (`node scripts/test-variation2.mjs`)**: **PASSED (100%)** covering `P01`, `P03`, `P04`, `P05`, `P06`, `P07`, `P08`, `P09`, `P10`, `C02`, `C04`, `C05`, `C11`.
- **Production Builds**:
  - `npm run build` (`BASE_PATH=/`): **0 TypeScript errors, 0 Vite errors** (`dist/index.html` + split route chunks).
  - `BASE_PATH=/BIET-NEW/ npm run build`: **0 TypeScript errors, 0 Vite errors**.
- **Multi-Viewport Browser QA (`node scripts/qa-variation2.mjs`, Chromium/Edge)**:
  - Tested Viewports: `1440×900`, `1920×1080`, `1366×768`, `1024×768`, `768×1024`, `390×844`, `320×568` + `prefers-reduced-motion: reduce`.
  - Horizontal overflow: `false` across all 7 viewports (0px overflow at 320px).
  - Broken images / assets: `0`.
  - TCU string/branding leaks: `false`.
  - Console / uncaught page errors: `0`.
  - End-to-End Student Journeys Verified: Subpath deep-link reload (`/BIET-NEW/programmes/diploma-in-computing`), Homepage Starting-Point card -> Finder Step 1 -> 4 steps -> Results before PII collection, ActionBar suppression during Finder Steps 1–4, Menu keyboard Escape & focus return, and Consultation honest alert when endpoint is unconfigured.
  - Visual Screenshots Reviewed: `screenshots/home-desktop.png`, `screenshots/home-mobile.png`, `screenshots/priority-programmes.png`, `screenshots/menu-overlay.png`, `screenshots/directory.png`, `screenshots/programme-detail.png`, `screenshots/finder-step1.png`, `screenshots/finder-results.png`, `screenshots/contact-consultation.png`.
