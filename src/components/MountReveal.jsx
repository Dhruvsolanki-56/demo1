import React, { useEffect, useState } from "react";

/**
 * Same fade+rise visual contract as Reveal.jsx, but triggers on mount (a
 * short delay) instead of IntersectionObserver -- for above-the-fold content
 * (the hero) that's visible on first paint and would never scroll into view,
 * so Reveal's scroll trigger would never fire for it. Kept as a separate
 * component rather than a mode flag on Reveal so each one's trigger contract
 * stays obvious at the call site.
 */
export default function MountReveal({ children, className = "", delay = 0, as: Tag = "div", ...rest }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), 50 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <Tag
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
