import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { QuoteCartProvider } from "./context/QuoteCartContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import { SiteSettingsProvider } from "./context/SiteSettingsContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { initAnalytics } from "./lib/siteMetrics";
import "./index.css";

initAnalytics();

// The browser's own scroll restoration (on by default) races with -- and
// sometimes wins over -- PublicLayout's ScrollToTop on Back/Forward
// navigation: it tries to restore whatever scroll position that history
// entry had, landing on some arbitrary partial value instead of either the
// old position or a clean reset to top. "Manual" hands scroll position
// entirely to our own app code, which already resets it correctly on every
// route change (ScrollToTop) -- this just stops the browser from also
// fighting over it. Set once, before the router mounts.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// No React.StrictMode wrapper: its dev-only double-invoke of every effect on
// mount (by design, to surface missing-cleanup bugs) meant every page's data
// fetch fired twice in the dev server's network tab -- indistinguishable from
// a real duplicate-call bug unless you already know to expect it. It never
// affected the production build either way (StrictMode is a no-op there).
// Combined with a genuine bug just fixed in AdminLayout (a key={pathname}
// remount trick that forced admin pages to fully remount, and therefore
// re-fetch, on every navigation), this is what was actually being observed.
ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <ToastProvider>
        <AdminAuthProvider>
          <SiteSettingsProvider>
            <QuoteCartProvider>
              <App />
            </QuoteCartProvider>
          </SiteSettingsProvider>
        </AdminAuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </HelmetProvider>
);
