import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Mail, ShoppingCart, ChevronDown, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { useQuoteCart } from "../context/QuoteCartContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useLenis, usePrefersReducedMotion } from "./motion/SmoothScroll";

export const NAV_LINKS = [
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/about", label: "About Us" },
      { to: "/about/global-presence", label: "Global Presence" },
      { to: "/about/why-choose-strikar", label: "Why Choose Strikar" },
      { to: "/about/why-partner", label: "Why Partner With Us" },
      { to: "/about/strategic-alliances", label: "Strategic Alliances" },
      { to: "/partnership", label: "Partnership Opportunities" },
    ],
  },
  {
    to: "/business-divisions",
    label: "Divisions",
    children: [
      { to: "/business-divisions", label: "All Divisions" },
      { to: "/business-divisions/pharmaceutical-manufacturing", label: "Pharmaceutical Manufacturing" },
      { to: "/business-divisions/nutraceutical-manufacturing", label: "Nutraceutical Manufacturing" },
      { to: "/business-divisions/hospital-healthcare-medical-solutions", label: "Hospital & Healthcare Solutions" },
      { to: "/business-divisions/emergency-supply-patient-access", label: "Emergency Supply & Patient Access" },
      { to: "/business-divisions/personal-hygiene-consumer-care", label: "Personal Hygiene & Consumer Care" },
    ],
  },
  {
    to: "/services",
    label: "Services",
    children: [
      { to: "/services", label: "All Services" },
      { to: "/services/manufacturing-solutions", label: "Manufacturing Solutions" },
      { to: "/services/healthcare-access-solutions", label: "Healthcare Access Solutions" },
      { to: "/services/healthcare-institutional-solutions", label: "Healthcare & Institutional Solutions" },
    ],
  },
  {
    to: "/products",
    label: "Products",
    children: [
      { to: "/product-portfolio", label: "Portfolio Overview" },
      { to: "/products", label: "Pharmaceutical Products" },
      { to: "/therapeutic-areas", label: "Therapeutic Areas" },
      { to: "/product-portfolio/nutraceutical-products", label: "Nutraceutical Products" },
      { to: "/product-portfolio/high-surveillance-regulatory-markets", label: "High-Surveillance Markets" },
    ],
  },
  {
    to: "/quality",
    label: "Quality",
    children: [
      { to: "/quality", label: "Quality & Compliance" },
      { to: "/quality/certifications-standards", label: "Certifications & Standards" },
      { to: "/quality/manufacturing-infrastructure", label: "Manufacturing Infrastructure" },
      { to: "/quality/regulatory-affairs-market-access", label: "Regulatory Affairs & Market Access" },
    ],
  },
  {
    to: "/contact",
    label: "Contact",
    children: [
      { to: "/contact", label: "Contact Us" },
      { to: "/inquiry-center", label: "Inquiry Center" },
      { to: "/request-quote", label: "Request a Quote" },
    ],
  },
];

// Products is the one section whose landing route differs from its first
// child's, so match it against every route it owns.
const SECTION_PREFIXES = {
  Products: ["/products", "/product-portfolio", "/therapeutic-areas"],
  Contact: ["/contact", "/inquiry-center", "/request-quote"],
  About: ["/about", "/partnership"],
};

const isSectionActive = (link, pathname) => {
  const prefixes = SECTION_PREFIXES[link.label] || [link.to];
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
};

function CartBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-950 px-1 text-[11px] font-bold text-white ring-2 ring-primary-600">
      {count}
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [pinned, setPinned] = useState(true);
  const { items } = useQuoteCart();
  const { settings } = useSiteSettings();
  const { pathname } = useLocation();
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();

  // Read inside the lock effect's cleanup, where a stale closure would see
  // the pathname from when the drawer opened rather than the one navigated to.
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const openedAtPathnameRef = useRef(pathname);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  // Slide the bar away on the way down, bring it straight back on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const delta = y - last;
      if (Math.abs(delta) > 6) {
        setPinned(y < 140 || delta < 0);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) setPinned(true);
  }, [open]);

  // Lock scroll behind the drawer. If a link inside it navigated, the route's
  // own scroll-to-top ran while scrolling was still locked (a no-op), so
  // finish that job here once unlocked.
  useEffect(() => {
    if (!open) return undefined;
    openedAtPathnameRef.current = pathnameRef.current;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      if (lenis) lenis.start();
      document.body.style.overflow = "";
      if (pathnameRef.current !== openedAtPathnameRef.current) {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };
  }, [open, lenis]);

  const count = items.length;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-[15px] sm:pt-[15px]"
        initial={false}
        animate={{ y: pinned ? 0 : "-130%" }}
        transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`flex items-center justify-between gap-4 rounded-[20px] bg-primary-600 pl-3 pr-3 transition-[height,box-shadow] duration-300 sm:rounded-[24px] sm:pl-4 sm:pr-4 lg:pl-5 lg:pr-5 ${scrolled ? "h-[68px] lg:h-[78px]" : "h-[76px] lg:h-[92px]"} ${
            scrolled ? "shadow-[0_14px_40px_-18px_rgba(5,27,46,0.55)]" : ""
          }`}
        >
          <div className="rounded-[14px] bg-white px-3 py-1.5 lg:rounded-[16px] lg:px-4 lg:py-2">
            <Logo />
          </div>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-2">
              {NAV_LINKS.map((link) => {
                const active = isSectionActive(link, pathname);
                return (
                  <li key={link.label} className="group relative">
                    <NavLink
                      to={link.to}
                      className="relative flex items-center gap-1.5 rounded-lg px-3 py-3 text-[0.97rem] font-semibold text-white transition-colors hover:text-accent-300 xl:px-4"
                    >
                      {link.label}
                      {link.children && (
                        <ChevronDown size={15} className="transition-transform duration-200 group-hover:rotate-180" />
                      )}
                      <span
                        className={`absolute inset-x-3 bottom-1.5 h-[3px] rounded-full bg-accent-500 transition-opacity xl:inset-x-4 ${
                          active ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </NavLink>

                    {link.children && (
                      <div className="invisible absolute left-1/2 top-full z-10 w-80 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <ul className="overflow-hidden rounded-[18px] border border-slate-100 bg-white p-2 shadow-[0_24px_60px_-20px_rgba(5,27,46,0.4)]">
                          {link.children.map((child) => (
                            <li key={child.to}>
                              <NavLink
                                to={child.to}
                                end
                                className={({ isActive }) =>
                                  `group/item flex items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-[0.92rem] font-medium transition-colors ${
                                    isActive
                                      ? "bg-primary-50 text-primary-700"
                                      : "text-primary-950 hover:bg-primary-50 hover:text-primary-700"
                                  }`
                                }
                              >
                                {child.label}
                                <ArrowRight
                                  size={14}
                                  className="shrink-0 -translate-x-1 text-primary-500 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                />
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/request-quote"
              aria-label={count > 0 ? `Request a quote, ${count} item${count === 1 ? "" : "s"} added` : "Request a quote"}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent-500 text-primary-950 transition-colors hover:bg-accent-400 sm:hidden"
            >
              <ShoppingCart size={18} />
              <CartBadge count={count} />
            </Link>

            <Link
              to="/request-quote"
              className="relative hidden items-center gap-2.5 rounded-[12px] bg-accent-500 px-5 py-3.5 text-[0.92rem] font-semibold text-primary-950 transition-colors hover:bg-accent-400 sm:inline-flex"
            >
              <ShoppingCart size={16} />
              Request a Quote
              <CartBadge count={count} />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary-950 transition-transform hover:scale-105 lg:hidden sm:h-12 sm:w-12"
            >
              <span className="grid grid-cols-2 gap-[5px]" aria-hidden="true">
                {[0, 1, 2, 3].map((d) => (
                  <span key={d} className="h-[5px] w-[5px] rounded-full bg-primary-950" />
                ))}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-primary-950/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed bottom-2.5 right-2.5 top-2.5 z-[70] flex w-[min(420px,calc(100%-20px))] flex-col overflow-hidden rounded-[24px] bg-white"
              initial={reduced ? { opacity: 0 } : { x: "110%" }}
              animate={reduced ? { opacity: 1 } : { x: 0 }}
              exit={reduced ? { opacity: 0 } : { x: "110%" }}
              transition={{ duration: reduced ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-950 text-white transition-colors hover:bg-primary-600"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <ul className="divide-y divide-slate-100">
                  {NAV_LINKS.map((link) => {
                    const isOpen = expanded === link.label;
                    const active = isSectionActive(link, pathname);
                    return (
                      <li key={link.label}>
                        <div className="flex items-center justify-between gap-4">
                          <NavLink
                            to={link.to}
                            className={`block flex-1 py-4 font-display text-[1.35rem] font-medium transition-colors ${
                              active ? "text-primary-600" : "text-primary-950 hover:text-primary-600"
                            }`}
                          >
                            {link.label}
                          </NavLink>
                          {link.children && (
                            <button
                              type="button"
                              onClick={() => setExpanded(isOpen ? null : link.label)}
                              aria-expanded={isOpen}
                              aria-label={`${isOpen ? "Collapse" : "Expand"} ${link.label}`}
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                                isOpen ? "bg-primary-600 text-white" : "bg-primary-50 text-primary-700"
                              }`}
                            >
                              <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                            </button>
                          )}
                        </div>

                        <AnimatePresence initial={false}>
                          {isOpen && link.children && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <ul className="mb-4 space-y-0.5 rounded-2xl bg-panel p-2">
                                {link.children.map((child) => (
                                  <li key={child.to}>
                                    <NavLink
                                      to={child.to}
                                      end
                                      className={({ isActive }) =>
                                        `flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[0.93rem] transition-colors ${
                                          isActive ? "bg-white font-semibold text-primary-700" : "text-slate-700 hover:bg-white"
                                        }`
                                      }
                                    >
                                      {child.label}
                                      <ArrowRight size={14} className="shrink-0 text-primary-400" />
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="space-y-3 border-t border-slate-100 bg-panel px-5 py-5 text-sm">
                {settings.phone && (
                  <a href={`tel:${settings.phone}`} className="flex items-center gap-3 font-medium text-primary-950 hover:text-primary-600">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white">
                      <Phone size={15} />
                    </span>
                    {settings.phone}
                  </a>
                )}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="flex items-center gap-3 font-medium text-primary-950 hover:text-primary-600">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white">
                      <Mail size={15} />
                    </span>
                    {settings.email}
                  </a>
                )}
                <Link to="/request-quote" className="btn-accent mt-2 w-full">
                  <ShoppingCart size={16} /> Request a Quote {count > 0 && `(${count})`}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
