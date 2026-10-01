import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LogIn, ShieldCheck, FileText, Package, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";
import { useAdminAuth } from "../context/AdminAuthContext";
import ForgotPasswordForm from "./ForgotPasswordForm";

const FEATURES = [
  { icon: Package, label: "Manage the product catalog" },
  { icon: FileText, label: "Track quote requests & enquiries" },
  { icon: ShieldCheck, label: "Secure, role-based access" },
];

export default function Login() {
  const { login, isAuthenticated } = useAdminAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Forgot password renders inline, right here on the login page, instead of
  // navigating to a separate route -- /admin/forgot-password still exists
  // too (ForgotPassword.jsx), for anyone who lands there directly/bookmarks it.
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    navigate("/admin", { replace: true });
  }

  const onSubmit = async (data) => {
    setError("");
    try {
      await login(data.email, data.password);
      navigate(location.state?.from?.pathname || "/admin", { replace: true });
    } catch (e) {
      setError(e?.response?.data?.detail || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-brand-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-sm text-white">
          <div className="rounded-lg bg-white/95 p-3 w-fit">
            <Logo size="large" />
          </div>
          <h2 className="mt-8 text-2xl font-extrabold leading-snug">Admin Control Center</h2>
          <p className="mt-3 text-primary-100/80">Everything to run the Strikar Lifescience website, in one place.</p>
          <ul className="mt-8 space-y-4">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm font-medium">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15">
                  <Icon size={16} className="text-accent-400" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-sm">
            <div className="flex lg:hidden justify-center mb-8"><Logo size="large" /></div>
            <div className="card p-8 shadow-card-hover">
              {showForgotPassword ? (
                <>
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-primary-600 mb-4"
                  >
                    <ArrowLeft size={13} /> Back to Sign In
                  </button>
                  <ForgotPasswordForm onDone={() => setShowForgotPassword(false)} />
                </>
              ) : (
                <>
                  <h1 className="text-lg font-bold text-primary-900 mb-1">Admin Login</h1>
                  <p className="text-sm text-slate-600 mb-6">Sign in to manage the Strikar Lifescience website.</p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="label" htmlFor="login-email">Email</label>
                      <input id="login-email" type="email" autoComplete="username" className="input" {...register("email", { required: true })} />
                      {errors.email && <p className="text-xs text-red-500 mt-1">Email is required</p>}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="label !mb-0" htmlFor="login-password">Password</label>
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-xs font-semibold text-primary-600 hover:text-primary-800"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative mt-1">
                        <input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          className="input pr-10"
                          {...register("password", { required: true })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-red-500 mt-1">Password is required</p>}
                    </div>
                    {error && <p className="text-sm text-red-500" role="alert">{error}</p>}
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                      <LogIn size={16} /> {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
        <p className="relative py-4 text-center text-xs text-slate-400">
          Developed by{" "}
          <a href="https://techsentinals.in/" target="_blank" rel="noopener" className="font-medium text-slate-500 hover:text-primary-600 transition-colors">
            Techsentinals LLP
          </a>
        </p>
      </div>
    </div>
  );
}
