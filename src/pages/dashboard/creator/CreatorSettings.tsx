import { useState } from "react";
import { Save, Check, User, Instagram, Youtube, Building2, Bell, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

export const CreatorSettings = () => {
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const [creatorProfile, setCreatorProfile] = useState({
    name: user?.name || "Neha Gupta",
    email: user?.email || "creator@betees.com",
    handle: "@neha.gupta.style",
    niche: "Luxury Outerwear, Minimalist Tailoring, Indian Bridal Curation",
    bio: "Fashion creator and personal stylist helping clients calibrate timeless silhouettes and luxury textiles.",
    instagram: "@neha.gupta.style",
    youtube: "NehaGuptaCouture",
    followersCount: "42.8K"
  });

  const [bankInfo, setBankInfo] = useState({
    beneficiaryName: "Neha Gupta",
    bankName: "ICICI Bank",
    accountNumber: "891238491823",
    ifscCode: "ICIC0001092"
  });

  const [notifications, setNotifications] = useState({
    newCollabBrief: true,
    clientStylingRequest: true,
    payoutDisbursed: true,
    postTrending: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Creator profile and payout information saved successfully.");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Creator Profile & Payout Settings</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Manage your verified social handles, media kit info, and bank details for brand sponsorships.
          </p>
        </div>
        <button onClick={handleSave} className={`btn-primary self-start text-xs ${saved ? "bg-emerald" : ""}`}>
          {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Profile</>}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Creator Profile */}
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
              <User size={16} className="text-burgundy" /> Media Kit & Stylist Bio
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Full Name</label>
                <input
                  type="text"
                  value={creatorProfile.name}
                  onChange={(e) => setCreatorProfile({ ...creatorProfile, name: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Betees Creator Handle</label>
                <input
                  type="text"
                  value={creatorProfile.handle}
                  onChange={(e) => setCreatorProfile({ ...creatorProfile, handle: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Aesthetic Specialization</label>
              <input
                type="text"
                value={creatorProfile.niche}
                onChange={(e) => setCreatorProfile({ ...creatorProfile, niche: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Public Bio</label>
              <textarea
                rows={3}
                value={creatorProfile.bio}
                onChange={(e) => setCreatorProfile({ ...creatorProfile, bio: e.target.value })}
                className="input-editorial w-full text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Instagram</label>
                <div className="relative">
                  <Instagram size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    value={creatorProfile.instagram}
                    onChange={(e) => setCreatorProfile({ ...creatorProfile, instagram: e.target.value })}
                    className="input-editorial w-full pl-9"
                  />
                </div>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">YouTube Channel</label>
                <div className="relative">
                  <Youtube size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    value={creatorProfile.youtube}
                    onChange={(e) => setCreatorProfile({ ...creatorProfile, youtube: e.target.value })}
                    className="input-editorial w-full pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bank Settlement Account */}
          <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
            <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
              <Building2 size={16} className="text-emerald" /> Bank Account for Sponsorship Payouts
            </h2>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Beneficiary Name</label>
              <input
                type="text"
                value={bankInfo.beneficiaryName}
                onChange={(e) => setBankInfo({ ...bankInfo, beneficiaryName: e.target.value })}
                className="input-editorial w-full font-semibold"
              />
            </div>
            <div>
              <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Bank Name</label>
              <input
                type="text"
                value={bankInfo.bankName}
                onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                className="input-editorial w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Account Number</label>
                <input
                  type="password"
                  value={bankInfo.accountNumber}
                  onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                  className="input-editorial w-full font-mono"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={bankInfo.ifscCode}
                  onChange={(e) => setBankInfo({ ...bankInfo, ifscCode: e.target.value })}
                  className="input-editorial w-full font-mono uppercase"
                />
              </div>
            </div>
            <div className="p-3 bg-surface-low text-on-surface-variant text-[11px] leading-relaxed">
              Direct sponsorship payouts and styling commission earnings are settled directly to this account via IMPS/NEFT upon deliverable approval.
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow-editorial p-6 space-y-4 text-xs">
          <h2 className="font-display text-base font-semibold text-charcoal flex items-center gap-2">
            <Bell size={16} className="text-burgundy" /> Creator Notifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: "newCollabBrief", label: "New Brand Collaboration Briefs", desc: "Alerts when fashion brands launch new paid campaigns" },
              { key: "clientStylingRequest", label: "1-on-1 Client Inquiries", desc: "Notifications for bespoke wardrobe curation requests" },
              { key: "payoutDisbursed", label: "Earnings Settlement Alerts", desc: "Confirmation when funds are sent to your bank" },
              { key: "postTrending", label: "Trending Lookbook Insights", desc: "Updates when your styled outfits are featured on Betees feed" },
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
