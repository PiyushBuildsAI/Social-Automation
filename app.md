# app.md — Project diary

> **How to use this file:** it is the running history of this project. Every agent
> must **read it before starting** and **append a new entry when a task is done**.
> Use the newest entry at the bottom. Be honest — record what failed, what is
> unverified, and what is left open. See `AGENT.md` for the full rules.

---

## 2026-10-09 — Build the AutoMate onboarding screen from a design reference

**Request.** Recreate the attached onboarding screen ("first screen.png") in
Next.js + TypeScript with the same UI, fonts and colours.

**Stack.** Next.js 16.4 (App Router, Turbopack), React 19, TypeScript strict,
Tailwind CSS v4 (`@tailwindcss/turbopack`, configured via `next.config.ts`).

### What was built

The stock create-next-app page was replaced with the onboarding screen.

| File | Purpose |
| --- | --- |
| `app/globals.css` | Tailwind v4 `@theme inline` tokens: AutoMate palette + font vars. Dark-mode override removed (design is light-only). |
| `app/layout.tsx` | `next/font/google` — Baloo 2 (`--font-baloo`, display) + Quicksand (`--font-quicksand`, body). AutoMate metadata. |
| `app/page.tsx` | The screen: brand bar, headline, intro, illustration, three value props, pagination, CTA, footer link. |
| `components/automate-logo.tsx` | The violet four-point bloom with a yellow bolt. |
| `components/decorations.tsx` | Hand-drawn flourishes: `SlashMarks`, `Squiggle`, `UnderlineSwoosh`. |
| `components/icons.tsx` | Line-art icons: `ArrowRight`, `ChevronRight`, `Bolt`, `Wand`, `GrowChart`. |
| `components/onboarding-illustration.tsx` | The whole doodle scene as one inline SVG. |
| `AGENT.md` | Rules every agent must read before working here. |
| `app.md` | This diary. |

### Fonts and colours (the interesting decisions)

- Heading/wordmark/CTA use **Baloo 2** (chunky, rounded, playful); body copy uses
  **Quicksand** (geometric rounded). Both are Google variable fonts, self-hosted
  by `next/font` — no runtime request to Google.
- Palette read off the reference: violet `#7c3aed` (with `#8b5cf6` for the CTA
  gradient), ink `#2b2340`, muted ink `#6f6a85`, sun yellow `#fbbf24`, lavender
  cloud `#ede9fc`, mint `#2fa36b`, amber `#f0a020`.

### The illustration

There was no asset to import, so the doodle scene was rebuilt by hand as a single
inline SVG (viewBox `0 0 360 234`): a lavender cloud made of overlapping
ellipses, dashed arrows with an SVG marker arrowhead, six app cards (Instagram,
Notion, Gmail, Slack, Google Sheets, WhatsApp), a paper-plane dart, sparkles, and
the mascot (raised arm, blush, crown, violet laptop with a yellow bolt). The Gmail
mark uses Google's official 5-path colour geometry; the others are simplified to
read clearly at ~50 px.

### Corrections made during the task

1. **Removed the iOS status bar.** The first pass included a 9:41 / signal / wifi /
   battery row copied from the reference image. The user pointed out this is an
   **app screen, not a phone mockup**, so the row and `components/status-bar.tsx`
   were deleted. This also bought ~40 px of vertical space. Recorded as a rule in
   `AGENT.md` §3.
2. **Vertical fit.** The first render was 921 px tall, so the footer fell below the
   fold. Spacing, the four-line headline's leading and the intro paragraph were
   tightened so the whole screen fits in one phone viewport (393 × 852).
3. **Intro paragraph** was wrapping to three lines; it is now the two lines of the
   reference. The line break after "…set your rules," is explicit (`<br />`) because
   natural wrapping put "and" on the first line at this width.
4. **Paper plane** first rendered as a flat kite. It is now built as the classic
   two-facet send-dart and rotated -135° so the nose points up-left like the
   reference.
5. **Docs.** `AGENT.md` (mandatory rules) and `app.md` (this diary) were added at
   the user's request.
6. **Mascot's mouth** was a small dark oval that read as a nose. It is now a wide
   open smile, which is what the reference shows.

### Verification

- `bunx tsc --noEmit` — passes.
- `bun run lint` — passes.
- `bun run build` — passes; `/` prerenders as static.
- All three were re-run **after** the final illustration edit, not only before it.
- Browser console — clean (only the React DevTools notice and HMR logs).
- Measured in the browser at 393 × 852: `scrollHeight` is exactly 852 and
  `scrollWidth` 393, so the screen fills one phone viewport with no scrolling and
  nothing clipped. Logo at (24, 20) 42×42, wordmark at x=76, headline 345 px wide
  starting at y=96.
- A dev server was already running on port 3000 for this project (started by the
  user), so that instance was reused instead of starting a second one. It restarted
  once mid-task; the page was reloaded and re-verified after.

### Still open

