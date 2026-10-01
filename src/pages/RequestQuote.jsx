import React, { useRef, useState } from "react";
import ProductVisual, { isPlaceholderImage } from "../components/ProductVisual";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Trash2, Search, CheckCircle2, MessageCircle, ClipboardList } from "lucide-react";
import { useQuoteCart } from "../context/QuoteCartContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { getProducts, submitRfq } from "../api/public";
import { fileUrl } from "../api/client";
import SEO from "../components/SEO";
import PageHeader from "../components/PageHeader";
import CreatableCombobox from "../components/CreatableCombobox";
import ConsentCheckbox from "../components/ConsentCheckbox";
import PhoneField from "../components/PhoneField";
import { COUNTRIES } from "../data/countries";
import { trackFormSubmission } from "../lib/siteMetrics";


export default function RequestQuote() {
  const { items, updateQuantity, updateNotes, removeItem, clearCart } = useQuoteCart();
  const { settings } = useSiteSettings();
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { addItem, isInCart } = useQuoteCart();
  const searchTimer = useRef(null);
  const searchSeq = useRef(0);

  // Debounced (300ms) so typing a whole product name doesn't fire one request
  // per keystroke; searchSeq guards against an older, slower response landing
  // after a newer one and clobbering the results with stale data.
  const runSearch = (val) => {
    setSearch(val);
    clearTimeout(searchTimer.current);
    if (val.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    searchTimer.current = setTimeout(async () => {
      const seq = ++searchSeq.current;
      const res = await getProducts({ q: val, page_size: 5 });
      if (seq === searchSeq.current) setSearchResults(res.items);
    }, 300);
  };

  const onSubmit = async (data) => {
    setError("");
    if (items.length === 0) {
      setError("Please add at least one product to your quote list.");
      return;
    }
    try {
      const payload = {
        ...data,
        items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity || "1", notes: i.notes || undefined })),
      };
      const res = await submitRfq(payload);
      setResult(res);
      trackFormSubmission("rfq", data.country, items.length);
      clearCart();
      reset();
    } catch (e) {
      setError(e?.response?.data?.detail || "Something went wrong. Please try again.");
    }
  };

  const whatsappNumber = (settings.whatsapp || "").replace(/[^\d+]/g, "").replace("+", "");

  if (result) {
    return (
      <section className="section container-page max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full">
          <CheckCircle2 className="text-accent-500" size={44} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mt-5">Quote Request Submitted!</h1>
        <p className="text-slate-600 mt-2">{result.message}</p>
        <div className="card p-4 mt-6 inline-block">
          <p className="text-xs text-slate-600 uppercase tracking-wide">Reference Number</p>
          <p className="text-lg font-bold text-primary-700">{result.reference_number}</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/products" className="btn-outline">Continue Browsing</Link>
          {whatsappNumber && (
            <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I just submitted RFQ ${result.reference_number}.`)}`} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          )}
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO title="Request a Quote" canonicalPath="/request-quote" />
      <PageHeader eyebrow="RFQ" title="Request a Quote" />

      <section className="section">
        <div className="container-page grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-primary-900 flex items-center gap-2">
                  <ClipboardList size={18} className="text-primary-600" /> Selected Products
                </h2>
                {items.length > 0 && <span className="badge bg-primary-50 text-primary-700">{items.length} item{items.length > 1 ? "s" : ""}</span>}
              </div>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <label htmlFor="rq-search" className="sr-only">Search and add another product</label>
                <input
                  id="rq-search"
                  className="input pl-9"
                  placeholder="Search and add another product..."
                  value={search}
                  onChange={(e) => runSearch(e.target.value)}
                />
                {searchResults.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">
                    {searchResults.map((p) => {
                      const img = p.images?.find((i) => i.is_primary) || p.images?.[0];
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => { addItem(p, "1"); setSearch(""); setSearchResults([]); }}
                          disabled={isInCart(p.id)}
                          className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50 text-left"
                        >
                          {isPlaceholderImage(img?.image_url) ? (
                            <span className="h-9 w-9 shrink-0 overflow-hidden rounded-md border border-slate-100">
                              <ProductVisual dosageForm={p.dosage_form} seed={p.sku || p.slug || ""} label="" />
                            </span>
                          ) : (
                            <img src={fileUrl(img.image_url)} alt="" className="h-9 w-9 rounded-md object-cover shrink-0 border border-slate-100" />
                          )}
                          <span className="flex-1 min-w-0">
                            <span className="block font-medium text-slate-700 truncate">{p.name}</span>
                            {p.composition && <span className="block text-xs text-slate-600 truncate">{p.composition}</span>}
                          </span>
                          <span className="text-xs font-semibold text-primary-600 shrink-0">{isInCart(p.id) ? "Added" : "Add"}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-10 text-slate-600">
                  <p>Your quote list is empty.</p>
                  <Link to="/products" className="btn-primary btn-pill mt-4 inline-flex">Browse Products</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product_id} className="flex flex-col sm:flex-row sm:items-center gap-3 border border-slate-200 rounded-lg p-3">
                      {isPlaceholderImage(item.image_url) ? (
                        <span className="h-12 w-12 shrink-0 self-start overflow-hidden rounded-md border border-slate-100">
                          <ProductVisual dosageForm={item.dosage_form} seed={item.slug || ""} label="" />
                        </span>
                      ) : (
                        <img src={fileUrl(item.image_url)} alt="" className="h-12 w-12 rounded-md object-cover shrink-0 border border-slate-100 self-start" />
                      )}
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${item.slug}`} className="font-semibold text-slate-700 hover:text-primary-700">{item.name}</Link>
                        {item.composition && <p className="text-xs text-slate-600 truncate">{item.composition}</p>}
                      </div>
                      <label htmlFor={`qty-${item.product_id}`} className="sr-only">Quantity for {item.name}</label>
                      <input
                        id={`qty-${item.product_id}`}
                        className="input sm:w-32"
                        placeholder="Quantity"
                        maxLength={100}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product_id, e.target.value)}
                      />
                      <label htmlFor={`notes-${item.product_id}`} className="sr-only">Notes for {item.name}</label>
                      <input
                        id={`notes-${item.product_id}`}
                        className="input sm:w-48"
                        placeholder="Notes (optional)"
                        maxLength={300}
                        value={item.notes}
                        onChange={(e) => updateNotes(item.product_id, e.target.value)}
                      />
                      <button onClick={() => removeItem(item.product_id)} className="icon-btn hover:text-red-600 shrink-0" aria-label={`Remove ${item.name}`}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4 lg:sticky lg:top-24">
              <h2 className="font-bold text-primary-900">Your Details</h2>
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("honeypot")} className="hidden" />

              <div>
                <label className="label" htmlFor="rq-name">Name *</label>
                <input id="rq-name" className="input" {...register("name", { required: true })} />
                {errors.name && <p className="text-xs text-red-500 mt-1">Name is required</p>}
              </div>
              <div>
                <label className="label" htmlFor="rq-company">Company / Organization</label>
                <input id="rq-company" className="input" {...register("company")} />
              </div>
              <div>
                <label className="label" htmlFor="rq-email">Email *</label>
                <input id="rq-email" type="email" className="input" {...register("email", { required: true })} />
                {errors.email && <p className="text-xs text-red-500 mt-1">Valid email is required</p>}
              </div>
              <PhoneField name="phone" control={control} label="Mobile / WhatsApp Number" required error={errors.phone} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CreatableCombobox label="Country" value={field.value} onChange={field.onChange} options={COUNTRIES} placeholder="Select..." />
                  )}
                />
                <div>
                  <label className="label" htmlFor="rq-state">State / City</label>
                  <input id="rq-state" className="input" {...register("state_city")} />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="rq-contact-method">Preferred Contact Method</label>
                <select id="rq-contact-method" className="input" {...register("preferred_contact_method")}>
                  <option value="">No preference</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="rq-message">Message / Requirements</label>
                <textarea id="rq-message" rows={4} className="input" {...register("message")} />
              </div>

              <ConsentCheckbox register={register} errors={errors} id="rq-consent" />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button type="submit" disabled={isSubmitting} className="btn-accent btn-pill w-full justify-center">
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
