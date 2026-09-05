import { useState } from "react";
import {
  Shirt, Plus, Search, Filter, Sparkles, Calendar,
  TrendingUp, RefreshCw, Trash2, CheckCircle, Tag, X
} from "lucide-react";
import { toast } from "sonner";
import { INITIAL_CUSTOMER_WARDROBE, WardrobeClothingItem } from "@/constants/dashboardData";

export const DigitalWardrobe = () => {
  const [items, setItems] = useState<WardrobeClothingItem[]>(INITIAL_CUSTOMER_WARDROBE);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Tops" as WardrobeClothingItem["category"],
    brand: "",
    color: "",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80",
    wearCount: 1,
  });

  const categories = ["All", "Tops", "Bottoms", "Outerwear", "Ethnic", "Shoes", "Accessories"];

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleLogWear = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, wearCount: item.wearCount + 1, lastWorn: "Today" }
          : item
      )
    );
    toast.success(`Logged wear for "${name}". Utilization updated.`);
  };

  const handleDeleteItem = (id: string, name: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success(`Archived "${name}" from your wardrobe`);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.brand) {
      toast.error("Please fill in item name and designer brand");
      return;
    }

    const created: WardrobeClothingItem = {
      id: `WR-${Date.now().toString().slice(-4)}`,
      name: newItem.name,
      category: newItem.category,
      brand: newItem.brand,
      color: newItem.color || "Classic",
      image: newItem.image,
      wearCount: 0,
      lastWorn: "Never",
    };

    setItems([created, ...items]);
    setShowAddModal(false);
    setNewItem({
      name: "",
      category: "Tops",
      brand: "",
      color: "",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80",
      wearCount: 1,
    });
    toast.success(`Added "${created.name}" to your Digital Wardrobe!`);
  };

  const totalWears = items.reduce((acc, curr) => acc + curr.wearCount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Shirt className="w-3.5 h-3.5" />
            <span>Digital Vault</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">My Digital Wardrobe</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Digitize, track wear frequency, and unlock AI styling combinations from your existing luxury pieces.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-burgundy text-white hover:bg-burgundy/90 text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-colors flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Digitize Garment</span>
        </button>
      </div>

      {/* Wardrobe Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <span className="text-xs uppercase tracking-wider text-charcoal/50">Total Pieces</span>
          <div className="font-display text-2xl text-charcoal font-medium mt-1">{items.length}</div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Catalogued & Synced</span>
        </div>
        <div className="stat-card">
          <span className="text-xs uppercase tracking-wider text-charcoal/50">Logged Wears</span>
          <div className="font-display text-2xl text-charcoal font-medium mt-1">{totalWears}</div>
          <span className="text-[11px] text-charcoal/60 mt-1 block">Avg {Math.round(totalWears / (items.length || 1))} per item</span>
        </div>
        <div className="stat-card">
          <span className="text-xs uppercase tracking-wider text-charcoal/50">Wardrobe Value</span>
          <div className="font-display text-2xl text-charcoal font-medium mt-1">₹3,42,000</div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Cost per wear: ₹830</span>
        </div>
        <div className="stat-card">
          <span className="text-xs uppercase tracking-wider text-charcoal/50">Styling Potential</span>
          <div className="font-display text-2xl text-burgundy font-medium mt-1">42 Outfits</div>
          <span className="text-[11px] text-charcoal/60 mt-1 block">AI combinations unlocked</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-charcoal/10 bg-white text-charcoal/70 hover:border-charcoal/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search wardrobe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-charcoal/15 focus:border-burgundy focus:outline-none bg-white"
          />
        </div>
      </div>

      {/* Wardrobe Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-charcoal/10 hover:border-burgundy/40 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] bg-charcoal/5 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => handleDeleteItem(item.id, item.name)}
                  title="Archive piece"
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm text-charcoal/50 hover:text-rose-600 flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-2 left-2 bg-charcoal/80 text-white text-[10px] px-2 py-0.5 uppercase tracking-wider font-mono">
                  {item.category}
                </div>
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-charcoal text-[10px] px-2 py-0.5 font-semibold">
                  {item.color}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-charcoal/50 tracking-wider">
                    {item.brand}
                  </span>
                  <h3 className="font-display text-sm font-medium text-charcoal line-clamp-1 mt-0.5">
                    {item.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs text-charcoal/70 border-t border-charcoal/5 pt-2">
                  <span>Worn: <strong className="text-charcoal">{item.wearCount} times</strong></span>
                  <span className="text-[11px] text-charcoal/50">Last: {item.lastWorn}</span>
                </div>

                <button
                  onClick={() => handleLogWear(item.id, item.name)}
                  className="w-full border border-charcoal/20 hover:border-charcoal bg-warm-white hover:bg-charcoal hover:text-white text-charcoal text-xs uppercase tracking-wider font-semibold py-2 transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Log Worn Today</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-charcoal/10 p-12 text-center max-w-md mx-auto space-y-3">
          <Shirt className="w-10 h-10 text-charcoal/30 mx-auto" />
          <h3 className="font-display text-lg font-medium text-charcoal">No pieces found</h3>
          <p className="text-xs text-charcoal/60">
            No garments match "{searchQuery || selectedCategory}". Try adjusting your filters or digitize a new garment.
          </p>
        </div>
      )}

      {/* Add Garment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 md:p-8 space-y-5 border border-charcoal/20 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <div>
                <h3 className="font-display text-xl font-medium text-charcoal">Digitize Garment</h3>
                <p className="text-xs text-charcoal/60">Add a custom or off-rack piece into your wardrobe catalog</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-charcoal/50 hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                  Garment Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Raw Silk Nehru Jacket"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                    Category
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as WardrobeClothingItem["category"] })}
                    className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                  >
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Ethnic">Ethnic</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Ivory White, Burgundy"
                    value={newItem.color}
                    onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                    className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                  Brand / Atelier
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Atelier Vesper or Vintage"
                  value={newItem.brand}
                  onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                  className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                  Garment Image URL
                </label>
                <input
                  type="url"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-charcoal/20 text-charcoal/70 hover:border-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-burgundy hover:bg-burgundy/90 text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Save to Wardrobe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default DigitalWardrobe;
