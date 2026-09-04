import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sparkles, ArrowRight, Star, Users, Package, TrendingUp, ChevronRight, Zap } from "lucide-react";
import { HeroSlider } from "@/components/features/HeroSlider";
import { ProductCard } from "@/components/features/ProductCard";
import { PRODUCTS, CATEGORIES, DESIGNERS, TESTIMONIALS, COMMUNITY_POSTS, AI_STYLE_RESPONSES, QUICK_STYLE_CHIPS, formatINR } from "@/constants/data";
import product2 from "@/assets/product-2.jpg";

export const Home = () => {
  const navigate = useNavigate();
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleChip = (query: string) => {
    setActiveChip(query);
    setIsTyping(true);
    setAiResponse("");
    const response = AI_STYLE_RESPONSES[query] || '"Generating your personalized style curation..."';
    let i = 0;
    const interval = setInterval(() => {
      if (i < response.length) {
        setAiResponse(response.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
  };

  return (
    <div className="animate-fade-in">
      <HeroSlider />

      {/* Quick Style AI Chips */}
      <section className="bg-warm-white border-b border-outline-variant">
        <div className="section-container py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <p className="label-caps text-[10px] text-burgundy mb-2">AI Stylist — Quick Curation</p>
              <h2 className="font-display text-xl md:text-2xl text-charcoal">What are you looking for today?</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {QUICK_STYLE_CHIPS.map((chip) => (
                <button
                  key={chip.query}
                  onClick={() => handleChip(chip.query)}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-sm font-medium transition-all duration-200 ${
                    activeChip === chip.query ? "bg-charcoal text-white border-charcoal" : "bg-white text-charcoal border-outline-color hover:border-charcoal hover:bg-surface-low"
                  }`}
                >
                  <span>{chip.icon}</span>{chip.label}
                </button>
              ))}
            </div>
            {(aiResponse || isTyping) && (
              <div className="mt-6 bg-white border border-outline-variant p-5 animate-slide-up shadow-editorial">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-charcoal rounded-full flex items-center justify-center">
                    <Sparkles size={13} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">Aura AI Stylist</p>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                      <span className="text-[10px] text-emerald font-semibold uppercase tracking-wider">96% Style Fit</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant italic font-display leading-relaxed">
                  {aiResponse}{isTyping && <span className="cursor-blink text-burgundy ml-0.5">|</span>}
                </p>
                {!isTyping && aiResponse && (
                  <div className="flex gap-2 mt-4">
                    <Link to="/ai-stylist" className="btn-primary px-4 py-2 text-xs">Open Full AI Stylist <ArrowRight size={12} /></Link>
                    <Link to="/shop" className="btn-outline px-4 py-2 text-xs">Shop This Look</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="section-container py-14 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="label-caps text-[10px] text-burgundy mb-1">Collections</p>
            <h2 className="heading-lg text-charcoal">Shop by Category</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-burgundy transition-colors uppercase tracking-wide">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative aspect-[4/5] overflow-hidden bg-surface-low">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <p className="text-white font-display text-lg font-medium">{cat.name}</p>
                <p className="text-white/70 text-xs">{cat.count} styles</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Stylist Highlight */}
      <section className="bg-charcoal py-14 md:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10">
                <Sparkles size={14} className="text-rose-gold" />
                <span className="label-caps text-[10px] text-rose-gold">Betees AI Engine v4.2</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white leading-tight">
                Your Personal AI Stylist,<br /><span className="italic text-rose-gold">Available 24/7</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">Aura AI analyzes your body measurements, color palette, calendar events, and personal taste graph to synthesize hyper-personalized outfits — instantly.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎯", label: "Taste Alignment", value: "99.1%" },
                  { icon: "📐", label: "Fit Precision", value: "98.4%" },
                  { icon: "⚡", label: "Style Synthesis", value: "32 sec" },
                  { icon: "🌐", label: "Occasion Modes", value: "50+" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/5 p-3">
                    <div className="text-xl mb-1">{stat.icon}</div>
                    <div className="font-display text-lg font-semibold text-white">{stat.value}</div>
                    <div className="label-caps text-[9px] text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/ai-stylist" className="btn-secondary">Meet Your AI Stylist <Sparkles size={14} /></Link>
            </div>
            <div className="bg-surface-low p-5 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-outline-variant pb-3">
                <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center">
                  <Sparkles size={16} className="text-rose-gold" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal text-sm">Aura AI</p>
                  <p className="label-caps text-[9px] text-on-surface-variant">Senior Haute Couture Stylist</p>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-white px-2 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                  <span className="label-caps text-[9px] text-emerald">96% Style Fit</span>
                </div>
              </div>
              <div className="bg-surface-container p-3">
                <p className="text-sm text-on-surface-variant italic font-display leading-relaxed">"For your sister's evening wedding reception, I recommend a silk burgundy drape blouse with wide gold-border palazzo — the combination harmonizes with your warm autumn skin tone."</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <div key={p.id} className="bg-white p-2 shadow-sm">
                    <div className="aspect-[3/4] bg-surface-low overflow-hidden mb-2">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-on-surface-variant truncate">{p.brand}</p>
                    <p className="text-xs font-medium text-charcoal truncate">{p.name.split(" ").slice(0, 3).join(" ")}</p>
                    <p className="text-[11px] text-burgundy font-semibold">{formatINR(p.price)}</p>
                  </div>
                ))}
              </div>
              <Link to="/ai-stylist" className="block text-center py-2.5 bg-burgundy text-white text-xs font-semibold uppercase tracking-widest hover:bg-charcoal transition-colors">Open Full AI Stylist →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="section-container py-14 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="label-caps text-[10px] text-burgundy mb-1">Curated Runway Capsule</p>
            <h2 className="heading-lg text-charcoal">Trending Now</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-burgundy transition-colors uppercase tracking-wide">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Custom Studio Promo */}
      <section className="bg-surface-low border-t border-b border-outline-variant py-14 md:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 aspect-video lg:aspect-auto lg:h-96 bg-charcoal relative overflow-hidden">
              <img src={product2} alt="Custom Clothing Studio" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 shadow-lg">
                <p className="label-caps text-[9px] text-burgundy">Custom Commission</p>
                <p className="font-display text-sm font-semibold text-charcoal">Starting ₹8,500</p>
                <p className="text-xs text-on-surface-variant">Zero alteration guarantee</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-5">
              <p className="label-caps text-[10px] text-burgundy">Bespoke Atelier</p>
              <h2 className="heading-lg text-charcoal">Design Your Own.<br />Worn Perfectly.</h2>
              <p className="text-on-surface-variant leading-relaxed">Our Custom Clothing Studio lets you engineer garments calibrated to your exact biometric profile. Choose fabric, cut, pattern — guided by AI. Delivered by master tailors.</p>
              <div className="space-y-3">
                {["Select fabric from 500+ premium mills", "Configure every detail — fit, cut, embroidery", "AI previews the look on your avatar", "Master tailor crafts & delivers in 14 days"].map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-burgundy text-white flex items-center justify-center text-xs font-bold shrink-0">{String(i + 1).padStart(2, "0")}</div>
                    <span className="text-sm text-charcoal">{step}</span>
                  </div>
                ))}
              </div>
              <Link to="/custom-studio" className="btn-primary">Start Designing <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Try-On */}
      <section className="section-container py-14 md:py-20">
        <div className="bg-charcoal p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-burgundy/20 rounded-full blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="label-caps text-[10px] text-rose-gold">Neural Physics Engine v4.8</p>
              <h2 className="font-display text-3xl md:text-4xl text-white">Try Before You Buy.<br /><span className="italic text-rose-gold">Virtually.</span></h2>
              <p className="text-gray-400">True-to-scale body mesh reconstruction simulates fabric drape, tension, and movement under dynamic lighting.</p>
              <Link to="/virtual-try-on" className="btn-secondary">Try It Now <Zap size={14} /></Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[{ metric: "98%", label: "Fit Accuracy" }, { metric: "3D", label: "Body Mesh" }, { metric: "0.04mm", label: "Precision" }, { metric: "∞", label: "Outfits" }].map((s) => (
                <div key={s.label} className="bg-white/5 p-4 text-center">
                  <div className="font-display text-2xl font-semibold text-white">{s.metric}</div>
                  <div className="label-caps text-[9px] text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Designers */}
      <section className="bg-surface-low border-t border-outline-variant py-14 md:py-20">
        <div className="section-container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="label-caps text-[10px] text-burgundy mb-1">Guild of Master Craftsmen</p>
              <h2 className="heading-lg text-charcoal">Featured Designers & Tailors</h2>
            </div>
            <Link to="/designers" className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-burgundy transition-colors uppercase tracking-wide">View All <ChevronRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESIGNERS.slice(0, 3).map((designer) => (
              <div key={designer.id} className="bg-white shadow-editorial hover:shadow-card-hover transition-all duration-300 p-5 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 shrink-0">
                    <img src={designer.image} alt={designer.name} className="w-full h-full object-cover" />
                    {designer.verified && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-burgundy rounded-full flex items-center justify-center"><span className="text-white text-[8px]">✓</span></div>}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-charcoal">{designer.name}</h3>
                    <p className="text-xs text-on-surface-variant">{designer.studio}</p>
                    <p className="text-xs text-on-surface-variant">{designer.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} fill="currentColor" className="text-rose-gold" />
                      <span className="text-xs font-semibold text-charcoal">{designer.rating}</span>
                      <span className="text-xs text-on-surface-variant">({designer.reviews})</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{designer.specialty} · {designer.experience}</p>
                <Link to={`/designers/${designer.id}`} className="w-full py-2.5 bg-surface-low text-charcoal text-xs font-semibold uppercase tracking-wider text-center hover:bg-charcoal hover:text-white transition-colors">Book Consultation</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Feed */}
      <section className="section-container py-14 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="label-caps text-[10px] text-burgundy mb-1">Community Runway</p>
            <h2 className="heading-lg text-charcoal">Style Stories</h2>
          </div>
          <Link to="/community" className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-burgundy transition-colors uppercase tracking-wide">View Community <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {COMMUNITY_POSTS.map((post) => (
            <div key={post.id} className="group relative aspect-[4/5] overflow-hidden bg-surface-low cursor-pointer">
              <img src={post.image} alt={post.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <p className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">{post.handle}</p>
                <p className="text-white text-xs font-medium leading-tight mt-1 line-clamp-2">{post.caption}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/60 text-[10px]">❤️ {post.likes}</span>
                  <button className="px-2 py-1 bg-white text-charcoal text-[9px] font-bold uppercase">Shop Look</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-surface-low border-t border-outline-variant py-14 md:py-20">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="label-caps text-[10px] text-burgundy mb-2">Verified Client Reviews</p>
            <h2 className="heading-lg text-charcoal">Loved by Fashion Connoisseurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-6 shadow-editorial">
                <div className="flex items-center gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={13} fill="currentColor" className="text-rose-gold" />)}
                </div>
                <p className="text-sm text-on-surface-variant italic font-display leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 object-cover rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                    <p className="text-xs text-on-surface-variant">{t.location} · {t.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="section-container py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Users, value: "2.4M+", label: "Verified Members", color: "text-burgundy" },
            { icon: Package, value: "50K+", label: "Curated Products", color: "text-rose-gold" },
            { icon: TrendingUp, value: "₹850Cr+", label: "Fashion Transacted", color: "text-charcoal" },
            { icon: Star, value: "4.95★", label: "Average Rating", color: "text-emerald" },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="text-center">
              <Icon size={24} className={`${color} mx-auto mb-3`} />
              <div className="font-display text-3xl font-semibold text-charcoal">{value}</div>
              <div className="label-caps text-[10px] text-on-surface-variant mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-charcoal py-14 md:py-20">
        <div className="section-container text-center max-w-2xl mx-auto space-y-6">
          <p className="label-caps text-[10px] text-rose-gold">Invitation Only</p>
          <h2 className="font-display text-3xl md:text-4xl text-white">Ascend to the Betees<br /><span className="italic text-rose-gold">Atelier Circle</span></h2>
          <p className="text-gray-400">Get access to unreleased collections, private AI fitting sessions, and exclusive offers — before anyone else.</p>
          <Link to="/register" className="btn-secondary text-sm">Join Betees Free <ArrowRight size={14} /></Link>
        </div>
      </section>
    </div>
  );
};
