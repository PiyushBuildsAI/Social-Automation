import type { Metadata } from "next";

import { AutoMateLogo } from "@/components/automate-logo";
import { Sparkle } from "@/components/app/ui";
import { RetryButton } from "@/components/pwa/retry-button";

/** Precached by the service worker as the fallback for offline navigations. */
export const metadata: Metadata = {
  title: "Offline — AutoMate",
  robots: { index: false, follow: false },
};

export default function OfflineScreen() {
  return (
    <div className="pwa-safe-insets flex min-h-dvh w-full flex-col items-center justify-center bg-white px-8 text-center">
      <span className="relative">
        <span className="flex h-[86px] w-[86px] items-center justify-center rounded-[26px] bg-brand-tint">
          <AutoMateLogo className="h-12 w-12" />
        </span>
        <Sparkle className="absolute -top-2 -right-3 h-5 w-5 rotate-12" />
      </span>

      <h1 className="mt-6 font-display text-[26px] font-extrabold text-ink">
        You&apos;re offline
      </h1>
      <p className="mt-2 max-w-[280px] font-sans text-[13.5px] leading-relaxed font-semibold text-ink-soft">
        AutoMate needs a connection to load your automations and messages. Your
        saved screens will be right here when you&apos;re back.
      </p>

      <RetryButton />

      <p className="mt-6 font-sans text-[11.5px] font-semibold text-ink-faint">
        Tip: this screen is cached on your device, so it works instantly.
      </p>
    </div>
  );
}
