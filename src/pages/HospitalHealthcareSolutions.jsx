import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope, Building2, Syringe, ShieldPlus, HeartPulse, Landmark, MapPin, Handshake } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";
import HighlightPanel from "../components/HighlightPanel";

const PRODUCT_PORTFOLIO = [
  { icon: Stethoscope, title: "Medical Consumables", desc: "Products designed to support routine patient care, healthcare delivery, medical procedures, and institutional healthcare requirements." },
  { icon: Building2, title: "Hospital Supplies", desc: "Products supporting healthcare facility operations, patient management, and institutional healthcare environments." },
  { icon: Syringe, title: "Surgical Products", desc: "Products intended to support surgical procedures and clinical environments while maintaining quality, reliability, and usability." },
  { icon: ShieldPlus, title: "Infection Prevention Solutions", desc: "Solutions designed to support hygiene standards, infection prevention initiatives, healthcare protocols, and patient safety objectives." },
  { icon: HeartPulse, title: "Healthcare Products", desc: "A broad range of healthcare products supporting hospitals, institutions, public health programs, and rehabilitation services." },
];

const PROGRAM_SUPPORT = [
  "Government Supply Programs",
  "Ministry of Health Initiatives",
  "Institutional Healthcare Programs",
  "Public Health Projects",
  "Hospital Supply Programs",
  "Tender Participation Support",
  "Healthcare Access Initiatives",
  "International Healthcare Projects",
];

const WHY_PARTNER = [
  { icon: Stethoscope, title: "Healthcare-Focused Approach", desc: "Solutions developed to support healthcare systems, institutions, and patient care environments." },
  { icon: Handshake, title: "Reliable Supply & Operational Support", desc: "Committed to continuity, responsiveness, and long-term customer relationships." },
  { icon: Landmark, title: "Government & Institutional Experience", desc: "Supporting public health programs, hospital initiatives, and institutional healthcare requirements." },
  { icon: ShieldPlus, title: "Infection Prevention & Patient Care Focus", desc: "Products designed to support healthcare quality, safety, and patient well-being." },
  { icon: MapPin, title: "Regional Market Presence", desc: "Strategic presence in Latin America and Southeast Asia supporting closer engagement and localized support." },
  { icon: HeartPulse, title: "Long-Term Partnership Commitment", desc: "Focused on creating sustainable healthcare solutions while contributing to improved healthcare delivery and accessibility." },
];

export default function HospitalHealthcareSolutions() {
  return (
    <>
      <SEO
        title="Hospital, Healthcare & Medical Solutions"
        description="Supporting hospitals, healthcare providers, and institutional buyers through a comprehensive portfolio of healthcare products and medical solutions."
        canonicalPath="/business-divisions/hospital-healthcare-medical-solutions"
      />
      <PageHeader eyebrow="Business Division" title="Hospital, Healthcare & Medical Solutions" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <TwoToneHeading text="Supporting Healthcare Institutions Through Reliable Medical Solutions" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Our Hospital, Healthcare & Medical Solutions Division is dedicated to supporting hospitals, healthcare
            providers, procurement agencies, institutional buyers, distributors, and healthcare organizations through
            a comprehensive portfolio of healthcare products and medical solutions designed to meet the evolving
            needs of modern healthcare systems.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Healthcare institutions require more than product availability alone. They require reliability, quality
            assurance, regulatory compliance, continuity of supply, and responsive support. Through our
            healthcare-focused approach, we help customers address operational requirements while supporting improved
            patient care and healthcare delivery outcomes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Healthcare Solutions Built for Institutions" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Our portfolio is designed to support hospitals, clinics, healthcare institutions, procurement
              organizations, public health programs, and medical service providers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_PORTFOLIO.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card card-hover card-bold p-6">
                <div className="icon-badge">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-lg text-primary-900 mt-4">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="icon-badge">
              <Landmark size={22} />
            </div>
            <TwoToneHeading text="Supporting Public Health & Institutional Initiatives" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Strikar Lifescience supports healthcare systems through participation in institutional healthcare
              initiatives, hospital programs, public health projects, and government procurement opportunities.
              Through strong planning, documentation support, and a commitment to service excellence, we help
              healthcare stakeholders address healthcare requirements efficiently and responsibly.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PROGRAM_SUPPORT.map((s) => (
                <span key={s} className="badge bg-primary-50 text-primary-700">{s}</span>
              ))}
            </div>
          </div>
          <HighlightPanel
            icon={Stethoscope}
            title="Why Partner With Us"
            items={[
              "Healthcare-Focused Approach",
              "Reliable Supply & Operational Support",
              "Government & Institutional Experience",
              "Regional Presence in Latin America & Southeast Asia",
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page [&>*]:max-w-3xl">
          <TwoToneHeading text="Beyond Product Supply" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed">
            Healthcare institutions depend on uninterrupted access to quality products and dependable partners. Our
            commitment extends beyond product supply to include responsiveness, documentation support, operational
            coordination, and long-term customer engagement. We work closely with hospitals, distributors,
            procurement agencies, and healthcare organizations to help ensure timely access to healthcare products
            while supporting operational continuity, institutional healthcare goals, and patient care requirements.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Healthcare Solutions You Can Rely On" className="section-title mt-3" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_PARTNER.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card card-hover card-bold p-6">
                <div className="icon-badge">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-primary-900 mt-4">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Partner with Our Hospital & Healthcare Solutions Division</h2>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Visit the Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
