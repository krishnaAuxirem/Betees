import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { Save, Check } from "lucide-react";

export const Settings = () => {
  const { user, updateUser } = useAuthStore();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "+91 98765 43210" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, offers: true });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: form.name, email: form.email });
    toast.success("Settings saved successfully");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      <h1 className="font-display text-2xl text-charcoal">Account Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-white shadow-editorial p-6">
          <h2 className="font-display text-lg text-charcoal mb-5">Profile Information</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Full Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-editorial w-full" />
            </div>
            <div>
              <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-editorial w-full" />
            </div>
            <div>
              <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Mobile</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-editorial w-full" />
            </div>
            <button type="submit" className={`btn-primary text-sm ${saved ? "bg-emerald" : ""}`}>
              {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save Changes</>}
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow-editorial p-6">
          <h2 className="font-display text-lg text-charcoal mb-5">Notification Preferences</h2>
          <div className="space-y-4">
            {[
              { key: "email", label: "Email Notifications", desc: "Order updates, style tips, and offers" },
              { key: "sms", label: "SMS Alerts", desc: "Order status and delivery updates" },
              { key: "push", label: "Push Notifications", desc: "Real-time style recommendations" },
              { key: "offers", label: "Promotional Offers", desc: "Exclusive deals, new arrivals, and events" },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-outline-variant last:border-0">
                <div>
                  <p className="text-sm font-medium text-charcoal">{label}</p>
                  <p className="text-xs text-on-surface-variant">{desc}</p>
                </div>
                <div
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                  className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${notifications[key as keyof typeof notifications] ? "bg-charcoal" : "bg-outline-color"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifications[key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white shadow-editorial p-6">
          <h2 className="font-display text-lg text-charcoal mb-5">Security</h2>
          <div className="space-y-3">
            {[
              { label: "Change Password", action: "Update" },
              { label: "Two-Factor Authentication", action: "Enable" },
              { label: "Connected Devices", action: "Manage" },
              { label: "Delete Account", action: "Delete", danger: true },
            ].map(({ label, action, danger }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-outline-variant last:border-0">
                <span className={`text-sm ${danger ? "text-red-500" : "text-charcoal"}`}>{label}</span>
                <button className={`text-xs font-semibold uppercase tracking-wide ${danger ? "text-red-500 hover:underline" : "text-burgundy hover:underline"}`}>{action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
