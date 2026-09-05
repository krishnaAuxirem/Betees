import { useState } from "react";
import { Search, Filter, Eye, CheckCircle2, Truck, Scissors, Clock, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_DESIGNER_ORDERS, DesignerOrderItem } from "@/constants/dashboardData";

export const DesignerOrders = () => {
  const [orders, setOrders] = useState<DesignerOrderItem[]>(INITIAL_DESIGNER_ORDERS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<DesignerOrderItem | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchFilter = filter === "all" || o.status === filter;
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
                        o.item.toLowerCase().includes(search.toLowerCase()) ||
                        o.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleStatusChange = (orderId: string, newStatus: DesignerOrderItem["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order ${orderId} updated to ${newStatus.replace("_", " ").toUpperCase()}`);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusBadge = (status: DesignerOrderItem["status"]) => {
    switch (status) {
      case "in_progress":
        return <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide inline-flex items-center gap-1"><Scissors size={10} /> Cutting / Basting</span>;
      case "fitting_ready":
        return <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide inline-flex items-center gap-1"><Clock size={10} /> Fitting Ready</span>;
      case "shipped":
        return <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide inline-flex items-center gap-1"><Truck size={10} /> Dispatched</span>;
      case "completed":
        return <span className="bg-emerald/10 text-emerald text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide inline-flex items-center gap-1"><CheckCircle2 size={10} /> Delivered</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">Assigned</span>;
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Studio Production Orders</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Track bespoke tailoring commissions through cutting, basting fittings, and final delivery.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-3">
          <div>
            <p className="text-[9px] label-caps text-on-surface-variant">Active Pipeline</p>
            <p className="font-display text-xl font-bold text-charcoal">
              {formatINR(orders.reduce((sum, o) => o.status !== "completed" ? sum + o.amount : sum, 0))}
            </p>
          </div>
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
            placeholder="Search order ID, client, item..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <Filter size={14} className="text-on-surface-variant shrink-0" />
          {[
            { key: "all", label: "All Orders" },
            { key: "in_progress", label: "In Progress" },
            { key: "fitting_ready", label: "Fitting Ready" },
            { key: "shipped", label: "Dispatched" },
            { key: "completed", label: "Completed" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                filter === key ? "bg-charcoal text-white" : "bg-surface-low text-on-surface-variant hover:text-charcoal"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Order ID</th>
              <th className="p-4">Client</th>
              <th className="p-4">Garment</th>
              <th className="p-4">Total Commission</th>
              <th className="p-4">Target Date</th>
              <th className="p-4">Status & Update</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-surface-low/40 transition-colors">
                <td className="p-4 font-mono font-semibold text-charcoal">{order.id}</td>
                <td className="p-4">
                  <span className="font-semibold text-charcoal block">{order.customer}</span>
                  <span className="text-xs text-on-surface-variant">Advance Paid: {formatINR(order.advancePaid)}</span>
                </td>
                <td className="p-4">
                  <span className="font-medium text-charcoal block">{order.item}</span>
                  <span className="text-xs text-on-surface-variant truncate max-w-xs block">{order.notes}</span>
                </td>
                <td className="p-4 font-display font-semibold text-charcoal">{formatINR(order.amount)}</td>
                <td className="p-4 text-xs font-medium text-burgundy">{order.dueDate}</td>
                <td className="p-4">
                  <div className="space-y-1.5">
                    {getStatusBadge(order.status)}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as DesignerOrderItem["status"])}
                      className="block text-xs bg-surface-low border border-outline-variant px-2 py-1 focus:outline-none"
                    >
                      <option value="assigned">Assigned</option>
                      <option value="in_progress">In Progress (Basting)</option>
                      <option value="fitting_ready">Fitting Ready</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed / Delivered</option>
                    </select>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 border border-outline-color hover:border-charcoal text-charcoal"
                    title="View Order Details"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <p className="font-display text-lg text-charcoal">No orders match your filter</p>
            <p className="text-on-surface-variant text-sm mt-1">Try resetting search or status filters.</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="text-[10px] font-bold text-burgundy uppercase tracking-widest">{selectedOrder.id}</span>
                <h2 className="font-display text-xl text-charcoal">{selectedOrder.item}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-surface-low p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-on-surface-variant">Client Name</span>
                  <span className="font-semibold text-charcoal">{selectedOrder.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-on-surface-variant">Total Value</span>
                  <span className="font-display font-semibold text-charcoal">{formatINR(selectedOrder.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-on-surface-variant">Advance Paid</span>
                  <span className="text-emerald font-semibold">{formatINR(selectedOrder.advancePaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-on-surface-variant">Balance Due Upon Fitting</span>
                  <span className="text-charcoal font-semibold">{formatINR(selectedOrder.amount - selectedOrder.advancePaid)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-on-surface-variant">Target Handover</span>
                  <span className="text-burgundy font-semibold">{selectedOrder.dueDate}</span>
                </div>
              </div>

              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Tailor Workshop Notes</label>
                <p className="bg-surface-low p-3 text-sm text-charcoal">{selectedOrder.notes}</p>
              </div>

              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Update Status</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as DesignerOrderItem["status"])}
                  className="input-editorial w-full text-sm font-semibold"
                >
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress (Basting & Canvas)</option>
                  <option value="fitting_ready">Fitting Ready (Client Trial)</option>
                  <option value="shipped">Shipped to Client</option>
                  <option value="completed">Delivered & Closed</option>
                </select>
              </div>

              <div className="flex justify-end pt-4 border-t border-outline-variant">
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
