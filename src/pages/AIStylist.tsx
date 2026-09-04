import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Mic, Paperclip, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/features/ProductCard";
import { PRODUCTS, AI_STYLE_RESPONSES, formatINR } from "@/constants/data";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: string;
}

const PROMPT_CHIPS = [
  "Show me outfits for a wedding reception",
  "Curate a minimalist office wardrobe",
  "Festive season look suggestions",
  "Travel capsule for Rajasthan trip",
];

const AI_RESPONSES = [
  '"For your selected occasion, I recommend a structured silk-blend blazer in warm ivory paired with high-waisted palazzo trousers. The combination harmonizes with your stored Warm Autumn palette — 96% chromatic alignment confirmed."',
  '"Constructing an executive creative director rotation: clean charcoal crepe blazer, raw-silk shirting, and wide pleated trousers for fluid movement. Zero compromise between authority and aesthetic."',
  '"Festive season calls for a rich silk Banarasi saree in deep burgundy with gold zari work, or alternatively, a structured Anarkali in rose gold tissue silk with hand-embroidery along the neckline."',
  '"Rajasthan travel capsule: breathable linen in warm beige tones, block-printed cotton kurtas, and versatile Jodhpuri-inspired separates. Algorithmically calibrated for 35°C desert microclimate comfort."',
];

