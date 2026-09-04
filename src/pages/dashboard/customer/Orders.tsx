import { Package, Truck, Check, Clock, X } from "lucide-react";
import { formatINR } from "@/constants/data";
import { PRODUCTS } from "@/constants/data";

const ORDERS = [
  { id: "#BT-7821", product: PRODUCTS[0], status: "delivered", date: "Sep 2, 2026", amount: 78500, tracking: "DTDC789456", size: "M" },
  { id: "#BT-7820", product: PRODUCTS[1], status: "shipped", date: "Sep 1, 2026", amount: 52000, tracking: "BLUEDART123", size: "40R" },
  { id: "#BT-7819", product: PRODUCTS[2], status: "processing", date: "Aug 30, 2026", amount: 145000, tracking: "—", size: "S" },
  { id: "#BT-7815", product: PRODUCTS[3], status: "delivered", date: "Aug 25, 2026", amount: 38900, tracking: "FEDEX456", size: "M" },
];

const STATUS_ICON = { delivered: Check, shipped: Truck, processing: Clock, cancelled: X };
const STATUS_COLOR: Record<string, string> = {
  delivered: "text-emerald bg-emerald/10",
  shipped: "text-blue-600 bg-blue-50",
  processing: "text-yellow-600 bg-yellow-50",
  cancelled: "text-red-500 bg-red-50",
};

const STEPS = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];
const STEP_INDEX: Record<string, number> = { processing: 1, shipped: 2, delivered: 4 };

export const Orders = () => (
  <div className="p-5 md:p-8 space-y-6 animate-fade-in">
    <h1 className="font-display text-2xl text-charcoal">My Orders</h1>

    <div className="space-y-4">
      {ORDERS.map((order) => {
        const StatusIcon = STATUS_ICON[order.status as keyof typeof STATUS_ICON] || Clock;
        const currentStep = STEP_INDEX[order.status] || 0;

        return (
          <div key={order.id} className="bg-white shadow-editorial overflow-hidden">
            <div className="p-5 flex flex-col sm:flex-row gap-4">
              <div className="w-20 h-24 bg-surface-low overflow-hidden shrink-0">
                <img src={order.product.image} alt={order.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-on-surface-variant">{order.product.brand}</p>
                    <p className="font-semibold text-charcoal">{order.product.name}</p>
                    <p className="text-xs text-on-surface-variant">Size: {order.size} · {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold text-charcoal">{formatINR(order.amount)}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 uppercase inline-flex items-center gap-1 ${STATUS_COLOR[order.status]}`}>
                      <StatusIcon size={10} /> {order.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant">Order {order.id} {order.tracking !== "—" ? `· Tracking: ${order.tracking}` : ""}</p>
              </div>
            </div>

            {/* Timeline */}
            {order.status !== "cancelled" && (
              <div className="bg-surface-low px-5 py-4">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {STEPS.map((step, i) => (
                    <div key={step} className="flex items-center gap-1 shrink-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i <= currentStep ? "bg-charcoal text-white" : "bg-outline-color text-on-surface-variant"}`}>
                        {i < currentStep ? <Check size={10} /> : i + 1}
                      </div>
                      <span className={`text-[10px] whitespace-nowrap ${i <= currentStep ? "text-charcoal font-semibold" : "text-on-surface-variant"}`}>{step}</span>
                      {i < STEPS.length - 1 && <div className={`w-6 h-0.5 ${i < currentStep ? "bg-charcoal" : "bg-outline-color"}`} />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="px-5 py-3 flex gap-3 border-t border-outline-variant">
              {order.status === "delivered" && (
                <button className="text-xs text-burgundy font-semibold hover:underline">Write Review</button>
              )}
              {order.status !== "delivered" && order.status !== "cancelled" && (
                <button className="text-xs text-charcoal font-semibold hover:underline">Track Order</button>
              )}
              <button className="text-xs text-on-surface-variant hover:text-charcoal">View Details</button>
              {order.status === "processing" && (
                <button className="text-xs text-red-500 hover:underline ml-auto">Cancel Order</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
