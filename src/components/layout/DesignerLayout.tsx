import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, Package, Users, ShoppingBag, BarChart3, Settings, LogOut, ChevronLeft, Star, MessageCircle, DollarSign, Upload, Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const DESIGNER_NAV = [
  { group: "OVERVIEW", items: [{ label: "Dashboard", path: "/dashboard/designer", icon: LayoutDashboard }] },
  { group: "BUSINESS", items: [
    { label: "Portfolio", path: "/dashboard/designer/portfolio", icon: Upload },
    { label: "Custom Requests", path: "/dashboard/designer/requests", icon: Package },
    { label: "Orders", path: "/dashboard/designer/orders", icon: ShoppingBag },
    { label: "Messages", path: "/dashboard/designer/messages", icon: MessageCircle },
    { label: "Customers", path: "/dashboard/designer/customers", icon: Users },
  ]},
  { group: "ANALYTICS", items: [
    { label: "Reviews", path: "/dashboard/designer/reviews", icon: Star },
    { label: "Earnings", path: "/dashboard/designer/earnings", icon: DollarSign },
    { label: "Analytics", path: "/dashboard/designer/analytics", icon: BarChart3 },
  ]},
  { group: "ACCOUNT", items: [{ label: "Settings", path: "/dashboard/designer/settings", icon: Settings }] },
];

interface Props { children: React.ReactNode }

export const DesignerLayout = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const NavContent = () => (
    <>
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-burgundy flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">B</span>
          </div>
          <span className="font-display text-lg text-white uppercase">Betees</span>
        </div>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-400"><X size={16} /></button>
      </div>
      {user && (
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-white text-sm font-semibold">{user.name}</p>
          <p className="text-gray-400 text-xs capitalize">{user.role}</p>
        </div>
      )}
      <nav className="flex-1 py-4 space-y-5 overflow-y-auto no-scrollbar">
        {DESIGNER_NAV.map((section) => (
          <div key={section.group}>
            <p className="px-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">{section.group}</p>
            {section.items.map(({ label, path, icon: Icon }) => (
              <Link key={path} to={path} onClick={() => setMobileOpen(false)} className={`sidebar-item ${isActive(path) ? "sidebar-item-active" : "sidebar-item-inactive"}`}>
                <Icon size={16} /><span className="text-sm">{label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-2">
        <Link to="/" className="sidebar-item sidebar-item-inactive"><ChevronLeft size={16} /><span className="text-sm">Back to Site</span></Link>
        <button onClick={() => { logout(); navigate("/"); }} className="sidebar-item sidebar-item-inactive text-red-400 w-full"><LogOut size={16} /><span className="text-sm">Log Out</span></button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-warm-white overflow-hidden">
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-charcoal flex flex-col shadow-sidebar"><NavContent /></div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}
      <aside className="hidden lg:flex flex-col w-56 bg-charcoal shrink-0 shadow-sidebar"><NavContent /></aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-outline-variant h-14 flex items-center px-4 md:px-6">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1.5 text-on-surface-variant mr-3"><Menu size={20} /></button>
          <h1 className="font-display text-lg text-charcoal">Designer Studio</h1>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
