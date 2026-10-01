import React from "react";
import { Wrench, Mail, Phone } from "lucide-react";
import SEO from "../components/SEO";
import Logo from "../components/Logo";
import { useSiteSettings } from "../context/SiteSettingsContext";

/**
 * Standalone maintenance-mode screen -- no Header/Footer chrome, since a
 * broken/incomplete nav during a maintenance window would only invite more
 * clicks into a site that isn't ready. Shown for every public route when
 * VITE_MAINTENANCE_MODE=true (see App.jsx); the admin panel stays reachable
 * so an admin can keep working while the public site is down. Deliberately
 * not backed by a database flag -- this project's Site Settings is a fixed
 * contact-info table by design (see app/models/content.py), not a general
 * CMS switchboard, so this is an env-var toggle an operator flips at deploy
 * time instead.
 */
export default function Maintenance() {
  const { settings } = useSiteSettings();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-950 px-4 py-12">
      <SEO title="Under Maintenance" noIndex />
      <div className="w-full max-w-md text-center flex-1 flex flex-col items-center justify-center">
        <div className="rounded-lg bg-white/95 p-2 w-fit mx-auto mb-8">
          <Logo />
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-accent-300 mx-auto mb-6">
          <Wrench size={28} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">We'll Be Right Back</h1>
        <p className="mt-3 text-primary-200/80 leading-relaxed">
          Our website is currently undergoing scheduled maintenance to serve you better. Please check back shortly.
        </p>
        {(settings.phone || settings.email) && (
          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-primary-100">
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-accent-300 transition-colors">
                <Phone size={14} /> {settings.phone}
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-accent-300 transition-colors">
                <Mail size={14} /> {settings.email}
              </a>
            )}
          </div>
        )}
      </div>
      <p className="text-xs text-primary-400/70">
        Developed by{" "}
        <a href="https://techsentinals.in/" target="_blank" rel="noopener" className="font-medium text-primary-300 hover:text-white transition-colors">
          Techsentinals LLP
        </a>
      </p>
    </div>
  );
}
