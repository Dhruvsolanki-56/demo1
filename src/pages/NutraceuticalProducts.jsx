import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";

export default function NutraceuticalProducts() {
  return (
    <>
      <SEO
        title="Nutraceutical Products"
        description="Science-based nutritional and wellness products from Strikar Lifescience LLP's Nutraceutical Manufacturing division. Full catalog coming soon."
        canonicalPath="/product-portfolio/nutraceutical-products"
      />
      <PageHeader eyebrow="Product Portfolio" title="Nutraceutical Products" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg">
            Strikar Lifescience's Nutraceutical Manufacturing division develops, manufactures, and commercializes
            science-based nutritional and wellness products designed to support preventive healthcare, healthy
            lifestyles, and evolving consumer wellness trends.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Our full nutraceutical product catalog for this portfolio is currently being finalized. To learn more
            about our Nutraceutical Manufacturing division, our dosage forms, development services, and
            regulatory support, visit the business division page below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-2 gap-6">
          <div className="card card-hover card-bold p-6 flex flex-col">
            <div className="icon-badge">
              <Leaf size={22} />
            </div>
            <h3 className="font-bold text-lg text-primary-900 mt-4">Nutraceutical Manufacturing</h3>
            <p className="text-sm text-slate-600 mt-2 flex-1 leading-relaxed">
              Learn more about our science-driven wellness product development, dosage forms, and private label
              manufacturing capabilities.
            </p>
            <Link to="/business-divisions/nutraceutical-manufacturing" className="btn-outline mt-4 !py-2 text-xs self-start">
              Learn More <ArrowRight size={14} />
            </Link>
          </div>
          <div className="card card-hover card-bold p-6 flex flex-col">
            <div className="icon-badge">
              <Sparkles size={22} />
            </div>
            <h3 className="font-bold text-lg text-primary-900 mt-4">Catalog Coming Soon</h3>
            <p className="text-sm text-slate-600 mt-2 flex-1 leading-relaxed">
              Our nutraceutical product catalog is being finalized. Contact our team via the Inquiry Center for
              current product availability.
            </p>
            <Link to="/inquiry-center" className="btn-outline mt-4 !py-2 text-xs self-start">
              Visit the Inquiry Center <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
