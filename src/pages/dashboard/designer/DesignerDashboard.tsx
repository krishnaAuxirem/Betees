import { BarChart3, TrendingUp, Users, ShoppingBag, Star, DollarSign, Package, Upload, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useAuthStore } from "@/stores/authStore";
import { formatINR } from "@/constants/data";

const earningsData = [
  { month: "Apr", earnings: 28000 }, { month: "May", earnings: 35000 }, { month: "Jun", earnings: 42000 },
  { month: "Jul", earnings: 38000 }, { month: "Aug", earnings: 52000 }, { month: "Sep", earnings: 67000 },
];

const requestsData = [
  { id: "1", customer: "Riya M.", item: "Wedding Lehenga", budget: "₹80,000", status: "pending", date: "Sep 3" },
  { id: "2", customer: "Aryan K.", item: "Bespoke Tuxedo", budget: "₹55,000", status: "quoted", date: "Sep 2" },
  { id: "3", customer: "Priya S.", item: "Custom Anarkali", budget: "₹25,000", status: "accepted", date: "Sep 1" },
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  quoted: "bg-blue-100 text-blue-700",
  accepted: "bg-emerald/10 text-emerald",
  completed: "bg-gray-100 text-gray-700",
};

export const DesignerDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Designer Studio</h1>
          <p className="text-on-surface-variant text-sm mt-1">Welcome back, {user?.name?.split(" ")[0]}</p>
        </div>
        <span className="flex items-center gap-2 bg-emerald/10 px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="label-caps text-[10px] text-emerald">Profile Verified</span>
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Earnings", value: "₹2.62L", delta: "+18% this month", icon: DollarSign, color: "text-emerald" },
          { label: "Active Orders", value: "12", delta: "3 due this week", icon: Package, color: "text-charcoal" },
          { label: "Custom Requests", value: "8", delta: "5 pending reply", icon: Upload, color: "text-burgundy" },
          { label: "Avg Rating", value: "4.96★", delta: "From 98 reviews", icon: Star, color: "text-rose-gold" },
        ].map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="label-caps text-[9px] text-on-surface-variant mb-1">{label}</p>
                <p className={`font-display text-2xl font-semibold ${color}`}>{value}</p>
                <p className="text-xs text-on-surface-variant mt-1">{delta}</p>
              </div>
              <Icon size={20} className={color} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-white shadow-editorial p-5">
          <h3 className="font-display text-lg text-charcoal mb-4">Monthly Earnings</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [formatINR(v), "Earned"]} />
              <Bar dataKey="earnings" fill="#7F1D3A" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-editorial p-5 space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-burgundy rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {user?.name?.[0] || "D"}
            </div>
            <p className="font-display text-lg font-semibold text-charcoal">{user?.name}</p>
            <p className="text-sm text-on-surface-variant">Independent Designer</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Check size={12} className="text-burgundy" />
              <span className="label-caps text-[9px] text-burgundy">Verified & Active</span>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-outline-variant">
            {[["Completion Rate", "96%"], ["Avg. Response", "2 hrs"], ["Repeat Clients", "68%"]].map(([k, v]) => (
              <div key={k as string} className="flex justify-between text-sm">
                <span className="text-on-surface-variant">{k}</span>
                <span className="font-semibold text-charcoal">{v}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-2 bg-charcoal text-white text-xs font-semibold uppercase tracking-wide hover:bg-burgundy transition-colors">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Custom Requests */}
      <div className="bg-white shadow-editorial">
        <div className="flex items-center justify-between p-5 border-b border-outline-variant">
          <h3 className="font-display text-lg text-charcoal">Incoming Custom Requests</h3>
          <button className="text-xs text-burgundy hover:underline">View All</button>
        </div>
        <div className="divide-y divide-outline-variant">
          {requestsData.map((req) => (
            <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-charcoal">{req.item}</p>
                <p className="text-xs text-on-surface-variant">{req.customer} · {req.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-display font-semibold text-charcoal">{req.budget}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 uppercase ${STATUS_STYLES[req.status]}`}>{req.status}</span>
                <div className="flex gap-1.5">
                  <button className="px-3 py-1 bg-emerald text-white text-[10px] font-semibold uppercase">Accept</button>
                  <button className="px-3 py-1 bg-surface-low text-charcoal text-[10px] font-semibold uppercase">Quote</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
