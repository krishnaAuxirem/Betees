import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid, Grid3X3, Search, X, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/features/ProductCard";
import { PRODUCTS } from "@/constants/data";

const CATEGORIES = ["All", "Outerwear", "Blazers", "Dresses", "Trousers", "Tops", "Ethnic Wear", "Suits", "Ethnic Men"];
const SORT_OPTIONS = ["AI Match: Highest", "Price: Low to High", "Price: High to Low", "Rating", "New Arrivals"];

export const Shop = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ? "All" : "All");
  const [sort, setSort] = useState("AI Match: Highest");
  const [gridCols, setGridCols] = useState(4);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [aiMatchOnly, setAiMatchOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];
    if (activeCategory !== "All") result = result.filter((p) => p.category === activeCategory);
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (aiMatchOnly) result = result.filter((p) => (p.aiMatch || 0) >= 90);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Rating": result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case "AI Match: Highest": result.sort((a, b) => (b.aiMatch || 0) - (a.aiMatch || 0)); break;
    }
    return result;
  }, [activeCategory, sort, search, aiMatchOnly, priceRange]);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-surface-low border-b border-outline-variant">
        <div className="section-container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
            <div>
              <p className="label-caps text-[10px] text-burgundy mb-2">Algorithmic Luxury Marketplace</p>
              <h1 className="heading-xl text-charcoal">
                Algorithmic Luxury <span className="italic text-burgundy">Marketplace</span>
              </h1>
              <p className="text-on-surface-variant mt-2 text-sm max-w-lg">Runway-calibrated pieces synchronized with your 3D digital avatar, bespoke measurements, and personal color spectrum.</p>
            </div>
            <div className="bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="label-caps text-[10px] text-on-surface-variant">Biometric Match Vector</span>
                <span className="font-display text-lg font-semibold text-burgundy">98.4%</span>
              </div>
              <div className="w-full bg-surface-high h-1.5 overflow-hidden">
                <div className="bg-burgundy h-full" style={{ width: "98.4%" }} />
              </div>
              <p className="text-xs text-on-surface-variant mt-2">Calibrated across 124 precise anatomical markers.</p>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat ? "bg-charcoal text-white" : "bg-white text-charcoal border border-outline-color hover:border-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* AI Sync Bar */}
          <div className="mt-4 bg-white border border-outline-variant p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-burgundy/10 rounded-full flex items-center justify-center">
                <Sparkles size={14} className="text-burgundy" />
              </div>
              <div>
                <span className="label-caps text-[9px] text-burgundy block">Synchronized Silhouette</span>
                <span className="text-xs text-charcoal">Size M (EU 38/40) / Warm Autumn Palette / 98.4% Precision Index</span>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setAiMatchOnly(!aiMatchOnly)}
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${aiMatchOnly ? "bg-charcoal" : "bg-outline-color"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${aiMatchOnly ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
              <span className="label-caps text-[10px] text-charcoal uppercase">AI Smart Match Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="section-container py-8">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-lg">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by fabric, designer, color..."
              className="w-full bg-surface-low border border-outline-variant pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:border-charcoal transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 px-3 py-2.5 border border-outline-color text-sm hover:border-charcoal transition-colors">
              <SlidersHorizontal size={15} />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="py-2.5 pl-3 pr-8 border border-outline-color text-sm focus:outline-none focus:border-charcoal appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
            <div className="flex items-center border border-outline-color">
              <button onClick={() => setGridCols(3)} className={`p-2.5 ${gridCols === 3 ? "bg-charcoal text-white" : "hover:bg-surface-low"}`}><Grid size={15} /></button>
              <button onClick={() => setGridCols(4)} className={`p-2.5 ${gridCols === 4 ? "bg-charcoal text-white" : "hover:bg-surface-low"}`}><Grid3X3 size={15} /></button>
            </div>
            <span className="text-xs text-on-surface-variant whitespace-nowrap hidden sm:block">Showing {filtered.length} of {PRODUCTS.length}</span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {filterOpen && (
            <aside className="w-64 shrink-0 space-y-6">
              <div className="bg-white border border-outline-variant p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="label-caps text-[10px] text-charcoal">Curatorial Filter</h3>
                  <button onClick={() => setFilterOpen(false)} className="text-on-surface-variant hover:text-charcoal"><X size={14} /></button>
                </div>

                {/* Price Range */}
                <div className="space-y-3 border-t border-outline-variant pt-4">
                  <h4 className="font-display text-sm font-semibold text-charcoal">Price Range</h4>
                  <div className="flex justify-between text-xs font-medium">
                    <span>₹{(priceRange[0] / 100).toFixed(0)}k</span>
                    <span>₹{(priceRange[1] / 100).toFixed(0)}k+</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={200000}
                    step={5000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full accent-burgundy"
                  />
                </div>

                {/* Categories */}
                <div className="space-y-2 border-t border-outline-variant pt-4 mt-4">
                  <h4 className="font-display text-sm font-semibold text-charcoal">Categories</h4>
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={activeCategory === cat}
                        onChange={() => setActiveCategory(activeCategory === cat ? "All" : cat)}
                        className="accent-burgundy"
                      />
                      <span className="text-sm text-on-surface-variant group-hover:text-charcoal">{cat}</span>
                    </label>
                  ))}
                </div>

                {/* AI Stylist Callout */}
                <div className="mt-4 bg-charcoal p-3">
                  <p className="label-caps text-[9px] text-rose-gold mb-1">Need Styling Advice?</p>
                  <p className="font-display text-sm text-white mb-2">Private AI Consult</p>
                  <button onClick={() => window.location.href = "/ai-stylist"} className="w-full py-2 bg-burgundy text-white text-xs font-semibold uppercase">Consult Stylist</button>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Sparkles size={32} className="text-rose-gold mx-auto mb-4" />
                <p className="font-display text-xl text-charcoal">No products match your filters</p>
                <button onClick={() => { setActiveCategory("All"); setSearch(""); setAiMatchOnly(false); }} className="mt-4 btn-outline text-xs">Clear Filters</button>
              </div>
            ) : (
              <div className={`grid gap-4 md:gap-6 ${gridCols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="mt-12 flex items-center justify-between bg-white border border-outline-variant p-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-burgundy animate-pulse" />
                  <span className="text-xs text-on-surface-variant">3 customers viewing this collection right now</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, "...", 12].map((p, i) => (
                    <button
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center text-xs transition-colors ${p === 1 ? "bg-charcoal text-white" : "text-charcoal hover:bg-surface-low"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
