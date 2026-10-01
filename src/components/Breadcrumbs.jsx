import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MoveRight } from "lucide-react";

// Maps known URL segments to readable labels. Segments not listed here (e.g.
// dynamic product/therapeutic-area slugs) fall back to a prettified version
// of the slug itself.
const LABELS = {
  about: "About Us",
  "global-presence": "Global Presence",
  "why-choose-strikar": "Why Choose Strikar",
  "why-partner": "Why Partner With Us",
  "strategic-alliances": "Strategic Alliances",
  "business-divisions": "Business Divisions",
  "pharmaceutical-manufacturing": "Pharmaceutical Manufacturing",
  "nutraceutical-manufacturing": "Nutraceutical Manufacturing",
  "hospital-healthcare-medical-solutions": "Hospital & Healthcare Solutions",
  "emergency-supply-patient-access": "Emergency Supply & Patient Access",
  "personal-hygiene-consumer-care": "Personal Hygiene & Consumer Care",
  services: "Services",
  "manufacturing-solutions": "Manufacturing Solutions",
  "healthcare-access-solutions": "Healthcare Access Solutions",
  "healthcare-institutional-solutions": "Healthcare & Institutional Solutions",
  partnership: "Partnership Opportunities",
  "product-portfolio": "Product Portfolio",
  "high-surveillance-regulatory-markets": "High-Surveillance Regulatory Markets",
  "nutraceutical-products": "Nutraceutical Products",
  products: "Products",
  "therapeutic-areas": "Therapeutic Areas",
  quality: "Quality & Compliance",
  "certifications-standards": "Certifications & Standards",
  "manufacturing-infrastructure": "Manufacturing Infrastructure",
  "regulatory-affairs-market-access": "Regulatory Affairs & Market Access",
  contact: "Contact Us",
  "request-quote": "Request a Quote",
  "inquiry-center": "Inquiry Center",
  "privacy-policy": "Privacy Policy",
  "terms-conditions": "Terms & Conditions",
  disclaimer: "Disclaimer",
};

function prettify(segment) {
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Auto-generates breadcrumbs from the current route. `currentLabel` overrides
 * the final crumb's text with the exact page title. `variant="light"` is the
 * white-on-photo treatment used inside the page banner.
 */
export default function Breadcrumbs({ currentLabel, variant = "dark" }) {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;
    const label = isLast && currentLabel ? currentLabel : LABELS[seg] || prettify(seg);
    return { path, label, isLast };
  });

  const light = variant === "light";
  const base = light ? "text-white/90" : "text-slate-500";
  const hover = light ? "hover:text-accent-300" : "hover:text-primary-600";
  const current = light ? "text-accent-500" : "text-primary-600";

  return (
    <nav aria-label="Breadcrumb" className="relative">
      <ol className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9rem] font-medium ${base}`}>
        <li className="flex items-center gap-2.5">
          <Link to="/" className={`transition-colors ${hover}`}>
            Home
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.path} className="flex items-center gap-2.5">
            <MoveRight size={16} className="opacity-70" aria-hidden="true" />
            {c.isLast ? (
              <span className={current} aria-current="page">{c.label}</span>
            ) : (
              <Link to={c.path} className={`transition-colors ${hover}`}>{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
