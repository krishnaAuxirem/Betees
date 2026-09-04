import { Link } from "react-router-dom";
import { TrendingUp, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { PRODUCTS, formatINR } from "@/constants/data";
import { ProductCard } from "@/components/features/ProductCard";

const TRENDS = [
  { id: "1", name: "Power Suiting", count: 2840, growth: "+38%", image: PRODUCTS[1].image, desc: "Structured blazers and tailored trousers dominating boardrooms and runways alike." },
  { id: "2", name: "Ethnic Revival", count: 1920, growth: "+52%", image: PRODUCTS[2].image, desc: "Contemporary Indian silhouettes — modern cuts fused with traditional fabrics." },
  { id: "3", name: "Sustainable Luxury", count: 1540, growth: "+67%", image: PRODUCTS[3].image, desc: "Zero-waste algorithmic loom fabrics and ethically sourced natural materials." },
  { id: "4", name: "Quiet Minimalism", count: 3210, growth: "+24%", image: PRODUCTS[4].image, desc: "Clean lines, premium fabrics, zero embellishment — letting material speak." },
];

export const Trends = () => (
  <div className="animate-fade-in">
    <div className="bg-charcoal py-14">
      <div className="section-container">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={20} className="text-rose-gold" />
          <p className="label-caps text-[10px] text-rose-gold">Real-Time Intelligence</p>
        </div>
        <h1 className="font-display text-4xl text-white mb-3">Fashion Trend Intelligence</h1>
        <p className="text-gray-400 max-w-xl">AI-powered trend forecasting based on runway data, community behavior, and global fashion signals.</p>
      </div>
    </div>

    <div className="section-container py-12 space-y-12">
      {/* Hero Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TRENDS.map((t) => (
          <div key={t.id} className="group relative overflow-hidden bg-surface-low cursor-pointer">
            <div className="aspect-video overflow-hidden">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 to-transparent" />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald label-caps text-[10px] font-bold">{t.growth} this month</span>
                <span className="text-white/50">·</span>
                <span className="text-white/70 text-xs">{t.count.toLocaleString()} looks</span>
              </div>
              <h2 className="font-display text-2xl text-white font-semibold">{t.name}</h2>
              <p className="text-white/70 text-sm mt-1 leading-relaxed">{t.desc}</p>
              <Link to="/shop" className="inline-flex items-center gap-1 text-rose-gold text-xs font-semibold uppercase tracking-wide mt-3 hover:text-white transition-colors">
                Shop This Trend <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* AI Trend Picks */}
      <div>
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="label-caps text-[10px] text-burgundy mb-1">Aura AI Trend Picks</p>
            <h2 className="heading-lg text-charcoal">Trending Products Right Now</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-burgundy">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* Trend Intelligence Box */}
      <div className="bg-charcoal p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-burgundy flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <p className="label-caps text-[10px] text-rose-gold mb-1">AI Trend Forecast — September 2026</p>
            <p className="font-display text-xl text-white mb-2">Upcoming Trend: Handloom Renaissance</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">Our AI predicts a 78% surge in handloom silk and khadi-based modern garments over the next 90 days, driven by sustainability consciousness and regional pride movements across India's top metro cities.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
