import { useState } from "react";
import { Briefcase, Send, Check, X, Clock, DollarSign, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_BRAND_CAMPAIGNS, BrandCampaignBrief } from "@/constants/dashboardData";

export const CreatorCollaborations = () => {
  const [campaigns, setCampaigns] = useState<BrandCampaignBrief[]>(INITIAL_BRAND_CAMPAIGNS);
  const [applyingCamp, setApplyingCamp] = useState<BrandCampaignBrief | null>(null);
  const [proposalPitch, setProposalPitch] = useState("");

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingCamp) return;

    setCampaigns((prev) =>
      prev.map((c) => (c.id === applyingCamp.id ? { ...c, status: "applied" } : c))
    );
    toast.success(`Collaboration proposal sent to ${applyingCamp.brandName}!`);
    setApplyingCamp(null);
    setProposalPitch("");
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Brand Sponsorships & Briefs</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Browse paid campaign briefs posted by verified luxury fashion brands on Betees.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <Briefcase size={16} className="text-burgundy" />
          <span className="text-xs font-semibold text-charcoal">Verified Creator Deal Guarantee</span>
        </div>
      </div>

      {/* Campaign Briefs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-white shadow-editorial p-6 flex flex-col justify-between space-y-4 border border-outline-variant">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="label-caps text-[10px] text-burgundy">{camp.category}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                    camp.status === "accepted"
                      ? "bg-emerald/10 text-emerald"
                      : camp.status === "applied"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-surface-low text-charcoal"
                  }`}
                >
                  {camp.status}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal">{camp.campaignTitle}</h3>
              <p className="text-xs font-semibold text-on-surface-variant">Brand: {camp.brandName}</p>
              <div className="bg-surface-low p-3 space-y-1 text-xs">
                <p className="label-caps text-[9px] text-on-surface-variant">Deliverables Required:</p>
                <p className="text-charcoal font-medium">{camp.deliverables}</p>
              </div>
              <p className="text-xs text-burgundy font-medium">Application Deadline: {camp.deadline}</p>
            </div>

            <div className="pt-4 border-t border-outline-variant flex items-center justify-between">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Compensation</p>
                <p className="font-display text-xl font-bold text-emerald">{formatINR(camp.payout)}</p>
              </div>

              {camp.status === "open" ? (
                <button
                  onClick={() => {
                    setApplyingCamp(camp);
                    setProposalPitch(`Hi ${camp.brandName} team, I love your aesthetic. I'd like to pitch a styling reel focusing on warmth calibration and editorial outerwear.`);
                  }}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Apply Now
                </button>
              ) : (
                <span className="text-xs text-on-surface-variant font-medium">
                  {camp.status === "applied" ? "Under Review" : "Contract Active"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Proposal Modal */}
      {applyingCamp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{applyingCamp.brandName}</span>
                <h2 className="font-display text-lg text-charcoal">Apply for Collaboration</h2>
              </div>
              <button onClick={() => setApplyingCamp(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleApply} className="p-6 space-y-4 text-xs">
              <div className="bg-surface-low p-3 space-y-1">
                <p className="font-semibold text-charcoal">{applyingCamp.campaignTitle}</p>
                <p className="text-on-surface-variant">Deliverables: {applyingCamp.deliverables}</p>
                <p className="font-bold text-emerald">Payout: {formatINR(applyingCamp.payout)}</p>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Your Creative Pitch / Concept *</label>
                <textarea
                  rows={4}
                  required
                  value={proposalPitch}
                  onChange={(e) => setProposalPitch(e.target.value)}
                  className="input-editorial w-full text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setApplyingCamp(null)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={12} /> Submit Collaboration Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
