# AutoMate: Comprehensive Application Documentation

## 1. Executive Summary
AutoMate is a social media automation platform designed for creators and SMBs. It allows users to orchestrate "flows" of interactions (e.g., "if someone comments, send a DM"). The project is built as a high-fidelity mobile-first web prototype using the Next.js App Router.

## 2. Technical Infrastructure
### 2.1 Core Stack
- **Next.js 16.4 (App Router):** Utilizes `app/` folder structure, React Server Components (RSC) for initial page renders, and server actions for future state transitions.
- **Tailwind CSS v4:** Configuration is driven by the `@theme` directive, strictly defining the brand's primary color (`brand`), secondary colors (`mint`, `amber`, `sky`, `pink`, `violet`), and typography tokens.
- **TypeScript:** Enforced strict type checking. All domain models (`Automation`, `Lead`, `Conversation`) are centralized in `lib/data.ts`.

### 2.2 Directory Hierarchy
- `app/`: Contains the page definitions, grouped by feature sets (automations, inbox, leads, etc.).
- `components/`: Modularized into functional groups:
    - `app/`: Shells, navigation, and reusable data-driven UI components.
    - `auth/`: Forms and buttons for authentication workflows.
    - `pwa/`: Progressive Web App lifecycle components (service workers, install prompts).
- `lib/`: The source of truth for application types and mock data.
- `public/`: Assets, icons, and branding.

## 3. Architecture Deep-Dive: The "ScreenShell" Pattern
The entire application follows a "ScreenShell" architecture. Instead of complex CSS layouts per page, the `ScreenShell` (`components/app/shell.tsx`) provides:
- **Consistent Viewport:** Force-fitted to mobile dimensions (max-width 430px).
- **Global Surface:** Handles background/surface color transitions.
- **Structural Consistency:** Standardizes header placement, padding, and bottom-nav docking.

This allows developers to add new screens (e.g., `/notifications`) in minutes by just dropping a functional view into the shell.

## 4. Logical Engine: The State-Driven Mock System
Although the prototype currently uses `lib/data.ts` to mock state, it is structured to accept real data via standard React patterns.

### 4.1 Domain Models
- **`Automation`:** Contains metadata (ID, title, category, tint).
- **`FlowStep`:** A polymorphic model defining triggers/actions in an automation sequence.
- **`Tints`:** A predefined dictionary of UI colors (`violet`, `pink`, `mint`, `amber`, `sky`, `danger`). This drives the consistent appearance of tiles and icons throughout the app.

### 4.2 Pattern Library
- **Icon Mapping:** Components like `HomeScreen` and `AutomationFlowScreen` map IDs to specific icon components (`<BoltIcon />`, `<SendIcon />`), ensuring visual consistency across data-driven views.
- **Chart Visualization:** The analytics module (`app/analytics/page.tsx`) uses a custom SVG generator for the `Conversations Over Time` chart. This is a pure mathematical implementation based on the `conversationsOverTime` array.

## 5. UI/UX Philosophy
The project employs a "bubbly SaaS" aesthetic designed to maximize user engagement:
- **Rounded Containers:** `rounded-[22px]` is used globally to soften the edges, creating a non-threatening, accessible feel.
- **Decorative Flourishes:** `SlashMarks`, `Squiggle`, and `UnderlineSwoosh` are specifically implemented as SVG components to add a human-made touch to otherwise cold data layouts.
- **Color-Coding:** The usage of `tintClasses` ensures that every feature-category has a unique, soft color identity.

## 6. Development Workflow
### 6.1 Adding a New Screen
1. Create a folder in `app/`.
2. Implement the view using `ScreenShell`.
3. If new data is required, define the type in `lib/data.ts` and add a mock export.
4. Import required icons from `components/app/line-icons.tsx`.

### 6.2 Verification Standards
- All pages must be tested at `390px` width.
- No scroll overflow permitted on static pages.
- Accessibility is audited via screen-reader compatible semantic HTML (e.g., `aria-hidden` on decorative SVGs).

## 7. Future-Proofing
The codebase is structured to transition from static mocks to a dynamic back-end (e.g., Supabase or Node.js) with minimal churn:
- **Data abstraction:** Components receive data as props.
- **Async/Await:** Screens are defined as `async` components, allowing for seamless integration of `db.query()` calls directly in the page files.
- **Type Safety:** The strict TypeScript types provide a guaranteed interface for all API responses once they are integrated.

## 8. Appendix: Component Map
| Component | Purpose |
| :--- | :--- |
| `ScreenShell` | Main layout container |
| `IconTile` | Standardized container for automation icons |
| `StatCard` | Standardized KPI display tile |
| `Toggle` | UI-driven automation status controller |
| `BottomNav` | Persistent application navigation |
| `SlashMarks` | Decorative flourish (AI/Playful) |
| `Squiggle` | Decorative underline (AI/Playful) |
