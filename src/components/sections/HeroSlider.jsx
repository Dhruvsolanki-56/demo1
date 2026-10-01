import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RevealText } from "../motion/Reveal";
import { ArrowButton } from "../motion/Parallax";
import { usePrefersReducedMotion } from "../motion/SmoothScroll";

const INTERVAL = 7000;
const EASE = [0.22, 1, 0.36, 1];

/**
 * Homepage banner: a rounded, inset slider. Each slide is a full-bleed photo under a left-weighted navy wash, with the message set in
 * white. Autoplays, pauses while hovered, and stays still under reduced
 * motion.
 */
export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const count = slides.length;

  const go = useCallback((next) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (reduced || paused || count < 2) return undefined;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduced, count, go]);

  const slide = slides[index];

  return (
    <section
      className="frame relative isolate h-[clamp(540px,78vh,740px)] overflow-hidden bg-primary-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Highlights"
    >
      {/* Own stacking context: the wipe raises the incoming slide with a
          z-index, which must stay below the overlays and the copy. */}
      <div className="absolute inset-0 isolate">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0% 0% 0% 100%)", zIndex: 2 }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", zIndex: 2 }}
          exit={reduced ? { opacity: 0 } : { zIndex: 1, transition: { duration: 1.2 } }}
          transition={{ duration: reduced ? 0.3 : 1.2, ease: EASE }}
        >
          <img
            src={slide.image}
            alt=""
            aria-hidden="true"
            className={`h-full w-full object-cover ${reduced ? "" : "animate-slow-zoom"}`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-950/55 to-primary-950/5" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary-950/60 to-transparent" />

      <div className="relative flex h-full items-center">
        <div className="container-page">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              className="max-w-2xl"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: reduced ? 0 : 0.25 } },
                exit: { opacity: 0, transition: { duration: 0.25 } },
              }}
            >
              {[
                index === 0 ? (
                  <h1
                    key="h"
                    className="font-display font-medium leading-[1.06] tracking-[-0.01em] text-white"
                    style={{ fontSize: "clamp(2.3rem, 4.8vw, 4.4rem)" }}
                  >
                    <RevealText text={slide.title} immediate delay={0.2} />
                  </h1>
                ) : (
                  <h2
                    key="h"
                    className="font-display font-medium leading-[1.06] tracking-[-0.01em] text-white"
                    style={{ fontSize: "clamp(2.3rem, 4.8vw, 4.4rem)" }}
                  >
                    <RevealText text={slide.title} immediate delay={0.2} />
                  </h2>
                ),
                slide.text && (
                  <p key="p" className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-white/85">
                    {slide.text}
                  </p>
                ),
                <div key="c" className="mt-9 flex flex-wrap gap-3">
                  <ArrowButton to={slide.cta.to} variant="accent">{slide.cta.label}</ArrowButton>
                  {slide.secondary && (
                    <ArrowButton to={slide.secondary.to} variant="ghostDark">{slide.secondary.label}</ArrowButton>
                  )}
                </div>,
              ]
                .filter(Boolean)
                .map((node) => (
                  <motion.div
                    key={node.key}
                    variants={{
                      hidden: { opacity: 0, y: reduced ? 0 : 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                    }}
                  >
                    {node}
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-6 sm:bottom-9">
          <div className="container-page flex items-center justify-between gap-6">
            <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose slide">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}: ${s.title}`}
                  onClick={() => go(i)}
                  className="group relative h-8 w-10 sm:w-14"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/30">
                    {i === index && (
                      <motion.span
                        key={`${index}-${paused}`}
                        className="absolute inset-y-0 left-0 rounded-full bg-accent-500"
                        initial={{ width: reduced || paused ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: reduced || paused ? 0 : INTERVAL / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-primary-950"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-primary-950"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
