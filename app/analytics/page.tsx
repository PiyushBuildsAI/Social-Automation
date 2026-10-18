import { ScreenHeader, ScreenShell } from "@/components/app/shell";
import { StatCard } from "@/components/app/ui";
import { ChevronDown } from "@/components/app/line-icons";
import { conversationsOverTime } from "@/lib/data";
import { requireSession } from "@/lib/session";

export default async function AnalyticsScreen() {
  await requireSession();
  return (
    <ScreenShell surface className="pt-2">
      <ScreenHeader
        title="Analytics"
        back="/home"
        right={
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 font-sans text-[12.5px] font-bold text-ink-soft"
          >
            Last 7 days
            <ChevronDown className="h-4 w-4" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Conversations"
            value="1,248"
            delta="+12%"
            trend="up"
            tint="pink"
          />
          <StatCard label="New Leads" value="320" delta="+18%" trend="up" tint="mint" />
          <StatCard label="Response Rate" value="98%" delta="+5%" trend="up" tint="sky" />
          <StatCard
            label="Avg. Response Time"
            value="2.4s"
            delta="-32%"
            trend="down"
            tint="amber"
            positive
          />
        </div>

        <h2 className="mt-6 font-display text-[16px] font-bold text-ink">
          Conversations Over Time
        </h2>

        <div className="mt-3 rounded-[22px] border border-line bg-white p-4">
          <Chart />
          <div className="mt-2 flex justify-between font-sans text-[10.5px] font-semibold text-ink-faint">
            {conversationsOverTime.map((point) => (
              <span key={point.day}>{point.day}</span>
            ))}
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}

/** Area chart plus the highlighted "Jan 6 · 124" tooltip from the reference. */
function Chart() {
  const width = 320;
  const height = 150;
  const padX = 10;
  const max = 150;
  const step = (width - padX * 2) / (conversationsOverTime.length - 1);

  const points = conversationsOverTime.map((point, i) => ({
    x: padX + i * step,
    y: height - (point.value / max) * height,
    ...point,
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${points[points.length - 1].x.toFixed(1)} ${height} L${padX} ${height} Z`;
  const peak = points[5];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[150px] w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="am-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.34" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            x2={width}
            y1={height * f}
            y2={height * f}
            stroke="#eceaf4"
            strokeWidth="1"
          />
        ))}
        <path d={area} fill="url(#am-area)" />
        <path
          d={line}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={peak.x} cy={peak.y} r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
      </svg>

      <div
        className="absolute -top-1 rounded-xl bg-white px-3 py-1.5 shadow-[0_10px_24px_-12px_rgba(43,35,64,0.5)]"
        style={{ left: `${(peak.x / width) * 100}%`, transform: "translateX(-50%)" }}
      >
        <p className="font-sans text-[9.5px] font-bold text-ink-faint">Jan 6</p>
        <p className="font-display text-[14px] leading-none font-extrabold text-ink">
          124
        </p>
      </div>
    </div>
  );
}
