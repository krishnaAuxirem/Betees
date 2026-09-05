import { useState } from "react";
import { DollarSign, ShoppingBag, Package, AlertTriangle, TrendingUp, ArrowUpRight, BarChart3 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router-dom";
import { formatINR } from "@/constants/data";

const brandSalesData = [
  { month: "Apr", revenue: 420000, orders: 84 },
  { month: "May", revenue: 580000, orders: 112 },
  { month: "Jun", revenue: 640000, orders: 126 },
  { month: "Jul", revenue: 590000, orders: 118 },
  { month: "Aug", revenue: 780000, orders: 154 },
  { month: "Sep", revenue: 920000, orders: 184 },
];

const categoryData = [
  { name: "Outerwear & Trenches", value: 42, color: "#7F1D3A" },
  { name: "Blazers & Suiting", value: 28, color: "#18181B" },
  { name: "Ethnic Couture", value: 18, color: "#C08484" },
  { name: "Silk Trousers & Tops", value: 12, color: "#059669" },
];

const RECENT_BRAND_ORDERS = [
  { id: "#BO-901", product: "Imperial Burgundy Cashmere Trench", customer: "Priya S.", amount: 78500, status: "processing", date: "Sep 3" },
  { id: "#BO-902", product: "Structured Wool-Silk Blazer", customer: "Aryan K.", amount: 52000, status: "shipped", date: "Sep 2" },
  { id: "#BO-903", product: "Silk Zardozi Embroidered Lehenga", customer: "Sneha P.", amount: 145000, status: "delivered", date: "Sep 1" },
];

export const BrandOverview = () => {
  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Brand Performance Overview</h1>
          <p className="text-on-surface-variant text-sm mt-1">Aurelia Couture — Luxury Outerwear & Contemporary Tailoring</p>
        </div>
        <div className="flex items-center gap-2 bg-charcoal px-3 py-1.5 self-start">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="label-caps text-[10px] text-white">Storefront Live</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-[9px] text-on-surface-variant mb-1">Gross Brand GMV</p>
              <p className="font-display text-2xl md:text-3xl font-bold text-emerald">₹38.5L</p>
              <p className="text-xs text-emerald mt-1">+26% this quarter</p>
            </div>
            <DollarSign size={20} className="text-emerald" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-[9px] text-on-surface-variant mb-1">Monthly Orders</p>
              <p className="font-display text-2xl md:text-3xl font-bold text-charcoal">184</p>
              <p className="text-xs text-on-surface-variant mt-1">Avg basket: ₹20,920</p>
            </div>
            <ShoppingBag size={20} className="text-charcoal" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-[9px] text-on-surface-variant mb-1">Active SKUs</p>
              <p className="font-display text-2xl md:text-3xl font-bold text-burgundy">48</p>
              <p className="text-xs text-on-surface-variant mt-1">3 low in stock</p>
            </div>
            <Package size={20} className="text-burgundy" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="label-caps text-[9px] text-on-surface-variant mb-1">Return Ratio</p>
              <p className="font-display text-2xl md:text-3xl font-bold text-charcoal">2.1%</p>
              <p className="text-xs text-emerald mt-1">Industry avg: 14%</p>
            </div>
            <TrendingUp size={20} className="text-emerald" />
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white shadow-editorial p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-charcoal">Monthly Gross Revenue</h3>
              <p className="text-xs text-on-surface-variant">Combined marketplace and direct brand orders</p>
            </div>
            <span className="text-xs bg-surface-low px-2 py-1 font-medium text-charcoal">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={brandSalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
              <Tooltip formatter={(v: number) => [formatINR(v), "Revenue"]} />
              <Bar dataKey="revenue" fill="#7F1D3A" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white shadow-editorial p-5 space-y-3">
          <h3 className="font-display text-lg text-charcoal">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={42} outerRadius={68} dataKey="value">
                {categoryData.map((c, i) => (
                  <Cell key={i} fill={c.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 pt-2 border-t border-outline-variant">
            {categoryData.map((c) => (
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

      {/* Orders and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders Queue */}
        <div className="bg-white shadow-editorial">
          <div className="flex items-center justify-between p-5 border-b border-outline-variant">
            <h3 className="font-display text-lg text-charcoal">Recent Brand Orders</h3>
            <Link to="/dashboard/brand/orders" className="text-xs text-burgundy hover:underline">
              View All Orders →
            </Link>
          </div>
          <div className="divide-y divide-outline-variant">
            {RECENT_BRAND_ORDERS.map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-charcoal">{order.product}</p>
                  <p className="text-xs text-on-surface-variant">{order.id} · {order.customer} · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-display font-semibold text-charcoal">{formatINR(order.amount)}</p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      order.status === "delivered"
                        ? "bg-emerald/10 text-emerald"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Warning Card */}
        <div className="bg-white shadow-editorial p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3">
            <h3 className="font-display text-lg text-charcoal flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-600" /> Stock Level Alerts
            </h3>
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 font-bold">2 SKUs Urgent</span>
          </div>
          <div className="space-y-3">
            {[
              { sku: "AC-BL-04", name: "Structured Wool-Silk Tuxedo Blazer", stock: 6, threshold: 10 },
              { sku: "AC-LH-09", name: "Silk Zardozi Embroidered Lehenga", stock: 4, threshold: 8 },
              { sku: "AC-TR-03", name: "Fluid Silk Palazzo Trousers", stock: 0, threshold: 15 },
            ].map((sku) => (
              <div key={sku.sku} className="p-3 bg-surface-low flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-semibold text-charcoal">{sku.name}</p>
                  <p className="text-on-surface-variant text-[11px]">SKU: {sku.sku}</p>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${sku.stock === 0 ? "text-red-500" : "text-yellow-700"}`}>
                    {sku.stock === 0 ? "OUT OF STOCK" : `${sku.stock} remaining`}
                  </span>
                  <Link to="/dashboard/brand/inventory" className="block text-[10px] text-burgundy font-semibold hover:underline mt-0.5">
                    Restock →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
