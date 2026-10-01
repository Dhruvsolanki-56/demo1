import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  RefreshCcw,
  ClipboardList,
  FlaskConical,
  Truck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const STANDARDS_FRAMEWORKS = [
  "WHO-GMP",
  "Good Documentation Practices (GDP)",
  "Quality Risk Management Principles",
  "Data Integrity Practices",
  "Continuous Improvement Programs",
  "Change Control Management",
  "Corrective & Preventive Action (CAPA) Systems",
  "Product Lifecycle Quality Support",
];

const QA_CAPABILITIES = [
  "Quality Management Systems",
  "Documentation Control",
  "Deviation Management",
  "CAPA Programs",
  "Change Control Systems",
  "Product Release Procedures",
  "Compliance Monitoring",
  "Internal Quality Reviews",
];

const QC_CAPABILITIES = [
  "Raw Material Testing",
  "In-Process Controls",
  "Finished Product Testing",
  "Stability Studies",
  "Packaging Material Evaluation",
  "Microbiological Testing",
  "Analytical Testing",
];

const LAB_CAPABILITIES = [
  "High Performance Liquid Chromatography (HPLC)",
  "Gas Chromatography (GC)",
  "Microbiology Laboratory",
  "Stability Study Programs",
  "Analytical Testing",
  "Method Development Support",
  "Raw Material Analysis",
  "Finished Product Evaluation",
];

const DOCUMENTATION_AREAS = [
  "Product Technical Documentation",
  "Certificates & Declarations",
  "Stability Documentation",
  "Quality Documentation",
  "Product Information Files",
  "Regulatory Submission Packages",
  "Market-Specific Documentation",
  "Compliance Documentation",
];

const SUPPLIER_FOCUS = [
  "Supplier Evaluation",
  "Material Qualification",
  "Documentation Verification",
  "Traceability Support",
  "Quality-Focused Procurement",
  "Supply Chain Reliability",
];

export default function CertificationsStandards() {
  return (
    <>
      <SEO
        title="Certifications & Standards"
        description="The quality frameworks, good manufacturing practices, and documentation standards behind Strikar Lifescience LLP's manufacturing and quality systems."
        canonicalPath="/quality/certifications-standards"
      />
      <PageHeader eyebrow="Quality Assurance" title="Certifications & Standards" />


      <section className="section max-w-3xl container-page">
        <p className="text-slate-600 leading-relaxed text-lg">
          At Strikar Lifescience, quality and compliance form the foundation of everything we do. Our approach
          extends beyond manufacturing and product development to encompass quality systems, documentation
          practices, regulatory readiness, continuous improvement initiatives, and customer support throughout the
          product lifecycle.
        </p>
        <p className="text-slate-600 leading-relaxed text-lg mt-4">
          Healthcare organizations, distributors, institutional buyers, regulatory authorities, and patients depend
          on products that are manufactured, documented, and supported in accordance with internationally recognized
          standards and good practices. Through our manufacturing capabilities, quality systems, regulatory
          expertise, and strategic manufacturing &amp; regulatory alliances, we remain committed to maintaining high
          standards of quality, consistency, compliance, and operational excellence.
        </p>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Built on Internationally Recognized Quality Practices" className="section-title mt-3" />
            <p className="text-slate-600 mt-3 leading-relaxed">
              Our manufacturing operations are supported by quality systems and practices designed to meet the
              expectations of global healthcare markets.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STANDARDS_FRAMEWORKS.map((item) => (
              <div key={item} className="card card-hover card-bold p-5 flex items-start gap-3">
                <ShieldCheck size={20} className="text-primary-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-primary-900">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Quality at Every Stage" className="section-title mt-3" />
            <p className="text-slate-600 mt-3 leading-relaxed">
              Quality is incorporated into every stage of product development and manufacturing through integrated
              Quality Assurance (QA) and Quality Control (QC) processes, with the objective of ensuring products
              consistently meet quality specifications and customer expectations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="card p-6">
              <div className="icon-badge">
                <ClipboardList size={22} />
              </div>
              <h3 className="font-bold text-lg text-primary-900 mt-4">Quality Assurance Capabilities</h3>
              <ul className="text-sm text-slate-600 mt-3 space-y-1.5">
                {QA_CAPABILITIES.map((v) => (
                  <li key={v} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-accent-500 shrink-0 mt-0.5" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <div className="icon-badge">
                <FlaskConical size={22} />
              </div>
              <h3 className="font-bold text-lg text-primary-900 mt-4">Quality Control Capabilities</h3>
              <ul className="text-sm text-slate-600 mt-3 space-y-1.5">
                {QC_CAPABILITIES.map((v) => (
                  <li key={v} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-accent-500 shrink-0 mt-0.5" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Supporting Scientific Quality Evaluation" className="section-title mt-3" />
            <p className="text-slate-600 mt-3 leading-relaxed">
              Our analytical and testing capabilities support manufacturing operations, product development, and
              quality assurance initiatives, helping support quality verification, documentation readiness,
              and regulatory compliance requirements.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LAB_CAPABILITIES.map((item) => (
              <div key={item} className="card card-hover card-bold p-5 flex items-start gap-3">
                <FlaskConical size={20} className="text-primary-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-primary-900">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <div>
            <div className="icon-badge">
              <FileText size={22} />
            </div>
            <h3 className="font-bold text-lg text-primary-900 mt-4">Documentation &amp; Regulatory Readiness</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Healthcare products require comprehensive documentation to support registrations, audits, market
              access, and lifecycle management activities. Strong documentation practices help facilitate
              transparency, traceability, and regulatory readiness across international markets.
            </p>
            <ul className="text-sm text-slate-600 mt-4 space-y-1.5">
              {DOCUMENTATION_AREAS.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="icon-badge">
              <Truck size={22} />
            </div>
            <h3 className="font-bold text-lg text-primary-900 mt-4">Supplier &amp; Material Quality Standards</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Product quality is influenced by the quality of raw materials, packaging components, and supply-chain
              processes. Where applicable, we seek to work with suppliers operating under recognized quality and
              compliance standards consistent with our quality expectations.
            </p>
            <ul className="text-sm text-slate-600 mt-4 space-y-1.5">
              {SUPPLIER_FOCUS.map((v) => (
                <li key={v} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <div className="icon-badge">
            <RefreshCcw size={22} />
          </div>
          <TwoToneHeading text="Continuous Improvement" className="section-title mt-4" />
          <p className="text-slate-600 mt-3 leading-relaxed">
            Healthcare markets continue to evolve, and quality systems must evolve with them. Strikar Lifescience
            supports continuous improvement initiatives focused on product quality enhancement, process
            optimization, operational excellence, regulatory readiness, documentation improvements, customer
            satisfaction, risk mitigation, and quality system development, helping us maintain reliability
            while adapting to changing industry requirements.
          </p>
          <p className="text-slate-600 mt-4 leading-relaxed">
            At Strikar Lifescience, quality and compliance are not departments; they are organizational
            responsibilities shared across every function and every stage of the healthcare product lifecycle. Our
            commitment is simple: to maintain quality without compromise and to support healthcare excellence
            through responsible manufacturing, regulatory compliance, and continuous improvement.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Have a Quality or Compliance Question?</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Reach out to our team to discuss documentation requirements, quality systems, or certification details
            relevant to your market.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Contact Our Team <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
