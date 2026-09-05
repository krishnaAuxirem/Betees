import { useState } from "react";
import { Bell, Package, Sparkles, Tag, ShieldCheck, CheckCheck, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_CUSTOMER_NOTIFICATIONS, CustomerNotificationItem } from "@/constants/dashboardData";

export const CustomerNotifications = () => {
  const [notifications, setNotifications] = useState<CustomerNotificationItem[]>(
    INITIAL_CUSTOMER_NOTIFICATIONS
  );
  const [activeTab, setActiveTab] = useState<"all" | "order" | "style" | "offer" | "system">("all");

  const filtered = notifications.filter((item) => {
    if (activeTab === "all") return true;
    return item.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("Notification inbox cleared");
  };

  const handleMarkOne = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification dismissed");
  };

  const getIcon = (type: CustomerNotificationItem["type"]) => {
    switch (type) {
      case "order":
        return <Package className="w-4 h-4 text-emerald-600" />;
      case "style":
        return <Sparkles className="w-4 h-4 text-burgundy" />;
      case "offer":
        return <Tag className="w-4 h-4 text-amber-600" />;
      case "system":
        return <ShieldCheck className="w-4 h-4 text-charcoal" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Activity & Atelier Dispatches</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">Notifications Center</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Stay updated on order shipments, master tailor verifications, and private client drops.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-charcoal/70 hover:text-charcoal px-3 py-2 border border-charcoal/15 bg-white transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Read</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs uppercase tracking-wider font-semibold text-charcoal/50 hover:text-rose-600 px-3 py-2 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-charcoal/10">
        {[
          { key: "all", label: "All Alerts" },
          { key: "order", label: "Orders & Shipping" },
          { key: "style", label: "AI & Styling" },
          { key: "offer", label: "Vouchers & Drops" },
          { key: "system", label: "System & Atelier" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`text-xs uppercase tracking-wider font-semibold pb-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === t.key
                ? "border-burgundy text-burgundy"
                : "border-transparent text-charcoal/50 hover:text-charcoal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-5 border transition-all flex items-start justify-between gap-4 ${
                !item.read
                  ? "bg-white border-burgundy/30 shadow-sm"
                  : "bg-warm-white/60 border-charcoal/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-warm-white border border-charcoal/10 flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-charcoal font-display">{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-burgundy shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-charcoal/70 leading-relaxed">{item.message}</p>
                  <span className="text-[10px] text-charcoal/40 font-mono block pt-1">{item.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!item.read && (
                  <button
                    onClick={() => handleMarkOne(item.id)}
                    title="Mark as read"
                    className="text-xs text-charcoal/40 hover:text-emerald-700 p-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  title="Dismiss notification"
                  className="text-xs text-charcoal/30 hover:text-rose-600 p-1.5 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-charcoal/10 p-12 text-center max-w-md mx-auto space-y-3">
          <Bell className="w-10 h-10 text-charcoal/30 mx-auto" />
          <h3 className="font-display text-lg font-medium text-charcoal">No notifications</h3>
          <p className="text-xs text-charcoal/60">
            You're completely caught up! New dispatch alerts and styling updates will appear here.
          </p>
        </div>
      )}
    </div>
  );
};
export default CustomerNotifications;
