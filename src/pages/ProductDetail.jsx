import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ClipboardList, FileDown, Facebook, Linkedin, MessageCircle, Share2, MessageCircleQuestion,
  FileText, Globe2, PackageSearch, FileSignature, Handshake, ShieldCheck, MapPin, Award, ArrowRight,
} from "lucide-react";
import { getProduct, getRelatedProducts } from "../api/public";
import { fileUrl } from "../api/client";
import { useQuoteCart } from "../context/QuoteCartContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import ProductCard from "../components/ProductCard";
import EnquireModal from "../components/EnquireModal";
import ProductInquiryModal from "../components/ProductInquiryModal";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import ProductVisual, { isPlaceholderImage } from "../components/ProductVisual";
import MolecularPattern from "../components/MolecularPattern";
import { SkeletonBlock } from "../components/Skeleton";
import { trackProductView, trackAddToInquiryList, trackCtaClick, trackDownloadClick } from "../lib/siteMetrics";

const CTA_CONFIGS = {
  dossier: {
    key: "dossier_request_enabled", icon: FileText, label: "Request Dossier", inquiryType: "dossier_request",
    extraFieldLabel: "Target Country", messagePlaceholder: "What documentation are you looking for?",
  },
  feasibility: {
    key: "registration_feasibility_enabled", icon: Globe2, label: "Ask Registration Feasibility", inquiryType: "registration_feasibility",
    extraFieldLabel: "Target Country", messagePlaceholder: "Tell us about your target market and current registration status.",
  },
  sample: {
    key: "sample_request_enabled", icon: PackageSearch, label: "Request Samples", inquiryType: "sample_request",
    extraFieldLabel: "Target Market", messagePlaceholder: "Sample quantity and intended evaluation purpose.",
  },
  packaging: {
    key: null, icon: FileSignature, label: "Request Packaging Details", inquiryType: "general_contact",
    extraFieldLabel: "Target Market", messagePlaceholder: "Language and packaging requirements.",
  },
  distribution: {
    key: "distribution_opportunity_enabled", icon: Handshake, label: "Discuss Distribution Opportunity", inquiryType: "distribution_opportunity",
    extraFieldLabel: "Territory / Country", messagePlaceholder: "Tell us about your business and the territory you're interested in.",
  },
};

const WHY_PARTNER_POINTS = [
  "Product registration support",
  "Dossier support",
  "Artwork support",
  "Commercialization support",
  "Tender evaluation support",
  "Regional market support",
];


