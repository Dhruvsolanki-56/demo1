import React from "react";
import { useLocation } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Reveal, { RevealText } from "./motion/Reveal";
import { ClipReveal, ScrollScale } from "./motion/Premium";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { TAGLINE } from "../data/siteContent";

/**
 * Inner-page header, identical on every page: a rounded photo banner with
 * the title set large in white at the lower left and the breadcrumb trail at
 * the lower right, joined to a white strip carrying the page's standfirst and
 * a support line.
 */

// Route -> banner. Longest prefix wins; a page can override via `image`.
const BANNERS = [
  ["/about/global-presence", "/banners/global_presence.png"],
  ["/about/why-choose-strikar", "/banners/why_choose.png"],
  ["/about/why-partner", "/banners/why_partner.png"],
  ["/about/strategic-alliances", "/banners/strategic_alliances.png"],
  ["/about", "/banners/about.png"],
  ["/business-divisions/pharmaceutical-manufacturing", "/banners/pharma_manufacturing.png"],
  ["/business-divisions/nutraceutical-manufacturing", "/banners/nutra_manufacturing.png"],
  ["/business-divisions/hospital-healthcare-medical-solutions", "/banners/hospital_solutions.png"],
  ["/business-divisions/emergency-supply-patient-access", "/banners/emergency_supply.png"],
  ["/business-divisions/personal-hygiene-consumer-care", "/banners/hygiene_care.png"],
  ["/business-divisions", "/banners/business_divisions.png"],
  ["/services/manufacturing-solutions", "/showcase/manufacturing.jpg"],
  ["/services/healthcare-access-solutions", "/showcase/access.jpg"],
  ["/services/healthcare-institutional-solutions", "/showcase/institutional.jpg"],
  ["/services", "/banners/pharma_manufacturing.png"],
  ["/partnership", "/banners/partnership.png"],
  ["/product-portfolio/high-surveillance-regulatory-markets", "/banners/high_surveillance.png"],
  ["/product-portfolio/nutraceutical-products", "/banners/nutra_manufacturing.png"],
  ["/product-portfolio", "/therapies/portfolio-pharma.jpg"],
  ["/products", "/showcase/manufacturing.jpg"],
  ["/therapeutic-areas", "/banners/hospital_solutions.png"],
  ["/quality/certifications-standards", "/banners/certifications.png"],
  ["/quality/manufacturing-infrastructure", "/banners/pharma_manufacturing.png"],
  ["/quality/regulatory-affairs-market-access", "/banners/high_surveillance.png"],
  ["/quality", "/banners/quality.png"],
  ["/contact", "/banners/global_presence.png"],
  ["/inquiry-center", "/therapies/link-inquiry.jpg"],
  ["/request-quote", "/therapies/link-quote.jpg"],
];

const DEFAULT_BANNER = "/banners/about.png";

// One specific line per page for the strip under the banner, instead of the
// same company tagline repeated on every page. A page's own `description`
// prop still wins.
const STANDFIRSTS = [
  ["/about/global-presence", "Manufacturing in India, regional hubs in Guatemala and Thailand, and a presence in El Salvador."],
  ["/about/why-choose-strikar", "What distributors, hospitals and procurement agencies gain by sourcing from us."],
  ["/about/why-partner", "How manufacturers, MAHs and innovators grow with us through licensing and co-marketing."],
  ["/about/strategic-alliances", "Our manufacturing and regulatory alliance network, and how partners use it."],
  ["/about", "A diversified healthcare company with over 35 years of combined industry expertise."],
  ["/business-divisions/pharmaceutical-manufacturing", "Development, manufacturing and market access across dosage forms and therapy areas."],
  ["/business-divisions/nutraceutical-manufacturing", "Nutritional and wellness products for preventive healthcare."],
  ["/business-divisions/hospital-healthcare-medical-solutions", "Medical consumables, hospital supplies and institutional programmes."],
  ["/business-divisions/emergency-supply-patient-access", "Supply for critical and time-sensitive needs outside normal commercial channels."],
  ["/business-divisions/personal-hygiene-consumer-care", "Hygiene, wellness and infection-prevention products."],
  ["/business-divisions", "Five divisions serving healthcare systems, distributors and institutions."],
  ["/services/manufacturing-solutions", "CDMO, CMO, third-party and private-label manufacturing with technology transfer."],
  ["/services/healthcare-access-solutions", "Coordinated supply for critical and time-sensitive healthcare needs."],
  ["/services/healthcare-institutional-solutions", "Supply programmes for hospitals, governments and institutions."],
  ["/services", "Manufacturing, healthcare access and institutional supply under one roof."],
  ["/partnership", "Manufacturing partnerships, regional distribution and co-marketing."],
  ["/product-portfolio/high-surveillance-regulatory-markets", "Products prepared for markets with stricter regulatory oversight."],
  ["/product-portfolio/nutraceutical-products", "Nutritional products from our nutraceutical manufacturing division."],
  ["/product-portfolio", "Pharmaceutical, high-surveillance and nutraceutical portfolios."],
  ["/products", "Search the catalogue by name, generic, strength or therapeutic area."],
  ["/therapeutic-areas", "Browse our range by therapeutic area."],
  ["/quality/certifications-standards", "The quality frameworks and practices behind our manufacturing."],
  ["/quality/manufacturing-infrastructure", "Solid dosage, sterile and dedicated beta-lactam facilities."],
  ["/quality/regulatory-affairs-market-access", "Registration strategy, dossiers and market-access support."],
  ["/quality", "Quality built into every stage, from raw material to release."],
  ["/contact", "Questions, product requirements or partnership ideas, all in one place."],
  ["/inquiry-center", "Pick the inquiry type that matches your requirement."],
  ["/request-quote", "Add products to your list and send one request for a quotation."],
];

