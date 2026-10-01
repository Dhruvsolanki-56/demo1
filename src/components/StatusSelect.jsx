import React from "react";
import { STATUS_COLORS } from "./StatusBadge";

/**
 * Badge-styled native <select> for changing a record's status right from a
 * list row -- avoids the "open the record just to flip its status" click
 * tax on the common case. Falls back to StatusBadge's own color map so a
 * quick-changed row still reads the same as the read-only badge.
 */
export default function StatusSelect({ value, options, onChange, disabled }) {
  const cls = STATUS_COLORS[value] || "bg-slate-100 text-slate-600";
  return (
    <select
      value={value}
      disabled={disabled}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Change status"
      className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold cursor-pointer disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary-400 ${cls}`}
    >
      {options.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
