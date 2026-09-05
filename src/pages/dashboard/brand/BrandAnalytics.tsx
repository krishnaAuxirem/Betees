import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, ShoppingBag, DollarSign, Award } from "lucide-react";
import { formatINR } from "@/constants/data";

const revenueTrend = [
  { month: "Apr", gmv: 420000, orders: 84 },
  { month: "May", gmv: 580000, orders: 112 },
  { month: "Jun", gmv: 640000, orders: 126 },
  { month: "Jul", gmv: 590000, orders: 118 },
  { month: "Aug", gmv: 780000, orders: 154 },
  { month: "Sep", gmv: 920000, orders: 184 },
];

const bestSellers = [
  { name: "Burgundy Cashmere Trench", sales: 42, revenue: 3297000 },
  { name: "Wool-Silk Tuxedo Blazer", sales: 38, revenue: 1976000 },
  { name: "Silk Zardozi Lehenga", sales: 27, revenue: 3915000 },
  { name: "Obsidian Drape Cape", sales: 31, revenue: 1205900 },
  { name: "Rose Silk Halter Blouse", sales: 54, revenue: 999000 },
];

const categoryBreakdown = [
  { name: "Outerwear", value: 42, color: "#7F1D3A" },
  { name: "Suits & Blazers", value: 28, color: "#18181B" },
  { name: "Bridal & Ethnic", value: 18, color: "#C08484" },
  { name: "Tops & Silk Separates", value: 12, color: "#059669" },
];

export const BrandAnalytics = () => {
  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Brand Sales & Conversion Analytics</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Analyze customer basket trends, highest grossing garments, and category revenue share.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <Award size={16} className="text-burgundy" />
          <span className="text-xs font-semibold text-charcoal">Top 10 Fashion Brand on Betees</span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total 6M Revenue</p>
          <p className="font-display text-3xl font-bold text-emerald">₹39.3L</p>
          <p className="text-xs text-emerald mt-1">+34% growth YoY</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total Orders</p>
          <p className="font-display text-3xl font-bold text-charcoal">778</p>
          <p className="text-xs text-on-surface-variant mt-1">Avg 130/month</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Average Order Value</p>
          <p className="font-display text-3xl font-bold text-burgundy">₹21,450</p>
          <p className="text-xs text-on-surface-variant mt-1">High luxury segment</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Conversion Rate</p>
          <p className="font-display text-3xl font-bold text-emerald">3.8%</p>
          <p className="text-xs text-on-surface-variant mt-1">Marketplace avg: 2.1%</p>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white shadow-editorial p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-charcoal">Gross Revenue & Order Velocity</h3>
            <p className="text-xs text-on-surface-variant">Monthly progression across marketplace sales</p>
          </div>
          <span className="text-xs bg-surface-low px-2 py-1 font-semibold text-charcoal">Last 6 Months</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={revenueTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
            <Tooltip
              formatter={(v: number, name: string) => [name === "gmv" ? formatINR(v) : v, name === "gmv" ? "Revenue" : "Orders"]}
            />
            <Bar dataKey="gmv" fill="#7F1D3A" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Best Sellers and Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Best Sellers Table */}
        <div className="lg:col-span-2 bg-white shadow-editorial p-6 space-y-4">
          <h3 className="font-display text-lg text-charcoal">Top Grossing Garments</h3>
          <div className="space-y-3">
            {bestSellers.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-surface-low text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-5 font-bold font-mono text-on-surface-variant">#{idx + 1}</span>
                  <div>
                    <p className="font-semibold text-charcoal">{item.name}</p>
                    <p className="text-[10px] text-on-surface-variant">{item.sales} units dispatched</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display font-semibold text-charcoal">{formatINR(item.revenue)}</p>
                  <span className="text-[10px] text-emerald font-bold">Top Seller</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Share */}
        <div className="bg-white shadow-editorial p-6 space-y-3">
          <h3 className="font-display text-lg text-charcoal">Category Revenue Split</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={42} outerRadius={68} dataKey="value">
                {categoryBreakdown.map((c, i) => (
                  <Cell key={i} fill={c.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 pt-2 border-t border-outline-variant">
            {categoryBreakdown.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-on-surface-variant">{c.name}</span>
                </div>
                <span className="font-semibold text-charcoal">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
