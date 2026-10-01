import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, FileText, Clock, CheckCircle, MessageSquare, RefreshCw, Plus } from "lucide-react";
import { getDashboard } from "../api/admin";
import StatusBadge from "../components/StatusBadge";
import { SkeletonBlock } from "../components/Skeleton";
import { useAdminAuth } from "../context/AdminAuthContext";
import { canAccess } from "../components/AdminSidebar";
import AdminPageHeader from "../components/admin/AdminPageHeader";

export default function Dashboard() {
  const { admin } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  const load = () => {
    setError(false);
    getDashboard().then(setStats).catch(() => setError(true));
  };

  useEffect(() => { load(); }, []);

  if (error) {
    return (
      <div>
        <h1 className="text-xl font-bold text-primary-900 mb-6">Dashboard</h1>
        <div className="card p-8 text-center">
          <p className="text-sm text-slate-600 mb-4">Couldn't load dashboard stats.</p>
          <button onClick={load} className="btn-outline mx-auto"><RefreshCw size={16} /> Retry</button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div>
        <h1 className="text-xl font-bold text-primary-900 mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonBlock key={i} className="h-24 w-full rounded-xl" />)}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="card p-5 space-y-3">
              <SkeletonBlock className="h-5 w-32 mb-2" />
              {Array.from({ length: 4 }).map((_, j) => <SkeletonBlock key={j} className="h-10 w-full" />)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Total Products", value: stats.total_products, icon: Package, color: "bg-primary-50 text-primary-600", to: canAccess(admin?.role, ["product_manager"]) ? "/admin/products" : null },
    { label: "Active Products", value: stats.active_products, icon: Package, color: "bg-primary-50 text-primary-600", to: canAccess(admin?.role, ["product_manager"]) ? "/admin/products?status=active" : null },
    { label: "New RFQs", value: stats.new_rfqs, icon: FileText, color: "bg-blue-50 text-blue-600", to: canAccess(admin?.role, ["crm_user"]) ? "/admin/rfqs?status=New" : null },
    { label: "Pending RFQs", value: stats.pending_rfqs, icon: Clock, color: "bg-amber-50 text-amber-600", to: canAccess(admin?.role, ["crm_user"]) ? "/admin/rfqs" : null },
    { label: "Processed RFQs", value: stats.processed_rfqs, icon: CheckCircle, color: "bg-green-50 text-green-600", to: canAccess(admin?.role, ["crm_user"]) ? "/admin/rfqs" : null },
    { label: "New Inquiries", value: stats.new_enquiries, icon: MessageSquare, color: "bg-rose-50 text-rose-600", to: canAccess(admin?.role, ["crm_user"]) ? "/admin/enquiries?status=New" : null },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${admin?.name || "admin"}.`}
        actions={canAccess(admin?.role, ["product_manager"]) && (
          <Link to="/admin/products/new" className="btn-primary"><Plus size={16} /> Add Product</Link>
        )}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon, color, to }) => {
          const CardTag = to ? Link : "div";
          return (
            <CardTag key={label} to={to} className="card card-hover p-5 block">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-extrabold text-primary-900 mt-3">{value}</p>
              <p className="text-xs text-slate-600">{label}</p>
            </CardTag>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-primary-900">Recent RFQs</h2>
            <Link to="/admin/rfqs" className="text-xs text-primary-600 font-semibold hover:text-primary-800">View All</Link>
          </div>
          <div className="space-y-1">
            {stats.recent_rfqs.length === 0 && <p className="text-sm text-slate-600">No RFQs yet.</p>}
            {stats.recent_rfqs.map((rfq) => (
              <Link key={rfq.id} to={`/admin/rfqs/${rfq.id}`} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{rfq.name}</p>
                  <p className="text-xs text-slate-600">{rfq.reference_number}</p>
                </div>
                <StatusBadge status={rfq.status} />
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-primary-900">Recent Enquiries</h2>
            <Link to="/admin/enquiries" className="text-xs text-primary-600 font-semibold hover:text-primary-800">View All</Link>
          </div>
          <div className="space-y-1">
            {stats.recent_enquiries.length === 0 && <p className="text-sm text-slate-600">No enquiries yet.</p>}
            {stats.recent_enquiries.map((enq) => (
              <Link key={enq.id} to={`/admin/enquiries/${enq.id}`} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{enq.name}</p>
                  <p className="text-xs text-slate-600">{enq.subject || enq.email}</p>
                </div>
                <StatusBadge status={enq.status} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
