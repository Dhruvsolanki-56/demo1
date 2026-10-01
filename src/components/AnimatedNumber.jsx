import React, { useEffect, useRef, useState } from "react";

/**
 * Counts up to a number the first time it scrolls into view. Purely a
 * presentation animation -- the value passed in and the value ultimately
 * displayed are identical (e.g. "35+" counts 0 -> 35 then shows "35+"),
 * so this never changes what text a visitor ends up reading, only how it
 * arrives on screen.
 */
export default function AnimatedNumber({ value, duration = 1200, className = "" }) {
  const match = /^(\d+)(.*)$/.exec(String(value));
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : 0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
