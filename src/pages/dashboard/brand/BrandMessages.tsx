import { useState } from "react";
import { Search, Send, CheckCheck, Sparkles, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage, ConversationThread } from "@/constants/dashboardData";

const INITIAL_BRAND_INBOX: ConversationThread[] = [
  {
    id: "BC-CHAT-1",
    partnerName: "Priya Sharma",
    partnerRole: "Buyer",
    unreadCount: 1,
    lastMessage: "Is the cashmere trench water-resistant in light drizzle?",
    lastTime: "11:20 AM",
    messages: [
      { id: "m1", sender: "them", senderName: "Priya Sharma", text: "Hello Aurelia team, I'm considering ordering the Cashmere Trench.", time: "11:05 AM" },
      { id: "m2", sender: "me", senderName: "Aurelia Concierge", text: "Hello Priya! The Mongolian cashmere has a tight twill weave that offers gentle water repellent properties.", time: "11:15 AM" },
      { id: "m3", sender: "them", senderName: "Priya Sharma", text: "Is the cashmere trench water-resistant in light drizzle?", time: "11:20 AM" }
    ]
  },
  {
    id: "BC-CHAT-2",
    partnerName: "Aryan Kapoor",
    partnerRole: "Buyer",
    unreadCount: 0,
    lastMessage: "Thank you for expediting my blazer dispatch!",
    lastTime: "Yesterday",
    messages: [
      { id: "m4", sender: "them", senderName: "Aryan Kapoor", text: "Hi, need my tuxedo blazer delivered by Thursday for a gala.", time: "Yesterday 9:00 AM" },
      { id: "m5", sender: "me", senderName: "Aurelia Concierge", text: "Dispatched today via BlueDart Express priority air courier.", time: "Yesterday 11:30 AM" },
      { id: "m6", sender: "them", senderName: "Aryan Kapoor", text: "Thank you for expediting my blazer dispatch!", time: "Yesterday 4:00 PM" }
    ]
  }
];

export const BrandMessages = () => {
  const [conversations, setConversations] = useState<ConversationThread[]>(INITIAL_BRAND_INBOX);
  const [activeId, setActiveId] = useState(conversations[0]?.id || "");
  const [inputText, setInputText] = useState("");

  const activeThread = conversations.find((c) => c.id === activeId) || conversations[0];

  const quickReplies = [
    "Yes, complimentary alteration is included.",
    "We dispatch within 24 hours via express courier.",
    "This garment fits true to standard European sizing.",
    "Bespoke custom measurements are available upon request."
  ];

  const handleSend = (text?: string) => {
    const msg = text || inputText;
    if (!msg.trim() || !activeThread) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      senderName: "Aurelia Concierge",
      text: msg.trim(),
      time: "Just now"
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeThread.id
          ? {
              ...c,
              lastMessage: msg.trim(),
              lastTime: "Just now",
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );

    setInputText("");
    toast.success("Support reply sent to customer");
  };

  return (
    <div className="p-5 md:p-8 space-y-6 animate-fade-in h-[calc(100vh-3.5rem)] flex flex-col">
      <div>
        <h1 className="font-display text-2xl md:text-3xl text-charcoal">Customer Inquiries & Concierge</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Respond to sizing questions, fabric queries, and delivery assistance requests from shoppers.
        </p>
      </div>

      <div className="bg-white shadow-editorial flex-1 flex overflow-hidden border border-outline-variant">
        {/* Left conversations */}
        <div className="w-80 border-r border-outline-variant flex flex-col shrink-0 bg-surface-low/30">
          <div className="p-3 border-b border-outline-variant">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-white border border-outline-variant pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-charcoal"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-outline-variant">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setActiveId(c.id);
                  setConversations((prev) =>
                    prev.map((item) => (item.id === c.id ? { ...item, unreadCount: 0 } : item))
                  );
                }}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  activeThread?.id === c.id ? "bg-white border-l-2 border-burgundy shadow-xs" : "hover:bg-surface-low"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center font-bold text-xs shrink-0">
                  {c.partnerName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-charcoal truncate">{c.partnerName}</p>
                    <span className="text-[10px] text-on-surface-variant">{c.lastTime}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {c.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-burgundy text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                    {c.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right chat panel */}
        {activeThread && (
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-xs">
                  {activeThread.partnerName[0]}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-charcoal">{activeThread.partnerName}</h3>
                  <p className="text-[11px] text-on-surface-variant">Verified Buyer · Inquiry Thread</p>
                </div>
              </div>
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 bg-surface-low/50 border-b border-outline-variant flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <Sparkles size={12} className="text-burgundy shrink-0" />
              <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider shrink-0">Template:</span>
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => handleSend(qr)}
                  className="px-2.5 py-1 bg-white border border-outline-variant hover:border-burgundy text-charcoal text-[11px] whitespace-nowrap rounded-full transition-colors"
                >
                  {qr}
                </button>
              ))}
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-warm-white/40">
              {activeThread.messages.map((m) => (
                <div key={m.id} className={`flex flex-col ${m.sender === "me" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-md p-3 text-xs leading-relaxed ${m.sender === "me" ? "bg-charcoal text-white" : "bg-white border border-outline-variant text-charcoal shadow-xs"}`}>
                    <p>{m.text}</p>
                  </div>
                  <span className="text-[9px] text-on-surface-variant mt-1 flex items-center gap-1">
                    {m.time} {m.sender === "me" && <CheckCheck size={10} className="text-emerald" />}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-outline-variant bg-white shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your response to the customer..."
                  className="flex-1 bg-surface-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-charcoal"
                />
                <button type="submit" disabled={!inputText.trim()} className="btn-primary py-2 px-4 text-xs disabled:opacity-50">
                  <Send size={13} /> Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
