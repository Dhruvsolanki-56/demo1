import React from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * Steel-blue credential panel listing genuine highlights for the section it
 * sits beside.
 */
export default function HighlightPanel({ icon: Icon, title, items = [], className = "" }) {
  return (
    <div className={`relative flex flex-col justify-center overflow-hidden rounded-[22px] bg-primary-600 p-8 sm:p-10 ${className}`}>
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border-[28px] border-white/[0.06]" />
      <div className="relative">
        {Icon && (
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-primary-950">
            <Icon size={24} />
          </div>
        )}
        {title && <h3 className="mb-5 font-display text-2xl font-medium text-white">{title}</h3>}
        <ul className="space-y-3.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[0.95rem] text-white/90">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
