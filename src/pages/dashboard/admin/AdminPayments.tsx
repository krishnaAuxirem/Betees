import { useState } from "react";
import { Search, Filter, RotateCcw, CheckCircle2, XCircle, Clock, Download, X } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_PAYMENTS, PaymentTransaction } from "@/constants/dashboardData";

export const AdminPayments = () => {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_PAYMENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [refundModalTxn, setRefundModalTxn] = useState<PaymentTransaction | null>(null);
  const [refundReason, setRefundReason] = useState("Customer dispute resolved in buyer's favor.");

  const filtered = transactions.filter((t) => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
                        t.orderId.toLowerCase().includes(search.toLowerCase()) ||
                        t.user.toLowerCase().includes(search.toLowerCase()) ||
                        t.seller.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleProcessRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundModalTxn) return;

    setTransactions((prev) =>
      prev.map((t) => (t.id === refundModalTxn.id ? { ...t, status: "refunded" } : t))
    );

    toast.success(`Refund of ${formatINR(refundModalTxn.amount)} initiated via ${refundModalTxn.gateway}.`);
    setRefundModalTxn(null);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Financial Settlements & Transactions</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Reconcile payments across Razorpay, UPI, NetBanking, and process authorized refunds.
          </p>
        </div>
        <button
          onClick={() => toast.success("Exporting payment ledger CSV...")}
          className="btn-primary self-start text-xs"
        >
          <Download size={14} /> Export Payment Ledger
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total Processed (MTD)</p>
          <p className="font-display text-2xl font-bold text-charcoal">₹3.58L</p>
          <p className="text-xs text-emerald mt-1">98.4% success rate</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">UPI Volume Share</p>
          <p className="font-display text-2xl font-bold text-emerald">58%</p>
          <p className="text-xs text-on-surface-variant mt-1">Leading payment method</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Refund Rate</p>
          <p className="font-display text-2xl font-bold text-burgundy">1.2%</p>
          <p className="text-xs text-on-surface-variant mt-1">Well within 3% risk cap</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Pending Settlements</p>
          <p className="font-display text-2xl font-bold text-charcoal">₹48,200</p>
          <p className="text-xs text-on-surface-variant mt-1">T+2 banking cycle</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 shadow-editorial flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search TXN ID, order, user, seller..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-on-surface-variant" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-surface-low border border-outline-variant px-2.5 py-1.5 focus:outline-none font-semibold text-charcoal"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Payer / Customer</th>
              <th className="p-4">Merchant Payee</th>
              <th className="p-4">Payment Gateway</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 font-mono font-semibold text-charcoal text-xs">{t.id}</td>
                <td className="p-4 font-mono text-xs text-on-surface-variant">{t.orderId}</td>
                <td className="p-4 text-xs font-semibold text-charcoal">{t.user}</td>
                <td className="p-4 text-xs text-on-surface-variant">{t.seller}</td>
                <td className="p-4 text-xs font-medium text-charcoal">{t.gateway}</td>
                <td className="p-4 font-display font-semibold text-charcoal">{formatINR(t.amount)}</td>
                <td className="p-4 text-xs text-on-surface-variant">{t.date}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      t.status === "success"
                        ? "bg-emerald/10 text-emerald"
                        : t.status === "refunded"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {t.status === "success" && (
                    <button
                      onClick={() => setRefundModalTxn(t)}
                      className="text-xs text-red-600 hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw size={12} /> Refund
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Refund Modal */}
      {refundModalTxn && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-red-600">Reverse Transaction</span>
                <h2 className="font-display text-xl text-charcoal">Process Customer Refund</h2>
              </div>
              <button onClick={() => setRefundModalTxn(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleProcessRefund} className="p-6 space-y-4 text-xs">
              <div className="bg-surface-low p-3 space-y-1">
                <p className="font-semibold text-charcoal">{refundModalTxn.id} · {refundModalTxn.orderId}</p>
                <p className="text-on-surface-variant">Customer: {refundModalTxn.user}</p>
                <p className="font-display font-bold text-red-600 text-base">Refund Amount: {formatINR(refundModalTxn.amount)}</p>
                <p className="text-[10px] text-on-surface-variant">Gateway: {refundModalTxn.gateway}</p>
              </div>

              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Refund Authorization Reason *</label>
                <textarea
                  rows={3}
                  required
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="input-editorial w-full"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setRefundModalTxn(null)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                  Authorize Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
