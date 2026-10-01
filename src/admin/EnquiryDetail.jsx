import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { getContact, getContactStatuses, getInquiryTypes, updateContactStatus } from "../api/admin";
import StatusBadge from "../components/StatusBadge";
import { SkeletonBlock } from "../components/Skeleton";
import { useToast } from "../context/ToastContext";
import { formatAdminDateTime } from "../lib/formatDate";

export default function EnquiryDetail() {
  const { id } = useParams();
  const toast = useToast();
  const [enquiry, setEnquiry] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [inquiryTypes, setInquiryTypes] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => getContact(id).then((e) => { setEnquiry(e); setNewStatus(e.status); });
  useEffect(() => { load(); getContactStatuses().then(setStatuses); getInquiryTypes().then(setInquiryTypes); }, [id]);

  const handleUpdateStatus = async () => {
    setSaving(true);
    try {
      await updateContactStatus(id, { status: newStatus, note: note || undefined });
      setNote("");
      toast.success("Status updated.");
      load();
    } catch {
      toast.error("Couldn't update status. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!enquiry) {
    return (
      <div className="max-w-3xl">
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

  const whatsappNumber = (enquiry.phone || "").replace(/[^\d+]/g, "").replace("+", "");

  return (
    <div className="max-w-3xl">
      <Link to="/admin/enquiries" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-primary-600 mb-4">
        <ArrowLeft size={14} /> Back to Inquiries
      </Link>

      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-primary-900">{enquiry.name}</h1>
          <p className="text-sm text-slate-600">Submitted {formatAdminDateTime(enquiry.created_at)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge bg-primary-50 text-primary-700">
            {inquiryTypes.find((t) => t.value === enquiry.inquiry_type)?.label || enquiry.inquiry_type}
          </span>
          <StatusBadge status={enquiry.status} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Info label="Company" value={enquiry.company || "-"} />
              <Info label="Email" value={enquiry.email} />
              <Info label="Phone" value={enquiry.phone || "-"} />
              <Info label="Country" value={enquiry.country || "-"} />
              <Info label="Subject" value={enquiry.subject || "-"} />
              {enquiry.target_market && <Info label="Target Market" value={enquiry.target_market} />}
              {enquiry.reference_detail && <Info label="Reference Detail" value={enquiry.reference_detail} />}
              {(enquiry.product || enquiry.product_name_snapshot) && (
                <div>
                  <dt className="text-xs text-slate-600 uppercase">Product</dt>
                  <dd>
                    {enquiry.product ? (
                      <>
                        <Link to={`/admin/products/${enquiry.product.id}/edit`} className="text-primary-700 hover:underline font-medium">
                          {enquiry.product.name}
                        </Link>
                        {enquiry.product.sku && <span className="text-xs text-slate-600"> ({enquiry.product.sku})</span>}
                      </>
                    ) : (
                      <span>
                        {enquiry.product_name_snapshot}
                        {enquiry.product_sku_snapshot && <span className="text-xs text-slate-600"> ({enquiry.product_sku_snapshot})</span>}
                        <span className="block text-xs text-slate-600">(product no longer exists)</span>
                      </span>
                    )}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-4">
              <p className="text-xs text-slate-600 uppercase">Message</p>
              <p className="text-sm text-slate-600 mt-1">{enquiry.message}</p>
            </div>
            <div className="mt-5 flex gap-3">
              <a href={`mailto:${enquiry.email}`} className="btn-outline !py-2 text-xs"><Mail size={14} /> Email</a>
              {whatsappNumber && (
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white !py-2 text-xs">
                  <MessageCircle size={14} /> WhatsApp
                </a>
              )}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-semibold text-slate-800 mb-4">Status History</h2>
            <div className="space-y-4">
              {enquiry.status_history.map((h) => (
                <div key={h.id} className="border-l-2 border-primary-200 pl-4">
                  <p className="text-sm font-medium text-slate-700">{h.old_status ? `${h.old_status} → ${h.new_status}` : h.new_status}</p>
                  {h.note && <p className="text-xs text-slate-600 mt-0.5">{h.note}</p>}
                  <p className="text-xs text-slate-600 mt-0.5">{formatAdminDateTime(h.created_at)}</p>
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
            <textarea rows={3} className="input" value={note} onChange={(e) => setNote(e.target.value)} />
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
