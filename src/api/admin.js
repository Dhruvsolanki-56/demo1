import api, { downloadFile } from "./client";

// Auth
export const login = (email, password) => api.post("/api/auth/login", { email, password }).then((r) => r.data);
export const getMe = () => api.get("/api/auth/me").then((r) => r.data);
export const changePassword = (payload) => api.post("/api/auth/change-password", payload).then((r) => r.data);
export const forgotPassword = (email) => api.post("/api/auth/forgot-password", { email }).then((r) => r.data);
export const verifyResetOtp = (payload) => api.post("/api/auth/verify-reset-otp", payload).then((r) => r.data);
export const resetPassword = (payload) => api.post("/api/auth/reset-password", payload).then((r) => r.data);

// Dashboard
export const getDashboard = () => api.get("/api/admin/dashboard").then((r) => r.data);

// Analytics
export const getAnalytics = (days) => api.get("/api/admin/analytics", { params: { days } }).then((r) => r.data);

// Products
export const listProductsAdmin = (params) => api.get("/api/admin/products", { params }).then((r) => r.data);
export const getProductAdmin = (id) => api.get(`/api/admin/products/${id}`).then((r) => r.data);
export const createProduct = (payload) => api.post("/api/admin/products", payload).then((r) => r.data);
export const updateProduct = (id, payload) => api.put(`/api/admin/products/${id}`, payload).then((r) => r.data);
export const deleteProduct = (id) => api.delete(`/api/admin/products/${id}`).then((r) => r.data);
export const bulkDeleteProducts = (ids) => api.post("/api/admin/products/bulk-delete", { ids }).then((r) => r.data);
export const addProductImage = (id, image_url, is_primary = false) =>
  api.post(`/api/admin/products/${id}/images`, null, { params: { image_url, is_primary } }).then((r) => r.data);
export const deleteProductImage = (id, imageId) => api.delete(`/api/admin/products/${id}/images/${imageId}`).then((r) => r.data);
export const setPrimaryProductImage = (id, imageId) => api.patch(`/api/admin/products/${id}/images/${imageId}/primary`).then((r) => r.data);
export const addProductDocument = (id, title, file_url, doc_type) =>
  api.post(`/api/admin/products/${id}/documents`, null, { params: { title, file_url, doc_type } }).then((r) => r.data);
export const deleteProductDocument = (id, docId) => api.delete(`/api/admin/products/${id}/documents/${docId}`).then((r) => r.data);
export const setProductVariants = (id, variants) => api.put(`/api/admin/products/${id}/variants`, variants).then((r) => r.data);
export const getProductFilterOptionsAdmin = () => api.get("/api/admin/products/filters/options").then((r) => r.data);
export const getProductConstantsAdmin = () => api.get("/api/admin/products/constants").then((r) => r.data);
export const exportProducts = (params) => downloadFile("/api/admin/products/export", params, "products.csv");

// Admin Users (superadmin only)
export const listAdminUsers = () => api.get("/api/admin/admin-users").then((r) => r.data);
export const listAdminRoles = () => api.get("/api/admin/admin-users/roles").then((r) => r.data);
export const createAdminUser = (payload) => api.post("/api/admin/admin-users", payload).then((r) => r.data);
export const updateAdminUser = (id, payload) => api.put(`/api/admin/admin-users/${id}`, payload).then((r) => r.data);
export const deleteAdminUser = (id) => api.delete(`/api/admin/admin-users/${id}`).then((r) => r.data);

// Uploads
export const uploadImage = (file, folder = "products") => {
  const form = new FormData();
  form.append("file", file);
  return api.post("/api/admin/uploads/image", form, { params: { folder } }).then((r) => r.data);
};
export const uploadDocument = (file, folder = "documents") => {
  const form = new FormData();
  form.append("file", file);
  return api.post("/api/admin/uploads/document", form, { params: { folder } }).then((r) => r.data);
};

// RFQs
export const listRfqs = (params) => api.get("/api/admin/rfqs", { params }).then((r) => r.data);
export const getRfq = (id) => api.get(`/api/admin/rfqs/${id}`).then((r) => r.data);
export const getRfqStatuses = () => api.get("/api/admin/rfqs/statuses").then((r) => r.data);
export const updateRfqStatus = (id, payload) => api.patch(`/api/admin/rfqs/${id}/status`, payload).then((r) => r.data);
export const bulkUpdateRfqStatus = (payload) => api.patch("/api/admin/rfqs/bulk-status", payload).then((r) => r.data);
export const exportRfqs = (params) => downloadFile("/api/admin/rfqs/export", params, "rfqs.csv");

// Contacts
export const listContacts = (params) => api.get("/api/admin/contacts", { params }).then((r) => r.data);
export const getContact = (id) => api.get(`/api/admin/contacts/${id}`).then((r) => r.data);
export const getContactStatuses = () => api.get("/api/admin/contacts/statuses").then((r) => r.data);
export const getInquiryTypes = () => api.get("/api/admin/contacts/types").then((r) => r.data);
export const updateContactStatus = (id, payload) => api.patch(`/api/admin/contacts/${id}/status`, payload).then((r) => r.data);
export const bulkUpdateContactStatus = (payload) => api.patch("/api/admin/contacts/bulk-status", payload).then((r) => r.data);
export const exportContacts = (params) => downloadFile("/api/admin/contacts/export", params, "enquiries.csv");

// Settings (contact details only -- everything else is static site content)
export const getSettingsAdmin = () => api.get("/api/admin/settings").then((r) => r.data);
export const updateSettings = (payload) => api.put("/api/admin/settings", payload).then((r) => r.data);

// Activity log
export const listActivity = (params) => api.get("/api/admin/activity-log", { params }).then((r) => r.data);
