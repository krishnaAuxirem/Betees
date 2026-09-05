import { useState } from "react";
import { DollarSign, Download, ArrowUpRight, CheckCircle2, Clock, X, Building2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

const monthlyData6M = [
  { month: "Apr", earnings: 28000, orders: 4 },
  { month: "May", earnings: 35000, orders: 5 },
  { month: "Jun", earnings: 42000, orders: 6 },
  { month: "Jul", earnings: 38000, orders: 5 },
  { month: "Aug", earnings: 52000, orders: 8 },
  { month: "Sep", earnings: 67000, orders: 9 },
];

const monthlyData1Y = [
  { month: "Oct '25", earnings: 22000, orders: 3 },
  { month: "Nov '25", earnings: 29000, orders: 4 },
  { month: "Dec '25", earnings: 34000, orders: 5 },
  { month: "Jan '26", earnings: 26000, orders: 4 },
  { month: "Feb '26", earnings: 31000, orders: 5 },
  { month: "Mar '26", earnings: 33000, orders: 5 },
  ...monthlyData6M
];

interface PayoutTransaction {
  id: string;
  orderId: string;
  client: string;
  date: string;
  grossAmount: number;
  platformFee: number;
  netPayout: number;
  status: "paid" | "pending" | "processing";
}

const INITIAL_TRANSACTIONS: PayoutTransaction[] = [
  { id: "PAY-801", orderId: "#DO-504", client: "Aditi Rao", date: "Aug 29, 2026", grossAmount: 42000, platformFee: 4200, netPayout: 37800, status: "paid" },
  { id: "PAY-802", orderId: "#DO-503", client: "Mihir Shah", date: "Aug 26, 2026", grossAmount: 38000, platformFee: 3800, netPayout: 34200, status: "paid" },
  { id: "PAY-803", orderId: "#DO-502", client: "Sneha Patel", date: "Sep 01, 2026", grossAmount: 26000, platformFee: 2600, netPayout: 23400, status: "processing" },
  { id: "PAY-804", orderId: "#DO-501", client: "Karan Mehta", date: "Sep 03, 2026", grossAmount: 48000, platformFee: 4800, netPayout: 43200, status: "pending" },
];

export const DesignerEarnings = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [transactions, setTransactions] = useState<PayoutTransaction[]>(INITIAL_TRANSACTIONS);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("43200");

  const chartData = timeRange === "6m" ? monthlyData6M : monthlyData1Y;

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Payout request for ${formatINR(Number(payoutAmount))} submitted to accounts team.`);
    setPayoutModalOpen(false);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Studio Earnings & Payouts</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Track commission revenues, platform deductions (10%), and bank account transfers.
          </p>
        </div>
        <button onClick={() => setPayoutModalOpen(true)} className="btn-primary self-start text-xs">
          <ArrowUpRight size={14} /> Request Bank Payout
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total Earned (YTD)</p>
              <p className="font-display text-2xl font-bold text-charcoal">₹2.62L</p>
              <p className="text-xs text-emerald mt-1">+18% vs last quarter</p>
            </div>
            <DollarSign size={20} className="text-emerald" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-[9px] text-on-surface-variant mb-1">Available for Payout</p>
              <p className="font-display text-2xl font-bold text-emerald">₹43,200</p>
              <p className="text-xs text-on-surface-variant mt-1">Cleared balance</p>
            </div>
            <CheckCircle2 size={20} className="text-emerald" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-[9px] text-on-surface-variant mb-1">In Processing</p>
              <p className="font-display text-2xl font-bold text-burgundy">₹23,400</p>
              <p className="text-xs text-on-surface-variant mt-1">NEFT clearing in 24h</p>
            </div>
            <Clock size={20} className="text-burgundy" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-[9px] text-on-surface-variant mb-1">Platform Commission</p>
              <p className="font-display text-2xl font-bold text-charcoal">10%</p>
              <p className="text-xs text-on-surface-variant mt-1">Standard tier</p>
            </div>
            <Building2 size={20} className="text-on-surface-variant" />
          </div>
        </div>
      </div>

      {/* Chart Panel */}
      <div className="bg-white shadow-editorial p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-lg text-charcoal">Commission Revenue Trend</h3>
            <p className="text-xs text-on-surface-variant">Bespoke commissions and fitting charges</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-xs border border-outline-color py-1.5 px-3 focus:outline-none bg-surface-low"
          >
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last 12 Months</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v: number) => [formatINR(v), "Net Earnings"]}
              contentStyle={{ backgroundColor: "#18181B", color: "#FFF", borderRadius: "0px", border: "none" }}
            />
            <Bar dataKey="earnings" fill="#7F1D3A" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white shadow-editorial overflow-hidden">
        <div className="p-5 border-b border-outline-variant flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-charcoal">Recent Payout Ledger</h3>
            <p className="text-xs text-on-surface-variant">Line items credited per bespoke order</p>
          </div>
          <button
            onClick={() => toast.success("Exporting financial ledger as CSV...")}
            className="btn-outline text-xs py-1.5 px-3"
          >
            <Download size={12} /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
                <th className="p-4">Payout ID</th>
                <th className="p-4">Order & Client</th>
                <th className="p-4">Date</th>
                <th className="p-4">Gross Value</th>
                <th className="p-4">Platform Fee (10%)</th>
                <th className="p-4">Net Payout</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-low/30 transition-colors">
                  <td className="p-4 font-mono font-semibold text-charcoal">{tx.id}</td>
                  <td className="p-4">
                    <span className="font-medium text-charcoal block">{tx.client}</span>
                    <span className="text-xs text-on-surface-variant">{tx.orderId}</span>
                  </td>
                  <td className="p-4 text-xs text-on-surface-variant">{tx.date}</td>
                  <td className="p-4 font-display font-medium text-charcoal">{formatINR(tx.grossAmount)}</td>
                  <td className="p-4 font-display text-xs text-red-500">-{formatINR(tx.platformFee)}</td>
                  <td className="p-4 font-display font-bold text-emerald">{formatINR(tx.netPayout)}</td>
                  <td className="p-4 text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                        tx.status === "paid"
                          ? "bg-emerald/10 text-emerald"
                          : tx.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Request Modal */}
      {payoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-xl text-charcoal">Request Bank Transfer</h2>
              <button onClick={() => setPayoutModalOpen(false)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleRequestPayout} className="p-6 space-y-4">
              <div className="bg-surface-low p-3 space-y-1">
                <p className="text-xs text-on-surface-variant">Linked Bank Account</p>
                <p className="font-semibold text-charcoal">HDFC Bank · A/C Ending in 4921</p>
                <p className="text-[10px] text-on-surface-variant">IFSC: HDFC0001234 · Suresh Nair Tailors</p>
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Transfer Amount (₹) *</label>
                <input
                  type="number"
                  max={43200}
                  required
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="input-editorial w-full font-display text-xl font-bold text-charcoal"
                />
                <p className="text-[11px] text-on-surface-variant mt-1">Available to withdraw: ₹43,200</p>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setPayoutModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
