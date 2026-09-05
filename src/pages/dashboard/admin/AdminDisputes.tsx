import { useState } from "react";
import { AlertTriangle, Search, Filter, Eye, CheckCircle, X, ShieldAlert, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_DISPUTES, DisputeItem } from "@/constants/dashboardData";

export const AdminDisputes = () => {
  const [disputes, setDisputes] = useState<DisputeItem[]>(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState<DisputeItem | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = disputes.filter((d) => {
    if (statusFilter === "all") return true;
    return d.status === statusFilter;
  });

  const handleResolveRefund = (d: DisputeItem) => {
    setDisputes((prev) =>
      prev.map((item) => (item.id === d.id ? { ...item, status: "resolved" } : item))
    );
    toast.success(`Dispute ${d.id} resolved: Full refund of ${formatINR(d.amount)} issued to customer.`);
    if (selectedDispute?.id === d.id) {
      setSelectedDispute({ ...selectedDispute, status: "resolved" });
    }
  };

  const handleDismissDispute = (d: DisputeItem) => {
    if (window.confirm(`Dismiss dispute claim ${d.id}? Merchant defense accepted.`)) {
      setDisputes((prev) =>
        prev.map((item) => (item.id === d.id ? { ...item, status: "dismissed" } : item))
      );
      toast.error(`Dispute ${d.id} dismissed.`);
      if (selectedDispute?.id === d.id) {
        setSelectedDispute({ ...selectedDispute, status: "dismissed" });
      }
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Buyer & Seller Dispute Resolution</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Impartial adjudication of sizing claims, transit damages, fabric discrepancies, and merchant chargebacks.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <AlertTriangle size={16} className="text-yellow-600" />
          <span className="text-xs font-semibold text-charcoal">
            {disputes.filter((d) => d.status === "open").length} Open Disputes Requiring Arbitration
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {["all", "open", "under_review", "resolved", "dismissed"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              statusFilter === s
                ? "bg-charcoal text-white"
                : "bg-white border border-outline-variant text-on-surface-variant hover:text-charcoal shadow-xs"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {filtered.map((d) => (
          <div key={d.id} className="bg-white shadow-editorial p-5 border border-outline-variant space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-outline-variant pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-burgundy">{d.id}</span>
                  <span className="text-xs text-on-surface-variant">Order: {d.orderId}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      d.status === "open"
                        ? "bg-red-100 text-red-700"
                        : d.status === "under_review"
                        ? "bg-yellow-100 text-yellow-800"
                        : d.status === "resolved"
                        ? "bg-emerald/10 text-emerald"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {d.status.replace("_", " ")}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-charcoal mt-1">{d.issue}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Claimant: <strong className="text-charcoal font-medium">{d.customerName}</strong> vs Merchant: <strong className="text-charcoal font-medium">{d.sellerName}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] text-on-surface-variant uppercase">Disputed Amount</span>
                <p className="font-display text-lg font-bold text-charcoal">{formatINR(d.amount)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-surface-low p-3">
              <div>
                <span className="label-caps text-[9px] text-burgundy block mb-1">Customer Statement:</span>
                <p className="text-charcoal italic">"{d.customerStatement}"</p>
              </div>
              <div>
                <span className="label-caps text-[9px] text-on-surface-variant block mb-1">Seller Response:</span>
                <p className="text-charcoal italic">"{d.sellerStatement}"</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-on-surface-variant">Opened on {d.openedDate}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDispute(d)}
                  className="btn-outline text-xs py-1.5 px-3"
                >
                  <Eye size={12} /> Inspect Evidence
                </button>
                {d.status !== "resolved" && d.status !== "dismissed" && (
                  <>
                    <button
                      onClick={() => handleResolveRefund(d)}
                      className="px-3 py-1.5 bg-emerald text-white text-xs font-bold uppercase tracking-wide"
                    >
                      Refund Buyer
                    </button>
                    <button
                      onClick={() => handleDismissDispute(d)}
                      className="px-3 py-1.5 bg-surface-low hover:bg-surface-high text-charcoal text-xs font-bold uppercase tracking-wide"
                    >
                      Dismiss Claim
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{selectedDispute.id}</span>
                <h2 className="font-display text-xl text-charcoal">{selectedDispute.issue}</h2>
              </div>
              <button onClick={() => setSelectedDispute(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div className="bg-surface-low p-3 space-y-1">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Buyer Claim:</span>
                  <span className="font-semibold text-charcoal">{selectedDispute.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Merchant Atelier:</span>
                  <span className="font-semibold text-charcoal">{selectedDispute.sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Disputed Value:</span>
                  <span className="font-bold text-charcoal font-display text-sm">{formatINR(selectedDispute.amount)}</span>
                </div>
              </div>

              {selectedDispute.evidenceImages.length > 0 && (
                <div>
                  <h4 className="label-caps text-[9px] text-on-surface-variant mb-2">Buyer Uploaded Photo Evidence</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDispute.evidenceImages.map((img, idx) => (
                      <div key={idx} className="aspect-[4/3] bg-surface-high overflow-hidden border border-outline-variant">
                        <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-outline-variant">
                {selectedDispute.status !== "resolved" && (
                  <button
                    onClick={() => handleResolveRefund(selectedDispute)}
                    className="px-4 py-2 bg-emerald text-white text-xs font-bold uppercase"
                  >
                    Issue Full Refund
                  </button>
                )}
                <button onClick={() => setSelectedDispute(null)} className="btn-primary text-xs ml-auto">
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
