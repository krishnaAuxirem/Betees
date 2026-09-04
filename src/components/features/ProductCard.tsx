import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Eye } from "lucide-react";
import { formatINR } from "@/constants/data";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart, addToWishlist, isAuthenticated } = useAuthStore();

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    setWishlisted(!wishlisted);
    if (!wishlisted) {
      addToWishlist();
      toast.success("Added to wishlist");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add to cart");
      return;
    }
    addToCart();
    toast.success("Added to cart!");
  };

  return (
    <div className="product-card group">
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-surface-low overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.aiMatch && (
            <span className="ai-badge shadow-sm">
              <Sparkles size={9} />
              {product.aiMatch}% Match
            </span>
          )}
          {product.tags?.includes("new") && (
            <span className="px-2 py-0.5 bg-charcoal text-white text-[9px] font-bold uppercase tracking-wider">New</span>
          )}
          {product.tags?.includes("trending") && (
            <span className="px-2 py-0.5 bg-burgundy text-white text-[9px] font-bold uppercase tracking-wider">Trending</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white ${
            wishlisted ? "text-burgundy" : "text-on-surface-variant"
          }`}
        >
          <Heart size={15} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* Hover Actions */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-1 p-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2 bg-charcoal text-white text-[10px] font-semibold uppercase tracking-wider hover:bg-burgundy transition-colors"
            >
              Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
              className="w-9 py-2 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
            >
              <Eye size={14} className="text-charcoal" />
            </Link>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-1.5">
        <span className="label-caps text-[9px] text-on-surface-variant">{product.brand}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-medium text-[15px] text-charcoal hover:text-burgundy transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>
        {product.fabric && (
          <p className="text-xs text-on-surface-variant">{product.fabric}</p>
        )}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-2">
            <span className="price-inr text-base">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-on-surface-variant line-through">{formatINR(product.originalPrice)}</span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1">
              <span className="text-rose-gold text-xs">★</span>
              <span className="text-xs text-on-surface-variant font-medium">{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
