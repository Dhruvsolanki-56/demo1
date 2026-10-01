import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "./SmoothScroll";

/**
 * Scroll-triggered counter, as on the reference site (renders 0, counts up
 * when scrolled into view).
 *
 * `value` accepts the display string ("35+", "1700+", "18") so callers keep
 * their copy intact — we animate the numeric part and re-attach the suffix.
 */
export default function CountUp({ value, className = "", duration = 1800 }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const raw = String(value ?? "");
  const match = raw.match(/^(\D*)([\d.,]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const suffix = match ? match[3] : "";
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;

  const [display, setDisplay] = useState(() => (Number.isNaN(target) ? raw : `${prefix}0${suffix}`));

  useEffect(() => {
    if (Number.isNaN(target)) return undefined;
    if (reduced) {
      setDisplay(raw);
      return undefined;
    }
    if (!inView) return undefined;

    let frame;
    const start = performance.now();
    // easeOutExpo — fast take-off, long settle. Reads as "counting up".
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const n = target * ease(t);
      const shown = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString();
      setDisplay(`${prefix}${shown}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, target, duration, prefix, suffix, decimals, raw]);

  return (
    <span ref={ref} className={className}>
      {/* Assistive tech gets the final figure, never the ticking intermediate values. */}
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{raw}</span>
    </span>
  );
}
