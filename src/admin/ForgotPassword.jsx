import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8"><Logo size="large" /></div>
        <div className="card p-8">
          <ForgotPasswordForm onDone={() => navigate("/admin/login")} />
        </div>
        <Link to="/admin/login" className="mt-6 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-primary-600">
          <ArrowLeft size={14} /> Back to Login
        </Link>
      </div>
    </div>
  );
}
