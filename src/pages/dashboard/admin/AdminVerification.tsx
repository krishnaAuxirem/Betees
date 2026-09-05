import { useState } from "react";
import { Search, Filter, Check, X, Eye, FileText, Shield, AlertCircle, Building2 } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_VERIFICATIONS, VerificationItem } from "@/constants/dashboardData";

export const AdminVerification = () => {
  const [items, setItems] = useState<VerificationItem[]>(INITIAL_VERIFICATIONS);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<VerificationItem | null>(null);
  const [rejectModalItem, setRejectModalItem] = useState<VerificationItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const filtered = items.filter((i) => {
    const matchType = filterType === "all" || i.entityType === filterType;
    const matchStatus = filterStatus === "all" || i.status === filterStatus;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
                        i.city.toLowerCase().includes(search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const handleApprove = (item: VerificationItem) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "approved" } : i))
    );
    toast.success(`Verification approved for ${item.name} (${item.entityType}). Verified badge assigned.`);
    if (selectedItem?.id === item.id) setSelectedItem({ ...selectedItem, status: "approved" });
  };

  const handleOpenReject = (item: VerificationItem) => {
    setRejectModalItem(item);
    setRejectionReason("Document illegible or missing official seal.");
  };

  const handleConfirmReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalItem) return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === rejectModalItem.id
          ? { ...i, status: "rejected", rejectionReason }
          : i
      )
    );
    toast.error(`Application for ${rejectModalItem.name} rejected.`);
    if (selectedItem?.id === rejectModalItem.id) {
      setSelectedItem({ ...selectedItem, status: "rejected", rejectionReason });
    }
    setRejectModalItem(null);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Merchant & Designer Verification Queue</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Review submitted GST certificates, PAN cards, master tailor credentials, and portfolio authentications.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse" />
          <span className="text-xs font-semibold text-charcoal">
            {items.filter((i) => i.status === "pending").length} Awaiting Verification
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 shadow-editorial flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search entity name, city, GST..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs bg-surface-low border border-outline-variant px-2.5 py-1.5 focus:outline-none font-semibold text-charcoal"
          >
            <option value="all">All Entity Types</option>
            <option value="Brand">Brand</option>
            <option value="Designer">Designer</option>
            <option value="Tailor">Tailor</option>
            <option value="Creator">Creator</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-surface-low border border-outline-variant px-2.5 py-1.5 focus:outline-none font-semibold text-charcoal"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Applicant Entity</th>
              <th className="p-4">Type</th>
              <th className="p-4">Application Date</th>
              <th className="p-4">Tax / ID Proof</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Review & Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4">
                  <span className="font-semibold text-charcoal block text-xs">{item.name}</span>
                  <span className="text-[11px] text-on-surface-variant">{item.city} · {item.email}</span>
                </td>
                <td className="p-4">
                  <span className="text-xs font-bold text-charcoal bg-surface-low px-2 py-0.5 uppercase">
                    {item.entityType}
                  </span>
                </td>
                <td className="p-4 text-xs text-on-surface-variant">{item.appliedDate}</td>
                <td className="p-4">
                  <div className="space-y-0.5">
                    {item.gstNumber && <span className="font-mono text-[10px] text-charcoal block">GST: {item.gstNumber}</span>}
                    {item.panNumber && <span className="font-mono text-[10px] text-on-surface-variant block">PAN: {item.panNumber}</span>}
                    <span
                      className={`text-[10px] font-bold ${
                        item.docsStatus === "Complete" ? "text-emerald" : "text-yellow-600"
                      }`}
                    >
                      {item.docsStatus}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      item.status === "approved"
                        ? "bg-emerald/10 text-emerald"
                        : item.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-1.5 border border-outline-color hover:border-charcoal text-charcoal"
                    title="Inspect Submitted Documents"
                  >
                    <Eye size={14} />
                  </button>
                  {item.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(item)}
                        className="px-2.5 py-1 bg-emerald text-white text-[10px] font-bold uppercase tracking-wider"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleOpenReject(item)}
                        className="px-2.5 py-1 bg-red-100 text-red-700 hover:bg-red-200 text-[10px] font-bold uppercase tracking-wider"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Document Inspector Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{selectedItem.entityType} Verification</span>
                <h2 className="font-display text-xl text-charcoal">{selectedItem.name}</h2>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 bg-surface-low p-4">
                <div>
                  <span className="text-on-surface-variant block">Email:</span>
                  <span className="font-semibold text-charcoal">{selectedItem.email}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Phone:</span>
                  <span className="font-semibold text-charcoal">{selectedItem.phone}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Location:</span>
                  <span className="font-semibold text-charcoal">{selectedItem.city}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Applied Date:</span>
                  <span className="font-semibold text-charcoal">{selectedItem.appliedDate}</span>
                </div>
              </div>

              {/* Tax Credentials */}
              <div className="p-4 border border-outline-variant space-y-2">
                <h4 className="label-caps text-[9px] text-on-surface-variant">Tax & Legal Documentation</h4>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">GST Identification Number:</span>
                  <span className="font-mono font-bold text-charcoal">{selectedItem.gstNumber || "Not required (Exempt)"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-on-surface-variant">Corporate / Entity PAN:</span>
                  <span className="font-mono font-bold text-charcoal">{selectedItem.panNumber || "PAN on file"}</span>
                </div>
              </div>

              {/* Portfolio Samples */}
              {selectedItem.portfolioSamples.length > 0 && (
                <div>
                  <h4 className="label-caps text-[9px] text-on-surface-variant mb-2">Submitted Craft Samples</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedItem.portfolioSamples.map((img, i) => (
                      <div key={i} className="aspect-[4/3] bg-surface-high overflow-hidden border border-outline-variant">
                        <img src={img} alt="Sample" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                {selectedItem.status === "pending" && (
                  <div className="space-x-2">
                    <button
                      onClick={() => handleApprove(selectedItem)}
                      className="px-4 py-2 bg-emerald text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Approve Credentials
                    </button>
                    <button
                      onClick={() => {
                        const itm = selectedItem;
                        setSelectedItem(null);
                        handleOpenReject(itm);
                      }}
                      className="px-4 py-2 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider"
                    >
                      Reject
                    </button>
                  </div>
                )}
                <button onClick={() => setSelectedItem(null)} className="btn-primary text-xs ml-auto">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-lg text-charcoal">Reject Verification Application</h2>
              <button onClick={() => setRejectModalItem(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleConfirmReject} className="p-6 space-y-4 text-xs">
              <p className="text-on-surface-variant">
                State reason for rejecting <strong>{rejectModalItem.name}</strong>. An email notification will be sent to the applicant.
              </p>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Reason for Rejection *</label>
                <textarea
                  rows={3}
                  required
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="input-editorial w-full text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setRejectModalItem(null)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
