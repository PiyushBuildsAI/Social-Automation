import Link from "next/link";
import type { ReactNode } from "react";

import { ChevronLeft } from "@/components/app/line-icons";

/**
 * Every screen renders inside this shell: a phone-sized column, centred on a
 * larger viewport. No device chrome and no status bar — this is an app screen.
 */
export function ScreenShell({
  children,
  className = "",
  surface = false,
}: {
  children: ReactNode;
  className?: string;
  surface?: boolean;
}) {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-[#efedf4] sm:p-6">
      <section
        className={`pwa-safe-insets relative flex w-full max-w-[430px] flex-col overflow-hidden sm:h-[852px] sm:rounded-[42px] sm:shadow-[0_34px_70px_-34px_rgba(43,35,64,0.5)] ${
          surface ? "bg-surface" : "bg-white"
        } ${className}`}
      >
        {children}
      </section>
    </div>
  );
}

/** Back chevron + title, with an optional trailing action. */
export function ScreenHeader({
  title,
  back,
  right,
  subtitle,
}: {
  title: string;
  back?: string;
  right?: ReactNode;
  subtitle?: string;
}) {
  return (
    <header className="flex shrink-0 items-center gap-3 px-5 pt-5 pb-3">
      {back ? (
        <Link
          href={back}
          aria-label="Go back"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-line"
        >
          <ChevronLeft className="h-[22px] w-[22px]" />
        </Link>
      ) : null}
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-[23px] leading-tight font-extrabold text-ink">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-0.5 font-sans text-[12.5px] font-semibold text-ink-soft">
            {subtitle}
          </p>
        ) : null}
      </div>
      {right}
    </header>
  );
}

/** Small uppercase-ish section label used between blocks. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[15px] font-bold text-ink">{children}</h2>
  );
}

/** White card with the app's standard border + radius. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[22px] border border-line bg-white ${className}`}
    >
      {children}
    </div>
  );
}
