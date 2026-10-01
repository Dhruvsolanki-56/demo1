import React from "react";
import { Link } from "react-router-dom";

/**
 * Figure contract per the dataviz skill: label (sentence case, no trailing
 * colon) + value (semibold, auto-compact) + optional sub-line. Optionally
 * a link so the number is also a way to *act* on it, not just read it.
 */
export default function StatTile({ label, value, icon: Icon, sub, href, iconClassName = "bg-primary-50 text-primary-600" }) {
  const content = (
    <div className="card card-hover p-5 h-full transition-transform duration-200 hover:-translate-y-0.5">
      {Icon && (
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${iconClassName}`}>
          <Icon size={20} />
        </div>
      )}
      <p className="text-2xl font-semibold text-primary-900 mt-3 tabular-nums">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );

  return href ? <Link to={href} className="block">{content}</Link> : content;
}
