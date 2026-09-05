import { useState } from "react";
import { Scissors, Check, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, ShoppingBag, Eye } from "lucide-react";
import { toast } from "sonner";

export const CustomerCustomStudio = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Customization choices
  const [silhouette, setSilhouette] = useState({
    id: "tuxedo",
    name: "Structured Wool-Silk Tuxedo Blazer",
    basePrice: 48000,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
  });

  const [fabric, setFabric] = useState({
    name: "Biella Super 160s Merino Wool",
    priceExtra: 9000,
    origin: "Biella, Italy",
  });

  const [color, setColor] = useState({
    name: "Imperial Burgundy",
    hex: "#7F1D3A",
  });

  const [lapel, setLapel] = useState("Peak Lapel in Silk Facing");
  const [buttons, setButtons] = useState("Horn Buttons with Gold Rim");
  const [monogram, setMonogram] = useState("P.S.");
  const [threadColor, setThreadColor] = useState("Champagne Gold");
  const [tailorNotes, setTailorNotes] = useState("Slightly tapered waistline for black-tie gala.");

  const silhouettes = [
    {
      id: "tuxedo",
      name: "Structured Wool-Silk Tuxedo Blazer",
      basePrice: 48000,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    },
    {
      id: "trench",
      name: "Architectural Double-Breasted Trench",
      basePrice: 65000,
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
    },
    {
      id: "bandhgala",
      name: "Heritage Silk Bandhgala Jacket",
      basePrice: 72000,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&q=80",
    },
    {
      id: "cape",
      name: "Obsidian Drape Cape Gown",
      basePrice: 42000,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80",
    },
  ];

  const fabrics = [
    { name: "Biella Super 160s Merino Wool", priceExtra: 9000, origin: "Biella, Italy" },
    { name: "Mongolian Pure Cashmere", priceExtra: 14000, origin: "Ulaanbaatar, Mongolia" },
    { name: "Banarasi Handloom Katan Silk", priceExtra: 12000, origin: "Varanasi, India" },
    { name: "Heavy Weight Habotai Silk", priceExtra: 7500, origin: "Lyon, France" },
  ];

  const colors = [
    { name: "Imperial Burgundy", hex: "#7F1D3A" },
    { name: "Obsidian Charcoal", hex: "#18181B" },
    { name: "Champagne Gold", hex: "#D4AF37" },
    { name: "Emerald Royale", hex: "#065F46" },
    { name: "Midnight Sapphire", hex: "#1E3A8A" },
    { name: "Ivory Cream", hex: "#F5F5F0" },
  ];

  const lapels = [
    "Peak Lapel in Silk Facing",
    "Architectural Shawl Collar",
    "Heritage Mandarin Bandhgala",
    "Slim Notch Lapel with Hand Pick-Stitching",
  ];

  const buttonOptions = [
    "Horn Buttons with Gold Rim",
    "Mother of Pearl Natural Shell",
    "Covered Silk Buttons",
    "Matte Obsidian Enamel",
  ];

  const totalPrice = silhouette.basePrice + fabric.priceExtra + (monogram ? 1500 : 0);

  const handleCommission = () => {
    toast.success(
      `Bespoke Commission #${Date.now().toString().slice(-4)} created! Master Tailor assigned for initial pattern draft.`
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Scissors className="w-3.5 h-3.5" />
            <span>Haute Couture Atelier</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">Custom Bespoke Studio</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Design one-of-a-kind bespoke creations tailored to your exact measurements with world-class artisans.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-charcoal/50 block">Commission Estimate</span>
            <span className="font-display text-2xl font-medium text-charcoal">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between bg-white border border-charcoal/10 p-4 overflow-x-auto scrollbar-none">
        {[
          { step: 1, label: "Silhouette" },
          { step: 2, label: "Artisan Fabric" },
          { step: 3, label: "Color Palette" },
          { step: 4, label: "Lapel & Collar" },
          { step: 5, label: "Monogram & Accents" },
          { step: 6, label: "Atelier Review" },
        ].map((s) => (
          <button
            key={s.step}
            onClick={() => setCurrentStep(s.step)}
            className={`flex items-center gap-2 px-3 py-1.5 transition-all text-xs whitespace-nowrap ${
              currentStep === s.step
                ? "text-burgundy font-semibold border-b-2 border-burgundy"
                : currentStep > s.step
                ? "text-emerald-700 font-medium"
                : "text-charcoal/40"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                currentStep === s.step
                  ? "bg-burgundy text-white"
                  : currentStep > s.step
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-charcoal/10 text-charcoal/60"
              }`}
            >
              {currentStep > s.step ? "✓" : s.step}
            </span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Interactive Configurator (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Silhouette */}
          {currentStep === 1 && (
            <div className="bg-white border border-charcoal/10 p-6 space-y-4">
              <h3 className="font-display text-xl font-medium text-charcoal">Select Garment Silhouette</h3>
              <p className="text-xs text-charcoal/60">
                Foundational architecture calibrated to drape effortlessly over your body geometry.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {silhouettes.map((sil) => (
                  <div
                    key={sil.id}
                    onClick={() => setSilhouette(sil)}
                    className={`p-4 border cursor-pointer flex flex-col justify-between space-y-3 transition-all ${
                      silhouette.id === sil.id
                        ? "border-charcoal bg-warm-white ring-1 ring-charcoal"
                        : "border-charcoal/10 hover:border-charcoal/30"
                    }`}
                  >
                    <div className="aspect-[4/3] bg-charcoal/5 overflow-hidden">
                      <img src={sil.image} alt={sil.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-medium text-charcoal">{sil.name}</h4>
                      <span className="text-xs font-mono font-semibold text-burgundy block mt-1">
                        Base: ₹{sil.basePrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Fabric */}
          {currentStep === 2 && (
            <div className="bg-white border border-charcoal/10 p-6 space-y-4">
              <h3 className="font-display text-xl font-medium text-charcoal">Choose Luxury Fabric</h3>
              <p className="text-xs text-charcoal/60">
                Ethically woven, certified raw silks and merino weaves from legacy European & Indian mills.
              </p>
              <div className="space-y-3 pt-2">
                {fabrics.map((fab) => (
                  <div
                    key={fab.name}
                    onClick={() => setFabric(fab)}
                    className={`p-4 border cursor-pointer flex items-center justify-between transition-all ${
                      fabric.name === fab.name
                        ? "border-charcoal bg-warm-white ring-1 ring-charcoal"
                        : "border-charcoal/10 hover:border-charcoal/30"
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-display font-medium text-charcoal">{fab.name}</h4>
                      <span className="text-xs text-charcoal/50 font-serif italic">Mill origin: {fab.origin}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-semibold text-charcoal">
                        +₹{fab.priceExtra.toLocaleString("en-IN")}
                      </span>
                      {fabric.name === fab.name && (
                        <span className="text-[10px] text-emerald-700 font-semibold block uppercase">Selected</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Color Palette */}
          {currentStep === 3 && (
            <div className="bg-white border border-charcoal/10 p-6 space-y-4">
              <h3 className="font-display text-xl font-medium text-charcoal">Select Atelier Colorway</h3>
              <p className="text-xs text-charcoal/60">
                Pigments formulated to maintain vibrant depth under both daylight and evening chandeliers.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {colors.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => setColor(c)}
                    className={`p-3 border cursor-pointer flex items-center gap-3 transition-all ${
                      color.name === c.name
                        ? "border-charcoal bg-warm-white ring-1 ring-charcoal"
                        : "border-charcoal/10 hover:border-charcoal/30"
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full shrink-0 border border-charcoal/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-charcoal block truncate">{c.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Lapel & Collar */}
          {currentStep === 4 && (
            <div className="bg-white border border-charcoal/10 p-6 space-y-4">
              <h3 className="font-display text-xl font-medium text-charcoal">Lapel, Collar & Buttons</h3>
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-2">
                    Collar / Lapel Cut
                  </label>
                  <div className="space-y-2">
                    {lapels.map((l) => (
                      <div
                        key={l}
                        onClick={() => setLapel(l)}
                        className={`p-3 border text-xs cursor-pointer flex items-center justify-between ${
                          lapel === l ? "border-charcoal bg-warm-white font-semibold" : "border-charcoal/10"
                        }`}
                      >
                        <span>{l}</span>
                        {lapel === l && <Check className="w-4 h-4 text-burgundy" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-2">
                    Hardware & Buttons
                  </label>
                  <div className="space-y-2">
                    {buttonOptions.map((b) => (
                      <div
                        key={b}
                        onClick={() => setButtons(b)}
                        className={`p-3 border text-xs cursor-pointer flex items-center justify-between ${
                          buttons === b ? "border-charcoal bg-warm-white font-semibold" : "border-charcoal/10"
                        }`}
                      >
                        <span>{b}</span>
                        {buttons === b && <Check className="w-4 h-4 text-burgundy" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Monogram & Accents */}
          {currentStep === 5 && (
            <div className="bg-white border border-charcoal/10 p-6 space-y-4">
              <h3 className="font-display text-xl font-medium text-charcoal">Bespoke Monogram & Notes</h3>
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                    Embroidered Initials / Monogram (+₹1,500)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="e.g. P.S."
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-base font-serif uppercase tracking-widest"
                  />
                  <span className="text-[10px] text-charcoal/50 mt-1 block">
                    Embroidered inside right chest pocket facing
                  </span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                    Monogram Thread Color
                  </label>
                  <div className="flex gap-2">
                    {["Champagne Gold", "Sterling Silver", "Burgundy Tone", "Obsidian Black"].map((tc) => (
                      <button
                        key={tc}
                        type="button"
                        onClick={() => setThreadColor(tc)}
                        className={`px-3 py-1.5 text-xs border ${
                          threadColor === tc ? "border-charcoal bg-charcoal text-white" : "border-charcoal/20"
                        }`}
                      >
                        {tc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                    Special Tailoring Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={tailorNotes}
                    onChange={(e) => setTailorNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                    placeholder="Provide any specific requests (e.g., ticket pocket, extra seam allowance)..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Review & Finalize */}
          {currentStep === 6 && (
            <div className="bg-white border border-charcoal/10 p-6 space-y-4">
              <h3 className="font-display text-xl font-medium text-charcoal">Atelier Commission Overview</h3>
              <p className="text-xs text-charcoal/60">
                Confirm your bespoke specifications. Once submitted, our master patternmaker will draft the digital cutting layout.
              </p>
              <div className="bg-warm-white p-4 border border-charcoal/10 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-charcoal/10">
                  <span className="text-charcoal/60">Silhouette:</span>
                  <span className="font-semibold text-charcoal">{silhouette.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal/10">
                  <span className="text-charcoal/60">Fabric:</span>
                  <span className="font-semibold text-charcoal">{fabric.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal/10">
                  <span className="text-charcoal/60">Colorway:</span>
                  <span className="font-semibold text-charcoal">{color.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal/10">
                  <span className="text-charcoal/60">Lapel & Collar:</span>
                  <span className="font-semibold text-charcoal">{lapel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-charcoal/10">
                  <span className="text-charcoal/60">Hardware:</span>
                  <span className="font-semibold text-charcoal">{buttons}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal/60">Monogram:</span>
                  <span className="font-semibold text-charcoal">{monogram ? `"${monogram}" in ${threadColor}` : "None"}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Includes complimentary fitting session & 100% bespoke fit guarantee.</span>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-charcoal/20 disabled:opacity-30 disabled:cursor-not-allowed hover:border-charcoal flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep((p) => Math.min(6, p + 1))}
                className="px-6 py-2 bg-charcoal text-white hover:bg-burgundy text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
              >
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleCommission}
                className="px-8 py-2.5 bg-burgundy hover:bg-burgundy/90 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Place Bespoke Commission</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Live Spec Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-charcoal/10 p-6 space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 block">
              Live Specification
            </span>
            <div className="relative aspect-[3/4] bg-charcoal/5 overflow-hidden border border-charcoal/5">
              <img src={silhouette.image} alt={silhouette.name} className="w-full h-full object-cover" />
              <div
                className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: color.hex }}
              />
              {monogram && (
                <div className="absolute bottom-3 left-3 bg-charcoal/90 text-white px-2.5 py-1 text-xs font-serif tracking-widest">
                  {monogram}
                </div>
              )}
            </div>

            <div>
              <h4 className="font-display text-base font-medium text-charcoal">{silhouette.name}</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">{color.name} • {fabric.name}</p>
            </div>

            <div className="pt-3 border-t border-charcoal/10 space-y-1.5 text-xs text-charcoal/70">
              <div className="flex justify-between">
                <span>Base Silhouette:</span>
                <span>₹{silhouette.basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Artisan Fabric Upgrade:</span>
                <span>+₹{fabric.priceExtra.toLocaleString("en-IN")}</span>
              </div>
              {monogram && (
                <div className="flex justify-between">
                  <span>Custom Monogram:</span>
                  <span>+₹1,500</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-charcoal text-sm pt-2 border-t border-charcoal/10">
                <span>Total Commission:</span>
                <span className="font-display text-base text-burgundy">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerCustomStudio;
