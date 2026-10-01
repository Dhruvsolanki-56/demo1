import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContact } from "../../api/public";
import ConsentCheckbox from "../ConsentCheckbox";
import { trackFormSubmission } from "../../lib/siteMetrics";

const field =
  "w-full rounded-[16px] border border-transparent bg-primary-950/45 px-6 py-4 text-[0.95rem] text-white placeholder:text-white/70 transition-colors focus:border-accent-500 focus:outline-none focus:ring-0";

/**
 * Photo + steel-blue enquiry panel. Posts to the same contact endpoint as the
 * Contact page, as a general enquiry.
 */
export default function ContactBand({ image = "/company_intro.png", heading = "Send us your requirement" }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      await submitContact({ ...data, inquiry_type: "general_contact" });
      trackFormSubmission("general_contact", "", 0);
      setDone(true);
      reset();
    } catch (e) {
      setError(e?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="frame grid overflow-hidden lg:grid-cols-2">
      <div className="relative min-h-[280px] lg:min-h-full">
        <img src={image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/70 to-transparent lg:hidden" />
      </div>

      <div className="bg-primary-600 px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-[60px]">
        <h2 className="font-display text-[clamp(1.9rem,3vw,2.6rem)] font-medium leading-tight text-white">{heading}</h2>

        {done ? (
          <div className="mt-10 rounded-[20px] bg-primary-950/35 p-8 text-center">
            <CheckCircle2 size={44} className="mx-auto text-accent-500" />
            <p className="mt-4 font-display text-2xl font-medium text-white">Thank you for reaching out!</p>
            <p className="mt-2 text-white/80">Our team will get back to you shortly.</p>
            <button type="button" onClick={() => setDone(false)} className="btn-accent mt-6">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...register("honeypot")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cb-name" className="sr-only">Full name</label>
                <input id="cb-name" placeholder="*Full Name" maxLength={150} className={field} {...register("name", { required: true })} />
                {errors.name && <p className="ml-2 mt-1 text-xs text-accent-300">Name is required</p>}
              </div>
              <div>
                <label htmlFor="cb-email" className="sr-only">Email address</label>
                <input
                  id="cb-email"
                  type="email"
                  placeholder="*Email Address"
                  className={field}
                  {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                />
                {errors.email && <p className="ml-2 mt-1 text-xs text-accent-300">A valid email is required</p>}
              </div>
              <div>
                <label htmlFor="cb-phone" className="sr-only">Phone number</label>
                <input id="cb-phone" type="tel" placeholder="Phone Number" maxLength={40} className={field} {...register("phone")} />
              </div>
              <div>
                <label htmlFor="cb-subject" className="sr-only">Subject</label>
                <input id="cb-subject" placeholder="Subject" maxLength={200} className={field} {...register("subject")} />
              </div>
            </div>
            <div>
              <label htmlFor="cb-message" className="sr-only">Message</label>
              <textarea
                id="cb-message"
                rows={5}
                placeholder="*Message..."
                className={`${field} resize-none`}
                {...register("message", { required: true })}
              />
              {errors.message && <p className="ml-2 mt-1 text-xs text-accent-300">Message is required</p>}
            </div>
            <ConsentCheckbox register={register} errors={errors} id="cb-consent" tone="dark" />
            {error && <p className="text-sm text-accent-300">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="btn-accent px-8 py-4">
              {isSubmitting ? "Sending..." : "Submit Requirement"} <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
