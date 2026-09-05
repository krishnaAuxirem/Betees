import { useState } from "react";
import { Save, Check, Building2, Bell, Shield, Lock } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

export const BrandSettings = () => {
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const [companyInfo, setCompanyInfo] = useState({
    legalEntityName: "Aurelia Luxury Couture Private Limited",
    brandTradeName: "Aurelia Couture",
    gstin: "27AAECK1234F1Z5",
    pan: "AAECK1234F",
    corporateAddress: "102, Maker Chambers V, Nariman Point, Mumbai, Maharashtra 400021",
    authorizedSignatory: user?.name || "Vikram Mehta",
    businessEmail: user?.email || "brand@betees.com",
    contactPhone: "+91 22 2845 9900"
  });

  const [bankDetails, setBankDetails] = useState({
    beneficiaryName: "Aurelia Luxury Couture Pvt Ltd",
    bankName: "Kotak Mahindra Bank",
    accountNumber: "901238491823",
    ifscCode: "KKBK0000958",
    branchName: "Nariman Point Branch, Mumbai"
  });

  const [notifications, setNotifications] = useState({
    orderDispatched: true,
    lowStockWarning: true,
    payoutDisbursed: true,
    weeklyReportDigest: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Brand business details and bank payout settings updated.");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Brand Business & Payout Settings</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Manage GST legal entity credentials, NEFT settlement bank account, and operations alerts.
          </p>
        </div>
        <button onClick={handleSave} className={`btn-primary self-start text-xs ${saved ? "bg-emerald" : ""}`}>
          {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Changes</>}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Legal Business Information */}
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
              <Building2 size={16} className="text-burgundy" /> Legal Entity & Tax Information
            </h2>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Registered Company Name</label>
              <input
                type="text"
                value={companyInfo.legalEntityName}
                onChange={(e) => setCompanyInfo({ ...companyInfo, legalEntityName: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={companyInfo.gstin}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, gstin: e.target.value })}
                  className="input-editorial w-full font-mono uppercase"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Corporate PAN</label>
                <input
                  type="text"
                  value={companyInfo.pan}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, pan: e.target.value })}
                  className="input-editorial w-full font-mono uppercase"
                />
              </div>
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Registered Billing Address</label>
              <textarea
                rows={3}
                value={companyInfo.corporateAddress}
                onChange={(e) => setCompanyInfo({ ...companyInfo, corporateAddress: e.target.value })}
                className="input-editorial w-full text-xs"
              />
            </div>
          </div>

          {/* Bank Account for Marketplace Payouts */}
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
              <Shield size={16} className="text-emerald" /> Settlement Bank Account (NEFT / RTGS)
            </h2>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Beneficiary Name (Account Title)</label>
              <input
                type="text"
                value={bankDetails.beneficiaryName}
                onChange={(e) => setBankDetails({ ...bankDetails, beneficiaryName: e.target.value })}
                className="input-editorial w-full font-semibold"
              />
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Bank Name</label>
              <input
                type="text"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Account Number</label>
                <input
                  type="password"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={bankDetails.ifscCode}
                  onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                  className="input-editorial w-full font-mono uppercase"
                />
              </div>
            </div>
            <div className="p-3 bg-surface-low text-on-surface-variant text-[11px] leading-relaxed">
              Disbursements occur bi-weekly on the 1st and 15th of each calendar month after deducting 10% platform commission and GST.
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
          <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
            <Bell size={16} className="text-burgundy" /> Brand Operations Notifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "orderDispatched", label: "New Order Direct Dispatches", desc: "Real-time alerts on order confirmations" },
              { key: "lowStockWarning", label: "Low Inventory Alerts", desc: "Trigger notifications when SKU stock is below threshold" },
              { key: "payoutDisbursed", label: "Bank Settlement Notifications", desc: "Automated UTR confirmations upon NEFT transfer" },
              { key: "weeklyReportDigest", label: "Weekly Revenue Intelligence Digest", desc: "Curated performance overview with customer basket metrics" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="p-3 bg-surface-low flex items-center justify-between border border-outline-variant">
                <div>
                  <p className="font-semibold text-charcoal">{label}</p>
                  <p className="text-[10px] text-on-surface-variant">{desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[key as keyof typeof notifications]}
                  onChange={() =>
                    setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
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
