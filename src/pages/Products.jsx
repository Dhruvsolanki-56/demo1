import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowRight, X, ListFilter } from "lucide-react";
import { getProducts, getFilterOptions } from "../api/public";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { SkeletonProductGrid } from "../components/Skeleton";
import { trackProductSearch, trackFilterUse } from "../lib/siteMetrics";
import { useLenis } from "../components/motion/SmoothScroll";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState({ items: [], total: 0, page: 1, page_size: 24 });
  const [filterOptions, setFilterOptions] = useState({
    dosage_forms: [], therapeutic_segments: [], therapeutic_classes: [],
    presentations: [], packaging_types: [], portfolio_categories: [], product_statuses: [],
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const lenis = useLenis();

  // Lock the page behind the drawer and let Escape close it, matching the
  // other overlays on the site (EnquireModal, ProductInquiryModal).
  useEffect(() => {
    if (!showFilters) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setShowFilters(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [showFilters]);

  const q = searchParams.get("q") || "";
  const dosage_form = searchParams.get("dosage_form") || "";
  const therapeutic_segment = searchParams.get("therapeutic_segment") || "";
  const therapeutic_class = searchParams.get("therapeutic_class") || "";
  const portfolio_category = searchParams.get("portfolio_category") || "";
  const presentation = searchParams.get("presentation") || "";
  const product_status = searchParams.get("product_status") || "";
  const packaging_type = searchParams.get("packaging_type") || "";
  const letter = searchParams.get("letter") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    getFilterOptions().then(setFilterOptions).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({
      q: q || undefined,
      dosage_form: dosage_form || undefined,
      therapeutic_segment: therapeutic_segment || undefined,
      therapeutic_class: therapeutic_class || undefined,
      portfolio_category: portfolio_category || undefined,
      presentation: presentation || undefined,
      product_status: product_status || undefined,
      packaging_type: packaging_type || undefined,
      letter: letter || undefined,
      page,
      page_size: 24,
    })
      .then((r) => {
        setResult(r);
        if (q) trackProductSearch(q, { dosage_form, therapeutic_segment }, r.total);
      })
      .finally(() => setLoading(false));
  }, [q, dosage_form, therapeutic_segment, therapeutic_class, portfolio_category, presentation, product_status, packaging_type, letter, page]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
    if (value && key !== "q") trackFilterUse(key, value);
  };

  const setPage = (p) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(p));
    setSearchParams(next);
    // Changing the page only updates the `?page=` query param, not the
    // pathname, so PublicLayout's ScrollToTop (keyed on pathname) never
    // fires here -- without this, the page stays wherever the user was
    // scrolled to (e.g. mid-grid) and lands on a new set of products out
    // of view above the fold. Go through Lenis (when running) same as
    // ScrollToTop does -- it owns the scroll position, so telling only
    // the browser would leave Lenis mid-flight and animate back down.
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const clearAllFilters = () => setSearchParams(new URLSearchParams());

  const activeFilters = [
    { key: "q", label: `Search: "${q}"` },
    { key: "dosage_form", label: dosage_form },
    { key: "therapeutic_segment", label: therapeutic_segment },
    { key: "therapeutic_class", label: therapeutic_class },
    { key: "portfolio_category", label: portfolio_category },
    { key: "presentation", label: presentation },
    { key: "product_status", label: product_status },
    { key: "packaging_type", label: packaging_type },
    { key: "letter", label: `Starts with "${letter}"` },
  ].filter((f) => searchParams.get(f.key));

  const hasAnyFilter = activeFilters.length > 0;

  // Shared between the desktop sidebar and the mobile drawer below, so the
  // seven filter groups are defined once instead of twice.
  const filterFields = (
    <>
      {filterOptions.portfolio_categories.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-primary-900 mb-2">Portfolio</h4>
          <select className="input" value={portfolio_category} onChange={(e) => updateParam("portfolio_category", e.target.value)}>
            <option value="">All Portfolios</option>
            {filterOptions.portfolio_categories.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      )}
      {filterOptions.dosage_forms.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-primary-900 mb-2">Dosage Form</h4>
          <select className="input" value={dosage_form} onChange={(e) => updateParam("dosage_form", e.target.value)}>
            <option value="">All Forms</option>
            {filterOptions.dosage_forms.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      )}
      {filterOptions.therapeutic_segments.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-primary-900 mb-2">Therapeutic Segment</h4>
          <select className="input" value={therapeutic_segment} onChange={(e) => updateParam("therapeutic_segment", e.target.value)}>
            <option value="">All Segments</option>
            {filterOptions.therapeutic_segments.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
      {filterOptions.therapeutic_classes.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-primary-900 mb-2">Therapeutic Class</h4>
          <select className="input" value={therapeutic_class} onChange={(e) => updateParam("therapeutic_class", e.target.value)}>
            <option value="">All Classes</option>
            {filterOptions.therapeutic_classes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
      {filterOptions.presentations.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-primary-900 mb-2">Presentation</h4>
          <select className="input" value={presentation} onChange={(e) => updateParam("presentation", e.target.value)}>
            <option value="">All Presentations</option>
            {filterOptions.presentations.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
      {filterOptions.packaging_types.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-primary-900 mb-2">Packaging</h4>
          <select className="input" value={packaging_type} onChange={(e) => updateParam("packaging_type", e.target.value)}>
            <option value="">All Packaging</option>
            {filterOptions.packaging_types.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
      {filterOptions.product_statuses.length > 0 && (
        <div>
          <h4 className="font-bold text-sm text-primary-900 mb-2">Product Status</h4>
          <select className="input" value={product_status} onChange={(e) => updateParam("product_status", e.target.value)}>
            <option value="">All Statuses</option>
            {filterOptions.product_statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}
    </>
  );

  return (
    <>
      <SEO
        title="Products"
        description="Browse Strikar Lifescience LLP's full range of pharmaceutical products."
        canonicalPath="/products"
      />

      <PageHeader eyebrow="Our Range" title="Products" />

      <section className="pb-20 pt-8 sm:pb-28 sm:pt-10">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="relative flex-1 shadow-soft !rounded-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <label htmlFor="product-search" className="sr-only">Search by product name, generic name, or strength</label>
              <input
                id="product-search"
                key={q}
                type="text"
                defaultValue={q}
                placeholder="Search by product name, generic name, or strength..."
                className="w-full rounded-full border-0 bg-white py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                onKeyDown={(e) => e.key === "Enter" && updateParam("q", e.target.value)}
                onBlur={(e) => updateParam("q", e.target.value)}
              />
            </div>
            {/* Now the only way into filters at every screen size -- the
                sidebar is gone (see the note where the grid used to split
                into aside + results below). No more breakpoint to get
                wrong: one button, one drawer, everywhere. */}
            <button className="btn-outline btn-pill relative" onClick={() => setShowFilters((v) => !v)}>
              <SlidersHorizontal size={16} /> Filters
              {activeFilters.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {hasAnyFilter && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {activeFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => updateParam(f.key, "")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 border border-primary-200 pl-3 pr-2 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                >
                  {f.label}
                  <X size={13} />
                </button>
              ))}
              <button onClick={clearAllFilters} className="text-xs font-semibold text-slate-500 hover:text-primary-700 underline underline-offset-2">
                Clear all
              </button>
            </div>
          )}

          {/* A-Z index */}
          <div className="flex flex-wrap gap-1.5 mb-5" role="navigation" aria-label="Browse products alphabetically">
            <button
              onClick={() => updateParam("letter", "")}
              className={`h-8 min-w-8 px-3 rounded-full text-xs font-bold transition-all duration-200 ${
                !letter ? "bg-primary-600 text-white shadow-md shadow-primary-600/25" : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:-translate-y-0.5"
              }`}
            >
              All
            </button>
            {LETTERS.map((l) => (
              <button
                key={l}
                onClick={() => updateParam("letter", letter === l ? "" : l)}
                className={`h-8 w-8 rounded-full text-xs font-bold transition-all duration-200 ${
                  letter === l ? "bg-primary-600 text-white shadow-md shadow-primary-600/25" : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:-translate-y-0.5"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* No more sidebar/results split -- filters live entirely in the
              button + drawer above/below, at every screen size, so the
              product grid gets the full container width back. This also
              retires the whole sticky-vs-scrollable saga: there's no
              in-page filter column left to be taller than a viewport. */}
          <div>
              {loading && result.items.length === 0 ? (
                <SkeletonProductGrid count={6} />
              ) : result.items.length === 0 ? (
                <div className="shadow-soft bg-white p-10 text-center">
                  <p className="text-slate-600 font-medium">No matching products found.</p>
                  <p className="text-slate-600 text-sm mt-1">Submit your requirement and our team will review availability.</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    {hasAnyFilter && (
                      <button onClick={clearAllFilters} className="btn-outline btn-pill">Clear Filters</button>
                    )}
                    <Link to="/inquiry-center" className="btn-primary btn-pill">
                      Submit Your Requirement <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className={`transition-opacity duration-150 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
                  <p className="text-sm font-semibold text-primary-900 mb-4">
                    {result.total} product(s) found
                    {result.sample && (
                      <span className="ml-2 font-normal text-slate-500">
                        (sample catalogue for preview; the live site lists the full range)
                      </span>
                    )}
                  </p>
                  {/* Was capped at 3 columns to leave room for the sidebar
                      column beside it; with the sidebar gone the grid gets
                      the full container width, so a 4th column at `xl:`
                      actually has room to breathe instead of stretching
                      three cards unnaturally wide. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {result.items.map((p, i) => (
                      <Reveal key={p.id} delay={(i % 6) * 60}>
                        <ProductCard product={p} />
                      </Reveal>
                    ))}
                  </div>
                  <Pagination page={result.page} pageSize={result.page_size} total={result.total} onChange={setPage} />
                </div>
              )}
          </div>
        </div>
      </section>

      {/* Filter popup -- a portalled backdrop + centred card, not a
          full-screen panel or a bottom sheet, and no longer gated to
          `lg:hidden` -- this is the only way into filters at every screen
          size now that the desktop sidebar is gone. Portalled to <body> for
          the same reason as EnquireModal/ProductInquiryModal: `position:
          fixed` is trapped by any transformed ancestor, and product cards in
          the grid below have hover transforms.

          Only the backdrop scrolls (`overflow-y-auto` here); the card itself
          has no `max-h`/`overflow-y-auto` of its own, so there is still only
          one scroll surface even if the fields ever grow taller than the
          viewport -- the whole card scrolls with the page instead of
          growing an internal scrollbar. */}
      {showFilters &&
        createPortal(
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 px-4 py-8 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filters-title"
            onClick={() => setShowFilters(false)}
          >
            <div className="mx-auto flex min-h-full max-w-3xl items-center">
              <div
                className="w-full rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 id="mobile-filters-title" className="flex items-center gap-2 font-bold text-primary-900">
                    <ListFilter size={18} /> Filters
                  </h2>
                  <button onClick={() => setShowFilters(false)} aria-label="Close filters" className="icon-btn">
                    <X size={18} />
                  </button>
                </div>
                <div className="pt-6">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {filterFields}
                  </div>
                  <button onClick={() => setShowFilters(false)} className="btn-primary mt-8 w-full justify-center">
                    Show {result.total} Result{result.total === 1 ? "" : "s"}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
