import React from "react";
import { Link } from "react-router-dom";
import {
  FlaskConical,
  Factory,
  Boxes,
  Tags,
  Repeat,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const SERVICES = [
  {
    icon: FlaskConical,
    title: "Contract Development & Manufacturing (CDMO)",
    description:
      "Comprehensive development and manufacturing support across the product lifecycle, from product concept and formulation planning to commercial manufacturing readiness.",
    areas: [
      "Formulation development support",
      "Product development planning",
      "Process development and scale-up coordination",
      "Validation planning and technical documentation support",
      "Packaging development and artwork coordination",
      "Commercial manufacturing readiness",
      "Lifecycle product support",
    ],
  },
  {
    icon: Factory,
    title: "Contract Manufacturing (CMO)",
    description:
      "Manufacturing support for established pharmaceutical, nutraceutical, and healthcare products requiring commercial-scale production and dependable supply execution.",
    areas: [
      "Commercial batch manufacturing",
      "Production planning and supply coordination",
      "Packaging operations",
      "Quality documentation support",
      "Batch documentation coordination",
      "Export readiness support",
      "Ongoing product supply support",
    ],
  },
  {
    icon: Boxes,
    title: "Third-Party Manufacturing",
    description:
      "Flexible manufacturing partnerships that allow healthcare companies, distributors, and brand owners to expand their product portfolios without establishing additional production infrastructure.",
    areas: [
      "Portfolio expansion support",
      "Market-specific product manufacturing",
      "Distributor and brand-owner requirements",
      "Commercial packaging coordination",
      "Documentation support",
      "Supply continuity planning",
      "International market support",
    ],
  },
  {
    icon: Tags,
    title: "OEM & Private Label Manufacturing",
    description:
      "Customized manufacturing and branding solutions for distributors, healthcare companies, retail brands, institutional buyers, and commercial partners seeking market-ready products under their own brand identity.",
    areas: [
      "Private label support",
      "OEM product development",
      "Brand-specific packaging",
      "Country-specific artwork adaptation",
      "Multi-language packaging support",
      "Commercial packaging optimization",
      "Portfolio launch support",
    ],
  },
  {
    icon: Repeat,
    title: "Technology Transfer",
    description:
      "Structured technical coordination to support the transfer of products, manufacturing processes, analytical methods, and documentation between development, manufacturing, and commercialization stages.",
    areas: [
      "Process transfer support",
      "Documentation transfer coordination",
      "Manufacturing process alignment",
      "Analytical method transfer support",
      "Validation planning",
      "Technical troubleshooting coordination",
      "Commercial readiness review",
    ],
  },
  {
    icon: Lightbulb,
    title: "Product Development",
    description:
      "Product development support designed to help partners identify, formulate, prepare, and commercialize products aligned with market demand, regulatory expectations, and business objectives.",
    areas: [
      "Product selection and portfolio planning",
      "Formulation development support",
      "Market feasibility assessment",
      "Packaging configuration planning",
      "Product differentiation strategy",
      "Dossier planning support",
      "Lifecycle development planning",
    ],
  },
];

export default function ManufacturingSolutions() {
  return (
    <>
      <SEO
        title="Manufacturing Solutions"
        description="CDMO, CMO, third-party manufacturing, OEM/private label, technology transfer, and product development support from Strikar Lifescience."
        canonicalPath="/services/manufacturing-solutions"
      />
      <PageHeader eyebrow="Services" title="Manufacturing Solutions" />

      <section className="section">
        <div className="container-page max-w-3xl">
          <Link to="/services" className="tap inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:gap-2.5 transition-all">
            <ArrowLeft size={15} /> Back to Services
          </Link>
          <TwoToneHeading text="Advancing Healthcare Products from Development to Commercialization" className="section-title mt-6" />
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Successful healthcare products require more than production capacity. They require development
            knowledge, scalable manufacturing, appropriate packaging, regulatory awareness, quality systems, and
            commercial readiness.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Strikar Lifescience supports customers through flexible manufacturing models designed to help transform
            product concepts, portfolio opportunities, and market-specific requirements into commercially viable
            healthcare products. Whether a partner is launching a new product, expanding an existing portfolio,
            entering new territories, developing private-label products, or supporting institutional requirements,
            our manufacturing solutions are structured to align with commercial objectives and market requirements.
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
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Looking for a Manufacturing Partner?</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Share your product requirements and our team will help identify a suitable pathway for development,
            manufacturing, documentation, and commercialization support.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Request Manufacturing Support <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
