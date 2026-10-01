import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyRound, MailCheck, ShieldCheck } from "lucide-react";
import { forgotPassword, verifyResetOtp, resetPassword } from "../api/admin";

/**
 * The actual forgot-password/OTP-reset UI, extracted so it can render either
 * embedded inline on the login page (no navigation away from /admin/login)
 * or standalone at /admin/forgot-password (a direct link/bookmark target).
 *
 * Four steps, each its own screen: request -> verify -> password -> done.
 * The code is verified on its own (via /api/auth/verify-reset-otp) before
 * the new-password field is even shown, rather than asking for the code and
 * the new password on one screen and only finding out the code was wrong
 * after both were typed.
 */
export default function ForgotPasswordForm({ onDone }) {
  const [step, setStep] = useState("request"); // request -> verify -> password -> done
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const requestForm = useForm();
  const verifyForm = useForm();
  const passwordForm = useForm();

  const onRequestSubmit = async (data) => {
    setError("");
    try {
      await forgotPassword(data.email);
      setEmail(data.email);
      setStep("verify");
    } catch {
      // Backend always returns a generic success response for this endpoint
      // (never reveals whether the email exists) -- a thrown error here means
      // something genuinely went wrong (network, rate limit), not "no account".
      setError("Something went wrong. Please try again in a moment.");
    }
  };

  const onVerifySubmit = async (data) => {
    setError("");
    try {
      await verifyResetOtp({ email, otp: data.otp });
      setOtp(data.otp);
      setStep("password");
    } catch (e) {
      setError(e?.response?.data?.detail || "Invalid or expired code.");
    }
  };

  const onPasswordSubmit = async (data) => {
    setError("");
    try {
      await resetPassword({ email, otp, new_password: data.new_password });
      setStep("done");
    } catch (e) {
      // The code could theoretically expire (or hit the attempt limit from
      // guesses elsewhere) in the gap between verifying it and submitting a
      // new password -- send back to the verify step rather than dead-end.
      setError(e?.response?.data?.detail || "Invalid or expired code. Please request a new one.");
      setStep("verify");
    }
  };

  if (step === "done") {
    return (
      <>
        <h1 className="text-lg font-bold text-primary-900 mb-1">Password Reset</h1>
        <p className="text-sm text-slate-600 mb-6">Your password has been updated. You can now sign in with your new password.</p>
        <button onClick={onDone} className="btn-primary w-full justify-center">Back to Sign In</button>
      </>
    );
  }

  if (step === "password") {
    return (
      <>
        <h1 className="text-lg font-bold text-primary-900 mb-1 flex items-center gap-2"><ShieldCheck size={18} /> Set New Password</h1>
        <p className="text-sm text-slate-600 mb-6">Code verified. Choose a new password for <strong>{email}</strong>.</p>
        <form key="password-form" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <div>
            <label className="label" htmlFor="fp-new-password">New Password</label>
            <input
              id="fp-new-password"
              type="password"
              autoComplete="new-password"
              className="input"
              {...passwordForm.register("new_password", { required: true, minLength: 8 })}
            />
            {passwordForm.formState.errors.new_password && <p className="text-xs text-red-500 mt-1">Minimum 8 characters</p>}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={passwordForm.formState.isSubmitting} className="btn-primary w-full justify-center">
            {passwordForm.formState.isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </>
    );
  }

  if (step === "verify") {
    return (
      <>
        <h1 className="text-lg font-bold text-primary-900 mb-1 flex items-center gap-2"><MailCheck size={18} /> Check Your Email</h1>
        <p className="text-sm text-slate-600 mb-6">
          If an account exists for <strong>{email}</strong>, a 6-digit code was just sent. It expires in 10 minutes.
        </p>
        <form key="verify-form" onSubmit={verifyForm.handleSubmit(onVerifySubmit)} className="space-y-4">
          <div>
            <label className="label" htmlFor="fp-otp">6-Digit Code</label>
            <input
              id="fp-otp"
              type="text"
              className="input tracking-[0.3em] text-center font-semibold"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              autoComplete="one-time-code"
              {...verifyForm.register("otp", { required: true, minLength: 6, maxLength: 6 })}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={verifyForm.formState.isSubmitting} className="btn-primary w-full justify-center">
            {verifyForm.formState.isSubmitting ? "Verifying..." : "Verify Code"}
          </button>
          <button type="button" onClick={() => setStep("request")} className="btn-ghost w-full justify-center !py-1.5 text-xs">
            Use a different email
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      <h1 className="text-lg font-bold text-primary-900 mb-1 flex items-center gap-2"><KeyRound size={18} /> Forgot Password</h1>
      <p className="text-sm text-slate-600 mb-6">Enter your admin email and we'll send you a 6-digit reset code.</p>
      <form key="request-form" onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-4">
        <div>
          <label className="label" htmlFor="fp-email">Email</label>
          <input id="fp-email" type="email" autoComplete="email" className="input" {...requestForm.register("email", { required: true })} />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={requestForm.formState.isSubmitting} className="btn-primary w-full justify-center">
          {requestForm.formState.isSubmitting ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
    </>
  );
}
