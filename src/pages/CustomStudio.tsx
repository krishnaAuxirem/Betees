import { useState } from "react";
import { Check, ArrowRight, ChevronRight } from "lucide-react";
import { formatINR } from "@/constants/data";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

const STEPS = ["Clothing Type", "Fabric & Color", "Design Details", "Measurements", "Review & Order"];
const CLOTHING_TYPES = ["Blazer", "Suit", "Kurta", "Sherwani", "Lehenga", "Saree Blouse", "Dress", "Trousers", "Shirt", "Cape"];
const FABRICS = [
  { id: "biella", name: "Biella Super 160s", desc: "Virgin Wool · Charcoal Slate", price: 0, color: "#252528" },
  { id: "dormeuil", name: "Dormeuil Amadeus 365", desc: "Wool-Silk · Midnight Obsidian", price: 8000, color: "#121318" },
  { id: "loro", name: "Loro Piana Tasmanian", desc: "Deep Navy · Ultra-durable", price: 12000, color: "#1b2230" },
  { id: "linen", name: "Solbiati Belgian Linen", desc: "Ivory Alabaster · Summer", price: 5000, color: "#ece5d8" },
  { id: "silk", name: "Mulberry Silk", desc: "Burgundy · Pure Luxury", price: 15000, color: "#7F1D3A" },
  { id: "banarasi", name: "Banarasi Silk Brocade", desc: "Gold & Red · Heritage", price: 18000, color: "#8B4513" },
];
const LAPELS = ["Peak Lapel", "Shawl Collar", "Notch Formal"];

