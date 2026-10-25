import Link from "next/link";

import { AutoMateLogo } from "@/components/automate-logo";
import { SlashMarks, Squiggle, UnderlineSwoosh } from "@/components/decorations";
import { ArrowRight, Bolt, ChevronRight, GrowChart, Wand } from "@/components/icons";
import { OnboardingIllustration } from "@/components/onboarding-illustration";
import { isMobileDemo } from "@/lib/mobile";

const features = [
  {
    title: "Connect",
    copy: "Link your favorite apps in seconds",
    tile: "bg-brand-soft text-brand",
    icon: <Bolt className="h-7 w-7" />,
  },
  {
    title: "Automate",
    copy: "Set simple rules or use AI",
    tile: "bg-amber-soft text-amber-ink",
    icon: <Wand className="h-7 w-7" />,
  },
  {
    title: "Grow",
    copy: "Save time and get better results",
    tile: "bg-mint-soft text-mint",
    icon: <GrowChart className="h-7 w-7" />,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full justify-center bg-[#efedf4] sm:p-6">
      <section className="relative flex w-full max-w-[430px] flex-col overflow-hidden bg-white px-6 pt-5 pb-7 sm:h-[852px] sm:rounded-[42px] sm:shadow-[0_34px_70px_-34px_rgba(43,35,64,0.5)]">
        {/* brand bar */}
        <header className="flex items-start justify-between">
          <div className="flex items-start gap-2.5">
            <AutoMateLogo className="h-[42px] w-[42px] shrink-0" />
            <div className="relative pt-0.5">
              <p className="font-display text-[26px] leading-none font-extrabold tracking-tight text-ink">
                AutoMate
              </p>
              <p className="mt-[5px] font-sans text-[12.5px] leading-none font-semibold text-ink-soft">
                Less work. More you.
              </p>
              <Squiggle className="absolute -bottom-[7px] left-[42px] h-[7px] w-11 text-sun" />
            </div>
          </div>

          <Link
            href="/home"
            className="mt-0.5 flex items-center gap-1 rounded-full bg-[#f1f0f5] py-[11px] pr-3 pl-[18px] font-sans text-[16px] font-bold text-ink-soft transition-colors hover:bg-[#e9e7f0]"
          >
            Skip
            <ChevronRight className="h-[15px] w-[15px]" />
          </Link>
        </header>

        {/* headline — line breaks follow the reference */}
        <div className="relative mt-7">
          <SlashMarks
            strokes={2}
            className="absolute -top-4 right-3 h-[26px] w-[17px] text-sun"
          />
          <h1 className="font-display text-[34px] leading-[1.11] font-extrabold tracking-[-0.012em] text-ink">
            <span className="block">Automate</span>
            <span className="block">the boring stuff,</span>
            <span className="block text-brand">Focus on what</span>
            <span className="block text-brand">matters.</span>
          </h1>
        </div>

        {/* intro */}
        <div className="relative mt-4">
          <p className="font-sans text-[15.5px] leading-[1.5] font-semibold text-ink-soft">
            Connect your apps, set your rules,
            <br />
            and let AI do the repetitive work for you.
          </p>
          <UnderlineSwoosh className="absolute top-[25px] left-[46px] h-[7px] w-[104px] text-sun" />
          <SlashMarks
            strokes={3}
            className="absolute top-[24px] right-0 h-[22px] w-[26px] text-brand"
          />
        </div>

        {/* doodle */}
        <div className="mt-2 flex min-h-[176px] flex-1 items-center justify-center">
          <OnboardingIllustration className="h-full max-h-[238px] w-full" />
        </div>

        {/* value props */}
        <ul className="mt-1 grid grid-cols-3 gap-3">
          {features.map((feature) => (
            <li key={feature.title} className="flex flex-col items-center text-center">
              <span
                className={`flex h-[54px] w-[54px] items-center justify-center rounded-[18px] ${feature.tile}`}
              >
                {feature.icon}
              </span>
              <span className="mt-2.5 font-display text-[16.5px] leading-[1.15] font-bold text-ink">
                {feature.title}
              </span>
              <span className="mt-1 font-sans text-[12.5px] leading-[1.28] font-semibold text-ink-soft">
                {feature.copy}
              </span>
            </li>
          ))}
        </ul>

        {/* pagination */}
        <div className="mt-3.5 flex items-center justify-center gap-[9px]">
          <span className="h-[10px] w-[10px] rounded-full bg-brand" />
          <span className="h-2 w-2 rounded-full bg-[#d9d7e2]" />
          <span className="h-2 w-2 rounded-full bg-[#d9d7e2]" />
        </div>

        {/* call to action */}
        <div className="relative mt-4">
          <SlashMarks strokes={3} className="absolute -top-3.5 left-0 h-[19px] w-[26px] text-sun" />
          <SlashMarks
            strokes={4}
            className="absolute -top-3.5 right-0 h-[19px] w-[35px] text-brand"
          />
          <Link
            href={isMobileDemo ? "/home" : "/welcome"}
            className="relative flex h-[62px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-brand to-brand-bright font-display text-[20px] font-bold text-white shadow-[0_16px_30px_-12px_rgba(124,58,237,0.75)] transition-transform active:scale-[0.99]"
          >
            Get Started Free
            <ArrowRight className="h-[21px] w-[21px]" />
          </Link>
        </div>

        <p className="mt-[22px] text-center font-sans text-[13.5px] font-semibold text-ink-soft">
          Already have an account?{" "}
          <Link
            href={isMobileDemo ? "/home" : "/signup"}
            className="font-bold text-brand underline decoration-[1.5px] underline-offset-[3px]"
          >
            Log In
          </Link>
        </p>
      </section>
    </main>
  );
}
