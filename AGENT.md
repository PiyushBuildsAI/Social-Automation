# AGENT.md — Rules for AI agents working in this repository

> **MANDATORY — READ THIS FILE FIRST.**
> Before doing *anything* in this repo (reading code, planning, editing, running
> commands), read this file top to bottom. Do not start a task without it.
>
> **MANDATORY — THEN READ `app.md`.**
> `app.md` is the project diary: what was built, how, and why. Read it before you
> start so you know the existing state and decisions.
>
> **MANDATORY — UPDATE `app.md` WHEN YOU FINISH.**
> Every completed task must be appended to `app.md` as a new dated entry. A task
> is not "done" until the diary is updated.

---

## 1. Read order (do not skip)

1. `AGENT.md` (this file)
2. `app.md` (project diary / history)
3. `AGENTS.md` (Next.js version notes — see rule 2)
4. Then the code you are about to change

## 2. This is Next.js 16 — do not trust your training data

`AGENTS.md` warns that this Next.js has breaking changes to APIs, conventions and
file structure. Read `node_modules/next/dist/docs/` for the relevant guide before
writing code. Examples already in use here: `LayoutProps<"/">`, `cacheComponents`,
Top-Level `next.config.ts` options, `next/font/google` with CSS variables.

## 3. What this project is

**AutoMate** — a marketing/onboarding screen for an app-automation product
("Connect your apps, set your rules, and let AI do the repetitive work for you").

It is an **app screen, not a phone mockup**:
- ❌ No iOS/Android status bar (no clock, signal, wifi or battery icons).
- ❌ No device bezel or notch.
- ✅ Just the app UI, laid out as a mobile screen.

## 4. Design system — reuse it, never invent new values

Type and colour tokens live in `app/globals.css` under `@theme inline`.
**Always use the tokens/utilities below instead of hard-coded hex values.**

| Token | Value | Use |
| --- | --- | --- |
| `font-display` | Baloo 2 (variable 400–800) | headings, logo wordmark, CTA, feature titles |
| `font-sans` | Quicksand (variable 300–700) | body copy, buttons' small text, links |
| `text-ink` | `#2b2340` | primary text |
| `text-ink-soft` | `#6f6a85` | secondary/body text |
| `brand` | `#7c3aed` | primary violet, active states, links |
| `brand-bright` | `#8b5cf6` | CTA gradient end |
| `brand-soft` | `#ede9fe` | violet icon tile, cloud fill |
| `sun` / `sun-soft` | `#fbbf24` / `#fde68a` | yellow accents, doodle marks |
| `amber-soft` / `amber-ink` | `#fdf0cd` / `#f0a020` | "Automate" tile |
| `mint-soft` / `mint` | `#d8f5e3` / `#2fa36b` | "Grow" tile |

Visual language: rounded, playful, hand-drawn. Everything is pill-shaped
(`rounded-full`) or generously rounded (`rounded-[16px]`–`rounded-[18px]`), with
sketchy doodle flourishes (slashes, squiggles, dashed arrows).

## 5. Code conventions

- **TypeScript only** (`.tsx`/`.ts`), strict mode. No `any`.
- Server Components by default — add `"use client"` only when state/effects are
  genuinely required.
- Small, single-purpose components in `components/`, imported with the `@/` alias.
- Tailwind utility classes inline; no CSS modules, no styled-components.
- Illustrations and icons are **inline SVG components**, not image files.
- Keep prose/comments short and only where they add information.

## 5a. Screen map

This is a social-media automation app (Instagram comments/DMs → leads).

- **Marketing / onboarding:** `/` (AutoMate onboarding), `/welcome`, `/signup`,
  `/connect`. No bottom nav.
- **Tabbed app screens:** `/home`, `/inbox`, `/automations`, `/leads`, `/profile`,
  `/inbox/[id]`. These use `ScreenShell` + `BottomNav`.
- **Focused tasks (no nav):** `/automations/select-post`, `/automations/new`,
  `/automations/flow`, `/analytics`, `/broadcast`, `/schedule`,
  `/notifications`.
- `/screens` indexes everything — handy for reviews.

Shared pieces live in `components/app/` (`shell.tsx`, `ui.tsx`, `bottom-nav.tsx`,
`line-icons.tsx`, `form-icons.tsx`) and mock data in `lib/data.ts`. Reuse those
before writing anything new.

> **Stale-cache trap:** `app/globals.css` theme tokens are compiled once by the dev
> server. If a colour utility renders as transparent, the token is probably fine —
> the dev server is stale. Restart it (or check the production CSS) before editing
> tokens.

## 6. Before you say you are done

Run and report:
```bash
bunx tsc --noEmit      # must pass
bun run lint           # must pass
bun run build          # must pass
```
Then look at the real UI (dev server + screenshot at mobile width, `393 × 852`)
and confirm it matches the intent. A green build is not proof the screen is right.
Report anything that failed or that you could not verify — never as a pass.

## 7. House rules

- Never commit, push, or open a PR unless explicitly asked.
- Never run destructive git commands (`reset --hard`, `checkout .`, `clean -fd`).
- Do not add a dependency without checking it is not already available and saying
  why it is needed.
- Do not "fix" a failing check by disabling it, weakening assertions, or adding
  suppressions.
- Keep the diary (`app.md`) honest: record what failed and what is still open.
