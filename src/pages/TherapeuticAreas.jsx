import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, HeartPulse, Droplet, Microscope, Bug, Shield, Brain, Zap, Pill, Syringe,
  FlaskConical, Wind, Baby, Activity, Thermometer, Eye, Bone, Stethoscope, Dna,
} from "lucide-react";
import { THERAPEUTIC_AREAS } from "../data/therapeuticAreas";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";

const ICONS = {
  HeartPulse, Droplet, Microscope, Bug, Shield, Brain, Zap, Pill, Syringe,
  FlaskConical, Wind, Baby, Activity, Thermometer, Eye, Bone, Stethoscope, Dna,
};

export default function TherapeuticAreas() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Therapeutic Areas",
    description: "Strikar Lifescience LLP's pharmaceutical product opportunities across 18 therapeutic areas.",
    hasPart: THERAPEUTIC_AREAS.map((area) => ({
      "@type": "WebPage",
      name: area.name,
      url: origin ? `${origin}/therapeutic-areas/${area.slug}` : undefined,
    })),
  };

  return (
    <>
      <SEO
        title="Therapeutic Areas"
        description="Explore Strikar Lifescience LLP's pharmaceutical product opportunities across 18 therapeutic areas, from cardiovascular and oncology to respiratory care and general medicine."
        canonicalPath="/therapeutic-areas"
        jsonLd={jsonLd}
      />
      <PageHeader eyebrow="Product Discovery" title="Therapeutic Areas" />

      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg">
            Strikar Lifescience supports partners across a broad range of therapeutic areas, helping healthcare
            organizations, distributors, and institutional buyers explore product opportunities by therapeutic
            class, dosage form, documentation readiness, and market feasibility. Browse a therapeutic area below
            to learn more about the categories and support we offer.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {THERAPEUTIC_AREAS.map((area) => {
            const Icon = ICONS[area.icon] || Stethoscope;
            return (
              <div key={area.slug} className="card card-hover card-bold p-6 flex flex-col">
                <div className="icon-badge">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-lg text-primary-900 mt-4">{area.name}</h3>
                <p className="text-sm text-slate-600 mt-2 flex-1 leading-relaxed">{area.summary}</p>
                <Link
                  to={`/therapeutic-areas/${area.slug}`}
                  className="tap inline-flex items-center gap-1 text-sm font-semibold text-primary-600 mt-3"
                >
                  View Area <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Can't Find What You're Looking For?</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            Our team can help evaluate product opportunities, documentation readiness, and market feasibility
            for your specific requirement.
          </p>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Visit the Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
