import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LifeBuoy, Clock, Globe2 } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const WHO_WE_SUPPORT = [
  "Hospitals & Healthcare Institutions",
  "Government Health Authorities",
  "Ministry of Health Programs",
  "Procurement Agencies",
  "Specialty Pharmaceutical Distributors",
  "Healthcare Providers",
  "Clinical Research Organizations",
  "Public Health Programs",
  "Humanitarian Healthcare Initiatives",
  "Authorized Importers",
];

export default function EmergencySupplyPatientAccess() {
  return (
    <>
      <SEO
        title="Emergency Supply & Patient Access"
        description="Supporting healthcare systems with critical and time-sensitive supply solutions for cases that fall outside conventional commercial channels."
        canonicalPath="/business-divisions/emergency-supply-patient-access"
      />
      <PageHeader eyebrow="Business Division" title="Emergency Supply & Patient Access" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="icon-badge">
            <LifeBuoy size={22} />
          </div>
          <TwoToneHeading text="Bridging Healthcare Gaps Through Timely Access" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Our Emergency Supply & Patient Access Division supports healthcare systems with critical and
            time-sensitive supply solutions for cases that fall outside conventional commercial channels, in
            coordination with the relevant regulatory pathways in each market.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            We work with hospitals, healthcare providers, procurement agencies, specialty distributors, and
            government organizations to help maintain continuity of care when standard supply routes face
            limitations, always operating within applicable local regulatory frameworks.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Every requirement is evaluated on its own terms, guided by regulatory understanding, our international
            healthcare network, and a commitment to responsible, patient-focused engagement.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card card-hover card-bold p-6">
              <div className="icon-badge">
                <Clock size={22} />
              </div>
              <h3 className="font-bold text-primary-900 mt-4">Responsive Engagement</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Focused on timely communication and practical, case-by-case problem-solving.
              </p>
            </div>
            <div className="card card-hover card-bold p-6">
              <div className="icon-badge">
                <Globe2 size={22} />
              </div>
              <h3 className="font-bold text-primary-900 mt-4">International Healthcare Network</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Experience supporting healthcare organizations across diverse international markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page [&>*]:max-w-3xl">
          <TwoToneHeading text="Healthcare Stakeholders We Work With" className="section-title mt-3" />
          <div className="mt-6 flex flex-wrap gap-2">
            {WHO_WE_SUPPORT.map((s) => (
              <span key={s} className="badge bg-primary-50 text-primary-700">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center max-w-2xl mx-auto">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Have a Time-Sensitive Supply Requirement?</h2>
          <p className="mt-3 text-primary-100/90">
            Every situation is different. Reach out through our Inquiry Center and our team will follow up to
            discuss your specific requirement.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Visit the Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
