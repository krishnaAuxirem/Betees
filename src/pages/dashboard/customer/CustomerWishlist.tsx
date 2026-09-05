import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/constants/data";
import { useAuthStore } from "@/stores/authStore";

export const CustomerWishlist = () => {
  const { addToCart } = useAuthStore();
  const [wishlistItems, setWishlistItems] = useState(
    PRODUCTS.slice(0, 4).map((p) => ({
      ...p,
      selectedSize: p.sizes?.[0] || "M",
      addedDate: "Sep 1, 2026",
    }))
  );

  const handleRemove = (id: string, name: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Removed ${name} from your wishlist`);
  };

  const handleMoveToCart = (item: (typeof wishlistItems)[0]) => {
    addToCart();
    setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));
    toast.success(`Moved ${item.name} (${item.selectedSize}) to your shopping bag`);
  };

  const handleClearAll = () => {
    if (wishlistItems.length === 0) return;
    setWishlistItems([]);
    toast.success("Wishlist cleared");
  };

  const handleAddBack = (product: typeof PRODUCTS[0]) => {
    if (wishlistItems.some((i) => i.id === product.id)) {
      toast.info(`${product.name} is already in your wishlist`);
      return;
    }
    setWishlistItems((prev) => [
      ...prev,
      { ...product, selectedSize: product.sizes?.[0] || "M", addedDate: "Just now" },
    ]);
    toast.success(`Added ${product.name} to wishlist`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Heart className="w-3.5 h-3.5 fill-burgundy" />
            <span>Saved Haute Couture</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">My Curated Wishlist</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? "masterpiece" : "masterpieces"} saved for future atelier commissions & orders.
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearAll}
              className="text-xs uppercase tracking-wider font-semibold text-charcoal/60 hover:text-rose-600 px-4 py-2 border border-charcoal/10 transition-colors"
            >
              Clear All
            </button>
            <Link
              to="/dashboard/customer/marketplace"
              className="bg-charcoal text-white text-xs uppercase tracking-wider font-semibold px-5 py-2.5 hover:bg-burgundy transition-colors flex items-center gap-2"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Main Wishlist Grid */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-charcoal/10 hover:border-burgundy/40 transition-all flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[3/4] bg-charcoal/5 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <button
                  onClick={() => handleRemove(item.id, item.name)}
                  title="Remove from wishlist"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-charcoal/60 hover:text-rose-600 flex items-center justify-center shadow transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {item.aiMatch && (
                  <div className="absolute top-3 left-3 bg-burgundy/90 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider px-2 py-0.5 uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{item.aiMatch}% Match</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal/50 mb-1">
                    <span className="font-semibold uppercase tracking-wider">{item.brand}</span>
                    <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {item.rating || 4.9}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-medium text-charcoal line-clamp-1 group-hover:text-burgundy transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1 line-clamp-1 font-serif italic">
                    {item.fabric || "Bespoke fabric blend"}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-charcoal/5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-lg font-display font-medium text-charcoal">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      {item.originalPrice && (
                        <span className="ml-2 text-xs text-charcoal/40 line-through">
                          ₹{item.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5">
                      In Stock
                    </span>
                  </div>

                  {/* Size Selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-charcoal/60">Size:</span>
                    <div className="flex flex-wrap gap-1">
                      {(item.sizes || ["S", "M", "L"]).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => {
                            setWishlistItems((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, selectedSize: sz } : i))
                            );
                          }}
                          className={`text-[10px] px-2 py-0.5 border font-mono transition-colors ${
                            item.selectedSize === sz
                              ? "border-charcoal bg-charcoal text-white"
                              : "border-charcoal/20 text-charcoal hover:border-charcoal"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full bg-burgundy text-white hover:bg-burgundy/90 text-xs uppercase tracking-wider font-semibold py-2.5 flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-charcoal/10 p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-medium text-charcoal">Your Wishlist is Empty</h2>
          <p className="text-sm text-charcoal/60">
            You haven't saved any couture pieces yet. Explore our bespoke collections and tap the heart icon to save garments here.
          </p>
          <div className="pt-2">
            <Link
              to="/dashboard/customer/marketplace"
              className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-burgundy transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Marketplace</span>
            </Link>
          </div>
        </div>
      )}

      {/* Recommended Additions */}
      <div className="pt-8 border-t border-charcoal/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-burgundy font-semibold">Recommended for You</span>
            <h2 className="font-display text-2xl font-medium text-charcoal">Curated Pieces You Might Adore</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.slice(4, 7).map((prod) => (
            <div key={prod.id} className="bg-white border border-charcoal/10 p-4 flex gap-4 items-center">
              <img src={prod.image} alt={prod.name} className="w-20 h-24 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-charcoal/50 uppercase font-semibold">{prod.brand}</span>
                <h4 className="font-display text-sm font-medium text-charcoal truncate">{prod.name}</h4>
                <p className="text-xs font-semibold text-charcoal mt-1">₹{prod.price.toLocaleString("en-IN")}</p>
                <button
                  onClick={() => handleAddBack(prod)}
                  className="mt-2 text-xs text-burgundy font-semibold hover:underline flex items-center gap-1"
                >
                  <Heart className="w-3 h-3" />
                  <span>Save to Wishlist</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CustomerWishlist;
