# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server at http://localhost:3000
- `npm run build` — Production build (`npx next build`)
- Preview a specific recipient: `http://localhost:3000?name=YourName`

## Architecture

Interactive multi-step valentine invite: **Next.js 16 (App Router) + Tailwind CSS v4 + Framer Motion**.

### Step flow

Driven by a single `step` state integer in `app/components/App.tsx`. `AnimatePresence mode="wait"` gates transitions so each exit finishes before the next enter begins.

| Step | Component | Key behaviour |
|------|-----------|---------------|
| 0 | `Landing` | Greeting + pulsing envelope CTA |
| 1 | `Tease` | Yes/No — No button dodges on hover/touch via spring animation, shrinks each attempt, click redirects to Yes |
| 2 | `TheAsk` | "Yes" / "Hell Yes" — both advance |
| 3 | `Celebration` | Canvas fireworks (particle burst system on `requestAnimationFrame`) + event details |

### Personalisation

Recipient name comes from the `?name=` URL search param, read via `useSearchParams` in `App.tsx`. Falls back to `"My Valentine"`.

### Tailwind v4 colour palette

Colours are defined as CSS custom properties inside `@theme inline` in `app/globals.css` (no `tailwind.config.ts` — v4 style):

- `valentine-dark` `#0f0505`
- `valentine-maroon` `#7a1828`
- `valentine-red` `#e63946`
- `valentine-rose` `#ff6b9d`
- `valentine-cream` `#fff0f3`

Use them as `bg-valentine-red`, `text-valentine-cream`, etc.

### Fireworks (Celebration.tsx)

Particle bursts created every 500–900 ms at random positions in the upper portion of the viewport. Each burst radiates ~30–55 particles outward with gravity and drag. A semi-transparent fill per frame (`rgba(15,5,5,0.25)`) produces trailing fade rather than hard clearing. Canvas is `fixed inset-0` so it covers the viewport regardless of parent layout.

### Deployment

Fully client-rendered — no API routes, no env vars needed. Deploy directly to Vercel from the repo root.
