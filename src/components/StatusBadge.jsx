import React from "react";

// Single source of truth for every status pill color in the admin panel --
// RFQ/enquiry workflow statuses and product active/inactive both resolve
// through this one map, so there's one semantic-color system, not two.
export const STATUS_COLORS = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  "Under Review": "bg-purple-100 text-purple-700",
  "Quotation Sent": "bg-indigo-100 text-indigo-700",
  Negotiation: "bg-orange-100 text-orange-700",
  Won: "bg-green-100 text-green-700",
  Closed: "bg-slate-200 text-slate-700",
  Rejected: "bg-red-100 text-red-700",
  Resolved: "bg-green-100 text-green-700",
  active: "bg-green-100 text-green-700",
  inactive: "bg-slate-200 text-slate-600",
};

export default function StatusBadge({ status, className = "" }) {
  const cls = STATUS_COLORS[status] || "bg-slate-100 text-slate-600";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${cls} ${className}`}>{status}</span>;
}
