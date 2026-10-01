import React from "react";
import { Link } from "react-router-dom";
import {
  Factory,
  Pill,
  Syringe,
  ShieldAlert,
  FlaskConical,
  Microscope,
  ArrowRight,
  Beaker,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const OVERVIEW_CATEGORIES = [
  "Oral Solid Dosage Forms",
  "Sterile Injectables",
  "Lyophilized Products",
  "Beta-Lactam Products",
  "Cephalosporins",
  "Carbapenems",
  "Ophthalmic Preparations",
  "Nasal Preparations",
  "Prefilled Syringes",
  "Specialized Sterile Formulations",
];

const OVERVIEW_SUPPORT = [
  "Research & Development",
  "Formulation Development",
  "Analytical Development",
  "Quality Control Laboratories",
  "Quality Assurance Systems",
  "Stability Programs",
  "Technology Transfer Capabilities",
];

const UNIT1_STATS = [
  { label: "Tablets", value: "2.2 Billion", unit: "Units / Year" },
  { label: "Capsules", value: "400 Million", unit: "Units / Year" },
];

const UNIT2_SPECIALTY = [
  { label: "Ophthalmic / Otic Drops & Nasal Sprays", value: "50,000", unit: "Units / Shift" },
  { label: "Prefilled Syringes", value: "40,000", unit: "Units / Shift" },
  { label: "Sterile Ophthalmic Ointments", value: "50,000", unit: "Units / Shift" },
];

const UNIT2_INJECTABLE = [
  { label: "Liquid Ampoules", value: "200,000", unit: "Units / Shift" },
  { label: "Lyophilized Vials", value: "40,000", unit: "Units / Shift" },
  { label: "Dry Powder Vials", value: "30,000", unit: "Units / Shift" },
];

const UNIT3_STATS = [
  { label: "Sterile Cephalosporin Powder for Injection", value: "100,000", unit: "Units / Shift" },
  { label: "Sterile Beta-Lactam Penicillin Powder for Injection", value: "100,000", unit: "Units / Shift" },
  { label: "Sterile Carbapenem Powder for Injection", value: "50,000", unit: "Units / Shift" },
  { label: "Lyophilized Carbapenem Vials", value: "20,000", unit: "Units / Shift" },
];

const RD_CAPABILITIES = [
  "New Product Development",
  "Formulation Optimization",
  "Technology Transfer",
  "Scale-Up Activities",
  "Product Lifecycle Support",
  "Cost Optimization Initiatives",
];

const LAB_INFRASTRUCTURE = [
  "High Performance Liquid Chromatography (HPLC)",
  "Gas Chromatography (GC)",
  "Microbiology Laboratory",
  "Stability Studies",
  "Raw Material Testing",
  "Finished Product Testing",
  "Analytical Method Development",
];

function StatCard({ label, value, unit }) {
  return (
    <div className="card card-hover card-bold p-6">
      <p className="text-3xl font-extrabold text-primary-900">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 mt-1">{unit}</p>
      <p className="text-sm text-slate-600 mt-3 leading-snug">{label}</p>
    </div>
  );
}

export default function ManufacturingInfrastructure() {
  return (
    <>
      <SEO
        title="Manufacturing Infrastructure"
        description="Strikar Lifescience LLP's solid dosage, sterile, and dedicated beta-lactam/cephalosporin manufacturing capacity, plus analytical laboratory infrastructure."
        canonicalPath="/quality/manufacturing-infrastructure"
      />
      <PageHeader eyebrow="Quality Assurance" title="Manufacturing Infrastructure & Capacity" />

      <section className="section max-w-3xl container-page">
        <p className="text-slate-600 leading-relaxed text-lg mt-5">
          Strikar Lifescience operates modern pharmaceutical manufacturing facilities designed to support diverse
          dosage forms, stringent quality requirements, and scalable production needs across international
          healthcare markets. Our manufacturing infrastructure combines high-volume production capabilities,
          specialized sterile facilities, dedicated containment areas, advanced analytical laboratories, research
          and development capabilities, and comprehensive quality systems to support pharmaceutical products
          throughout their lifecycle.
        </p>
      </section>

      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-bold text-lg text-primary-900">Our Facilities Are Designed to Support</h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {OVERVIEW_CATEGORIES.map((c) => (
                <span key={c} className="badge bg-white border border-slate-200 text-slate-700">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-primary-900">Supported By</h3>
            <ul className="text-sm text-slate-600 mt-4 space-y-1.5">
              {OVERVIEW_SUPPORT.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Unit 1 */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-start gap-3 mb-8">
            <div className="icon-badge shrink-0">
              <Pill size={22} />
            </div>
            <div>
              <span className="text-sm font-semibold text-primary-600">Unit 1: Solid Dosage Manufacturing</span>
              <TwoToneHeading text="Current Manufacturing Capacity" className="section-title mt-2" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {UNIT1_STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-6 max-w-2xl leading-relaxed">
            <span className="font-semibold text-primary-900">Strategic Advantage: </span>
            High-volume production capability supported by future expansion plans designed to support increasing
            market demand, portfolio diversification, and long-term growth opportunities.
          </p>
        </div>
      </section>

      {/* Unit 2 */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-start gap-3 mb-8">
            <div className="icon-badge shrink-0">
              <Syringe size={22} />
            </div>
            <div>
              <span className="text-sm font-semibold text-primary-600">Unit 2: Sterile Manufacturing Facilities</span>
              <TwoToneHeading text="Ophthalmic, Otic & Specialty Sterile Products" className="section-title mt-2" />
            </div>
          </div>

          <h3 className="font-bold text-primary-900 mb-4">Ophthalmic, Otic & Specialty Sterile Products</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {UNIT2_SPECIALTY.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <h3 className="font-bold text-primary-900 mb-4 mt-10">Injectable & Lyophilized Products</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {UNIT2_INJECTABLE.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <p className="text-sm text-slate-600 mt-6 max-w-2xl leading-relaxed">
            <span className="font-semibold text-primary-900">Strategic Advantage: </span>
            Dedicated sterile manufacturing environments supporting critical-care therapies, hospital-use products,
            and specialized injectable formulations.
          </p>
        </div>
      </section>

      {/* Unit 3 */}
      <section className="section">
        <div className="container-page">
          <div className="flex items-start gap-3 mb-8">
            <div className="icon-badge shrink-0">
              <ShieldAlert size={22} />
            </div>
            <div>
              <span className="text-sm font-semibold text-primary-600">Unit 3: Dedicated Beta-Lactam & Cephalosporin Facilities</span>
              <TwoToneHeading text="Specialized Containment Manufacturing" className="section-title mt-2" />
            </div>
          </div>
          <p className="text-slate-600 max-w-2xl mb-6 leading-relaxed">
            Dedicated infrastructure supporting antibiotic and critical-care product categories through segregated
            manufacturing environments.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {UNIT3_STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-6 max-w-2xl leading-relaxed">
            <span className="font-semibold text-primary-900">Strategic Advantage: </span>
            Dedicated facilities supporting specialized antimicrobial products while maintaining strict
            contamination-control measures and product integrity.
          </p>
        </div>
      </section>

      {/* R&D and Lab */}
      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <div>
            <div className="icon-badge">
              <Beaker size={22} />
            </div>
            <h3 className="font-bold text-lg text-primary-900 mt-4">Research, Development & Quality Infrastructure</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Our manufacturing operations are supported by integrated research &amp; development laboratories,
              analytical development laboratories, formulation development facilities, quality control laboratories,
              quality assurance functions, and stability programs.
            </p>
            <ul className="text-sm text-slate-600 mt-4 space-y-1.5">
              {RD_CAPABILITIES.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="icon-badge">
              <Microscope size={22} />
            </div>
            <h3 className="font-bold text-lg text-primary-900 mt-4">Analytical & Quality Capabilities</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              This infrastructure supports quality verification, product consistency, documentation readiness, and
              compliance with international healthcare market requirements.
            </p>
            <ul className="text-sm text-slate-600 mt-4 space-y-1.5">
              {LAB_INFRASTRUCTURE.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <FlaskConical size={15} className="text-accent-500 shrink-0 mt-0.5" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page [&>*]:max-w-3xl">
          <TwoToneHeading text="Built for Growth" className="section-title" />
          <p className="text-slate-600 mt-4 leading-relaxed">
            Our manufacturing platform is designed to support long-term expansion, portfolio diversification,
            strategic alliances, and increasing global healthcare demand. By combining scalable manufacturing
            capabilities, scientific expertise, regulatory understanding, and robust quality systems, Strikar
            Lifescience remains committed to supporting customers throughout the product lifecycle while delivering
            reliable and sustainable healthcare solutions.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Discuss a Manufacturing Requirement</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Whether you need capacity information, a CDMO/CMO conversation, or product development support, our team
            is ready to help.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Start an Inquiry <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
