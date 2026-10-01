import React from "react";

/**
 * Soft, slowly-drifting gradient blobs -- gives a section real depth/motion
 * instead of a flat color background, without any imagery. Three blobs with
 * staggered drift animations (index.css .animate-blob-drift-*), each on its
 * own duration/delay so they never feel synchronized. Purely decorative
 * (aria-hidden, pointer-events-none) -- drop inside a `relative
 * overflow-hidden` parent. `prefers-reduced-motion` freezes the drift via
 * the CSS media query on the animation classes themselves.
 */
export default function GradientMesh({ variant = "light", className = "" }) {
  const isDark = variant === "dark";
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className={`absolute -top-1/4 -left-1/4 h-[60%] w-[60%] rounded-full blur-3xl animate-blob-drift-1 ${
          isDark ? "bg-accent-500/25" : "bg-primary-300/30"
        }`}
      />
      <div
        className={`absolute top-1/3 -right-1/4 h-[55%] w-[55%] rounded-full blur-3xl animate-blob-drift-2 ${
          isDark ? "bg-primary-400/20" : "bg-accent-300/25"
        }`}
      />
      <div
        className={`absolute -bottom-1/4 left-1/3 h-[45%] w-[45%] rounded-full blur-3xl animate-blob-drift-3 ${
          isDark ? "bg-primary-600/25" : "bg-primary-200/25"
        }`}
      />
    </div>
  );
}
