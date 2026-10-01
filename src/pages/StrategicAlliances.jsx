import React from "react";
import { Link } from "react-router-dom";
import {
  Network,
  ShieldCheck,
  Handshake,
  FileCheck2,
  Factory,
  Globe2,
  Award,
  ArrowRight,
  Target,
  Users,
  Briefcase,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const PRINCIPLES = [
  "Quality-First Business Approach",
  "Long-Term Partnership Mindset",
  "Transparent & Responsible Collaboration",
  "Market-Specific Product Strategy",
  "Regulatory & Documentation Readiness",
  "Commercially Viable Product Development",
  "Customer-Focused Execution",
  "Sustainable Healthcare Access",
];

const MANUFACTURING_CAPABILITIES = [
  "Oral Solid Dosage Forms",
  "Injectable Products",
  "Sterile Products",
  "Ophthalmic Preparations",
  "Otic Preparations",
  "Nasal Preparations",
  "Topical Preparations",
  "Nutraceutical Products",
  "Specialty Healthcare Products",
  "Hospital & Institutional Products",
  "Differentiated Formulations",
  "Private Label Opportunities",
];

const QUALITY_FRAMEWORKS = [
  "WHO-GMP",
  "US FDA",
  "European Union GMP (EU-GMP)",
  "Health Canada",
  "PIC/S Regulatory Authorities",
  "ANVISA (Brazil)",
  "INVIMA (Colombia)",
  "DIGEMID (Peru)",
  "COFEPRIS (Mexico)",
  "MHRA (United Kingdom)",
  "GCC Regulatory Authorities",
];

const COMMERCIALIZATION_SUPPORT = [
  "Market Opportunity Identification",
  "Portfolio Expansion Strategies",
  "Market Entry Planning",
  "Distributor & Importer Engagement",
  "Product Registration Coordination",
  "Institutional Business Development",
  "Government Tender Opportunities",
  "Regional Commercialization Programs",
];

const COLLABORATION_MODELS = [
  { icon: Factory, title: "Manufacturing & Development", items: ["Contract Manufacturing (CMO)", "Contract Development & Manufacturing (CDMO)", "Private Label Manufacturing", "Technology Transfer", "Packaging & Artwork Development"] },
  { icon: FileCheck2, title: "Regulatory & Market Entry", items: ["Product Registration Support", "Dossier Preparation & Review", "Regulatory Planning", "Market-Specific Compliance Support", "Lifecycle Management Support"] },
  { icon: Handshake, title: "Commercialization & Alliance", items: ["Co-Marketing Partnerships", "Authorized Commercialization Programs", "Product Licensing Opportunities", "Regional Market Development", "Distributor Development Support"] },
];

const IDEAL_PARTNERS = [
  "Pharmaceutical Manufacturers",
  "Nutraceutical Companies",
  "Product Owners",
  "Marketing Authorization Holders (MAHs)",
  "Importers & Distributors",
  "Local Pharmaceutical Companies",
  "Institutional Suppliers",
  "Specialty Healthcare Organizations",
  "Government & Tender Suppliers",
  "Organizations Exploring Co-Marketing Opportunities",
];

export default function StrategicAlliances() {
  return (
    <>
      <SEO
        title="Strategic Manufacturing & Regulatory Alliances"
        description="Strikar Lifescience's network of strategic manufacturing alliances and commercialization partnerships operating under recognized global quality and regulatory frameworks."
        canonicalPath="/about/strategic-alliances"
      />
      <PageHeader eyebrow="About Us" title="Strategic Manufacturing & Regulatory Alliances" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg mt-5">
            In today's healthcare environment, successful product development and market expansion require more
            than manufacturing capacity alone. Healthcare companies, distributors, importers, institutional buyers,
            and commercialization partners increasingly need access to the right manufacturing capabilities,
            regulatory pathways, quality systems, technical documentation, and market-specific execution strategies.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mt-4">
            To support these evolving requirements, Strikar Lifescience maintains a network of strategic
            manufacturing alliances, co-marketing collaborations, authorized commercialization partnerships, and
            long-term development relationships with carefully selected healthcare organizations operating across
            regulated, semi-regulated, and emerging markets. Our alliance partners' facilities operate under a
            range of internationally recognized quality standards and regulatory frameworks, giving our customers
            access to a broader spectrum of manufacturing and regulatory pathways than manufacturing capacity alone
            could provide.
          </p>
        </div>
      </section>

      {/* Alliance philosophy */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Built on Quality, Trust & Long-Term Value" className="section-title mt-3" />
          <p className="text-slate-600 leading-relaxed mt-4 max-w-3xl">
            We view strategic alliances as long-term relationships built on trust, transparency, quality, and
            shared commercial objectives, not limited to product supply, but focused on creating sustainable
            healthcare partnerships that support market success, regulatory readiness, and improved healthcare
            accessibility.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRINCIPLES.map((p) => (
              <div key={p} className="card p-4 flex items-start gap-3">
                <ShieldCheck size={18} className="text-primary-600 shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-slate-700">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing ecosystems */}
      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <TwoToneHeading text="Access to Diversified Manufacturing Capabilities" className="section-title mt-3" />
            <p className="text-slate-600 leading-relaxed mt-4">
              Our alliance framework spans a diversified manufacturing and development ecosystem, enabling us to
              address a broad range of healthcare requirements across dosage forms, therapeutic categories, product
              complexities, and regulatory environments, depending on the product, target market, and commercial
              objectives.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {MANUFACTURING_CAPABILITIES.map((c) => (
              <span key={c} className="badge bg-primary-50 text-primary-700 border border-primary-200">
                <Factory size={12} /> {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory environments */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Supporting Market-Specific Quality & Regulatory Pathways" className="section-title mt-3" />
          <p className="text-slate-600 leading-relaxed mt-4 max-w-3xl">
            Healthcare markets differ significantly in their regulatory requirements, documentation expectations,
            inspection standards, and approval pathways. Through our regulatory expertise and alliance network,
            Strikar Lifescience helps partners align products with the most appropriate pathway for their target
            market. Depending on product category and partnership structure, our alliance partners' facilities
            operate under quality and regulatory frameworks recognized by:
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {QUALITY_FRAMEWORKS.map((f) => (
              <span key={f} className="badge bg-white text-primary-700 border border-primary-200 shadow-card">
                <Award size={12} /> {f}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-600 mt-6 max-w-3xl">
            These frameworks apply to the facilities operating within our alliance network based on the specific
            product and market pathway; Strikar Lifescience's own WHO-GMP manufacturing operations are described on
            our Quality & Certifications page.
          </p>
        </div>
      </section>

      {/* Co-marketing */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Supporting Growth Beyond Manufacturing" className="section-title mt-3" />
          <p className="text-slate-600 leading-relaxed mt-4 max-w-3xl">
            Many healthcare companies possess strong products, established registrations, or differentiated
            technologies but require experienced partners to support market development, customer engagement,
            regulatory coordination, and commercialization execution. We support manufacturers, product owners,
            healthcare innovators, and commercialization partners through:
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMMERCIALIZATION_SUPPORT.map((item) => (
              <div key={item} className="card p-4 text-sm font-semibold text-slate-700 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration models */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Flexible Structures for Diverse Business Objectives" className="section-title mt-3" />
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {COLLABORATION_MODELS.map(({ icon: Icon, title, items }) => (
              <div key={title} className="card p-6">
                <div className="icon-badge">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-primary-900 mt-4">{title}</h3>
                <ul className="mt-4 space-y-2">
                  {items.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional connection */}
      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <TwoToneHeading text="Regional Support for Global Alliances" className="section-title mt-3" />
            <p className="text-slate-600 leading-relaxed mt-4">
              Successful commercialization requires more than quality products and regulatory documentation. It
              requires local market understanding, customer proximity, and consistent engagement. Our strategic
              regional hubs in Guatemala and Thailand strengthen our ability to support alliance partners across
              Latin America, the Caribbean, and Southeast Asia, bridging product availability, regulatory
              readiness, and commercial execution with our manufacturing and development base in India.
            </p>
            <Link to="/about/global-presence" className="btn-outline mt-6">
              See Our Global Presence <ArrowRight size={16} />
            </Link>
          </div>
          <div className="card p-6">
            <div className="icon-badge">
              <Globe2 size={22} />
            </div>
            <h3 className="font-bold text-primary-900 mt-4">Regional Support Activities</h3>
            <ul className="mt-4 grid grid-cols-1 gap-2">
              {["Portfolio Expansion Planning", "Product Registration Coordination", "Distributor Network Development", "Tender Participation Support", "Ongoing Market Support"].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who we partner with */}
      <section className="section-lg section-dark relative">
        <div className="relative container-page">
          <div className="max-w-2xl mb-12">
            <h2 className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">A Broad Range of Healthcare Stakeholders</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {IDEAL_PARTNERS.map((p) => (
              <div key={p} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <Users size={20} className="text-accent-400" />
                </div>
                <p className="mt-3 text-sm font-semibold">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="section">
        <div className="container-page [&>*]:max-w-3xl">
          <div className="icon-badge h-12 w-12 rounded-full">
            <Target size={22} />
          </div>
          <TwoToneHeading text="Our Commitment" className="section-title mt-4" />
          <p className="text-slate-600 leading-relaxed mt-4">
            At Strikar Lifescience, strategic alliances are built with a clear purpose: connecting healthcare needs
            with quality healthcare solutions through responsible collaboration, manufacturing excellence,
            regulatory understanding, and market-focused execution. We remain committed to creating long-term
            partnerships that generate sustainable value for healthcare companies, distributors, institutions,
            governments, and patients worldwide.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em] flex items-center justify-center gap-2">
            <Briefcase size={26} className="text-accent-300" /> Explore an Alliance With Strikar Lifescience
          </h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Together, we can transform product opportunities into sustainable healthcare growth.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Start the Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
