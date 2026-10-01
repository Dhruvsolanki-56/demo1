import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, FileSearch, Globe2, ClipboardList } from "lucide-react";
import SEO from "../components/SEO";
import { TwoToneHeading } from "../components/motion/Parallax";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { SkeletonProductGrid } from "../components/Skeleton";
import { getProducts } from "../api/public";

const PORTFOLIO = "Products from High-Surveillance Regulatory Markets";

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Stricter Regulatory Oversight",
    desc: "This portfolio covers products intended for markets that apply a higher degree of regulatory scrutiny, such as Health Canada.",
  },
  {
    icon: Globe2,
    title: "Sourced Through Our Alliance Network",
    desc: "Products in this portfolio are sourced through Strikar Lifescience's manufacturing and regulatory alliance network.",
  },
  {
    icon: ClipboardList,
    title: "Kept Structurally Separate",
    desc: "This portfolio is maintained as a dedicated, standalone product line, separate from our general Pharmaceutical Products catalog.",
  },
];

export default function HighSurveillanceMarkets() {
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts({ portfolio_category: PORTFOLIO, page_size: 12 })
      .then((r) => { setProducts(r.items); setTotal(r.total); })
      .catch(() => setProducts([]));
  }, []);

  return (
    <>
      <SEO
        title="Products from High-Surveillance Regulatory Markets"
        description="A dedicated Strikar Lifescience LLP portfolio for products intended for markets with stricter regulatory oversight, sourced through our manufacturing and regulatory alliance network."
        canonicalPath="/product-portfolio/high-surveillance-regulatory-markets"
      />
      <PageHeader eyebrow="Product Portfolio" title="Products from High-Surveillance Regulatory Markets" />


      <section className="section">
        <div className="container-page max-w-3xl">
          <p className="text-slate-600 leading-relaxed text-lg">
            Strikar Lifescience maintains a dedicated portfolio for products intended for markets with stricter
            regulatory oversight. This portfolio is kept structurally separate from our general Pharmaceutical
            Products catalog to reflect the higher level of regulatory scrutiny associated with these markets.
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Products in this portfolio are sourced through Strikar Lifescience's manufacturing and regulatory
            alliance network, and are made available only where Strikar has authorized commercialization,
            registration, export, licensing, or market-development rights for the relevant portfolio.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid sm:grid-cols-3 gap-6">
          {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card card-hover card-bold p-6">
              <div className="icon-badge">
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-lg text-primary-900 mt-4">{title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
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
                  <TwoToneHeading text="Health Canada Portfolio" className="section-title mt-3" />
                </div>
                <Link to={`/products?portfolio_category=${encodeURIComponent(PORTFOLIO)}`} className="btn-outline hidden sm:inline-flex">
                  View All {total} <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {total > products.length && (
                <div className="text-center mt-8 sm:hidden">
                  <Link to={`/products?portfolio_category=${encodeURIComponent(PORTFOLIO)}`} className="btn-outline">
                    View All {total} Products <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="container-page max-w-2xl mx-auto">
              <div className="card p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-primary-600">
                  <FileSearch size={26} />
                </div>
                <h3 className="font-bold text-xl text-primary-900 mt-5">Detailed Listings Being Finalized</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  Detailed product listings for this portfolio are currently being finalized. In the meantime, our
                  team can discuss registration feasibility or a dossier request for products of interest in your
                  target market.
                </p>
                <Link to="/inquiry-center" className="btn-primary btn-pill mt-6 inline-flex">
                  Visit the Inquiry Center <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
