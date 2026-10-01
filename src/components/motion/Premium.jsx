import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { usePrefersReducedMotion } from "./SmoothScroll";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Curtain reveal: the element is uncovered from the bottom edge up with a
 * clip-path, while its contents settle from a slight zoom. Used for photos.
 * `immediate` runs on mount (above the fold) instead of on scroll.
 */
export function ClipReveal({ children, className = "", delay = 0, immediate = false, from = "bottom" }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const hidden = from === "left" ? "inset(0% 100% 0% 0% round 28px)" : "inset(100% 0% 0% 0% round 28px)";
  const shown = "inset(0% 0% 0% 0% round 0px)";
  const trigger = immediate
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: { clipPath: hidden }, show: { clipPath: shown } }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <motion.div
        className="h-full w-full"
        variants={{ hidden: { scale: 1.12 }, show: { scale: 1 } }}
        transition={{ duration: 1.5, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Scroll-linked depth for a photo inside a rounded frame: it starts a touch
 * large and settles as the frame travels up the screen. Pair with an
 * overflow-hidden parent.
 */
export function ScrollScale({ children, className = "", from = 1.14, to = 1 }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const raw = useTransform(scrollYProgress, [0, 0.6], [from, to]);
  const scale = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Corner morph: a large radius on one corner opens out as the block scrolls
 * into view (the curved photo frame on the home page).
 */
export function CornerMorph({ children, className = "", min = 28, max = 240 }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const r = useTransform(scrollYProgress, [0, 1], [min, max]);
  const radius = useMotionTemplate`${r}px 28px 28px 28px`;

  if (reduced) {
    return (
      <div ref={ref} className={className} style={{ borderRadius: `${max}px 28px 28px 28px` }}>
        {children}
      </div>
    );
  }
  return (
    <motion.div ref={ref} className={className} style={{ borderRadius: radius }}>
      {children}
    </motion.div>
  );
}

/**
 * Soft light that follows the pointer across a dark panel.
 */
export function Spotlight({ children, className = "", color = "rgba(255,255,255,0.16)", size = 520 }) {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 65%)`;

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div className={`relative ${className}`} onMouseMove={reduced ? undefined : onMove} onMouseLeave={() => { x.set(-1000); y.set(-1000); }}>
      {!reduced && <motion.div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: bg }} aria-hidden="true" />}
      {children}
    </div>
  );
}

/**
 * The highlighted phrase in a heading: purple text with a pale ink band that
 * sweeps in underneath once the heading is on screen.
 */
export function Sweep({ children, className = "" }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <span className={`hl ${className}`}>{children}</span>;
  return (
    <motion.span
      className={`hl sweep ${className}`}
      initial={{ backgroundSize: "0% 0.32em" }}
      whileInView={{ backgroundSize: "100% 0.32em" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
    >
      {children}
    </motion.span>
  );
}

/**
 * Scales an element up from its bottom edge as it enters (the arc under the
 * figures on the home page).
 */
export function RiseFromBase({ children, className = "" }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "50% 100%" }}
      initial={{ scaleY: 0.2, scaleX: 0.7, opacity: 0 }}
      whileInView={{ scaleY: 1, scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Thin purple line across the top of the viewport while a route changes.
 */
export function RouteProgress() {
  const { pathname } = useLocation();
  const reduced = usePrefersReducedMotion();
  const [run, setRun] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setRun((n) => n + 1);
  }, [pathname]);

  if (reduced || run === 0) return null;
  return (
    <motion.div
      key={run}
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: [0, 0.7, 1], opacity: [1, 1, 0] }}
      transition={{ duration: 0.9, times: [0, 0.6, 1], ease: EASE }}
      aria-hidden="true"
    />
  );
}
