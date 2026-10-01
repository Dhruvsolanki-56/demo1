/**
 * Minimal GA4 analytics wrapper. Graceful no-op until VITE_GA_MEASUREMENT_ID
 * is set (same pattern as email/WhatsApp on the backend — the feature works
 * fully without credentials, it just skips the actual send). Once a real
 * measurement ID is added to frontend/.env, every call below starts firing
 * real events with zero code changes needed elsewhere.
 *
 * Event names/params follow the client's Functional Spec Table 21 tracking
 * requirements: product search, filter use, product view, add-to-inquiry,
 * CTA click, form submission, download click, video engagement.
 */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

export function initAnalytics() {
  if (!GA_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

export function trackPageView(path) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", { page_path: path });
}

export function trackEvent(name, params = {}) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

// Convenience helpers matching the spec's named events exactly.
export const trackProductSearch = (query, filters, resultCount) =>
  trackEvent("product_search", { search_term: query, filters: JSON.stringify(filters), result_count: resultCount });

export const trackFilterUse = (filterType, value) =>
  trackEvent("filter_use", { filter_type: filterType, filter_value: value });

export const trackProductView = (product) =>
  trackEvent("product_view", { product_id: product.id, product_name: product.name, therapeutic_area: product.therapeutic_segment });

export const trackAddToInquiryList = (productId, listCount) =>
  trackEvent("add_to_inquiry_list", { product_id: productId, list_count: listCount });

export const trackCtaClick = (label, pageUrl, productId) =>
  trackEvent("cta_click", { cta_label: label, page_url: pageUrl, product_id: productId });

export const trackFormSubmission = (inquiryType, country, productCount) =>
  trackEvent("form_submission", { inquiry_type: inquiryType, country, product_count: productCount });

export const trackDownloadClick = (documentName, pageSource) =>
  trackEvent("download_click", { document_name: documentName, page_source: pageSource });

export const trackVideoEngagement = (videoTitle, action) =>
  trackEvent("video_engagement", { video_title: videoTitle, action });
