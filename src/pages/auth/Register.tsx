import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export const Register = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "" });
  const navigate = useNavigate();

  const roles = [
    { id: "customer", label: "Customer", desc: "Shop, discover & get AI-styled", icon: "👗" },
    { id: "designer", label: "Designer", desc: "Showcase your creative work", icon: "✏️" },
    { id: "tailor", label: "Tailor", desc: "Offer bespoke tailoring services", icon: "✂️" },
    { id: "brand", label: "Brand", desc: "Sell your fashion collections", icon: "🏷️" },
    { id: "creator", label: "Creator", desc: "Build audience, collaborate with brands", icon: "📸" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Account created! Please login to continue.");
    navigate("/login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-charcoal flex items-center justify-center">
              <span className="text-white font-display font-bold">B</span>
            </div>
            <span className="font-display text-2xl font-semibold tracking-tight text-charcoal uppercase">Betees</span>
            <span className="text-rose-gold text-xl">✦</span>
          </Link>
          <h1 className="font-display text-3xl text-charcoal">Create your account</h1>
          <p className="text-on-surface-variant text-sm mt-1">Join India's premier AI fashion ecosystem</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className={`flex-1 flex items-center gap-2 ${s <= step ? "text-charcoal" : "text-on-surface-variant"}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${s < step ? "bg-burgundy border-burgundy text-white" : s === step ? "border-charcoal text-charcoal" : "border-outline-color"}`}>
                {s < step ? <Check size={12} /> : s}
              </div>
              <span className="text-xs font-medium">{s === 1 ? "Basic Info" : "Choose Role"}</span>
              {s < 2 && <div className={`flex-1 h-0.5 ${s < step ? "bg-burgundy" : "bg-outline-color"}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 shadow-editorial">
          {step === 1 && (
            <>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Priya Sharma"
                  className="input-editorial"
                  required
                />
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-editorial"
                  required
                />
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Mobile Number</label>
                <div className="flex">
                  <div className="bg-surface-low border border-outline-variant border-r-0 px-3 py-2.5 text-sm text-on-surface-variant flex items-center">+91</div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="9876543210"
                    className="flex-1 input-editorial"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 8 characters"
                    className="input-editorial pr-10"
                    required
                    minLength={6}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="font-display text-lg text-charcoal mb-2">How will you use Betees?</p>
              {roles.map((role) => (
                <label
                  key={role.id}
                  className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
                    form.role === role.id ? "border-burgundy bg-secondary-container/30" : "border-outline-variant hover:border-charcoal"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.id}
                    checked={form.role === role.id}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="sr-only"
                  />
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{role.label}</p>
                    <p className="text-xs text-on-surface-variant">{role.desc}</p>
                  </div>
                  {form.role === role.id && (
                    <div className="ml-auto w-5 h-5 bg-burgundy rounded-full flex items-center justify-center">
                      <Check size={11} className="text-white" />
                    </div>
                  )}
                </label>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (step === 2 && !form.role)}
            className="w-full btn-primary justify-center py-3 text-sm disabled:opacity-60"
          >
            {loading ? "Creating account..." : step === 1 ? "Continue" : "Create Account"}
            {!loading && <ArrowRight size={14} />}
          </button>

          {step === 2 && (
            <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-on-surface-variant hover:text-charcoal">
              ← Back
            </button>
          )}
        </form>

        <p className="text-center text-sm text-on-surface-variant mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-burgundy font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
