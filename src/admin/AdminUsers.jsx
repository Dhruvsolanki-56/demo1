import React, { useEffect, useState } from "react";
import { Plus, Trash2, Users, ShieldCheck, ShieldOff } from "lucide-react";
import { listAdminUsers, listAdminRoles, createAdminUser, updateAdminUser, deleteAdminUser } from "../api/admin";
import { useAdminAuth } from "../context/AdminAuthContext";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";
import { SkeletonTableRows } from "../components/Skeleton";
import { ROLE_LABELS } from "../constants/roles";
import AdminPageHeader from "../components/admin/AdminPageHeader";
import { formatAdminDate } from "../lib/formatDate";

const EMPTY_FORM = { name: "", email: "", password: "", role: "content_editor" };

export default function AdminUsers() {
  const { admin: currentAdmin } = useAdminAuth();
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([listAdminUsers(), listAdminRoles()])
      .then(([u, r]) => { setUsers(u); setRoles(r); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAdminUser(form);
      toast.success("Admin user created.");
      setForm(EMPTY_FORM);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Couldn't create admin user.");
    } finally {
      setSaving(false);
    }
  };

  const handleRoleChange = async (user, role) => {
    try {
      await updateAdminUser(user.id, { role });
      toast.success(`${user.name}'s role updated.`);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Couldn't update role.");
    }
  };

  const handleToggleActive = async (user) => {
    try {
      await updateAdminUser(user.id, { is_active: !user.is_active });
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Couldn't update status.");
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteAdminUser(confirmDelete.id);
      toast.success("Admin user removed.");
      setConfirmDelete(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Couldn't remove admin user.");
      setConfirmDelete(null);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Admin Users"
        icon={Users}
        subtitle="Manage who can access the admin panel, and what they can do."
        actions={
          <button onClick={() => setShowForm((v) => !v)} className="btn-primary shrink-0">
            <Plus size={16} /> Add Admin User
          </button>
        }
      />

      {showForm && (
        <form onSubmit={handleCreate} className="card p-6 mb-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="au-name">Name</label>
            <input id="au-name" required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="au-email">Email</label>
            <input id="au-email" type="email" required className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="au-password">Temporary Password</label>
            <input id="au-password" type="text" required minLength={8} className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <label className="label" htmlFor="au-role">Role</label>
            <select id="au-role" className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {roles.filter((r) => r !== "admin").map((r) => <option key={r} value={r}>{ROLE_LABELS[r] || r}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary">{saving ? "Creating..." : "Create Admin User"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
          </div>
        </form>
      )}

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Email</th>
              <th className="text-left p-3 font-medium">Role</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Last Login</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && <SkeletonTableRows rows={4} cols={6} />}
            {!loading && users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-700">{u.name} {u.id === currentAdmin?.id && <span className="text-xs text-slate-600">(you)</span>}</td>
                <td className="p-3 text-slate-600">{u.email}</td>
                <td className="p-3">
                  <select
                    className="input !py-1.5 !text-xs"
                    value={u.role}
                    onChange={(e) => handleRoleChange(u, e.target.value)}
                    disabled={u.id === currentAdmin?.id}
                  >
                    {roles.map((r) => <option key={r} value={r}>{ROLE_LABELS[r] || r}</option>)}
                    {!roles.includes(u.role) && <option value={u.role}>{ROLE_LABELS[u.role] || u.role}</option>}
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleToggleActive(u)}
                    disabled={u.id === currentAdmin?.id}
                    className={`badge ${u.is_active ? "bg-primary-50 text-primary-700" : "bg-slate-100 text-slate-600"}`}
                  >
                    {u.is_active ? <ShieldCheck size={12} /> : <ShieldOff size={12} />} {u.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-3 text-slate-600">{u.last_login ? formatAdminDate(u.last_login) : "Never"}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setConfirmDelete(u)}
                    disabled={u.id === currentAdmin?.id}
                    className="icon-btn hover:text-red-600"
                    aria-label={`Remove ${u.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-slate-600">
                  <Users className="mx-auto text-slate-300 mb-2" size={28} />
                  No admin users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!confirmDelete}
        title="Remove admin user?"
        message={confirmDelete ? `${confirmDelete.name} will lose access to the admin panel immediately.` : ""}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  );
}
