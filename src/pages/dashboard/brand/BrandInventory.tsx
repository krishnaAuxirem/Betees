import { useState } from "react";
import { Plus, Minus, Search, AlertTriangle, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_BRAND_PRODUCTS, BrandProductItem } from "@/constants/dashboardData";

export const BrandInventory = () => {
  const [inventory, setInventory] = useState<BrandProductItem[]>(INITIAL_BRAND_PRODUCTS);
  const [search, setSearch] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);

  const filtered = inventory.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.sku.toLowerCase().includes(search.toLowerCase());
    const matchLow = filterLowStock ? item.stock < 10 : true;
    return matchSearch && matchLow;
  });

  const handleAdjustStock = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.stock + delta);
          const status: BrandProductItem["status"] =
            newStock === 0 ? "out_of_stock" : newStock < 10 ? "low_stock" : "in_stock";
          return { ...item, stock: newStock, status };
        }
        return item;
      })
    );
    toast.success("Stock quantity updated.");
  };

  const handleDirectSetStock = (id: string, value: number) => {
    const newStock = Math.max(0, value);
    const status: BrandProductItem["status"] =
      newStock === 0 ? "out_of_stock" : newStock < 10 ? "low_stock" : "in_stock";
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: newStock, status } : item))
    );
    toast.success("Stock quantity saved.");
  };

  const lowStockCount = inventory.filter((i) => i.stock < 10).length;

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Inventory & Warehouse Stock</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Real-time stock counts across SKU variants with low-stock replenishment alerts.
          </p>
        </div>
        {lowStockCount > 0 && (
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-1.5 self-start text-xs font-semibold">
            <AlertTriangle size={14} />
            <span>{lowStockCount} Products Need Restock</span>
          </div>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 shadow-editorial flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search SKU or garment name..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
        <button
          onClick={() => setFilterLowStock(!filterLowStock)}
          className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
            filterLowStock
              ? "bg-yellow-600 text-white"
              : "bg-surface-low border border-outline-variant text-charcoal hover:border-charcoal"
          }`}
        >
          <AlertTriangle size={14} /> Only Show Low Stock (&lt;10)
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">SKU Code</th>
              <th className="p-4">Garment</th>
              <th className="p-4">Available Sizes</th>
              <th className="p-4">Stock Status</th>
              <th className="p-4">Quick Adjust</th>
              <th className="p-4 text-right">Direct Stock Input</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 font-mono font-semibold text-charcoal text-xs">{item.sku}</td>
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-12 bg-surface-high overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block text-xs">{item.name}</span>
                    <span className="text-[11px] text-on-surface-variant">{item.category}</span>
                  </div>
                </td>
                <td className="p-4 text-xs text-charcoal">{item.sizes.join(", ")}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      item.stock === 0
                        ? "bg-red-100 text-red-600"
                        : item.stock < 10
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-emerald/10 text-emerald"
                    }`}
                  >
                    {item.stock} in stock
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleAdjustStock(item.id, -1)}
                      className="w-7 h-7 bg-surface-low hover:bg-surface-high border border-outline-variant flex items-center justify-center text-charcoal"
                      title="Decrease by 1"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center font-bold text-xs">{item.stock}</span>
                    <button
                      onClick={() => handleAdjustStock(item.id, 1)}
                      className="w-7 h-7 bg-surface-low hover:bg-surface-high border border-outline-variant flex items-center justify-center text-charcoal"
                      title="Increase by 1"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={item.stock}
                      onBlur={(e) => handleDirectSetStock(item.id, Number(e.target.value))}
                      className="w-16 bg-surface-low border border-outline-variant px-2 py-1 text-xs text-right font-mono focus:outline-none focus:border-charcoal"
                    />
                    <span className="text-xs text-on-surface-variant">units</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="font-display text-lg text-charcoal">No inventory matches filter</p>
          </div>
        )}
      </div>
    </div>
  );
};
