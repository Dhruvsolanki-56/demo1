import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle, FileDown } from "lucide-react";
import { getRfq, getRfqStatuses, updateRfqStatus } from "../api/admin";
import { fileUrl } from "../api/client";
import StatusBadge from "../components/StatusBadge";
import { SkeletonBlock } from "../components/Skeleton";
import { useToast } from "../context/ToastContext";
import { formatAdminDateTime } from "../lib/formatDate";

export default function RfqDetail() {
  const { id } = useParams();
  const toast = useToast();
  const [rfq, setRfq] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => getRfq(id).then((r) => { setRfq(r); setNewStatus(r.status); });
  useEffect(() => { load(); getRfqStatuses().then(setStatuses); }, [id]);

  const handleUpdateStatus = async () => {
    setSaving(true);
    try {
      await updateRfqStatus(id, { status: newStatus, note: note || undefined });
      setNote("");
      toast.success("Status updated.");
      load();
    } catch {
      toast.error("Couldn't update status. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!rfq) {
    return (
      <div className="max-w-4xl">
        <SkeletonBlock className="h-4 w-28 mb-4" />
        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="space-y-2">
            <SkeletonBlock className="h-6 w-40" />
            <SkeletonBlock className="h-4 w-56" />
          </div>
          <SkeletonBlock className="h-6 w-20 rounded-full" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <SkeletonBlock key={i} className="h-4 w-full" />)}
            </div>
            <div className="card p-6 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonBlock key={i} className="h-4 w-full" />)}
            </div>
          </div>
          <div className="card p-6 space-y-3">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-10 w-full" />
            <SkeletonBlock className="h-16 w-full" />
            <SkeletonBlock className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const whatsappNumber = (rfq.phone || "").replace(/[^\d+]/g, "").replace("+", "");

  return (
    <div className="max-w-4xl">
      <Link to="/admin/rfqs" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-primary-600 mb-4">
        <ArrowLeft size={14} /> Back to RFQs
      </Link>

      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-primary-900">{rfq.reference_number}</h1>
          <p className="text-sm text-slate-600">Submitted {formatAdminDateTime(rfq.created_at)}</p>
        </div>
        <StatusBadge status={rfq.status} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Customer Details</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Info label="Name" value={rfq.name} />
              <Info label="Company" value={rfq.company || "-"} />
              <Info label="Email" value={rfq.email} />
              <Info label="Phone" value={rfq.phone} />
              <Info label="Country" value={rfq.country || "-"} />
              <Info label="State/City" value={rfq.state_city || "-"} />
              <Info label="Preferred Contact" value={rfq.preferred_contact_method || "-"} />
            </dl>
            {rfq.message && (
              <div className="mt-4">
                <p className="text-xs text-slate-600 uppercase">Message</p>
                <p className="text-sm text-slate-600 mt-1">{rfq.message}</p>
              </div>
            )}
            <div className="mt-5 flex gap-3">
              <a href={`mailto:${rfq.email}`} className="btn-outline !py-2 text-xs"><Mail size={14} /> Email Customer</a>
              {whatsappNumber && (
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white !py-2 text-xs">
                  <MessageCircle size={14} /> Open WhatsApp
                </a>
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Requested Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-slate-600 text-xs uppercase">
                  <tr><th className="text-left pb-2">Product</th><th className="text-left pb-2">Quantity</th><th className="text-left pb-2">Notes</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rfq.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 text-slate-700">
                        {item.product_id ? (
                          <Link to={`/admin/products/${item.product_id}/edit`} className="font-medium text-primary-700 hover:underline">
                            {item.product_name_snapshot}
                          </Link>
                        ) : (
                          <span>{item.product_name_snapshot} <span className="text-xs text-slate-600">(product no longer exists)</span></span>
                        )}
                        {item.product?.composition && <span className="block text-xs text-slate-600 font-normal">{item.product.composition}</span>}
                      </td>
                      <td className="py-2 text-slate-600">{item.quantity}</td>
                      <td className="py-2 text-slate-600">{item.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {rfq.attachments.length > 0 && (
            <div className="card p-6">
              <h2 className="font-semibold text-slate-800 mb-3">Attachments</h2>
              <div className="flex flex-wrap gap-2">
                {rfq.attachments.map((a) => (
                  <a key={a.id} href={fileUrl(a.file_url)} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2 text-xs">
                    <FileDown size={14} /> {a.original_name}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="card p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Status History</h2>
            <div className="space-y-4">
              {rfq.status_history.map((h) => (
                <div key={h.id} className="border-l-2 border-primary-200 pl-4">
                  <p className="text-sm font-medium text-slate-700">
                    {h.old_status ? `${h.old_status} → ${h.new_status}` : h.new_status}
                  </p>
                  {h.note && <p className="text-xs text-slate-600 mt-0.5">{h.note}</p>}
                  <p className="text-xs text-slate-600 mt-0.5">{formatAdminDateTime(h.created_at)} {h.admin ? `by ${h.admin.name}` : ""}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            <h2 className="font-semibold text-slate-800 mb-4">Update Status</h2>
            <label className="label">Status</label>
            <select className="input" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <label className="label mt-4">Note (optional)</label>
            <textarea rows={3} className="input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Follow-up notes..." />
            <button onClick={handleUpdateStatus} disabled={saving} className="btn-primary w-full justify-center mt-4">
              {saving ? "Saving..." : "Update Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-600 uppercase">{label}</dt>
      <dd className="text-slate-700">{value}</dd>
    </div>
  );
}
