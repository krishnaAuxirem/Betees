import { useState } from "react";
import { Sparkles, Send, Bot, User, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/constants/data";
import { useAuthStore } from "@/stores/authStore";

interface ChatMessage {
  id: string;
  sender: "stylist" | "user";
  text: string;
  timestamp: string;
  recommendedProducts?: (typeof PRODUCTS)[0][];
}

export const CustomerAIStylist = () => {
  const { addToCart } = useAuthStore();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "stylist",
      text: "Bonjour Priya. I have analyzed your anatomical profile (39.5\" chest, 32\" waist) and recent atelier purchases. How may I curate your wardrobe today? Whether for a royal wedding, private salon, or executive travel, I am at your service.",
      timestamp: "10:45 AM",
    },
    {
      id: "msg-2",
      sender: "user",
      text: "I need an evening ensemble for an Autumn charity gala in Mumbai. Something sovereign and architectural.",
      timestamp: "10:46 AM",
    },
    {
      id: "msg-3",
      sender: "stylist",
      text: "Magnificent. For a Mumbai Autumn gala, humidity demands breathable silk-blends while maintaining immaculate structure. I recommend our Structured Wool-Silk Tuxedo paired with Fluid Silk Palazzo trousers in Ivory, accented with the Imperial Burgundy Cashmere Trench for evening arrivals.",
      timestamp: "10:46 AM",
      recommendedProducts: [PRODUCTS[1], PRODUCTS[0], PRODUCTS[4]],
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const promptChips = [
    "Style me for an Udaipur royal wedding",
    "What outerwear pairs with my silk palazzo trousers?",
    "Curate a 3-day executive travel capsule",
    "Black-tie black velvet look with rose gold accents",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const stylistResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "stylist",
        text: `Exquisite direction. Based on your palette resonance and tailored preference, I recommend focusing on clean lines with tactile contrast. Here is a curated selection designed to flatter your silhouette for this exact moment:`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recommendedProducts: [
          PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
          PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
        ],
      };
      setMessages((prev) => [...prev, stylistResponse]);
    }, 1200);
  };

  const handleAddRec = (prod: (typeof PRODUCTS)[0]) => {
    addToCart();
    toast.success(`Added ${prod.name} to your shopping bag!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atelier Intelligence</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">AI Personal Stylist</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Real-time high-fashion consultation calibrated to your measurements, event dress codes, and climate.
          </p>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/50 whitespace-nowrap">
          Suggestions:
        </span>
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="text-xs border border-charcoal/15 hover:border-burgundy hover:text-burgundy bg-white px-3.5 py-1.5 whitespace-nowrap transition-colors rounded-full"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white border border-charcoal/10 flex flex-col h-[640px]">
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-warm-white/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-3xl ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === "user" ? "bg-charcoal text-white" : "bg-burgundy text-white"
                }`}
              >
                {m.sender === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className="space-y-3">
                <div
                  className={`p-4 text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-charcoal text-white rounded-none"
                      : "bg-white border border-charcoal/10 text-charcoal shadow-sm"
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[10px] mt-2 font-mono ${
                      m.sender === "user" ? "text-white/50 text-right" : "text-charcoal/40"
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {/* Inline Recommended Product Cards */}
                {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                    {m.recommendedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white border border-charcoal/10 p-3 hover:border-burgundy transition-all flex flex-col justify-between"
                      >
                        <div className="relative aspect-[3/4] bg-charcoal/5 overflow-hidden mb-2">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          <span className="absolute top-1.5 left-1.5 bg-burgundy/90 text-white text-[9px] px-1.5 py-0.5 uppercase font-semibold">
                            {p.aiMatch}% Fit
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-charcoal/50 font-semibold block">
                            {p.brand}
                          </span>
                          <h5 className="font-display text-xs text-charcoal truncate">{p.name}</h5>
                          <span className="text-xs font-semibold text-charcoal block mt-1">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddRec(p)}
                          className="mt-2.5 w-full bg-charcoal hover:bg-burgundy text-white text-[10px] uppercase tracking-wider font-semibold py-1.5 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 max-w-xl mr-auto">
              <div className="w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-charcoal/10 p-4 text-xs text-charcoal/60 italic flex items-center gap-2">
                <span>Stylist is analyzing haute couture archives & your fit profile...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 border-t border-charcoal/10 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask your stylist (e.g. 'What can I wear for an evening opera in Vienna?')..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-3 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="bg-burgundy hover:bg-burgundy/90 disabled:opacity-40 text-white px-6 py-3 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
            >
              <span>Consult</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CustomerAIStylist;
