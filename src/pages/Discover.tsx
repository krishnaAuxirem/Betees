import { Link } from "react-router-dom";
import { TrendingUp, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { PRODUCTS, formatINR, CATEGORIES, DESIGNERS } from "@/constants/data";
import { ProductCard } from "@/components/features/ProductCard";
import hero2 from "@/assets/hero-2.jpg";

export const Discover = () => (
  <div className="animate-fade-in">
    <section className="relative bg-charcoal overflow-hidden py-20">
      <div className="absolute inset-0 opacity-20">
        <img src={hero2} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 section-container text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10">
          <Sparkles size={12} className="text-rose-gold" />
          <span className="label-caps text-[9px] text-rose-gold">Personalized for You</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-white">Discover Your<br /><span className="italic text-rose-gold">Perfect Style</span></h1>
        <p className="text-gray-400 max-w-xl mx-auto">AI-curated fashion discoveries based on your taste graph, occasions, and body profile.</p>
      </div>
    </section>

    <section className="section-container py-14">
      <h2 className="heading-lg text-charcoal mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} to={`/shop?category=${cat.id}`} className="group relative aspect-[4/5] overflow-hidden">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-3">
              <p className="text-white font-display text-base font-medium">{cat.name}</p>
              <p className="text-white/60 text-xs">{cat.count} styles</p>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="bg-surface-low border-t border-b border-outline-variant py-14">
      <div className="section-container">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="label-caps text-[10px] text-burgundy mb-1">Aura AI Recommendations</p>
            <h2 className="heading-lg text-charcoal">Curated for Your Style</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-burgundy uppercase tracking-wide">View All <ArrowRight size={12} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>

    <section className="section-container py-14">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp size={18} className="text-burgundy" />
        <h2 className="heading-lg text-charcoal">Trending Now</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Power Suiting", desc: "Structured blazers dominating runways", image: PRODUCTS[1].image, count: 234 },
          { title: "Ethnic Revival", desc: "Contemporary Indian silhouettes", image: PRODUCTS[2].image, count: 189 },
          { title: "Minimalist Edit", desc: "Clean lines, premium fabrics", image: PRODUCTS[3].image, count: 312 },
        ].map((trend) => (
          <Link key={trend.title} to="/trends" className="group relative aspect-[4/3] overflow-hidden bg-surface-low block">
            <img src={trend.image} alt={trend.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4 flex flex-col justify-end">
              <p className="text-white font-display text-xl font-semibold">{trend.title}</p>
              <p className="text-white/70 text-xs mt-1">{trend.desc}</p>
              <p className="text-rose-gold text-xs mt-1">{trend.count} looks →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="bg-surface-low border-t border-outline-variant py-14">
      <div className="section-container">
        <div className="flex items-end justify-between mb-6">
          <h2 className="heading-lg text-charcoal">Featured Designers</h2>
          <Link to="/designers" className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-burgundy uppercase tracking-wide">All Designers <ArrowRight size={12} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {DESIGNERS.map((d) => (
            <Link key={d.id} to={`/designers/${d.id}`} className="text-center group">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover rounded-full group-hover:ring-2 ring-burgundy transition-all" />
                {d.verified && <span className="absolute bottom-0 right-0 w-5 h-5 bg-burgundy rounded-full flex items-center justify-center text-white text-[9px]">✓</span>}
              </div>
              <p className="text-xs font-semibold text-charcoal group-hover:text-burgundy transition-colors">{d.name}</p>
              <p className="text-[10px] text-on-surface-variant">{d.studio}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);
