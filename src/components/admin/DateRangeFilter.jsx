import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Calendar as CalendarIcon, X, ChevronDown } from "lucide-react";
import MiniCalendar from "./MiniCalendar";

const PRESETS = [
  { label: "Today", days: 0 },
  { label: "Last 7 days", days: 6 },
  { label: "Last 30 days", days: 29 },
  { label: "Last 90 days", days: 89 },
];

function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDisplay(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

/**
 * Custom date-range filter: one button showing the active range (or a
 * neutral placeholder), opening a popover with one-click presets plus two
 * real calendar pickers for a custom range -- replaces native <input
 * type="date">, whose empty-state renders unstylable, unlabeled grey
 * dd/mm/yyyy placeholder segments in every browser.
 */
export default function DateRangeFilter({ idPrefix, from, to, onFromChange, onToChange }) {
  const [open, setOpen] = useState(false);
  const [picking, setPicking] = useState("from"); // which calendar is active: "from" | "to"
  const hasRange = !!(from || to);

  const applyPreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onFromChange(toISODate(start));
    onToChange(toISODate(end));
    setOpen(false);
  };

  const clear = (e) => {
    e.stopPropagation();
    onFromChange("");
    onToChange("");
  };

  return (
    <Popover.Root open={open} onOpenChange={(next) => { setOpen(next); if (next) setPicking("from"); }}>
      <Popover.Trigger asChild>
        <button
          type="button"
          id={`${idPrefix}-trigger`}
          className={`input flex items-center gap-2 !w-auto text-left ${hasRange ? "text-slate-700" : "text-slate-400"}`}
        >
          <CalendarIcon size={15} className="shrink-0 text-slate-400" />
          {hasRange ? (
            <span className="whitespace-nowrap text-sm">
              {from ? formatDisplay(from) : "Any"} &ndash; {to ? formatDisplay(to) : "Any"}
            </span>
          ) : (
            <span className="text-sm">Date range</span>
          )}
          {hasRange ? (
            <span onClick={clear} role="button" aria-label="Clear date range" className="ml-1 text-slate-400 hover:text-slate-600">
              <X size={13} />
            </span>
          ) : (
            <ChevronDown size={13} className="text-slate-400" />
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className="z-30 w-[calc(100vw-2rem)] max-w-[21rem] rounded-xl border border-slate-200 bg-white p-4 shadow-card-hover"
        >
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-2">Quick Ranges</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p.days)}
                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-2">Custom Range</p>
          <div className="flex rounded-lg border border-slate-200 p-1 bg-slate-50 mb-3">
            <button
              type="button"
              onClick={() => setPicking("from")}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors ${picking === "from" ? "bg-white shadow-sm text-primary-700" : "text-slate-500"}`}
            >
              From {from ? formatDisplay(from) : "—"}
            </button>
            <button
              type="button"
              onClick={() => setPicking("to")}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors ${picking === "to" ? "bg-white shadow-sm text-primary-700" : "text-slate-500"}`}
            >
              To {to ? formatDisplay(to) : "—"}
            </button>
          </div>

          {picking === "from" ? (
            <MiniCalendar value={from} onChange={onFromChange} maxDate={to || undefined} />
          ) : (
            <MiniCalendar value={to} onChange={onToChange} minDate={from || undefined} />
          )}

          {hasRange && (
            <button type="button" onClick={() => { onFromChange(""); onToChange(""); }} className="mt-3 text-xs font-semibold text-primary-600 hover:text-primary-800">
              Clear range
            </button>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
