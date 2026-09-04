import { BarChart3, TrendingUp, Users, ShoppingBag, Sparkles, Bell, ArrowUpRight, Package, Star } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAuthStore } from "@/stores/authStore";
import { Link } from "react-router-dom";
import { PRODUCTS, formatINR } from "@/constants/data";

const salesData = [
  { month: "Oct", sales: 42000 }, { month: "Nov", sales: 58000 }, { month: "Dec", sales: 76000 },
  { month: "Jan", sales: 52000 }, { month: "Feb", sales: 63000 }, { month: "Mar", sales: 89000 },
];

const categoryData = [
  { name: "Women", value: 40, color: "#7F1D3A" },
  { name: "Men", value: 28, color: "#18181B" },
  { name: "Ethnic", value: 22, color: "#C08484" },
  { name: "Other", value: 10, color: "#E8E6E2" },
];

const RECENT_ORDERS = [
  { id: "#BT-7821", product: "Imperial Burgundy Trench", customer: "Riya M.", amount: 78500, status: "delivered", date: "Sep 2" },
  { id: "#BT-7820", product: "AI Styled Kurta Set", customer: "Aryan K.", amount: 18500, status: "shipped", date: "Sep 1" },
  { id: "#BT-7819", product: "Custom Blazer Commission", customer: "Sneha P.", amount: 52000, status: "processing", date: "Aug 30" },
];

const STATUS_STYLES: Record<string, string> = {
  delivered: "bg-emerald/10 text-emerald",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  pending: "bg-gray-100 text-gray-600",
};

export const CustomerDashboard = () => {
  const { user } = useAuthStore();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">
            {greeting}, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">Here's what we'd style for you today</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald/10 px-3 py-1.5 self-start">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="label-caps text-[10px] text-emerald">AI Stylist Active</span>
        </div>
      </div>

      {/* AI Today's Recommendation */}
      <div className="bg-charcoal p-5 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-burgundy/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-5">
          <div className="w-16 h-16 bg-burgundy/20 rounded-full flex items-center justify-center shrink-0">
            <Sparkles size={24} className="text-rose-gold" />
          </div>
          <div className="flex-1">
            <p className="label-caps text-[10px] text-rose-gold mb-1">Today's AI Recommendation</p>
            <p className="font-display text-lg text-white">"For your upcoming office event, I recommend the charcoal blazer paired with silk trousers — 96% match to your warm autumn palette."</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Link to="/ai-stylist" className="px-4 py-2 bg-burgundy text-white text-xs font-semibold uppercase tracking-wide hover:bg-white hover:text-charcoal transition-colors">
                Open AI Stylist
              </Link>
              <Link to="/virtual-try-on" className="px-4 py-2 bg-white/10 text-white text-xs font-semibold uppercase tracking-wide hover:bg-white/20 transition-colors">
                Virtual Try-On
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: "24", delta: "+3 this month", icon: Package, color: "text-charcoal" },
          { label: "Wishlist Items", value: "18", delta: "5 back in stock", icon: Star, color: "text-burgundy" },
          { label: "Style Sessions", value: "47", delta: "AI curations", icon: Sparkles, color: "text-rose-gold" },
          { label: "Loyalty Points", value: "2,840", delta: "₹284 value", icon: TrendingUp, color: "text-emerald" },
        ].map(({ label, value, delta, icon: Icon, color }) => (
          <div key={label} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="label-caps text-[9px] text-on-surface-variant mb-1">{label}</p>
                <p className={`font-display text-3xl font-semibold ${color}`}>{value}</p>
                <p className="text-xs text-on-surface-variant mt-1">{delta}</p>
              </div>
              <Icon size={20} className={color} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white shadow-editorial p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-charcoal">Purchase History</h3>
            <select className="text-xs border border-outline-color py-1 px-2 focus:outline-none">
              <option>Last 6 Months</option><option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [formatINR(v), "Spent"]} />
              <Line type="monotone" dataKey="sales" stroke="#7F1D3A" strokeWidth={2} dot={{ fill: "#7F1D3A", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white shadow-editorial p-5">
          <h3 className="font-display text-lg text-charcoal mb-4">Shopping By Category</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-on-surface-variant">{c.name}</span>
                </div>
                <span className="font-semibold text-charcoal">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white shadow-editorial">
          <div className="flex items-center justify-between p-5 border-b border-outline-variant">
            <h3 className="font-display text-lg text-charcoal">Recent Orders</h3>
            <Link to="/dashboard/customer/orders" className="text-xs text-burgundy hover:underline">View All →</Link>
          </div>
          <div className="divide-y divide-outline-variant">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-charcoal truncate">{order.product}</p>
                  <p className="text-xs text-on-surface-variant">{order.id} · {order.customer}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-display font-semibold text-charcoal">{formatINR(order.amount)}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wide ${STATUS_STYLES[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="bg-white shadow-editorial">
          <div className="flex items-center justify-between p-5 border-b border-outline-variant">
            <h3 className="font-display text-lg text-charcoal">Recommended For You</h3>
            <Link to="/shop" className="text-xs text-burgundy hover:underline">View All →</Link>
          </div>
          <div className="divide-y divide-outline-variant">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div key={p.id} className="p-4 flex items-center gap-3">
                <div className="w-12 h-14 bg-surface-low overflow-hidden shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-on-surface-variant">{p.brand}</p>
                  <p className="text-sm font-semibold text-charcoal truncate">{p.name}</p>
                  <p className="text-xs font-display font-semibold text-burgundy">{formatINR(p.price)}</p>
                </div>
                {p.aiMatch && (
                  <div className="shrink-0 text-center">
                    <p className="text-[11px] font-bold text-burgundy">{p.aiMatch}%</p>
                    <p className="text-[9px] text-on-surface-variant">AI Match</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
