import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toISODate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

/**
 * A self-contained month-grid date picker -- replaces native <input
 * type="date">, whose empty-state dd/mm/yyyy placeholder segments can't be
 * restyled, relabeled, or made to look intentional in any browser.
 */
export default function MiniCalendar({ value, onChange, minDate, maxDate }) {
  const initial = value ? new Date(`${value}T00:00:00`) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const changeMonth = (delta) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
  };

  const isDisabled = (iso) => (minDate && iso < minDate) || (maxDate && iso > maxDate);
  const today = toISODate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  return (
    <div className="w-64">
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="icon-btn !h-7 !w-7">
          <ChevronLeft size={14} />
        </button>
        <span className="text-sm font-semibold text-slate-700">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="icon-btn !h-7 !w-7">
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="text-[10px] font-bold text-slate-400 py-1">{w}</span>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <span key={i} />;
          const iso = toISODate(viewYear, viewMonth, d);
          const selected = iso === value;
          const disabled = isDisabled(iso);
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              className={`h-7 w-7 rounded-full text-xs mx-auto transition-colors ${
                selected
                  ? "bg-primary-600 text-white font-semibold"
                  : iso === today
                  ? "border border-primary-300 text-primary-700"
                  : disabled
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-primary-50"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
