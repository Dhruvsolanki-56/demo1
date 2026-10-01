import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { History, ArrowRight } from "lucide-react";
import { listActivity } from "../api/admin";
import Pagination from "../components/Pagination";
import { SkeletonBlock } from "../components/Skeleton";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import { formatAdminDateTime } from "../lib/formatDate";

// Plain-English phrasing per action -- never the raw action/entity_type
// strings a developer would recognize, since this page is read by admins,
// not engineers.
const ACTION_PHRASES = {
  create: "created a",
  update: "updated a",
  delete: "deleted a",
  bulk_delete: "bulk-deleted",
  bulk_status_change: "bulk-updated the status of",
  status_change: "updated the status of a",
  add_image: "added an image to a",
  add_document: "added a document to a",
  update_variants: "updated the variants of a",
};

const ENTITY_LABELS = {
  product: "product",
  rfq: "RFQ",
  contact_enquiry: "enquiry",
  admin_user: "admin user",
  site_settings: "site settings",
};

// Only entries whose target still resolves to a real admin page get a link --
// e.g. a deleted product has nothing left to view, so no link is offered.
const LINK_BUILDERS = {
  product: (id) => (id ? `/admin/products/${id}/edit` : null),
  rfq: (id) => (id ? `/admin/rfqs/${id}` : null),
  contact_enquiry: (id) => (id ? `/admin/enquiries/${id}` : null),
  site_settings: () => "/admin/settings",
};

const NON_LINKABLE_ACTIONS = new Set(["delete", "bulk_delete"]);

function describe(entry) {
  const phrase = ACTION_PHRASES[entry.action] || entry.action.replace(/_/g, " ");
  const label = ENTITY_LABELS[entry.entity_type] || entry.entity_type.replace(/_/g, " ");
  const linkBuilder = NON_LINKABLE_ACTIONS.has(entry.action) ? null : LINK_BUILDERS[entry.entity_type];
  const href = linkBuilder ? linkBuilder(entry.entity_id) : null;
  return { text: `${phrase} ${label}`, href };
}

export default function ActivityLog() {
  const [result, setResult] = useState({ items: [], total: 0, page: 1, page_size: 30 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    listActivity({ page, page_size: 30 }).then(setResult).finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <AdminPageHeader title="Activity Log" subtitle="Who did what, and when." />
      <div className="card divide-y divide-slate-100">
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-4"><SkeletonBlock className="h-4 w-2/3 mb-2" /><SkeletonBlock className="h-3 w-1/4" /></div>
        ))}
        {!loading && result.items.map((entry) => {
          const { text, href } = describe(entry);
          return (
            <div key={entry.id} className="p-4 flex justify-between items-start gap-4">
              <div className="min-w-0">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-800">{entry.admin?.name || "System"}</span> {text}
                  {entry.details && <span className="text-slate-600"> — "{entry.details}"</span>}
                </p>
                {href && (
                  <Link to={href} className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-800 mt-1">
                    View <ArrowRight size={12} />
                  </Link>
                )}
              </div>
              <p className="text-xs text-slate-600 shrink-0 whitespace-nowrap">{formatAdminDateTime(entry.created_at)}</p>
            </div>
          );
        })}
        {!loading && result.items.length === 0 && (
          <div className="p-10 text-center text-slate-600">
            <History className="mx-auto text-slate-300 mb-2" size={28} />
            No activity recorded yet.
          </div>
        )}
      </div>
      <Pagination page={result.page} pageSize={result.page_size} total={result.total} onChange={setPage} />
    </div>
  );
}
