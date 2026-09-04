import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingBag, Sparkles, Star, ChevronLeft, Check, Share2 } from "lucide-react";
import { PRODUCTS, formatINR } from "@/constants/data";
import { ProductCard } from "@/components/features/ProductCard";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

export const ProductDetail = () => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || "M");
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart, addToWishlist } = useAuthStore();

  const images = [product.image, product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart();
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
    if (!wishlisted) { addToWishlist(); toast.success("Saved to wishlist"); }
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="section-container py-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Link to="/" className="hover:text-charcoal">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-charcoal">Shop</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-charcoal">{product.category}</Link>
            <span>/</span>
            <span className="text-charcoal font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
          <Link to="/shop" className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-charcoal">
            <ChevronLeft size={14} /> Back to Shop
          </Link>
        </div>
      </div>

      <div className="section-container pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-[3/4] bg-surface-low overflow-hidden group">
              <img
                id="primaryDisplayImage"
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-2 py-1 bg-charcoal text-white label-caps text-[9px]">{product.brand}</span>
                {product.fabric && <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-charcoal label-caps text-[9px]">{product.fabric}</span>}
              </div>
              {/* View Toggle */}
              <div className="absolute top-4 right-4 flex flex-col gap-1">
                <button className="px-3 py-1.5 bg-charcoal text-white label-caps text-[9px] flex items-center gap-1">
                  <span className="text-[10px]">📷</span> Studio View
                </button>
                <button className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-charcoal label-caps text-[9px] flex items-center gap-1">
                  <Sparkles size={10} className="text-burgundy" /> On My Avatar
                </button>
              </div>
              {/* AI Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2.5 shadow-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" />
                <div>
                  <p className="label-caps text-[9px] text-burgundy font-semibold">Active Drape Simulation</p>
                  <p className="text-[10px] text-on-surface-variant">Betees Neural Physics v4.8</p>
                </div>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-[3/4] overflow-hidden border-2 transition-all ${i === activeImage ? "border-charcoal" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Drape Metrics */}
            <div className="bg-surface-low p-4 shadow-sm">
              <h4 className="label-caps text-[10px] text-charcoal mb-3 flex items-center gap-2">
                <Sparkles size={12} className="text-burgundy" /> Algorithmic Drape Telemetry
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Tensile Flexibility", value: "9.4 / 10", pct: 94 },
                  { label: "Microclimate Grade", value: "Grade A+", pct: 98 },
                ].map((m) => (
                  <div key={m.label} className="bg-white p-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-on-surface-variant">{m.label}</span>
                      <span className="font-semibold text-charcoal">{m.value}</span>
                    </div>
                    <div className="w-full bg-surface-high h-1.5">
                      <div className="bg-burgundy h-full transition-all" style={{ width: `${m.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Purchase Panel */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="label-caps text-[10px] text-burgundy font-semibold">{product.brand} · FW25</span>
                <div className="flex items-center gap-2">
                  <button onClick={handleWishlist} className={`p-2 transition-colors ${wishlisted ? "text-burgundy" : "text-on-surface-variant hover:text-burgundy"}`}>
                    <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-charcoal transition-colors"><Share2 size={16} /></button>
                </div>
              </div>
              <h1 className="font-display text-2xl lg:text-3xl text-charcoal font-normal leading-tight">{product.name}</h1>
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-display text-2xl font-semibold text-charcoal">{formatINR(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-on-surface-variant line-through">{formatINR(product.originalPrice)}</span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-xs text-emerald font-semibold">You save {formatINR(product.originalPrice - product.price)}</span>
              )}
            </div>

            {/* AI Stylist Note */}
            <div className="bg-surface-low p-4 border-l-2 border-burgundy">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-burgundy" />
                <span className="label-caps text-[10px] text-burgundy font-semibold">AI Stylist Dossier</span>
                <span className="px-2 py-0.5 bg-secondary-container text-burgundy label-caps text-[9px] font-bold">{product.aiMatch}% Match</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {product.aiMatch && product.aiMatch >= 95
                  ? "Harmonizes precisely with your stored Warm Autumn Palette. Algorithmically calibrated for your body profile — zero alterations expected."
                  : "Recommended based on your occasion preferences and recent browse history. Complements 4 items in your digital wardrobe."}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="label-caps text-[10px] text-charcoal">Select Size</label>
                <button className="text-xs text-burgundy hover:underline">Size Guide</button>
              </div>
              {/* AI Fit Confidence */}
              <div className="bg-white border border-outline-variant p-2.5 flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald" />
                  <div>
                    <p className="label-caps text-[9px] text-charcoal font-semibold">{selectedSize} Recommended</p>
                    <p className="text-[10px] text-on-surface-variant">Based on your 3D Body Scan</p>
                  </div>
                </div>
                <span className="label-caps text-[10px] text-burgundy font-bold">99% Fit</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ["XS", "S", "M", "L", "XL"]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 text-xs font-semibold uppercase transition-all ${
                      selectedSize === size ? "bg-charcoal text-white" : "border border-outline-color text-charcoal hover:border-charcoal"
                    }`}
                  >
                    {size}
                    {size === "Custom" && <span className="block text-[9px] font-normal opacity-60">+₹1,200</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Tailor Option */}
            <div className="bg-surface-low p-3 border border-outline-variant">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 accent-burgundy" />
                <div>
                  <span className="label-caps text-[10px] text-charcoal font-semibold block">Complimentary Master Tailor Finishing</span>
                  <p className="text-xs text-on-surface-variant mt-0.5">Include bespoke hemming to your measurements — hand-executed within 48 hours.</p>
                  <span className="label-caps text-[10px] text-emerald font-semibold">Zero Surcharge</span>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button onClick={handleAddToCart} className="w-full btn-primary justify-center py-3.5 text-sm">
                <ShoppingBag size={16} /> Add to Cart · {formatINR(product.price)}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="btn-secondary justify-center py-3 text-xs">
                  <Sparkles size={14} /> Virtual Try-On
                </button>
                <button onClick={handleWishlist} className="btn-outline justify-center py-3 text-xs">
                  <Heart size={14} fill={wishlisted ? "currentColor" : "none"} /> {wishlisted ? "Saved" : "Wishlist"}
                </button>
              </div>
            </div>

            {/* Stock/Delivery */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                <span className="text-emerald font-semibold">In Stock — Only 3 left in {selectedSize}</span>
              </div>
              <div className="flex items-start gap-2 text-on-surface-variant">
                <span className="mt-0.5">📦</span>
                <span>Dispatched in custom garment courier. Free delivery above ₹2,999. 2-3 business days.</span>
              </div>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={13} fill={i < Math.round(product.rating || 0) ? "currentColor" : "none"} className="text-rose-gold" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-charcoal">{product.rating}</span>
                <span className="text-xs text-on-surface-variant">({product.reviews} verified reviews)</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Description / Guarantee / Reviews */}
        <div className="mt-14">
          <div className="flex items-center gap-6 border-b border-outline-variant">
            {["Material & Provenance", "Zero-Alteration Guarantee", "Verified Reviews"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`pb-3 label-caps text-[10px] uppercase transition-all whitespace-nowrap border-b-2 ${
                  activeTab === i ? "border-charcoal text-charcoal font-bold" : "border-transparent text-on-surface-variant hover:text-charcoal"
                }`}
              >
                0{i + 1}. {tab}
              </button>
            ))}
          </div>
          <div className="pt-6">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="label-caps text-[10px] text-burgundy mb-2">Premium Provenance</p>
                  <h3 className="font-display text-2xl text-charcoal mb-4">{product.fabric || "Premium Fabric"}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{product.description}</p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-surface-low p-3">
                      <span className="label-caps text-[9px] text-on-surface-variant block">Composition</span>
                      <span className="font-display text-sm font-semibold text-charcoal">{product.fabric?.split(" ")[0] || "Premium"}</span>
                    </div>
                    <div className="bg-surface-low p-3">
                      <span className="label-caps text-[9px] text-on-surface-variant block">Craftsmanship</span>
                      <span className="font-display text-sm font-semibold text-charcoal">Hand-Finished</span>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-surface-low overflow-hidden">
                  <img src={product.image} alt="Craftsmanship" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface-low p-6">
                  <p className="label-caps text-[10px] text-burgundy mb-2">The Betees Promise</p>
                  <h3 className="font-display text-2xl text-charcoal mb-3">98% First-Fit Zero Alteration Guarantee</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">Our AI analyzes 3D body scans against precision CAD patterns to eliminate sizing errors. If deviation exceeds 0.5cm, we cover local tailoring up to ₹3,500.</p>
                  {["Complimentary local alteration coverage up to ₹3,500", "Digital twin re-sync with each order", "Guaranteed fit or 100% return"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-charcoal mb-2">
                      <Check size={14} className="text-emerald shrink-0" /> {item}
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-outline-variant p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center font-display text-xl font-bold text-burgundy">98%</div>
                    <div>
                      <p className="font-semibold text-charcoal">First-Fit Success Rate</p>
                      <p className="text-xs text-on-surface-variant">Across 4,200+ deliveries in 2025</p>
                    </div>
                  </div>
                  {[["Shoulder Precision", 99], ["Chest & Lapel", 98], ["Sleeve Accuracy", 97]].map(([label, pct]) => (
                    <div key={label as string} className="mb-3">
                      <div className="flex justify-between text-xs mb-1"><span className="text-on-surface-variant">{label}</span><span className="font-semibold">{pct}%</span></div>
                      <div className="w-full bg-surface-high h-1"><div className="bg-charcoal h-full" style={{ width: `${pct}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-surface-low p-4">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-4xl font-bold text-charcoal">{product.rating}</span>
                    <div>
                      <div className="flex gap-0.5 mb-1">{Array(5).fill(0).map((_, i) => <Star key={i} size={14} fill="currentColor" className="text-rose-gold" />)}</div>
                      <p className="text-xs text-on-surface-variant">{product.reviews} verified reviews</p>
                    </div>
                  </div>
                  <button className="btn-primary text-xs px-4 py-2">Write Review</button>
                </div>
                {[
                  { name: "Riya M.", loc: "Mumbai", text: "Perfect fit — zero alterations needed. The fabric quality is extraordinary.", rating: 5 },
                  { name: "Aryan K.", loc: "Delhi", text: "The AI size recommendation was spot on. Delivered ahead of schedule.", rating: 5 },
                ].map((r) => (
                  <div key={r.name} className="bg-white p-5 border border-outline-variant">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-semibold text-charcoal text-sm">{r.name} — {r.loc}</p>
                        <p className="text-xs text-on-surface-variant">Verified Purchase</p>
                      </div>
                      <div className="flex gap-0.5">{Array(r.rating).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" className="text-rose-gold" />)}</div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-display text-2xl text-charcoal">Complete The Look</h2>
            <Link to="/shop" className="text-sm text-on-surface-variant hover:text-charcoal">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
