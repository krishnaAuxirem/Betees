import { useState } from "react";
import { Search, Filter, ShieldAlert, Star, Trash2, Eye, X, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_BRAND_PRODUCTS, BrandProductItem } from "@/constants/dashboardData";

interface AdminProductItem extends BrandProductItem {
  brandName: string;
  flagged: boolean;
  flagReason?: string;
  featuredOnHome: boolean;
}

const INITIAL_ADMIN_PRODUCTS: AdminProductItem[] = [
  ...INITIAL_BRAND_PRODUCTS.map((p) => ({
    ...p,
    brandName: "Aurelia Couture",
    flagged: false,
    featuredOnHome: true
  })),
  {
    id: "AP-201",
    sku: "HB-LK-01",
    name: "Silk Zardozi Embroidered Lehenga",
    category: "Ethnic",
    price: 145000,
    stock: 4,
    sizes: ["S", "M"],
    status: "in_stock",
    salesCount: 27,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop&q=80",
    brandName: "House of Rohit Bal",
    flagged: false,
    featuredOnHome: true
  },
  {
    id: "AP-202",
    sku: "AV-TX-02",
    name: "Structured Wool-Silk Tuxedo Blazer",
    category: "Blazers",
    price: 52000,
    stock: 6,
    sizes: ["38R", "40R", "42R"],
    status: "in_stock",
    salesCount: 38,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    brandName: "Atelier Vesper",
    flagged: true,
    flagReason: "Customer reported dye variation from catalog preview",
    featuredOnHome: false
  }
];