- The `Log In` link points at `/login`, which does not exist yet.
- `Skip` and `Get Started Free` are non-functional buttons (no destination wired).
- The screen is page one of three; the two pagination dots after it have no
  screens behind them yet.
- Pixel-level differences remain in the doodle (the mascot and brand marks are
  hand-drawn approximations of the reference art, not the original asset).
- `AGENT.md` was written by the agent on the user's behalf — the user should review
  and adjust the rules, since it is meant to be *their* rulebook.
- Not checked on a real device or in Safari/Firefox; only Chromium at 393 × 852.

---

## 2026-10-09 — Build the social-automation app (16 more screens)

**Request.** "Create these screens in Next.js — this is a social media automation
app after all." Reference: `2.png`, a 16-screen sheet. One brand decision was
taken up front with the user: the mockup's "Better WebStack" welcome screen was
**restyled as AutoMate** rather than introducing a second brand.

### What was built

16 screens, plus an index, all statically prerendered:

| # | Route | Screen |
| --- | --- | --- |
| 02 | `/welcome` | Welcome — crown doodle, outlined "Mate", social glyphs, black CTA |
| 03 | `/signup` | Create your account — fields, Google/Apple OAuth |
| 04 | `/connect` | Connect social accounts — Instagram + Messenger cards |
| 05 | `/home` | Dashboard — 4 stat tiles, today's activity |
| 06 | `/automations` | Automation library with Use actions |
| 07 | `/automations/select-post` | Pick the trigger post |
| 08 | `/automations/new` | Trigger + action builder, active toggle |
| 09 | `/automations/flow` | Step diagram with connectors |
| 10 | `/inbox` | Conversation list |
| 11 | `/inbox/[id]` | Chat thread with link-preview card |
| 12 | `/leads` | Leads with status pills |
| 13 | `/analytics` | Metrics + area chart with tooltip |
| 14 | `/broadcast` | Broadcast message composer |
| 15 | `/schedule` | Active hours, days, timezone |
| 16 | `/notifications` | Activity + system feed |
| 17 | `/profile` | Account menu, theme toggle, log out |

The onboarding screen at `/` was kept and its CTAs were wired up:
Skip → `/home`, Get Started Free → `/welcome`, Log In → `/signup`.

New files: `lib/data.ts` (typed mock data + a single `Tint` → Tailwind class
map), `components/app/line-icons.tsx`, `components/app/form-icons.tsx`,
`components/app/shell.tsx`, `components/app/ui.tsx`, `components/app/bottom-nav.tsx`,
and one `page.tsx` per route.

### Decisions worth remembering

- **One tint map.** Every coloured surface (stat tiles, icon squares, badges,
avatars) resolves through `tintClasses` in `lib/data.ts`, so the palette stays
consistent and re-theming is a one-file change.
- **The bottom nav's fourth slot is contextual** — it shows Automations normally
and swaps to Leads on `/leads`, matching the reference sheet. Done in
`bottom-nav.tsx` with `usePathname`.
- **No status bar anywhere**, per `AGENT.md` §3.
- Tabs, toggles, chips, post selection and the audience radios are interactive
  (client components) but do not filter or persist data — they are prototype
  affordances, not wired behaviour.

### Bugs found and fixed during the task

1. **Missing colour utilities.** `bg-pink-soft` and `bg-sky-soft` rendered as
   transparent. The tokens were correct in the source **and present in the
   production CSS** — the *dev server* had compiled `app/globals.css` before the
   new tokens existed and never recompiled the theme. Verified by grepping both
   the dev-served CSS (missing) and `.next/static/chunks/*.css` (present), then
   re-checked against a production server on :3100, where all four flow cards
   reported the right `rgb()` backgrounds. **If tints disappear, restart the dev
   server before changing any code.**
2. **Stale generated route types.** `PageProps<"/inbox/[id]">` failed to compile
   because `.next/types/routes.d.ts` still listed only `/`. Running a build (or
   hitting the dev server) regenerates it.
3. A doodle arrow overlapped the welcome copy; the doodle was moved and resized.
4. Sign-up's terms line was pinned to the bottom of the screen; it now sits under
   the Apple button, as in the reference.
5. `StatCard` gained a `positive` flag so a *falling* response time still reads as
   good news (green), like the reference.

### Verification

- `bunx tsc --noEmit` — passes. `bun run lint` — passes. `bun run build` — passes.
- All 18 routes return 200 from both a dev server and a production server.
- Visually checked at 393 × 852 and compared with the reference sheet: welcome,
  sign-up, home, conversation, analytics, automation flow, leads, create
  automation, notifications, profile.
- The remaining screens were confirmed by server-rendered content checks and the
  build (they were not eyeballed pixel-by-pixel).

### Still open

- Nothing is persisted: forms, toggles, tabs and buttons are UI only. No API, no
  auth, no database.
- `/` (AutoMate onboarding) and `/welcome` are two welcome-ish screens back to
  back. The user chose to keep both; the flow is onboarding → welcome → sign-up.
