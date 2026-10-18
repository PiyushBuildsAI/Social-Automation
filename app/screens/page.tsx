import Link from "next/link";

/** Handy index for reviewing every screen in the prototype. */
const screens = [
  { href: "/", label: "01 · Onboarding", note: "AutoMate welcome / value props" },
  { href: "/welcome", label: "02 · Welcome", note: "Social automation intro" },
  { href: "/signup", label: "03 · Create your account", note: "Sign-up form" },
  { href: "/connect", label: "04 · Connect social accounts", note: "Instagram + Messenger" },
  { href: "/home", label: "05 · Dashboard", note: "Stats + today's activity" },
  { href: "/automations", label: "06 · Automations", note: "Automation library" },
  { href: "/automations/select-post", label: "07 · Select Post", note: "Pick the trigger post" },
  { href: "/automations/new", label: "08 · Create Automation", note: "Trigger + action builder" },
  { href: "/automations/flow", label: "09 · Automation Flow", note: "Step diagram" },
  { href: "/inbox", label: "10 · Inbox", note: "Conversation list" },
  { href: "/inbox/priya", label: "11 · Conversation", note: "Chat with Priya Sharma" },
  { href: "/leads", label: "12 · Leads", note: "Captured leads" },
  { href: "/analytics", label: "13 · Analytics", note: "Metrics + chart" },
  { href: "/broadcast", label: "14 · Broadcast Message", note: "Send to a segment" },
  { href: "/schedule", label: "15 · Schedule Automation", note: "Active hours + days" },
  { href: "/notifications", label: "16 · Notifications", note: "Activity + system" },
  { href: "/profile", label: "17 · Profile", note: "Account menu + log out" },
];

export default function ScreensIndex() {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-[#efedf4] sm:p-6">
      <section className="w-full max-w-[430px] bg-white px-6 py-8 sm:rounded-[42px] sm:shadow-[0_34px_70px_-34px_rgba(43,35,64,0.5)]">
        <h1 className="font-display text-[28px] font-extrabold text-ink">
          AutoMate screens
        </h1>
        <p className="mt-1.5 font-sans text-[13.5px] font-semibold text-ink-soft">
          Every screen in this prototype, in flow order.
        </p>

        <ul className="mt-5 flex flex-col gap-2">
          {screens.map((screen) => (
            <li key={screen.href}>
              <Link
                href={screen.href}
                className="flex items-center gap-3 rounded-[18px] border border-line p-3.5 transition-colors hover:bg-brand-tint"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-sans text-[14px] font-bold text-ink">
                    {screen.label}
                  </span>
                  <span className="block font-sans text-[11.5px] font-semibold text-ink-soft">
                    {screen.note}
                  </span>
                </span>
                <svg viewBox="0 0 12 16" aria-hidden className="h-4 w-3 text-ink-faint">
                  <path
                    d="M2 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
