import { useState } from "react";
import { Save, Check, Shield, Lock, Bell, Sliders, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const AdminSettings = () => {
  const [saved, setSaved] = useState(false);

  const [platformConfig, setPlatformConfig] = useState({
    commissionRate: "10",
    disputeResolutionDays: "7",
    minPayoutThreshold: "1000",
    maintenanceMode: false,
    requireGSTForBrands: true,
    aiStylistAutoRecommend: true
  });

  const [adminSecurity, setAdminSecurity] = useState({
    twoFactorEnabled: true,
    sessionTimeoutMinutes: "60",
    ipWhitelistActive: false
  });

  const [rolePermissions, setRolePermissions] = useState({
    customerCanReviewDirectly: true,
    designerCanSelfVerify: false,
    brandCanIssueCustomVouchers: true,
    creatorCanApplyToDealsDirectly: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Platform governance settings and security policies updated.");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">System Governance & Platform Policies</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Configure global marketplace take-rates, security parameters, and role-based permissions.
          </p>
        </div>
        <button onClick={handleSave} className={`btn-primary self-start text-xs ${saved ? "bg-emerald" : ""}`}>
          {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save System Settings</>}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Marketplace Parameters */}
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
              <Sliders size={16} className="text-burgundy" /> Marketplace Commercial Parameters
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Platform Commission Fee (%)</label>
                <input
                  type="number"
                  value={platformConfig.commissionRate}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, commissionRate: e.target.value })}
                  className="input-editorial w-full font-bold"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Dispute Window (Days)</label>
                <input
                  type="number"
                  value={platformConfig.disputeResolutionDays}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, disputeResolutionDays: e.target.value })}
                  className="input-editorial w-full font-bold"
                />
              </div>
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Min Bank Withdrawal Threshold (₹)</label>
              <input
                type="number"
                value={platformConfig.minPayoutThreshold}
                onChange={(e) => setPlatformConfig({ ...platformConfig, minPayoutThreshold: e.target.value })}
                className="input-editorial w-full font-bold"
              />
            </div>
            <div className="space-y-2 pt-2 border-t border-outline-variant">
              <div className="flex items-center justify-between p-3 bg-surface-low border border-outline-variant">
                <div>
                  <p className="font-semibold text-charcoal">Require GST For Brand Verification</p>
                  <p className="text-[10px] text-on-surface-variant">Mandate verified 15-digit GSTIN before approving catalog</p>
                </div>
                <input
                  type="checkbox"
                  checked={platformConfig.requireGSTForBrands}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, requireGSTForBrands: e.target.checked })}
                  className="accent-burgundy w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200">
                <div>
                  <p className="font-bold text-red-700 flex items-center gap-1">
                    <AlertTriangle size={13} /> Platform Maintenance Mode
                  </p>
                  <p className="text-[10px] text-red-600">Freeze checkout for server maintenance</p>
                </div>
                <input
                  type="checkbox"
                  checked={platformConfig.maintenanceMode}
                  onChange={(e) => setPlatformConfig({ ...platformConfig, maintenanceMode: e.target.checked })}
                  className="accent-red-600 w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Security & Access */}
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
              <Shield size={16} className="text-emerald" /> Administrator Security & Access Control
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surface-low border border-outline-variant">
                <div>
                  <p className="font-semibold text-charcoal">Two-Factor Authentication (2FA)</p>
                  <p className="text-[10px] text-on-surface-variant">Enforce authenticator app verification on admin logins</p>
                </div>
                <input
                  type="checkbox"
                  checked={adminSecurity.twoFactorEnabled}
                  onChange={(e) => setAdminSecurity({ ...adminSecurity, twoFactorEnabled: e.target.checked })}
                  className="accent-emerald w-4 h-4 cursor-pointer"
                />
              </div>

              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Session Inactivity Timeout (Minutes)</label>
                <input
                  type="number"
                  value={adminSecurity.sessionTimeoutMinutes}
                  onChange={(e) => setAdminSecurity({ ...adminSecurity, sessionTimeoutMinutes: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-surface-low border border-outline-variant">
                <div>
                  <p className="font-semibold text-charcoal">Corporate IP Whitelist</p>
                  <p className="text-[10px] text-on-surface-variant">Restrict admin panel access to office VPN CIDR ranges</p>
                </div>
                <input
                  type="checkbox"
                  checked={adminSecurity.ipWhitelistActive}
                  onChange={(e) => setAdminSecurity({ ...adminSecurity, ipWhitelistActive: e.target.checked })}
                  className="accent-burgundy w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Role Permissions Matrix */}
        <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
          <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
            <Lock size={16} className="text-burgundy" /> Role Permission Matrix Toggles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "customerCanReviewDirectly", label: "Customer Direct Product Reviews", desc: "Allow verified buyers to publish reviews without pre-moderation" },
              { key: "designerCanSelfVerify", label: "Designer Auto-Verification", desc: "Skip admin queue for certified fashion design school graduates" },
              { key: "brandCanIssueCustomVouchers", label: "Brand Autonomous Vouchers", desc: "Enable fashion brands to self-fund & launch discount codes" },
              { key: "creatorCanApplyToDealsDirectly", label: "Creator Instant Campaign Application", desc: "Allow creators to submit proposals to all public briefs" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="p-3 bg-surface-low border border-outline-variant flex items-center justify-between">
                <div>
                  <p className="font-semibold text-charcoal">{label}</p>
                  <p className="text-[10px] text-on-surface-variant">{desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={rolePermissions[key as keyof typeof rolePermissions]}
                  onChange={() =>
                    setRolePermissions((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
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
