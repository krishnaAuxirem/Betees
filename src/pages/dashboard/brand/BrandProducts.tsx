import { useState } from "react";
import { Plus, Search, Filter, Trash2, Edit3, Eye, X, Check, Package } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_BRAND_PRODUCTS, BrandProductItem } from "@/constants/dashboardData";

export const BrandProducts = () => {
  const [products, setProducts] = useState<BrandProductItem[]>(INITIAL_BRAND_PRODUCTS);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<BrandProductItem | null>(null);

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "Outerwear",
    price: "",
    originalPrice: "",
    stock: "20",
    sizes: "XS, S, M, L, XL",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80"
  });

  const categories = ["All", "Outerwear", "Blazers", "Ethnic", "Dresses", "Tops", "Trousers"];

  const filtered = products.filter((p) => {
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      sku: `AC-${Math.floor(100 + Math.random() * 900)}`,
      name: "",
      category: "Outerwear",
      price: "",
      originalPrice: "",
      stock: "25",
      sizes: "XS, S, M, L, XL",
      image: "https://images.unsplash.com/photo-1575886876069-f50e42e55c75?w=600&h=800&fit=crop&q=80"
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: BrandProductItem) => {
    setEditingProduct(p);
    setFormData({
      sku: p.sku,
      name: p.name,
      category: p.category,
      price: p.price.toString(),
      originalPrice: p.originalPrice ? p.originalPrice.toString() : "",
      stock: p.stock.toString(),
      sizes: p.sizes.join(", "),
      image: p.image
    });
    setModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from your catalog?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Product "${name}" deleted from catalog.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error("Please provide a product title and price.");
      return;
    }

    const sizesArr = formData.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const stockNum = Number(formData.stock) || 0;
    const status: BrandProductItem["status"] = stockNum === 0 ? "out_of_stock" : stockNum < 10 ? "low_stock" : "in_stock";

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                sku: formData.sku,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
                stock: stockNum,
                sizes: sizesArr.length ? sizesArr : p.sizes,
                status,
                image: formData.image
              }
            : p
        )
      );
      toast.success("Product updated successfully.");
    } else {
      const newProduct: BrandProductItem = {
        id: `BP-${Date.now()}`,
        sku: formData.sku || `AC-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: stockNum,
        sizes: sizesArr.length ? sizesArr : ["S", "M", "L"],
        status,
        salesCount: 0,
        image: formData.image
      };
      setProducts([newProduct, ...products]);
      toast.success("New product published to marketplace catalog.");
    }
    setModalOpen(false);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Product Catalog</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Manage your brand's collections, SKUs, pricing variants, and product listings.
          </p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary self-start text-xs">
          <Plus size={14} /> Add New Product
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 shadow-editorial flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <Filter size={14} className="text-on-surface-variant shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                categoryFilter === cat ? "bg-charcoal text-white" : "bg-surface-low text-on-surface-variant hover:text-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">Product Details</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Units Sold</th>
              <th className="p-4 text-right">Actions</th>
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
                    <span className="font-semibold text-charcoal block">{prod.name}</span>
                    <span className="text-xs text-on-surface-variant">Sizes: {prod.sizes.join(", ")}</span>
                  </div>
                </td>
                <td className="p-4 font-mono text-xs text-charcoal">{prod.sku}</td>
                <td className="p-4 text-xs font-medium text-charcoal">{prod.category}</td>
                <td className="p-4 font-display font-semibold text-charcoal">
                  {formatINR(prod.price)}
                  {prod.originalPrice && (
                    <span className="block text-xs line-through text-on-surface-variant">
                      {formatINR(prod.originalPrice)}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      prod.status === "in_stock"
                        ? "bg-emerald/10 text-emerald"
                        : prod.status === "low_stock"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {prod.stock} units ({prod.status.replace("_", " ")})
                  </span>
                </td>
                <td className="p-4 text-xs font-medium text-charcoal">{prod.salesCount} sold</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-1.5 hover:bg-surface-low text-charcoal"
                    title="Edit Product"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id, prod.name)}
                    className="p-1.5 hover:bg-red-50 text-red-600"
                    title="Delete Product"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="font-display text-lg text-charcoal">No products found</p>
            <p className="text-on-surface-variant text-sm mt-1">Try another category or add a new piece to your line.</p>
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-xl text-charcoal">
                {editingProduct ? "Edit Product" : "Add New Garment to Line"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Imperial Double-Breasted Trench"
                  className="input-editorial w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="input-editorial w-full font-mono"
                  />
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-editorial w-full"
                  >
                    <option>Outerwear</option>
                    <option>Blazers</option>
                    <option>Ethnic</option>
                    <option>Dresses</option>
                    <option>Tops</option>
                    <option>Trousers</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Retail Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="78500"
                    className="input-editorial w-full font-bold"
                  />
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="95000"
                    className="input-editorial w-full"
                  />
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Inventory Stock *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Available Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                  placeholder="XS, S, M, L, XL"
                  className="input-editorial w-full"
                />
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
              <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Check size={14} /> {editingProduct ? "Save Product" : "Publish to Shop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
