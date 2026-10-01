import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll, matched to the reference site's feel.
 *
 * Two things matter here beyond "make it smooth":
 *  1. It is disabled entirely under `prefers-reduced-motion`. Smooth scroll is
 *     a vestibular trigger, so we hand control straight back to the browser.
 *  2. The instance is exposed on context so route changes can jump to top
 *     without Lenis animating a 10,000px scroll on every navigation.
 */
const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

/** Matches the CSS media query, and keeps following it if the user changes it. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion();
  const [lenis, setLenis] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;

    const instance = new Lenis({
      // `duration`+`easing` drives Lenis's tween mode: a fixed-length animation
      // per scroll input that always finishes in exactly `duration` seconds,
      // which reads as a snappy, mechanical glide no matter how it's eased.
      // The "watery" feel on reference sites like cadilapharma.com is Lenis's
      // OTHER mode: pure frame-rate-independent lerp damping, where each frame
      // the current position exponentially decays toward the target and there
      // is no fixed end time — small flicks settle fast, but momentum trails
      // off with a long, soft tail. Measured cadilapharma.com's actual scroll
      // response directly (dispatched a wheel event, sampled scrollY every
      // 50ms): it fit a clean exponential decay with a ~240ms half-life, which
      // is a `lerp` of ~0.05. Omitting `duration`/`easing` here switches Lenis
      // to that lerp mode.
      lerp: 0.05,
      smoothWheel: true,
      // Never smooth touch: it fights the OS scroller and feels broken on mobile.
      smoothTouch: false,
    });

    setLenis(instance);
    document.documentElement.classList.add("lenis");

    const raf = (time) => {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      instance.destroy();
      document.documentElement.classList.remove("lenis");
      setLenis(null);
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
