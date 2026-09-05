import { useState } from "react";
import { Search, Filter, Eye, Download, X, Package, Truck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface PlatformOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  sellerBrand: string;
  product: string;
  amount: number;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentGateway: string;
  trackingNumber?: string;
}

const INITIAL_PLATFORM_ORDERS: PlatformOrder[] = [
  { id: "#BT-7821", customerName: "Priya Sharma", customerEmail: "priya@betees.com", sellerBrand: "Aurelia Couture", product: "Imperial Burgundy Cashmere Trench", amount: 78500, date: "Sep 3, 2026", status: "processing", paymentGateway: "Razorpay", trackingNumber: "DTDC789456" },
  { id: "#BT-7820", customerName: "Aryan Kapoor", customerEmail: "aryan.k@techcorp.in", sellerBrand: "Atelier Vesper", product: "Structured Wool-Silk Blazer", amount: 52000, date: "Sep 2, 2026", status: "shipped", paymentGateway: "UPI", trackingNumber: "BLUEDART123" },
  { id: "#BT-7819", customerName: "Sneha Patel", customerEmail: "sneha.p@patel.co", sellerBrand: "House of Rohit Bal", product: "Silk Zardozi Embroidered Lehenga", amount: 145000, date: "Sep 1, 2026", status: "delivered", paymentGateway: "NetBanking", trackingNumber: "DELHIVERY892" },
  { id: "#BT-7818", customerName: "Karan Mehta", customerEmail: "karan.mehta@studio.in", sellerBrand: "Maison Noir", product: "Obsidian Drape Cape Dress", amount: 38900, date: "Aug 30, 2026", status: "delivered", paymentGateway: "Razorpay", trackingNumber: "FEDEX456" },
  { id: "#BT-7817", customerName: "Ishita Verma", customerEmail: "ishita@vogue.in", sellerBrand: "Studio Cadence", product: "Fluid Silk Palazzo Trousers", amount: 24500, date: "Aug 28, 2026", status: "cancelled", paymentGateway: "UPI" },
];

export const AdminOrders = () => {
  const [orders, setOrders] = useState<PlatformOrder[]>(INITIAL_PLATFORM_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sellerFilter, setSellerFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<PlatformOrder | null>(null);

  const sellers = ["all", "Aurelia Couture", "Atelier Vesper", "House of Rohit Bal", "Maison Noir", "Studio Cadence"];

  const filtered = orders.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
                        o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    const matchSeller = sellerFilter === "all" || o.sellerBrand === sellerFilter;
    return matchSearch && matchStatus && matchSeller;
  });

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Platform Order Oversight</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Global monitoring of customer transactions, merchant fulfillment SLAs, and logistics dispatches.
          </p>
        </div>
        <button
          onClick={() => toast.success("Exporting platform orders ledger as CSV...")}
          className="btn-primary self-start text-xs"
        >
          <Download size={14} /> Export Master Ledger
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 shadow-editorial flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order #, customer, product..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <select
            value={sellerFilter}
            onChange={(e) => setSellerFilter(e.target.value)}
            className="text-xs bg-surface-low border border-outline-variant px-2.5 py-1.5 focus:outline-none font-semibold text-charcoal"
          >
            {sellers.map((s) => (
              <option key={s} value={s}>{s === "all" ? "All Sellers / Brands" : s}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-surface-low border border-outline-variant px-2.5 py-1.5 focus:outline-none font-semibold text-charcoal"
          >
            <option value="all">All Fulfillment Statuses</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Seller / Atelier</th>
              <th className="p-4">Item Details</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Inspect</th>
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
                <td className="p-4 text-xs font-medium text-charcoal">{order.sellerBrand}</td>
                <td className="p-4 text-xs font-medium text-charcoal max-w-xs">{order.product}</td>
                <td className="p-4 font-display font-semibold text-charcoal">{formatINR(order.amount)}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      order.status === "delivered"
                        ? "bg-emerald/10 text-emerald"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-1.5 border border-outline-color hover:border-charcoal text-charcoal"
                    title="Inspect Order Details"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{selectedOrder.id}</span>
                <h2 className="font-display text-xl text-charcoal">Transaction Audit</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <div className="bg-surface-low p-3 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Customer</span>
                  <span className="font-semibold text-charcoal">{selectedOrder.customerName} ({selectedOrder.customerEmail})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Merchant Seller</span>
                  <span className="font-semibold text-charcoal">{selectedOrder.sellerBrand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Total Amount</span>
                  <span className="font-display font-bold text-charcoal">{formatINR(selectedOrder.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Payment Gateway</span>
                  <span className="font-mono text-charcoal font-semibold">{selectedOrder.paymentGateway}</span>
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Courier Tracking</span>
                    <span className="font-mono text-emerald font-bold">{selectedOrder.trackingNumber}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Garment Ordered</label>
                <p className="bg-surface-low p-2.5 font-medium text-charcoal">{selectedOrder.product}</p>
              </div>

              <div className="flex justify-end pt-3 border-t border-outline-variant">
                <button onClick={() => setSelectedOrder(null)} className="btn-primary text-xs">
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
