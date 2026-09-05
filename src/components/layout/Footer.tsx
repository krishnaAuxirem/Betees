import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react";
import { toast } from "sonner";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Welcome to the Betees Atelier Circle!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-charcoal text-warm-white">
      {/* Main Footer */}
      <div className="section-container pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-burgundy flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">B</span>
              </div>
              <span className="font-display font-semibold text-xl tracking-tight uppercase">Betees</span>
              <span className="text-rose-gold text-lg">✦</span>
            </div>
            <p className="font-display text-lg text-warm-white leading-snug">Your style. Your fit. Your fashion.</p>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              India's first AI-powered luxury fashion ecosystem. Discover algorithmic curation, virtual fitting, and bespoke tailoring.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-gray-700 flex items-center justify-center text-gray-400 hover:border-rose-gold hover:text-rose-gold transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="label-caps text-[10px] text-gray-400 mb-4">Company</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "About Us", path: "/about" },
                  { label: "Careers", path: "/about" },
                  { label: "Contact", path: "/contact" },
                  { label: "Blog", path: "/blog" },
                  { label: "Press", path: "/about" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors editorial-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-caps text-[10px] text-gray-400 mb-4">Shop</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Men", path: "/shop?category=men" },
                  { label: "Women", path: "/shop?category=women" },
                  { label: "Ethnic Wear", path: "/shop?category=ethnic" },
                  { label: "New Arrivals", path: "/shop?filter=new" },
                  { label: "Trending", path: "/trends" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors editorial-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="label-caps text-[10px] text-gray-400 mb-4">Services</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "AI Stylist", path: "/ai-stylist" },
                  { label: "Custom Clothing", path: "/custom-studio" },
                  { label: "Virtual Try-On", path: "/virtual-try-on" },
                  { label: "Designers", path: "/designers" },
                  { label: "Tailors", path: "/tailors" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors editorial-underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="label-caps text-[10px] text-gray-400">Atelier Circle</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Join Betees Atelier Circle for private collection drops, exclusive offers, and style intelligence.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-white/10 border border-gray-700 text-white placeholder:text-gray-500 px-3 py-2.5 text-sm focus:outline-none focus:border-rose-gold transition-colors"
                />
                <button type="submit" className="bg-burgundy text-white px-4 hover:bg-rose-gold transition-colors flex items-center justify-center">
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[11px] text-gray-500">By subscribing, you agree to our Privacy Policy.</p>
            </form>

            {/* Support links */}
            <div className="pt-2 space-y-2">
              <h4 className="label-caps text-[10px] text-gray-400">Support</h4>
              {[
                { label: "FAQ", path: "/faq" },
                { label: "Track Order", path: "/dashboard/customer/orders" },
                { label: "Help Center", path: "/contact" },
              ].map((link) => (
                <Link key={link.label} to={link.path} className="block text-sm text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 Betees Inc. AI-Powered Fashion Ecosystem. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Terms & Conditions", path: "/terms" },
              { label: "Cookie Policy", path: "/privacy-policy" },
            ].map((link) => (
              <Link key={link.label} to={link.path} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
