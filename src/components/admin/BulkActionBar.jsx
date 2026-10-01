import React from "react";
import { X } from "lucide-react";

/**
 * Sticky bottom bar shown when one or more rows are selected in a DataTable.
 * Pass `actions` ([{ label, icon?, onClick, variant? }], variant "danger" =
 * red button) for simple fixed buttons, or `children` for a custom control
 * (e.g. a "set status to..." select + Apply button).
 */
export default function BulkActionBar({ count, onClear, actions, children }) {
  if (count === 0) return null;
  return (
    <div className="sticky bottom-4 z-20 mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card-hover">
      <button onClick={onClear} className="icon-btn" aria-label="Clear selection">
        <X size={16} />
      </button>
      <span className="text-sm font-semibold text-slate-700">{count} selected</span>
      {children ? (
        <div className="flex flex-wrap items-center gap-2 ml-auto">{children}</div>
      ) : (
        <div className="flex flex-wrap gap-2 ml-auto">
          {actions.map(({ label, icon: Icon, onClick, variant }) => (
            <button
              key={label}
              onClick={onClick}
              className={variant === "danger" ? "btn-danger btn-sm" : "btn-outline btn-sm"}
            >
              {Icon && <Icon size={14} />} {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
