import React from "react";
import { Link } from "react-router-dom";

/**
 * Horizontal bar ranking for a single measure across categories (funnel
 * stages, top products, top countries...). One consistent hue — length
 * encodes magnitude, so no categorical palette is needed; the label and
 * value are always shown as text, so the bar is a visual aid, never the
 * only way to read the number.
 */
export default function RankedBarList({ items, getHref, emptyLabel = "No data yet." }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-slate-400 py-4">{emptyLabel}</p>;
  }

  const max = Math.max(1, ...items.map((i) => i.count));

  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const pct = Math.max(3, Math.round((item.count / max) * 100));
        const href = getHref ? getHref(item) : null;
        const row = (
          <div className="flex items-center gap-3">
            <span className="w-32 sm:w-40 shrink-0 truncate text-sm text-slate-600" title={item.label}>
              {item.label}
            </span>
            <span className="flex-1 h-5 rounded-full bg-slate-100 overflow-hidden">
              <span
                className="block h-full rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #4f56dd, #6b70e8)" }}
              />
            </span>
            <span className="w-10 shrink-0 text-right text-sm font-semibold text-primary-900 tabular-nums">{item.count}</span>
          </div>
        );
        return (
          <li key={item.key}>
            {href ? (
              <Link to={href} className="block rounded-md -mx-2 px-2 py-0.5 hover:bg-primary-50 transition-colors">
                {row}
              </Link>
            ) : (
              row
            )}
          </li>
        );
      })}
    </ul>
  );
}
