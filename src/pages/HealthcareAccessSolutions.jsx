import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, FileCheck2, Globe2, ClipboardList, ArrowRight, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const PRINCIPLES = [
  { icon: ShieldCheck, label: "Compliance-Led Coordination" },
  { icon: FileCheck2, label: "Documentation Support" },
  { icon: Globe2, label: "Market-Specific Compliance Review" },
  { icon: ClipboardList, label: "Practical Supply Planning" },
];

export default function HealthcareAccessSolutions() {
  return (
    <>
      <SEO
        title="Healthcare Access Solutions"
        description="Responsible, compliance-led healthcare access solutions from Strikar Lifescience, helping authorized stakeholders address product availability challenges."
        canonicalPath="/services/healthcare-access-solutions"
      />
      <PageHeader eyebrow="Services" title="Healthcare Access Solutions" />

      <section className="section">
        <div className="container-page max-w-3xl">
          <Link to="/services" className="tap inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:gap-2.5 transition-all">
            <ArrowLeft size={15} /> Back to Services
          </Link>

          <TwoToneHeading text="Expanding Access to Essential Healthcare Products" className="section-title mt-6" />

          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Healthcare access remains a major challenge across many countries, therapeutic areas, and healthcare
            systems. Shortages, delayed registrations, and limited product availability can create serious barriers
            to treatment continuity for patients and the healthcare organizations that serve them.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Strikar Lifescience supports healthcare organizations, distributors, hospitals, procurement agencies,
            and authorized stakeholders through responsible and compliant healthcare access solutions designed to
            help bridge product availability gaps. Our approach is structured around patient-centered support,
            documentation coordination, market-specific compliance, and practical supply planning.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Because healthcare access solutions are subject to jurisdiction-specific regulations and eligibility
            requirements, every request is reviewed individually with qualified and authorized stakeholders. To
            discuss a specific healthcare access requirement, please reach out to our team through the Inquiry
            Center.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map(({ icon: Icon, label }) => (
            <div key={label} className="card p-6 text-center">
              <div className="mx-auto icon-badge rounded-full">
                <Icon size={20} />
              </div>
              <p className="mt-3 text-sm font-bold text-slate-700 leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Have a Healthcare Access Requirement?</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            If your organization is addressing product availability, documentation, or supply-continuity challenges,
            our team can help evaluate suitable pathways subject to applicable regulatory requirements.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Request Access Support <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
