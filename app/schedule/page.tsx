import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { Chip, Toggle } from "@/components/app/ui";
import { CaretSeparator } from "@/components/icons";
import { ClockIcon, ChevronDown } from "@/components/app/line-icons";
import { requireSession } from "@/lib/session";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default async function ScheduleScreen() {
  await requireSession();
  return (
    <ScreenShell surface className="pt-2">
      <ScreenHeader title="Schedule Automation" back="/home" />

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="rounded-[22px] border border-line bg-white p-4">
          <h2 className="font-display text-[15px] font-bold text-ink">Active Time</h2>
          <p className="mt-1 font-sans text-[12.5px] font-semibold text-ink-soft">
            Run automation only during these hours.
          </p>

          <div className="mt-3.5 flex items-center gap-2.5">
            <label className="flex-1">
              <span className="mb-1.5 block font-sans text-[11.5px] font-bold text-ink-faint">
                From
              </span>
              <select
                defaultValue="9"
                className="h-[50px] w-full appearance-none rounded-2xl bg-surface px-3.5 font-sans text-[14.5px] font-bold text-ink outline-none"
              >
                <option value="8">8:00 AM</option>
                <option value="9">9:00 AM</option>
                <option value="10">10:00 AM</option>
              </select>
            </label>

            <CaretSeparator className="mt-5 h-4 w-3 shrink-0 text-ink-faint" />

            <label className="flex-1">
              <span className="mb-1.5 block font-sans text-[11.5px] font-bold text-ink-faint">
                To
              </span>
              <select
                defaultValue="21"
                className="h-[50px] w-full appearance-none rounded-2xl bg-surface px-3.5 font-sans text-[14.5px] font-bold text-ink outline-none"
              >
                <option value="18">6:00 PM</option>
                <option value="20">8:00 PM</option>
                <option value="21">9:00 PM</option>
              </select>
            </label>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-brand-tint px-3.5 py-2.5">
            <ClockIcon className="h-[18px] w-[18px] text-brand" />
            <span className="font-sans text-[12.5px] font-bold text-brand">
              12 hours a day
            </span>
          </div>
        </div>

        <h2 className="mt-5 font-display text-[15px] font-bold text-ink">Days</h2>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {days.map((day, i) => (
            <Chip key={day} defaultSelected={i < 5}>
              {day}
            </Chip>
          ))}
        </div>

        <h2 className="mt-5 font-display text-[15px] font-bold text-ink">Timezone</h2>
        <div className="relative mt-2.5">
          <select
            defaultValue="ist"
            className="h-[54px] w-full appearance-none rounded-2xl border border-line bg-white px-4 font-sans text-[14px] font-bold text-ink outline-none"
          >
            <option value="ist">(UTC+05:30) Asia/Kolkata</option>
            <option value="utc">(UTC+00:00) UTC</option>
            <option value="est">(UTC-05:00) America/New_York</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-ink-faint" />
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-[22px] border border-line bg-white p-4">
          <Toggle />
          <span className="font-sans text-[14px] font-bold text-ink">
            Pause on holidays
          </span>
        </div>
      </div>

      <div className="shrink-0 px-5 pt-2 pb-7">
        <button
          type="button"
          className="flex h-[54px] w-full items-center justify-center rounded-full bg-gradient-to-r from-brand to-brand-bright font-display text-[17px] font-bold text-white shadow-[0_14px_26px_-12px_rgba(124,58,237,0.85)]"
        >
          Save Schedule
        </button>
      </div>
    </ScreenShell>
  );
}
