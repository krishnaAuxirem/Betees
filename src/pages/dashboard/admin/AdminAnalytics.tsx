import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";
import { formatINR } from "@/constants/data";

const gmvByRoleData = [
  { month: "Apr", customerOrders: 1200000, bespokeCommissions: 450000, brandSponsorships: 180000 },
  { month: "May", customerOrders: 1580000, bespokeCommissions: 620000, brandSponsorships: 240000 },
  { month: "Jun", customerOrders: 1920000, bespokeCommissions: 780000, brandSponsorships: 310000 },
  { month: "Jul", customerOrders: 1650000, bespokeCommissions: 690000, brandSponsorships: 290000 },
  { month: "Aug", customerOrders: 2180000, bespokeCommissions: 890000, brandSponsorships: 410000 },
  { month: "Sep", customerOrders: 2640000, bespokeCommissions: 1120000, brandSponsorships: 520000 },
];

const platformUserGrowth = [
  { month: "Apr", users: 1820000 },
  { month: "May", users: 1940000 },
  { month: "Jun", users: 2080000 },
  { month: "Jul", users: 2190000 },
  { month: "Aug", users: 2310000 },
  { month: "Sep", users: 2420000 },
];

const conversionFunnel = [
  { stage: "Storefront Visits", count: 2400000, pct: "100%" },
  { stage: "AI Stylist / Try-On Sessions", count: 860000, pct: "35.8%" },
  { stage: "Add to Cart / Custom Quote", count: 184000, pct: "7.6%" },
  { stage: "Completed Checkouts", count: 76800, pct: "3.2%" },
];

export const AdminAnalytics = () => {
  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Platform Ecosystem Analytics</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Macro-level metrics across marketplace gross merchandise value, merchant commissions, and conversion funnels.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-emerald" />
          <span className="text-xs font-semibold text-charcoal">+24% GMV MoM Growth</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total Platform GMV</p>
          <p className="font-display text-3xl font-bold text-emerald">₹8.5Cr</p>
          <p className="text-xs text-emerald mt-1">+24% MoM</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Betees Take-Rate Revenue</p>
          <p className="font-display text-3xl font-bold text-charcoal">₹85.2L</p>
          <p className="text-xs text-on-surface-variant mt-1">10% blended commission</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Active Registered Users</p>
          <p className="font-display text-3xl font-bold text-burgundy">2.42M</p>
          <p className="text-xs text-emerald mt-1">+110K this month</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Funnel Conversion Rate</p>
          <p className="font-display text-3xl font-bold text-charcoal">3.2%</p>
          <p className="text-xs text-on-surface-variant mt-1">Visits to Paid Checkout</p>
        </div>
      </div>

      {/* Revenue by Stream Chart */}
      <div className="bg-white shadow-editorial p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-charcoal">GMV Breakdown by Revenue Stream</h3>
            <p className="text-xs text-on-surface-variant">Marketplace Ready-to-wear vs Bespoke Tailoring vs Creator Sponsorships</p>
          </div>
          <span className="text-xs bg-surface-low px-2.5 py-1 font-semibold text-charcoal">Last 6 Months</span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={gmvByRoleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
            <Tooltip
              formatter={(v: number, name: string) => [
                formatINR(v),
                name === "customerOrders" ? "Ready-to-Wear" : name === "bespokeCommissions" ? "Bespoke Commissions" : "Creator Deals"
              ]}
            />
            <Bar dataKey="customerOrders" fill="#7F1D3A" stackId="a" />
            <Bar dataKey="bespokeCommissions" fill="#18181B" stackId="a" />
            <Bar dataKey="brandSponsorships" fill="#C08484" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Two Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white shadow-editorial p-6 space-y-4">
          <h3 className="font-display text-lg text-charcoal">User Community Expansion</h3>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={platformUserGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => [`${(v / 1000000).toFixed(2)}M Users`]} />
              <Line type="monotone" dataKey="users" stroke="#059669" strokeWidth={2.5} dot={{ fill: "#059669", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white shadow-editorial p-6 space-y-4">
          <h3 className="font-display text-lg text-charcoal">E-Commerce Conversion Funnel</h3>
          <div className="space-y-3">
            {conversionFunnel.map((step) => (
              <div key={step.stage} className="p-3 bg-surface-low flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-charcoal">{step.stage}</span>
                  <span className="text-[10px] text-on-surface-variant block">{step.count.toLocaleString()} monthly</span>
                </div>
                <span className="font-display font-bold text-burgundy text-sm">{step.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
