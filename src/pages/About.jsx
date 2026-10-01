import React from "react";
import { Target, Eye, Heart, ArrowRight, CheckCircle2, Globe2, Handshake, Network, Award, Users, Factory } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import Reveal, { RevealGroup } from "../components/motion/Reveal";
import CountUp from "../components/motion/CountUp";
import PageHeader from "../components/PageHeader";
import PhotoSlot from "../components/PhotoSlot";
import { ABOUT_INTRO, VISION, MISSION, CORE_VALUES, WHY_CHOOSE_US } from "../data/siteContent";

// Real-photo drop-in points -- set to an image URL once available; each
// renders a graceful placeholder until then (see the prompts handed to the
// client for what to generate for each).
const ABOUT_TEAM_IMAGE = "/about_intro.png";
const ABOUT_FACILITY_IMAGE = "/about_why_choose.png";

// Same figures as the homepage's global stat row -- kept in sync so a visitor
// who lands here first sees the identical claim, not a page-specific number
// that could drift out of step with Home.
const ABOUT_STATS = [
  { value: "35+", label: "Years of combined industry expertise" },
  { value: "798", label: "Products across the portfolio" },
  { value: "18", label: "Therapeutic areas covered" },
  { value: "6", label: "World regions served" },
];

const ABOUT_LINK_CARDS = [
  { to: "/about/global-presence", icon: Globe2, title: "Global Presence", desc: "Our manufacturing base in India and regional hubs across Latin America and Southeast Asia." },
  { to: "/about/why-choose-strikar", icon: CheckCircle2, title: "Why Choose Strikar", desc: "What importers, distributors, hospitals, and procurement agencies gain by sourcing from us." },
  { to: "/about/why-partner", icon: Handshake, title: "Why Partner With Strikar", desc: "How manufacturers, MAHs, and innovators grow with us through licensing and co-marketing." },
  { to: "/about/strategic-alliances", icon: Network, title: "Strategic Alliances", desc: "Our manufacturing and regulatory alliance network spanning recognized quality frameworks." },
];

