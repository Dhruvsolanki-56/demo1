import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pill, Leaf, Stethoscope, LifeBuoy, Droplets } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";

const DIVISIONS = [
  {
    icon: Pill,
    name: "Pharmaceutical Manufacturing",
    description: "Development, manufacturing, and market access across a broad range of dosage forms and therapeutic categories.",
    to: "/business-divisions/pharmaceutical-manufacturing",
  },
  {
    icon: Leaf,
    name: "Nutraceutical Manufacturing",
    description: "Science-driven nutritional and wellness products supporting preventive healthcare and healthy lifestyles.",
    to: "/business-divisions/nutraceutical-manufacturing",
  },
  {
    icon: Stethoscope,
    name: "Hospital, Healthcare & Medical Solutions",
    description: "Medical consumables, hospital supplies, and institutional healthcare programs for healthcare systems.",
    to: "/business-divisions/hospital-healthcare-medical-solutions",
  },
  {
    icon: LifeBuoy,
    name: "Emergency Supply & Patient Access",
    description: "Critical and time-sensitive supply solutions for healthcare needs outside conventional commercial channels.",
    to: "/business-divisions/emergency-supply-patient-access",
  },
  {
    icon: Droplets,
    name: "Personal Hygiene & Consumer Care",
    description: "Hygiene, wellness, and infection-prevention products for healthcare, institutional, and consumer environments.",
    to: "/business-divisions/personal-hygiene-consumer-care",
  },
];

export default function BusinessDivisions() {
  return (
    <>
      <SEO
        title="Our Business Divisions"
        description="Strikar Lifescience LLP is organized into five specialized divisions supporting healthcare systems, distributors, and institutional partners worldwide."
        canonicalPath="/business-divisions"
      />
      <PageHeader eyebrow="Our Business Divisions" title="Delivering Integrated Healthcare Solutions Across Diverse Markets" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg">
            At Strikar Lifescience, our business is organized into five specialized divisions designed to support the
            evolving needs of healthcare systems, distributors, healthcare providers, government organizations,
            institutional buyers, and commercial partners worldwide. Together, these divisions enable us to support
            healthcare accessibility through manufacturing, product development, market access, commercialization,
            institutional healthcare programs, patient-access initiatives, and consumer healthcare solutions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIVISIONS.map(({ icon: Icon, name, description, to }) => (
            <div key={to} className="card card-hover card-bold p-6 flex flex-col">
              <div className="icon-badge">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-lg text-primary-900 mt-4">{name}</h3>
              <p className="text-sm text-slate-600 mt-2 flex-1 leading-relaxed">{description}</p>
              <Link to={to} className="btn-outline mt-4 !py-2 text-xs self-start">
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <TwoToneHeading text="Multiple Healthcare Solutions" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed">
            By integrating manufacturing excellence, regulatory understanding, commercialization expertise, healthcare
            access solutions, and regional market engagement, Strikar Lifescience delivers a comprehensive healthcare
            platform capable of supporting partners across diverse industries and international markets. Whether
            supporting pharmaceutical products, wellness brands, healthcare programs, institutional initiatives,
            patient-access requirements, or hygiene solutions, our objective remains consistent: to improve healthcare
            accessibility, create long-term value for our partners, and contribute to better health outcomes for
            communities around the world.
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Ready to Partner with Strikar Lifescience?</h2>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Visit the Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
