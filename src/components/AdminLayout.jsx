import React, { Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import Logo from "./Logo";
import PageLoader from "./PageLoader";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar mobileOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sticky top-0 z-20">
          <Logo />
          <button onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle admin menu" className="text-slate-600">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <main className="p-5 sm:p-8">
          {/* No key={pathname} remount trick here -- that forced every admin
              page to fully unmount/remount on each navigation (for a fade-in
              effect), which meant every data-fetching useEffect on that page
              re-ran from scratch on every click, not just on an actual first
              load. Each admin page already mounts fresh when its route
              component changes; forcing it again bought a subtle animation
              at the cost of real, avoidable duplicate API calls. */}
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
