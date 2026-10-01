import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, MessageSquareText, ChevronDown,
  HeartPulse, Droplet, Microscope, Bug, Shield, Brain, Zap, Pill, Syringe,
  FlaskConical, Wind, Baby, Activity, Thermometer, Eye, Bone, Stethoscope, Dna,
} from "lucide-react";
import { THERAPEUTIC_AREAS } from "../data/therapeuticAreas";
import { getProducts } from "../api/public";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import HighlightPanel from "../components/HighlightPanel";
import ProductCard from "../components/ProductCard";
import { SkeletonProductGrid } from "../components/Skeleton";

const ICONS = {
  HeartPulse, Droplet, Microscope, Bug, Shield, Brain, Zap, Pill, Syringe,
  FlaskConical, Wind, Baby, Activity, Thermometer, Eye, Bone, Stethoscope, Dna,
};

export default function TherapeuticAreaDetail() {
  const { slug } = useParams();
  const area = THERAPEUTIC_AREAS.find((a) => a.slug === slug);
  const [products, setProducts] = useState(null);
  const [productTotal, setProductTotal] = useState(0);

  useEffect(() => {
    if (!area) return;
    setProducts(null);
    getProducts({ therapeutic_segment: area.name, page_size: 8 })
      .then((r) => { setProducts(r.items); setProductTotal(r.total); })
      .catch(() => setProducts([]));
  }, [area?.name]);

  if (!area) {
    return (
      <>
        <SEO title="Therapeutic Area Not Found" canonicalPath="/therapeutic-areas" noIndex />
        <PageHeader eyebrow="Therapeutic Areas" title="Area Not Found" />
        <section className="section">
          <div className="container-page max-w-xl text-center">
            <p className="text-slate-600 leading-relaxed text-lg">
              We couldn't find the therapeutic area you're looking for. It may have been moved or renamed.
            </p>
            <Link to="/therapeutic-areas" className="btn-outline mt-6 inline-flex">
              <ArrowLeft size={16} /> Back to Therapeutic Areas
            </Link>
          </div>
        </section>
      </>
    );
  }

  const Icon = ICONS[area.icon] || Stethoscope;
  const paragraphs = area.description.split("\n\n");
  const faqs = area.faqs || [];

  const jsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : undefined;

  return (
    <>
      <SEO title={area.name} description={area.summary} canonicalPath={`/therapeutic-areas/${area.slug}`} jsonLd={jsonLd} />
      <PageHeader eyebrow="Therapeutic Area" title={area.name} description={area.summary} image={`/therapies/${area.slug}.jpg`} />

      <section className="section">
        <div className="container-page grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Link to="/therapeutic-areas" className="tap inline-flex items-center gap-1 text-sm text-slate-600 hover:text-primary-600 mb-5">
              <ArrowLeft size={14} /> All Therapeutic Areas
            </Link>

            <div className="flex h-14 w-14 items-center justify-center rounded-xl text-primary-600 mb-5">
              <Icon size={28} />
            </div>

            {paragraphs.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-lg mt-4 first:mt-0">
                {p}
              </p>
            ))}
          </div>

          <div className="lg:col-span-1">
            <HighlightPanel
              icon={Icon}
              title={`${area.name} Portfolio`}
              items={[
                "WHO-GMP Certified Manufacturing",
                "Multiple Dosage Forms Available",
                "Regulatory & Documentation Support",
                "Global Sourcing & Supply Alliances",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          {products === null ? (
            <SkeletonProductGrid count={8} gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" />
          ) : products.length > 0 ? (
            <>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="section-title mt-3">{area.name} Products</h2>
                </div>
                {productTotal > products.length && (
                  <Link
                    to={`/products?therapeutic_segment=${encodeURIComponent(area.name)}`}
                    className="btn-outline hidden sm:inline-flex"
                  >
                    View All {productTotal} <ArrowRight size={16} />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="text-center mt-8 sm:hidden">
                <Link to={`/products?therapeutic_segment=${encodeURIComponent(area.name)}`} className="btn-outline">
                  View All {productTotal} Products <ArrowRight size={16} />
                </Link>
              </div>
            </>
          ) : (
            <div className="container-page max-w-2xl mx-auto">
              <div className="card p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-primary-600">
                  <MessageSquareText size={26} />
                </div>
                <h3 className="font-bold text-xl text-primary-900 mt-5">Product Listings Coming Soon</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  Products in this therapeutic area are being finalized. Contact our team via the Inquiry Center for
                  current availability, documentation readiness, and registration feasibility.
                </p>
                <Link to="/inquiry-center" className="btn-primary btn-pill mt-6 inline-flex">
                  Visit the Inquiry Center <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section">
          <div className="container-page max-w-3xl">
            <h2 className="section-title mt-3 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-semibold text-slate-700">{faq.question}</span>
        <ChevronDown size={18} className={`shrink-0 text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}
