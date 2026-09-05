import { useState } from "react";
import { Search, Filter, Eye, Truck, CheckCircle2, Clock, X, Package } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface BrandOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  items: string;
  total: number;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  trackingAwb?: string;
  shippingAddress: string;
}

const INITIAL_ORDERS: BrandOrder[] = [
  { id: "#BO-901", customerName: "Priya Sharma", customerEmail: "priya@betees.com", items: "Imperial Burgundy Cashmere Trench (Size: M)", total: 78500, date: "Sep 3, 2026", status: "processing", shippingAddress: "204, Bandra West, Mumbai 400050" },
  { id: "#BO-902", customerName: "Aryan Kapoor", customerEmail: "aryan.k@techcorp.in", items: "Structured Wool-Silk Tuxedo Blazer (Size: 40R)", total: 52000, date: "Sep 2, 2026", status: "shipped", trackingAwb: "BLUEDART901234", shippingAddress: "A-12, Vasant Vihar, New Delhi 110057" },
  { id: "#BO-903", customerName: "Sneha Patel", customerEmail: "sneha.p@patel.co", items: "Silk Zardozi Embroidered Lehenga (Size: S)", total: 145000, date: "Sep 1, 2026", status: "delivered", trackingAwb: "DELHIVERY445511", shippingAddress: "14, Riverfront Heights, Ahmedabad 380009" },
  { id: "#BO-904", customerName: "Ishita Verma", customerEmail: "ishita@vogue.in", items: "Obsidian Drape Cape Dress (Size: M)", total: 38900, date: "Aug 29, 2026", status: "delivered", trackingAwb: "DTDC112233", shippingAddress: "801, Indiranagar 100ft Rd, Bengaluru 560038" },
];

export const BrandOrders = () => {
  const [orders, setOrders] = useState<BrandOrder[]>(INITIAL_ORDERS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<BrandOrder | null>(null);

  const filtered = orders.filter((o) => {
    const matchFilter = filter === "all" || o.status === filter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
                        o.items.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: BrandOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order ${id} marked as ${newStatus.toUpperCase()}`);
    if (selectedOrder?.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Fulfillment & Order Pipeline</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Manage fulfillment, update courier tracking numbers, and dispatch shipments to customers.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-3">
          <Package size={20} className="text-burgundy" />
          <div>
            <p className="text-[9px] label-caps text-on-surface-variant">Fulfillment SLA</p>
            <p className="font-display text-lg font-bold text-emerald">99.4% On Time</p>
          </div>
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
            placeholder="Search order #, customer, item..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <Filter size={14} className="text-on-surface-variant shrink-0" />
          {["all", "processing", "shipped", "delivered"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                filter === status ? "bg-charcoal text-white" : "bg-surface-low text-on-surface-variant hover:text-charcoal"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Order ID</th>
              <th className="p-4">Client</th>
              <th className="p-4">Items Ordered</th>
              <th className="p-4">Total Value</th>
              <th className="p-4">Status & Action</th>
              <th className="p-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 font-mono font-semibold text-charcoal text-xs">{order.id}</td>
                <td className="p-4">
                  <span className="font-semibold text-charcoal block text-xs">{order.customerName}</span>
                  <span className="text-[11px] text-on-surface-variant">{order.date}</span>
                </td>
                <td className="p-4 text-xs font-medium text-charcoal max-w-xs">{order.items}</td>
                <td className="p-4 font-display font-semibold text-charcoal">{formatINR(order.total)}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value as BrandOrder["status"])}
                    className="text-xs bg-surface-low border border-outline-variant px-2 py-1 focus:outline-none font-semibold text-charcoal"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 border border-outline-color hover:border-charcoal text-charcoal"
                    title="View Full Order"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{selectedOrder.id}</span>
                <h2 className="font-display text-xl text-charcoal">Fulfillment Details</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="bg-surface-low p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Customer</span>
                  <span className="font-semibold text-charcoal">{selectedOrder.customerName} ({selectedOrder.customerEmail})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Amount Paid</span>
                  <span className="font-display font-semibold text-charcoal">{formatINR(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Order Date</span>
                  <span className="text-charcoal font-medium">{selectedOrder.date}</span>
                </div>
                {selectedOrder.trackingAwb && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">AWB Tracking Number</span>
                    <span className="font-mono text-emerald font-bold">{selectedOrder.trackingAwb}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Item Breakdown</label>
                <p className="bg-surface-low p-3 font-semibold text-charcoal">{selectedOrder.items}</p>
              </div>

              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Shipping Address</label>
                <p className="bg-surface-low p-3 text-on-surface-variant leading-relaxed">{selectedOrder.shippingAddress}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedOrder.id, "shipped");
                  }}
                  className="btn-secondary text-xs"
                >
                  <Truck size={13} /> Dispatch via BlueDart
                </button>
                <button onClick={() => setSelectedOrder(null)} className="btn-primary text-xs">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
