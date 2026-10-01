import React from "react";
import { Link } from "react-router-dom";
import { Factory, HeartPulse, Building2, ArrowRight, Layers, Globe2, Users2, Handshake } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const PILLARS = [
  {
    icon: Factory,
    title: "Manufacturing Solutions",
    description:
      "CDMO, CMO, third-party manufacturing, OEM/private label, technology transfer, and product development support that carries a concept through to commercial readiness.",
    to: "/services/manufacturing-solutions",
    accent: "bg-primary-50 text-primary-600",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Access Solutions",
    description:
      "Responsible, compliance-led support that helps healthcare organizations and authorized stakeholders address product availability challenges.",
    to: "/services/healthcare-access-solutions",
    accent: "bg-primary-50 text-primary-600",
  },
  {
    icon: Building2,
    title: "Healthcare & Institutional Solutions",
    description:
      "Supply and program support for hospitals, government agencies, public health initiatives, and institutional tenders.",
    to: "/services/healthcare-institutional-solutions",
    accent: "bg-primary-50 text-primary-600",
  },
];

const WHY = [
  {
    icon: Layers,
    title: "Integrated Healthcare Platform",
    description:
      "Strikar combines manufacturing support, healthcare access programs, institutional healthcare capabilities, product development knowledge, and international business experience through one coordinated platform.",
  },
  {
    icon: Globe2,
    title: "International Market Experience",
    description:
      "Experience across diverse international markets helps us support product selection, packaging expectations, documentation coordination, regulatory awareness, and commercialization planning.",
  },
  {
    icon: Users2,
    title: "Customer-Centric Execution",
    description:
      "We focus on practical solutions that help customers move from product interest to registration, supply, commercialization, and institutional participation.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership Approach",
    description:
      "Our objective is to build sustainable healthcare relationships based on quality, responsiveness, and transparency rather than transactional supply arrangements.",
  },
];

export default function Services() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Pharmaceutical Manufacturing & Healthcare Solutions",
    provider: { "@type": "Organization", name: "Strikar Lifescience LLP" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: PILLARS.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p.title, description: p.description } })),
    },
  };

  return (
    <>
      <SEO
        title="Services"
        description="Explore Strikar Lifescience services including manufacturing solutions, healthcare access solutions, and healthcare & institutional solutions."
        canonicalPath="/services"
        jsonLd={jsonLd}
      />
      <PageHeader eyebrow="What We Offer" title="Services" />

      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg">
            Healthcare organizations require more than products. They require dependable manufacturing support,
            institutional healthcare capabilities, documentation readiness, and long-term partnership commitment.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            At Strikar Lifescience, our services are designed to support pharmaceutical companies, distributors,
            healthcare providers, institutional procurement agencies, hospitals, government organizations, and
            public healthcare programs through practical healthcare solutions aligned with international business,
            regulatory, and market requirements. Our service platform is organized into three core areas.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map(({ icon: Icon, title, description, to, accent }) => (
            <Link key={title} to={to} className="card card-hover card-bold p-7 flex flex-col group">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${accent}`}>
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-lg text-primary-900 mt-5">{title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed flex-1">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all">
                Explore <ArrowRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-12">
            <TwoToneHeading text="A Coordinated Healthcare Platform" className="section-title mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card card-hover card-bold p-6">
                <div className="icon-badge">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-primary-900 mt-4 text-sm">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Ready to Discuss Your Requirement?</h2>
          <p className="mt-3 text-primary-100/90 max-w-2xl mx-auto">
            Whether your organization requires manufacturing support, healthcare access solutions, institutional
            healthcare programs, or product commercialization support, Strikar Lifescience is ready to explore
            opportunities for long-term collaboration.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Discuss Your Requirement <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
