import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  FileText,
  Tags,
  TrendingUp,
  RefreshCcw,
  ArrowRight,
  FileCheck2,
  Globe2,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const PILLARS = [
  {
    icon: Compass,
    title: "Product Registration & Regulatory Strategy",
    desc:
      "Navigating regulatory requirements across multiple countries can be complex and resource-intensive. Our team assists customers in building efficient regulatory pathways that support both market entry and long-term compliance objectives, while helping select the most efficient pathway and minimize delays.",
    examples: ["Registration Roadmap Preparation", "Regulatory Gap Assessment", "Market-Specific Regulatory Planning"],
  },
  {
    icon: FileText,
    title: "Dossier Development & Technical Documentation",
    desc:
      "Comprehensive and well-structured technical documentation is critical for successful regulatory submissions and customer confidence. We assist customers in preparing CTD, eCTD, ACTD, and Drug Master File (DMF) documentation packages suitable for regulatory authorities, institutional buyers, and commercialization partners.",
    examples: ["CTD / eCTD / ACTD Dossier Preparation", "DMF Coordination", "Documentation Gap Analysis"],
  },
  {
    icon: Tags,
    title: "Artwork, Labeling & Packaging Development",
    desc:
      "Packaging and labeling serve both regulatory and commercial functions. Our team supports the development of market-ready packaging that aligns with country-specific requirements and brand positioning objectives, balancing compliance with market appeal and supply-chain practicality.",
    examples: ["Label Design & Compliance Review", "Multi-Language Packaging Support", "Insert & Leaflet Development"],
  },
  {
    icon: TrendingUp,
    title: "Market Access & Commercialization Planning",
    desc:
      "Bringing a product to market requires strategic planning beyond regulatory approvals. We assist customers in evaluating commercial readiness and identifying the most suitable market-entry opportunities, aligning regulatory efforts with realistic commercial objectives.",
    examples: ["Country Feasibility Evaluation", "Distributor Engagement Support", "Tender Readiness Support"],
  },
  {
    icon: RefreshCcw,
    title: "Compliance & Lifecycle Management",
    desc:
      "Healthcare products require ongoing maintenance beyond registration approval. We support customers throughout the product lifecycle, including variations, renewals, artwork updates, and pharmacovigilance coordination support, to help maintain compliance and commercial continuity.",
    examples: ["Registration Renewal Support", "Pharmacovigilance Coordination Support", "Regulatory Impact Assessments"],
  },
];

const REGULATORY_ENVIRONMENTS = [
  "WHO-GMP Markets",
  "US FDA Aligned Opportunities",
  "EU-GMP Markets",
  "Health Canada Opportunities",
  "PIC/S Member Countries",
  "ANVISA-Regulated Markets",
  "INVIMA-Regulated Markets",
  "DIGEMID-Regulated Markets",
  "COFEPRIS-Regulated Markets",
  "GCC Markets",
  "LATAM Markets",
  "Africa & Emerging Markets",
  "Government & Institutional Procurement Programs",
];

export default function RegulatoryAffairs() {
  return (
    <>
      <SEO
        title="Regulatory Affairs & Market Access"
        description="Product registration strategy, dossier development, labeling, and market access & lifecycle management support from Strikar Lifescience LLP."
        canonicalPath="/quality/regulatory-affairs-market-access"
      />
      <PageHeader eyebrow="Quality Assurance" title="Regulatory Affairs, Market Access & Commercialization Support" />

      <section className="section max-w-3xl container-page">
        <p className="text-slate-600 leading-relaxed text-lg">
          Successful healthcare products require more than manufacturing excellence. They require a clear regulatory
          pathway, robust technical documentation, market-specific compliance planning, and a well-structured
          commercialization strategy.
        </p>
        <p className="text-slate-600 leading-relaxed text-lg mt-4">
          At Strikar Lifescience, we support pharmaceutical and nutraceutical partners throughout the entire product
          lifecycle, helping transform product concepts into commercially viable and regulatory-ready healthcare
          solutions. Our team works closely with customers to navigate complex regulatory environments, accelerate
          registrations, support market entry initiatives, and ensure long-term product sustainability across
          international markets. Whether the objective is product registration, portfolio expansion, institutional
          procurement, private-label commercialization, market launch, or international expansion, we provide
          practical regulatory and commercialization support tailored to individual market requirements.
        </p>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-2 gap-6">
          {PILLARS.map(({ icon: Icon, title, desc, examples }) => (
            <div key={title} className="card card-hover card-bold p-7 flex flex-col">
              <div className="icon-badge h-12 w-12">
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-lg text-primary-900 mt-5">{title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed flex-1">{desc}</p>
              <ul className="text-xs text-slate-600 mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                {examples.map((ex) => (
                  <li key={ex} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <div className="icon-badge">
              <Globe2 size={22} />
            </div>
            <TwoToneHeading text="Markets We Help You Navigate" className="section-title mt-3" />
            <p className="text-slate-600 mt-3 leading-relaxed">
              Through our regulatory expertise, manufacturing capabilities, and strategic manufacturing &amp;
              regulatory alliances, Strikar Lifescience is positioned to support product registration and
              market-entry projects across a wide range of regulatory environments, including:
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {REGULATORY_ENVIRONMENTS.map((env) => (
              <span key={env} className="badge bg-white border border-slate-200 text-slate-700">
                <FileCheck2 size={13} className="text-primary-600" /> {env}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Need a Dossier or a Registration Feasibility Check?</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Visit our Inquiry Center and submit a &ldquo;Dossier Request&rdquo; for technical or regulatory
            documentation, or a &ldquo;Registration Feasibility&rdquo; inquiry to ask whether a product can be
            registered and supplied into your target market.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Go to Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