export const AIStylist = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      text: '"Welcome! I am Aura, your Senior AI Haute Couture Stylist. I have analyzed your body profile, color palette (Warm Autumn), and style history. What occasion shall I curate for today?"',
      timestamp: "Now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [season, setSeason] = useState("Autumn / Winter 2025");
  const [occasion, setOccasion] = useState("Formal Gala");
  const [aesthetic, setAesthetic] = useState("Old Money Minimalist");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: `"${text}"`, timestamp: "Just Now" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    const aiResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "ai", text: aiResponse, timestamp: "Aura AI" }]);
      setIsTyping(false);
    }, 1400);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-charcoal text-white">
        <div className="section-container py-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="label-caps text-[10px] text-rose-gold mb-2">Neural Atelier Protocol v4.2</p>
              <h1 className="font-display text-3xl md:text-4xl text-white">AI Personal Stylist</h1>
              <p className="text-gray-400 mt-2 text-sm">Your intelligent couture companion — calibrated to your unique aesthetic</p>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white/10 px-4 py-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              <div>
                <p className="label-caps text-[9px] text-gray-300">Body Scan Synced #8902</p>
                <p className="text-sm font-semibold text-white">Size M · Warm Autumn Palette</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="section-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT: AI Chat */}
          <div className="lg:col-span-5 bg-white shadow-editorial flex flex-col" style={{ height: "min(750px, 85vh)" }}>
            {/* Aura Identity Header */}
            <div className="p-4 border-b border-outline-variant flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 bg-charcoal rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <Sparkles size={20} className="text-rose-gold" />
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-display text-lg font-semibold text-charcoal">Aura AI</h2>
                    <Sparkles size={14} className="text-burgundy" />
                  </div>
                  <p className="label-caps text-[9px] text-on-surface-variant">Senior Haute Couture Stylist</p>
                </div>
              </div>
              <span className="bg-surface-low text-burgundy label-caps text-[9px] px-2.5 py-1">Active Neural Fit</span>
            </div>

            {/* Profile Calibration */}
            <div className="bg-surface-low px-4 py-2.5 flex items-center justify-between border-b border-outline-variant">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="text-sm">📐</span>
                <span className="text-charcoal">Calibrated: Size M · 172cm · Warm Autumn Palette</span>
              </div>
              <button className="label-caps text-[9px] text-burgundy hover:underline">Recalibrate</button>
            </div>

            {/* Curation Parameters */}
            <div className="bg-surface-low/50 px-4 py-3 border-b border-outline-variant space-y-2">
              <span className="label-caps text-[9px] text-on-surface-variant block">Curation Parameters</span>
              <div className="flex flex-wrap gap-1.5">
                <span className="label-caps text-[9px] text-on-surface-variant w-12">Season:</span>
                {["Autumn / Winter 2025", "Spring Resort"].map((s) => (
                  <button key={s} onClick={() => setSeason(s)} className={`px-2 py-1 label-caps text-[9px] transition-colors ${season === s ? "bg-charcoal text-white" : "bg-surface-container text-on-surface-variant hover:text-charcoal"}`}>{s}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="label-caps text-[9px] text-on-surface-variant w-12">Occasion:</span>
                {["Formal Gala", "Office", "Casual", "Wedding"].map((o) => (
                  <button key={o} onClick={() => setOccasion(o)} className={`px-2 py-1 label-caps text-[9px] transition-colors ${occasion === o ? "bg-burgundy text-white" : "bg-surface-container text-on-surface-variant hover:text-charcoal"}`}>{o}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="label-caps text-[9px] text-on-surface-variant w-12">Style:</span>
                {["Old Money Minimalist", "Bold Avant-Garde", "Desi Chic"].map((a) => (
                  <button key={a} onClick={() => setAesthetic(a)} className={`px-2 py-1 label-caps text-[9px] transition-colors ${aesthetic === a ? "bg-charcoal text-white" : "bg-surface-container text-on-surface-variant hover:text-charcoal"}`}>{a}</button>
                ))}
              </div>
            </div>

            {/* Chat History */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {msg.role === "ai" && (
                    <div className="w-6 h-6 bg-charcoal text-white rounded-full flex items-center justify-center shrink-0 mt-1">
                      <Sparkles size={11} />
                    </div>
                  )}
                  <div className={`max-w-[85%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`p-3 shadow-sm ${msg.role === "user" ? "bg-surface-high text-charcoal" : "bg-surface-low text-charcoal"}`}>
                      <p className="text-xs font-display leading-relaxed italic">{msg.text}</p>
                      {msg.role === "ai" && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="bg-secondary-container text-burgundy label-caps text-[8px] px-1.5 py-0.5">Confidence: 96%</span>
                          <span className="text-on-surface-variant label-caps text-[8px]">Mumbai · 29°C</span>
                        </div>
                      )}
                    </div>
                    <span className="label-caps text-[8px] text-on-surface-variant mt-1">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-charcoal rounded-full flex items-center justify-center"><Sparkles size={11} className="text-white" /></div>
                  <div className="bg-surface-low p-3">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-burgundy animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Suggestions */}
            <div className="px-4 py-3 border-t border-outline-variant space-y-2">
              <p className="label-caps text-[9px] text-on-surface-variant">Suggested Inquiries</p>
              <div className="flex flex-wrap gap-1.5">
                {PROMPT_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="bg-surface-low hover:bg-surface-container text-charcoal text-xs px-2.5 py-1.5 flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ArrowRight size={10} className="text-burgundy" />
                    <span className="truncate max-w-[160px]">{chip}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-outline-variant">
              <div className="flex flex-col gap-2 bg-surface-low p-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                    placeholder="Instruct Aura AI (e.g. 'Show ethnic wear for Diwali')..."
                    className="flex-1 bg-white text-charcoal placeholder:text-on-surface-variant px-3 py-2 text-xs focus:outline-none"
                  />
                  <button className="p-2 text-on-surface-variant hover:text-charcoal transition-colors"><Paperclip size={16} /></button>
                  <button className="p-2 text-on-surface-variant hover:text-burgundy transition-colors"><Mic size={16} /></button>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <Sparkles size={11} className="text-burgundy" />
                    <span className="label-caps text-[9px]">Betees Haute-V6</span>
                  </div>
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className="bg-charcoal hover:bg-burgundy text-white px-3 py-1.5 label-caps text-[9px] uppercase flex items-center gap-1.5 transition-colors disabled:opacity-40"
                  >
                    Ask Aura <Send size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Look Canvas */}
          <div className="lg:col-span-7 space-y-5">
            {/* Look Header */}
            <div className="bg-white shadow-editorial p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="label-caps text-[10px] text-burgundy">Look No. 04 · {season}</span>
                </div>
                <h2 className="font-display text-2xl text-charcoal">The {occasion} Silhouette</h2>
              </div>
              {/* Harmony Score Circle */}
              <div className="flex items-center gap-3 bg-surface-low px-4 py-2 self-start sm:self-auto">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E8E6E2" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7F1D3A" strokeDasharray="96, 100" strokeLinecap="round" strokeWidth="3" />
                  </svg>
                  <span className="absolute label-caps text-[10px] font-semibold text-burgundy">96%</span>
                </div>
                <div>
                  <span className="label-caps text-[10px] text-charcoal block">Harmony Score</span>
                  <span className="label-caps text-[9px] text-on-surface-variant">AI Match</span>
                </div>
              </div>
            </div>

            {/* Curated Look Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hero Product */}
              <div className="bg-white shadow-editorial overflow-hidden group">
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-low">
                  <img src={PRODUCTS[0].image} alt={PRODUCTS[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-2 left-2 bg-charcoal text-white label-caps text-[9px] px-2 py-0.5">98% Fit</span>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="label-caps text-[9px] text-on-surface-variant">{PRODUCTS[0].brand}</span>
                      <p className="font-display text-base font-semibold text-charcoal">{PRODUCTS[0].name.split(" ").slice(0, 4).join(" ")}</p>
                    </div>
                    <span className="font-display text-base font-semibold text-charcoal">{formatINR(PRODUCTS[0].price)}</span>
                  </div>
                </div>
              </div>

              {/* Side Products */}
              <div className="space-y-4">
                {PRODUCTS.slice(1, 3).map((p) => (
                  <div key={p.id} className="bg-white shadow-sm overflow-hidden group flex">
                    <div className="relative w-24 aspect-[3/4] overflow-hidden bg-surface-low shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-1 right-1 bg-burgundy text-white label-caps text-[8px] px-1">{p.aiMatch}%</span>
                    </div>
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <div>
                        <span className="label-caps text-[9px] text-on-surface-variant">{p.brand}</span>
                        <p className="font-display text-sm font-semibold text-charcoal leading-tight">{p.name.split(" ").slice(0, 4).join(" ")}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-semibold text-charcoal">{formatINR(p.price)}</span>
                        <button onClick={() => {}} className="label-caps text-[9px] text-burgundy hover:underline">Swap</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white shadow-editorial p-4 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-semibold text-charcoal">{formatINR(PRODUCTS[0].price + PRODUCTS[1].price + PRODUCTS[2].price)}</span>
                    <span className="text-xs text-emerald font-semibold">10% Bundle Savings</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">Complete 3-piece curation with complimentary express courier</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-primary text-xs px-4 py-3">Add Full Look to Cart</button>
                  <button className="btn-secondary text-xs px-4 py-3">
                    <Sparkles size={13} /> Try-On
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 border-t border-outline-variant text-xs text-on-surface-variant">
                {["Save to Wardrobe", "Customize with Tailor", "Share Look"].map((action) => (
                  <button key={action} className="hover:text-charcoal transition-colors">{action}</button>
                ))}
                <span className="ml-auto text-[10px]">Stock locked for 18:42</span>
              </div>
            </div>

            {/* AI Sizing Guarantee */}
            <div className="bg-surface-low p-4 flex items-start gap-3">
              <div className="w-9 h-9 bg-burgundy flex items-center justify-center shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <p className="font-display text-base font-semibold text-charcoal">Betees AI Sizing Guarantee</p>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  98% probability of zero alteration based on your 3D body scan. If micro-tailoring is needed, we cover up to ₹3,500 in local alterations nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
