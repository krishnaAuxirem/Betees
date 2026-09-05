import { useState } from "react";
import { Link } from "react-router-dom";
import { Monitor, Sparkles, RefreshCw, Eye, Sliders, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/constants/data";

interface AvatarModel {
  id: string;
  name: string;
  gender: string;
  height: string;
  build: string;
  image: string;
}

export const CustomerTryOn = () => {
  const models: AvatarModel[] = [
    {
      id: "m1",
      name: "Model Priya (Your Custom Scan)",
      gender: "Female",
      height: "5'8\" (173cm)",
      build: "Hourglass Fit",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&q=80",
    },
    {
      id: "m2",
      name: "Model Ananya (Athletic)",
      gender: "Female",
      height: "5'9\" (175cm)",
      build: "Athletic Lean",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop&q=80",
    },
    {
      id: "m3",
      name: "Model Arjun (Tailored)",
      gender: "Male",
      height: "6'0\" (183cm)",
      build: "Broad Shoulder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    },
  ];

  const tryOnGarments = PRODUCTS.slice(0, 5);

  const [selectedModel, setSelectedModel] = useState<AvatarModel>(models[0]);
  const [selectedGarment, setSelectedGarment] = useState(tryOnGarments[0]);
  const [angle, setAngle] = useState<"front" | "side" | "back">("front");
  const [showTensionMap, setShowTensionMap] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      toast.success(`Generated 3D cloth physics simulation for ${selectedGarment.name}`);
    }, 900);
  };

  const handleOrderBespoke = () => {
    toast.success(`Commission requested for ${selectedGarment.name} calibrated to your 3D digital measurements.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Monitor className="w-3.5 h-3.5" />
            <span>Virtual Fitting Room</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">AI Virtual Try-On</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Simulate realistic fabric drape, shoulder tension, and hemlines across digital mannequins before placing an order.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/customer/size-assistant"
            className="border border-charcoal/20 hover:border-charcoal bg-white px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-charcoal transition-colors"
          >
            Adjust Measurements
          </Link>
          <button
            onClick={handleOrderBespoke}
            className="bg-burgundy text-white hover:bg-burgundy/90 text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-colors flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Commission This Fit</span>
          </button>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Garment & Avatar Pickers (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Avatar Selector */}
          <div className="bg-white border border-charcoal/10 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/60">
                1. Select Digital Avatar
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5">
                Calibrated
              </span>
            </div>
            <div className="space-y-2">
              {models.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModel(mod)}
                  className={`p-3 border cursor-pointer flex items-center gap-3 transition-all ${
                    selectedModel.id === mod.id
                      ? "border-charcoal bg-warm-white"
                      : "border-charcoal/10 hover:border-charcoal/30"
                  }`}
                >
                  <img src={mod.image} alt={mod.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs font-semibold text-charcoal">{mod.name}</h5>
                    <p className="text-[10px] text-charcoal/60 font-mono mt-0.5">
                      {mod.height} • {mod.build}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Garment Selector */}
          <div className="bg-white border border-charcoal/10 p-5 space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/60 block">
              2. Select Garment to Drape
            </span>
            <div className="space-y-2">
              {tryOnGarments.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => setSelectedGarment(prod)}
                  className={`p-2.5 border cursor-pointer flex items-center gap-3 transition-all ${
                    selectedGarment.id === prod.id
                      ? "border-burgundy bg-burgundy/5"
                      : "border-charcoal/10 hover:border-charcoal/30"
                  }`}
                >
                  <img src={prod.image} alt={prod.name} className="w-12 h-14 object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-charcoal/50 block">
                      {prod.brand}
                    </span>
                    <h5 className="text-xs font-display text-charcoal truncate">{prod.name}</h5>
                    <span className="text-[11px] font-semibold text-charcoal block mt-0.5 font-mono">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: 3D Simulation Viewer (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-charcoal/10 p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Top Bar inside Viewer */}
          <div className="flex items-center justify-between pb-3 border-b border-charcoal/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                Virtual Mirror Active
              </span>
            </div>
            <div className="flex items-center gap-1 bg-warm-white p-0.5 border border-charcoal/10 text-xs">
              {(["front", "side", "back"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAngle(a)}
                  className={`px-2.5 py-1 text-[11px] font-semibold uppercase ${
                    angle === a ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* Virtual Mirror Stage */}
          <div className="relative aspect-[3/4] my-4 bg-charcoal/5 flex items-center justify-center overflow-hidden border border-charcoal/5">
            {isSimulating ? (
              <div className="flex flex-col items-center gap-3 text-center p-6">
                <RefreshCw className="w-8 h-8 text-burgundy animate-spin" />
                <div>
                  <h4 className="font-display text-base font-medium text-charcoal">Calculating Fabric Physics</h4>
                  <p className="text-xs text-charcoal/60 mt-1 font-mono">Draping {selectedGarment.fabric}...</p>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={selectedGarment.image}
                  alt="Draped view"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    angle === "side" ? "scale-x-90" : angle === "back" ? "filter contrast-125" : ""
                  }`}
                />
                {showTensionMap && (
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/25 via-yellow-500/20 to-transparent pointer-events-none flex items-center justify-center">
                    <div className="border border-emerald-400/60 p-2 bg-charcoal/80 text-white text-[10px] uppercase font-mono">
                      Optimal Shoulder Drape: 0.2% variance
                    </div>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-sm text-white text-[10px] px-2 py-1 font-mono uppercase">
                  {selectedGarment.brand} • {angle} view
                </div>
              </>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between pt-3 border-t border-charcoal/10">
            <button
              onClick={() => setShowTensionMap(!showTensionMap)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border transition-all ${
                showTensionMap
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                  : "border-charcoal/20 text-charcoal/70 hover:border-charcoal"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showTensionMap ? "Hide Tension Map" : "Show Fit Tension Map"}</span>
            </button>

            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="bg-charcoal text-white hover:bg-burgundy px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
              <span>Re-Simulate</span>
            </button>
          </div>
        </div>

        {/* Right: Fabric Drape Analytics (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-charcoal/10 p-5 space-y-4">
            <div className="flex items-center gap-1.5 text-burgundy text-xs uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Garment Analysis</span>
            </div>
            <div>
              <h4 className="font-display text-lg font-medium text-charcoal">{selectedGarment.name}</h4>
              <p className="text-xs text-charcoal/60 mt-1">{selectedGarment.fabric}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-charcoal/10 text-xs">
              <div>
                <div className="flex justify-between text-charcoal/70 mb-1">
                  <span>Chest & Lapel Ease</span>
                  <span className="font-semibold text-charcoal">+1.5 cm (Ideal)</span>
                </div>
                <div className="w-full bg-charcoal/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-charcoal/70 mb-1">
                  <span>Waist Line Symmetry</span>
                  <span className="font-semibold text-charcoal">99% True</span>
                </div>
                <div className="w-full bg-charcoal/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[99%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-charcoal/70 mb-1">
                  <span>Hemline Drop</span>
                  <span className="font-semibold text-charcoal">Floor +1.0 in</span>
                </div>
                <div className="w-full bg-charcoal/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-burgundy h-full w-[70%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-charcoal text-white p-5 space-y-3">
            <span className="text-[10px] text-rose-gold uppercase tracking-widest font-semibold block">
              Bespoke Assurance
            </span>
            <h5 className="font-display text-base">Atelier Fit Guarantee</h5>
            <p className="text-xs text-white/70 leading-relaxed">
              Every bespoke piece commissioned through virtual try-on comes with one complimentary master tailor doorstep adjustment if required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerTryOn;
