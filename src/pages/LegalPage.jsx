import React from "react";
import { ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";

/**
 * Shared renderer for the three legal pages (privacy/terms/disclaimer).
 * Kept as one component (rather than one file per topic) so no single
 * chunk's filename can be caught by browser ad/privacy-blocker filter
 * lists that pattern-match on words like "privacy" in the request URL.
 */
export default function LegalPage({ html, title }) {
  return (
    <>
      <SEO title={title} />
      <PageHeader eyebrow="Legal" title={title} />
      <section className="section container-page max-w-3xl">
        <div className="card p-6 sm:p-8">
          <div className="flex items-center gap-2 text-primary-700 mb-5">
            <ShieldCheck size={18} />
            <span className="text-xs font-semibold uppercase tracking-wide">Strikar Lifescience LLP</span>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </section>
    </>
  );
}
