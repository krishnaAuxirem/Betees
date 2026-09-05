import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp, Eye, Heart, Users, Sparkles } from "lucide-react";

const viewsGrowthData = [
  { month: "Apr", views: 24000, likes: 2100 },
  { month: "May", views: 32000, likes: 2800 },
  { month: "Jun", views: 41000, likes: 3600 },
  { month: "Jul", views: 38000, likes: 3400 },
  { month: "Aug", views: 54000, likes: 4900 },
  { month: "Sep", views: 68000, likes: 6200 },
];

const followerGrowthData = [
  { month: "Apr", followers: 18000 },
  { month: "May", followers: 23000 },
  { month: "Jun", followers: 28500 },
  { month: "Jul", followers: 32000 },
  { month: "Aug", followers: 37500 },
  { month: "Sep", followers: 42800 },
];

export const CreatorAnalytics = () => {
  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Audience Reach & Content Analytics</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Track engagement performance, lookbook view velocity, and audience retention metrics.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <Sparkles size={16} className="text-burgundy" />
          <span className="text-xs font-semibold text-charcoal">+24% Engagement vs Fashion Benchmark</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total Impressions</p>
          <p className="font-display text-3xl font-bold text-charcoal">257K</p>
          <p className="text-xs text-emerald mt-1">+38% this quarter</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Average Post Likes</p>
          <p className="font-display text-3xl font-bold text-burgundy">3,840</p>
          <p className="text-xs text-on-surface-variant mt-1">9.2% engagement rate</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Wardrobe Saves</p>
          <p className="font-display text-3xl font-bold text-emerald">14.2K</p>
          <p className="text-xs text-emerald mt-1">High conversion intent</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Brand Sponsorship CTR</p>
          <p className="font-display text-3xl font-bold text-charcoal">4.8%</p>
          <p className="text-xs text-on-surface-variant mt-1">Marketplace avg: 2.3%</p>
        </div>
      </div>

      {/* Two Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views & Likes Line Chart */}
        <div className="bg-white shadow-editorial p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-charcoal">Lookbook Views & Likes Growth</h3>
            <span className="text-xs bg-surface-low px-2 py-1 font-medium">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={viewsGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number, name: string) => [v.toLocaleString(), name === "views" ? "Views" : "Likes"]} />
              <Line type="monotone" dataKey="views" stroke="#7F1D3A" strokeWidth={2.5} dot={{ fill: "#7F1D3A", r: 4 }} />
              <Line type="monotone" dataKey="likes" stroke="#18181B" strokeWidth={2} dot={{ fill: "#18181B", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Follower Growth Bar Chart */}
        <div className="bg-white shadow-editorial p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-charcoal">Community Follower Trajectory</h3>
            <span className="text-xs bg-surface-low px-2 py-1 font-medium">Total: 42.8K</span>
          </div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={followerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "Followers"]} />
              <Bar dataKey="followers" fill="#059669" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
