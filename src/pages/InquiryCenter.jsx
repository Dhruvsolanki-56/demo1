import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  FileText, Globe2, PackageSearch, Handshake, FileSignature, Factory, HeartPulse,
  ShoppingCart, MessageSquare, CheckCircle2, ArrowRight, ArrowLeft,
} from "lucide-react";
import { submitContact, getInquiryTypes } from "../api/public";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import CreatableCombobox from "../components/CreatableCombobox";
import ConsentCheckbox from "../components/ConsentCheckbox";
import PhoneField from "../components/PhoneField";
import { COUNTRIES } from "../data/countries";
import { INQUIRY_TYPE_CONFIG } from "../data/inquiryTypes";
import { trackFormSubmission } from "../lib/siteMetrics";

const ICONS = { FileText, Globe2, PackageSearch, Handshake, FileSignature, Factory, HeartPulse };

const EXTERNAL_ENTRIES = [
  {
    icon: ShoppingCart,
    label: "RFQ / Quote Request",
    description: "Request a quotation for one or more pharmaceutical or nutraceutical products.",
    to: "/request-quote",
  },
  {
    icon: MessageSquare,
    label: "General Contact",
    description: "Any other question that doesn't fit the categories below.",
    to: "/contact",
  },
];

export default function InquiryCenter() {
  const [selected, setSelected] = useState(null);
  const [typeConfig, setTypeConfig] = useState(INQUIRY_TYPE_CONFIG);

  useEffect(() => {
    getInquiryTypes()
      .then((apiTypes) => {
        const labelByValue = Object.fromEntries(apiTypes.map((t) => [t.value, t.label]));
        setTypeConfig(INQUIRY_TYPE_CONFIG.map((t) => ({ ...t, label: labelByValue[t.value] || t.label })));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="Inquiry Center"
        description="Submit an RFQ, dossier request, registration feasibility check, sample request, distribution or tender inquiry to Strikar Lifescience LLP."
        canonicalPath="/inquiry-center"
      />
      <PageHeader eyebrow="Get In Touch" title="Inquiry Center" />

      <section className="section">
        <div className="container-page">
          {!selected && (
            <>
              <p className="text-slate-600 leading-relaxed text-lg max-w-2xl">
                Choose the category that best matches your requirement. Our team routes each inquiry type to the
                right internal specialist so you get a faster, more relevant response.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {EXTERNAL_ENTRIES.map((entry) => (
                  <Link key={entry.label} to={entry.to} className="card card-hover card-bold p-6 flex flex-col">
                    <div className="icon-badge">
                      <entry.icon size={22} />
                    </div>
                    <h3 className="font-bold text-lg text-primary-900 mt-4">{entry.label}</h3>
                    <p className="text-sm text-slate-600 mt-2 flex-1">{entry.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                      Continue <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}

                {typeConfig.map((type) => {
                  const Icon = ICONS[type.icon];
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelected(type)}
                      className="card card-hover card-bold p-6 flex flex-col text-left"
                    >
                      <div className="icon-badge">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-bold text-lg text-primary-900 mt-4">{type.label}</h3>
                      <p className="text-sm text-slate-600 mt-2 flex-1">{type.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                        Start Inquiry <ArrowRight size={14} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {selected && <InquiryForm type={selected} onBack={() => setSelected(null)} />}
        </div>
      </section>
    </>
  );
}

function InquiryForm({ type, onBack }) {
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const Icon = ICONS[type.icon];

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await submitContact({
        ...data,
        subject: type.label,
        inquiry_type: type.value,
      });
      setResult(res);
      trackFormSubmission(type.value, data.country, 0);
      reset();
    } catch (e) {
      setError(e?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  if (result) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full">
          <CheckCircle2 className="text-accent-500" size={44} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mt-5">{type.label} Submitted!</h2>
        <p className="text-slate-600 mt-2">{result.detail}</p>
        <button onClick={onBack} className="btn-outline mt-8">
          <ArrowLeft size={16} /> Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} type="button" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-primary-600 mb-6">
        <ArrowLeft size={14} /> All Inquiry Types
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="icon-badge shrink-0">
          <Icon size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary-900">{type.label}</h2>
          <p className="text-sm text-slate-600">{type.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 sm:p-8 space-y-4">
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("honeypot")} className="hidden" />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="iq-name">Name *</label>
            <input id="iq-name" className="input" {...register("name", { required: true })} />
            {errors.name && <p className="text-xs text-red-500 mt-1">Name is required</p>}
          </div>
          <div>
            <label className="label" htmlFor="iq-company">Company / Organization</label>
            <input id="iq-company" className="input" {...register("company")} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="iq-email">Email *</label>
            <input id="iq-email" type="email" className="input" {...register("email", { required: true })} />
            {errors.email && <p className="text-xs text-red-500 mt-1">Valid email is required</p>}
          </div>
          <PhoneField name="phone" control={control} label="Phone / WhatsApp" error={errors.phone} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Controller
            name="country"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <CreatableCombobox label="Country" value={field.value} onChange={field.onChange} options={COUNTRIES} placeholder="Select your country..." />
            )}
          />
          {type.targetMarket && (
            <div>
              <label className="label" htmlFor="iq-target-market">
                {type.targetMarket.label} {type.targetMarket.required && "*"}
              </label>
              <input
                id="iq-target-market"
                className="input"
                {...register("target_market", { required: !!type.targetMarket.required })}
              />
              {errors.target_market && <p className="text-xs text-red-500 mt-1">{type.targetMarket.label} is required</p>}
            </div>
          )}
        </div>

        {type.referenceDetail && (
          <div>
            <label className="label" htmlFor="iq-reference-detail">
              {type.referenceDetail.label} {type.referenceDetail.required && "*"}
            </label>
            <input
              id="iq-reference-detail"
              className="input"
              {...register("reference_detail", { required: !!type.referenceDetail.required })}
            />
            {errors.reference_detail && <p className="text-xs text-red-500 mt-1">{type.referenceDetail.label} is required</p>}
          </div>
        )}

        <div>
          <label className="label" htmlFor="iq-message">Message / Requirements *</label>
          <textarea id="iq-message" rows={5} className="input" {...register("message", { required: true })} />
          {errors.message && <p className="text-xs text-red-500 mt-1">Message is required</p>}
        </div>

        <ConsentCheckbox register={register} errors={errors} id="iq-consent" />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button type="submit" disabled={isSubmitting} className="btn-primary btn-pill w-full justify-center">
          {isSubmitting ? "Submitting..." : `Submit ${type.label}`}
        </button>
      </form>
    </div>
  );
}
