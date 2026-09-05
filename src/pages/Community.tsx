import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  TrendingUp,
  Search,
  X,
  Copy,
  Send,
  Sparkles,
  ShoppingBag,
  Check,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import {
  INITIAL_COMMUNITY_POSTS,
  CommunityPostItem,
  CommentItem,
} from "@/constants/communityData";

export const Community = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  // State
  const [posts, setPosts] = useState<CommunityPostItem[]>(INITIAL_COMMUNITY_POSTS);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);

  // Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeHashtag, setActiveHashtag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [activeCommentPost, setActiveCommentPost] = useState<CommunityPostItem | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [activeSharePost, setActiveSharePost] = useState<CommunityPostItem | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedLikes = JSON.parse(localStorage.getItem("betees_liked_posts") || "[]");
      setLikedPosts(storedLikes);

      const storedSaves = JSON.parse(localStorage.getItem("betees_saved_posts") || "[]");
      setSavedPosts(storedSaves);

      const storedFollows = JSON.parse(localStorage.getItem("betees_followed_creators") || "[]");
      setFollowedCreators(storedFollows);

      const storedComments = JSON.parse(localStorage.getItem("betees_post_comments") || "{}");
      if (storedComments && Object.keys(storedComments).length > 0) {
        setPosts((prev) =>
          prev.map((p) => {
            if (storedComments[p.id]) {
              return {
                ...p,
                commentsList: [...p.commentsList, ...storedComments[p.id]],
                comments: p.comments + storedComments[p.id].length,
              };
            }
            return p;
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Require Auth Helper
  const requireAuth = (actionName: string): boolean => {
    if (!isAuthenticated) {
      toast.error(`Please log in to ${actionName}`);
      navigate("/login");
      return false;
    }
    return true;
  };

  // 1. LIKE FUNCTIONALITY
  const handleToggleLike = (postId: string) => {
    if (!requireAuth("like looks")) return;

    const isLiked = likedPosts.includes(postId);
    const updated = isLiked
      ? likedPosts.filter((x) => x !== postId)
      : [...likedPosts, postId];

    setLikedPosts(updated);
    localStorage.setItem("betees_liked_posts", JSON.stringify(updated));

    if (isLiked) {
      toast.info("Removed from your favorites");
    } else {
      toast.success("Added to your favorites");
    }
  };

  // 2. SAVE FUNCTIONALITY
  const handleToggleSave = (postId: string) => {
    if (!requireAuth("save looks")) return;

    const isSaved = savedPosts.includes(postId);
    const updated = isSaved
      ? savedPosts.filter((x) => x !== postId)
      : [...savedPosts, postId];

    setSavedPosts(updated);
    localStorage.setItem("betees_saved_posts", JSON.stringify(updated));

    if (isSaved) {
      toast.info("Removed from saved looks");
    } else {
      toast.success("Look saved to your collection");
    }
  };

  // 3. FOLLOW FUNCTIONALITY
  const handleToggleFollow = (handle: string) => {
    if (!requireAuth(`follow ${handle}`)) return;

    const isFollowing = followedCreators.includes(handle);
    const updated = isFollowing
      ? followedCreators.filter((h) => h !== handle)
      : [...followedCreators, handle];

    setFollowedCreators(updated);
    localStorage.setItem("betees_followed_creators", JSON.stringify(updated));

    if (isFollowing) {
      toast.info(`Unfollowed ${handle}`);
    } else {
      toast.success(`You are now following ${handle}`);
    }
  };

  // 4. COMMENT SUBMIT
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCommentPost || !newCommentText.trim()) return;
    if (!requireAuth("post comments")) return;

    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      userName: user?.name || "Client Patron",
      avatar:
        user?.role === "designer"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop"
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop",
      text: newCommentText.trim(),
      time: "Just now",
    };

    // Update posts state
    setPosts((prev) =>
      prev.map((p) =>
        p.id === activeCommentPost.id
          ? {
              ...p,
              comments: p.comments + 1,
              commentsList: [...p.commentsList, newComment],
            }
          : p
      )
    );

    // Update active modal post
    setActiveCommentPost((prev) =>
      prev
        ? {
            ...prev,
            comments: prev.comments + 1,
            commentsList: [...prev.commentsList, newComment],
          }
        : null
    );

    // Persist to localStorage
    try {
      const storedComments = JSON.parse(
        localStorage.getItem("betees_post_comments") || "{}"
      );
      const postComments = storedComments[activeCommentPost.id] || [];
      storedComments[activeCommentPost.id] = [...postComments, newComment];
      localStorage.setItem(
        "betees_post_comments",
        JSON.stringify(storedComments)
      );
    } catch (err) {
      console.error(err);
    }

    setNewCommentText("");
    toast.success("Comment added");
  };

  // 5. SHARE FUNCTIONALITY
  const handleCopyLink = (post: CommunityPostItem) => {
    const postUrl = `${window.location.origin}/creator/${post.creatorId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postUrl);
    }
    toast.success("Look link copied!");
    setActiveSharePost(null);
  };

  const handleSocialShare = (platform: string, post: CommunityPostItem) => {
    const postUrl = `${window.location.origin}/creator/${post.creatorId}`;
    if (platform === "Instagram") {
      navigator.clipboard?.writeText(postUrl);
      toast.success("Look link copied for Instagram story / bio!");
    } else if (platform === "Twitter") {
      const text = encodeURIComponent(`Admiring this look by ${post.user} on Betees Haute Couture!`);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(postUrl)}`, "_blank");
      toast.success("Sharing to X / Twitter...");
    } else if (platform === "Facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, "_blank");
      toast.success("Sharing to Facebook...");
    } else if (navigator.share) {
      navigator.share({
        title: `Look by ${post.user} on Betees`,
        text: post.caption,
        url: postUrl,
      }).catch(() => {});
    }
    setActiveSharePost(null);
  };

  // Filter Posts
  const filteredPosts = posts.filter((post) => {
    // Category filter
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    // Hashtag filter
    const matchesHashtag =
      !activeHashtag || post.tags.includes(activeHashtag);

    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      post.user.toLowerCase().includes(q) ||
      post.handle.toLowerCase().includes(q) ||
      post.caption.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesHashtag && matchesSearch;
  });

  const categories = ["All", "AI Curated", "Bridal", "Menswear", "Ethnic", "Street"];

  const trendingHashtags = [
    "#BeteesStyle",
    "#AICouture",
    "#BeteesWedding",
    "#EditorialFashion",
    "#BespokeFashion",
    "#IndianCouture",
    "#AIFashion",
    "#ZeroWasteStyle",
  ];

  return (
    <div className="animate-fade-in bg-[#FAFAF9]">
      {/* Header */}
      <div className="bg-charcoal py-12">
        <div className="section-container text-center space-y-3">
          <p className="label-caps text-[10px] text-rose-gold">Community Runway</p>
          <h1 className="font-display text-4xl text-white">Style Stories</h1>
          <p className="text-gray-400 max-w-lg mx-auto">Real people. Real style. Powered by Betees AI.</p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search looks, creators, hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-rose-gold rounded-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {categories.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedCategory(tag);
                  setActiveHashtag(null);
                }}
                className={`px-3 py-1.5 text-xs font-semibold border transition-all uppercase tracking-wide ${
                  selectedCategory === tag && !activeHashtag
                    ? "bg-white text-charcoal border-white"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Active Filter Indicator */}
          {(activeHashtag || searchQuery || selectedCategory !== "All") && (
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-rose-gold">
              <span>
                Filtering:{" "}
                <strong className="text-white">
                  {activeHashtag || (searchQuery ? `"${searchQuery}"` : selectedCategory)}
                </strong>
              </span>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setActiveHashtag(null);
                  setSearchQuery("");
                }}
                className="underline hover:text-white text-[11px] uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Feed */}
      <div className="section-container py-10">
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => {
              const isLiked = likedPosts.includes(post.id);
              const isSaved = savedPosts.includes(post.id);
              const isFollowing = followedCreators.includes(post.handle);
              const displayLikes = post.likes + (isLiked ? 1 : 0);

              return (
                <div key={post.id} className="bg-white shadow-editorial flex flex-col justify-between group">
                  <div>
                    {/* User Header */}
                    <div className="p-3 flex items-center justify-between gap-2 border-b border-charcoal/5">
                      <Link
                        to={`/creator/${post.creatorId}`}
                        className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={post.avatar}
                          alt={post.user}
                          className="w-9 h-9 object-cover rounded-full shrink-0 border border-charcoal/10"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-charcoal truncate hover:text-burgundy transition-colors">
                            {post.user}
                          </p>
                          <p className="text-xs text-on-surface-variant truncate font-mono">
                            {post.handle}
                          </p>
                        </div>
                      </Link>

                      <button
                        onClick={() => handleToggleFollow(post.handle)}
                        className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 border transition-all shrink-0 ${
                          isFollowing
                            ? "border-charcoal/20 bg-charcoal/5 text-charcoal/70 hover:border-charcoal"
                            : "border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
                        }`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>

                    {/* Image */}
                    <div className="aspect-[4/5] overflow-hidden bg-surface-low relative">
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-2 left-2 bg-charcoal/80 text-white text-[9px] uppercase font-mono px-2 py-0.5 tracking-wider">
                        {post.category}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="p-3 space-y-2">
                      <div className="flex items-center gap-3">
                        {/* Like Button */}
                        <button
                          onClick={() => handleToggleLike(post.id)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            isLiked
                              ? "text-burgundy font-semibold"
                              : "text-on-surface-variant hover:text-burgundy"
                          }`}
                          title={isLiked ? "Unlike" : "Like"}
                        >
                          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                          <span>{displayLikes}</span>
                        </button>

                        {/* Comment Button */}
                        <button
                          onClick={() => setActiveCommentPost(post)}
                          className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-charcoal transition-colors"
                          title="View & Add Comments"
                        >
                          <MessageCircle size={16} />
                          <span>{post.comments}</span>
                        </button>

                        {/* Bookmark & Share Buttons */}
                        <div className="ml-auto flex gap-2">
                          <button
                            onClick={() => handleToggleSave(post.id)}
                            className={`transition-colors ${
                              isSaved
                                ? "text-burgundy"
                                : "text-on-surface-variant hover:text-charcoal"
                            }`}
                            title={isSaved ? "Saved" : "Save look"}
                          >
                            <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                          </button>

                          <button
                            onClick={() => setActiveSharePost(post)}
                            className="text-on-surface-variant hover:text-charcoal transition-colors"
                            title="Share look"
                          >
                            <Share2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Caption */}
                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                        {post.caption}
                      </p>

                      {/* Hashtags */}
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={() => {
                              setActiveHashtag(tag);
                              setSelectedCategory("All");
                            }}
                            className={`text-[10px] cursor-pointer hover:underline ${
                              activeHashtag === tag
                                ? "font-bold text-burgundy underline"
                                : "text-burgundy"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Functional "Shop This Look" Button */}
                  <div className="p-3 pt-0">
                    <Link
                      to={`/product/${post.productId}`}
                      className="w-full py-2 bg-surface-low text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-charcoal hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag size={12} />
                      <span>Shop This Look</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-charcoal/10 p-12 text-center max-w-md mx-auto space-y-3">
            <Sparkles className="w-10 h-10 text-charcoal/30 mx-auto" />
            <h3 className="font-display text-xl font-medium text-charcoal">No looks found</h3>
            <p className="text-xs text-charcoal/60">
              No community looks matched your search or hashtag filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setActiveHashtag(null);
                setSearchQuery("");
              }}
              className="mt-2 inline-flex items-center px-4 py-2 bg-charcoal text-white text-xs uppercase tracking-wider font-semibold hover:bg-burgundy transition-colors"
            >
              Show All Posts
            </button>
          </div>
        )}

        {/* Trending Hashtags Section */}
        <div className="mt-12 bg-surface-low border border-outline-variant p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-burgundy" />
              <h3 className="font-display text-lg text-charcoal">Trending Now</h3>
            </div>
            {activeHashtag && (
              <button
                onClick={() => setActiveHashtag(null)}
                className="text-xs text-burgundy hover:underline font-semibold"
              >
                Clear Tag Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingHashtags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveHashtag(activeHashtag === tag ? null : tag);
                  setSelectedCategory("All");
                }}
                className={`px-3 py-1.5 border text-sm transition-all ${
                  activeHashtag === tag
                    ? "bg-burgundy text-white border-burgundy shadow-sm"
                    : "bg-white border-outline-variant text-burgundy hover:bg-secondary-container/30"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* COMMENT MODAL */}
      {activeCommentPost && (
        <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 space-y-4 border border-charcoal/20 shadow-2xl animate-in fade-in flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} className="text-burgundy" />
                <h3 className="font-display text-lg text-charcoal">
                  Comments ({activeCommentPost.comments})
                </h3>
              </div>
              <button
                onClick={() => setActiveCommentPost(null)}
                className="text-charcoal/50 hover:text-charcoal p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Post Summary */}
            <div className="flex gap-3 p-2 bg-warm-white border border-charcoal/5 items-center">
              <img
                src={activeCommentPost.image}
                alt=""
                className="w-12 h-14 object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-charcoal">{activeCommentPost.user}</p>
                <p className="text-[11px] text-charcoal/70 truncate">{activeCommentPost.caption}</p>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {activeCommentPost.commentsList.length > 0 ? (
                activeCommentPost.commentsList.map((comm) => (
                  <div key={comm.id} className="flex items-start gap-3 p-2.5 bg-surface-low border border-charcoal/5">
                    <img
                      src={comm.avatar}
                      alt={comm.userName}
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-charcoal">{comm.userName}</span>
                        <span className="text-[10px] text-charcoal/40 font-mono">{comm.time}</span>
                      </div>
                      <p className="text-xs text-charcoal/80 mt-1 leading-relaxed">{comm.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-charcoal/50 py-6">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="pt-2 border-t border-charcoal/10 flex gap-2">
              <input
                type="text"
                placeholder="Share your perspective on this look..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-charcoal/20 focus:border-burgundy focus:outline-none bg-white"
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="bg-burgundy hover:bg-burgundy/90 disabled:opacity-40 text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
              >
                <span>Send</span>
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SHARE MODAL */}
      {activeSharePost && (
        <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 space-y-4 border border-charcoal/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
              <div className="flex items-center gap-2">
                <Share2 size={16} className="text-burgundy" />
                <h3 className="font-display text-base text-charcoal">Share Style Story</h3>
              </div>
              <button
                onClick={() => setActiveSharePost(null)}
                className="text-charcoal/50 hover:text-charcoal p-1"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-charcoal/70">
              Share {activeSharePost.user}'s look across your social circles:
            </p>

            <div className="space-y-2">
              <button
                onClick={() => handleCopyLink(activeSharePost)}
                className="w-full flex items-center justify-between p-3 border border-charcoal/15 hover:border-burgundy hover:bg-burgundy/5 text-xs text-charcoal transition-all"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Copy size={14} className="text-burgundy" />
                  Copy Look Link
                </span>
                <span className="text-[10px] text-charcoal/40 uppercase">Clipboard</span>
              </button>

              <button
                onClick={() => handleSocialShare("Instagram", activeSharePost)}
                className="w-full flex items-center justify-between p-3 border border-charcoal/15 hover:border-burgundy hover:bg-burgundy/5 text-xs text-charcoal transition-all"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Instagram size={14} className="text-pink-600" />
                  Share to Instagram Story
                </span>
                <span className="text-[10px] text-charcoal/40 uppercase">Copy link</span>
              </button>

              <button
                onClick={() => handleSocialShare("Twitter", activeSharePost)}
                className="w-full flex items-center justify-between p-3 border border-charcoal/15 hover:border-burgundy hover:bg-burgundy/5 text-xs text-charcoal transition-all"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Twitter size={14} className="text-sky-500" />
                  Share to X / Twitter
                </span>
                <span className="text-[10px] text-charcoal/40 uppercase">Post</span>
              </button>

              <button
                onClick={() => handleSocialShare("Facebook", activeSharePost)}
                className="w-full flex items-center justify-between p-3 border border-charcoal/15 hover:border-burgundy hover:bg-burgundy/5 text-xs text-charcoal transition-all"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Facebook size={14} className="text-blue-600" />
                  Share to Facebook
                </span>
                <span className="text-[10px] text-charcoal/40 uppercase">Post</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Community;
