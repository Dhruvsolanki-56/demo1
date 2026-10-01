import React, { useEffect, useRef, useState } from "react";

/**
 * Fades + rises a section into place the first time it scrolls into view,
 * via IntersectionObserver (one-shot -- disconnects once triggered, so it
 * never re-fires on scroll-back). Respects prefers-reduced-motion by
 * skipping straight to the visible state. This is what "interactive" means
 * for a mostly-static marketing page: content responds to the visitor
 * scrolling, instead of every section just being present from paint one.
 */
export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