const lookup = (table, pathname) =>
  table
    .filter(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))
    .sort((a, b) => b[0].length - a[0].length)[0]?.[1];

const bannerFor = (pathname) => {
  const hit = BANNERS.filter(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`)).sort(
    (a, b) => b[0].length - a[0].length
  )[0];
  return hit ? hit[1] : DEFAULT_BANNER;
};

export default function PageHeader({
  title,
  description,
  breadcrumbLabel,
  noBreadcrumbs = false,
  image,
}) {
  const { pathname } = useLocation();
  const { settings } = useSiteSettings();
  const banner = image || bannerFor(pathname);
  const standfirst = description || lookup(STANDFIRSTS, pathname) || settings.tagline || TAGLINE;

  return (
    <section className="frame relative overflow-hidden border border-slate-200 bg-white shadow-ledge">
      {/* Banner */}
      <div className="relative h-[260px] overflow-hidden sm:h-[300px] lg:h-[340px]">
        <ClipReveal immediate className="absolute inset-0">
          <ScrollScale className="h-full w-full" from={1.12}>
            <img
              src={banner}
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchpriority="high"
              className="h-full w-full object-cover"
            />
          </ScrollScale>
        </ClipReveal>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/35 to-primary-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/55 via-transparent to-transparent" />

        <div className="relative flex h-full flex-col justify-end px-6 pb-7 sm:px-10 sm:pb-9 lg:px-[60px]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <div className="max-w-4xl">
              <h1
                className="font-display font-medium leading-[1.05] tracking-[-0.01em] text-white [text-shadow:0_2px_24px_rgba(5,27,46,0.35)]"
                style={{ fontSize: "clamp(2.1rem, 4.6vw, 4rem)" }}
              >
                <RevealText text={title} immediate delay={0.25} />
              </h1>
            </div>
            {!noBreadcrumbs && (
              <Reveal y={10} duration={0.45} delay={0.15} immediate className="shrink-0 lg:pb-3">
                <Breadcrumbs currentLabel={breadcrumbLabel || title} variant="light" />
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="flex flex-col gap-5 px-6 py-6 sm:px-10 md:flex-row md:items-center md:justify-between md:gap-10 lg:px-[60px] lg:py-8">
        <p className="max-w-3xl text-[0.98rem] leading-relaxed text-primary-950">{standfirst}</p>
        {settings.phone ? (
          <a href={`tel:${settings.phone}`} className="group flex shrink-0 items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white transition-colors group-hover:bg-primary-950">
              <Phone size={22} />
            </span>
            <span>
              <span className="block text-sm text-slate-500">Call us when you need help</span>
              <span className="block font-display text-xl font-medium text-primary-950">
                Support: {settings.phone}
              </span>
            </span>
          </a>
        ) : (
          <Link to="/contact" className="btn-outline shrink-0">
            Contact Us <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </section>
  );
}
