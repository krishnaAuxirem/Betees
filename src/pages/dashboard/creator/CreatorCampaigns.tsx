import { useState } from "react";
import { CheckCircle2, Clock, CheckSquare, Upload, AlertCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface CampaignItem {
  id: string;
  brand: string;
  title: string;
  payout: number;
  deadline: string;
  status: "active" | "completed";
  deliverables: {
    scriptSubmitted: boolean;
    draftReelUploaded: boolean;
    brandFeedbackApproved: boolean;
    postLivePublished: boolean;
  };
}

const INITIAL_CAMPAIGNS: CampaignItem[] = [
  {
    id: "CAMP-01",
    brand: "Aurelia Couture",
    title: "Festive Cashmere Autumn Drop",
    payout: 75000,
    deadline: "Sep 25, 2026",
    status: "active",
    deliverables: {
      scriptSubmitted: true,
      draftReelUploaded: true,
      brandFeedbackApproved: true,
      postLivePublished: false
    }
  },
  {
    id: "CAMP-02",
    brand: "Studio Cadence",
    title: "Fluid Silk Capsule Styling",
    payout: 45000,
    deadline: "Sep 30, 2026",
    status: "active",
    deliverables: {
      scriptSubmitted: true,
      draftReelUploaded: true,
      brandFeedbackApproved: true,
      postLivePublished: true
    }
  },
  {
    id: "CAMP-03",
    brand: "Atelier Vesper",
    title: "Savile Row Precision Editorial",
    payout: 90000,
    deadline: "Aug 15, 2026",
    status: "completed",
    deliverables: {
      scriptSubmitted: true,
      draftReelUploaded: true,
      brandFeedbackApproved: true,
      postLivePublished: true
    }
  }
];

export const CreatorCampaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);

  const toggleDeliverable = (campId: string, key: keyof CampaignItem["deliverables"]) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === campId) {
          const updated = { ...c.deliverables, [key]: !c.deliverables[key] };
          const allDone = Object.values(updated).every(Boolean);
          return { ...c, deliverables: updated, status: allDone ? "completed" : "active" };
        }
        return c;
      })
    );
    toast.success("Deliverable checklist updated.");
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Active Brand Deals & Campaigns</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Track contractual creative deliverables, script approval statuses, and sponsorship payouts.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <Clock size={16} className="text-burgundy" />
          <span className="text-xs font-semibold text-charcoal">2 Active Contracts in Progress</span>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-white shadow-editorial p-6 border border-outline-variant space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant pb-4">
              <div>
                <span className="label-caps text-[10px] text-burgundy font-bold">{camp.brand}</span>
                <h3 className="font-display text-xl font-bold text-charcoal mt-0.5">{camp.title}</h3>
                <p className="text-xs text-on-surface-variant">Target Handover: {camp.deadline}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-on-surface-variant block">Agreed Compensation</span>
                <span className="font-display text-2xl font-bold text-emerald">{formatINR(camp.payout)}</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 block mt-1 ${
                    camp.status === "completed" ? "bg-emerald/10 text-emerald" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {camp.status}
                </span>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2">
              <h4 className="label-caps text-[9px] text-on-surface-variant">Contractual Milestones</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {[
                  { key: "scriptSubmitted", label: "1. Script / Concept Draft" },
                  { key: "draftReelUploaded", label: "2. Rough Cut Preview" },
                  { key: "brandFeedbackApproved", label: "3. Brand QA Approved" },
                  { key: "postLivePublished", label: "4. Live Link & Analytics" },
                ].map(({ key, label }) => {
                  const done = camp.deliverables[key as keyof CampaignItem["deliverables"]];
                  return (
                    <div
                      key={key}
                      onClick={() => toggleDeliverable(camp.id, key as keyof CampaignItem["deliverables"])}
                      className={`p-3 border flex items-center justify-between cursor-pointer transition-colors ${
                        done ? "bg-emerald/5 border-emerald/40 text-emerald font-semibold" : "bg-surface-low border-outline-variant text-charcoal hover:border-charcoal"
                      }`}
                    >
                      <span>{label}</span>
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => {}}
                        className="accent-emerald w-4 h-4 cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
