import { useState } from "react";
import { DollarSign, Save, Percent, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_BRAND_PRODUCTS, BrandProductItem } from "@/constants/dashboardData";

export const BrandPricing = () => {
  const [items, setItems] = useState<BrandProductItem[]>(INITIAL_BRAND_PRODUCTS);
  const [globalDiscountPercent, setGlobalDiscountPercent] = useState("");

  const handlePriceChange = (id: string, newPrice: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, price: Math.max(0, newPrice) } : i))
    );
  };

  const handleApplyGlobalDiscount = () => {
    const pct = Number(globalDiscountPercent);
    if (!pct || pct <= 0 || pct > 70) {
      toast.error("Please enter a valid discount percentage between 1% and 70%.");
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        const base = item.originalPrice || item.price;
        const discounted = Math.round(base * (1 - pct / 100));
        return {
          ...item,
          originalPrice: base,
          price: discounted
        };
      })
    );
    toast.success(`Applied ${pct}% promotional pricing across all catalog items.`);
  };

  const handleSaveAll = () => {
    toast.success("Updated catalog pricing synced live to Betees marketplace.");
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Catalog Pricing & Margins</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Configure retail prices, markdown percentages, and promotional campaign discounts.
          </p>
        </div>
        <button onClick={handleSaveAll} className="btn-primary self-start text-xs">
          <Save size={14} /> Save All Pricing
        </button>
      </div>

      {/* Global Discount Utility Bar */}
      <div className="bg-white p-5 shadow-editorial flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-charcoal">Bulk Markdown / Flash Sale Utility</h3>
          <p className="text-xs text-on-surface-variant">Apply a uniform seasonal discount across all active lines</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="number"
              min={1}
              max={70}
              value={globalDiscountPercent}
              onChange={(e) => setGlobalDiscountPercent(e.target.value)}
              placeholder="e.g. 15%"
              className="w-28 bg-surface-low border border-outline-variant pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-charcoal"
            />
          </div>
          <button
            onClick={handleApplyGlobalDiscount}
            className="btn-secondary py-1.5 px-3 text-xs"
          >
            Apply to All
          </button>
        </div>
      </div>

      {/* Pricing Matrix Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">SKU & Item</th>
              <th className="p-4">Category</th>
              <th className="p-4">List Price (Original)</th>
              <th className="p-4">Current Selling Price (₹)</th>
              <th className="p-4">Effective Markdown</th>
              <th className="p-4 text-right">Estimated Net Payout (90%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {items.map((item) => {
              const orig = item.originalPrice || item.price;
              const discountPct = Math.round(((orig - item.price) / orig) * 100);
              const netToBrand = Math.round(item.price * 0.9);

              return (
                <tr key={item.id} className="hover:bg-surface-low/30 transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-charcoal block text-xs">{item.name}</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">{item.sku}</span>
                  </td>
                  <td className="p-4 text-xs text-charcoal">{item.category}</td>
                  <td className="p-4 font-display text-xs text-on-surface-variant">
                    {formatINR(orig)}
                  </td>
                  <td className="p-4">
                    <div className="inline-flex items-center gap-1">
                      <span className="font-bold text-xs text-charcoal">₹</span>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handlePriceChange(item.id, Number(e.target.value))}
                        className="w-28 bg-surface-low border border-outline-variant px-2 py-1 text-xs font-mono font-bold focus:outline-none focus:border-charcoal"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    {discountPct > 0 ? (
                      <span className="bg-burgundy/10 text-burgundy text-[10px] font-bold px-2 py-0.5">
                        {discountPct}% OFF
                      </span>
                    ) : (
                      <span className="text-[10px] text-on-surface-variant font-medium">Standard MRP</span>
                    )}
                  </td>
                  <td className="p-4 text-right font-display font-semibold text-emerald">
                    {formatINR(netToBrand)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
