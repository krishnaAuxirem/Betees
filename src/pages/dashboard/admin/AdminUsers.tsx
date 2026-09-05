import { useState } from "react";
import { Search, Filter, ShieldAlert, CheckCircle2, Eye, X, UserX, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/constants/data";
import { INITIAL_USERS, AdminUserItem } from "@/constants/dashboardData";

export const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUserItem[]>(INITIAL_USERS);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase()) ||
                        u.city.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  const handleToggleStatus = (id: string, currentStatus: AdminUserItem["status"], name: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
    toast.success(`User ${name} status changed to ${newStatus.toUpperCase()}`);
    if (selectedUser?.id === id) {
      setSelectedUser({ ...selectedUser, status: newStatus });
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">User Governance & Access Management</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Oversee user accounts across all platform roles: Customers, Designers, Tailors, Brands, Creators, and Admins.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald" />
          <span className="text-xs font-semibold text-charcoal">{users.filter((u) => u.status === "active").length} Active Accounts</span>
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
            placeholder="Search by name, email, city..."
            className="w-full bg-surface-low border border-outline-variant pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-charcoal"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <Filter size={14} className="text-on-surface-variant" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs bg-surface-low border border-outline-variant px-2.5 py-1.5 focus:outline-none font-semibold text-charcoal"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="designer">Designer</option>
            <option value="tailor">Tailor</option>
            <option value="brand">Fashion Brand</option>
            <option value="creator">Creator</option>
            <option value="admin">Administrator</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-surface-low border border-outline-variant px-2.5 py-1.5 focus:outline-none font-semibold text-charcoal"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant bg-surface-low/50 text-[10px] uppercase tracking-wider text-on-surface-variant">
              <th className="p-4">User</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">City</th>
              <th className="p-4">Platform Turnover</th>
              <th className="p-4">Registration</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-surface-low/30 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center font-bold text-xs">
                    {u.name[0]}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal block text-xs">{u.name}</span>
                    <span className="text-[11px] text-on-surface-variant">{u.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs uppercase font-bold text-charcoal bg-surface-low px-2 py-0.5">
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-xs text-charcoal">{u.city}</td>
                <td className="p-4 font-display font-semibold text-charcoal">
                  {formatINR(u.totalSpentOrEarned)}
                </td>
                <td className="p-4 text-xs text-on-surface-variant">{u.joinedDate}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${
                      u.status === "active"
                        ? "bg-emerald/10 text-emerald"
                        : u.status === "suspended"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => setSelectedUser(u)}
                    className="p-1.5 border border-outline-color hover:border-charcoal text-charcoal"
                    title="View Profile Details"
                  >
                    <Eye size={14} />
                  </button>
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleToggleStatus(u.id, u.status, u.name)}
                      className={`p-1.5 ${
                        u.status === "active"
                          ? "text-red-600 hover:bg-red-50 border border-red-200"
                          : "text-emerald hover:bg-emerald/10 border border-emerald/30"
                      }`}
                      title={u.status === "active" ? "Suspend Account" : "Re-activate Account"}
                    >
                      {u.status === "active" ? <UserX size={14} /> : <UserCheck size={14} />}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <div>
                <span className="label-caps text-[10px] text-burgundy">{selectedUser.id}</span>
                <h2 className="font-display text-xl text-charcoal">{selectedUser.name}</h2>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="bg-surface-low p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Role Type</span>
                  <span className="font-bold text-charcoal uppercase">{selectedUser.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Email Address</span>
                  <span className="font-medium text-charcoal">{selectedUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Location</span>
                  <span className="text-charcoal">{selectedUser.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Joined On</span>
                  <span className="text-charcoal">{selectedUser.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Orders / Deals Count</span>
                  <span className="font-semibold text-charcoal">{selectedUser.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Total Turnover Value</span>
                  <span className="font-display font-bold text-emerald">{formatINR(selectedUser.totalSpentOrEarned)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-outline-variant">
                {selectedUser.role !== "admin" && (
                  <button
                    onClick={() => {
                      handleToggleStatus(selectedUser.id, selectedUser.status, selectedUser.name);
                    }}
                    className={`btn-outline text-xs ${
                      selectedUser.status === "active" ? "text-red-600 border-red-300" : "text-emerald border-emerald/40"
                    }`}
                  >
                    {selectedUser.status === "active" ? "Suspend Account" : "Activate Account"}
                  </button>
                )}
                <button onClick={() => setSelectedUser(null)} className="btn-primary text-xs ml-auto">
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
