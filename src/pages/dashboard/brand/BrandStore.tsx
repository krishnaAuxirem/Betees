import { useState } from "react";
import { Store, Save, Check, Upload, Globe, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";

export const BrandStore = () => {
  const [saved, setSaved] = useState(false);

  const [storeData, setStoreData] = useState({
    name: "Aurelia Couture",
    tagline: "Architectural Outerwear & Hand-Finished Cashmere",
    description: "Founded in Milan with ateliers in Mumbai, Aurelia Couture redefines luxury Indian outerwear through double-breasted cashmere trench coats, structured blazers, and pure mulberry silks.",
    logoUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=200&h=200&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&h=400&fit=crop&q=80",
    website: "https://aureliacouture.com",
    instagram: "@aureliacouture",
    dispatchCity: "Mumbai, Maharashtra",
    returnPolicy: "Complimentary 7-day doorstep trial returns on ready-to-wear pieces. Bespoke custom sizing items include free alterations."
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Brand store profile published to Betees marketplace.");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Storefront Management</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Customize how your brand is showcased to millions of fashion discoverers across Betees.
          </p>
        </div>
        <button onClick={handleSave} className={`btn-primary self-start text-xs ${saved ? "bg-emerald" : ""}`}>
          {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Storefront</>}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Banner and Logo Preview Card */}
        <div className="bg-white shadow-editorial overflow-hidden">
          <div className="relative h-48 sm:h-64 bg-surface-high">
            <img src={storeData.bannerUrl} alt="Store Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white border-2 border-white shadow-lg overflow-hidden shrink-0">
                  <img src={storeData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-white">
                  <h2 className="font-display text-2xl font-bold">{storeData.name}</h2>
                  <p className="text-xs text-rose-gold font-medium">{storeData.tagline}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-surface-low flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-on-surface-variant">Recommended banner size: 1600x500px · Logo: 400x400px</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toast.success("Banner image picker opened")}
                className="btn-outline py-1 px-3 text-xs"
              >
                <Upload size={12} /> Replace Banner
              </button>
              <button
                type="button"
                onClick={() => toast.success("Logo image picker opened")}
                className="btn-outline py-1 px-3 text-xs"
              >
                <Upload size={12} /> Replace Logo
              </button>
            </div>
          </div>
        </div>

        {/* Store Information Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h3 className="font-display text-base font-semibold text-charcoal">Brand Profile Details</h3>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Brand Name *</label>
              <input
                type="text"
                required
                value={storeData.name}
                onChange={(e) => setStoreData({ ...storeData, name: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Tagline / Aesthetic Subheading</label>
              <input
                type="text"
                value={storeData.tagline}
                onChange={(e) => setStoreData({ ...storeData, tagline: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Brand Story & Atelier Description</label>
              <textarea
                rows={4}
                value={storeData.description}
                onChange={(e) => setStoreData({ ...storeData, description: e.target.value })}
                className="input-editorial w-full text-xs"
              />
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Primary Warehouse Dispatch City</label>
              <input
                type="text"
                value={storeData.dispatchCity}
                onChange={(e) => setStoreData({ ...storeData, dispatchCity: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
          </div>

          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h3 className="font-display text-base font-semibold text-charcoal">Online Presence & Customer Policies</h3>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Brand Official Website</label>
              <div className="relative">
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="url"
                  value={storeData.website}
                  onChange={(e) => setStoreData({ ...storeData, website: e.target.value })}
                  className="input-editorial w-full pl-9"
                />
              </div>
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Instagram Handle</label>
              <div className="relative">
                <Instagram size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  value={storeData.instagram}
                  onChange={(e) => setStoreData({ ...storeData, instagram: e.target.value })}
                  className="input-editorial w-full pl-9"
                />
              </div>
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Return & Alteration Policy</label>
              <textarea
                rows={4}
                value={storeData.returnPolicy}
                onChange={(e) => setStoreData({ ...storeData, returnPolicy: e.target.value })}
                className="input-editorial w-full text-xs"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