export const AdminProducts = () => {
  const [products, setProducts] = useState<AdminProductItem[]>(INITIAL_ADMIN_PRODUCTS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [filterFlagged, setFilterFlagged] = useState(false);
  const [selectedProd, setSelectedProd] = useState<AdminProductItem | null>(null);
  const [flagModalProd, setFlagModalProd] = useState<AdminProductItem | null>(null);
  const [flagReasonText, setFlagReasonText] = useState("");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.brandName.toLowerCase().includes(search.toLowerCase()) ||
                        p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    const matchFlag = filterFlagged ? p.flagged : true;
    return matchSearch && matchCat && matchFlag;
  });

  const handleToggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = !p.featuredOnHome;
          toast.success(`Product ${p.name} ${updated ? "featured on homepage" : "unfeatured"}`);
          return { ...p, featuredOnHome: updated };
        }
        return p;
      })
    );
  };

  const handleRemoveProduct = (id: string, name: string) => {
    if (window.confirm(`Permanently remove "${name}" from Betees marketplace catalog?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Product "${name}" removed from marketplace.`);
      if (selectedProd?.id === id) setSelectedProd(null);
    }
  };

  const handleConfirmFlag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagModalProd || !flagReasonText.trim()) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === flagModalProd.id
          ? { ...p, flagged: true, flagReason: flagReasonText.trim(), featuredOnHome: false }
          : p
      )
    );
    toast.error(`Product ${flagModalProd.name} flagged for merchant moderation.`);
    setFlagModalProd(null);
  };

  const handleClearFlag = (id: string, name: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, flagged: false, flagReason: undefined } : p))
    );
    toast.success(`Moderation flag removed from ${name}.`);
    if (selectedProd?.id === id) {
      setSelectedProd({ ...selectedProd, flagged: false, flagReason: undefined });
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Marketplace Product Governance</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Audit luxury garments across brands and independent tailors. Enforce authenticity and moderation standards.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <ShieldAlert size={16} className="text-yellow-600" />
          <span className="text-xs font-semibold text-charcoal">
            {products.filter((p) => p.flagged).length} Products Flagged
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 shadow-editorial flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand, product, SKU..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="text-xs bg-surface-low border border-outline-variant px-2.5 py-1.5 focus:outline-none font-semibold text-charcoal"
          >
            <option value="all">All Categories</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Blazers">Blazers</option>
            <option value="Ethnic">Ethnic</option>
            <option value="Dresses">Dresses</option>
            <option value="Tops">Tops</option>
            <option value="Trousers">Trousers</option>
          </select>
          <button
            onClick={() => setFilterFlagged(!filterFlagged)}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
              filterFlagged ? "bg-red-600 text-white" : "bg-surface-low border border-outline-variant text-charcoal"
            }`}
          >
            <ShieldAlert size={13} /> Only Flagged
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Garment & Brand</th>
              <th className="p-4">SKU Code</th>
              <th className="p-4">Category</th>
              <th className="p-4">Selling Price</th>
              <th className="p-4">Status & Flags</th>
              <th className="p-4">Homepage Spotlight</th>
              <th className="p-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-12 h-14 bg-surface-high overflow-hidden shrink-0">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block text-xs">{prod.name}</span>
                    <span className="text-[11px] text-burgundy font-medium">{prod.brandName}</span>
                  </div>
                </td>
                <td className="p-4 font-mono text-xs text-charcoal">{prod.sku}</td>
                <td className="p-4 text-xs font-medium text-charcoal">{prod.category}</td>
                <td className="p-4 font-display font-semibold text-charcoal">{formatINR(prod.price)}</td>
                <td className="p-4">
                  {prod.flagged ? (
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide inline-flex items-center gap-1">
                      <AlertTriangle size={10} /> Moderation Flagged
                    </span>
                  ) : (
                    <span className="bg-emerald/10 text-emerald text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
                      Active Approved
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggleFeatured(prod.id)}
                    className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      prod.featuredOnHome
                        ? "bg-burgundy text-white"
                        : "bg-surface-low text-on-surface-variant hover:text-charcoal border border-outline-variant"
                    }`}
                  >
                    <Star size={11} className={prod.featuredOnHome ? "fill-white" : ""} />
                    {prod.featuredOnHome ? "Featured" : "Spotlight"}
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => setSelectedProd(prod)}
                    className="p-1.5 border border-outline-color hover:border-charcoal text-charcoal"
                    title="View Product"
                  >
                    <Eye size={14} />
                  </button>
                  {!prod.flagged ? (
                    <button
                      onClick={() => {
                        setFlagModalProd(prod);
                        setFlagReasonText("Inaccurate fabric composition claim or quality dispute.");
                      }}
                      className="p-1.5 text-yellow-700 hover:bg-yellow-50 border border-yellow-200"
                      title="Flag for Investigation"
                    >
                      <ShieldAlert size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClearFlag(prod.id, prod.name)}
                      className="p-1.5 text-emerald hover:bg-emerald/10 border border-emerald/30"
                      title="Clear Moderation Flag"
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveProduct(prod.id, prod.name)}
                    className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200"
                    title="Remove from Platform"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Flag Modal */}
      {flagModalProd && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-lg text-charcoal">Flag Product for Review</h2>
              <button onClick={() => setFlagModalProd(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleConfirmFlag} className="p-6 space-y-4 text-xs">
              <p className="text-on-surface-variant">
                Flagging <strong>{flagModalProd.name}</strong> by {flagModalProd.brandName} will remove it from search recommendations pending merchant clarification.
              </p>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Reason for Moderation Flag *</label>
                <textarea
                  rows={3}
                  required
                  value={flagReasonText}
                  onChange={(e) => setFlagReasonText(e.target.value)}
                  className="input-editorial w-full text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setFlagModalProd(null)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                  Apply Flag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProd && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{selectedProd.brandName}</span>
                <h2 className="font-display text-xl text-charcoal">{selectedProd.name}</h2>
              </div>
              <button onClick={() => setSelectedProd(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="flex gap-4">
                <div className="w-24 h-32 bg-surface-high shrink-0 overflow-hidden">
                  <img src={selectedProd.image} alt={selectedProd.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <p className="text-on-surface-variant">SKU: <strong className="font-mono text-charcoal">{selectedProd.sku}</strong></p>
                  <p className="text-on-surface-variant">Category: <strong className="text-charcoal">{selectedProd.category}</strong></p>
                  <p className="text-on-surface-variant">Price: <strong className="font-display text-base text-charcoal">{formatINR(selectedProd.price)}</strong></p>
                  <p className="text-on-surface-variant">Inventory: <strong className="text-charcoal">{selectedProd.stock} units</strong></p>
                  <p className="text-on-surface-variant">Sizes: {selectedProd.sizes.join(", ")}</p>
                </div>
              </div>

              {selectedProd.flagged && (
                <div className="p-3 bg-red-50 border border-red-200 space-y-1">
                  <p className="font-bold text-red-700 flex items-center gap-1"><AlertTriangle size={12} /> Moderation Flag Active</p>
                  <p className="text-red-600 text-[11px]">{selectedProd.flagReason}</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-outline-variant">
                {selectedProd.flagged ? (
                  <button
                    onClick={() => handleClearFlag(selectedProd.id, selectedProd.name)}
                    className="btn-secondary text-xs"
                  >
                    Clear Moderation Flag
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const p = selectedProd;
                      setSelectedProd(null);
                      setFlagModalProd(p);
                    }}
                    className="px-3 py-1.5 bg-yellow-100 text-yellow-800 text-xs font-semibold uppercase"
                  >
                    Flag Item
                  </button>
                )}
                <button onClick={() => setSelectedProd(null)} className="btn-primary text-xs ml-auto">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
