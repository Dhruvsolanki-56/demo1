import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2, Send } from "lucide-react";
import { submitContact } from "../api/public";
import { useSiteSettings } from "../context/SiteSettingsContext";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import CreatableCombobox from "../components/CreatableCombobox";
import ConsentCheckbox from "../components/ConsentCheckbox";
import PhoneField from "../components/PhoneField";
import { COUNTRIES } from "../data/countries";
import { trackFormSubmission } from "../lib/siteMetrics";

export default function Contact() {
  const { settings } = useSiteSettings();
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      await submitContact(data);
      setSubmitted(true);
      trackFormSubmission("general_contact", data.country, 0);
      reset();
    } catch (e) {
      setError(e?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  const whatsappNumber = (settings.whatsapp || "").replace(/[^\d+]/g, "").replace("+", "");

  const details = [
    settings.address && { icon: MapPin, label: "Address", value: settings.address },
    settings.phone && { icon: Phone, label: "Call Us", value: settings.phone, href: `tel:${settings.phone}` },
    settings.email && { icon: Mail, label: "Email Address", value: settings.email, href: `mailto:${settings.email}` },
    settings.business_hours && { icon: Clock, label: "Working Time", value: settings.business_hours },
    whatsappNumber && { icon: MessageCircle, label: "WhatsApp", value: settings.whatsapp, href: `https://wa.me/${whatsappNumber}` },
  ].filter(Boolean);

  return (
    <>
      <SEO title="Contact Us" canonicalPath="/contact" />

      <PageHeader eyebrow="Get in Touch" title="Contact Us" />

      <section className="mt-16 sm:mt-24">
        <div className="frame border border-slate-200 bg-white p-6 shadow-ledge sm:p-10 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-medium leading-tight text-primary-950">
                Send us a message
              </h2>
              <p className="mt-4 max-w-lg text-[1.02rem] leading-relaxed text-slate-500">
                We are always ready to help with product requirements, partnerships and general questions.
              </p>

              {details.length > 0 && (
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  {details.map((d) => (
                    <InfoRow key={d.label} {...d} />
                  ))}
                </div>
              )}

              <div className="mt-10 rounded-[20px] bg-panel p-6">
                <p className="font-display text-lg font-medium text-primary-950">Looking for a quotation?</p>
                <p className="mt-1 text-sm text-slate-500">
                  Add products to your quote list and send one request, or choose a specific inquiry type.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to="/request-quote" className="btn-primary">Request a Quote</Link>
                  <Link to="/inquiry-center" className="btn-outline">Inquiry Center</Link>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center rounded-[20px] bg-panel px-6 py-16 text-center">
                  <CheckCircle2 className="text-primary-600" size={48} />
                  <h2 className="mt-4 font-display text-2xl font-medium text-primary-950">Thank you for reaching out!</h2>
                  <p className="mt-2 text-slate-500">Our team will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline mt-6">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("honeypot")} className="hidden" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label" htmlFor="c-name">Full Name *</label>
                      <input id="c-name" className="input" maxLength={150} {...register("name", { required: true })} />
                      {errors.name && <p className="mt-1 text-xs text-red-500">Name is required</p>}
                    </div>
                    <div>
                      <label className="label" htmlFor="c-email">Email Address *</label>
                      <input id="c-email" type="email" className="input" {...register("email", { required: true })} />
                      {errors.email && <p className="mt-1 text-xs text-red-500">Valid email is required</p>}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <PhoneField name="phone" control={control} label="Phone Number" error={errors.phone} />
                    <div>
                      <label className="label" htmlFor="c-company">Company</label>
                      <input id="c-company" className="input" maxLength={200} {...register("company")} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Controller
                      name="country"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CreatableCombobox label="Country" value={field.value} onChange={field.onChange} options={COUNTRIES} placeholder="Select your country..." />
                      )}
                    />
                    <div>
                      <label className="label" htmlFor="c-subject">Subject</label>
                      <input id="c-subject" className="input" maxLength={200} {...register("subject")} />
                    </div>
                  </div>
                  <div>
                    <label className="label" htmlFor="c-message">Message *</label>
                    <textarea id="c-message" rows={6} className="input" {...register("message", { required: true })} />
                    {errors.message && <p className="mt-1 text-xs text-red-500">Message is required</p>}
                  </div>
                  <ConsentCheckbox register={register} errors={errors} id="c-consent" />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-4">
                    {isSubmitting ? "Sending..." : "Submit Requirement"} <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {settings.google_maps_embed && (
            <div className="mt-12 overflow-hidden rounded-[20px] border border-slate-200">
              <iframe
                src={settings.google_maps_embed}
                title="Office location map"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
        <Icon size={19} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-lg font-medium text-primary-950">{label}</p>
        <p className="mt-1 break-words text-[0.95rem] text-slate-500">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      className="block transition-opacity hover:opacity-80"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    content
  );
}
