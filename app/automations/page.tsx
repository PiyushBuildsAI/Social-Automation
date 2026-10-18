import Link from "next/link";
import type { ReactNode } from "react";

import { BottomNav } from "@/components/app/bottom-nav";
import { ScreenShell } from "@/components/app/shell";
import { IconTile, Sparkle, TabPills } from "@/components/app/ui";
import {
  BoltIcon,
  MegaphoneIcon,
  SparklesIcon,
  TagIcon,
  TrophyIcon,
} from "@/components/app/line-icons";
import { automations, type Automation } from "@/lib/data";
import { requireSession } from "@/lib/session";

const icons: Record<Automation["id"], ReactNode> = {
  "send-guide": <MegaphoneIcon className="h-[21px] w-[21px]" />,
  welcome: <TrophyIcon className="h-[21px] w-[21px]" />,
  "capture-leads": <TagIcon className="h-[21px] w-[21px]" />,
  "product-inquiry": <SparklesIcon className="h-[21px] w-[21px]" />,
};

export default async function AutomationsScreen() {
  await requireSession();
  return (
    <ScreenShell surface>
      <div className="flex-1 overflow-y-auto px-5 pt-6">
        <div className="flex items-start justify-between">
          <h1 className="font-display text-[26px] font-extrabold text-ink">
            Autobudle
          </h1>
          <Sparkle className="mt-1 h-6 w-6 rotate-12" />
        </div>

        <TabPills
          className="mt-4"
          tabs={[
            { label: "All" },
            { label: "Lead Generation" },
            { label: "Sales" },
          ]}
        />

        <ul className="mt-4 flex flex-col gap-2.5">
          {automations.map((automation) => (
            <li
              key={automation.id}
              className="flex items-center gap-3.5 rounded-[22px] border border-line bg-white p-3.5"
            >
              <IconTile tint={automation.tint}>
                {icons[automation.id]}
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="truncate font-sans text-[14px] font-bold text-ink">
                  {automation.title}
                </p>
                <p className="truncate font-sans text-[12px] leading-snug font-semibold text-ink-soft">
                  {automation.description}
                </p>
              </div>
              <Link
                href="/automations/new"
                className="shrink-0 rounded-full bg-brand-soft px-4 py-2 font-sans text-[13px] font-bold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                Use
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/automations/new"
          className="mt-3 flex items-center justify-center gap-2 rounded-[22px] border border-dashed border-brand-bright bg-white py-4 font-sans text-[14px] font-bold text-brand"
        >
          <BoltIcon className="h-[17px] w-[17px]" />
          Build your own automation
        </Link>
      </div>

      <BottomNav />
    </ScreenShell>
  );
}
