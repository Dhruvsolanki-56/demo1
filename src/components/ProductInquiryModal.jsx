import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { X, CheckCircle2 } from "lucide-react";
import { submitContact } from "../api/public";
import ConsentCheckbox from "./ConsentCheckbox";
import PhoneField from "./PhoneField";
import { trackFormSubmission } from "../lib/siteMetrics";

/**
 * Generalized product-page inquiry modal covering the CTAs beyond RFQ/Inquire:
 * Dossier Request, Registration Feasibility, Sample Request, Packaging
 * Details, and Distribution Opportunity — each reuses the existing minimal
 * inquiry_type system (see backend app/models/contact.py) rather than adding
 * new backend fields, with the product name carried in reference_detail.
 */
/**
 * Portalled for the same reason as EnquireModal: a `position: fixed` overlay
 * is contained by any ancestor with a transform, and these modals render
 * inside animated, hover-transformed content. See EnquireModal for the full
 * note.
 */
export default function ProductInquiryModal({ product, config, onClose }) {
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
      const res = await submitContact({
        ...data,
        subject: `${config.label} — ${product.name}`,
        inquiry_type: config.inquiryType,
        reference_detail: product.name,
        product_id: product.id,
      });
      setResult(res);
      trackFormSubmission(config.inquiryType, data.target_market, 1);
    } catch (e) {
      setError(e?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true" aria-labelledby="product-inquiry-title">
      <div className="card w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        {result ? (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto text-accent-500" size={44} />
            <h2 className="text-lg font-bold text-slate-800 mt-4">{config.label} Sent!</h2>
            <p className="text-sm text-slate-600 mt-2">{result.detail}</p>
            <button onClick={onClose} className="btn-primary mt-6">Close</button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-1">
              <h2 id="product-inquiry-title" className="text-lg font-bold text-slate-800">{config.label}</h2>
              <button onClick={onClose} aria-label="Close" className="icon-btn -mt-1 -mr-1"><X size={18} /></button>
            </div>
            <p className="text-sm text-slate-600 mb-4">{product.name}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("honeypot")} className="hidden" />
              <div>
                <label className="label" htmlFor="pim-name">Name *</label>
                <input id="pim-name" className="input" {...register("name", { required: true })} />
                {errors.name && <p className="text-xs text-red-500 mt-1">Name is required</p>}
              </div>
              <div>
                <label className="label" htmlFor="pim-company">Company</label>
                <input id="pim-company" className="input" {...register("company")} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="label" htmlFor="pim-email">Email *</label>
                  <input id="pim-email" type="email" className="input" {...register("email", { required: true })} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">Required</p>}
                </div>
                <PhoneField name="phone" control={control} label="Phone" error={errors.phone} />
              </div>
              {config.extraFieldLabel && (
                <div>
                  <label className="label" htmlFor="pim-target-market">{config.extraFieldLabel}</label>
                  <input id="pim-target-market" className="input" {...register("target_market")} />
                </div>
              )}
              <div>
                <label className="label" htmlFor="pim-message">Message *</label>
                <textarea
                  id="pim-message"
                  rows={3}
                  className="input"
                  placeholder={config.messagePlaceholder}
                  {...register("message", { required: true })}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">Message is required</p>}
              </div>
              <ConsentCheckbox register={register} errors={errors} id="pim-consent" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-accent w-full justify-center">
                {isSubmitting ? "Sending..." : `Submit ${config.label}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
