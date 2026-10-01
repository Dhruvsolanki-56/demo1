import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { changePassword } from "../api/admin";
import { useAdminAuth } from "../context/AdminAuthContext";
import { ROLE_LABELS } from "../constants/roles";
import AdminPageHeader from "../components/admin/AdminPageHeader";

export default function Profile() {
  const { admin } = useAdminAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    setMessage("");
    try {
      await changePassword(data);
      setMessage("Password updated successfully.");
      reset();
    } catch (e) {
      setError(e?.response?.data?.detail || "Failed to update password.");
    }
  };

  return (
    <div className="max-w-md">
      <AdminPageHeader title="Profile" />

      <div className="card p-6 mb-6">
        <p className="text-sm text-slate-600">Name</p>
        <p className="font-medium text-slate-800 mb-3">{admin?.name}</p>
        <p className="text-sm text-slate-600">Email</p>
        <p className="font-medium text-slate-800 mb-3">{admin?.email}</p>
        <p className="text-sm text-slate-600">Role</p>
        <p className="font-medium text-slate-800">{ROLE_LABELS[admin?.role] || admin?.role}</p>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Current Password</label>
            <input type="password" className="input" {...register("current_password", { required: true })} />
            {errors.current_password && <p className="text-xs text-red-500 mt-1">Required</p>}
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" className="input" {...register("new_password", { required: true, minLength: 8 })} />
            {errors.new_password && <p className="text-xs text-red-500 mt-1">Minimum 8 characters</p>}
          </div>
          {message && <p className="text-sm text-primary-600">{message}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
