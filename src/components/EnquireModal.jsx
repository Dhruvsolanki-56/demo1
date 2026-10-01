import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { X, CheckCircle2 } from "lucide-react";
import { submitRfq } from "../api/public";
import ConsentCheckbox from "./ConsentCheckbox";
import PhoneField from "./PhoneField";

/**
 * Rendered through a portal, deliberately.
 *
 * `position: fixed` resolves against the nearest ancestor carrying a
 * transform, filter or perspective — not the viewport. This modal opens from
 * ProductCard, and the card has a hover transform AND sits inside a reveal
 * wrapper that animates transform too. Left in place, the overlay was trapped
 * inside the card's own 285x441 box at top:-51 — hanging off the top of the
 * screen with its title cut off. A portal to <body> escapes both ancestors.
 */
export default function EnquireModal({ product, onClose }) {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // The page behind the modal scrolled freely while it was open, and Escape
  // did nothing — the overlay nav closes on Escape, so the product dialogs
  // behaving differently is just inconsistent.
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await submitRfq({
        ...data,
        items: [{ product_id: product.id, quantity: data.quantity || "1" }],
      });
      setResult(res);
    } catch (e) {
      setError(e?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="enquire-title">
      <div className="card w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        {result ? (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto text-accent-500" size={44} />
            <h2 className="text-lg font-bold text-slate-800 mt-4">Inquiry Sent!</h2>
            <p className="text-sm text-slate-600 mt-2">{result.message}</p>
            <p className="text-xs text-slate-600 mt-3">Reference: <span className="font-semibold text-primary-700">{result.reference_number}</span></p>
            <button onClick={onClose} className="btn-primary mt-6">Close</button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-1">
              <h2 id="enquire-title" className="text-lg font-bold text-slate-800">Inquire About This Product</h2>
              <button onClick={onClose} aria-label="Close" className="icon-btn -mt-1 -mr-1"><X size={18} /></button>
            </div>
            <p className="text-sm text-slate-600 mb-4">{product.name}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("honeypot")} className="hidden" />
              <div>
                <label className="label" htmlFor="enq-name">Name *</label>
                <input id="enq-name" className="input" {...register("name", { required: true })} />
                {errors.name && <p className="text-xs text-red-500 mt-1">Name is required</p>}
              </div>
              <div>
                <label className="label" htmlFor="enq-company">Company</label>
                <input id="enq-company" className="input" {...register("company")} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label" htmlFor="enq-email">Email *</label>
                  <input id="enq-email" type="email" className="input" {...register("email", { required: true })} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">Required</p>}
                </div>
                <PhoneField name="phone" control={control} label="Phone" required error={errors.phone} />
              </div>
              <div>
                <label className="label" htmlFor="enq-quantity">Required Quantity</label>
                <input id="enq-quantity" className="input" placeholder="e.g. 500 boxes" {...register("quantity")} />
              </div>
              <div>
                <label className="label" htmlFor="enq-message">Message</label>
                <textarea id="enq-message" rows={3} className="input" {...register("message")} />
              </div>
              <ConsentCheckbox register={register} errors={errors} id="enq-consent" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-accent w-full justify-center">
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
