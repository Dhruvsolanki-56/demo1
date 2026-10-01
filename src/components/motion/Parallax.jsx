import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "./SmoothScroll";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Depth via differential scroll speed. This is where the "3D-like" feel comes
 * from — layered planes moving at different rates — rather than bevels or glow.
 *
 * `speed` is the fraction of scroll distance the layer travels against the
 * page. Keep it small (0.1–0.35); large values read as broken, not deep.
 */
export function Parallax({ children, speed = 0.18, className = "" }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = speed * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`${distance}%`, `${-distance}%`]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Slow scale-up on an image as it crosses the viewport. Gives photography a
 * sense of depth without moving it out of its frame — pair with overflow-hidden.
 */
export function KenBurns({ children, className = "", from = 1.08, to = 1 }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [from, to]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ scale }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Primary CTA: a softly rounded button with a trailing arrow that nudges
 * forward on hover. Renders as a router Link, an anchor, or a button.
 */
export function ArrowButton({
  to,
  href,
  children,
  variant = "solid",
  className = "",
  onClick,
  type,
}) {
  const variants = {
    solid: "bg-primary-600 text-white hover:bg-primary-700",
    light: "bg-white text-primary-800 hover:bg-primary-50",
    outline: "border border-primary-600/25 bg-white text-primary-700 hover:border-primary-600 hover:bg-primary-600 hover:text-white",
    ghostDark: "border border-white/40 text-white hover:bg-white hover:text-primary-800",
    accent: "bg-accent-500 text-primary-950 hover:bg-accent-400",
  };

  const cls = `group inline-flex items-center gap-3 rounded-[10px] px-7 py-3.5 font-sans text-[0.9375rem] font-medium leading-none transition-colors duration-200 ${variants[variant] || variants.solid} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  if (href) return <a href={href} className={cls}>{inner}</a>;
  return (
    <button type={type || "button"} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/**
 * Continuous horizontal ribbon. Two identical tracks slide left in step so the
 * loop is seamless; hovering pauses it. Under reduced motion it becomes a
 * plain wrapped row.
 */
export function Marquee({ items = [], className = "", speed = 38 }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-3 ${className}`}>
        {items.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    );
  }

  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      {[0, 1].map((track) => (
        <motion.div
          key={track}
          className="flex shrink-0 items-center gap-x-12 pr-12 group-hover:[animation-play-state:paused]"
          aria-hidden={track === 1}
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        >
          {items.map((item, i) => (
            <span key={i} className="shrink-0">
              {item}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Section heading in the house voice: light geometric face, brand blue.
 * Accepts `accent`/`rest` (kept for existing call sites) or plain `text`.
 */
export function TwoToneHeading({ accent, rest, text, className = "", as: Tag = "h2" }) {
  const content = text && !accent ? text : [accent, rest].filter(Boolean).join(" ");
  const hasColor = /section-title|text-(white|primary|slate|accent)/.test(className);
  return (
    <Tag className={`font-display !font-medium leading-[1.15] tracking-[-0.005em] ${hasColor ? "" : "text-primary-600"} ${className}`}>
      {content}
    </Tag>
  );
}
