import React from "react";

/**
 * Consistent title (+ optional subtitle) and right-aligned action-button row
 * used at the top of every admin page.
 */
export default function AdminPageHeader({ title, subtitle, icon: Icon, actions }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-primary-900 flex items-center gap-2">
          {Icon && <Icon size={20} />} {title}
        </h1>
        {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
