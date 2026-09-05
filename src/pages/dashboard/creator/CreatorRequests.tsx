import { useState } from "react";
import { Search, Eye, Check, X, Send, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface CreatorStylingRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  occasion: string;
  budget: number;
  deadline: string;
  requirements: string;
  status: "pending" | "quoted" | "accepted" | "declined";
  date: string;
}

const INITIAL_REQUESTS: CreatorStylingRequest[] = [
  { id: "CSR-1", clientName: "Riya Malhotra", clientEmail: "riya.m@gmail.com", occasion: "Bridal Sangeet Styling Session", budget: 18000, deadline: "Oct 10, 2026", requirements: "Need 3 curated moodboards incorporating emerald silks and modern rose gold jewelry.", status: "pending", date: "Sep 3, 2026" },
  { id: "CSR-2", clientName: "Aryan Kapoor", clientEmail: "aryan.k@techcorp.in", occasion: "Corporate Executive Capsule Curation", budget: 25000, deadline: "Sep 28, 2026", requirements: "Capsule wardrobe for international tech summits in Tokyo and London.", status: "quoted", date: "Sep 2, 2026" },
  { id: "CSR-3", clientName: "Priya Sharma", clientEmail: "priya@betees.com", occasion: "Festive Wardrobe Audit & Lookbook", budget: 12000, deadline: "Oct 02, 2026", requirements: "Audit existing wardrobe and curate 5 festive outfits with minimal new purchases.", status: "accepted", date: "Sep 1, 2026" },
];

export const CreatorRequests = () => {
  const [requests, setRequests] = useState<CreatorStylingRequest[]>(INITIAL_REQUESTS);
  const [selectedReq, setSelectedReq] = useState<CreatorStylingRequest | null>(null);
  const [quoteModalReq, setQuoteModalReq] = useState<CreatorStylingRequest | null>(null);
  const [quoteVal, setQuoteVal] = useState("");

  const handleAccept = (r: CreatorStylingRequest) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === r.id ? { ...item, status: "accepted" } : item))
    );
    toast.success(`Styling commission from ${r.clientName} confirmed!`);
  };

  const handleDecline = (r: CreatorStylingRequest) => {
    if (window.confirm(`Decline styling request from ${r.clientName}?`)) {
      setRequests((prev) =>
        prev.map((item) => (item.id === r.id ? { ...item, status: "declined" } : item))
      );
      toast.error(`Declined request from ${r.clientName}.`);
    }
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteModalReq || !quoteVal) return;
    setRequests((prev) =>
      prev.map((item) =>
        item.id === quoteModalReq.id
          ? { ...item, status: "quoted", budget: Number(quoteVal) }
          : item
      )
    );
    toast.success(`Styling proposal & quote of ${formatINR(Number(quoteVal))} dispatched.`);
    setQuoteModalReq(null);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Personal Styling Inquiries</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Clients requesting direct 1-on-1 virtual wardrobe consultations, capsule edits, and event curations.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 self-start text-xs font-semibold">
          <Clock size={14} />
          <span>{requests.filter((r) => r.status === "pending").length} Inquiries Pending</span>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white shadow-editorial divide-y divide-outline-variant">
        {requests.map((r) => (
          <div key={r.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-surface-low/30 transition-colors">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="font-display font-semibold text-charcoal text-base">{r.occasion}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                    r.status === "accepted"
                      ? "bg-emerald/10 text-emerald"
                      : r.status === "quoted"
                      ? "bg-blue-100 text-blue-700"
                      : r.status === "declined"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Client: <strong className="text-charcoal">{r.clientName}</strong> · Received {r.date} · Due: {r.deadline}
              </p>
              <p className="text-xs text-charcoal italic bg-surface-low p-2.5">
                "{r.requirements}"
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-xs text-on-surface-variant">Session Fee</p>
                <p className="font-display text-lg font-bold text-charcoal">{formatINR(r.budget)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReq(r)}
                  className="p-2 border border-outline-color hover:border-charcoal text-charcoal"
                  title="View Details"
                >
                  <Eye size={15} />
                </button>

                {r.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        setQuoteModalReq(r);
                        setQuoteVal(r.budget.toString());
                      }}
                      className="px-3 py-1.5 bg-surface-low text-charcoal hover:bg-surface-high text-xs font-semibold uppercase"
                    >
                      Quote
                    </button>
                    <button
                      onClick={() => handleAccept(r)}
                      className="px-3 py-1.5 bg-emerald text-white text-xs font-semibold uppercase"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(r)}
                      className="p-1.5 text-red-500 hover:bg-red-50"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Modal */}
      {quoteModalReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-lg text-charcoal">Send Styling Quote</h2>
              <button onClick={() => setQuoteModalReq(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendQuote} className="p-6 space-y-4 text-xs">
              <div>
                <p className="font-semibold text-charcoal">{quoteModalReq.occasion}</p>
                <p className="text-on-surface-variant">Client: {quoteModalReq.clientName}</p>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Consultation Fee (₹) *</label>
                <input
                  type="number"
                  required
                  value={quoteVal}
                  onChange={(e) => setQuoteVal(e.target.value)}
                  className="input-editorial w-full font-display text-lg font-bold"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setQuoteModalReq(null)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={12} /> Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-lg text-charcoal">{selectedReq.occasion}</h2>
              <button onClick={() => setSelectedReq(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <div className="bg-surface-low p-3 space-y-1">
                <p className="font-semibold text-charcoal">{selectedReq.clientName} ({selectedReq.clientEmail})</p>
                <p className="text-on-surface-variant">Fee: {formatINR(selectedReq.budget)} · Due: {selectedReq.deadline}</p>
              </div>
              <div>
                <p className="label-caps text-[9px] text-on-surface-variant mb-1">Client Styling Brief</p>
                <p className="bg-surface-low p-3 leading-relaxed text-charcoal italic">"{selectedReq.requirements}"</p>
              </div>
              <div className="flex justify-end pt-3 border-t border-outline-variant">
                <button onClick={() => setSelectedReq(null)} className="btn-primary text-xs">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