export const CustomStudio = () => {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState({ type: "", fabric: "", lapel: LAPELS[0], monogram: "", notes: "" });
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const selectedFabric = FABRICS.find((f) => f.id === config.fabric);
  const basePrice = 45000;
  const fabricExtra = selectedFabric?.price || 0;
  const total = basePrice + fabricExtra;

  const handleOrder = () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    toast.success("Bespoke commission placed! Our team will contact you within 24 hours.");
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-charcoal py-12">
        <div className="section-container">
          <p className="label-caps text-[10px] text-rose-gold mb-2">Bespoke Atelier Studio</p>
          <h1 className="font-display text-3xl md:text-4xl text-white">Custom Clothing Studio</h1>
          <p className="text-gray-400 mt-2 max-w-xl">Engineer custom garments calibrated to your exact measurements, guided by AI, crafted by master tailors.</p>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="bg-surface-low border-b border-outline-variant">
        <div className="section-container py-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-all ${i === step ? "bg-charcoal text-white" : i < step ? "bg-emerald text-white cursor-pointer" : "text-on-surface-variant"}`}
                >
                  {i < step ? <Check size={12} /> : <span className="font-bold">{String(i + 1).padStart(2, "0")}</span>}
                  {s}
                </button>
                {i < STEPS.length - 1 && <ChevronRight size={14} className="text-on-surface-variant shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Config */}
          <div className="lg:col-span-8 space-y-8">
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl text-charcoal mb-5">Choose Clothing Type</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {CLOTHING_TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => { setConfig({ ...config, type: t }); setStep(1); }}
                      className={`p-4 text-center border-2 transition-all text-sm font-medium ${config.type === t ? "border-burgundy bg-secondary-container/30 text-burgundy" : "border-outline-variant text-charcoal hover:border-charcoal"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl text-charcoal mb-5">Fabric & Provenance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FABRICS.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setConfig({ ...config, fabric: f.id })}
                      className={`cursor-pointer p-4 border-2 transition-all ${config.fabric === f.id ? "border-charcoal bg-surface-low" : "border-outline-variant hover:border-charcoal"}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-8 h-8 rounded-full shadow-inner" style={{ backgroundColor: f.color }} />
                        <span className="label-caps text-[9px] text-on-surface-variant">{f.price > 0 ? `+${formatINR(f.price)}` : "Included"}</span>
                      </div>
                      <p className="font-semibold text-charcoal text-sm">{f.name}</p>
                      <p className="text-xs text-on-surface-variant">{f.desc}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} disabled={!config.fabric} className="btn-primary mt-6 disabled:opacity-50">
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-charcoal">Architectural Details</h2>
                <div>
                  <label className="label-caps text-[10px] text-on-surface-variant block mb-3">Lapel Style</label>
                  <div className="flex flex-wrap gap-2">
                    {LAPELS.map((l) => (
                      <button
                        key={l}
                        onClick={() => setConfig({ ...config, lapel: l })}
                        className={`px-4 py-2 text-xs font-semibold transition-all ${config.lapel === l ? "bg-charcoal text-white" : "border border-outline-color text-charcoal hover:border-charcoal"}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label-caps text-[10px] text-on-surface-variant block mb-2">Monogram / Initials</label>
                  <input
                    type="text"
                    value={config.monogram}
                    onChange={(e) => setConfig({ ...config, monogram: e.target.value })}
                    placeholder="e.g. AK · MUMBAI 2026"
                    className="input-editorial w-full max-w-xs"
                  />
                  <p className="text-xs text-on-surface-variant mt-1">Hand-embroidered in Rose Gold silk thread — complimentary</p>
                </div>
                <button onClick={() => setStep(3)} className="btn-primary">Continue <ArrowRight size={14} /></button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-charcoal">Measurements</h2>
                <div className="bg-emerald/10 border border-emerald p-4 flex items-center gap-3">
                  <Check size={16} className="text-emerald" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">3D Body Scan Synced</p>
                    <p className="text-xs text-on-surface-variant">Your measurements from Body Scan #8902 will be used automatically</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[["Chest", "102 cm"], ["Waist", "84 cm"], ["Hips", "98 cm"], ["Shoulder", "46 cm"], ["Sleeve", "64.5 cm"], ["Height", "178 cm"]].map(([k, v]) => (
                    <div key={k} className="bg-surface-low p-3">
                      <p className="label-caps text-[9px] text-on-surface-variant">{k}</p>
                      <p className="font-semibold text-charcoal">{v}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="label-caps text-[10px] text-on-surface-variant block mb-2">Special Instructions</label>
                  <textarea
                    value={config.notes}
                    onChange={(e) => setConfig({ ...config, notes: e.target.value })}
                    placeholder="e.g. Allow +0.8cm on left wrist for AP watch. Target date: Diwali 2026..."
                    rows={3}
                    className="input-editorial w-full resize-none"
                  />
                </div>
                <button onClick={() => setStep(4)} className="btn-primary">Review Order <ArrowRight size={14} /></button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-charcoal">Review & Confirm</h2>
                <div className="bg-white shadow-editorial p-6 space-y-4">
                  {[
                    ["Clothing Type", config.type || "Blazer"],
                    ["Fabric", selectedFabric?.name || "Biella Super 160s"],
                    ["Lapel Style", config.lapel],
                    ["Monogram", config.monogram || "None"],
                  ].map(([k, v]) => (
                    <div key={k as string} className="flex justify-between py-2 border-b border-outline-variant last:border-0">
                      <span className="label-caps text-[10px] text-on-surface-variant">{k}</span>
                      <span className="text-sm font-medium text-charcoal">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-charcoal p-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Base Price</span>
                    <span className="text-white font-semibold">{formatINR(basePrice)}</span>
                  </div>
                  {fabricExtra > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400 text-sm">Fabric Upgrade</span>
                      <span className="text-white font-semibold">{formatINR(fabricExtra)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-white/20 pt-2 mt-2">
                    <span className="text-white font-semibold">Total</span>
                    <span className="font-display text-xl text-white font-semibold">{formatINR(total)}</span>
                  </div>
                  <button onClick={handleOrder} className="w-full btn-secondary mt-4 py-3 text-sm justify-center">
                    Confirm & Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white shadow-editorial p-5 space-y-3">
              <p className="label-caps text-[10px] text-burgundy">Commission Summary</p>
              {config.type && <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Type:</span><span className="font-medium">{config.type}</span></div>}
              {selectedFabric && <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Fabric:</span><span className="font-medium">{selectedFabric.name}</span></div>}
              <div className="border-t border-outline-variant pt-3">
                <div className="flex justify-between">
                  <span className="text-sm text-on-surface-variant">Estimated Total</span>
                  <span className="font-display text-lg font-semibold text-charcoal">{formatINR(total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-low p-4 space-y-2">
              <p className="label-caps text-[10px] text-burgundy">Betees Guarantee</p>
              {["Zero alteration guarantee", "Master guild craftsmen", "14-day delivery timeline", "Free alterations up to ₹3,500"].map((g) => (
                <div key={g} className="flex items-center gap-2 text-xs text-charcoal">
                  <Check size={12} className="text-emerald shrink-0" /> {g}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
