import { useState } from "react";
import { Star, MessageSquare, Check, X, Send } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_DESIGNER_REVIEWS, DesignerReviewItem } from "@/constants/dashboardData";

export const DesignerReviews = () => {
  const [reviews, setReviews] = useState<DesignerReviewItem[]>(INITIAL_DESIGNER_REVIEWS);
  const [replyingTo, setReplyingTo] = useState<DesignerReviewItem | null>(null);
  const [replyText, setReplyText] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filtered = reviews.filter((r) => {
    if (ratingFilter === "all") return true;
    return Math.floor(r.rating) === Number(ratingFilter);
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingTo || !replyText.trim()) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === replyingTo.id ? { ...r, reply: replyText.trim() } : r
      )
    );

    toast.success(`Reply posted to ${replyingTo.customerName}'s review`);
    setReplyingTo(null);
    setReplyText("");
  };

  return (
    <div className="p-5 md:p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl text-charcoal">Client Reviews & Testimonials</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Read verified feedback from bespoke clients and publish studio responses.
          </p>
        </div>
        <div className="stat-card py-2 px-4 flex items-center gap-3">
          <div className="text-rose-gold text-2xl font-bold">4.96★</div>
          <div>
            <p className="text-[10px] label-caps text-on-surface-variant">Overall Rating</p>
            <p className="text-xs text-on-surface-variant font-medium">98 verified reviews</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {["all", "5", "4"].map((stars) => (
          <button
            key={stars}
            onClick={() => setRatingFilter(stars)}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              ratingFilter === stars
                ? "bg-charcoal text-white"
                : "bg-white shadow-xs border border-outline-variant text-on-surface-variant hover:text-charcoal"
            }`}
          >
            {stars === "all" ? "All Reviews" : `${stars} Stars`}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.map((rev) => (
          <div key={rev.id} className="bg-white shadow-editorial p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-charcoal text-base">{rev.customerName}</span>
                  <div className="flex text-rose-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < Math.floor(rev.rating) ? "fill-rose-gold text-rose-gold" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-charcoal">{rev.rating}</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Commission: <span className="font-medium text-charcoal">{rev.product}</span> · {rev.date}
                </p>
              </div>

              {!rev.reply && (
                <button
                  onClick={() => {
                    setReplyingTo(rev);
                    setReplyText("");
                  }}
                  className="btn-outline self-start text-[11px] py-1.5 px-3"
                >
                  <MessageSquare size={12} /> Reply to Review
                </button>
              )}
            </div>

            <p className="text-sm text-charcoal leading-relaxed bg-surface-low/30 p-3 italic">
              "{rev.comment}"
            </p>

            {rev.reply && (
              <div className="bg-surface-low p-4 border-l-2 border-burgundy ml-4 space-y-1">
                <p className="label-caps text-[9px] text-burgundy">Studio Response (Suresh Nair):</p>
                <p className="text-xs text-charcoal">{rev.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {replyingTo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-outline-variant">
              <h2 className="font-display text-lg text-charcoal">Reply to {replyingTo.customerName}</h2>
              <button onClick={() => setReplyingTo(null)} className="text-on-surface-variant hover:text-charcoal">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSendReply} className="p-6 space-y-4">
              <div className="bg-surface-low p-3 text-xs italic text-on-surface-variant">
                "{replyingTo.comment}"
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1">Your Official Response *</label>
                <textarea
                  required
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Thank the client and address their feedback..."
                  className="input-editorial w-full text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 text-xs font-semibold text-charcoal hover:bg-surface-low"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  <Send size={12} /> Publish Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
