import React from "react";
import { X } from "lucide-react";

/**
 * Wraps a row of filter controls with an active-filter count and a one-click
 * "Clear filters" action -- the piece every hand-rolled admin filter row was
 * missing. `activeCount` should be the number of non-empty filter values the
 * caller is currently applying (excluding search text, typically).
 */
export default function FilterBar({ children, activeCount = 0, onClear }) {
  return (
    <div className="mb-4">
      <div className="flex flex-col lg:flex-row flex-wrap gap-3">{children}</div>
      {activeCount > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-slate-600">{activeCount} filter{activeCount === 1 ? "" : "s"} active</span>
          <button onClick={onClear} className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-800">
            <X size={12} /> Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
