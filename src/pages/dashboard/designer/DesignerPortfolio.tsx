import { useState } from "react";
import { Plus, Search, Filter, Trash2, Edit3, Heart, Eye, X, Check, Upload } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_DESIGNER_PORTFOLIO, DesignerPortfolioItem } from "@/constants/dashboardData";

export const DesignerPortfolio = () => {
  const [items, setItems] = useState<DesignerPortfolioItem[]>(INITIAL_DESIGNER_PORTFOLIO);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DesignerPortfolioItem | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Bespoke Ethnic",
    price: "",
    description: "",
    tags: "",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop&q=80"
  });

  const categories = ["All", "Bespoke Ethnic", "Suits & Tuxedos", "Fusion Wear", "Waistcoats"];

  const filteredItems = items.filter((item) => {
    const matchCat = categoryFilter === "All" || item.category === categoryFilter;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Bespoke Ethnic",
      price: "",
      description: "",
      tags: "",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80"
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: DesignerPortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      tags: item.tags.join(", "),
      image: item.image
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from your portfolio?`)) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success(`Design "${title}" removed from portfolio`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const tagList = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingItem) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                title: formData.title,
                category: formData.category,
                price: Number(formData.price),
                description: formData.description,
                tags: tagList.length ? tagList : i.tags,
                image: formData.image
              }
            : i
        )
      );
      toast.success("Design updated successfully");
    } else {
      const newItem: DesignerPortfolioItem = {
        id: `DP-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        tags: tagList.length ? tagList : ["Bespoke", "New"],
        image: formData.image,
        likes: 0,
        featured: false
      };
      setItems([newItem, ...items]);
      toast.success("New design published to portfolio");
    }
    setModalOpen(false);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Design Portfolio</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Showcase your master craftsmanship and bespoke commissions to prospective clients.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary self-start text-xs">
          <Plus size={14} /> Add New Design
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total Pieces</p>
          <p className="font-display text-2xl font-semibold text-charcoal">{items.length}</p>
          <p className="text-xs text-emerald mt-1">+2 added this month</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Portfolio Views</p>
          <p className="font-display text-2xl font-semibold text-charcoal">1,480</p>
          <p className="text-xs text-emerald mt-1">+24% profile visits</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Total Inquiries</p>
          <p className="font-display text-2xl font-semibold text-burgundy">38</p>
          <p className="text-xs text-on-surface-variant mt-1">From portfolio tags</p>
        </div>
        <div className="stat-card">
          <p className="label-caps text-[9px] text-on-surface-variant mb-1">Avg Commission</p>
          <p className="font-display text-2xl font-semibold text-emerald">₹48,500</p>
          <p className="text-xs text-on-surface-variant mt-1">Hand-canvassed works</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 shadow-editorial flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search designs, fabrics, tags..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar">
          <Filter size={14} className="text-on-surface-variant shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? "bg-charcoal text-white"
                  : "bg-surface-low text-on-surface-variant hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="product-card group relative">
            <div className="relative aspect-[3/4] bg-surface-high overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 bg-charcoal/90 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">
                {item.category}
              </span>
              <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="w-8 h-8 bg-white/90 text-charcoal hover:bg-charcoal hover:text-white flex items-center justify-center shadow"
                  title="Edit Design"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="w-8 h-8 bg-white/90 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center shadow"
                  title="Delete Design"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-display text-base font-semibold text-charcoal line-clamp-1">{item.title}</h3>
              <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[9px] bg-surface-low text-on-surface-variant px-1.5 py-0.5 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant">
                <span className="font-display font-semibold text-charcoal">{formatINR(item.price)}</span>
                <span className="text-xs text-on-surface-variant flex items-center gap-1">
                  <Heart size={12} className="text-burgundy fill-burgundy" /> {item.likes} saves
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white p-12 text-center shadow-editorial">
          <p className="font-display text-xl text-charcoal">No designs match your filter</p>
          <p className="text-on-surface-variant text-sm mt-1">Try searching for a different keyword or category.</p>
        </div>
      )}

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-xl text-charcoal">
                {editingItem ? "Edit Design" : "Add Design to Portfolio"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Design Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Royal Burgundy Sherwani"
                  className="input-editorial w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-editorial w-full text-sm"
                  >
                    <option>Bespoke Ethnic</option>
                    <option>Suits & Tuxedos</option>
                    <option>Fusion Wear</option>
                    <option>Waistcoats</option>
                  </select>
                </div>
                <div>
                  <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Estimated Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="45000"
                    className="input-editorial w-full text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="input-editorial w-full text-sm"
                />
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Description & Fabric Notes</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details regarding cut, canvassing, lapel, handwork..."
                  className="input-editorial w-full text-sm"
                />
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Silk, Hand-canvassed, Wedding, Tuxedo"
                  className="input-editorial w-full text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal hover:bg-surface-low uppercase"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  <Check size={14} /> {editingItem ? "Save Changes" : "Publish to Portfolio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
