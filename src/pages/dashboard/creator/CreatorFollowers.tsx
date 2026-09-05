import { useState } from "react";
import { Users, Search, Heart, Sparkles, Send, Eye, X } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";

interface FollowerItem {
  id: string;
  name: string;
  handle: string;
  city: string;
  savedLooksCount: number;
  totalConsultations: number;
  totalSpentOnStylist: number;
  joinedDate: string;
}

const INITIAL_FOLLOWERS: FollowerItem[] = [
  { id: "F-1", name: "Riya Malhotra", handle: "@riya.style", city: "Mumbai", savedLooksCount: 38, totalConsultations: 3, totalSpentOnStylist: 52000, joinedDate: "Feb 2026" },
  { id: "F-2", name: "Aryan Kapoor", handle: "@aryan.k", city: "Delhi", savedLooksCount: 24, totalConsultations: 2, totalSpentOnStylist: 38000, joinedDate: "Mar 2026" },
  { id: "F-3", name: "Sneha Patel", handle: "@sneha.couture", city: "Ahmedabad", savedLooksCount: 45, totalConsultations: 4, totalSpentOnStylist: 68000, joinedDate: "Jan 2026" },
  { id: "F-4", name: "Ishita Verma", handle: "@ishita.v", city: "Bengaluru", savedLooksCount: 19, totalConsultations: 1, totalSpentOnStylist: 18000, joinedDate: "Apr 2026" },
];

export const CreatorFollowers = () => {
  const [followers] = useState<FollowerItem[]>(INITIAL_FOLLOWERS);
  const [search, setSearch] = useState("");
  const [modalCust, setModalCust] = useState<FollowerItem | null>(null);
  const [noteText, setNoteText] = useState("");

  const filtered = followers.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.handle.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Personal styling recommendation sent to ${modalCust?.name}!`);
    setModalCust(null);
    setNoteText("");
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Followers & VIP Styling Patrons</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Community members following your lookbooks, saving your outfits, and booking consultation packages.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-3">
          <Users size={18} className="text-burgundy" />
          <div>
            <p className="text-[9px] label-caps text-on-surface-variant">Total Community Reach</p>
            <p className="font-display text-xl font-bold text-charcoal">42.8K Followers</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 shadow-editorial">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search follower by handle or name..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Followers Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Follower</th>
              <th className="p-4">City Base</th>
              <th className="p-4">Saved Looks</th>
              <th className="p-4">1-on-1 Sessions</th>
              <th className="p-4">Consultation Spend</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((f) => (
              <tr key={f.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center font-bold text-xs">
                    {f.name[0]}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block text-xs">{f.name}</span>
                    <span className="text-[11px] text-on-surface-variant font-mono">{f.handle}</span>
                  </div>
                </td>
                <td className="p-4 text-xs text-charcoal">{f.city}</td>
                <td className="p-4 text-xs font-semibold text-burgundy">{f.savedLooksCount} saved</td>
                <td className="p-4 text-xs font-semibold text-charcoal">{f.totalConsultations} sessions</td>
                <td className="p-4 font-display font-semibold text-charcoal">{formatINR(f.totalSpentOnStylist)}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      setModalCust(f);
                      setNoteText(`Hi ${f.name.split(" ")[0]}, based on your saved moodboards, I curated a special autumn look for you!`);
                    }}
                    className="btn-outline py-1 px-3 text-xs"
                  >
                    Send Style Note
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalCust && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">Personal Stylist Note</span>
                <h2 className="font-display text-lg text-charcoal">{modalCust.name}</h2>
              </div>
              <button onClick={() => setModalCust(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendNote} className="p-6 space-y-4 text-xs">
              <div className="bg-surface-low p-3 space-y-1">
                <p className="font-semibold text-charcoal">{modalCust.handle} · {modalCust.city}</p>
                <p className="text-on-surface-variant">Has saved {modalCust.savedLooksCount} of your lookbooks</p>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Curated Stylist Note *</label>
                <textarea
                  rows={4}
                  required
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="input-editorial w-full text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setModalCust(null)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Send size={12} /> Dispatch Style Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
