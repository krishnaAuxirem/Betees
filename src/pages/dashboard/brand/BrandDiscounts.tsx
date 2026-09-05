import { useState } from "react";
import { Plus, Tag, Trash2, Check, X, Calendar, Percent } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_BRAND_COUPONS, BrandCouponItem } from "@/constants/dashboardData";

export const BrandDiscounts = () => {
  const [coupons, setCoupons] = useState<BrandCouponItem[]>(INITIAL_BRAND_COUPONS);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    value: "15",
    minSpend: "20000",
    expiryDate: "2026-11-30",
    status: "active" as "active" | "expired" | "draft"
  });

  const handleDelete = (id: string, code: string) => {
    if (window.confirm(`Delete promotion "${code}"?`)) {
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      toast.success(`Coupon code ${code} deleted.`);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.value) return;

    const newCoupon: BrandCouponItem = {
      id: `CP-${Date.now()}`,
      code: formData.code.toUpperCase().trim(),
      discountType: formData.discountType,
      value: Number(formData.value),
      minSpend: Number(formData.minSpend) || 0,
      expiryDate: formData.expiryDate,
      status: formData.status,
      redemptions: 0
    };

    setCoupons([newCoupon, ...coupons]);
    toast.success(`Promotional code ${newCoupon.code} activated successfully!`);
    setModalOpen(false);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Discounts & Promotions</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Create coupon voucher codes, manage flash discount campaigns, and monitor customer redemptions.
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary self-start text-xs">
          <Plus size={14} /> Create Coupon Code
        </button>
      </div>

      {/* Coupon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.id} className="bg-white shadow-editorial p-5 flex flex-col justify-between space-y-4 border border-outline-variant">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-burgundy bg-burgundy/10 px-2 py-1 tracking-wider">
                  {c.code}
                </span>
                <span className="text-[10px] uppercase font-bold bg-emerald/10 text-emerald px-2 py-0.5">
                  {c.status}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-charcoal">
                {c.discountType === "percentage" ? `${c.value}% OFF` : `Flat ${formatINR(c.value)} OFF`}
              </h3>
              <p className="text-xs text-on-surface-variant">
                Minimum Cart Spend: <strong className="text-charcoal font-semibold">{formatINR(c.minSpend)}</strong>
              </p>
              <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
                <Calendar size={12} /> Valid Until: {c.expiryDate}
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">
                Used: <strong className="text-charcoal">{c.redemptions} times</strong>
              </span>
              <button
                onClick={() => handleDelete(c.id, c.code)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove Promo"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create Coupon */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-xl text-charcoal">Create Coupon Code</h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4 text-xs">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Coupon Voucher Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DIWALI25"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="input-editorial w-full font-mono uppercase font-bold text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as "percentage" | "fixed" })}
                    className="input-editorial w-full"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Discount Value *</label>
                  <input
                    type="number"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="input-editorial w-full font-bold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Min. Cart Spend (₹)</label>
                  <input
                    type="number"
                    value={formData.minSpend}
                    onChange={(e) => setFormData({ ...formData, minSpend: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={14} /> Launch Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
