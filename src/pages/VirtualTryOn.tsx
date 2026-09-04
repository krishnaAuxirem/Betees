import { useState } from "react";
import { Upload, Sparkles, Check, Zap, ArrowRight } from "lucide-react";
import { PRODUCTS, formatINR } from "@/constants/data";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const VirtualTryOn = () => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [simulating, setSimulating] = useState(false);
  const [simDone, setSimDone] = useState(false);

  const runSimulation = () => {
    setSimulating(true);
    setSimDone(false);
    setTimeout(() => {
      setSimulating(false);
      setSimDone(true);
      toast.success("Virtual try-on complete! 98% fit confidence.");
    }, 2500);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-charcoal py-14">
        <div className="section-container text-center space-y-3">
          <p className="label-caps text-[10px] text-rose-gold">Neural Physics Engine v4.8</p>
          <h1 className="font-display text-4xl text-white">Virtual Try-On Studio</h1>
          <p className="text-gray-400 max-w-xl mx-auto">True-to-scale body mesh reconstruction simulates fabric drape, tension, and movement — before you buy.</p>
        </div>
      </div>

      <div className="section-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Upload / Avatar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-outline-variant p-6 text-center space-y-4">
              <div className="w-full aspect-[3/4] bg-surface-low flex items-center justify-center relative overflow-hidden">
                {simulating ? (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto border-4 border-burgundy/30 border-t-burgundy rounded-full animate-spin" />
                    <p className="font-display text-lg text-charcoal">Simulating fit...</p>
                    <p className="text-xs text-on-surface-variant">Calibrating fabric drape & tension vectors</p>
                  </div>
                ) : simDone ? (
                  <div className="relative w-full h-full">
                    <img src={selectedProduct.image} alt="Try-On Result" className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 flex items-center justify-between">
                      <div>
                        <p className="label-caps text-[9px] text-burgundy font-semibold">Fit Simulation Complete</p>
                        <p className="text-xs text-charcoal font-semibold">Size M · 98% Confidence</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Check size={14} className="text-emerald" />
                        <span className="label-caps text-[9px] text-emerald">Zero Alteration</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 mx-auto bg-surface-high rounded-full flex items-center justify-center">
                      <Upload size={24} className="text-on-surface-variant" />
                    </div>
                    <p className="font-display text-lg text-charcoal">Upload Your Photo</p>
                    <p className="text-xs text-on-surface-variant">or use our AI-generated 3D avatar</p>
                    <div className="flex gap-2">
                      <button className="btn-outline text-xs px-4 py-2">Upload Photo</button>
                      <button className="btn-primary text-xs px-4 py-2">Use Avatar</button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={runSimulation}
                disabled={simulating}
                className="w-full btn-secondary py-3 text-sm justify-center disabled:opacity-60"
              >
                {simulating ? "Simulating..." : "Run Virtual Try-On"} {!simulating && <Zap size={14} />}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Fit Accuracy", value: "98.4%", icon: "📐" },
                { label: "Drape Vectors", value: "2,400+", icon: "🧵" },
                { label: "Time to Sim", value: "2.5 sec", icon: "⚡" },
                { label: "Body Points", value: "124", icon: "🔬" },
              ].map((s) => (
                <div key={s.label} className="bg-surface-low p-3 text-center">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="font-display text-lg font-semibold text-charcoal">{s.value}</div>
                  <div className="label-caps text-[9px] text-on-surface-variant">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-1">Select a Garment to Try</h2>
              <p className="text-sm text-on-surface-variant">Choose any product from our catalog to simulate on your body</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PRODUCTS.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  onClick={() => { setSelectedProduct(p); setSimDone(false); }}
                  className={`cursor-pointer border-2 transition-all overflow-hidden ${selectedProduct.id === p.id ? "border-burgundy" : "border-transparent"}`}
                >
                  <div className="aspect-[3/4] bg-surface-low overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-[10px] text-on-surface-variant truncate">{p.brand}</p>
                    <p className="text-xs font-semibold text-charcoal truncate">{p.name.split(" ").slice(0, 4).join(" ")}</p>
                    <p className="text-xs font-display font-semibold text-burgundy">{formatINR(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Product Info */}
            <div className="bg-white shadow-editorial p-4 flex items-start gap-4">
              <div className="w-20 h-24 bg-surface-low overflow-hidden shrink-0">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="label-caps text-[9px] text-burgundy">{selectedProduct.brand}</p>
                <p className="font-display text-base font-semibold text-charcoal">{selectedProduct.name}</p>
                <p className="text-xs text-on-surface-variant">{selectedProduct.fabric}</p>
                <p className="font-display font-semibold text-charcoal mt-2">{formatINR(selectedProduct.price)}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={runSimulation} disabled={simulating} className="btn-primary text-xs px-4 py-2">
                    <Sparkles size={12} /> Try This On
                  </button>
                  <Link to={`/product/${selectedProduct.id}`} className="btn-outline text-xs px-4 py-2">
                    View Product <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
