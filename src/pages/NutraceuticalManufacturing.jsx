import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Sprout, Award, Globe2, Handshake, ClipboardCheck, HeartHandshake } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";
import HighlightPanel from "../components/HighlightPanel";

const DOSAGE_FORMS = [
  { title: "Solid Dosage Forms", items: ["Tablets", "Capsules", "Softgels", "Gummies", "Effervescent Tablets"] },
  { title: "Powder & Sachet Solutions", items: ["Nutritional Powders", "Sachets", "Functional Blends", "Sports Nutrition Formulations"] },
  { title: "Specialized Wellness Products", items: ["Dietary Supplements", "Women's Health Products", "Pediatric Nutrition", "Healthy Aging Solutions", "Preventive Healthcare Products", "Lifestyle & Wellness Formulations"] },
];

const DEVELOPMENT_SERVICES = [
  "Private Label Manufacturing",
  "Custom Formulation Development",
  "Product Concept Development",
  "Flavor Development & Optimization",
  "Product Reformulation",
  "Packaging Development",
  "Brand Support",
  "Market-Specific Product Adaptation",
];

const REGULATORY_SERVICES = [
  "Market-Specific Product Compliance",
  "Label & Artwork Development",
  "Product Documentation Support",
  "Registration Assistance (Where Applicable)",
  "Export Documentation Support",
  "Ingredient Compliance Review",
  "Market Adaptation Guidance",
];

const WHY_PARTNER = [
  { icon: Leaf, title: "Science-Based Product Development", desc: "Focused on creating effective, market-relevant nutritional and wellness solutions." },
  { icon: Sprout, title: "Diverse Nutraceutical Dosage Forms", desc: "Supporting multiple delivery systems designed for evolving consumer preferences." },
  { icon: Award, title: "Private Label Expertise", desc: "Helping partners build and expand successful wellness brands." },
  { icon: ClipboardCheck, title: "Regulatory & Compliance Support", desc: "Supporting product readiness for international markets." },
  { icon: Handshake, title: "Flexible Manufacturing Models", desc: "Customized solutions aligned with customer requirements and market opportunities." },
  { icon: Globe2, title: "International Market Understanding", desc: "Experience supporting distributors, retailers, healthcare organizations, and wellness brands across diverse global markets." },
  { icon: HeartHandshake, title: "Long-Term Partnership Approach", desc: "Dedicated support from concept development to commercialization and portfolio expansion." },
];

export default function NutraceuticalManufacturing() {
  return (
    <>
      <SEO
        title="Nutraceutical Manufacturing"
        description="Science-driven nutritional and wellness products supporting preventive healthcare, healthy lifestyles, and private label brand development."
        canonicalPath="/business-divisions/nutraceutical-manufacturing"
      />
      <PageHeader eyebrow="Business Division" title="Nutraceutical Manufacturing" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <TwoToneHeading text="Science-Driven Wellness Solutions for Global Markets" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed text-lg">
            Our Nutraceutical Manufacturing Division specializes in the development, manufacturing, and
            commercialization of science-based nutritional and wellness products designed to support preventive
            healthcare, healthy lifestyles, and evolving consumer wellness trends.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            From concept development and custom formulations to commercial-scale manufacturing and private label
            solutions, we support brand owners, distributors, retailers, healthcare companies, and wellness
            organizations seeking innovative and market-ready nutraceutical products backed by quality, compliance,
            and commercial relevance.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Dosage Forms & Delivery Systems" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              We offer a diverse range of nutraceutical dosage forms and delivery systems designed to support
              various consumer health and wellness segments.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {DOSAGE_FORMS.map((group) => (
              <div key={group.title} className="card card-hover card-bold p-6">
                <div className="icon-badge">
                  <Leaf size={22} />
                </div>
                <h3 className="font-bold text-lg text-primary-900 mt-4">{group.title}</h3>
                <ul className="text-sm text-slate-600 mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-start">
          <HighlightPanel
            icon={Leaf}
            title="Nutraceutical Strengths"
            items={[
              "3 Dosage Form Categories",
              "Private Label Manufacturing Expertise",
              "Science-Based Product Development",
              "Flexible Manufacturing Models",
            ]}
            className="order-last lg:order-first"
          />
          <div>
            <TwoToneHeading text="Bringing Wellness Brands to Market" className="section-title mt-3" />
            <p className="mt-4 text-slate-600 leading-relaxed">
              Successful nutraceutical brands require more than product manufacturing. Our development capabilities
              help partners create differentiated and commercially viable wellness products aligned with evolving
              market trends and consumer expectations.
            </p>
            <ul className="text-sm text-slate-600 mt-4 space-y-2">
              {DEVELOPMENT_SERVICES.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <TwoToneHeading text="Supporting Market Readiness & Compliance" className="section-title mt-3" />
          <p className="mt-4 text-slate-600 leading-relaxed">
            Nutraceutical regulations vary significantly between markets. Our team assists partners in navigating
            product compliance, documentation requirements, labeling expectations, and export readiness.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {REGULATORY_SERVICES.map((s) => (
              <span key={s} className="badge bg-primary-50 text-primary-700">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <TwoToneHeading text="Nutraceutical Manufacturing, Done Right" className="section-title mt-3" />
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
          <h2 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Partner with Our Nutraceutical Manufacturing Division</h2>
          <Link to="/inquiry-center" className="btn-highlight btn-pill mt-6 !px-8 !py-3">
            Visit the Inquiry Center <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
