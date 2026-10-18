import { BottomNav } from "@/components/app/bottom-nav";
import { ScreenShell } from "@/components/app/shell";
import { Avatar, Badge, Sparkle, TabPills } from "@/components/app/ui";
import { FilterIcon, KebabIcon, PlusIcon } from "@/components/app/line-icons";
import { leads, type Lead, type Tint } from "@/lib/data";
import { requireSession } from "@/lib/session";

const statusTint: Record<Lead["status"], Tint> = {
  New: "violet",
  Qualified: "mint",
  Replied: "sky",
};

export default async function LeadsScreen() {
  await requireSession();
  return (
    <ScreenShell surface>
      <div className="flex-1 overflow-y-auto px-5 pt-6">
        <header className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 font-display text-[26px] font-extrabold text-ink">
            Leads
            <Sparkle className="h-5 w-5" />
          </h1>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Add lead"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-line"
            >
              <PlusIcon className="h-[21px] w-[21px]" />
            </button>
            <button
              type="button"
              aria-label="Filter leads"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-line"
            >
              <FilterIcon className="h-[21px] w-[21px]" />
            </button>
          </div>
        </header>

        <TabPills
          className="mt-4"
          tabs={[
            { label: "All", count: 56 },
            { label: "New", count: 12 },
            { label: "Qualified", count: 28 },
          ]}
        />

        <ul className="mt-4 flex flex-col gap-2.5">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="flex items-start gap-3.5 rounded-[20px] bg-white p-3.5"
            >
              <Avatar name={lead.name} tint={lead.tint} size={42} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-sans text-[14.5px] font-bold text-ink">
                  {lead.name}
                </p>
                <p className="truncate font-sans text-[12px] font-semibold text-ink-soft">
                  {lead.email}
                </p>
                <p className="mt-0.5 truncate font-sans text-[12px] font-semibold text-ink-faint">
                  {lead.note}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge tint={statusTint[lead.status]}>{lead.status}</Badge>
                  <span className="font-sans text-[11.5px] font-semibold text-ink-faint">
                    {lead.time}
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label={`Options for ${lead.name}`}
                className="text-ink-faint transition-colors hover:text-ink"
              >
                <KebabIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <BottomNav />
    </ScreenShell>
  );
}
