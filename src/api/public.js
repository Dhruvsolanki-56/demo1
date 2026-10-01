import api from "./client";

export const getSettings = () => api.get("/api/settings").then((r) => r.data);

export const getProducts = (params) => api.get("/api/products", { params }).then((r) => r.data);
export const getProduct = (slug) => api.get(`/api/products/${slug}`).then((r) => r.data);
export const getRelatedProducts = (slug) => api.get(`/api/products/${slug}/related`).then((r) => r.data);
export const getFilterOptions = () => api.get("/api/products/filters/options").then((r) => r.data);
export const getProductConstants = () => api.get("/api/products/constants").then((r) => r.data);

export const submitRfq = (payload) => api.post("/api/rfq", payload).then((r) => r.data);
export const trackRfq = (reference) => api.get(`/api/rfq/track/${reference}`).then((r) => r.data);
export const submitContact = (payload) => api.post("/api/contact", payload).then((r) => r.data);
export const getInquiryTypes = () => api.get("/api/contact/types").then((r) => r.data);
