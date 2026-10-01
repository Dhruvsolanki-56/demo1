import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Layers,
  FileCheck2,
  FlaskConical,
  Globe2,
  Building2,
  Boxes,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Truck,
  Users,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const AUDIENCE = [
  { icon: Truck, label: "Importers" },
  { icon: Boxes, label: "Distributors" },
  { icon: Building2, label: "Hospitals" },
  { icon: Users, label: "Procurement Agencies" },
];

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Manufacturing Excellence",
    desc: "WHO-GMP manufacturing capabilities supported by diversified dosage-form expertise, robust quality systems, and a strong commitment to product quality, consistency, reliability, and compliance.",
  },
  {
    icon: Layers,
    title: "Broad Product & Development Capabilities",
    desc: "Extensive expertise across multiple dosage forms, therapeutic categories, established generic products, specialty healthcare solutions, and products tailored to market-specific requirements.",
  },
  {
    icon: FileCheck2,
    title: "Regulatory Affairs & Registration Support",
    desc: "Comprehensive support spanning technical documentation, stability studies, dossier preparation, artwork development, compliance documentation, and registration readiness.",
  },
  {
    icon: FlaskConical,
    title: "Product Development & Commercialization Support",
    desc: "From formulation development and product optimization to portfolio expansion and market-entry initiatives, we help partners turn opportunities into commercially viable solutions.",
  },
  {
    icon: Globe2,
    title: "Regional Presence & Market Understanding",
    desc: "Strategic regional hubs in Guatemala and Thailand enable localized engagement, improved responsiveness, and stronger support across Latin America, the Caribbean, and Southeast Asia.",
  },
  {
    icon: Building2,
    title: "Government & Institutional Healthcare Experience",
    desc: "Experience supporting Ministry of Health programs, institutional procurement, hospital supply initiatives, tender opportunities, and public health projects across diverse markets.",
  },
  {
    icon: Handshake,
    title: "Flexible Partnership Models",
    desc: "Supporting Contract Manufacturing (CMO), Contract Development & Manufacturing (CDMO), Private Label Manufacturing, Technology Transfer, and Strategic Alliances.",
  },
  {
    icon: Users,
    title: "Commitment Beyond Product Supply",
    desc: "Our relationship with customers extends beyond manufacturing. We remain actively engaged throughout the product lifecycle, providing technical, regulatory, commercial, and quality support.",
  },
];

const CHECKLIST = [
  "WHO-GMP Manufacturing Excellence",
  "Multiple Dosage Forms & Therapeutic Categories",
  "Product Development & Formulation Expertise",
  "Regulatory Affairs & Registration Support",
  "CMO, CDMO & Private Label Manufacturing",
  "Strategic Manufacturing & Regulatory Alliances",
  "Regional Hubs in Guatemala & Thailand",
  "Government & Institutional Healthcare Experience",
  "Emergency Supply & Patient Access Solutions",
  "Long-Term, Customer-Focused Partnerships",
];

export default function WhyChooseStrikar() {
  return (
    <>
      <SEO
        title="Why Choose Strikar Lifescience"
        description="Why importers, distributors, hospitals, and procurement agencies choose Strikar Lifescience as a reliable healthcare sourcing partner."
        canonicalPath="/about/why-choose-strikar"
      />
      <PageHeader eyebrow="For Buyers & Institutions" title="Why Choose Strikar Lifescience?" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg">
            At Strikar Lifescience, we combine manufacturing excellence, regulatory expertise, market understanding,
            and long-term partnership commitment to help healthcare organizations build sustainable and competitive
            healthcare businesses across international markets.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {AUDIENCE.map(({ icon: Icon, label }) => (
              <div key={label} className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
                <Icon size={16} /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons grid */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Built for Reliable Sourcing" className="section-title mt-3" />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REASONS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card card-hover card-bold p-6 flex flex-col">
                <div className="icon-badge">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-primary-900 mt-4">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 flex-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Why Choose Strikar Lifescience" className="section-title mt-3" />
          <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-primary-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Commitment */}
      <section className="section-lg section-dark relative">
        <div className="relative container-page max-w-3xl text-center mx-auto">
          <h2 className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">More Than a Supplier</h2>
          <p className="mt-4 text-primary-100/90 leading-relaxed">
            Our relationship with buyers extends beyond manufacturing. We remain actively engaged throughout the
            product lifecycle, supporting technical documentation, stability data, regulatory requirements, and
            post-commercialization needs, to create lasting value for our partners while contributing to better
            health outcomes for the people and communities they serve.
          </p>
        </div>
      </section>

      <section className="section bg-primary-700 text-white relative">
        <div className="relative container-page text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Looking for a Reliable Sourcing Partner?</h2>
          <p className="mt-3 text-primary-50 max-w-2xl mx-auto">
            Tell us about your requirement and our team will follow up with the right product and regulatory fit.
          </p>
          <Link to="/contact" className="btn-highlight btn-pill mt-6 !px-8 !py-3 text-base">
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
