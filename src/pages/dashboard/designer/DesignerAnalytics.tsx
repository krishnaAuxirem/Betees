import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Clock, Users, Star, Award, CheckCircle } from "lucide-react";

const completionTrend = [
  { month: "Apr", rate: 91 },
  { month: "May", rate: 93 },
  { month: "Jun", rate: 92 },
  { month: "Jul", rate: 95 },
  { month: "Aug", rate: 94 },
  { month: "Sep", rate: 96 },
];

const responseTrend = [
  { month: "Apr", hours: 4.2 },
  { month: "May", hours: 3.5 },
  { month: "Jun", hours: 3.0 },
  { month: "Jul", hours: 2.8 },
  { month: "Aug", hours: 2.2 },
  { month: "Sep", hours: 1.8 },
];

const repeatClientTrend = [
  { month: "Apr", rate: 52 },
  { month: "May", rate: 55 },
  { month: "Jun", rate: 58 },
  { month: "Jul", rate: 61 },
  { month: "Aug", rate: 64 },
  { month: "Sep", rate: 68 },
];

const commissionCategorySplit = [
  { name: "Ethnic Sherwanis & Bundis", value: 45, color: "#7F1D3A" },
  { name: "Bespoke Suiting & Tuxedos", value: 35, color: "#18181B" },
  { name: "Alterations & Restyling", value: 12, color: "#C08484" },
  { name: "Other Custom Pieces", value: 8, color: "#059669" },
];

export const DesignerAnalytics = () => {
  const [period, setPeriod] = useState("6m");

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Studio Performance Analytics</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Metrics tracking client satisfaction, delivery reliability, and repeat commission ratios.
          </p>
        </div>
        <span className="flex items-center gap-1.5 bg-emerald/10 text-emerald px-3 py-1.5 text-xs font-semibold self-start">
          <Award size={14} /> Top 5% Tailoring Studio
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">On-Time Completion</p>
          <p className="font-display text-3xl font-bold text-emerald">96%</p>
          <p className="text-xs text-on-surface-variant mt-1">+5% over 6 months</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Avg Response Time</p>
          <p className="font-display text-3xl font-bold text-charcoal">1.8 hrs</p>
          <p className="text-xs text-emerald mt-1">Faster than 88% studios</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Repeat Client Rate</p>
          <p className="font-display text-3xl font-bold text-burgundy">68%</p>
          <p className="text-xs text-on-surface-variant mt-1">Benchmark: 42%</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Zero Alteration Fit</p>
          <p className="font-display text-3xl font-bold text-emerald">92%</p>
          <p className="text-xs text-on-surface-variant mt-1">AI 3D fit scan assisted</p>
        </div>
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Rate Trend */}
        <div className="bg-white shadow-editorial p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-charcoal">Delivery Completion Rate (%)</h3>
              <p className="text-xs text-on-surface-variant">Percentage of orders delivered on or before deadline</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={completionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`${v}%`, "Completion Rate"]} />
              <Line type="monotone" dataKey="rate" stroke="#059669" strokeWidth={2.5} dot={{ fill: "#059669", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time Trend */}
        <div className="bg-white shadow-editorial p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-charcoal">Avg Client Response Time (Hours)</h3>
              <p className="text-xs text-on-surface-variant">Time to reply to incoming consultation messages</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={responseTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}h`} />
              <Tooltip formatter={(v: number) => [`${v} hours`, "Avg Response"]} />
              <Bar dataKey="hours" fill="#18181B" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repeat Client Trend */}
        <div className="lg:col-span-2 bg-white shadow-editorial p-5 space-y-4">
          <div>
            <h3 className="font-display text-base font-semibold text-charcoal">Repeat Client Retention Trend (%)</h3>
            <p className="text-xs text-on-surface-variant">Percentage of clients returning for a 2nd+ bespoke commission</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={repeatClientTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E6E2" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[40, 80]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [`${v}%`, "Repeat Client Ratio"]} />
              <Line type="monotone" dataKey="rate" stroke="#7F1D3A" strokeWidth={2.5} dot={{ fill: "#7F1D3A", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white shadow-editorial p-5 space-y-3">
          <h3 className="font-display text-base font-semibold text-charcoal">Commission Share</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={commissionCategorySplit} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                {commissionCategorySplit.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 pt-2 border-t border-outline-variant">
            {commissionCategorySplit.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-on-surface-variant truncate max-w-[140px]">{item.name}</span>
                </div>
                <span className="font-semibold text-charcoal">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
