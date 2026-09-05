import { useState } from "react";
import { Compass, Heart, Bookmark, Eye, Sparkles, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/constants/data";
import { useAuthStore } from "@/stores/authStore";

interface DiscoveryLook {
  id: string;
  title: string;
  curator: string;
  category: string;
  image: string;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  tags: string[];
  description: string;
  featuredProducts: (typeof PRODUCTS)[0][];
}

export const FashionDiscovery = () => {
  const { addToCart } = useAuthStore();

  const [looks, setLooks] = useState<DiscoveryLook[]>([
    {
      id: "disc-1",
      title: "Sovereign Burgundy & High Flannel Contrast",
      curator: "Atelier Vesper x Neha Gupta",
      category: "Bespoke Tailoring",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
      likes: 1240,
      tags: ["#Autumn2026", "#BespokeTailoring", "#Cashmere"],
      description: "A masterclass in textural warmth: double-faced Mongolian cashmere balanced against structured worsted wool.",
      featuredProducts: [PRODUCTS[0], PRODUCTS[1]],
    },
    {
      id: "disc-2",
      title: "Royal Zardozi Reimagined for Contemporary Evenings",
      curator: "House of Rohit Bal",
      category: "Heritage Couture",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&q=80",
      likes: 2180,
      tags: ["#Festive2026", "#HandloomSilk", "#Bridal"],
      description: "Subtle rose gold filigree wirework handcrafted across 320 artisan hours on unweighted raw silk.",
      featuredProducts: [PRODUCTS[2]],
    },
    {
      id: "disc-3",
      title: "Sculptural Monochrome: The Power of Obsidian Drape",
      curator: "Maison Noir Studio",
      category: "Editorial",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
      likes: 890,
      tags: ["#Minimalist", "#Editorial", "#Bespoke"],
      description: "Sharp peak lapels with zero-stitch hem lines, creating an uncompromising architectural posture.",
      featuredProducts: [PRODUCTS[1], PRODUCTS[3]],
    },
    {
      id: "disc-4",
      title: "Fluid Habotai Movement for Monsoon Soirees",
      curator: "Studio Cadence",
      category: "Contemporary",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80",
      likes: 1540,
      tags: ["#FluidSilk", "#SustainableLuxury", "#EveningWear"],
      description: "Relaxed high-waisted pleats providing cooling breathability during humid ballroom receptions.",
      featuredProducts: [PRODUCTS[4]],
    },
  ]);

  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [activeLook, setActiveLook] = useState<DiscoveryLook | null>(null);

  const tags = ["All", "#Autumn2026", "#BespokeTailoring", "#Cashmere", "#Festive2026", "#Minimalist", "#FluidSilk"];

  const filteredLooks = looks.filter((look) => {
    if (selectedTag === "All") return true;
    return look.tags.includes(selectedTag);
  });

  const handleLike = (id: string) => {
    setLooks((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, likes: l.isLiked ? l.likes - 1 : l.likes + 1, isLiked: !l.isLiked }
          : l
      )
    );
  };

  const handleSave = (id: string, title: string) => {
    setLooks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isSaved: !l.isSaved } : l))
    );
    toast.success(`Saved "${title}" to your style moodboard`);
  };

  const handleAddToCart = (prod: (typeof PRODUCTS)[0]) => {
    addToCart();
    toast.success(`Added ${prod.name} to your bag`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Curated Editorial Feed</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">Fashion Discovery</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Explore seasonal couture runway archives, styling stories, and direct-to-atelier commissions.
          </p>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 border whitespace-nowrap transition-all ${
              selectedTag === t
                ? "border-charcoal bg-charcoal text-white"
                : "border-charcoal/10 bg-white text-charcoal/70 hover:border-charcoal/30"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Discovery Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredLooks.map((look) => (
          <div
            key={look.id}
            className="bg-white border border-charcoal/10 hover:border-burgundy/40 transition-all flex flex-col justify-between group"
          >
            <div className="relative aspect-[16/10] bg-charcoal/5 overflow-hidden">
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 uppercase tracking-wider">
                {look.category}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <button
                  onClick={() => handleLike(look.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow transition-colors ${
                    look.isLiked ? "bg-burgundy text-white" : "bg-white/90 text-charcoal hover:text-burgundy"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${look.isLiked ? "fill-white" : ""}`} />
                </button>
                <button
                  onClick={() => handleSave(look.id, look.title)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow transition-colors ${
                    look.isSaved ? "bg-charcoal text-white" : "bg-white/90 text-charcoal hover:text-burgundy"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${look.isSaved ? "fill-white" : ""}`} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/50">
                  {look.curator}
                </span>
                <h3 className="font-display text-xl font-medium text-charcoal mt-1 group-hover:text-burgundy transition-colors">
                  {look.title}
                </h3>
                <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">{look.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {look.tags.map((tg) => (
                  <span key={tg} className="text-[10px] bg-warm-white border border-charcoal/10 px-2 py-0.5 text-charcoal/60">
                    {tg}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between">
                <span className="text-xs text-charcoal/50 font-mono">
                  {look.likes.toLocaleString()} admirers
                </span>
                <button
                  onClick={() => setActiveLook(look)}
                  className="bg-burgundy hover:bg-burgundy/90 text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 flex items-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Shop This Look</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "Shop This Look" Drawer/Modal */}
      {activeLook && (
        <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-6 md:p-8 space-y-6 border border-charcoal/20">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-burgundy">Curated Garments</span>
                <h3 className="font-display text-xl font-medium text-charcoal">{activeLook.title}</h3>
              </div>
              <button onClick={() => setActiveLook(null)} className="text-charcoal/50 hover:text-charcoal p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {activeLook.featuredProducts.map((prod) => (
                <div key={prod.id} className="p-4 border border-charcoal/10 flex gap-4 items-center">
                  <img src={prod.image} alt={prod.name} className="w-20 h-24 object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-semibold text-charcoal/50">{prod.brand}</span>
                    <h4 className="font-display text-base text-charcoal truncate">{prod.name}</h4>
                    <p className="text-xs text-charcoal/60 mt-0.5">{prod.fabric}</p>
                    <span className="font-mono font-semibold text-charcoal text-sm block mt-1">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="bg-charcoal hover:bg-burgundy text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-charcoal/10 text-right">
              <button
                onClick={() => setActiveLook(null)}
                className="px-6 py-2 border border-charcoal/20 text-charcoal text-xs uppercase tracking-wider font-semibold hover:border-charcoal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FashionDiscovery;
