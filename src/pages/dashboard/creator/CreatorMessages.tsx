import { useState } from "react";
import { Search, Send, CheckCheck, Sparkles, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { ChatMessage, ConversationThread } from "@/constants/dashboardData";

const INITIAL_CREATOR_INBOX: ConversationThread[] = [
  {
    id: "CRE-CHAT-1",
    partnerName: "Aurelia Couture Team",
    partnerRole: "Brand Partner",
    unreadCount: 1,
    lastMessage: "The rough cut looks sensational! Approved for posting on Saturday.",
    lastTime: "12:15 PM",
    messages: [
      { id: "m1", sender: "them", senderName: "Aurelia Marketing", text: "Hi Neha, received the styling reel rough draft.", time: "11:45 AM" },
      { id: "m2", sender: "me", senderName: "Neha Gupta", text: "Great! Did the color grading for the trench coat meet your brand guidelines?", time: "11:55 AM" },
      { id: "m3", sender: "them", senderName: "Aurelia Marketing", text: "The rough cut looks sensational! Approved for posting on Saturday.", time: "12:15 PM" }
    ]
  },
  {
    id: "CRE-CHAT-2",
    partnerName: "Riya Malhotra",
    partnerRole: "VIP Styling Client",
    unreadCount: 0,
    lastMessage: "Loved the emerald and champagne palette you created for me.",
    lastTime: "Yesterday",
    messages: [
      { id: "m4", sender: "them", senderName: "Riya Malhotra", text: "Can we review the moodboard tonight?", time: "Yesterday 3:00 PM" },
      { id: "m5", sender: "me", senderName: "Neha Gupta", text: "Just uploaded the 3 curated outfit links to your wardrobe session.", time: "Yesterday 5:20 PM" },
      { id: "m6", sender: "them", senderName: "Riya Malhotra", text: "Loved the emerald and champagne palette you created for me.", time: "Yesterday 6:00 PM" }
    ]
  }
];

export const CreatorMessages = () => {
  const [conversations, setConversations] = useState<ConversationThread[]>(INITIAL_CREATOR_INBOX);
  const [activeId, setActiveId] = useState(conversations[0]?.id || "");
  const [inputText, setInputText] = useState("");

  const activeThread = conversations.find((c) => c.id === activeId) || conversations[0];

  const quickReplies = [
    "Draft uploaded for your review.",
    "Scheduling the post for peak evening reach.",
    "Wardrobe curation session link sent.",
    "Available for a consultation call at 4 PM."
  ];

  const handleSend = (text?: string) => {
    const msg = text || inputText;
    if (!msg.trim() || !activeThread) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      senderName: "Neha Gupta",
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
    toast.success("Message dispatched to recipient");
  };

  return (
    <div className="p-5 md:p-8 space-y-6 animate-fade-in h-[calc(100vh-3.5rem)] flex flex-col">
      <div>
        <h1 className="font-display text-2xl md:text-3xl text-charcoal">Collaborations & Client Inbox</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Chat directly with fashion brands sponsoring your content and clients booking styling consultations.
        </p>
      </div>

      <div className="bg-white shadow-editorial flex-1 flex overflow-hidden border border-outline-variant">
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

        {activeThread && (
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="p-4 border-b border-outline-variant flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-xs">
                  {activeThread.partnerName[0]}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-charcoal">{activeThread.partnerName}</h3>
                  <p className="text-[11px] text-emerald font-medium">{activeThread.partnerRole}</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 bg-surface-low/50 border-b border-outline-variant flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <Sparkles size={12} className="text-burgundy shrink-0" />
              <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider shrink-0">Templates:</span>
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
                  placeholder="Type a response to the brand or client..."
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
