import { BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, Package, AlertTriangle, Shield, BarChart } from "lucide-react";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { formatINR } from "@/constants/data";

const platformData = [
  { month: "Apr", gmv: 1200000, orders: 340 },
  { month: "May", gmv: 1580000, orders: 428 },
  { month: "Jun", gmv: 1920000, orders: 512 },
  { month: "Jul", gmv: 1650000, orders: 445 },
  { month: "Aug", gmv: 2180000, orders: 589 },
  { month: "Sep", gmv: 2640000, orders: 712 },
];

const roleData = [
  { name: "Customers", value: 76, color: "#7F1D3A" },
  { name: "Designers", value: 12, color: "#18181B" },
  { name: "Brands", value: 8, color: "#C08484" },
  { name: "Creators", value: 4, color: "#059669" },
];

const PENDING_VERIFICATIONS = [
  { id: "1", name: "Kavya Textiles Pvt Ltd", type: "Brand", applied: "Sep 3", docs: "Complete" },
  { id: "2", name: "Ravi Bhandari", type: "Designer", applied: "Sep 2", docs: "Pending ID" },
  { id: "3", name: "Studio K", type: "Tailor", applied: "Sep 1", docs: "Complete" },
];

const RECENT_DISPUTES = [
  { id: "#D-128", customer: "Priya S.", issue: "Wrong size delivered", amount: 18500, status: "open" },
  { id: "#D-127", customer: "Vikram M.", issue: "Late delivery — 5 days", amount: 35000, status: "resolved" },
];

export const AdminDashboard = () => {
  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Platform Administration</h1>
          <p className="text-on-surface-variant text-sm mt-1">Betees marketplace governance & analytics</p>
        </div>
        <span className="flex items-center gap-2 bg-charcoal px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="label-caps text-[10px] text-white">System Operational</span>
        </span>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Platform GMV", value: "₹8.5Cr", delta: "+24% MoM", icon: DollarSign, color: "text-emerald" },
          { label: "Total Orders", value: "3,240", delta: "712 this month", icon: ShoppingBag, color: "text-charcoal" },
          { label: "Active Users", value: "2.4M", delta: "+12K this week", icon: Users, color: "text-burgundy" },
          { label: "Pending Verif.", value: "14", delta: "3 urgent", icon: Shield, color: "text-rose-gold" },
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
        {/* GMV Chart */}
        <div className="lg:col-span-2 bg-white shadow-editorial p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-charcoal">Platform GMV & Orders</h3>
            <select className="text-xs border border-outline-color py-1 px-2 focus:outline-none">
              <option>Last 6 Months</option><option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ReBarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
              <Tooltip formatter={(v: number, name: string) => [name === "gmv" ? formatINR(v) : v, name === "gmv" ? "GMV" : "Orders"]} />
              <Bar dataKey="gmv" fill="#7F1D3A" radius={[2, 2, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution */}
        <div className="bg-white shadow-editorial p-5">
          <h3 className="font-display text-lg text-charcoal mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {roleData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {roleData.map((r) => (
              <div key={r.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className="text-on-surface-variant">{r.name}</span>
                </div>
                <span className="font-semibold">{r.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Queue */}
        <div className="bg-white shadow-editorial">
          <div className="flex items-center justify-between p-5 border-b border-outline-variant">
            <h3 className="font-display text-lg text-charcoal">Verification Queue</h3>
            <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5">3 Pending</span>
          </div>
          <div className="divide-y divide-outline-variant">
            {PENDING_VERIFICATIONS.map((v) => (
              <div key={v.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-charcoal">{v.name}</p>
                  <p className="text-xs text-on-surface-variant">{v.type} · Applied {v.applied}</p>
                  <span className={`text-[10px] font-semibold ${v.docs === "Complete" ? "text-emerald" : "text-yellow-600"}`}>{v.docs}</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="px-3 py-1 bg-emerald text-white text-[10px] font-semibold uppercase">Approve</button>
                  <button className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-semibold uppercase">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disputes */}
        <div className="bg-white shadow-editorial">
          <div className="flex items-center justify-between p-5 border-b border-outline-variant">
            <h3 className="font-display text-lg text-charcoal">Recent Disputes</h3>
            <AlertTriangle size={16} className="text-yellow-500" />
          </div>
          <div className="divide-y divide-outline-variant">
            {RECENT_DISPUTES.map((d) => (
              <div key={d.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-charcoal">{d.id} — {d.customer}</p>
                  <p className="text-xs text-on-surface-variant">{d.issue}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-display font-semibold">{formatINR(d.amount)}</p>
                  <span className={`text-[10px] font-semibold uppercase ${d.status === "open" ? "text-red-500" : "text-emerald"}`}>{d.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Admin Actions */}
      <div className="bg-white shadow-editorial p-5">
        <h3 className="font-display text-lg text-charcoal mb-4">Quick Admin Actions</h3>
        <div className="flex flex-wrap gap-3">
          {["Manage Users", "Product Moderation", "Blog Management", "Payment Reports", "Platform Analytics", "Fraud Monitoring"].map((action) => (
            <button key={action} className="px-4 py-2 border border-outline-color text-sm font-medium text-charcoal hover:border-charcoal hover:bg-surface-low transition-all">
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
