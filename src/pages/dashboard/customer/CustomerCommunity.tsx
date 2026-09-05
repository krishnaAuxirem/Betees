import { useState } from "react";
import { Users, Heart, MessageCircle, Share2, Image as ImageIcon, Send, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  occasion: string;
  atelierTag: string;
  likes: number;
  isLiked?: boolean;
  comments: { id: string; author: string; text: string; time: string }[];
  isFollowing?: boolean;
}

export const CustomerCommunity = () => {
  const { user } = useAuthStore();

  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "post-1",
      authorName: "Kavita Singhania",
      authorRole: "Private Client • Mumbai",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&q=80",
      timeAgo: "2 hours ago",
      content: "The hand-rolled lapels on this Aurelia cashmere trench are truly a work of art. Paired it with fluid silk trousers for the autumn opening gala at NMACC.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=80",
      occasion: "Opening Gala",
      atelierTag: "@AureliaCouture",
      likes: 142,
      comments: [
        { id: "c1", author: "Arjun Kapoor", text: "Impeccable silhouette drape, Kavita!", time: "1 hr ago" },
      ],
      isFollowing: true,
    },
    {
      id: "post-2",
      authorName: "Vikramaditya Roy",
      authorRole: "Connoisseur • New Delhi",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
      timeAgo: "5 hours ago",
      content: "First bespoke tuxedo fitting with master tailor Suresh Nair. The floating horsehair canvas construction is noticeably superior to fused blazers.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
      occasion: "Atelier Fitting",
      atelierTag: "@AtelierVesper",
      likes: 98,
      comments: [],
      isFollowing: false,
    },
  ]);

  // New post state
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostOccasion, setNewPostOccasion] = useState("Evening Cocktail");
  const [newPostTag, setNewPostTag] = useState("@AureliaCouture");
  const [newPostImage, setNewPostImage] = useState(
    "https://images.unsplash.com/photo-1575886876069-f50e42e55c75?w=600&h=800&fit=crop&q=80"
  );
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) {
      toast.error("Please enter a caption for your look");
      return;
    }

    const created: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user?.name || "Priya Sharma",
      authorRole: "Sovereign Black Member",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&q=80",
      timeAgo: "Just now",
      content: newPostContent,
      image: newPostImage,
      occasion: newPostOccasion,
      atelierTag: newPostTag,
      likes: 1,
      comments: [],
      isFollowing: false,
    };

    setPosts([created, ...posts]);
    setNewPostContent("");
    toast.success("Your bespoke styling post is live in the community!");
  };

  const handleLikePost = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked }
          : p
      )
    );
  };

  const handleFollowToggle = (id: string, name: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFollowing: !p.isFollowing } : p))
    );
    toast.success(`Updated connection with ${name}`);
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: `comm-${Date.now()}`,
                  author: user?.name || "Priya Sharma",
                  text: commentText,
                  time: "Just now",
                },
              ],
            }
          : p
      )
    );

    setCommentText("");
    toast.success("Comment posted");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Private Client Society</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">Community Style Club</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Connect with luxury patrons, share styling impressions, and celebrate master craft.
          </p>
        </div>
      </div>

      {/* Share Look Card */}
      <div className="bg-white border border-charcoal/10 p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-burgundy text-white flex items-center justify-center font-bold">
            {user?.name?.[0] || "P"}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-charcoal">Share Your Haute Couture Look</h3>
            <span className="text-[11px] text-charcoal/50">Inspire fellow members with your styling choices</span>
          </div>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-3">
          <textarea
            rows={3}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Describe the occasion, how the tailoring felt, or styling pairings..."
            className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-1">
                Occasion / Dress Code
              </label>
              <select
                value={newPostOccasion}
                onChange={(e) => setNewPostOccasion(e.target.value)}
                className="w-full px-3 py-1.5 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
              >
                <option value="Evening Cocktail">Evening Cocktail</option>
                <option value="Opening Gala">Opening Gala</option>
                <option value="Royal Wedding Reception">Royal Wedding Reception</option>
                <option value="Atelier Fitting">Atelier Fitting</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-1">
                Atelier Tag
              </label>
              <input
                type="text"
                value={newPostTag}
                onChange={(e) => setNewPostTag(e.target.value)}
                className="w-full px-3 py-1.5 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-charcoal/10">
            <span className="text-[11px] text-charcoal/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-burgundy" />
              <span>Earn 100 reward points upon community engagement</span>
            </span>
            <button
              type="submit"
              className="bg-burgundy hover:bg-burgundy/90 text-white text-xs uppercase tracking-wider font-semibold px-6 py-2 transition-colors"
            >
              Post Look
            </button>
          </div>
        </form>
      </div>

      {/* Community Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-charcoal/10 overflow-hidden">
            {/* Post Author */}
            <div className="p-4 border-b border-charcoal/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-charcoal/10"
                />
                <div>
                  <h4 className="text-sm font-semibold text-charcoal">{post.authorName}</h4>
                  <span className="text-[10px] text-charcoal/50 font-mono">
                    {post.authorRole} • {post.timeAgo}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleFollowToggle(post.id, post.authorName)}
                className={`text-xs uppercase tracking-wider font-semibold px-3 py-1 border transition-all ${
                  post.isFollowing
                    ? "border-charcoal/20 text-charcoal/60 hover:border-charcoal"
                    : "border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
                }`}
              >
                {post.isFollowing ? "Connected" : "+ Connect"}
              </button>
            </div>

            {/* Post Media */}
            {post.image && (
              <div className="aspect-[16/10] bg-charcoal/5 overflow-hidden">
                <img src={post.image} alt="Look" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Post Body */}
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-semibold bg-warm-white border border-charcoal/10 px-2 py-0.5 text-charcoal/70">
                  {post.occasion}
                </span>
                <span className="text-xs font-semibold text-burgundy">{post.atelierTag}</span>
              </div>

              <p className="text-xs text-charcoal/80 leading-relaxed font-serif">"{post.content}"</p>

              {/* Action Buttons */}
              <div className="flex items-center gap-6 pt-3 border-t border-charcoal/10 text-xs text-charcoal/60">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.isLiked ? "text-burgundy font-semibold" : "hover:text-charcoal"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? "fill-burgundy text-burgundy" : ""}`} />
                  <span>{post.likes} Appreciations</span>
                </button>

                <button
                  onClick={() =>
                    setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1.5 hover:text-charcoal transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments.length} Comments</span>
                </button>
              </div>

              {/* Comment Thread */}
              {activeCommentPostId === post.id && (
                <div className="pt-4 border-t border-charcoal/10 space-y-3">
                  {post.comments.map((c) => (
                    <div key={c.id} className="bg-warm-white p-3 border border-charcoal/5 text-xs space-y-1">
                      <div className="flex justify-between text-charcoal/50 text-[10px]">
                        <span className="font-semibold text-charcoal">{c.author}</span>
                        <span>{c.time}</span>
                      </div>
                      <p className="text-charcoal/80">{c.text}</p>
                    </div>
                  ))}

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-charcoal hover:bg-burgundy text-white px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CustomerCommunity;
