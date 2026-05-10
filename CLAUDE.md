# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR (http://localhost:5173)
npm run build     # Production build → /dist
npm run preview   # Serve production build locally
npm run lint      # ESLint across all JS/JSX files
npm run fresh     # Clear Vite cache and restart dev server
```

No test runner is configured.

## Architecture

This is a React 19 + Vite SPA for a bilingual (English/Hebrew) CPA firm website.

### Key patterns

**Bilingual / RTL support**
All user-facing text lives in `src/data/content.js` as a large `{ en, he }` object. Components consume it via `useContext(LanguageContext)` from `src/context/LanguageContext.jsx`. The active language also controls `dir="rtl"` and switches the body font between Inter (EN) and Heebo (HE).

**Routing**
`src/App.jsx` wraps everything in `<LanguageProvider>` and defines `<Routes>` via React Router DOM 7. Pages live in `src/pages/`, each composing section components from `src/components/`.

**Content vs. structure**
- `src/data/content.js` — all bilingual copy (2000+ lines)
- `src/data/pages.js` — page-level metadata
- `src/data/team.js` — team member records
- `src/components/` — presentational section components (Hero, ServicesSection, Testimonials, etc.)
- `src/hooks/useReveal.js` — scroll-triggered reveal animation hook

**Styling**
Tailwind CSS 4 via the `@tailwindcss/vite` plugin (no `tailwind.config.js` file). Custom theme tokens are defined in `src/index.css`:
- `--color-primary`: `#1A3554` (navy)
- `--color-primary-dark`: `#0F2B47`
- `--color-accent`: `#C4883A` (gold)
- `--color-accent-dark`: `#A96F25`
- Fonts: Plus Jakarta Sans (EN), Rubik (HE) loaded from Google Fonts

**Navigation**
The navbar (`src/components/Navbar.jsx`) uses a white background on all pages with navy (`#1A3554`) text and gold (`#C4883A`) accents. A gold scroll-progress bar appears at the bottom of the header.

**Adding content or translations**
Edit `src/data/content.js` — add both `en` and `he` keys for any new string. Never hardcode display text inside components.
