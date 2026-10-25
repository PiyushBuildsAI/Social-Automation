# AutoMate: Application Architecture & Logic Documentation

## 1. Project Overview
AutoMate is a social media automation platform designed as a mobile-first web application. The core value proposition is enabling users (specifically creators and small businesses) to automate repetitive social media tasks like responding to DMs and comments.

## 2. Technical Stack
- **Framework:** Next.js 16.4 (App Router)
- **Language:** TypeScript (Strict)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/turbopack`)
- **State/Data:** Managed via static mock data (`lib/data.ts`) with a design-to-component mapping approach.
- **Components:** Modular UI using standard `ScreenShell` wrappers for consistent layout.

## 3. Application Architecture
The application is structured into three distinct functional loops:

1.  **Onboarding Loop:** (Screens 01-04) - Focused on acquisition. Hand-drawn aesthetic, high-impact visuals, and standard OAuth-ready patterns.
2.  **Automation Loop:** (Screens 05-09) - The core functional engine. Handles creation, listing, and flow visualization of automations.
3.  **Engagement & Utility Loop:** (Screens 10-17) - Operational screens for managing data (Inbox, Leads, Analytics) and account settings.

## 4. Key Logic & Functionality
### Data Layer (`lib/data.ts`)
- The app uses a strongly-typed schema to ensure consistency across screens.
- **Tints:** The app uses a color-tint system (`violet`, `pink`, `mint`, `amber`, `sky`) to differentiate automation categories and activity types. This ensures visual consistency across the "Dashboard" and "Automation" screens.

### Navigation Logic
- The app uses a `ScreenShell` component which provides the common layout (header, main container, bottom navigation).
- Navigation is linear and breadcrumb-based, designed to guide the user from discovery to automation deployment.

### Automation Engine (Simulated)
- **Triggers:** Currently limited to "Keyword-based comment triggers" and "New follower" events.
- **Actions:** Includes "Send DM" and "Deliver Link".
- **States:** Automations are togglable (Active/Inactive), and flows are visualized using a connector-step diagram.

## 5. UI/UX Patterns
- **Card-Based UI:** The entire interface is composed of rounded-corner containers (standardized at `rounded-[22px]`).
- **Decorative Flourishes:** Uses SVG-based `SlashMarks`, `Squiggle`, and `UnderlineSwoosh` to provide a "human-made" aesthetic, counteracting the rigidity of the grid.
- **Component-Driven Layouts:** Common elements like `StatCard`, `IconTile`, and `Toggle` are abstracted into `@/components/app/ui` to maintain identical visual weight across the dashboard, analytics, and automation screens.

## 6. Current Operational State
- The app is a high-fidelity prototype. Functional components (like `signin` or `broadcast`) contain the UI logic but depend on mocks or incomplete auth handshakes for state management.
- The project is fully prerendered statically, making it extremely fast but currently lacking real-time data persistence.
