import { useState } from "react";
import { Truck, Save, Check, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface ShippingZone {
  id: string;
  name: string;
  regions: string;
  rate: number;
  deliveryDays: string;
  freeThreshold: number;
}

const INITIAL_ZONES: ShippingZone[] = [
  { id: "Z-1", name: "Metro Express (Tier 1)", regions: "Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata", rate: 0, deliveryDays: "2-3 Days", freeThreshold: 0 },
  { id: "Z-2", name: "Rest of India (Tier 2 & 3)", regions: "All other state capitals and districts", rate: 299, deliveryDays: "4-5 Days", freeThreshold: 2999 },
  { id: "Z-3", name: "International Priority", regions: "UAE, UK, USA, Singapore", rate: 2500, deliveryDays: "5-7 Days", freeThreshold: 50000 },
];

export const BrandShipping = () => {
  const [zones, setZones] = useState<ShippingZone[]>(INITIAL_ZONES);
  const [courierPartners, setCourierPartners] = useState({
    bluedart: true,
    delhivery: true,
    dtdc: false,
    fedexInternational: true
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Shipping zones and courier partner rates saved.");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Shipping & Logistics Configuration</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Configure delivery turnaround times, shipping rates, and integrated domestic courier partners.
          </p>
        </div>
        <button onClick={handleSave} className={`btn-primary self-start text-xs ${saved ? "bg-emerald" : ""}`}>
          {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Logistics</>}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Shipping Zones Card */}
        <div className="bg-white shadow-editorial p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-charcoal flex items-center gap-2">
              <Truck size={18} className="text-burgundy" /> Regional Delivery Zones
            </h2>
          </div>

          <div className="space-y-4">
            {zones.map((zone, idx) => (
              <div key={zone.id} className="p-4 bg-surface-low/50 border border-outline-variant space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-semibold text-charcoal text-sm">{zone.name}</span>
                  <span className="text-xs text-burgundy font-medium">Estimated: {zone.deliveryDays}</span>
                </div>
                <p className="text-xs text-on-surface-variant">{zone.regions}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div>
                    <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Standard Rate (₹)</label>
                    <input
                      type="number"
                      value={zone.rate}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setZones((prev) =>
                          prev.map((z) => (z.id === zone.id ? { ...z, rate: val } : z))
                        );
                      }}
                      className="input-editorial w-full font-bold"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Free Shipping Above (₹)</label>
                    <input
                      type="number"
                      value={zone.freeThreshold}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setZones((prev) =>
                          prev.map((z) => (z.id === zone.id ? { ...z, freeThreshold: val } : z))
                        );
                      }}
                      className="input-editorial w-full font-bold"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Delivery Lead Time</label>
                    <input
                      type="text"
                      value={zone.deliveryDays}
                      onChange={(e) => {
                        const val = e.target.value;
                        setZones((prev) =>
                          prev.map((z) => (z.id === zone.id ? { ...z, deliveryDays: val } : z))
                        );
                      }}
                      className="input-editorial w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courier Partners Integrations */}
        <div className="bg-white shadow-editorial p-6 space-y-4">
          <h2 className="font-display text-lg text-charcoal">Integrated Logistics Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[
              { key: "bluedart", name: "BlueDart Air Express", desc: "Automated AWB generation & priority pickup" },
              { key: "delhivery", name: "Delhivery Surface & Express", desc: "PAN-India reach with OTP on delivery" },
              { key: "dtdc", name: "DTDC Premium Courier", desc: "Economical ground shipping across Tier 2 & 3" },
              { key: "fedexInternational", name: "FedEx Priority International", desc: "Cross-border luxury customs clearance" },
            ].map(({ key, name, desc }) => (
              <div key={key} className="p-4 bg-surface-low border border-outline-variant flex items-center justify-between">
                <div>
                  <p className="font-semibold text-charcoal text-sm">{name}</p>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">{desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={courierPartners[key as keyof typeof courierPartners]}
                  onChange={() =>
                    setCourierPartners((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
                  }
                  className="accent-burgundy w-4 h-4 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
