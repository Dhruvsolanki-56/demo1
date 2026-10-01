import React from "react";

export function SkeletonProductCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-[4/3] rounded-none" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-3 w-full" />
        <div className="flex gap-2 pt-3">
          <div className="skeleton h-8 flex-1" />
          <div className="skeleton h-8 flex-1" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductGrid({ count = 6, gridClassName = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" }) {
  return (
    <div className={`grid ${gridClassName} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTableRows({ rows = 5, cols = 4 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <tr key={r}>
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c} className="p-3">
              <div className="skeleton h-4 w-full max-w-[10rem]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function SkeletonBlock({ className = "h-4 w-full" }) {
  return <div className={`skeleton ${className}`} />;
}
