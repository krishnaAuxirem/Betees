import { useState } from "react";
import { Link } from "react-router-dom";
import { Layers, Sparkles, Check, Plus, RefreshCw, Bookmark, ArrowRight, Heart } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/constants/data";

interface OutfitSlotItem {
  id: string;
  name: string;
  category: string;
  image: string;
  brand: string;
  price: number;
}

export const OutfitBuilder = () => {
  const outerwears: OutfitSlotItem[] = [
    { id: "o1", name: "Imperial Burgundy Cashmere Trench", category: "Outerwear", brand: "Aurelia Couture", price: 78500, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80" },
    { id: "o2", name: "Structured Tuxedo Blazer", category: "Outerwear", brand: "Atelier Vesper", price: 52000, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80" },
  ];

  const tops: OutfitSlotItem[] = [
    { id: "t1", name: "Sculpted Rose Silk Halter Top", category: "Tops", brand: "Aurelia Couture", price: 18500, image: "https://images.unsplash.com/photo-1575886876069-f50e42e55c75?w=600&h=800&fit=crop&q=80" },
    { id: "t2", name: "Egyptian Cotton Poplin Shirt", category: "Tops", brand: "Bespoke Clothiers", price: 12000, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80" },
  ];

  const bottoms: OutfitSlotItem[] = [
    { id: "b1", name: "Fluid Silk Palazzo Trousers", category: "Bottoms", brand: "Studio Cadence", price: 24500, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80" },
    { id: "b2", name: "Tailored Flannel Wool Trousers", category: "Bottoms", brand: "Atelier Vesper", price: 28000, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=800&fit=crop&q=80" },
  ];

  const footwear: OutfitSlotItem[] = [
    { id: "f1", name: "Handcrafted Calfskin Monkstraps", category: "Footwear", brand: "Bespoke Cobbler", price: 34000, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop&q=80" },
    { id: "f2", name: "Satin Pointed Evening Mules", category: "Footwear", brand: "Maison Noir", price: 29500, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80" },
  ];

  const [selectedOuter, setSelectedOuter] = useState<OutfitSlotItem>(outerwears[0]);
  const [selectedTop, setSelectedTop] = useState<OutfitSlotItem>(tops[0]);
  const [selectedBottom, setSelectedBottom] = useState<OutfitSlotItem>(bottoms[0]);
  const [selectedShoe, setSelectedShoe] = useState<OutfitSlotItem>(footwear[0]);

  const [outfitName, setOutfitName] = useState("Autumn Sovereign Gala");
  const [occasion, setOccasion] = useState("Evening Cocktail");

  const [savedOutfits, setSavedOutfits] = useState([
    {
      id: "OUTFIT-1",
      name: "Atelier Executive Power Suit",
      occasion: "Corporate Gala",
      pieces: ["Tuxedo Blazer", "Cotton Poplin Shirt", "Flannel Wool Trousers"],
      score: 97,
    },
    {
      id: "OUTFIT-2",
      name: "Monsoon Velvet Drape",
      occasion: "Private Salon",
      pieces: ["Burgundy Trench", "Silk Palazzo", "Evening Mules"],
      score: 93,
    },
  ]);

  const totalPrice =
    (selectedOuter?.price || 0) +
    (selectedTop?.price || 0) +
    (selectedBottom?.price || 0) +
    (selectedShoe?.price || 0);

  const handleSaveOutfit = () => {
    const newOutfit = {
      id: `OUTFIT-${Date.now().toString().slice(-3)}`,
      name: outfitName || "Custom Bespoke Ensemble",
      occasion: occasion,
      pieces: [selectedOuter.name, selectedTop.name, selectedBottom.name, selectedShoe.name],
      score: 96,
    };
    setSavedOutfits([newOutfit, ...savedOutfits]);
    toast.success(`Saved "${newOutfit.name}" to your Bespoke Lookbook!`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Styling Studio</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">AI Outfit Builder</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Harmonize coats, tailoring, silken trousers and handcrafted footwear with real-time silhouette analysis.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/customer/try-on"
            className="flex items-center gap-2 border border-charcoal/20 hover:border-charcoal bg-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-charcoal transition-colors"
          >
            <span>Try on Avatar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleSaveOutfit}
            className="bg-burgundy text-white hover:bg-burgundy/90 text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-colors flex items-center gap-2"
          >
            <Bookmark className="w-4 h-4" />
            <span>Save Outfit</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Wardrobe Palette Selectors (4 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Outerwear Slot */}
          <div className="bg-white border border-charcoal/10 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/60">
                1. Outerwear / Layer
              </span>
              <span className="text-[11px] text-burgundy font-medium">{selectedOuter.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {outerwears.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedOuter(item)}
                  className={`p-2 border cursor-pointer flex items-center gap-2.5 transition-all ${
                    selectedOuter.id === item.id
                      ? "border-charcoal bg-warm-white"
                      : "border-charcoal/10 hover:border-charcoal/30"
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-12 h-14 object-cover shrink-0" />
                  <div className="min-w-0">
                    <h5 className="text-xs font-display truncate text-charcoal">{item.name}</h5>
                    <span className="text-[10px] text-charcoal/50 block font-mono">₹{item.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Slot */}
          <div className="bg-white border border-charcoal/10 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/60">
                2. Inner Top / Shirt
              </span>
              <span className="text-[11px] text-burgundy font-medium">{selectedTop.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {tops.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedTop(item)}
                  className={`p-2 border cursor-pointer flex items-center gap-2.5 transition-all ${
                    selectedTop.id === item.id
                      ? "border-charcoal bg-warm-white"
                      : "border-charcoal/10 hover:border-charcoal/30"
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-12 h-14 object-cover shrink-0" />
                  <div className="min-w-0">
                    <h5 className="text-xs font-display truncate text-charcoal">{item.name}</h5>
                    <span className="text-[10px] text-charcoal/50 block font-mono">₹{item.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Slot */}
          <div className="bg-white border border-charcoal/10 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/60">
                3. Trousers / Bottom
              </span>
              <span className="text-[11px] text-burgundy font-medium">{selectedBottom.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {bottoms.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedBottom(item)}
                  className={`p-2 border cursor-pointer flex items-center gap-2.5 transition-all ${
                    selectedBottom.id === item.id
                      ? "border-charcoal bg-warm-white"
                      : "border-charcoal/10 hover:border-charcoal/30"
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-12 h-14 object-cover shrink-0" />
                  <div className="min-w-0">
                    <h5 className="text-xs font-display truncate text-charcoal">{item.name}</h5>
                    <span className="text-[10px] text-charcoal/50 block font-mono">₹{item.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footwear Slot */}
          <div className="bg-white border border-charcoal/10 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/60">
                4. Footwear
              </span>
              <span className="text-[11px] text-burgundy font-medium">{selectedShoe.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {footwear.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedShoe(item)}
                  className={`p-2 border cursor-pointer flex items-center gap-2.5 transition-all ${
                    selectedShoe.id === item.id
                      ? "border-charcoal bg-warm-white"
                      : "border-charcoal/10 hover:border-charcoal/30"
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-12 h-14 object-cover shrink-0" />
                  <div className="min-w-0">
                    <h5 className="text-xs font-display truncate text-charcoal">{item.name}</h5>
                    <span className="text-[10px] text-charcoal/50 block font-mono">₹{item.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Visual Outfit Collage / Canvas (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-charcoal/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-charcoal/10 mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/60">Canvas Preview</span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>96% AI Silhouette Match</span>
              </div>
            </div>

            {/* Collage Display */}
            <div className="space-y-3">
              <div className="relative aspect-[16/9] bg-charcoal/5 overflow-hidden border border-charcoal/5">
                <img src={selectedOuter.image} alt={selectedOuter.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-2 text-[10px] bg-charcoal/70 text-white px-1.5 py-0.5">
                  {selectedOuter.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative aspect-[4/3] bg-charcoal/5 overflow-hidden border border-charcoal/5">
                  <img src={selectedTop.image} alt={selectedTop.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 text-[9px] bg-charcoal/70 text-white px-1">Top</span>
                </div>
                <div className="relative aspect-[4/3] bg-charcoal/5 overflow-hidden border border-charcoal/5">
                  <img src={selectedBottom.image} alt={selectedBottom.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 text-[9px] bg-charcoal/70 text-white px-1">Bottom</span>
                </div>
              </div>
              <div className="relative aspect-[16/6] bg-charcoal/5 overflow-hidden border border-charcoal/5">
                <img src={selectedShoe.image} alt={selectedShoe.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-2 text-[10px] bg-charcoal/70 text-white px-1.5 py-0.5">
                  {selectedShoe.name}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between text-xs">
            <span className="text-charcoal/60">Combined Ensemble:</span>
            <span className="font-display text-base font-medium text-charcoal">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Right: AI Analysis & Ensemble Naming (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-charcoal/10 p-5 space-y-4">
            <h4 className="font-display text-base font-medium text-charcoal">Ensemble Details</h4>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal/60 mb-1">
                Outfit Name
              </label>
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-burgundy focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal/60 mb-1">
                Occasion
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-charcoal/20 focus:border-burgundy focus:outline-none"
              >
                <option value="Evening Cocktail">Evening Cocktail</option>
                <option value="Corporate Gala">Corporate Gala</option>
                <option value="Wedding Reception">Wedding Reception</option>
                <option value="Private Salon">Private Salon</option>
                <option value="Weekend Leisure">Weekend Leisure</option>
              </select>
            </div>
          </div>

          <div className="bg-charcoal text-white p-5 space-y-3">
            <div className="flex items-center gap-1.5 text-rose-gold text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Color Theory</span>
            </div>
            <h5 className="font-display text-base text-white">Burgundy & Charcoal Resonance</h5>
            <p className="text-xs text-white/70 leading-relaxed">
              Deep jewel tones paired with neutral wool slate produce high visual authority. Gold or rose-gold cufflinks recommend for subtle shimmer.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#7F1D3A] border border-white/20" title="Burgundy" />
              <div className="w-5 h-5 rounded-full bg-[#18181B] border border-white/20" title="Charcoal" />
              <div className="w-5 h-5 rounded-full bg-[#FAFAF9] border border-white/20" title="Warm White" />
              <span className="text-[10px] text-white/50 ml-1">Harmonious Triad</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal/60">Saved Lookbook</h4>
            <div className="space-y-2">
              {savedOutfits.map((outfit) => (
                <div key={outfit.id} className="bg-white border border-charcoal/10 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-charcoal font-display">{outfit.name}</span>
                    <span className="text-emerald-700 font-mono text-[10px]">{outfit.score}%</span>
                  </div>
                  <span className="text-[10px] text-charcoal/50 block mt-0.5">{outfit.occasion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OutfitBuilder;
