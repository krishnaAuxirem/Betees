import { useState } from "react";
import { Plus, Search, Filter, Trash2, Edit3, Heart, Eye, Bookmark, X, Check } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_CREATOR_CONTENT, CreatorContentItem } from "@/constants/dashboardData";

export const CreatorContent = () => {
  const [contentList, setContentList] = useState<CreatorContentItem[]>(INITIAL_CREATOR_CONTENT);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CreatorContentItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    category: "Lookbook" as CreatorContentItem["category"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
    tags: "#BeteesAesthetic, #AutumnLookbook"
  });

  const categories = ["All", "Lookbook", "Capsule Wardrobe", "Editorial", "Reel"];

  const filtered = contentList.filter((item) => {
    const matchCat = categoryFilter === "All" || item.category === categoryFilter;
    return matchCat;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      caption: "",
      category: "Lookbook",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80",
      tags: "#BeteesStyle, #OOTD"
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: CreatorContentItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      caption: item.caption,
      category: item.category,
      image: item.image,
      tags: item.tags.join(", ")
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete post "${title}"?`)) {
      setContentList((prev) => prev.filter((i) => i.id !== id));
      toast.success("Content post removed from your profile.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const tagArr = formData.tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (editingItem) {
      setContentList((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                title: formData.title,
                caption: formData.caption,
                category: formData.category,
                image: formData.image,
                tags: tagArr
              }
            : i
        )
      );
      toast.success("Look post updated successfully.");
    } else {
      const newItem: CreatorContentItem = {
        id: `CC-${Date.now()}`,
        title: formData.title,
        caption: formData.caption,
        category: formData.category,
        image: formData.image,
        tags: tagArr.length ? tagArr : ["#BeteesCreator"],
        views: 120,
        likes: 18,
        saves: 4,
        publishedDate: "Just now"
      };
      setContentList([newItem, ...contentList]);
      toast.success("New look published to Betees Fashion Discovery feed!");
    }
    setModalOpen(false);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Creator Content & Lookbooks</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Publish styled looks, capsule wardrobe edits, and moodboards to inspire shoppers and brands.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary self-start text-xs">
          <Plus size={14} /> Publish New Look
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
              categoryFilter === cat
                ? "bg-charcoal text-white"
                : "bg-white border border-outline-variant text-on-surface-variant hover:text-charcoal shadow-xs"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white shadow-editorial overflow-hidden group flex flex-col justify-between">
            <div className="relative aspect-[4/5] bg-surface-high overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-charcoal/90 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
                {item.category}
              </span>
              <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="w-8 h-8 bg-white/90 text-charcoal hover:bg-charcoal hover:text-white flex items-center justify-center shadow"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="w-8 h-8 bg-white/90 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center shadow"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-base font-semibold text-charcoal">{item.title}</h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">{item.caption}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-burgundy font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
                <span className="flex items-center gap-1"><Eye size={12} /> {item.views.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Heart size={12} className="text-burgundy" /> {item.likes.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Bookmark size={12} /> {item.saves}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-xl text-charcoal">
                {editingItem ? "Edit Look" : "Publish New Style Look"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Look Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Minimalist Charcoal & Silk Autumn Capsule"
                  className="input-editorial w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Format Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CreatorContentItem["category"] })}
                    className="input-editorial w-full"
                  >
                    <option>Lookbook</option>
                    <option>Capsule Wardrobe</option>
                    <option>Editorial</option>
                    <option>Reel</option>
                  </select>
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Style Caption & Narrative</label>
                <textarea
                  rows={3}
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Explain your styling theory, color calibration, and garment pairing..."
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Hashtags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={14} /> {editingItem ? "Save Changes" : "Publish Look"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
