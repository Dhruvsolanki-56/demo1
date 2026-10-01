import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pill, ShieldCheck, Leaf, Layers } from "lucide-react";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";

const PORTFOLIOS = [
  {
    icon: Pill,
    title: "Pharmaceutical Products",
    description:
      "Our core pharmaceutical catalog spanning multiple therapeutic areas, dosage forms, and product categories for international healthcare partners.",
    to: "/products",
    ctaLabel: "Browse Products",
    secondary: { to: "/therapeutic-areas", label: "Explore by Therapeutic Area" },
  },
  {
    icon: ShieldCheck,
    title: "Products from High-Surveillance Regulatory Markets",
    description:
      "A dedicated portfolio for products intended for markets with stricter regulatory oversight, sourced through our manufacturing and regulatory alliance network.",
    to: "/product-portfolio/high-surveillance-regulatory-markets",
    ctaLabel: "Learn More",
  },
  {
    icon: Leaf,
    title: "Nutraceutical Products",
    description:
      "Science-based nutritional and wellness products from our Nutraceutical Manufacturing division, supporting preventive healthcare and healthy lifestyles.",
    to: "/product-portfolio/nutraceutical-products",
    ctaLabel: "Learn More",
  },
];

export default function ProductPortfolio() {
  return (
    <>
      <SEO
        title="Product Portfolio"
        description="Strikar Lifescience LLP organizes its offering into three portfolios: Pharmaceutical Products, Products from High-Surveillance Regulatory Markets, and Nutraceutical Products."
        canonicalPath="/product-portfolio"
      />
      <PageHeader eyebrow="Product Portfolio" title="Explore Our Product Portfolio" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg mt-5">
            Strikar Lifescience organizes its offering into three portfolios, each structured to serve a distinct
            part of the international healthcare market: Pharmaceutical Products, Products from High-Surveillance
            Regulatory Markets, and Nutraceutical Products. Each portfolio is kept structurally separate to reflect
            its own product scope, regulatory context, and sourcing pathway.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {PORTFOLIOS.map(({ icon: Icon, title, description, to, ctaLabel, secondary }) => (
            <div key={to} className="card card-hover card-bold p-6 flex flex-col">
              <div className="icon-badge">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-lg text-primary-900 mt-4">{title}</h3>
              <p className="text-sm text-slate-600 mt-2 flex-1 leading-relaxed">{description}</p>
              <Link to={to} className="btn-outline mt-5 !py-2 text-xs self-start">
                {ctaLabel} <ArrowRight size={14} />
              </Link>
              {secondary && (
                <Link
                  to={secondary.to}
                  className="tap inline-flex items-center gap-1 text-xs font-semibold text-primary-600 mt-2"
                >
                  {secondary.label} <ArrowRight size={12} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Have a Product Requirement?</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Our team can help evaluate product availability, documentation readiness, and market feasibility for
            your target markets.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Visit the Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
