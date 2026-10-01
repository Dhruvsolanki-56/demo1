import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./SmoothScroll";

/**
 * The reference site's signature effect: every word sits in an
 * `overflow:hidden` mask and slides up from behind it, staggered.
 *
 * Accessibility / SEO note:
 *  We split on *words*, never characters, and each word stays a single intact
 *  text node. Assistive tech and crawlers concatenate inline elements, so the
 *  heading reads normally without needing a duplicate `sr-only` copy —
 *  and duplicating it would make every heading appear twice to search engines.
 *  Under reduced motion the whole thing collapses to plain text.
 *
 * Why the scroll trigger lives on the PARENT and the words run off variants:
 *  Each word sits at `y: 110%` inside an `overflow:hidden` mask, so it is
 *  clipped entirely out of its own parent's box. IntersectionObserver
 *  intersects a target against every ancestor clip rect on the way up, so a
 *  per-word `whileInView` observes an element whose visible rect is always
 *  empty — it reports "not intersecting" forever and the words never come up.
 *  That is not a race; it can never fire. Observing the unclipped heading
 *  instead and cascading through `staggerChildren` gives the same look and
 *  actually triggers.
 */

// Shared so every word animates off one object rather than a fresh literal
// per render, which would restart in-flight transitions on any re-render.
const WORD = { hidden: { y: "110%" }, show: { y: "0%" } };

export function RevealText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.045,
  duration = 0.75,
  once = true,
  // Above-the-fold content must animate on MOUNT, not on scroll. A
  // `whileInView` + `once` reveal can mis-fire for an element that is already
  // in view when the route mounts — the scroll reset and the Suspense frame
  // race the IntersectionObserver, and with `once` it never re-evaluates,
  // leaving the words parked below their masks and permanently invisible.
  immediate = false,
}) {
  const reduced = usePrefersReducedMotion();
  const words = useMemo(() => String(text ?? "").split(/(\s+)/).filter((w) => w.length), [text]);

  if (reduced || !words.length) return <Tag className={className}>{text}</Tag>;

  const MotionTag = motion[Tag] || motion.span;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once, margin: "-10% 0px -10% 0px" } })}
      variants={{
        hidden: {},
        show: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {words.map((word, i) =>
        /^\s+$/.test(word) ? (
          <span key={`sp-${i}`}> </span>
        ) : (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={WORD}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        )
      )}
    </MotionTag>
  );
}

/**
 * Generic block reveal — a fade + rise for anything that isn't text.
 * Used for cards, images, rules, buttons.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 14,
  duration = 0.5,
  once = true,
  as = "div",
  immediate = false,
}) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once, margin: "-8% 0px -8% 0px" } })}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct children of a list/grid without per-item delay math. */
export function RevealGroup({ children, className = "", stagger = 0.09, delay = 0, once = true }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {React.Children.map(children, (child, i) =>
        child ? (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {child}
          </motion.div>
        ) : null
      )}
    </motion.div>
  );
}

/**
 * Standfirst paragraph with phrase-level emphasis — the reference's treatment
 * for its opening statement: the sentence runs in a muted grey while the
 * phrases that carry the claim are lifted into the brand colour, so the
 * paragraph can be skim-read for substance in one pass.
 *
 * `emphasize` is a list of substrings; matching is case-insensitive and
 * whitespace-tolerant so copy edits don't silently drop the highlight.
 */
export function RevealProse({
  text,
  emphasize = [],
  className = "",
  as: Tag = "p",
  delay = 0,
  once = true,
}) {
  const reduced = usePrefersReducedMotion();
  const source = String(text ?? "");

  // Resolve emphasis to character ranges once, then decide per word whether
  // its start index falls inside one.
  const ranges = useMemo(() => {
    const out = [];
    const hay = source.toLowerCase();
    emphasize.forEach((phrase) => {
      const needle = String(phrase).toLowerCase().trim();
      if (!needle) return;
      let from = 0;
      let at = hay.indexOf(needle, from);
      while (at !== -1) {
        out.push([at, at + needle.length]);
        from = at + needle.length;
        at = hay.indexOf(needle, from);
      }
    });
    return out;
  }, [source, emphasize]);

  const words = useMemo(() => {
    const out = [];
    let i = 0;
    source.split(/(\s+)/).forEach((chunk) => {
      const start = i;
      i += chunk.length;
      if (!chunk.length) return;
      out.push({
        text: chunk,
        space: /^\s+$/.test(chunk),
        strong: ranges.some(([a, b]) => start >= a && start < b),
      });
    });
    return out;
  }, [source, ranges]);

  if (!source) return null;

  const content = words.map((w, i) =>
    w.space ? " " : (
      <span key={i} className={w.strong ? "text-primary-700" : undefined}>
        {w.text}
      </span>
    )
  );

  // This paragraph carries the page's primary claim, so it animates as a
  // single block rather than as ~60 individually masked words. Per-word
  // masking here was fragile in the worst possible place: any mistiming of
  // the per-word IntersectionObservers (fast scroll, a throttled tab, a slow
  // device) left the whole statement parked below its masks and invisible.
  // It also meant ~60 observers for one paragraph. The emphasis colouring —
  // the part that actually carries meaning — is unchanged.
  if (reduced) return <Tag className={className}>{content}</Tag>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag className={className}>{content}</Tag>
    </motion.div>
  );
}
