import React, { useEffect, useState } from "react";
import { FileText, TrendingUp, MessageSquare, Package, ImageOff, SearchX, Eye, Globe2, Layers, ShieldCheck } from "lucide-react";
import { getAnalytics } from "../api/admin";
import StatTile from "../components/charts/StatTile";
import TrendChart from "../components/charts/TrendChart";
import RankedBarList from "../components/charts/RankedBarList";
import { SkeletonBlock } from "../components/Skeleton";
import AdminPageHeader from "../components/admin/AdminPageHeader";

const WINDOWS = [
  { label: "7 days", value: 7 },
  { label: "30 days", value: 30 },
  { label: "90 days", value: 90 },
];

function SectionHeader({ icon: Icon, title, iconClassName = "bg-primary-50 text-primary-600" }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}>
        <Icon size={16} />
      </span>
      <h2 className="font-semibold text-primary-900">{title}</h2>
    </div>
  );
}

export default function Analytics() {
  const [data, setData] = useState(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAnalytics(days).then(setData).finally(() => setLoading(false));
  }, [days]);

  return (
    <div>
      <AdminPageHeader
        title="Analytics"
        subtitle="Real numbers from your own RFQs, enquiries and product catalog — click any row to jump straight to it."
        actions={
          <div className="flex rounded-lg border border-slate-200 p-1 bg-white">
            {WINDOWS.map((w) => (
              <button
                key={w.value}
                onClick={() => setDays(w.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  days === w.value ? "bg-primary-600 text-white" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        }
      />

      {loading || !data ? (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-28 w-full rounded-xl" />)}
          </div>
          <div className="card p-6 mb-6">
            <SkeletonBlock className="h-44 w-full" />
          </div>
          {Array.from({ length: 3 }).map((_, row) => (
            <div key={row} className="grid lg:grid-cols-2 gap-6 mb-6">
              {Array.from({ length: 2 }).map((_, col) => (
                <div key={col} className="card p-6 space-y-3">
                  <SkeletonBlock className="h-5 w-40 mb-2" />
                  {Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-5 w-full" />)}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatTile
              icon={FileText}
              label="Total quote requests"
              value={data.rfq.total}
              href="/admin/rfqs"
            />
            <StatTile
              icon={TrendingUp}
              label="Won conversion rate"
              value={`${data.rfq.conversion_rate}%`}
              sub={`${data.rfq.won} won of ${data.rfq.total}`}
              iconClassName="bg-accent-50 text-accent-600"
              href="/admin/rfqs?status=Won"
            />
            <StatTile
              icon={MessageSquare}
              label="Total enquiries"
              value={data.contact.total}
              iconClassName="bg-violet-50 text-violet-600"
              href="/admin/enquiries"
            />
            <StatTile
              icon={Package}
              label="Products visible on site"
              value={`${data.catalog.visible_on_website} / ${data.catalog.total}`}
              iconClassName="bg-lime-100 text-primary-800"
              href="/admin/products"
            />
          </div>

          <div className="card p-6 mb-6">
            <TrendChart data={data.rfq.trend} label="Quote requests submitted" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="card p-6">
              <SectionHeader icon={FileText} title="RFQ Status Funnel" />
              <RankedBarList
                items={data.rfq.status_breakdown.map((s) => ({ key: s.status, label: s.status, count: s.count }))}
                getHref={(item) => `/admin/rfqs?status=${encodeURIComponent(item.label)}`}
              />
            </div>
            <div className="card p-6">
              <SectionHeader icon={MessageSquare} title="Enquiry Status" iconClassName="bg-violet-50 text-violet-600" />
              <RankedBarList
                items={data.contact.status_breakdown.map((s) => ({ key: s.status, label: s.status, count: s.count }))}
                getHref={(item) => `/admin/enquiries?status=${encodeURIComponent(item.label)}`}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="card p-6">
              <SectionHeader icon={Package} title="Most-Requested Products" iconClassName="bg-lime-100 text-primary-800" />
              <RankedBarList
                items={data.top_products.map((p) => ({ key: `${p.product_id}-${p.name}`, label: p.name, count: p.count, product_id: p.product_id }))}
                getHref={(item) => (item.product_id ? `/admin/products/${item.product_id}/edit` : null)}
                emptyLabel="No RFQs submitted yet."
              />
            </div>
            <div className="card p-6">
              <SectionHeader icon={Globe2} title="Top Countries (by RFQ)" iconClassName="bg-blue-50 text-blue-600" />
              <RankedBarList
                items={data.top_countries.map((c) => ({ key: c.country, label: c.country, count: c.count }))}
                emptyLabel="No country data yet."
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="card p-6">
              <SectionHeader icon={Layers} title="Inquiry Types" iconClassName="bg-accent-50 text-accent-600" />
              <RankedBarList
                items={data.contact.inquiry_type_breakdown.map((t) => ({ key: t.type, label: t.label, count: t.count }))}
                getHref={(item) => {
                  const type = data.contact.inquiry_type_breakdown.find((t) => t.label === item.label)?.type;
                  return type ? `/admin/enquiries?inquiry_type=${encodeURIComponent(type)}` : null;
                }}
                emptyLabel="No enquiries yet."
              />
            </div>

            <div className="card p-6">
              <SectionHeader icon={ShieldCheck} title="Catalog Health" iconClassName="bg-green-50 text-green-600" />
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600"><Package size={15} className="text-slate-400" /> Active products</span>
                  <span className="font-semibold text-primary-900 tabular-nums">{data.catalog.active} / {data.catalog.total}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600"><Eye size={15} className="text-slate-400" /> Visible on website</span>
                  <span className="font-semibold text-primary-900 tabular-nums">{data.catalog.visible_on_website}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-600"><TrendingUp size={15} className="text-slate-400" /> Featured</span>
                  <span className="font-semibold text-primary-900 tabular-nums">{data.catalog.featured}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-amber-700"><ImageOff size={15} /> Missing images</span>
                  <span className={`font-semibold tabular-nums ${data.catalog.missing_images > 0 ? "text-amber-700" : "text-primary-900"}`}>
                    {data.catalog.missing_images}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-amber-700"><SearchX size={15} /> Missing SEO title/description</span>
                  <span className={`font-semibold tabular-nums ${data.catalog.missing_seo > 0 ? "text-amber-700" : "text-primary-900"}`}>
                    {data.catalog.missing_seo}
                  </span>
                </li>
              </ul>
              {(data.catalog.missing_images > 0 || data.catalog.missing_seo > 0) && (
                <p className="text-xs text-slate-400 mt-4">
                  These products still work correctly — filling these in just improves search-engine visibility and how the product looks when shared.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
