import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Facebook, Linkedin, Twitter, Instagram, ShieldCheck, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { COMPANY_NAME, TAGLINE, CERTIFICATIONS } from "../data/siteContent";

const COMPANY_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/business-divisions", label: "Business Divisions" },
  { to: "/services", label: "Services" },
  { to: "/quality", label: "Quality & Compliance" },
  { to: "/about/global-presence", label: "Global Presence" },
  { to: "/partnership", label: "Partnership" },
];

const PRODUCT_LINKS = [
  { to: "/product-portfolio", label: "Product Portfolio" },
  { to: "/products", label: "Pharmaceutical Products" },
  { to: "/therapeutic-areas", label: "Therapeutic Areas" },
  { to: "/product-portfolio/nutraceutical-products", label: "Nutraceutical Products" },
  { to: "/inquiry-center", label: "Inquiry Center" },
  { to: "/request-quote", label: "Request a Quote" },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-display text-[1.4rem] font-medium text-white">{title}</h3>
      <ul className="mt-6 space-y-3.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-[0.95rem] text-white/75 transition-colors hover:text-accent-400">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { settings } = useSiteSettings();

  const whatsappNumber = (settings.whatsapp || "").replace(/[^\d+]/g, "").replace("+", "");

  const socials = [
    { url: settings.linkedin_url, icon: Linkedin, label: "LinkedIn" },
    { url: settings.facebook_url, icon: Facebook, label: "Facebook" },
    { url: settings.twitter_url, icon: Twitter, label: "Twitter" },
    { url: settings.instagram_url, icon: Instagram, label: "Instagram" },
    { url: whatsappNumber ? `https://wa.me/${whatsappNumber}` : "", icon: MessageCircle, label: "WhatsApp" },
  ].filter((s) => s.url);

  const companyName = settings.company_name || COMPANY_NAME;

  return (
    <footer className="mt-16 sm:mt-24">
      <div className="frame bg-primary-600 px-6 py-12 sm:px-10 sm:py-14 lg:px-[60px] lg:py-[60px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="inline-block rounded-[16px] bg-white px-4 py-2.5">
              <Logo />
            </div>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/75">
              <span className="font-semibold text-white">{companyName}</span> manufactures pharmaceutical, nutraceutical and healthcare products in India, with regional hubs in Guatemala and Thailand.
            </p>
            {socials.length > 0 && (
              <div className="mt-7 flex gap-3">
                {socials.map(({ url, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-accent-500 hover:text-primary-950"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            )}
            {CERTIFICATIONS.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {CERTIFICATIONS.slice(0, 4).map((c) => (
                  <span key={c.title} className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white">
                    <ShieldCheck size={13} className="text-accent-500" /> {c.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4">
            <LinkColumn title="Company" links={COMPANY_LINKS} />
            <LinkColumn title="Products" links={PRODUCT_LINKS} />
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[22px] bg-white p-7 sm:p-8">
              <h3 className="font-display text-[1.45rem] font-medium text-primary-950">Contact Us</h3>
              <ul className="mt-5 space-y-4 text-[0.95rem] text-slate-500">
                {settings.address && (
                  <li className="flex gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-primary-600" />
                    <span>{settings.address}</span>
                  </li>
                )}
                {settings.email && (
                  <li className="flex gap-3">
                    <Mail size={18} className="mt-0.5 shrink-0 text-primary-600" />
                    <a href={`mailto:${settings.email}`} className="break-all hover:text-primary-600">
                      {settings.email}
                    </a>
                  </li>
                )}
              </ul>
              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="mt-6 block font-display text-xl font-medium text-primary-950 hover:text-primary-600"
                >
                  Call At: {settings.phone}
                </a>
              )}
              <Link to="/contact" className="btn-primary mt-6 w-full py-4">
                Get In Touch <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-sm text-slate-500 md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
        </p>
        <div className="-my-1.5 flex flex-wrap justify-center gap-x-5">
          <Link to="/privacy-policy" className="py-1.5 hover:text-primary-600">Privacy Policy</Link>
          <Link to="/terms-conditions" className="py-1.5 hover:text-primary-600">Terms &amp; Conditions</Link>
          <Link to="/disclaimer" className="py-1.5 hover:text-primary-600">Disclaimer</Link>
        </div>
        <p>
          Developed by{" "}
          <a href="https://techsentinals.in/" target="_blank" rel="noopener" className="font-semibold text-primary-950 hover:text-primary-600">
            Techsentinals LLP
          </a>
        </p>
      </div>
    </footer>
  );
}
