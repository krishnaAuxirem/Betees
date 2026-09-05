import { useState } from "react";
import { ShoppingBag, Search, Filter, Star, Sparkles, Heart, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/constants/data";
import { useAuthStore } from "@/stores/authStore";

export const CustomerMarketplace = () => {
  const { addToCart, addToWishlist } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"match" | "price-asc" | "price-desc" | "rating">("match");
  const [quickViewProduct, setQuickViewProduct] = useState<(typeof PRODUCTS)[0] | null>(null);

  const categories = ["All", "Outerwear", "Blazers", "Ethnic Wear", "Dresses", "Trousers"];

  const filtered = PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "match") return (b.aiMatch || 90) - (a.aiMatch || 90);
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 4.5) - (a.rating || 4.5);
    return 0;
  });

  const handleAddToCart = (item: (typeof PRODUCTS)[0]) => {
    addToCart();
    toast.success(`Added ${item.name} to shopping bag`);
  };

  const handleAddToWishlist = (item: (typeof PRODUCTS)[0]) => {
    addToWishlist();
    toast.success(`Saved ${item.name} to wishlist`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Private Client Marketplace</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">Haute Couture Marketplace</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Browse made-to-order runway creations and bespoke garments crafted by master ateliers.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 border whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-charcoal/10 bg-white text-charcoal/70 hover:border-charcoal/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Controls: Search and Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search garments, ateliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-charcoal/20 focus:border-burgundy focus:outline-none bg-white"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs border border-charcoal/20 focus:border-burgundy focus:outline-none bg-white text-charcoal font-medium"
          >
            <option value="match">AI Match %</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-charcoal/10 hover:border-burgundy/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] bg-charcoal/5 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {product.aiMatch && (
                  <div className="absolute top-3 left-3 bg-burgundy/90 text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{product.aiMatch}% Match</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-charcoal/60 hover:text-burgundy flex items-center justify-center shadow transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-charcoal/60 hover:text-burgundy flex items-center justify-center shadow transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 bg-charcoal/80 text-white text-[10px] px-2 py-0.5 uppercase tracking-wider font-mono">
                  {product.category}
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal/50 mb-1">
                    <span className="font-semibold uppercase tracking-wider">{product.brand}</span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {product.rating}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-medium text-charcoal line-clamp-1 group-hover:text-burgundy transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1 line-clamp-1 font-serif italic">
                    {product.fabric}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-charcoal/5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-display font-medium text-charcoal">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-charcoal/40 line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-charcoal hover:bg-burgundy text-white text-xs uppercase tracking-wider font-semibold py-2.5 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-charcoal/10 p-12 text-center max-w-md mx-auto space-y-3">
          <ShoppingBag className="w-10 h-10 text-charcoal/30 mx-auto" />
          <h3 className="font-display text-lg font-medium text-charcoal">No products match your search</h3>
          <p className="text-xs text-charcoal/60">
            Try adjusting your search keywords or switching category filters.
          </p>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-6 md:p-8 space-y-6 border border-charcoal/20">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/50">
                  {quickViewProduct.brand}
                </span>
                <h3 className="font-display text-2xl font-medium text-charcoal">{quickViewProduct.name}</h3>
              </div>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="text-charcoal/50 hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-[3/4] bg-charcoal/5 overflow-hidden">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <span className="font-display text-2xl text-charcoal font-medium">
                    ₹{quickViewProduct.price.toLocaleString("en-IN")}
                  </span>
                  <p className="text-xs text-charcoal/70 mt-3 leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div>
                      <strong className="text-charcoal/60 uppercase">Fabric:</strong>{" "}
                      <span className="text-charcoal">{quickViewProduct.fabric}</span>
                    </div>
                    <div>
                      <strong className="text-charcoal/60 uppercase">Available Sizes:</strong>{" "}
                      <span className="text-charcoal">{(quickViewProduct.sizes || []).join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-charcoal/10">
                  <button
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="w-full bg-burgundy hover:bg-burgundy/90 text-white text-xs uppercase tracking-wider font-semibold py-3 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CustomerMarketplace;
