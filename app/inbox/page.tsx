import Link from "next/link";

import { BottomNav } from "@/components/app/bottom-nav";
import { ScreenShell } from "@/components/app/shell";
import { Avatar, TabPills } from "@/components/app/ui";
import { FilterIcon, SearchIcon } from "@/components/app/line-icons";
import { conversations } from "@/lib/data";
import { requireSession } from "@/lib/session";

export default async function InboxScreen() {
  await requireSession();
  return (
    <ScreenShell surface>
      <div className="flex-1 overflow-y-auto px-5 pt-6">
        <header className="flex items-center justify-between">
          <h1 className="font-display text-[26px] font-extrabold text-ink">Inbox</h1>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Search conversations"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-line"
            >
              <SearchIcon className="h-[21px] w-[21px]" />
            </button>
            <button
              type="button"
              aria-label="Filter conversations"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-line"
            >
              <FilterIcon className="h-[21px] w-[21px]" />
            </button>
          </div>
        </header>

        <TabPills
          className="mt-4"
          tabs={[
            { label: "All", count: 24 },
            { label: "Unread", count: 8 },
            { label: "Leads", count: 12 },
          ]}
        />

        <ul className="mt-4 flex flex-col gap-2">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <Link
                href={`/inbox/${conversation.id}`}
                className="flex items-center gap-3.5 rounded-[20px] bg-white p-3.5 transition-colors hover:bg-brand-tint"
              >
                <Avatar name={conversation.name} tint={conversation.tint} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-[14.5px] font-bold text-ink">
                    {conversation.name}
                  </p>
                  <p className="truncate font-sans text-[12.5px] font-semibold text-ink-soft">
                    {conversation.preview}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="font-sans text-[11.5px] font-semibold text-ink-faint">
                    {conversation.time}
                  </span>
                  {conversation.unread ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <BottomNav />
    </ScreenShell>
  );
}
