import { useState } from "react";
import { Search, Send, CheckCheck, User, Paperclip, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_DESIGNER_CHATS, ConversationThread, ChatMessage } from "@/constants/dashboardData";

export const DesignerMessages = () => {
  const [conversations, setConversations] = useState<ConversationThread[]>(INITIAL_DESIGNER_CHATS);
  const [activeId, setActiveId] = useState<string>(conversations[0]?.id || "");
  const [inputText, setInputText] = useState("");

  const activeThread = conversations.find((c) => c.id === activeId) || conversations[0];

  const quickReplies = [
    "Your fabric swatch is ready for viewing.",
    "First trial fitting is scheduled for this Friday.",
    "The chest canvas has been hand-basted.",
    "Please send updated sleeve measurements."
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeThread) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      senderName: "Suresh Nair (Tailor)",
      text: text.trim(),
      time: "Just now"
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeThread.id
          ? {
              ...c,
              lastMessage: text.trim(),
              lastTime: "Just now",
              messages: [...c.messages, newMsg]
            }
          : c
      )
    );

    setInputText("");
    toast.success("Message dispatched to client");
  };

  return (
    <div className="p-5 md:p-8 space-y-6 animate-fade-in h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl text-charcoal">Client Consultations & Messages</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Direct communication with bespoke clients regarding fabric selection, fittings, and design details.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white shadow-editorial flex-1 flex overflow-hidden border border-outline-variant">
        {/* Left Sidebar: Conversations */}
        <div className="w-80 border-r border-outline-variant flex flex-col shrink-0 bg-surface-low/30">
          <div className="p-3 border-b border-outline-variant">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-white border border-outline-variant pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-charcoal"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-outline-variant">
            {conversations.map((thread) => (
              <div
                key={thread.id}
                onClick={() => {
                  setActiveId(thread.id);
                  // Mark as read
                  setConversations((prev) =>
                    prev.map((c) => (c.id === thread.id ? { ...c, unreadCount: 0 } : c))
                  );
                }}
                className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                  activeThread?.id === thread.id ? "bg-white border-l-2 border-burgundy shadow-xs" : "hover:bg-surface-low"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center font-bold text-xs shrink-0">
                  {thread.partnerName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-charcoal truncate">{thread.partnerName}</p>
                    <span className="text-[10px] text-on-surface-variant">{thread.lastTime}</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant truncate mt-0.5">{thread.lastMessage}</p>
                </div>
                {thread.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-burgundy text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                    {thread.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Chat Thread */}
        {activeThread ? (
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Thread Header */}
            <div className="p-4 border-b border-outline-variant flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-burgundy text-white flex items-center justify-center font-bold text-xs">
                  {activeThread.partnerName[0]}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-charcoal">{activeThread.partnerName}</h3>
                  <p className="text-[11px] text-emerald font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" /> Active Consultation
                  </p>
                </div>
              </div>
              <span className="label-caps text-[10px] text-on-surface-variant">Bespoke Client</span>
            </div>

            {/* Quick response chips */}
            <div className="px-4 py-2 bg-surface-low/50 border-b border-outline-variant flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <Sparkles size={12} className="text-burgundy shrink-0" />
              <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider shrink-0">Quick Reply:</span>
              {quickReplies.map((qr) => (
                <button
                  key={qr}
                  onClick={() => handleSendMessage(qr)}
                  className="px-2.5 py-1 bg-white border border-outline-variant hover:border-burgundy text-charcoal text-[11px] whitespace-nowrap rounded-full transition-colors"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-warm-white/40">
              {activeThread.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "me" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-md p-3 rounded-none text-xs leading-relaxed ${
                      m.sender === "me"
                        ? "bg-charcoal text-white"
                        : "bg-white border border-outline-variant text-charcoal shadow-xs"
                    }`}
                  >
                    <p>{m.text}</p>
                  </div>
                  <span className="text-[9px] text-on-surface-variant mt-1 flex items-center gap-1">
                    {m.time} {m.sender === "me" && <CheckCheck size={10} className="text-emerald" />}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 border-t border-outline-variant bg-white shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message or styling guidance..."
                  className="flex-1 bg-surface-low border border-outline-variant px-3 py-2 text-xs focus:outline-none focus:border-charcoal"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="btn-primary py-2 px-4 text-xs disabled:opacity-50"
                >
                  <Send size={13} /> Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <p className="text-on-surface-variant text-sm">Select a client conversation to begin chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};
