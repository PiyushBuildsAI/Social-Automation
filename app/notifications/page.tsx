import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { IconTile, Sparkle, TabPills } from "@/components/app/ui";
import {
  BellIcon,
  BoltIcon,
  ChatIcon,
  TagIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/app/line-icons";
import { notifications, tintClasses } from "@/lib/data";
import { requireSession } from "@/lib/session";

const kindIcons = {
  lead: <UsersIcon className="h-[20px] w-[20px]" />,
  automation: <BoltIcon className="h-[15px] w-[15px]" />,
  message: <ChatIcon className="h-[20px] w-[20px]" />,
  report: <TrophyIcon className="h-[20px] w-[20px]" />,
  follower: <BellIcon className="h-[20px] w-[20px]" />,
  failed: <TagIcon className="h-[20px] w-[20px]" />,
};

const iconFor: Record<string, keyof typeof kindIcons> = {
  n1: "lead",
  n2: "automation",
  n3: "message",
  n4: "report",
  n5: "follower",
  n6: "failed",
};

export default async function NotificationsScreen() {
  await requireSession();
  return (
    <ScreenShell surface className="pt-2">
      <ScreenHeader
        title="Notifications"
        back="/home"
        right={<Sparkle className="mr-1 h-5 w-5" />}
      />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <TabPills tabs={[{ label: "All" }, { label: "Activity" }, { label: "System" }]} />

        <ul className="mt-4 flex flex-col gap-2.5">
          {notifications.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3.5 rounded-[20px] border border-line bg-white p-3.5"
            >
              <IconTile tint={item.tint} className="h-10 w-10">
                {kindIcons[iconFor[item.id]]}
              </IconTile>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[13.5px] font-bold text-ink">
                  {item.title}
                </p>
                <p className="mt-0.5 font-sans text-[12px] font-semibold text-ink-soft">
                  {item.body}
                </p>
                <p className="mt-1 font-sans text-[11px] font-bold text-ink-faint">
                  {item.time}
                </p>
              </div>
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  item.kind === "system" ? "bg-line" : tintClasses[item.tint].dot
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
    </ScreenShell>
  );
}
