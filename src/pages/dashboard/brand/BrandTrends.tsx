import { useState } from "react";
import { Sparkles, TrendingUp, ArrowUpRight, Flame, Layers } from "lucide-react";
import { toast } from "sonner";

interface TrendInsight {
  title: string;
  category: string;
  demandGrowth: string;
  confidenceScore: number;
  description: string;
  recommendedPalette: string[];
  recommendedFabrics: string[];
}

const TREND_INSIGHTS: TrendInsight[] = [
  {
    title: "Old Money Structured Outerwear",
    category: "Outerwear & Coats",
    demandGrowth: "+48% searches",
    confidenceScore: 96,
    description: "Architectural shoulders, peak lapels, and double-breasted fastenings are leading high-ticket festive purchases across Tier 1 metros.",
    recommendedPalette: ["#7F1D3A", "#18181B", "#C08484", "#EEECEA"],
    recommendedFabrics: ["Mongolian Cashmere", "Super 160s Wool", "Heavy Double Crepe"]
  },
  {
    title: "Raw Handloom Tussar & Modern Bandhgalas",
    category: "Ethnic Contemporary",
    demandGrowth: "+62% searches",
    confidenceScore: 94,
    description: "Men and unisex buyers seeking minimalist Indian silhouettes paired with European trousers rather than traditional pajamas.",
    recommendedPalette: ["#D4AF37", "#7F1D3A", "#3B2F2F", "#FAFAF9"],
    recommendedFabrics: ["Organic Tussar Silk", "Bhagalpuri Handloom", "Chanderi Linen"]
  },
  {
    title: "Fluid Palazzo & Drape Separates",
    category: "Trousers & Loungewear",
    demandGrowth: "+38% searches",
    confidenceScore: 89,
    description: "High-waist fluid silhouettes with invisible side zips replacing rigid denim for evening celebrations and cocktail events.",
    recommendedPalette: ["#18181B", "#FAFAF9", "#C08484"],
    recommendedFabrics: ["Heavy Mulberry Habotai", "Silk Satin Charmeuse"]
  }
];

export const BrandTrends = () => {
  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">AI Fashion Trend Intelligence</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Algorithmic forecast based on millions of consumer style sessions, visual search queries, and try-on requests.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-burgundy/10 text-burgundy px-3 py-1.5 self-start text-xs font-semibold">
          <Sparkles size={14} />
          <span>Betees Predictive Engine Active</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="flex items-center gap-2 text-burgundy mb-2">
            <Flame size={18} />
            <span className="label-caps text-[10px]">Fastest Rising Hue</span>
          </div>
          <p className="font-display text-2xl font-bold text-charcoal">Imperial Burgundy (#7F1D3A)</p>
          <p className="text-xs text-emerald mt-1">+72% search query volume</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-emerald mb-2">
            <TrendingUp size={18} />
            <span className="label-caps text-[10px]">Dominant Fabric</span>
          </div>
          <p className="font-display text-2xl font-bold text-charcoal">Mongolian Cashmere & Pure Silk</p>
          <p className="text-xs text-on-surface-variant mt-1">High conversion in luxury baskets</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 text-charcoal mb-2">
            <Layers size={18} />
            <span className="label-caps text-[10px]">Silhouette Shift</span>
          </div>
          <p className="font-display text-2xl font-bold text-charcoal">Architectural Draping</p>
          <p className="text-xs text-emerald mt-1">+54% try-on simulation count</p>
        </div>
      </div>

      {/* Detailed Trend Cards */}
      <div className="space-y-6">
        {TREND_INSIGHTS.map((trend) => (
          <div key={trend.title} className="bg-white shadow-editorial p-6 space-y-4 border-l-4 border-burgundy">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{trend.category}</span>
                <h3 className="font-display text-xl font-bold text-charcoal mt-0.5">{trend.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald/10 text-emerald text-xs font-bold px-2.5 py-1">
                  {trend.demandGrowth}
                </span>
                <span className="text-xs font-semibold bg-surface-low px-2.5 py-1 text-charcoal">
                  {trend.confidenceScore}% AI Confidence
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {trend.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-outline-variant text-xs">
              <div>
                <span className="label-caps text-[9px] text-on-surface-variant block mb-2">Recommended Palette</span>
                <div className="flex items-center gap-2">
                  {trend.recommendedPalette.map((hex) => (
                    <div
                      key={hex}
                      className="w-7 h-7 border border-outline-color shadow-xs flex items-center justify-center text-[9px] font-mono text-white/90"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="label-caps text-[9px] text-on-surface-variant block mb-2">Target Sourcing Fabrics</span>
                <div className="flex flex-wrap gap-1.5">
                  {trend.recommendedFabrics.map((fabric) => (
                    <span key={fabric} className="px-2 py-1 bg-surface-low text-charcoal font-medium text-[11px]">
                      {fabric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
