import { useState } from "react";
import { Ruler, CheckCircle2, ShieldCheck, Download, RefreshCw, Sparkles, HelpCircle, Info } from "lucide-react";
import { toast } from "sonner";

export const SizeAssistant = () => {
  const [measurements, setMeasurements] = useState({
    chest: "39.5",
    waist: "32.0",
    hips: "38.0",
    shoulder: "18.2",
    neck: "15.5",
    sleeve: "33.5",
    inseam: "31.5",
    height: "178",
    weight: "72",
    fitPreference: "tailored", // slim, tailored, relaxed
    unit: "inches" as "inches" | "cm",
  });

  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (field: string, value: string) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    toast.success("Bespoke measurements synchronized across all designer ateliers");
  };

  const handleDownloadSheet = () => {
    toast.success("Downloading Atelier Master Tailoring Specification Sheet (PDF)...");
  };

  // Dynamic calculated sizing based on chest & waist
  const chestVal = parseFloat(measurements.chest) || 40;
  const waistVal = parseFloat(measurements.waist) || 32;

  const jacketSize = chestVal <= 37 ? "36R" : chestVal <= 39 ? "38R" : chestVal <= 41 ? "40R" : chestVal <= 43 ? "42R" : "44R";
  const shirtSize = chestVal <= 38 ? "S / 38" : chestVal <= 41 ? "M / 40" : "L / 42";
  const trouserSize = `${Math.round(waistVal)} / ${Math.round(parseFloat(measurements.inseam) || 32)}`;
  const ethnicSize = chestVal <= 38 ? "38 (Medium)" : chestVal <= 41 ? "40 (Large)" : "42 (XL)";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Ruler className="w-3.5 h-3.5" />
            <span>AI Anatomical Profiling</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">Size & Fit Assistant</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Millimeter-precise digital fit profile ensuring your bespoke commissions drape flawlessly without repeat fittings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadSheet}
            className="flex items-center gap-2 border border-charcoal/20 hover:border-charcoal bg-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-charcoal transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Tailor Sheet</span>
          </button>
        </div>
      </div>

      {/* Top Banner: Verification & AI Fit Match */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-charcoal text-white p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-gold text-xs uppercase tracking-widest font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Tailor Verified</span>
            </div>
            <h3 className="font-display text-xl">Atelier Accuracy: 99.4%</h3>
            <p className="text-xs text-white/70">
              Verified by Master Tailor Suresh Nair during your flagship atelier fitting on Aug 12, 2026.
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
            <span>Profile ID: FIT-9824-M</span>
            <span className="text-emerald-400 font-semibold">Active & Synced</span>
          </div>
        </div>

        <div className="bg-white border border-charcoal/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-charcoal/50 mb-2">
              <span className="font-semibold uppercase tracking-wider">Recommended Sizes</span>
              <span className="text-burgundy font-semibold">Betees AI Engine</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-warm-white p-2.5 border border-charcoal/5">
                <span className="text-[10px] text-charcoal/50 uppercase block">Jacket / Tuxedo</span>
                <span className="text-base font-display font-medium text-charcoal">{jacketSize}</span>
              </div>
              <div className="bg-warm-white p-2.5 border border-charcoal/5">
                <span className="text-[10px] text-charcoal/50 uppercase block">Dress Shirt</span>
                <span className="text-base font-display font-medium text-charcoal">{shirtSize}</span>
              </div>
              <div className="bg-warm-white p-2.5 border border-charcoal/5">
                <span className="text-[10px] text-charcoal/50 uppercase block">Trousers (W/L)</span>
                <span className="text-base font-display font-medium text-charcoal">{trouserSize}</span>
              </div>
              <div className="bg-warm-white p-2.5 border border-charcoal/5">
                <span className="text-[10px] text-charcoal/50 uppercase block">Sherwani / Ethnic</span>
                <span className="text-base font-display font-medium text-charcoal">{ethnicSize}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-charcoal/60 mt-3 italic flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-burgundy shrink-0" />
            <span>Zero alterations required for 96% of member purchases.</span>
          </p>
        </div>

        <div className="bg-white border border-charcoal/10 p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">Fit Preference</span>
            <h4 className="font-display text-lg text-charcoal mt-1 capitalize">{measurements.fitPreference} Cut</h4>
            <p className="text-xs text-charcoal/60 mt-1">
              Structured drape with natural contouring around the chest and clean tapered lines along the waistline.
            </p>
          </div>
          <div className="flex gap-2 pt-4">
            {(["slim", "tailored", "relaxed"] as const).map((pref) => (
              <button
                key={pref}
                type="button"
                onClick={() => handleChange("fitPreference", pref)}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold border transition-all ${
                  measurements.fitPreference === pref
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-charcoal/20 text-charcoal hover:border-charcoal/50"
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Measurements Form */}
      <div className="bg-white border border-charcoal/10 p-6 md:p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
            <div>
              <h2 className="font-display text-xl font-medium text-charcoal">Precision Measurements</h2>
              <p className="text-xs text-charcoal/60 mt-0.5">
                Updated measurements instantly calibrate tailor patterns across all commissions.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-warm-white p-1 border border-charcoal/10">
              <button
                type="button"
                onClick={() => handleChange("unit", "inches")}
                className={`px-3 py-1 text-xs font-semibold uppercase ${
                  measurements.unit === "inches" ? "bg-charcoal text-white" : "text-charcoal/60"
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => handleChange("unit", "cm")}
                className={`px-3 py-1 text-xs font-semibold uppercase ${
                  measurements.unit === "cm" ? "bg-charcoal text-white" : "text-charcoal/60"
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                Chest / Bust ({measurements.unit})
              </label>
              <input
                type="number"
                step="0.1"
                value={measurements.chest}
                onChange={(e) => handleChange("chest", e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
              />
              <span className="text-[10px] text-charcoal/50 mt-1 block">Fullest point across shoulder blades</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                Natural Waist ({measurements.unit})
              </label>
              <input
                type="number"
                step="0.1"
                value={measurements.waist}
                onChange={(e) => handleChange("waist", e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
              />
              <span className="text-[10px] text-charcoal/50 mt-1 block">Narrowest part, usually at navel</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                Hips ({measurements.unit})
              </label>
              <input
                type="number"
                step="0.1"
                value={measurements.hips}
                onChange={(e) => handleChange("hips", e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
              />
              <span className="text-[10px] text-charcoal/50 mt-1 block">Widest point around seat</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                Shoulder Span ({measurements.unit})
              </label>
              <input
                type="number"
                step="0.1"
                value={measurements.shoulder}
                onChange={(e) => handleChange("shoulder", e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
              />
              <span className="text-[10px] text-charcoal/50 mt-1 block">From left to right acromion bone</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                Neck Circumference ({measurements.unit})
              </label>
              <input
                type="number"
                step="0.1"
                value={measurements.neck}
                onChange={(e) => handleChange("neck", e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
              />
              <span className="text-[10px] text-charcoal/50 mt-1 block">Base of neck + 1 finger ease</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                Sleeve Length ({measurements.unit})
              </label>
              <input
                type="number"
                step="0.1"
                value={measurements.sleeve}
                onChange={(e) => handleChange("sleeve", e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
              />
              <span className="text-[10px] text-charcoal/50 mt-1 block">Center back neck to wrist</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                Trouser Inseam ({measurements.unit})
              </label>
              <input
                type="number"
                step="0.1"
                value={measurements.inseam}
                onChange={(e) => handleChange("inseam", e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
              />
              <span className="text-[10px] text-charcoal/50 mt-1 block">Inner crotch seam to shoe top</span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                Height (cm)
              </label>
              <input
                type="number"
                value={measurements.height}
                onChange={(e) => handleChange("height", e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
              />
              <span className="text-[10px] text-charcoal/50 mt-1 block">Standing barefoot</span>
            </div>
          </div>

          <div className="pt-4 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-charcoal/60">
              <Info className="w-4 h-4 text-burgundy" />
              <span>Need help measuring? You can schedule a complimentary doorstep measuring session.</span>
            </div>
            <button
              type="submit"
              className="bg-burgundy hover:bg-burgundy/90 text-white px-8 py-3 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & Calibrate Fit Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* Measuring Guide Section */}
      <div className="bg-warm-white border border-charcoal/10 p-6">
        <h3 className="font-display text-lg font-medium text-charcoal mb-3">Master Tailor Advice for Best Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-charcoal/70 leading-relaxed">
          <div className="border-l-2 border-burgundy pl-3">
            <span className="font-semibold text-charcoal block mb-1">Wear Lightweight Attire</span>
            Measure over thin, non-padded clothing or undergarments so dimensions reflect true body geometry without false bulk.
          </div>
          <div className="border-l-2 border-burgundy pl-3">
            <span className="font-semibold text-charcoal block mb-1">Maintain Natural Posture</span>
            Do not hold your breath or push out chest. Stand upright with relaxed shoulders for accurate drape balance.
          </div>
          <div className="border-l-2 border-burgundy pl-3">
            <span className="font-semibold text-charcoal block mb-1">Snug But Comfortable</span>
            The tape should lie flat against skin without digging in or hanging loose. Keep one finger between tape and body.
          </div>
        </div>
      </div>
    </div>
  );
};
export default SizeAssistant;
