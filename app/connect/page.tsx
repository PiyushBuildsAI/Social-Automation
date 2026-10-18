import Link from "next/link";
import type { ReactNode } from "react";

import { FacebookGlyph, InstagramGlyph } from "@/components/automate-logo";
import { ScreenShell } from "@/components/app/shell";
import { Sparkle } from "@/components/app/ui";

export default function ConnectScreen() {
  return (
    <ScreenShell className="px-6 pt-8 pb-8">
      <Sparkle className="absolute top-[46px] right-24 h-4 w-4" />
      <Sparkle className="absolute top-[92px] right-10 h-5 w-5" />

      <h1 className="font-display text-[27px] leading-[1.15] font-extrabold text-ink">
        Let&apos;s connect
        <br />
        your <span className="text-brand">social accounts</span>
      </h1>
      <p className="mt-2.5 font-sans text-[14px] leading-[1.5] font-semibold text-ink-soft">
        Link your Instagram and Facebook accounts to start automating.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <ConnectCard
          tint="pink"
          title="Instagram"
          subtitle="Professional Account"
          status="Not connected"
          glyph={<InstagramGlyph className="h-[46px] w-[46px]" />}
        />
        <ConnectCard
          tint="sky"
          title="Facebook Messenger"
          subtitle="Page Connection"
          status="Not connected"
          glyph={<FacebookGlyph className="h-[46px] w-[46px]" />}
        />
      </div>

      <div className="mt-auto pt-8">
        <Link
          href="/home"
          className="flex h-[54px] w-full items-center justify-center rounded-full font-display text-[17px] font-bold text-ink-soft transition-colors hover:bg-line"
        >
          Skip for now
        </Link>
      </div>
    </ScreenShell>
  );
}

function ConnectCard({
  tint,
  title,
  subtitle,
  status,
  glyph,
}: {
  tint: "pink" | "sky";
  title: string;
  subtitle: string;
  status: string;
  glyph: ReactNode;
}) {
  const surface = tint === "pink" ? "bg-pink-soft" : "bg-sky-soft";

  return (
    <div className={`rounded-[26px] ${surface} p-4`}>
      <div className="flex items-center gap-3.5">
        <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[18px] bg-white">
          {glyph}
        </span>
        <div className="min-w-0">
          <p className="font-display text-[17px] font-extrabold text-ink">{title}</p>
          <p className="font-sans text-[12.5px] font-semibold text-ink-soft">
            {subtitle}
          </p>
          <p className="mt-1 flex items-center gap-1 font-sans text-[12px] font-bold text-ink-faint">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
            {status}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="mt-3.5 flex h-[46px] w-full items-center justify-center gap-2 rounded-2xl border border-white bg-white font-sans text-[15px] font-bold text-ink transition-colors hover:bg-surface"
      >
        Connect
      </button>
    </div>
  );
}
