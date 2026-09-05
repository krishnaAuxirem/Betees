import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, Image, Package, Briefcase, CheckSquare,
  MessageCircle, Users, BarChart3, DollarSign, Settings,
  LogOut, ChevronLeft, Menu, X
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const CREATOR_NAV = [
  {
    group: "OVERVIEW",
    items: [
      { label: "Overview", path: "/dashboard/creator", icon: LayoutDashboard },
    ]
  },
  {
    group: "CONTENT",
    items: [
      { label: "Portfolio / Content", path: "/dashboard/creator/content", icon: Image },
    ]
  },
  {
    group: "COLLABORATIONS",
    items: [
      { label: "Custom Requests", path: "/dashboard/creator/requests", icon: Package },
      { label: "Brand Deals", path: "/dashboard/creator/collaborations", icon: Briefcase },
      { label: "Campaigns", path: "/dashboard/creator/campaigns", icon: CheckSquare },
    ]
  },
  {
    group: "COMMUNITY",
    items: [
      { label: "Messages", path: "/dashboard/creator/messages", icon: MessageCircle },
      { label: "Followers & Clients", path: "/dashboard/creator/followers", icon: Users },
    ]
  },
  {
    group: "ANALYTICS & EARNINGS",
    items: [
      { label: "Analytics", path: "/dashboard/creator/analytics", icon: BarChart3 },
      { label: "Earnings", path: "/dashboard/creator/earnings", icon: DollarSign },
    ]
  },
  {
    group: "ACCOUNT",
    items: [
      { label: "Settings", path: "/dashboard/creator/settings", icon: Settings },
    ]
  },
];

interface Props {
  children: React.ReactNode;
}

export const CreatorLayout = ({ children }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const getCurrentTitle = () => {
    for (const group of CREATOR_NAV) {
      const match = group.items.find((item) => item.path === location.pathname);
      if (match) return match.label;
    }
    return "Creator Studio";
  };

  const NavContent = () => (
    <>
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-burgundy flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">B</span>
          </div>
          <span className="font-display text-lg text-white uppercase tracking-wider">Betees</span>
        </div>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-gray-400">
          <X size={16} />
        </button>
      </div>

      {/* User Info */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-white text-sm font-semibold truncate">{user?.name || "Neha Gupta"}</p>
        <p className="text-gray-400 text-xs capitalize">Fashion Creator</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-5 overflow-y-auto no-scrollbar">
        {CREATOR_NAV.map((section) => (
          <div key={section.group}>
            <p className="px-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              {section.group}
            </p>
            {section.items.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-item ${isActive(path) ? "sidebar-item-active" : "sidebar-item-inactive"}`}
              >
                <Icon size={16} />
                <span className="text-sm">{label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-white/10 p-2">
        <Link to="/" className="sidebar-item sidebar-item-inactive">
          <ChevronLeft size={16} />
          <span className="text-sm">Back to Site</span>
        </Link>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="sidebar-item sidebar-item-inactive text-red-400 hover:text-red-300 hover:bg-red-900/20 w-full"
        >
          <LogOut size={16} />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-warm-white overflow-hidden">
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-charcoal flex flex-col shadow-sidebar">
            <NavContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-charcoal shrink-0 shadow-sidebar">
        <NavContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-outline-variant h-14 flex items-center px-4 md:px-6 shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 text-on-surface-variant mr-3 hover:text-charcoal"
          >
            <Menu size={20} />
          </button>
          <h1 className="font-display text-lg text-charcoal">{getCurrentTitle()}</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-xs text-emerald font-semibold">Creator Active</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
