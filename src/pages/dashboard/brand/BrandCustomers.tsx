import { useState } from "react";
import { Search, Mail, Phone, Send, Eye, X, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface BrandCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpend: number;
  lastPurchase: string;
  tier: "Platinum VIP" | "Gold" | "Silver";
}

const INITIAL_CUSTOMERS: BrandCustomer[] = [
  { id: "BC-1", name: "Priya Sharma", email: "priya@betees.com", phone: "+91 98200 12345", totalOrders: 5, totalSpend: 248500, lastPurchase: "Sep 3, 2026", tier: "Platinum VIP" },
  { id: "BC-2", name: "Aryan Kapoor", email: "aryan.k@techcorp.in", phone: "+91 98111 22334", totalOrders: 3, totalSpend: 154000, lastPurchase: "Sep 2, 2026", tier: "Gold" },
  { id: "BC-3", name: "Sneha Patel", email: "sneha.p@patel.co", phone: "+91 99099 88776", totalOrders: 4, totalSpend: 212000, lastPurchase: "Sep 1, 2026", tier: "Platinum VIP" },
  { id: "BC-4", name: "Ishita Verma", email: "ishita@vogue.in", phone: "+91 98220 99887", totalOrders: 2, totalSpend: 63400, lastPurchase: "Aug 29, 2026", tier: "Silver" },
  { id: "BC-5", name: "Mihir Shah", email: "mihir.style@gmail.com", phone: "+91 97230 44556", totalOrders: 2, totalSpend: 56500, lastPurchase: "Aug 22, 2026", tier: "Silver" },
];

export const BrandCustomers = () => {
  const [customers, setCustomers] = useState<BrandCustomer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [messageModalCust, setMessageModalCust] = useState<BrandCustomer | null>(null);
  const [msgText, setMsgText] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageModalCust || !msgText.trim()) return;
    toast.success(`Exclusive message & promotional voucher sent to ${messageModalCust.name}!`);
    setMessageModalCust(null);
    setMsgText("");
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Brand Patrons & Customers</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Build relationships with high-value clients who regularly purchase your collections.
          </p>
        </div>
        <div className="stat-card py-2 px-4">
          <p className="text-[9px] label-caps text-on-surface-variant">Average Customer Lifetime Value</p>
          <p className="font-display text-xl font-bold text-charcoal">₹1,46,880</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 shadow-editorial">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name or email..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Customer</th>
              <th className="p-4">Loyalty Tier</th>
              <th className="p-4">Total Orders</th>
              <th className="p-4">Lifetime Spend</th>
              <th className="p-4">Last Purchase</th>
              <th className="p-4 text-right">Direct Outreach</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center font-bold text-xs">
                    {c.name[0]}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block text-xs">{c.name}</span>
                    <span className="text-[11px] text-on-surface-variant">{c.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      c.tier === "Platinum VIP"
                        ? "bg-purple-100 text-purple-800"
                        : c.tier === "Gold"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-surface-low text-charcoal"
                    }`}
                  >
                    {c.tier}
                  </span>
                </td>
                <td className="p-4 text-xs font-semibold text-charcoal">{c.totalOrders} orders</td>
                <td className="p-4 font-display font-semibold text-charcoal">{formatINR(c.totalSpend)}</td>
                <td className="p-4 text-xs text-on-surface-variant">{c.lastPurchase}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setMessageModalCust(c)}
                    className="btn-outline py-1.5 px-3 text-xs"
                  >
                    <MessageSquare size={12} /> Contact
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message Modal */}
      {messageModalCust && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">VIP Outreach</span>
                <h2 className="font-display text-lg text-charcoal">Message {messageModalCust.name}</h2>
              </div>
              <button onClick={() => setMessageModalCust(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendMessage} className="p-6 space-y-4 text-xs">
              <div className="bg-surface-low p-3 space-y-1">
                <p className="font-semibold text-charcoal">{messageModalCust.name} · {messageModalCust.tier}</p>
                <p className="text-on-surface-variant">Lifetime Patronage: {formatINR(messageModalCust.totalSpend)}</p>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Message Content / Private Offer *</label>
                <textarea
                  required
                  rows={4}
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder="Invite client to exclusive private preview or send customized styling note..."
                  className="input-editorial w-full"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setMessageModalCust(null)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  <Send size={12} /> Send VIP Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
