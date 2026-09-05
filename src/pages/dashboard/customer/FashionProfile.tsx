import { useState } from "react";
import { Save, Check, UserCheck, Ruler, Sparkles, Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

export const FashionProfile = () => {
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const [measurements, setMeasurements] = useState({
    height: "5'6\" (168 cm)",
    weight: "58 kg",
    bust: "34 inches",
    waist: "28 inches",
    hips: "38 inches",
    shoulder: "15 inches",
    inseam: "30 inches"
  });

  const [preferences, setPreferences] = useState({
    aesthetic: "Quiet Luxury / Old Money",
    undertone: "Warm Autumn (Golden & Honey)",
    fitPreference: "Tailored & Architectural",
    occasions: "Executive Boardroom, Cocktails & Wedding Receptions",
    favoriteFabrics: "Pure Cashmere, Mulberry Silk, Biella Wool, Handloom Tussar",
    favoriteBrands: "Aurelia Couture, Atelier Vesper, House of Rohit Bal"
  });

  const [selectedPalette, setSelectedPalette] = useState([
    { name: "Imperial Burgundy", hex: "#7F1D3A" },
    { name: "Midnight Charcoal", hex: "#18181B" },
    { name: "Muted Rose Gold", hex: "#C08484" },
    { name: "Warm Ivory", hex: "#FAFAF9" },
    { name: "Champagne Tussar", hex: "#E8E6E2" }
  ]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Fashion profile and 3D fit measurements updated!");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">My Fashion & Silhouette Profile</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Your body measurements, chromatic undertones, and aesthetic preferences calibrate our AI stylist.
          </p>
        </div>
        <button onClick={handleSave} className={`btn-primary self-start text-xs ${saved ? "bg-emerald" : ""}`}>
          {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Style Profile</>}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exact Measurements */}
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
              <Ruler size={16} className="text-burgundy" /> Body Silhouette & Measurements
            </h2>
            <p className="text-on-surface-variant text-[11px]">
              These dimensions are securely shared with master tailors when you commission bespoke garments.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Height</label>
                <input
                  type="text"
                  value={measurements.height}
                  onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Weight</label>
                <input
                  type="text"
                  value={measurements.weight}
                  onChange={(e) => setMeasurements({ ...measurements, weight: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Bust / Chest</label>
                <input
                  type="text"
                  value={measurements.bust}
                  onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Waist</label>
                <input
                  type="text"
                  value={measurements.waist}
                  onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Hips</label>
                <input
                  type="text"
                  value={measurements.hips}
                  onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Shoulder Width</label>
                <input
                  type="text"
                  value={measurements.shoulder}
                  onChange={(e) => setMeasurements({ ...measurements, shoulder: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Trouser Inseam</label>
                <input
                  type="text"
                  value={measurements.inseam}
                  onChange={(e) => setMeasurements({ ...measurements, inseam: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>
            </div>
          </div>

          {/* Aesthetic & Color Calibration */}
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
              <Sparkles size={16} className="text-burgundy" /> Aesthetic Calibration & Undertones
            </h2>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Primary Style Aesthetic</label>
              <input
                type="text"
                value={preferences.aesthetic}
                onChange={(e) => setPreferences({ ...preferences, aesthetic: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Skin Undertone</label>
                <input
                  type="text"
                  value={preferences.undertone}
                  onChange={(e) => setPreferences({ ...preferences, undertone: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Cut & Fit Silhouette</label>
                <input
                  type="text"
                  value={preferences.fitPreference}
                  onChange={(e) => setPreferences({ ...preferences, fitPreference: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Frequent Dressing Occasions</label>
              <input
                type="text"
                value={preferences.occasions}
                onChange={(e) => setPreferences({ ...preferences, occasions: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-2">Recommended Chromatic Palette</label>
              <div className="flex flex-wrap gap-2">
                {selectedPalette.map((color) => (
                  <div key={color.name} className="flex items-center gap-2 p-1.5 bg-surface-low border border-outline-variant">
                    <div className="w-5 h-5 border border-outline-color shadow-xs" style={{ backgroundColor: color.hex }} />
                    <span className="text-[11px] font-medium text-charcoal">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Brands and Fabrics */}
        <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
          <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
            <Heart size={16} className="text-burgundy" /> Brand & Textile Affinities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Preferred Luxury Ateliers</label>
              <input
                type="text"
                value={preferences.favoriteBrands}
                onChange={(e) => setPreferences({ ...preferences, favoriteBrands: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Preferred Natural Fabrics</label>
              <input
                type="text"
                value={preferences.favoriteFabrics}
                onChange={(e) => setPreferences({ ...preferences, favoriteFabrics: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