export default function About() {
  return (
    <>
      <SEO title="About Us" description={ABOUT_INTRO} canonicalPath="/about" />
      <PageHeader eyebrow="About Us" title="About Strikar Lifescience LLP" />

      <section className="section">
        <div className="container-page grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <p className="text-slate-600 leading-relaxed text-lg mt-5">{ABOUT_INTRO}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-slate-600 leading-relaxed text-lg mt-4">
                Backed by more than 35 years of combined industry expertise, we specialize in the development and
                manufacturing of pharmaceutical and nutraceutical products for international markets. Our WHO-GMP
                manufacturing capabilities, diversified dosage-form expertise, and product development experience
                enable us to support a broad spectrum of molecules, therapeutic categories, and healthcare applications
                across both regulated and emerging markets.
              </p>
            </Reveal>

            {/* Stat row -- the same CountUp treatment as the homepage's global
                band, so a visitor who came in through /about (rather than /)
                gets the same "counting up" moment instead of a flatter page. */}
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
              {ABOUT_STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.24 + i * 0.06}>
                  <CountUp
                    value={s.value}
                    className="block font-display text-3xl font-extrabold tabular-nums tracking-tight text-primary-600 sm:text-4xl"
                  />
                  <p className="mt-1.5 max-w-[11rem] text-xs leading-snug text-slate-600">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.2} className="lg:col-span-5">
            <PhotoSlot
              src={ABOUT_TEAM_IMAGE}
              icon={Users}
              alt="Strikar Lifescience team"
              className="w-full aspect-[4/3] rounded-2xl shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        {/* Each of these cards used to render its icon TWICE — once at 90px
            ghosted into the bottom-right corner and again at 22px in a chip.
            The oversized watermark copy is the clearest template tell on the
            page, so it is gone; the icon appears once. Staggered entrance
            (RevealGroup) is new -- these previously just appeared instantly,
            the one thing on this page that read as flatter than the rest of
            the site. */}
        <RevealGroup className="container-page grid sm:grid-cols-3 gap-6">
          <div className="shadow-soft group relative overflow-hidden bg-white p-6 transition-colors duration-300 hover:bg-primary-50/40">
            <div className="relative icon-badge">
              <Eye size={22} />
            </div>
            <h3 className="relative font-bold text-lg text-primary-900 mt-4">Vision</h3>
            <p className="relative text-sm text-slate-600 mt-2 leading-relaxed">{VISION}</p>
          </div>
          <div className="shadow-soft group relative overflow-hidden bg-white p-6 transition-colors duration-300 hover:bg-primary-50/40">
            <div className="relative icon-badge">
              <Target size={22} />
            </div>
            <h3 className="relative font-bold text-lg text-primary-900 mt-4">Mission</h3>
            <p className="relative text-sm text-slate-600 mt-2 leading-relaxed">{MISSION}</p>
          </div>
          <div className="shadow-soft group relative overflow-hidden bg-white p-6 transition-colors duration-300 hover:bg-primary-50/40">
            <div className="relative icon-badge">
              <Heart size={22} />
            </div>
            <h3 className="relative font-bold text-lg text-primary-900 mt-4">Core Values</h3>
            <ul className="relative text-sm text-slate-600 mt-2 space-y-1.5">
              {CORE_VALUES.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600 transition-transform duration-300 group-hover:scale-125" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </RevealGroup>
      </section>

      {/* Leadership Message */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="A Message from Our Managing Partner" className="section-title mt-3" />
          {/* Three template tells removed here: a blue-to-orange gradient hairline
              across the top, a 64px ghosted quote glyph bleeding out of the
              corner, and an initials-in-a-circle avatar. A pull quote does not
              need decoration to read as a pull quote — a rule down the left
              edge and larger, lighter type do the same job with none of the
              stock-template signature. */}
          <Reveal delay={0.1}>
            <div className="relative mt-8 border-l-2 border-accent-500 py-2 pl-8 sm:pl-12">
              <blockquote className="relative font-display text-[clamp(1.15rem,1.9vw,1.6rem)] font-light leading-[1.5] tracking-[-0.01em] text-primary-950">
                "Healthcare is one of the few industries where every decision has the potential to impact lives.
                At Strikar Lifescience, we have built our organization around this belief. What began as a commitment
                to providing reliable healthcare solutions has evolved into a diversified healthcare platform
                encompassing pharmaceutical manufacturing, nutraceuticals, healthcare solutions, emergency supply programs, patient
                access initiatives, and personal hygiene products. Throughout this journey, our focus has remained
                unchanged: delivering value through quality, integrity, innovation, and long-term partnerships."
              </blockquote>
              <div className="relative mt-7 flex items-center gap-3">
                <div>
                  <p className="font-bold text-primary-900">Karan Shah</p>
                  <p className="text-sm text-slate-600">Managing Partner, Strikar Lifescience LLP</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Strikar checklist */}
      <section className="section">
        <div className="container-page grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <TwoToneHeading text="Manufacturing Excellence, Regulatory Expertise, and Long-Term Partnership" className="section-title mt-3" />
              <p className="text-slate-600 leading-relaxed mt-4 max-w-3xl">
                We combine manufacturing excellence, regulatory expertise, market understanding, and long-term
                partnership commitment to help healthcare organizations build sustainable and competitive healthcare
                businesses across international markets.
              </p>
            </Reveal>
            <RevealGroup className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4" stagger={0.06}>
              {WHY_CHOOSE_US.map((item) => (
                <li key={item} className="flex items-start gap-3 list-none">
                  <CheckCircle2 size={20} className="text-primary-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.2} className="lg:col-span-5">
            <PhotoSlot
              src={ABOUT_FACILITY_IMAGE}
              icon={Factory}
              alt="Strikar Lifescience manufacturing facility"
              className="w-full aspect-[4/3] rounded-2xl shadow-soft"
            />
          </Reveal>
        </div>
      </section>

      {/* Link cards to deeper About pages */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <TwoToneHeading text="Explore Strikar Lifescience" className="section-title mt-3" />
          </Reveal>
          <RevealGroup className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {ABOUT_LINK_CARDS.map(({ to, icon: Icon, title, desc }, i) => (
              <Link key={to} to={to} className="card card-hover card-bold relative overflow-hidden p-6 pt-7 flex flex-col">
                {/* The index was a 3xl near-invisible watermark floating in the
                    corner. It is now real typography on the same baseline as
                    the icon — the reference numbers its pillars this way
                    ("01 Formulations") rather than ghosting a numeral behind
                    the content. */}
                <div className="flex items-center justify-between">
                  <div className="icon-badge relative">
                    <Icon size={22} />
                  </div>
                </div>
                <h3 className="font-bold text-lg text-primary-900 mt-7">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 flex-1">{desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 mt-4 transition-transform duration-300 group-hover:translate-x-1">
                  Learn More <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Partner with Strikar Lifescience LLP</h2>
            <Link to="/request-quote" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
              Request a Quote <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
