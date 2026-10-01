import axios from "axios";

// Empty by default -- every request then goes to a same-origin relative path
// ("/api/...") rather than an absolute cross-origin URL. In local dev, Vite's
// own dev-server proxy (vite.config.js) forwards those paths to the backend
// on :8000; in production, nginx does the same on the live domain. Either
// way the browser only ever talks to one origin, so it never needs to send a
// CORS preflight OPTIONS request ahead of the real one -- that preflight
// only happens for requests the browser considers cross-origin, and an
// explicit absolute VITE_API_BASE_URL (e.g. "http://localhost:8000" while the
// page itself is served from "http://localhost:5173") is exactly what used to
// make every POST/PUT/PATCH/DELETE trigger one. Only override this env var if
// the API is genuinely served from a different origin than the frontend.
const baseURL = import.meta.env.VITE_API_BASE_URL || "";

export const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("striker_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function fileUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${baseURL}${path}`;
}

export async function downloadFile(url, params, fallbackFilename) {
  const response = await api.get(url, { params, responseType: "blob" });
  const disposition = response.headers["content-disposition"] || "";
  const match = disposition.match(/filename="?([^"]+)"?/);
  // Belt-and-suspenders: even with Content-Disposition now exposed via CORS,
  // fall back to a name whose extension matches the actually-requested
  // format (params.format) rather than a single hardcoded ".csv" used for
  // every export regardless of what was asked for.
  const fallbackExt = params?.format === "xlsx" ? "xlsx" : "csv";
  const safeFallback = fallbackFilename.replace(/\.\w+$/, `.${fallbackExt}`);
  const filename = match ? match[1] : safeFallback;

  const blobUrl = window.URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}

export default api;
