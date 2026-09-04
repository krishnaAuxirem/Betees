import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, User, Settings, LogOut, Sparkles } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { NAVBAR_LINKS } from "@/constants/data";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user, logout, cartCount, wishlistCount } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const getDashboardPath = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "designer": case "tailor": return "/dashboard/designer";
      case "brand": return "/dashboard/brand";
      case "creator": return "/dashboard/creator";
      case "admin": return "/dashboard/admin";
      default: return "/dashboard/customer";
    }
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-charcoal text-warm-white py-2 px-4 flex items-center justify-center text-center z-50">
        <p className="text-[10px] font-semibold uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-pulse-dot hidden sm:block" />
          Complimentary AI Fitting Session with Every Order • Free Shipping Above ₹2999
          <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-pulse-dot hidden sm:block" />
        </p>
      </div>

      <nav className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.04)] border-b border-outline-variant">
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 bg-charcoal flex items-center justify-center">
                <span className="text-warm-white font-display font-bold text-sm">B</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-display font-semibold text-xl tracking-tight text-charcoal uppercase">Betees</span>
                <span className="text-rose-gold text-lg">✦</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1 h-full">
              {NAVBAR_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wider transition-all duration-200 border-b-2 ${
                    isActive(link.path)
                      ? "text-burgundy border-burgundy"
                      : "text-on-surface-variant hover:text-charcoal border-transparent hover:border-charcoal/30"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search */}
              <div className="relative hidden lg:flex items-center">
                {searchOpen ? (
                  <div className="flex items-center gap-2 animate-fade-in">
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search styles, designers, AI..."
                      className="w-56 bg-surface-low border border-outline-variant text-sm px-3 py-1.5 focus:outline-none focus:border-charcoal transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery) {
                          navigate(`/shop?q=${searchQuery}`);
                          setSearchOpen(false);
                        }
                        if (e.key === "Escape") setSearchOpen(false);
                      }}
                    />
                    <button onClick={() => setSearchOpen(false)} className="text-on-surface-variant hover:text-charcoal">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-on-surface-variant hover:text-charcoal transition-colors"
                  >
                    <Search size={18} />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <Link to={isAuthenticated ? "/dashboard/customer/wishlist" : "/login"} className="relative p-2 text-on-surface-variant hover:text-burgundy transition-colors">
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="notification-dot bg-burgundy text-white">{wishlistCount}</span>
                )}
              </Link>

              {/* Cart */}
              <Link to={isAuthenticated ? "/dashboard/customer/cart" : "/login"} className="relative p-2 text-on-surface-variant hover:text-charcoal transition-colors">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="notification-dot bg-charcoal text-white">{cartCount}</span>
                )}
              </Link>

              {/* Auth */}
              {isAuthenticated && user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-2 border-l border-outline-variant"
                  >
                    <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name[0]
                      )}
                    </div>
                    <div className="hidden md:flex flex-col text-left">
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-on-surface-variant">{user.role}</span>
                      <span className="text-[12px] font-medium text-charcoal -mt-0.5 truncate max-w-[80px]">{user.name.split(" ")[0]}</span>
                    </div>
                    <ChevronDown size={14} className="text-on-surface-variant" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg border border-outline-variant z-50 animate-slide-up">
                      <div className="p-3 border-b border-outline-variant">
                        <p className="text-sm font-semibold text-charcoal">{user.name}</p>
                        <p className="text-xs text-on-surface-variant capitalize">{user.role} Account</p>
                      </div>
                      <div className="py-1">
                        <Link to={getDashboardPath()} onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal hover:bg-surface-low transition-colors">
                          <User size={14} /> Dashboard
                        </Link>
                        <Link to="/dashboard/customer/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal hover:bg-surface-low transition-colors">
                          <Settings size={14} /> Settings
                        </Link>
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut size={14} /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn-primary px-4 py-2 text-xs">
                  Login / Register
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                className="xl:hidden p-2 text-charcoal"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-warm-white border-t border-outline-variant animate-slide-up">
            <div className="section-container py-4 space-y-1">
              {NAVBAR_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive(link.path)
                      ? "text-burgundy bg-secondary-container"
                      : "text-on-surface-variant hover:text-charcoal hover:bg-surface-low"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="pt-3 flex gap-2">
                  <Link to="/login" className="btn-primary flex-1 justify-center py-2.5 text-xs">Login</Link>
                  <Link to="/register" className="btn-outline flex-1 justify-center py-2.5 text-xs">Register</Link>
                </div>
              )}
              <div className="pt-3">
                <div className="flex items-center gap-2 bg-surface-low px-3 py-2">
                  <Search size={16} className="text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search styles, designers..."
                    className="w-full bg-transparent text-sm focus:outline-none"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        navigate(`/shop?q=${(e.target as HTMLInputElement).value}`);
                        setMobileOpen(false);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
