import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Check, Search } from "lucide-react";
import { DESIGNERS } from "@/constants/data";

export const Designers = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = DESIGNERS.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.studio.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-surface-low border-b border-outline-variant py-12">
        <div className="section-container">
          <p className="label-caps text-[10px] text-burgundy mb-2">Guild of Master Craftsmen</p>
          <h1 className="heading-xl text-charcoal mb-4">Designers & Tailors Directory</h1>
          <p className="text-on-surface-variant max-w-2xl mb-6">Verified master craftsmen and haute couture designers — curated for excellence, reachable through Betees.</p>

          {/* Search & Filter */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, specialty, location..."
                className="w-full input-editorial pl-9"
              />
            </div>
            {["all", "india", "international", "bridal", "menswear"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${filter === f ? "bg-charcoal text-white" : "border border-outline-color text-charcoal hover:border-charcoal"}`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="section-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((designer) => (
            <div key={designer.id} className="bg-white shadow-editorial hover:shadow-card-hover transition-all duration-300 overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img src={designer.image} alt={designer.name} className="w-full h-full object-cover" />
                {designer.verified && (
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 flex items-center gap-1.5">
                    <Check size={11} className="text-burgundy" />
                    <span className="label-caps text-[9px] text-charcoal">Verified Master</span>
                  </div>
                )}
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-charcoal">{designer.name}</h3>
                    <p className="text-sm text-on-surface-variant">{designer.studio}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={13} fill="currentColor" className="text-rose-gold" />
                    <span className="text-sm font-semibold text-charcoal">{designer.rating}</span>
                    <span className="text-xs text-on-surface-variant">({designer.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {designer.location}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {designer.experience}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{designer.specialty}</p>
                <Link
                  to={`/designers/${designer.id}`}
                  className="block w-full py-2.5 bg-surface-low text-charcoal text-xs font-semibold uppercase tracking-wider text-center hover:bg-charcoal hover:text-white transition-colors"
                >
                  View Profile & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
