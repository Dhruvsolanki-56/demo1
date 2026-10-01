import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Hospital,
  Landmark,
  HeartHandshake,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Medical & Surgical Supplies",
    description:
      "Supply support for medical consumables, surgical products, healthcare support products, and institutional healthcare requirements.",
    areas: [
      "Medical consumables",
      "Surgical products",
      "Healthcare support products",
      "Infection prevention products",
      "Clinical support supplies",
      "Institutional supply support",
    ],
  },
  {
    icon: Hospital,
    title: "Hospital Healthcare Solutions",
    description:
      "Healthcare product programs designed to support hospitals, clinics, specialty-care centers, long-term care settings, and healthcare networks.",
    areas: [
      "Hospital product programs",
      "Clinical support solutions",
      "Healthcare procurement support",
      "Product availability coordination",
      "Institutional supply planning",
      "Operational support for healthcare facilities",
    ],
  },
  {
    icon: Landmark,
    title: "Government & Institutional Healthcare Programs",
    description:
      "Support for public healthcare initiatives, healthcare ministries, procurement agencies, and institutional healthcare programs.",
    areas: [
      "Government healthcare procurement support",
      "Public sector supply initiatives",
      "Institutional healthcare programs",
      "Healthcare project coordination",
      "Ministry of Health program support",
      "Long-term supply planning",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Public Health Initiatives",
    description:
      "Collaborative healthcare support programs that can contribute to broader public health objectives, healthcare outreach, prevention, and access initiatives.",
    areas: [
      "Disease prevention programs",
      "Healthcare outreach support",
      "Community health initiatives",
      "Public healthcare support",
      "Healthcare awareness programs",
      "Access-focused healthcare initiatives",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Tender Support Programs",
    description:
      "Support for government, institutional, NGO, and international healthcare tenders requiring documentation readiness, product selection, and supply planning.",
    areas: [
      "Tender product selection support",
      "Technical documentation coordination",
      "Regulatory documentation support",
      "Commercial evaluation support",
      "Tender readiness planning",
      "Post-award supply coordination",
    ],
  },
];

export default function HealthcareInstitutionalSolutions() {
  return (
    <>
      <SEO
        title="Healthcare & Institutional Solutions"
        description="Medical and surgical supplies, hospital support programs, government healthcare projects, public health initiatives, and tender support from Strikar Lifescience."
        canonicalPath="/services/healthcare-institutional-solutions"
      />
      <PageHeader eyebrow="Services" title="Healthcare & Institutional Solutions" />

      <section className="section">
        <div className="container-page max-w-3xl">
          <Link to="/services" className="tap inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:gap-2.5 transition-all">
            <ArrowLeft size={15} /> Back to Services
          </Link>
          <TwoToneHeading text="Supporting Healthcare Systems, Institutions & Public Health Programs" className="section-title mt-6" />
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Healthcare institutions require dependable access to quality products, procurement support,
            documentation readiness, and continuity of supply. Hospitals, public health programs, procurement
            agencies, and healthcare systems often operate under strict operational, regulatory, budgetary, and
            documentation requirements.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Strikar Lifescience supports hospitals, healthcare systems, government procurement agencies, public
            health organizations, and institutional programs through healthcare solutions designed to support
            operational efficiency, product availability, and improved healthcare delivery.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-2 gap-6">
          {SERVICES.map(({ icon: Icon, title, description, areas }) => (
            <div key={title} className="card card-hover card-bold p-7 flex flex-col">
              <div className="icon-badge h-12 w-12">
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-lg text-primary-900 mt-5">{title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-600 mt-5">Support Areas</p>
              <ul className="text-sm text-slate-600 mt-2 space-y-1.5">
                {areas.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Discuss an Institutional Program</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Strikar Lifescience supports institutional healthcare programs, public procurement opportunities,
            hospital supply requirements, public health projects, and tender participation through a practical,
            documentation-focused approach.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Discuss Institutional Program <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
