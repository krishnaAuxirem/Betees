import { useState } from "react";
import { Search, Filter, Check, X, Send, Eye, Clock, MessageSquare, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_DESIGNER_REQUESTS, DesignerRequestItem } from "@/constants/dashboardData";

export const DesignerRequests = () => {
  const [requests, setRequests] = useState<DesignerRequestItem[]>(INITIAL_DESIGNER_REQUESTS);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedReq, setSelectedReq] = useState<DesignerRequestItem | null>(null);
  const [quoteModalReq, setQuoteModalReq] = useState<DesignerRequestItem | null>(null);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");

  const filteredRequests = requests.filter((r) => {
    const matchStatus = filter === "all" || r.status === filter;
    const matchSearch = r.customer.toLowerCase().includes(search.toLowerCase()) ||
                        r.item.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleAccept = (req: DesignerRequestItem) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "accepted" } : r))
    );
    toast.success(`Request from ${req.customer} accepted! An order has been initiated.`);
    if (selectedReq?.id === req.id) setSelectedReq({ ...selectedReq, status: "accepted" });
  };

  const handleDecline = (req: DesignerRequestItem) => {
    if (window.confirm(`Decline custom request from ${req.customer}?`)) {
      setRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, status: "declined" } : r))
      );
      toast.error(`Request from ${req.customer} declined.`);
      if (selectedReq?.id === req.id) setSelectedReq({ ...selectedReq, status: "declined" });
    }
  };

  const handleOpenQuote = (req: DesignerRequestItem) => {
    setQuoteModalReq(req);
    setQuoteAmount(req.budget.toString());
    setQuoteNotes("Includes 2 fitting sessions, master fabric cutting, and complimentary garment care bag.");
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteModalReq || !quoteAmount) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === quoteModalReq.id
          ? { ...r, status: "quoted", budget: Number(quoteAmount) }
          : r
      )
    );
    toast.success(`Formal quote of ${formatINR(Number(quoteAmount))} sent to ${quoteModalReq.customer}`);
    setQuoteModalReq(null);
  };

  const getStatusBadge = (status: DesignerRequestItem["status"]) => {
    switch (status) {
      case "accepted":
        return <span className="bg-emerald/10 text-emerald text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">Accepted</span>;
      case "quoted":
        return <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">Quote Sent</span>;
      case "declined":
        return <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">Declined</span>;
      default:
        return <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">Pending Reply</span>;
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Custom Bespoke Requests</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Review incoming bespoke styling commissions, customer measurements, and send tailoring quotes.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 self-start">
          <Clock size={14} />
          <span className="text-xs font-semibold">
            {requests.filter((r) => r.status === "pending").length} Pending Requests
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 shadow-editorial flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer or garment..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {["all", "pending", "quoted", "accepted", "declined"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                filter === tab ? "bg-charcoal text-white" : "bg-surface-low text-on-surface-variant hover:text-charcoal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white shadow-editorial divide-y divide-outline-variant">
        {filteredRequests.map((req) => (
          <div key={req.id} className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-surface-low/50 transition-colors">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="font-display font-semibold text-charcoal text-base">{req.item}</span>
                {getStatusBadge(req.status)}
              </div>
              <p className="text-xs text-on-surface-variant">
                Client: <strong className="text-charcoal font-medium">{req.customer}</strong> ({req.email}) · Received on {req.date}
              </p>
              <p className="text-xs text-on-surface-variant">
                Measurements: <span className="text-charcoal font-mono">{req.measurementsSummary}</span>
              </p>
              <p className="text-xs text-on-surface-variant italic">
                "{req.notes}"
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <div className="text-left sm:text-right">
                <p className="text-xs text-on-surface-variant">Client Budget</p>
                <p className="font-display text-lg font-bold text-charcoal">{formatINR(req.budget)}</p>
                <p className="text-[10px] text-burgundy font-semibold">Due: {req.deadline}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedReq(req)}
                  className="p-2 border border-outline-color hover:border-charcoal text-charcoal"
                  title="View Full Details"
                >
                  <Eye size={16} />
                </button>

                {req.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleOpenQuote(req)}
                      className="px-3 py-2 bg-surface-low hover:bg-surface-high text-charcoal text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Send size={12} /> Send Quote
                    </button>
                    <button
                      onClick={() => handleAccept(req)}
                      className="px-3 py-2 bg-emerald hover:bg-emerald/90 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
                    >
                      <Check size={12} /> Accept
                    </button>
                    <button
                      onClick={() => handleDecline(req)}
                      className="p-2 text-red-500 hover:bg-red-50"
                      title="Decline"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}

                {req.status === "quoted" && (
                  <button
                    onClick={() => handleAccept(req)}
                    className="px-3 py-2 bg-emerald text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Mark Confirmed
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="p-12 text-center">
            <p className="font-display text-lg text-charcoal">No custom requests found</p>
            <p className="text-on-surface-variant text-sm mt-1">Check another status filter or reset search.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="text-[10px] font-bold text-burgundy uppercase tracking-widest block">{selectedReq.id}</span>
                <h2 className="font-display text-xl text-charcoal">{selectedReq.item}</h2>
              </div>
              <button onClick={() => setSelectedReq(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="flex justify-between items-center bg-surface-low p-3">
                <div>
                  <p className="text-xs text-on-surface-variant">Client</p>
                  <p className="font-semibold text-charcoal">{selectedReq.customer}</p>
                  <p className="text-xs text-on-surface-variant">{selectedReq.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-on-surface-variant">Budget</p>
                  <p className="font-display text-lg font-bold text-charcoal">{formatINR(selectedReq.budget)}</p>
                  <p className="text-xs text-burgundy font-medium">Target: {selectedReq.deadline}</p>
                </div>
              </div>

              <div>
                <h4 className="label-caps text-[10px] text-on-surface-variant mb-1">Tailoring & Measurements</h4>
                <p className="bg-surface-low p-3 font-mono text-sm text-charcoal">{selectedReq.measurementsSummary}</p>
              </div>

              <div>
                <h4 className="label-caps text-[10px] text-on-surface-variant mb-1">Client Special Instructions</h4>
                <p className="text-sm text-on-surface-variant bg-surface-low p-3 italic">"{selectedReq.notes}"</p>
              </div>

              <div>
                <h4 className="label-caps text-[10px] text-on-surface-variant mb-1">Status</h4>
                <div>{getStatusBadge(selectedReq.status)}</div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
                {selectedReq.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        const req = selectedReq;
                        setSelectedReq(null);
                        handleOpenQuote(req);
                      }}
                      className="btn-secondary text-xs"
                    >
                      Send Tailoring Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAccept(selectedReq)}
                      className="px-4 py-2 bg-emerald text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Accept Request
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedReq(null)}
                  className="btn-primary text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      {quoteModalReq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-xl text-charcoal">Send Tailoring Quote</h2>
              <button onClick={() => setQuoteModalReq(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendQuote} className="p-6 space-y-4">
              <div>
                <p className="text-xs text-on-surface-variant">Commission</p>
                <p className="font-semibold text-charcoal">{quoteModalReq.item} for {quoteModalReq.customer}</p>
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Final Quoted Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  className="input-editorial w-full font-display text-lg font-bold"
                />
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Quote Inclusions & Notes</label>
                <textarea
                  rows={3}
                  value={quoteNotes}
                  onChange={(e) => setQuoteNotes(e.target.value)}
                  className="input-editorial w-full text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setQuoteModalReq(null)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  <Send size={12} /> Send Official Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