- `src`-less link previews and menu rows point at `#`.
- The reference sheet draws a phone frame and iOS status bar around every screen.
  Those are deliberately not implemented.

---

## 2026-10-25 — Production build and first GitHub release (v0.1.0)

**Request.** Build the AutoMate app and publish a runnable build to a GitHub
release.

### What was built

- `next.config.ts` now sets `output: "standalone"`, so `bun run build` emits a
  self-contained server at `.next/standalone`.
- Packaged the standalone server with `public/` and `.next/static/`, a
  schema-only SQLite auth database (no user rows) and a `RUN.md` with the
  environment table and PWA install steps.
- Release asset: `automate-v0.1.0-linux-x64.tar.gz` (Node 20+, Linux x64).

### Verification

- `bun run build` — passes (33 routes generated).
- Unpacked the artifact and ran `node server.js`:
  - `/` 200, `/signin` 200, `/manifest.webmanifest` 200
  - `/api/auth/ok` 200
  - `POST /api/auth/sign-up/email` 200 against a scratch database, then reset
    to schema-only.
- `/home` returns 307 to sign-in when unauthenticated, as designed.

### Still open

- Next.js 16.4.0 reports a security advisory; the build stops once to show the
  upgrade recommendation. Upgrade before exposing it to untrusted traffic.
- The artifact is Linux x64 only: `better-sqlite3` and `sharp` ship
  platform-specific binaries, so rebuild on the target platform for other OSes.
- There is no APK: AutoMate is a PWA. Install it from the browser with
  "Add to Home Screen".

---

## 2026-10-25 — Android APK (v0.2.0)

**Request.** Package AutoMate as an installable Android APK and publish it to the
`PiyushBuildsAI/Social-Automation` GitHub release. Scope for this build: install +
in-app notifications only; the phone must not need a server.

### What was built

- **Capacitor 6.2.2** wrapper in `android/` — app ID
  `com.piyushbuildsai.automate`, label `AutoMate`, version `0.2.0`
  (`versionCode 2`), `webDir: out`, HTTPS local scheme.
- **Offline static export** via `scripts/build-mobile-web.sh`. The script
  temporarily moves `app/api` and `proxy.ts`, removes the cacheComponents-only
  `instant` export from `app/layout.tsx`, and builds with
  `MOBILE_EXPORT=1 MOBILE_DEMO=1 NEXT_PUBLIC_MOBILE_DEMO=1`. It restores
  everything in an EXIT trap and automatically retries Next's one-time security
  advisory pause.
- **Demo session** in `lib/session.ts` plus `lib/mobile.ts`. In the APK,
  onboarding CTAs, sign-in and sign-up all enter `/home` without touching the
  missing auth API; the profile action becomes “Back to Home”.
- **Notifications**: the in-app notification feed at `/notifications` is linked
  from a bell on Home and from the Notifications row in Profile.
- **Branding**: adaptive/legacy launcher icons and splash images generated from
  `public/icons/icon-512.png` and `icon-maskable-512.png`.
- **Reproducible APK script**: `scripts/build-apk.sh` refreshes the web bundle,
  runs `cap sync android`, compiles a release APK, zipaligns and signs it, then
  writes `dist/automate-v0.2.0.apk` and its SHA-256 file.

### Verification

- `bun run lint` — passes (`android/**` added to ESLint ignores because Capacitor
  copies minified web assets into the project).
- `bun run build` — passes; the normal standalone web build is unchanged.
- `bash scripts/build-mobile-web.sh` — exits 0, writes all 32 static routes.
- Browser check of the export: `/`, `/home`, `/inbox`, `/inbox/priya`,
  `/notifications`, `/profile`; client-side navigation, Home bell, and demo
  sign-out label all work with no console errors.
- `apksigner verify` — v1, v2 and v3 signatures verify. `aapt dump badging`
  reports `com.piyushbuildsai.automate`, versionCode 2, versionName 0.2.0.
- APK size 4.1 MB; SHA-256
  `a33245a2673f0612a9568efdcf088d06e7bbe6a02402abb3d4979be54447c6d2`.

### Failed / unverified

- **No Android runtime test.** Both the new `automate-test` AVD and the existing
  `salonpro` AVD crash during boot on this host (QEMU dies even with `-gpu off`
  and Vulkan disabled), and no physical device is attached. The static bundle was
  tested in Chromium, but the APK was not launched on a device.
- Some Profile settings rows still point at `/settings/*` placeholder routes that
  do not exist; they are outside this install/notifications scope.
- **No real push notifications.** The app has an in-app activity feed only. Push
  notifications when the app is closed would need FCM (or web-push) plus a
  backend.
- The APK uses a demo session: no real login, API, or SQLite database.

### Release

- GitHub release `v0.2.0`, asset `automate-v0.2.0.apk`.
- Next.js 16.4.0 is affected by a security advisory; upgrade to 16.4.3 before
  exposing the server build to untrusted traffic.
