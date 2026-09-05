import { useState } from "react";
import { Save, Check, Upload, ShieldCheck, MapPin, Clock, Bell, FileText } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

export const DesignerSettings = () => {
  const { user } = useAuthStore();
  const [saved, setSaved] = useState(false);

  const [studioProfile, setStudioProfile] = useState({
    studioName: "Suresh Nair Bespoke Atelier",
    ownerName: user?.name || "Suresh Nair",
    email: user?.email || "tailor@betees.com",
    phone: "+91 98200 44321",
    specialty: "Milanese Hand-Canvassed Tailoring & Heritage Indian Silks",
    experienceYears: "24",
    bio: "Master craftsman specializing in floating canvas bespoke tuxedos, bandhgalas, and traditional hand-basted fitting procedures."
  });

  const [serviceArea, setServiceArea] = useState({
    city: "Mumbai",
    serviceLocations: "Mumbai Metropolitan Region, Pune, Goa (by appointment)",
    studioAddress: "Suite 4B, Heritage Mill Compound, Lower Parel, Mumbai 400013",
    takesHomeVisits: true,
    trialLeadTimeDays: "7"
  });

  const [workingHours, setWorkingHours] = useState({
    openDays: "Monday – Saturday",
    hours: "10:00 AM – 7:30 PM",
    emergencyRushService: true
  });

  const [notifications, setNotifications] = useState({
    newCommissionAlerts: true,
    fittingReminders: true,
    payoutDispatched: true,
    marketingUpdates: false
  });

  const [uploadedDocName, setUploadedDocName] = useState("GST_Certificate_SureshNair.pdf");

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Studio profile and operational settings saved successfully");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedDocName(file.name);
      toast.success(`Verification document "${file.name}" uploaded successfully`);
    }
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Studio & Craft Settings</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Configure your atelier public profile, working hours, fitting lead times, and verification documents.
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          className={`btn-primary self-start text-xs ${saved ? "bg-emerald" : ""}`}
        >
          {saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Save All Changes</>}
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Atelier Profile Information */}
          <div className="bg-white shadow-editorial p-6 space-y-4">
            <h2 className="font-display text-lg text-charcoal flex items-center gap-2">
              <span>Atelier Profile</span>
              <span className="text-[10px] bg-emerald/10 text-emerald font-bold px-2 py-0.5 uppercase">Verified</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Studio / Brand Name</label>
                <input
                  type="text"
                  value={studioProfile.studioName}
                  onChange={(e) => setStudioProfile({ ...studioProfile, studioName: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Master Tailor Name</label>
                  <input
                    type="text"
                    value={studioProfile.ownerName}
                    onChange={(e) => setStudioProfile({ ...studioProfile, ownerName: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={studioProfile.experienceYears}
                    onChange={(e) => setStudioProfile({ ...studioProfile, experienceYears: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={studioProfile.email}
                    onChange={(e) => setStudioProfile({ ...studioProfile, email: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Studio Phone</label>
                  <input
                    type="tel"
                    value={studioProfile.phone}
                    onChange={(e) => setStudioProfile({ ...studioProfile, phone: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Craftsmanship Specialty</label>
                <input
                  type="text"
                  value={studioProfile.specialty}
                  onChange={(e) => setStudioProfile({ ...studioProfile, specialty: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Bio / Craft Description</label>
                <textarea
                  rows={3}
                  value={studioProfile.bio}
                  onChange={(e) => setStudioProfile({ ...studioProfile, bio: e.target.value })}
                  className="input-editorial w-full text-xs"
                />
              </div>
            </div>
          </div>

          {/* Service Area & Lead Times */}
          <div className="bg-white shadow-editorial p-6 space-y-4">
            <h2 className="font-display text-lg text-charcoal flex items-center gap-2">
              <MapPin size={16} className="text-burgundy" /> Service Area & Fitting Lead Times
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Primary City Base</label>
                <input
                  type="text"
                  value={serviceArea.city}
                  onChange={(e) => setServiceArea({ ...serviceArea, city: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Service Locations Covered</label>
                <input
                  type="text"
                  value={serviceArea.serviceLocations}
                  onChange={(e) => setServiceArea({ ...serviceArea, serviceLocations: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div>
                <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Atelier Trial Fitting Address</label>
                <textarea
                  rows={2}
                  value={serviceArea.studioAddress}
                  onChange={(e) => setServiceArea({ ...serviceArea, studioAddress: e.target.value })}
                  className="input-editorial w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">First Fitting Lead Time (Days)</label>
                  <input
                    type="number"
                    value={serviceArea.trialLeadTimeDays}
                    onChange={(e) => setServiceArea({ ...serviceArea, trialLeadTimeDays: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
                <div>
                  <label className="label-caps text-[9px] text-on-surface-variant block mb-1">Working Days</label>
                  <input
                    type="text"
                    value={workingHours.openDays}
                    onChange={(e) => setWorkingHours({ ...workingHours, openDays: e.target.value })}
                    className="input-editorial w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-low border border-outline-variant">
                <div>
                  <p className="font-semibold text-charcoal">Home Measurement Visits</p>
                  <p className="text-[10px] text-on-surface-variant">Offer VIP concierge fitting visits to clients</p>
                </div>
                <input
                  type="checkbox"
                  checked={serviceArea.takesHomeVisits}
                  onChange={(e) => setServiceArea({ ...serviceArea, takesHomeVisits: e.target.checked })}
                  className="accent-burgundy w-4 h-4 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Document Upload */}
          <div className="bg-white shadow-editorial p-6 space-y-4">
            <h2 className="font-display text-lg text-charcoal flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald" /> Verification Documents & Credentials
            </h2>
            <p className="text-xs text-on-surface-variant">
              Keep your Master Tailor credentials, GST registration, and studio identification current to maintain your verified badge.
            </p>

            <div className="border-2 border-dashed border-outline-color p-6 text-center space-y-2 bg-surface-low/50">
              <FileText size={24} className="text-burgundy mx-auto" />
              <p className="text-xs font-semibold text-charcoal">Current Document: {uploadedDocName}</p>
              <p className="text-[10px] text-on-surface-variant">PDF, PNG, or JPG up to 10MB</p>
              <label className="btn-outline text-[11px] py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5 mt-2">
                <Upload size={12} /> Replace Document
                <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
              </label>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white shadow-editorial p-6 space-y-4">
            <h2 className="font-display text-lg text-charcoal flex items-center gap-2">
              <Bell size={16} className="text-burgundy" /> Notification Preferences
            </h2>
            <div className="space-y-3 text-xs">
              {[
                { key: "newCommissionAlerts", label: "New Commission Inquiries", desc: "Instant alert when a client requests a quote" },
                { key: "fittingReminders", label: "Fitting Trial Reminders", desc: "Alert 24h before scheduled customer trial visit" },
                { key: "payoutDispatched", label: "Bank Payout Dispatches", desc: "Notification upon NEFT bank transfer clearance" },
                { key: "marketingUpdates", label: "Betees Atelier Spotlight", desc: "Tips to boost portfolio inquiries & visibility" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-outline-variant last:border-0">
                  <div>
                    <p className="font-semibold text-charcoal">{label}</p>
                    <p className="text-[10px] text-on-surface-variant">{desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications[key as keyof typeof notifications]}
                    onChange={() =>
                      setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
                    }
                    className="accent-burgundy w-4 h-4 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
