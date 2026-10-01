import React from "react";
import { Link } from "react-router-dom";
import {
  Factory,
  FileCheck2,
  Globe2,
  Network,
  TrendingUp,
  Handshake,
  Building2,
  Lightbulb,
  ArrowRight,
  Award,
} from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const AUDIENCE = [
  "Innovator pharmaceutical manufacturers",
  "Companies holding regulatory approvals in demanding markets",
  "Marketing authorization holders (MAHs) and product owners",
  "Specialty healthcare companies",
  "Organizations seeking licensing or co-marketing partners",
];

const GROWTH_AREAS = [
  "Market Expansion Strategies",
  "Product Commercialization",
  "Portfolio Development",
  "Product Registration Initiatives",
  "Regional Market Entry",
  "Distributor Development",
  "Government & Institutional Opportunities",
  "Long-Term Commercial Growth",
];

const REGIONAL_BENEFITS = [
  "Closer Customer Engagement",
  "Local Market Understanding",
  "Regulatory Coordination",
  "Distributor Development",
  "Portfolio Expansion Planning",
  "Commercialization Support",
  "Institutional Business Development",
  "Tender Participation Support",
];

const REGULATORY_FRAMEWORKS = [
  "WHO-GMP",
  "US FDA Aligned Opportunities",
  "EU-GMP Markets",
  "Health Canada Opportunities",
  "PIC/S Regulatory Environments",
  "ANVISA (Brazil)",
  "INVIMA (Colombia)",
  "DIGEMID (Peru)",
  "COFEPRIS (Mexico)",
  "GCC Markets",
];

const PARTNERSHIP_MODELS = [
  { title: "Manufacturing & Development", items: ["Contract Manufacturing (CMO)", "Contract Development & Manufacturing (CDMO)", "Technology Transfer", "Formulation Development", "Private Label Manufacturing"] },
  { title: "Commercialization", items: ["Co-Marketing Collaborations", "Authorized Commercialization Programs", "Territory Development Programs", "Product Launch Support", "Distributor Network Expansion"] },
  { title: "Growth & Market Entry", items: ["Product Licensing Opportunities", "Portfolio Expansion Initiatives", "Registration & Market Entry Programs", "Institutional Healthcare Opportunities", "Government & Tender Market Development"] },
];

const WHY_PARTNER = [
  { icon: Factory, title: "Manufacturing Excellence", desc: "WHO-GMP manufacturing capabilities supported by strong quality systems and diversified dosage-form expertise." },
  { icon: FileCheck2, title: "Regulatory & Market Access Understanding", desc: "Supporting registration pathways, commercialization planning, and long-term market development." },
  { icon: Globe2, title: "Regional Presence", desc: "Strategic hubs in Guatemala and Thailand supporting closer customer engagement and market connectivity." },
  { icon: Network, title: "Strategic Manufacturing & Regulatory Alliances", desc: "Access to diversified healthcare opportunities across multiple regulatory ecosystems." },
  { icon: TrendingUp, title: "Commercialization Focus", desc: "Supporting growth beyond manufacturing through co-marketing, licensing, and market-development initiatives." },
  { icon: Building2, title: "Government & Institutional Experience", desc: "Supporting public health programs, institutional procurement initiatives, and healthcare access programs." },
  { icon: Handshake, title: "Long-Term Partnership Mindset", desc: "Focused on building sustainable healthcare businesses through collaboration, trust, and shared success." },
];

export default function WhyPartner() {
  return (
    <>
      <SEO
        title="Why Partner With Strikar Lifescience"
        description="Why pharmaceutical manufacturers, marketing authorization holders, and innovators partner with Strikar Lifescience for market access, commercialization, and regional growth."
        canonicalPath="/about/why-partner"
      />
      <PageHeader eyebrow="For Manufacturers & Innovators" title="Why Partner With Strikar Lifescience" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg mt-5">
            At Strikar Lifescience, we believe successful partnerships are built on more than manufacturing
            capabilities alone. In today's evolving healthcare landscape, companies need partners who can support
            product development, regulatory readiness, market access, commercialization strategies, distributor
            engagement, and long-term business growth.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg mt-4">
            Our approach combines manufacturing expertise, regulatory understanding, regional market presence, and
            strategic collaboration to help partners maximize product potential while expanding access to
            healthcare solutions across international markets.
          </p>
          <div className="mt-8">
            <p className="text-sm font-bold uppercase tracking-wide text-primary-900 mb-3">This page is particularly relevant for</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {AUDIENCE.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Partner for growth */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Supporting Companies Through Every Stage of Development" className="section-title mt-3" />
          <p className="text-slate-600 leading-relaxed mt-4 max-w-3xl">
            Healthcare products often require support well beyond manufacturing. Success depends on aligning
            product opportunities with the right markets, regulatory pathways, commercial strategies, and
            distribution capabilities.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GROWTH_AREAS.map((item) => (
              <div key={item} className="card p-4 text-sm font-semibold text-slate-700 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional platforms */}
      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <TwoToneHeading text="Bringing Products Closer to Markets" className="section-title mt-3" />
            <p className="text-slate-600 leading-relaxed mt-4">
              To strengthen our engagement capabilities, we have established strategic regional hubs in Guatemala
              and Thailand, supporting business development activities across Latin America, the Caribbean, and
              Southeast Asia. By combining manufacturing capabilities in India with regional market presence, we
              help bridge the gap between product availability and commercial execution.
            </p>
            <Link to="/about/global-presence" className="btn-outline mt-6">
              Explore Our Global Presence <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {REGIONAL_BENEFITS.map((item) => (
              <div key={item} className="card card-hover card-bold p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-600">
                  <Globe2 size={18} />
                </div>
                <p className="mt-3 text-sm font-bold text-slate-700 leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory ecosystem */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Expanding Opportunities Through Collaboration" className="section-title mt-3" />
          <p className="text-slate-600 leading-relaxed mt-4 max-w-3xl">
            Through strategic alliances, commercialization partnerships, and long-term business relationships, we
            support opportunities aligned with diverse manufacturing capabilities, regulatory environments, and
            market requirements, allowing partners to evaluate opportunities across multiple healthcare markets
            while maintaining flexibility in their growth strategies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {REGULATORY_FRAMEWORKS.map((f) => (
              <span key={f} className="badge bg-primary-50 text-primary-700 border border-primary-200">
                <Award size={12} /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership models */}
      <section className="section">
        <div className="container-page">
          <TwoToneHeading text="Designed Around Partner Objectives" className="section-title mt-3" />
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {PARTNERSHIP_MODELS.map((group) => (
              <div key={group.title} className="card p-6">
                <h3 className="font-bold text-primary-900">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((i) => (
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

      {/* Why partner */}
      <section className="section-lg section-dark relative">
        <div className="relative container-page">
          <div className="max-w-2xl mb-12">
            <h2 className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Aligned for Long-Term Success</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_PARTNER.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <Icon size={24} className="text-accent-400" />
                </div>
                <p className="mt-4 font-semibold">{title}</p>
                <p className="mt-2 text-sm text-primary-100/80 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Ready to Explore a Partnership?</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Together, we can create pathways for healthcare innovation, market expansion, and sustainable growth.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Start the Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
