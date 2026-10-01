import api from "./client";
import {
  SAMPLE_FILTER_OPTIONS,
  querySampleProducts,
  findSampleProduct,
  relatedSampleProducts,
} from "../data/sampleProducts";

// With no backend behind the site (a static preview), fall back to the demo
// catalogue so the product pages still show how they work. Any real answer
// from the API, including an empty list, is always used as-is.
const unreachable = (e) => !e?.response || e.response.status >= 500;

export const getSettings = () => api.get("/api/settings").then((r) => r.data);

export const getProducts = (params) =>
  api
    .get("/api/products", { params })
    .then((r) => r.data)
    .catch((e) => {
      if (unreachable(e)) return { ...querySampleProducts(params), sample: true };
      throw e;
    });
export const getProduct = (slug) =>
  api
    .get(`/api/products/${slug}`)
    .then((r) => r.data)
    .catch((e) => {
      const sample = findSampleProduct(slug);
      if (sample) return sample;
      throw e;
    });
export const getRelatedProducts = (slug) =>
  api
    .get(`/api/products/${slug}/related`)
    .then((r) => r.data)
    .catch((e) => {
      if (findSampleProduct(slug)) return relatedSampleProducts(slug);
      throw e;
    });
export const getFilterOptions = () =>
  api
    .get("/api/products/filters/options")
    .then((r) => r.data)
    .catch((e) => {
      if (unreachable(e)) return SAMPLE_FILTER_OPTIONS;
      throw e;
    });
export const getProductConstants = () => api.get("/api/products/constants").then((r) => r.data);

export const submitRfq = (payload) => api.post("/api/rfq", payload).then((r) => r.data);
export const trackRfq = (reference) => api.get(`/api/rfq/track/${reference}`).then((r) => r.data);
export const submitContact = (payload) => api.post("/api/contact", payload).then((r) => r.data);
export const getInquiryTypes = () => api.get("/api/contact/types").then((r) => r.data);
