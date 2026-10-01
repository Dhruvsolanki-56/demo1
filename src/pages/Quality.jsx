import React from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, ArrowRight, Award, FlaskConical, Factory, ClipboardCheck } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";
import PhotoSlot from "../components/PhotoSlot";
import { CERTIFICATIONS } from "../data/siteContent";

// Real-photo drop-in point -- set to an image URL once available; renders a
// graceful placeholder until then (see the prompt handed to the client).
const QUALITY_LAB_IMAGE = "/quality_intro.png";

const QUALITY_LINK_CARDS = [
  {
    to: "/quality/certifications-standards",
    icon: Award,
    title: "Certifications & Standards",
    desc: "The quality frameworks and good-practice standards that shape our manufacturing and documentation systems.",
  },
  {
    to: "/quality/manufacturing-infrastructure",
    icon: Factory,
    title: "Manufacturing Infrastructure",
    desc: "Our solid-dosage, sterile, and dedicated containment manufacturing capacity, plus laboratory infrastructure.",
  },
  {
    to: "/quality/regulatory-affairs-market-access",
    icon: ClipboardCheck,
    title: "Regulatory Affairs & Market Access",
    desc: "Registration strategy, dossier development, labeling, and market access support across the product lifecycle.",
  },
];

export default function Quality() {
  return (
    <>
      <SEO
        title="Quality & Certifications"
        description="Quality assurance, quality control, and compliance systems built into every stage of the product lifecycle at Strikar Lifescience LLP."
        canonicalPath="/quality"
      />
      <PageHeader eyebrow="Quality Assurance" title="Quality & Certifications" />

      <section className="section container-page grid lg:grid-cols-12 gap-x-12 gap-y-10 items-center">
        <div className="lg:col-span-7">
          <p className="text-slate-600 leading-relaxed text-lg mt-5">
            At Strikar Lifescience, quality is not limited to testing finished products. It is embedded throughout
            every stage of the product lifecycle, from product development and raw material selection to
            manufacturing, quality control, regulatory compliance, and post-commercialization support. Our commitment
            to quality reflects our responsibility to customers, healthcare professionals, institutions, regulators,
            and ultimately the patients who rely on healthcare products every day.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mt-4">
            Our manufacturing facilities operate under WHO-GMP principles, supported by Good Documentation Practices
            (GDP), Corrective & Preventive Action (CAPA) systems, Quality Risk Management, and Data Integrity
            practices. Through robust quality systems, scientific expertise, manufacturing excellence, and continuous
            improvement initiatives, we strive to consistently deliver healthcare solutions that meet international
            quality standards and customer expectations, guided by patient-centered thinking, regulatory
            compliance, product consistency, and a culture of doing things right the first time.
          </p>
        </div>
        <PhotoSlot
          src={QUALITY_LAB_IMAGE}
          icon={FlaskConical}
          alt="Strikar Lifescience quality control laboratory"
          className="lg:col-span-5 w-full aspect-[4/3] rounded-2xl shadow-soft"
        />
      </section>

      {/* Credential masthead -- a badge row, not another card grid, so a
          short (even single-item) list still reads as intentional rather
          than a sparse grid with empty-looking columns. */}
      <section className="section-sm section-dark">
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-accent-300">
            Certified Standards
          </p>
          <div className="flex flex-1 flex-wrap gap-x-10 gap-y-5">
            {CERTIFICATIONS.map((c) => (
              <div key={c.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/15 text-accent-400">
                  <BadgeCheck size={18} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-white">{c.title}</h3>
                  {c.description && <p className="mt-0.5 max-w-xs text-sm text-primary-200/80">{c.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <TwoToneHeading text="Quality, Infrastructure & Regulatory Support" className="section-title mt-3" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUALITY_LINK_CARDS.map(({ to, icon: Icon, title, desc }, i) => (
              <Link key={to} to={to} className="card card-hover card-bold relative overflow-hidden p-6 pt-7 flex flex-col group">
                <div className="icon-badge relative">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-lg text-primary-900 mt-4">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 flex-1">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all">
                  Learn More <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
