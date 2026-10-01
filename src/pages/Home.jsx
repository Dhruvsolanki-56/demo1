import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Factory, ShieldCheck, Truck, Plus, Minus, Check, MapPin, Globe2 } from "lucide-react";

import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/public";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { THERAPEUTIC_AREAS } from "../data/therapeuticAreas";
import { HERO_HEADING, HERO_SUBHEADING, HOME_INTRO_TEASER, WHY_CHOOSE_US } from "../data/siteContent";

import Reveal, { RevealGroup } from "../components/motion/Reveal";
import CountUp from "../components/motion/CountUp";
import { ArrowButton, Marquee } from "../components/motion/Parallax";
import HeroSlider from "../components/sections/HeroSlider";
import ContactBand from "../components/sections/ContactBand";

// Figures traceable to the seeded company copy -- no invented metrics. The
// "35+ years" figure lives in the welcome section, so it isn't repeated here.
const STATS = [
  { value: "798", label: "Products in the portfolio" },
  { value: "18", label: "Therapeutic areas" },
  { value: "5", label: "Business divisions" },
  { value: "6", label: "World regions served" },
];

const PORTFOLIO = [
  {
    title: "Pharmaceutical Products",
    description: "Our core range across 18 therapeutic areas and multiple dosage forms, for distributors and institutions.",
    to: "/products",
    image: "/therapies/portfolio-pharma.jpg",
    cta: "Browse the catalogue",
  },
  {
    title: "High-Surveillance Markets",
    description: "A separate portfolio prepared for markets with stricter regulatory oversight and documentation needs.",
    to: "/product-portfolio/high-surveillance-regulatory-markets",
    image: "/therapies/portfolio-surveillance.jpg",
    cta: "See this portfolio",
  },
  {
    title: "Nutraceutical Products",
    description: "Nutritional and wellness formulations from our nutraceutical manufacturing division.",
    to: "/product-portfolio/nutraceutical-products",
    image: "/therapies/portfolio-nutra.jpg",
    cta: "View nutraceuticals",
  },
];

const PILLARS = [
  {
    icon: Factory,
    title: "WHO-GMP manufacturing",
    text: "Tablets, capsules, injectables and more, for CDMO, CMO, third-party and private-label programmes.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory support",
    text: "Dossier preparation, registration and market-access guidance for regulated and emerging markets.",
  },
  {
    icon: Truck,
    title: "Regional supply",
    text: "Regional hubs in Guatemala and Thailand support partners in Latin America and Southeast Asia.",
  },
];

const DIVISIONS = [
  {
    title: "Pharmaceutical Manufacturing",
    text: "Development, manufacturing and market access across a broad range of dosage forms and therapeutic categories.",
    to: "/business-divisions/pharmaceutical-manufacturing",
  },
  {
    title: "Nutraceutical Manufacturing",
    text: "Nutritional and wellness products supporting preventive healthcare and healthy lifestyles.",
    to: "/business-divisions/nutraceutical-manufacturing",
  },
  {
    title: "Hospital & Healthcare Solutions",
    text: "Medical consumables, hospital supplies and institutional healthcare programmes for healthcare systems.",
    to: "/business-divisions/hospital-healthcare-medical-solutions",
  },
  {
    title: "Emergency Supply & Patient Access",
    text: "Critical and time-sensitive supply for healthcare needs outside conventional commercial channels.",
    to: "/business-divisions/emergency-supply-patient-access",
  },
  {
    title: "Personal Hygiene & Consumer Care",
    text: "Hygiene, wellness and infection-prevention products for healthcare, institutional and consumer settings.",
    to: "/business-divisions/personal-hygiene-consumer-care",
  },
];

const REGIONS = ["India", "Guatemala", "Thailand", "El Salvador", "Central America", "Latin America", "The Caribbean", "Southeast Asia", "Africa", "CIS Region"];

const LOCATIONS = [
  { place: "India", role: "Manufacturing & technical hub" },
  { place: "Guatemala", role: "Regional hub" },
  { place: "Thailand", role: "Regional hub" },
  { place: "El Salvador", role: "Regional presence" },
];

function DivisionAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {DIVISIONS.map((d, i) => {
        const isOpen = open === i;
        return (
          <div key={d.title}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={`font-display text-[1.25rem] font-medium transition-colors sm:text-[1.35rem] ${
                    isOpen ? "text-primary-600" : "text-primary-950"
                  }`}
                >
                  {d.title}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? "bg-primary-600 text-white" : "bg-panel text-primary-950"
                  }`}
                >
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-12">
                    <p className="text-[0.97rem] leading-relaxed text-slate-500">{d.text}</p>
                    <Link
                      to={d.to}
                      className="tap mt-3 inline-flex items-center gap-2 text-[0.95rem] font-medium text-primary-600 hover:text-primary-800"
                    >
                      Go to {d.title} <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function TherapySection() {
  const track = useRef(null);
  const scroll = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="section overflow-hidden">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <h2 className="section-title">Therapeutic areas we cover</h2>
            <p className="mt-4 text-[1.02rem] text-slate-500">
              Eighteen specialities, from cardiovascular and oncology to hospital care products.
            </p>
          </Reveal>
          <div className="flex gap-3">
            <button type="button" onClick={() => scroll(-1)} className="round-btn" aria-label="Previous therapeutic areas">
              <ArrowLeft size={20} />
            </button>
            <button type="button" onClick={() => scroll(1)} className="round-btn" aria-label="Next therapeutic areas">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={track}
          className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-pl-5 gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-pl-8 sm:px-8 lg:-mx-10 lg:scroll-pl-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {THERAPEUTIC_AREAS.map((a) => (
            <Link
              key={a.slug}
              data-card
              to={`/therapeutic-areas/${a.slug}`}
              className="group flex w-[78%] shrink-0 snap-start flex-col sm:w-[44%] lg:w-[calc((100%-72px)/4)]"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-panel">
                <img
                  src={`/therapies/${a.slug}.jpg`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <h3 className="mt-5 flex items-start justify-between gap-3 font-display text-[1.25rem] font-medium leading-snug text-primary-950 transition-colors group-hover:text-primary-600">
                {a.name}
                <ArrowRight size={18} className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="mt-2 line-clamp-2 text-[0.93rem] leading-relaxed text-slate-500">{a.summary}</p>
            </Link>
          ))}
        </div>

        <Link
          to="/therapeutic-areas"
          className="tap mt-8 inline-flex items-center gap-2 font-medium text-primary-600 hover:text-primary-800"
        >
          All 18 therapeutic areas <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const { settings } = useSiteSettings();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts({ featured: true, page_size: 4 }).then((r) => setFeatured(r.items || [])).catch(() => {});
  }, []);

  const slides = [
    {
      title: settings.hero_heading || HERO_HEADING,
      text: settings.hero_subheading || HERO_SUBHEADING,
      image: "/showcase/manufacturing.jpg",
      cta: { label: "Browse Products", to: "/products" },
      secondary: { label: "Request a Quote", to: "/request-quote" },
    },
    {
      title: "Quality checked at every stage",
      text: "WHO-GMP systems, documented testing and release procedures behind every batch we manufacture.",
      image: "/banners/quality.png",
      cta: { label: "Quality & Compliance", to: "/quality" },
      secondary: { label: "Our Facilities", to: "/quality/manufacturing-infrastructure" },
    },
    {
      title: "Supplying partners across four continents",
      text: "Regional hubs in Guatemala and Thailand serve Latin America, the Caribbean, Southeast Asia, Africa and the CIS region.",
      image: "/showcase/access.jpg",
      cta: { label: "Global Presence", to: "/about/global-presence" },
      secondary: { label: "Partner With Us", to: "/partnership" },
    },
  ];

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: settings.company_name || "Strikar Lifescience LLP",
      url: origin || undefined,
      logo: origin ? `${origin}/logo.png` : undefined,
      description: settings.seo_default_description || settings.tagline || undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings.company_name || "Strikar Lifescience LLP",
      url: origin || undefined,
    },
  ];

  return (
    <>
      <SEO canonicalPath="/" jsonLd={jsonLd} />

      <HeroSlider slides={slides} />

      {/* Welcome */}
      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative pb-16 sm:pl-10 lg:pb-20">
            <div className="overflow-hidden rounded-[24px]">
              <img
                src="/company_intro.png"
                alt="Production floor at our manufacturing facility"
                loading="lazy"
                className="aspect-square w-full object-cover sm:aspect-[6/5]"
              />
            </div>
            <div className="absolute -left-2 -top-6 hidden w-[38%] overflow-hidden rounded-[20px] border-[6px] border-white shadow-[0_20px_40px_-20px_rgba(5,27,46,0.45)] sm:block">
              <img src="/quality_intro.png" alt="" aria-hidden="true" loading="lazy" className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-4 rounded-[22px] bg-primary-600 px-8 py-7 sm:right-10 sm:px-10 sm:py-9">
              <CountUp value="35+" className="block font-display text-[3.8rem] font-normal leading-none text-accent-500 sm:text-[4.6rem]" />
              <p className="mt-2 text-[1rem] font-medium text-white">Years of combined expertise</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="section-title">A healthcare company built around manufacturing</h2>
            <p className="quote-rule mt-8 text-[1.02rem] leading-[1.8]">{HOME_INTRO_TEASER}</p>
            <p className="mt-6 text-[1.02rem] leading-[1.8] text-slate-500">
              We work with distributors, hospitals, governments and brand owners, and we keep those relationships for
              the long term.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ArrowButton to="/about">About Strikar</ArrowButton>
              <ArrowButton to="/about/why-choose-strikar" variant="outline">Why Choose Strikar</ArrowButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product range */}
      <section className="section-muted py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-xl">
              <h2 className="section-title">Our product range</h2>
              <p className="mt-4 text-[1.02rem] text-slate-500">Three portfolios, each kept separate for its own markets and paperwork.</p>
            </Reveal>
            <ArrowButton to="/product-portfolio" variant="outline">Portfolio Overview</ArrowButton>
          </div>
          <RevealGroup className="mt-12 grid gap-7 md:grid-cols-3" stagger={0.08}>
            {PORTFOLIO.map((p) => (
              <Link key={p.title} to={p.to} className="card-bold group flex h-full flex-col overflow-hidden p-4">
                <div className="aspect-[16/11] overflow-hidden rounded-[16px] bg-panel">
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                  <h3 className="font-display text-[1.45rem] font-medium leading-snug text-primary-950">{p.title}</h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate-500">{p.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-primary-600">
                    {p.cta} <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="section">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <h2 className="section-title">Our manufacturing hub in India</h2>
              <p className="mt-6 text-[1.02rem] leading-[1.8] text-slate-500">
                WHO-GMP systems, several dosage forms and in-house product development let us take on a wide spread
                of molecules and therapy areas, for both regulated and emerging markets.
              </p>
              <div className="mt-9">
                <ArrowButton to="/quality/manufacturing-infrastructure">See the facilities</ArrowButton>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-7">
              <div className="overflow-hidden rounded-[24px] bg-panel">
                <img
                  src="/banners/pharma_manufacturing.png"
                  alt="Automated production line"
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-10 border-t border-slate-200 pt-12 md:grid-cols-3 md:gap-12">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white">
                  <Icon size={24} />
                </span>
                <h3 className="mt-5 font-display text-[1.3rem] font-medium text-primary-950">{title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="pb-16 sm:pb-24">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <h2 className="section-title">Five business divisions</h2>
              <p className="mb-8 mt-4 text-[1.02rem] leading-relaxed text-slate-500">
                Supporting healthcare systems, distributors and institutional partners, from finished formulations
                to hospital supplies.
              </p>
            </Reveal>
            <DivisionAccordion />
          </div>
          <Reveal className="relative overflow-hidden rounded-[24px] bg-primary-400 lg:sticky lg:top-32">
            <img
              src="/about_why_choose.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="aspect-[16/11] w-full object-cover mix-blend-luminosity lg:aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-primary-500/35 mix-blend-multiply" />
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-16 sm:pb-24">
        <div className="container-page grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-[22px] bg-primary-100 px-6 py-9 text-center shadow-ledge-blue sm:py-11">
              <CountUp value={s.value} className="block font-display text-[2.8rem] font-medium leading-none text-primary-600 sm:text-[3.4rem]" />
              <div className="mx-auto my-5 h-px w-4/5 bg-primary-300/60" />
              <p className="text-[0.95rem] font-medium text-primary-950">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="frame relative overflow-hidden">
        <img src="/showcase/institutional.jpg" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-primary-950/30" />
        <div className="relative px-4 py-5 sm:px-10 sm:py-10">
          <Reveal className="grid gap-10 rounded-[22px] bg-accent-500 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="section-title">Why partners choose us</h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-primary-950">
                <strong>Strikar Lifescience LLP</strong> combines WHO-GMP manufacturing, regulatory support and
                dependable supply for healthcare and institutional partners.
              </p>
              <div className="mt-8">
                <ArrowButton to="/about/why-choose-strikar">Read the full list</ArrowButton>
              </div>
            </div>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:col-span-7">
              {WHY_CHOOSE_US.slice(0, 8).map((w) => (
                <li key={w} className="flex items-start gap-3 text-[0.97rem] font-medium text-primary-950">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary-600" strokeWidth={2.5} />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <TherapySection />

      {featured.length > 0 && (
        <section className="section-muted py-16 sm:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="section-title">Featured products</h2>
              <ArrowButton to="/products" variant="outline">All Products</ArrowButton>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regions ribbon */}
      <section className="pb-14 pt-2 sm:pb-16">
        <Marquee
          speed={45}
          className="font-display text-[1.6rem] font-medium text-slate-300 sm:text-[2rem]"
          items={REGIONS.map((r) => (
            <span className="flex items-center gap-12">
              {r}
              <Globe2 size={22} className="text-accent-500" aria-hidden="true" />
            </span>
          ))}
        />
      </section>

      {/* Where we work */}
      <section className="pb-16 sm:pb-24">
        <div className="container-page">
          <div className="grid gap-8 border-y border-slate-200 py-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <h2 className="font-display text-[1.7rem] font-medium text-primary-950">Where we work</h2>
              <p className="mt-2 text-[0.95rem] text-slate-500">
                Serving Central and Latin America, the Caribbean, Southeast Asia, Africa and the CIS region.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-6 lg:col-span-8 lg:grid-cols-4">
              {LOCATIONS.map((l) => (
                <li key={l.place} className="flex gap-3">
                  <MapPin size={20} className="mt-1 shrink-0 text-primary-600" />
                  <span>
                    <span className="block font-display text-[1.2rem] font-medium text-primary-950">{l.place}</span>
                    <span className="text-sm text-slate-500">{l.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="frame border border-slate-200 bg-white shadow-ledge">
        <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-4 lg:pl-16">
          <Reveal className="lg:col-span-7 lg:py-12">
            <h2 className="font-display text-[clamp(2rem,3.2vw,2.85rem)] font-medium leading-tight text-primary-950">
              Looking for a manufacturing or distribution partner?
            </h2>
            <p className="mt-6 text-[1.08rem] leading-[1.9] text-slate-600">
              We take on manufacturing partnerships, regional distribution, licensing and co-marketing. Tell us what
              you need and the market you are selling into.
            </p>
            <div className="my-8 h-px bg-slate-200" />
            <div className="flex flex-wrap gap-3">
              <ArrowButton to="/partnership">Partnership Options</ArrowButton>
              <ArrowButton to="/inquiry-center" variant="outline">Send an Inquiry</ArrowButton>
            </div>
          </Reveal>
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[20px]">
              <img src="/partnership_cta.png" alt="" aria-hidden="true" loading="lazy" className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]" />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16 sm:mt-24">
        <ContactBand />
      </div>
    </>
  );
}
