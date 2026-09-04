import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Heart, Package, Sparkles, Settings, LogOut, Ruler, Monitor, Shirt, Users, Bell, Tag, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const CUSTOMER_NAV = [
  { group: "OVERVIEW", items: [{ label: "Dashboard", path: "/dashboard/customer", icon: LayoutDashboard }] },
  { group: "SHOPPING", items: [
    { label: "Marketplace", path: "/dashboard/customer/marketplace", icon: ShoppingBag },
    { label: "Wishlist", path: "/dashboard/customer/wishlist", icon: Heart },
    { label: "Cart & Checkout", path: "/dashboard/customer/cart", icon: ShoppingBag },
    { label: "Orders", path: "/dashboard/customer/orders", icon: Package },
  ]},
  { group: "AI FEATURES", items: [
    { label: "AI Stylist", path: "/ai-stylist", icon: Sparkles },
    { label: "Virtual Try-On", path: "/virtual-try-on", icon: Monitor },
    { label: "Size Assistant", path: "/dashboard/customer/size-assistant", icon: Ruler },
    { label: "Digital Wardrobe", path: "/dashboard/customer/wardrobe", icon: Shirt },
  ]},
  { group: "COMMUNITY", items: [
    { label: "Community Feed", path: "/community", icon: Users },
    { label: "Notifications", path: "/dashboard/customer/notifications", icon: Bell },
    { label: "Offers & Loyalty", path: "/dashboard/customer/offers", icon: Tag },
  ]},
  { group: "ACCOUNT", items: [{ label: "Settings", path: "/dashboard/customer/settings", icon: Settings }] },
];

interface Props { children: React.ReactNode }

export const CustomerLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };
  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 bg-burgundy flex items-center justify-center shrink-0">
          <span className="text-white font-display font-bold text-sm">B</span>
        </div>
        {!collapsed && <span className="font-display text-lg text-white uppercase tracking-tight">Betees</span>}
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-burgundy flex items-center justify-center text-white font-bold shrink-0">
              {user?.name?.[0] || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5 no-scrollbar">
        {CUSTOMER_NAV.map((section) => (
          <div key={section.group}>
            {!collapsed && <p className="px-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">{section.group}</p>}
            {section.items.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`sidebar-item ${isActive(path) ? "sidebar-item-active" : "sidebar-item-inactive"} ${collapsed ? "justify-center px-2" : ""}`}
                title={collapsed ? label : ""}
              >
                <Icon size={16} className="shrink-0" />
                {!collapsed && <span className="text-sm">{label}</span>}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-2">
        <Link to="/" className={`sidebar-item sidebar-item-inactive ${collapsed ? "justify-center" : ""}`} title={collapsed ? "Back to Site" : ""}>
          <ChevronLeft size={16} />
          {!collapsed && <span className="text-sm">Back to Site</span>}
        </Link>
        <button onClick={handleLogout} className={`sidebar-item sidebar-item-inactive text-red-400 hover:text-red-300 hover:bg-red-900/20 w-full ${collapsed ? "justify-center" : ""}`}>
          <LogOut size={16} />
          {!collapsed && <span className="text-sm">Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-warm-white overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-charcoal transition-all duration-300 ${collapsed ? "w-16" : "w-56"} shrink-0 relative shadow-sidebar`}>
        <button onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-20 w-6 h-6 bg-charcoal border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white z-10">
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-charcoal flex flex-col shadow-sidebar"><SidebarContent /></div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-outline-variant h-14 flex items-center px-4 md:px-6 gap-4 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1.5 text-on-surface-variant hover:text-charcoal">
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <Link to="/shop" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-charcoal uppercase tracking-wide">
            <ShoppingBag size={14} /> Shop
          </Link>
          <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0] || "U"}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
