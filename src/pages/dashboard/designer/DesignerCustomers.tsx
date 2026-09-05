import { useState } from "react";
import { Search, Mail, Phone, MapPin, Eye, MessageCircle, X, Ruler } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_DESIGNER_CUSTOMERS, DesignerCustomerItem } from "@/constants/dashboardData";

export const DesignerCustomers = () => {
  const [customers, setCustomers] = useState<DesignerCustomerItem[]>(INITIAL_DESIGNER_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [selectedCust, setSelectedCust] = useState<DesignerCustomerItem | null>(null);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Bespoke Client Directory</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Maintain customer measurement profiles, consultation records, and lifetime commission values.
          </p>
        </div>
        <div className="stat-card py-2 px-4">
          <p className="text-[9px] label-caps text-on-surface-variant">Active Repeat Rate</p>
          <p className="font-display text-xl font-bold text-emerald">68% Repeat</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 shadow-editorial">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client by name, email, city..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((client) => (
          <div key={client.id} className="bg-white shadow-editorial p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center font-bold text-base">
                    {client.name[0]}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-charcoal">{client.name}</h3>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1">
                      <MapPin size={11} /> {client.city}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald/10 text-emerald px-2 py-0.5 uppercase">
                  VIP Client
                </span>
              </div>

              <div className="space-y-1.5 mt-4 pt-4 border-t border-outline-variant text-xs">
                <p className="flex items-center gap-2 text-on-surface-variant">
                  <Mail size={12} /> {client.email}
                </p>
                <p className="flex items-center gap-2 text-on-surface-variant">
                  <Phone size={12} /> {client.phone}
                </p>
              </div>

              <div className="bg-surface-low p-3 mt-3">
                <p className="label-caps text-[9px] text-on-surface-variant mb-1 flex items-center gap-1">
                  <Ruler size={10} /> Saved Measurements
                </p>
                <p className="font-mono text-xs text-charcoal truncate">{client.measurementsSummary}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Total Spend</p>
                <p className="font-display text-base font-bold text-charcoal">{formatINR(client.totalSpent)}</p>
                <p className="text-[10px] text-on-surface-variant">{client.totalOrders} bespoke orders</p>
              </div>
              <button
                onClick={() => setSelectedCust(client)}
                className="btn-primary text-[10px] py-1.5 px-3"
              >
                <Eye size={12} /> Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Measurement Modal */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{selectedCust.id}</span>
                <h2 className="font-display text-xl text-charcoal">{selectedCust.name}</h2>
              </div>
              <button onClick={() => setSelectedCust(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 bg-surface-low p-4 text-xs">
                <div>
                  <span className="text-on-surface-variant block">Email:</span>
                  <span className="font-semibold text-charcoal">{selectedCust.email}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Phone:</span>
                  <span className="font-semibold text-charcoal">{selectedCust.phone}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">City:</span>
                  <span className="font-semibold text-charcoal">{selectedCust.city}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block">Last Commission:</span>
                  <span className="font-semibold text-charcoal">{selectedCust.lastOrderDate}</span>
                </div>
              </div>

              <div>
                <h4 className="label-caps text-[10px] text-on-surface-variant mb-1">Detailed Measurement Profile</h4>
                <div className="bg-surface-low p-4 font-mono text-sm space-y-1 text-charcoal">
                  {selectedCust.measurementsSummary.split(" · ").map((m) => (
                    <div key={m} className="flex justify-between border-b border-outline-variant/60 py-1">
                      <span>{m.split(":")[0]}</span>
                      <span className="font-bold">{m.split(":")[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-outline-variant">
                <button
                  onClick={() => {
                    toast.success(`Opening consultation inbox for ${selectedCust.name}`);
                    setSelectedCust(null);
                  }}
                  className="btn-secondary text-xs"
                >
                  <MessageCircle size={13} /> Message Client
                </button>
                <button onClick={() => setSelectedCust(null)} className="btn-primary text-xs">
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
