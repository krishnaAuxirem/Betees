import { DollarSign, ShoppingBag, Star, Upload, Check, Sparkles, Briefcase, Users, Eye, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { formatINR } from "@/constants/data";

const monthlyEarningsData = [
  { month: "Apr", earnings: 28000 },
  { month: "May", earnings: 35000 },
  { month: "Jun", earnings: 42000 },
  { month: "Jul", earnings: 38000 },
  { month: "Aug", earnings: 52000 },
  { month: "Sep", earnings: 67000 },
];

const RECENT_REQUESTS = [
  { id: "1", customer: "Riya M.", item: "Bridal Sangeet Styling Session", budget: "₹18,000", status: "pending", date: "Sep 3" },
  { id: "2", customer: "Aryan K.", item: "Corporate Executive Capsule Curation", budget: "₹25,000", status: "quoted", date: "Sep 2" },
  { id: "3", customer: "Priya S.", item: "Festive Wardrobe Audit & Lookbook", budget: "₹12,000", status: "accepted", date: "Sep 1" },
];

const ACTIVE_CAMPAIGNS = [
  { brand: "Aurelia Couture", title: "Festive Cashmere Autumn Drop", payout: "₹75,000", status: "Draft Approved", deadline: "Sep 25" },
  { brand: "Studio Cadence", title: "Fluid Silk Capsule Styling", payout: "₹45,000", status: "Post Live", deadline: "Sep 30" },
];

export const CreatorOverview = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Creator Studio</h1>
          <p className="text-on-surface-variant text-sm mt-1">Welcome back, {user?.name?.split(" ")[0] || "Neha"}</p>
        </div>
        <span className="flex items-center gap-2 bg-emerald/10 px-3 py-1.5 self-start">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="label-caps text-[10px] text-emerald">Profile Verified</span>
        </span>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Earnings", value: "₹2.62L", delta: "+18% this month", icon: DollarSign, color: "text-emerald" },
          { label: "Active Deals", value: "3", delta: "2 brand campaigns", icon: Briefcase, color: "text-charcoal" },
          { label: "Styling Requests", value: "8", delta: "5 pending reply", icon: Upload, color: "text-burgundy" },
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

      {/* Chart & Profile Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-white shadow-editorial p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-charcoal">Monthly Creator Earnings</h3>
            <span className="text-xs text-on-surface-variant bg-surface-low px-2 py-1 font-medium">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyEarningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [formatINR(v), "Earned"]} />
              <Bar dataKey="earnings" fill="#7F1D3A" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-editorial p-5 space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-burgundy rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {user?.name?.[0] || "N"}
            </div>
            <p className="font-display text-lg font-semibold text-charcoal">{user?.name || "Neha Gupta"}</p>
            <p className="text-sm text-on-surface-variant">Fashion Creator & Stylist</p>
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
          <Link
            to="/dashboard/creator/settings"
            className="w-full py-2 bg-charcoal text-white text-xs font-semibold uppercase tracking-wide hover:bg-burgundy transition-colors block text-center"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Incoming Styling Requests & Active Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Custom Styling Requests */}
        <div className="bg-white shadow-editorial">
          <div className="flex items-center justify-between p-5 border-b border-outline-variant">
            <h3 className="font-display text-lg text-charcoal">Incoming Styling Requests</h3>
            <Link to="/dashboard/creator/requests" className="text-xs text-burgundy hover:underline">
              View All →
            </Link>
          </div>
          <div className="divide-y divide-outline-variant">
            {RECENT_REQUESTS.map((req) => (
              <div key={req.id} className="p-4 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-semibold text-charcoal text-sm">{req.item}</p>
                  <p className="text-on-surface-variant mt-0.5">{req.customer} · {req.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-semibold text-charcoal text-sm">{req.budget}</p>
                  <span className="text-[10px] uppercase font-bold text-yellow-800 bg-yellow-100 px-2 py-0.5">
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Brand Campaigns */}
        <div className="bg-white shadow-editorial">
          <div className="flex items-center justify-between p-5 border-b border-outline-variant">
            <h3 className="font-display text-lg text-charcoal">Active Brand Collaborations</h3>
            <Link to="/dashboard/creator/campaigns" className="text-xs text-burgundy hover:underline">
              Track All →
            </Link>
          </div>
          <div className="divide-y divide-outline-variant">
            {ACTIVE_CAMPAIGNS.map((camp) => (
              <div key={camp.title} className="p-4 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="label-caps text-[9px] text-burgundy font-bold">{camp.brand}</span>
                  <p className="font-semibold text-charcoal text-sm">{camp.title}</p>
                  <p className="text-on-surface-variant mt-0.5">Deadline: {camp.deadline}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-semibold text-emerald text-sm">{camp.payout}</p>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 uppercase">
                    {camp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