export default function ProductDetail() {
  const { slug } = useParams();
  const { settings } = useSiteSettings();
  const { addItem, isInCart } = useQuoteCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [enquiring, setEnquiring] = useState(false);
  const [activeCta, setActiveCta] = useState(null);

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    setActiveImage(0);
    getProduct(slug)
      .then((p) => { setProduct(p); trackProductView(p); })
      .catch(() => setNotFound(true));
    getRelatedProducts(slug).then(setRelated).catch(() => {});
  }, [slug]);

  if (notFound) {
    return (
      <div className="section container-page text-center">
        <h1 className="text-2xl font-bold text-slate-700">Product not found</h1>
        <Link to="/products" className="btn-primary btn-pill mt-6 inline-flex">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section container-page">
        <div className="grid lg:grid-cols-2 gap-12">
          <SkeletonBlock className="aspect-[4/3] w-full" />
          <div className="space-y-4">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-8 w-3/4" />
            <SkeletonBlock className="h-4 w-1/2" />
            <SkeletonBlock className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [{ image_url: null }];
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(`${product.name} — Strikar Lifescience LLP`);
  const inCart = isInCart(product.id);
  const whatsappNumber = (settings.whatsapp || "").replace(/[^\d+]/g, "").replace("+", "");
  const primaryImage = images[0]?.image_url ? fileUrl(images[0].image_url) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.meta_description || undefined,
    image: primaryImage,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    category: product.therapeutic_segment,
  };

  return (
    <>
      <SEO
        title={product.meta_title || product.name}
        description={product.meta_description || product.description}
        image={primaryImage}
        canonicalPath={`/products/${product.slug}`}
        jsonLd={jsonLd}
      />

      <section className="section">
        <div className="container-page grid lg:grid-cols-2 gap-12">
          <Reveal>
            <div className="shadow-soft aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50">
              {/* Same rule as the catalogue card: a real upload wins, and the
                  rendered motif stands in for the shared placehold.co URL. */}
              {isPlaceholderImage(images[activeImage]?.image_url) ? (
                <ProductVisual
                  dosageForm={product.dosage_form}
                  seed={product.sku || product.slug || ""}
                  label={`${product.name} — ${product.dosage_form || "product"}`}
                />
              ) : (
                <img src={fileUrl(images[activeImage].image_url)} alt={product.name} className="h-full w-full object-cover" />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex flex-wrap gap-2.5 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`Show image ${idx + 1} of ${product.name}`}
                    aria-pressed={idx === activeImage}
                    className={`h-16 w-16 rounded-xl overflow-hidden transition-all duration-200 ${
                      idx === activeImage ? "ring-2 ring-primary-600 ring-offset-2 shadow-md" : "opacity-70 hover:opacity-100 hover:-translate-y-0.5 shadow-sm"
                    }`}
                  >
                    {isPlaceholderImage(img.image_url) ? (
                      <ProductVisual dosageForm={product.dosage_form} seed={`${product.sku || ""}-${idx}`} label="" />
                    ) : (
                      <img src={fileUrl(img.image_url)} alt="" className="h-full w-full object-cover" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </Reveal>

          <div>
            {product.therapeutic_segment && (
              <Link
                to={`/products?therapeutic_segment=${encodeURIComponent(product.therapeutic_segment)}`}
                className="text-xs uppercase tracking-wide font-semibold text-primary-600 hover:text-primary-800 hover:underline"
              >
                {product.therapeutic_segment}
              </Link>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-900 mt-2">{product.name}</h1>
            {product.brand && <p className="text-slate-600 mt-1">Brand: {product.brand}</p>}

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {product.composition && <Spec label="Composition" value={product.composition} />}
              {product.generic_name && <Spec label="Generic Name" value={product.generic_name} />}
              {product.strength && <Spec label="Strength" value={product.strength} />}
              {product.dosage_form && <Spec label="Dosage Form" value={product.dosage_form} />}
              {product.packing && <Spec label="Packing" value={product.packing} />}
              {product.therapeutic_segment && <Spec label="Therapeutic Segment" value={product.therapeutic_segment} />}
            </dl>

            {product.description && (
              <p className="mt-6 text-slate-600 leading-relaxed">{product.description}</p>
            )}

            {product.indications && (
              <div className="mt-6">
                <h3 className="font-semibold text-slate-700 mb-1">Indications / Use</h3>
                <p className="text-sm text-slate-600">{product.indications}</p>
              </div>
            )}

            {product.variants?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-slate-700 mb-2">Available Variants</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-slate-200 rounded-md overflow-hidden">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-2 font-medium text-slate-600">Variant</th>
                        <th className="text-left p-2 font-medium text-slate-600">Strength</th>
                        <th className="text-left p-2 font-medium text-slate-600">Packing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((v) => (
                        <tr key={v.id} className="border-t border-slate-100">
                          <td className="p-2">{v.variant_name}</td>
                          <td className="p-2">{v.strength || "-"}</td>
                          <td className="p-2">{v.packing || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {product.documents?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-slate-700 mb-2">Documents</h3>
                <div className="flex flex-wrap gap-2">
                  {product.documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={fileUrl(doc.file_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackDownloadClick(doc.title, `/products/${product.slug}`)}
                      className="btn-outline !py-2 text-xs"
                    >
                      <FileDown size={14} /> {doc.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {product.rfq_enabled !== false && (
                <button
                  onClick={() => {
                    addItem(product, "1");
                    trackAddToInquiryList(product.id, 1);
                    trackCtaClick("Request Quote", pageUrl, product.id);
                  }}
                  disabled={inCart}
                  className={inCart ? "btn btn-pill bg-primary-100 text-primary-700 cursor-default" : "btn-accent btn-bold btn-pill"}
                >
                  <ClipboardList size={16} /> {inCart ? "Added to Quote" : "Request Quote"}
                </button>
              )}
              <button onClick={() => { setEnquiring(true); trackCtaClick("Inquire Now", pageUrl, product.id); }} className="btn-outline btn-pill">
                <MessageCircleQuestion size={16} /> Inquire Now
              </button>
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello, I would like to inquire about ${product.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCtaClick("WhatsApp Inquiry", pageUrl, product.id)}
                  className="btn btn-pill bg-[#25D366] text-white hover:opacity-90"
                >
                  <MessageCircle size={16} /> WhatsApp Inquiry
                </a>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {Object.values(CTA_CONFIGS)
                .filter((cfg) => cfg.key === null || product[cfg.key] !== false)
                .map((cfg) => (
                  <button
                    key={cfg.label}
                    onClick={() => { setActiveCta(cfg); trackCtaClick(cfg.label, pageUrl, product.id); }}
                    className="btn-ghost btn-pill !border !border-slate-200 text-xs !py-2"
                  >
                    <cfg.icon size={14} /> {cfg.label}
                  </button>
                ))}
            </div>

            <div className="mt-6 flex items-center gap-3 text-slate-600">
              <Share2 size={16} aria-hidden="true" />
              <span className="sr-only">Share this product:</span>
              <a href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="hover:text-primary-600"><MessageCircle size={18} /></a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="hover:text-primary-600"><Facebook size={18} /></a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="hover:text-primary-600"><Linkedin size={18} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory & Documentation Status, Commercial Readiness, Market Availability */}
      <section className="section">
        <div className="container-page grid md:grid-cols-3 gap-6">
          <Reveal className="shadow-soft bg-white p-6">
            <div className="icon-badge">
              <FileText size={20} />
            </div>
            <h3 className="font-bold text-primary-900 mt-4">Regulatory & Documentation</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-600">Dossier Status</dt>
                <dd className="font-medium text-slate-700 text-right">{product.dossier_status || "Available on Request"}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-600">GMP Documentation</dt>
                <dd className="font-medium text-slate-700 text-right">{product.gmp_documentation_status || "Available on Request"}</dd>
              </div>
            </dl>
            {product.regulatory_notes_public && (
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">{product.regulatory_notes_public}</p>
            )}
          </Reveal>

          <Reveal delay={80} className="shadow-soft bg-white p-6">
            <div className="icon-badge">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold text-primary-900 mt-4">Commercial Readiness</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              {product.rfq_enabled && <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />Suitable for importers &amp; distributors</li>}
              {product.distribution_opportunity_enabled && <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />Suitable for institutional supply</li>}
              {product.registration_feasibility_enabled && <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />Registration support available</li>}
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />Suitable for tender evaluation</li>
            </ul>
            {product.show_principal_name && product.source_principal && (
              <p className="text-xs text-slate-600 mt-3">Principal: {product.source_principal}</p>
            )}
          </Reveal>

          <Reveal delay={160} className="shadow-soft bg-white p-6">
            <div className="icon-badge">
              <MapPin size={20} />
            </div>
            <h3 className="font-bold text-primary-900 mt-4">Market Availability</h3>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              {product.market_regions || "Latin America; Central America; the Caribbean; Southeast Asia; Africa; the CIS region; other emerging markets"}
            </p>
            <p className="text-xs text-slate-600 mt-3">Subject to product availability and country-specific regulatory requirements.</p>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container-page">
            <h2 className="section-title mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 70}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Partner with Strikar */}
      <section className="relative overflow-hidden section section-dark">
        <MolecularPattern className="text-white -top-10 -right-10" opacity={0.08} />
        <div className="container-page">
          <div className="max-w-2xl mb-10">
            <h2 className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-light tracking-[-0.02em]">Support Beyond the Product</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {WHY_PARTNER_POINTS.map((point) => (
              <div key={point} className="flex items-center gap-2.5">
                <Award size={18} className="text-accent-400 shrink-0" />
                <span className="text-sm font-medium">{point}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/about/why-partner" className="btn-highlight btn-bold btn-pill !px-6 !py-3">
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {enquiring && <EnquireModal product={product} onClose={() => setEnquiring(false)} />}
      {activeCta && <ProductInquiryModal product={product} config={activeCta} onClose={() => setActiveCta(null)} />}
    </>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-600 uppercase tracking-wide">{label}</dt>
      <dd className="font-medium text-slate-700">{value}</dd>
    </div>
  );
}
