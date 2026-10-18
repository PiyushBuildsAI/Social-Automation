import type { ReactNode } from "react";

import { Sparkle } from "@/components/app/ui";
import { BottomNav } from "@/components/app/bottom-nav";
import { ScreenShell } from "@/components/app/shell";
import {
  ChatIcon,
  GaugeIcon,
  BoltIcon,
  SendIcon,
  UserPlusIcon,
} from "@/components/app/line-icons";
import { activity, stats, tintClasses, type Tint } from "@/lib/data";
import { requireSession } from "@/lib/session";

const statIcons = [
  <ChatIcon key="c" className="h-[17px] w-[17px]" />,
  <UserPlusIcon key="u" className="h-[17px] w-[17px]" />,
  <BoltIcon key="b" className="h-[15px] w-[15px]" />,
  <GaugeIcon key="g" className="h-[17px] w-[17px]" />,
];

const activityIcons: Record<string, ReactNode> = {
  a1: <UserPlusIcon className="h-[19px] w-[19px]" />,
  a2: <SendIcon className="h-[16px] w-[16px]" />,
  a3: <ChatIcon className="h-[19px] w-[19px]" />,
};

export default async function HomeScreen() {
  const { user } = await requireSession();
  return (
    <ScreenShell surface>
      <div className="flex-1 overflow-y-auto px-5 pt-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-display text-[24px] leading-tight font-extrabold text-ink">
              Hey {user.name.split(" ")[0]}! <span aria-hidden>👋</span>
            </h1>
            <p className="mt-1 font-sans text-[13px] leading-snug font-semibold text-ink-soft">
              Your automations are running smoothly.
            </p>
          </div>
          <Sparkle className="h-6 w-6" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <StatTile key={stat.label} stat={stat} icon={statIcons[i]} />
          ))}
        </div>

        <div className="mt-6">
          <h2 className="font-display text-[16px] font-bold text-ink">
            Today&apos;s Activity
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5">
            {activity.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-[20px] border border-line bg-white p-3.5"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] ${tintClasses[item.tint].soft} ${tintClasses[item.tint].ink}`}
                >
                  {activityIcons[item.id]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-[13.5px] font-bold text-ink">
                    {item.title}
                  </p>
                  <p className="truncate font-sans text-[12px] font-semibold text-ink-soft">
                    {item.body}
                  </p>
                </div>
                <span className="shrink-0 font-sans text-[11.5px] font-semibold text-ink-faint">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BottomNav />
    </ScreenShell>
  );
}

function StatTile({
  stat,
  icon,
}: {
  stat: { label: string; value: string; delta: string; trend: "up" | "down" | "flat"; tint: Tint };
  icon: ReactNode;
}) {
  const tone = tintClasses[stat.tint].soft;
  const ink = tintClasses[stat.tint].ink;
  const deltaTone = stat.trend === "up" ? "text-mint" : "text-ink-soft";

  return (
    <div className={`rounded-[20px] p-3.5 ${tone}`}>
      <div className="flex items-start justify-between">
        <p className="min-h-[30px] max-w-[86px] font-sans text-[12px] leading-tight font-bold text-ink-soft">
          {stat.label}
        </p>
        <span className={ink}>{icon}</span>
      </div>
      <p className="mt-2 font-display text-[27px] leading-none font-extrabold text-ink">
        {stat.value}
      </p>
      <p className={`mt-1 font-sans text-[11.5px] font-bold ${deltaTone}`}>
        {stat.trend === "up" ? "↗ " : ""}
        {stat.delta}
      </p>
    </div>
  );
}
