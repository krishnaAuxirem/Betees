import { useState } from "react";
import { DollarSign, ArrowUpRight, CheckCircle2, Clock, Download, X } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface CreatorPayout {
  id: string;
  source: string;
  type: "Brand Sponsorship" | "Client Styling" | "Affiliate Commission";
  amount: number;
  date: string;
  status: "paid" | "processing" | "pending";
}

const INITIAL_PAYOUTS: CreatorPayout[] = [
  { id: "CPAY-101", source: "Aurelia Luxury Couture", type: "Brand Sponsorship", amount: 75000, date: "Aug 30, 2026", status: "paid" },
  { id: "CPAY-102", source: "Studio Cadence", type: "Brand Sponsorship", amount: 45000, date: "Aug 25, 2026", status: "paid" },
  { id: "CPAY-103", source: "Riya Malhotra (Bridal Curation)", type: "Client Styling", amount: 18000, date: "Sep 02, 2026", status: "processing" },
  { id: "CPAY-104", source: "Marketplace Wardrobe Tags", type: "Affiliate Commission", amount: 14200, date: "Sep 04, 2026", status: "pending" },
];

export const CreatorEarnings = () => {
  const [payouts] = useState<CreatorPayout[]>(INITIAL_PAYOUTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("14200");

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Withdrawal request for ${formatINR(Number(amount))} submitted to accounts team.`);
    setModalOpen(false);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Creator Earnings & Payout Ledger</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Revenue generated across brand sponsorships, direct client wardrobe styling, and affiliate shop links.
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary self-start text-xs">
          <ArrowUpRight size={14} /> Request Bank Payout
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total Lifetime Earned</p>
          <p className="font-display text-3xl font-bold text-charcoal">₹2.62L</p>
          <p className="text-xs text-emerald mt-1">+18% this month</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Brand Sponsorships</p>
          <p className="font-display text-3xl font-bold text-emerald">₹1.85L</p>
          <p className="text-xs text-on-surface-variant mt-1">71% of total</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Client Styling Sessions</p>
          <p className="font-display text-3xl font-bold text-burgundy">₹58,000</p>
          <p className="text-xs text-on-surface-variant mt-1">22% of total</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Affiliate Commissions</p>
          <p className="font-display text-3xl font-bold text-charcoal">₹19,200</p>
          <p className="text-xs text-on-surface-variant mt-1">7% of total</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-editorial overflow-hidden">
        <div className="p-5 border-b border-outline-variant flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-charcoal">Transaction & Settlement History</h3>
            <p className="text-xs text-on-surface-variant">Cleared and pending funds transferred to linked bank account</p>
          </div>
          <button
            onClick={() => toast.success("Exported creator payout ledger as CSV.")}
            className="btn-outline py-1.5 px-3 text-xs"
          >
            <Download size={12} /> Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
                <th className="p-4">Reference</th>
                <th className="p-4">Payor / Partner</th>
                <th className="p-4">Revenue Stream</th>
                <th className="p-4">Date</th>
                <th className="p-4">Net Payout</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-surface-low/30 transition-colors">
                  <td className="p-4 font-mono text-xs font-semibold text-charcoal">{p.id}</td>
                  <td className="p-4 font-medium text-charcoal text-xs">{p.source}</td>
                  <td className="p-4 text-xs text-on-surface-variant">{p.type}</td>
                  <td className="p-4 text-xs text-on-surface-variant">{p.date}</td>
                  <td className="p-4 font-display font-bold text-emerald">{formatINR(p.amount)}</td>
                  <td className="p-4 text-right">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                        p.status === "paid"
                          ? "bg-emerald/10 text-emerald"
                          : p.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-xl text-charcoal">Withdraw Funds to Bank</h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleWithdraw} className="p-6 space-y-4 text-xs">
              <div className="bg-surface-low p-3 space-y-1">
                <p className="text-on-surface-variant">Linked Bank Account</p>
                <p className="font-semibold text-charcoal">ICICI Bank · A/C Ending in 9942</p>
                <p className="text-[10px] text-on-surface-variant">IFSC: ICIC0001092 · Neha Gupta</p>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Transfer Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-editorial w-full font-display text-xl font-bold"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
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
