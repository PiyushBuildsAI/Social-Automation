import Link from "next/link";

import {
  Crown,
  InstagramGlyph,
  MessengerGlyph,
} from "@/components/automate-logo";
import { ArrowRight } from "@/components/icons";
import { SlashMarks, Squiggle } from "@/components/decorations";
import { ScreenShell } from "@/components/app/shell";
import { Sparkle } from "@/components/app/ui";

function Smiley({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <circle cx="24" cy="24" r="23" fill="#fbbf24" />
      <circle cx="24" cy="24" r="23" fill="none" stroke="#2b2340" strokeWidth="2.4" />
      <path
        d="M15 20c0-2.4 1.8-4.2 4-4.2s4 1.8 4 4.2c0 2.3-1.8 4.2-4 4.2s-4-1.9-4-4.2Zm10 0c0-2.4 1.8-4.2 4-4.2s4 1.8 4 4.2c0 2.3-1.8 4.2-4 4.2s-4-1.9-4-4.2Z"
        fill="#2b2340"
      />
      <path
        d="M15.5 29c2 4.4 5.2 6.4 8.5 6.4s6.5-2 8.5-6.4"
        stroke="#2b2340"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function WelcomeScreen() {
  return (
    <ScreenShell className="px-7 pt-10 pb-8">
      {/* doodles */}
      <Crown className="absolute top-[54px] left-8 h-[42px] w-[54px] -rotate-12" />
      <Sparkle className="absolute top-[46px] right-12 h-5 w-5" />
      <Sparkle className="absolute top-[92px] right-7 h-3.5 w-3.5" color="#8b5cf6" />
      <SlashMarks
        strokes={3}
        className="absolute top-[210px] -right-1 h-[22px] w-[26px] text-sun"
      />
      <svg
        viewBox="0 0 40 60"
        aria-hidden
        className="absolute top-[268px] left-2 h-[62px] w-[40px] text-sun"
        fill="none"
      >
        <path
          d="M30 4C10 18 8 34 22 54"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M14 46 22 55 30 45"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        viewBox="0 0 90 40"
        aria-hidden
        className="absolute top-[246px] right-1 h-[42px] w-[70px] text-brand"
        fill="none"
      >
        <path
          d="M6 34C14 10 40 4 84 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M72 3 84 10 73 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h1 className="mt-14 text-center font-display text-[50px] leading-[1.02] font-extrabold tracking-tight text-ink">
        Auto
        <br />
        <span className="text-transparent [-webkit-text-stroke:2.4px_#7c3aed]">
          Mate
        </span>
      </h1>

      <div className="relative mt-8 flex items-center justify-center gap-4">
        <InstagramGlyph className="h-[64px] w-[64px] -rotate-6" />
        <MessengerGlyph className="h-[64px] w-[64px] translate-y-[-6px]" />
        <Smiley className="h-[64px] w-[64px] rotate-6" />
        <Sparkle className="absolute -right-1 -bottom-3 h-4 w-4" />
        <Sparkle className="absolute -left-2 top-1 h-3 w-3" color="#7c3aed" />
      </div>

      <p className="mx-auto mt-8 max-w-[300px] text-center font-sans text-[17.5px] leading-[1.5] font-semibold text-ink-soft">
        Turn comments and DMs into
        <br />
        <span className="relative inline-block">
          real conversations
          <Squiggle className="absolute -bottom-1 left-0 h-[7px] w-full text-sun" />
        </span>
        <br />
        automatically.
      </p>

      <div className="mt-auto pt-8">
        <Link
          href="/signup"
          className="flex h-[62px] w-full items-center justify-center gap-3 rounded-full bg-ink font-display text-[20px] font-bold text-white transition-transform active:scale-[0.99]"
        >
          Get Started
          <ArrowRight className="h-[21px] w-[21px]" />
        </Link>
        <p className="mt-4 text-center font-sans text-[14px] font-semibold text-ink-soft">
          No credit card required
        </p>
      </div>
    </ScreenShell>
  );
}
