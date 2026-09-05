import { useState } from "react";
import { Star, MessageSquare, ThumbsUp, Trash2, Plus, CheckCircle2, X, Package } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/constants/data";

interface CustomerReviewItem {
  id: string;
  productName: string;
  brand: string;
  image: string;
  rating: number;
  fitRating: "True to Fit" | "Runs Small" | "Runs Large";
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

interface PendingReviewOrder {
  id: string;
  productName: string;
  brand: string;
  image: string;
  deliveredDate: string;
}

export const CustomerReviews = () => {
  const [activeTab, setActiveTab] = useState<"my-reviews" | "pending">("my-reviews");

  const [reviews, setReviews] = useState<CustomerReviewItem[]>([
    {
      id: "REV-101",
      productName: "Imperial Burgundy Cashmere Trench",
      brand: "Aurelia Couture",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
      rating: 5,
      fitRating: "True to Fit",
      title: "The weight and drape of this cashmere is unmatched",
      comment: "Commissioned this for early autumn travel. The hand-rolled lapels and floating canvas drape impeccably. The burgundy tone has incredible depth under evening lights.",
      date: "Aug 24, 2026",
      verified: true,
    },
    {
      id: "REV-102",
      productName: "Structured Wool-Silk Tuxedo Blazer",
      brand: "Atelier Vesper",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
      rating: 5,
      fitRating: "True to Fit",
      title: "Savile Row precision right down to the inner monogram",
      comment: "The 3D fit scan translated perfectly. Shoulder line is clean without any collar gap. Truly bespoke craftsmanship.",
      date: "Jul 18, 2026",
      verified: true,
    },
  ]);

  const [pendingOrders, setPendingOrders] = useState<PendingReviewOrder[]>([
    {
      id: "ORD-9902",
      productName: "Fluid Silk Palazzo Trousers",
      brand: "Studio Cadence",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e83?w=600&h=800&fit=crop&q=80",
      deliveredDate: "Delivered Aug 29, 2026",
    },
  ]);

  // Modal State
  const [modalOrder, setModalOrder] = useState<PendingReviewOrder | null>(null);
  const [rating, setRating] = useState(5);
  const [fitRating, setFitRating] = useState<CustomerReviewItem["fitRating"]>("True to Fit");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const handleDeleteReview = (id: string, name: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success(`Removed your review for ${name}`);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalOrder || !reviewTitle || !reviewComment) {
      toast.error("Please fill in both a title and your review");
      return;
    }

    const newRev: CustomerReviewItem = {
      id: `REV-${Date.now().toString().slice(-3)}`,
      productName: modalOrder.productName,
      brand: modalOrder.brand,
      image: modalOrder.image,
      rating: rating,
      fitRating: fitRating,
      title: reviewTitle,
      comment: reviewComment,
      date: "Today",
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setPendingOrders((prev) => prev.filter((o) => o.id !== modalOrder.id));
    setModalOrder(null);
    setReviewTitle("");
    setReviewComment("");
    setActiveTab("my-reviews");
    toast.success("Thank you! Your verified atelier review has been published.");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Star className="w-3.5 h-3.5" />
            <span>Verified Atelier Feedback</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">My Reviews & Ratings</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Share your bespoke experience, fit accuracy, and fabric impressions with the Betees client community.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-white p-1 border border-charcoal/10">
          <button
            onClick={() => setActiveTab("my-reviews")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "my-reviews" ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            Published ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "pending" ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            Awaiting Review ({pendingOrders.length})
          </button>
        </div>
      </div>

      {/* Published Reviews Tab */}
      {activeTab === "my-reviews" && (
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-charcoal/10 p-6 flex flex-col md:flex-row gap-6 items-start justify-between"
              >
                <div className="flex gap-4 items-start">
                  <img src={rev.image} alt={rev.productName} className="w-20 h-24 object-cover shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-semibold text-charcoal/50">{rev.brand}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 font-semibold">
                        Verified Purchase
                      </span>
                    </div>
                    <h3 className="font-display text-base font-medium text-charcoal">{rev.productName}</h3>

                    {/* Stars */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? "text-amber-500 fill-amber-500" : "text-charcoal/20"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-charcoal/60 font-mono">Fit: {rev.fitRating}</span>
                      <span className="text-xs text-charcoal/40">• {rev.date}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-charcoal mt-2">{rev.title}</h4>
                    <p className="text-xs text-charcoal/70 leading-relaxed font-serif italic">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteReview(rev.id, rev.productName)}
                  className="text-charcoal/40 hover:text-rose-600 transition-colors p-2"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white border border-charcoal/10 p-12 text-center max-w-md mx-auto space-y-3">
              <Star className="w-10 h-10 text-charcoal/30 mx-auto" />
              <h3 className="font-display text-lg font-medium text-charcoal">No published reviews</h3>
              <p className="text-xs text-charcoal/60">
                You haven't left feedback on any commissions yet. Review recent purchases to earn loyalty points!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Awaiting Review Tab */}
      {activeTab === "pending" && (
        <div className="space-y-4">
          {pendingOrders.length > 0 ? (
            pendingOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white border border-charcoal/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img src={ord.image} alt={ord.productName} className="w-16 h-20 object-cover" />
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-charcoal/50">{ord.brand}</span>
                    <h4 className="font-display text-base font-medium text-charcoal">{ord.productName}</h4>
                    <span className="text-xs text-emerald-700 font-medium block mt-1">{ord.deliveredDate}</span>
                  </div>
                </div>

                <button
                  onClick={() => setModalOrder(ord)}
                  className="bg-burgundy hover:bg-burgundy/90 text-white text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Write Review (+150 Pts)</span>
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white border border-charcoal/10 p-12 text-center max-w-md mx-auto space-y-3">
              <Package className="w-10 h-10 text-charcoal/30 mx-auto" />
              <h3 className="font-display text-lg font-medium text-charcoal">All caught up!</h3>
              <p className="text-xs text-charcoal/60">
                You have reviewed all your delivered couture orders.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Write Review Modal */}
      {modalOrder && (
        <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 md:p-8 space-y-5 border border-charcoal/20">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-burgundy">
                  Couture Feedback
                </span>
                <h3 className="font-display text-xl font-medium text-charcoal">
                  Review {modalOrder.productName}
                </h3>
              </div>
              <button onClick={() => setModalOrder(null)} className="text-charcoal/50 hover:text-charcoal p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? "text-amber-500 fill-amber-500" : "text-charcoal/20"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono ml-2 text-charcoal/60">{rating} out of 5 stars</span>
                </div>
              </div>

              {/* Fit Rating */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1.5">
                  Fit Accuracy
                </label>
                <div className="flex gap-2">
                  {(["Runs Small", "True to Fit", "Runs Large"] as const).map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setFitRating(fit)}
                      className={`flex-1 py-2 text-xs font-semibold border ${
                        fitRating === fit ? "border-charcoal bg-charcoal text-white" : "border-charcoal/20 text-charcoal"
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                  Headline / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masterful hand-stitching and magnificent silk drape"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                  Your Detailed Review
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details about the fabric feel, shoulder construction, and atelier experience..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal/10">
                <button
                  type="button"
                  onClick={() => setModalOrder(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-charcoal/20 text-charcoal/70 hover:border-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-burgundy hover:bg-burgundy/90 text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default CustomerReviews;
