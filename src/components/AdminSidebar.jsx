import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  FileText,
  MessageSquare,
  Settings,
  History,
  UserCircle,
  Users,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";
import { useAdminAuth } from "../context/AdminAuthContext";

// `roles` per link is kept as documentation of which role a section
// conceptually belongs to, but is no longer enforced -- canAccess() below
// always returns true, so every authenticated admin sees every link.
const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/products", label: "Products", icon: Package, roles: ["product_manager"] },
  { to: "/admin/rfqs", label: "RFQs", icon: FileText, roles: ["crm_user"] },
  { to: "/admin/enquiries", label: "Inquiries", icon: MessageSquare, roles: ["crm_user"] },
  { to: "/admin/settings", label: "Site Settings", icon: Settings, roles: ["content_editor"] },
  { to: "/admin/admin-users", label: "Admin Users", icon: Users, roles: [] },
  { to: "/admin/activity-log", label: "Activity Log", icon: History, roles: [] },
  { to: "/admin/profile", label: "Profile", icon: UserCircle },
];

export function canAccess(_role, _allowedRoles) {
  // Role-based restriction is intentionally disabled -- every authenticated
  // admin can see and use every part of the panel, matching the backend's
  // require_role() (core/security.py), which no longer restricts by role
  // either. Kept as a function (not inlined at every call site) so both
  // AdminSidebar's own filter and Dashboard.jsx's shortcut links stay
  // correct from this one place.
  return true;
}

export default function AdminSidebar({ mobileOpen = false, onNavigate }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const visibleLinks = LINKS.filter((l) => canAccess(admin?.role, l.roles));

  return (
    <aside
      className={`${mobileOpen ? "flex" : "hidden"} md:flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white
        fixed md:sticky top-0 left-0 h-screen z-40 md:z-auto`}
    >
      <div className="p-5 border-b border-slate-100 flex justify-center">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {visibleLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-primary-50 text-primary-700 font-semibold" : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full bg-primary-600" />}
                <Icon size={17} className={isActive ? "text-primary-600" : "text-slate-600"} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
            {(admin?.name || "?").charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate">{admin?.name}</p>
            <p className="text-[11px] text-slate-600 truncate">{admin?.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-outline w-full !py-2 text-xs">
          <LogOut size={14} /> Logout
        </button>
        <p className="mt-3 text-center text-[10px] text-slate-400">
          Developed by{" "}
          <a href="https://techsentinals.in/" target="_blank" rel="noopener" className="font-medium text-slate-500 hover:text-primary-600 transition-colors">
            Techsentinals LLP
          </a>
        </p>
      </div>
    </aside>
  );
}
