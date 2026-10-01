import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Sparkles, HeartHandshake, Building2, ShieldCheck, Handshake, Globe2 } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";
import HighlightPanel from "../components/HighlightPanel";

const PERSONAL_HYGIENE = [
  "CLEANZA Bed Bath Wipes",
  "Patient Hygiene Wipes",
  "No-Rinse Hygiene Products",
  "Personal Care Products",
  "Elder Care Solutions",
  "Assisted Living Hygiene Products",
  "Home Healthcare Hygiene Solutions",
  "Patient Comfort Products",
];

const CONSUMER_HYGIENE = [
  "Wet Wipes",
  "Antibacterial Wipes",
  "Personal Care Wipes",
  "Skin Care & Hygiene Products",
  "Hand Hygiene Solutions",
  "Wellness & Hygiene Products",
  "Travel Hygiene Products",
  "Family Care Hygiene Solutions",
];

const INSTITUTIONAL_HYGIENE = [
  "Infection Prevention Products",
  "Hospital Hygiene Solutions",
  "Healthcare Facility Hygiene Products",
  "Hospitality Hygiene Solutions",
  "Housekeeping Solutions",
  "Surface Hygiene Products",
  "Institutional Cleaning Solutions",
  "Professional Care Products",
];

const PERSONAL_HYGIENE_APPLICATIONS = [
  "Hospitals",
  "Nursing Homes",
  "Rehabilitation Centers",
  "Assisted Living Facilities",
  "Home Healthcare Programs",
  "Daily Personal Care",
];

const INSTITUTIONAL_INDUSTRIES = [
  "Hospitals",
  "Clinics",
  "Healthcare Facilities",
  "Hotels & Hospitality",
  "Long-Term Care Facilities",
  "Commercial Organizations",
  "Institutional Environments",
];

const WHY_PARTNER = [
  { icon: Sparkles, title: "Consumer-Focused Innovation", desc: "Products designed to support evolving health, hygiene, and wellness needs." },
  { icon: Droplets, title: "Healthcare & Hygiene Expertise", desc: "Understanding developed through experience across healthcare, institutional, and consumer markets." },
  { icon: Handshake, title: "Private Label & Brand Development", desc: "Flexible solutions for distributors, retailers, hospitality groups, and healthcare organizations." },
  { icon: ShieldCheck, title: "Quality & Compliance Focus", desc: "Consistent attention to product quality, safety, and documentation requirements." },
  { icon: Building2, title: "Scalable Manufacturing Capabilities", desc: "Supporting both emerging brands and established market leaders." },
  { icon: Globe2, title: "International Market Experience", desc: "Supporting customers across diverse healthcare and consumer markets." },
  { icon: HeartHandshake, title: "Long-Term Partnership Approach", desc: "Focused on creating sustainable product portfolios and long-term business growth." },
];

export default function PersonalHygieneConsumerCare() {
  return (
    <>
      <SEO
        title="Personal Hygiene & Consumer Care"
        description="CLEANZA and our broader hygiene portfolio support patient comfort, consumer wellness, and institutional infection prevention across healthcare and everyday environments."
        canonicalPath="/business-divisions/personal-hygiene-consumer-care"
      />
      <PageHeader eyebrow="Business Division" title="Personal Hygiene & Consumer Care" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <TwoToneHeading text="Enhancing Everyday Health, Hygiene & Well-Being" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Our Personal Hygiene & Consumer Care Division is dedicated to improving personal wellness, hygiene
            standards, patient comfort, and infection prevention through innovative healthcare, hygiene, and consumer
            care solutions.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            From patient care and personal hygiene solutions to institutional hygiene programs and consumer wellness
            products, our portfolio is designed to promote health, comfort, cleanliness, and confidence across
            diverse healthcare and everyday environments.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="icon-badge">
              <Sparkles size={22} />
            </div>
            <TwoToneHeading text="CLEANZA" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              CLEANZA represents our commitment to innovative hygiene solutions designed to support healthcare
              professionals, caregivers, hospitality providers, and consumers. Developed with a focus on
              convenience, effectiveness, and user comfort, CLEANZA products are designed to improve hygiene
              practices while supporting patient well-being and operational efficiency.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Current focus areas include bed bath wipes, patient hygiene solutions, healthcare hygiene products,
              hospitality hygiene solutions, and personal care products. As the CLEANZA portfolio expands, our
              objective remains to provide practical, reliable, and high-quality hygiene solutions aligned with the
              evolving needs of healthcare and consumer markets.
            </p>
          </div>
          <HighlightPanel
            icon={Droplets}
            title="CLEANZA Focus Areas"
            items={[
              "Bed Bath Wipes",
              "Patient Hygiene Solutions",
              "Healthcare Hygiene Products",
              "Hospitality Hygiene Solutions",
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Supporting Patient Comfort & Daily Care" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Personal hygiene plays a vital role in maintaining health, dignity, comfort, and quality of life,
              particularly in healthcare, long-term care, rehabilitation, and home-care environments.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PERSONAL_HYGIENE.map((item) => (
              <span key={item} className="badge bg-primary-50 text-primary-700">{item}</span>
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600 text-center mt-8 mb-3">Applications</p>
          <div className="flex flex-wrap gap-2">
            {PERSONAL_HYGIENE_APPLICATIONS.map((item) => (
              <span key={item} className="badge bg-slate-100 text-slate-600">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Everyday Solutions for Modern Lifestyles" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Consumers today seek products that combine convenience, effectiveness, and safety while supporting
              healthy lifestyles and everyday wellness.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CONSUMER_HYGIENE.map((item) => (
              <span key={item} className="badge bg-primary-50 text-primary-700">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Supporting Healthcare, Hospitality & Commercial Environments" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Maintaining hygiene standards is critical across healthcare facilities, hospitality environments,
              workplaces, and institutional settings.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {INSTITUTIONAL_HYGIENE.map((item) => (
              <span key={item} className="badge bg-primary-50 text-primary-700">{item}</span>
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-600 text-center mt-8 mb-3">Industries Supported</p>
          <div className="flex flex-wrap gap-2">
            {INSTITUTIONAL_INDUSTRIES.map((item) => (
              <span key={item} className="badge bg-slate-100 text-slate-600">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Personal Hygiene & Consumer Care, Done Right" className="section-title mt-3" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_PARTNER.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card card-hover card-bold p-6">
                <div className="icon-badge">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-primary-900 mt-4">{title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Partner with Our Personal Hygiene & Consumer Care Division</h2>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Visit the Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
