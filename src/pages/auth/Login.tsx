import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { DEMO_CREDENTIALS } from "@/constants/data";
import { toast } from "sonner";
import hero1 from "@/assets/hero-1.jpg";
import type { UserRole } from "@/types";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const redirectToDashboard = (role: string) => {
    switch (role) {
      case "designer": case "tailor": navigate("/dashboard/designer"); break;
      case "brand": navigate("/dashboard/brand"); break;
      case "creator": navigate("/dashboard/creator"); break;
      case "admin": navigate("/dashboard/admin"); break;
      default: navigate("/dashboard/customer");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const cred = DEMO_CREDENTIALS.find((c) => c.email === email && c.password === password);
    if (cred) {
      login({ id: Math.random().toString(36).slice(2), name: cred.name, email: cred.email, role: cred.role as UserRole, isOnboarded: true });
      toast.success(`Welcome back, ${cred.name.split(" ")[0]}!`);
      redirectToDashboard(cred.role);
    } else {
      toast.error("Invalid credentials. Use demo credentials below.");
    }
    setLoading(false);
  };

  const handleDemoLogin = async (cred: typeof DEMO_CREDENTIALS[0]) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    login({ id: Math.random().toString(36).slice(2), name: cred.name, email: cred.email, role: cred.role as UserRole, isOnboarded: true });
    toast.success(`Logged in as ${cred.name} (${cred.role})`);
    redirectToDashboard(cred.role);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-warm-white flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 bg-charcoal flex items-center justify-center"><span className="text-white font-display font-bold">B</span></div>
              <span className="font-display text-2xl font-semibold tracking-tight text-charcoal uppercase">Betees</span>
              <span className="text-rose-gold text-xl">✦</span>
            </Link>
            <h1 className="font-display text-3xl text-charcoal">Welcome back</h1>
            <p className="text-on-surface-variant text-sm mt-1">Sign in to your Betees account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-editorial" required />
            </div>
            <div>
              <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" className="input-editorial pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-burgundy hover:underline">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary justify-center py-3 text-sm disabled:opacity-60">
              {loading ? "Signing in..." : "Sign In"} {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-outline-variant" />
            <span className="text-xs text-on-surface-variant">or continue with</span>
            <div className="flex-1 h-px bg-outline-variant" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-outline-color hover:bg-surface-low transition-colors text-sm font-medium">
              <span>🇬</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-outline-color hover:bg-surface-low transition-colors text-sm font-medium">
              <span>📱</span> Mobile OTP
            </button>
          </div>

          <p className="text-center text-sm text-on-surface-variant">
            Don't have an account?{" "}
            <Link to="/register" className="text-burgundy font-semibold hover:underline">Register here</Link>
          </p>

          <div className="border border-rose-gold/30 bg-secondary-container/30 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-burgundy" />
              <p className="label-caps text-[10px] text-burgundy">Demo Credentials — One Click Login</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <button key={cred.role} onClick={() => handleDemoLogin(cred)} disabled={loading}
                  className="text-left p-2 bg-white border border-outline-variant hover:border-burgundy hover:bg-white transition-all">
                  <span className="label-caps text-[9px] text-burgundy capitalize block">{cred.role}</span>
                  <span className="text-xs text-charcoal font-medium">{cred.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative bg-charcoal max-w-lg xl:max-w-xl">
        <img src={hero1} alt="Betees Fashion" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-l from-charcoal/80 to-transparent flex items-center justify-end p-12">
          <div className="text-right max-w-xs">
            <p className="label-caps text-[10px] text-rose-gold mb-3">AI-Powered Fashion</p>
            <p className="font-display text-3xl text-white leading-tight">Your personal stylist,<br /><span className="italic text-rose-gold">powered by AI</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
