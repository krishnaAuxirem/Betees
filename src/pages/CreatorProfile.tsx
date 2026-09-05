import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, Share2, MapPin, ShieldCheck, Sparkles, ShoppingBag, ArrowLeft, Users, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { INITIAL_CREATORS, INITIAL_COMMUNITY_POSTS, CreatorProfileData, CommunityPostItem } from "@/constants/communityData";

export const CreatorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  // Find creator by ID or handle
  const creatorKey = Object.keys(INITIAL_CREATORS).find(
    (k) => k === id || INITIAL_CREATORS[k].handle.replace("@", "") === id || INITIAL_CREATORS[k].name.toLowerCase().replace(/\s+/g, "-") === id
  ) || "mihir-style";

  const creator: CreatorProfileData = INITIAL_CREATORS[creatorKey] || INITIAL_CREATORS["mihir-style"];

  // Local storage state for following
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(creator.followers);
  const [activeTab, setActiveTab] = useState<"posts" | "curated">("posts");

  // Post interactions state
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedFollows = JSON.parse(localStorage.getItem("betees_followed_creators") || "[]");
      const following = storedFollows.includes(creator.handle);
      setIsFollowing(following);
      setFollowerCount(creator.followers + (following ? 1 : 0));

      const storedLikes = JSON.parse(localStorage.getItem("betees_liked_posts") || "[]");
      setLikedPosts(storedLikes);

      const storedSaves = JSON.parse(localStorage.getItem("betees_saved_posts") || "[]");
      setSavedPosts(storedSaves);
    } catch (e) {
      console.error(e);
    }
  }, [creator]);

  const handleFollowToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to follow creators");
      navigate("/login");
      return;
    }

    try {
      const storedFollows = JSON.parse(localStorage.getItem("betees_followed_creators") || "[]");
      let updated: string[];

      if (isFollowing) {
        updated = storedFollows.filter((h: string) => h !== creator.handle);
        setIsFollowing(false);
        setFollowerCount((prev) => Math.max(0, prev - 1));
        toast.info(`Unfollowed ${creator.handle}`);
      } else {
        updated = [...storedFollows, creator.handle];
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
        toast.success(`You are now following ${creator.handle}`);
      }

      localStorage.setItem("betees_followed_creators", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleLike = (postId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to like looks");
      navigate("/login");
      return;
    }

    const isLiked = likedPosts.includes(postId);
    const updated = isLiked ? likedPosts.filter((x) => x !== postId) : [...likedPosts, postId];
    setLikedPosts(updated);
    localStorage.setItem("betees_liked_posts", JSON.stringify(updated));
    toast.success(isLiked ? "Removed from your favorites" : "Added to your favorites");
  };

  const handleToggleSave = (postId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to save looks");
      navigate("/login");
      return;
    }

    const isSaved = savedPosts.includes(postId);
    const updated = isSaved ? savedPosts.filter((x) => x !== postId) : [...savedPosts, postId];
    setSavedPosts(updated);
    localStorage.setItem("betees_saved_posts", JSON.stringify(updated));
    toast.success(isSaved ? "Removed from saved looks" : "Look saved to your vault");
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      toast.success(`Creator profile link copied!`);
    } else {
      toast.success("Profile link copied to clipboard");
    }
  };

  // Creator's posts
  const creatorPosts = INITIAL_COMMUNITY_POSTS.filter((p) => p.creatorId === creator.id || p.handle === creator.handle);
  // Fallback to all if creator has none
  const displayedPosts = creatorPosts.length > 0 ? creatorPosts : INITIAL_COMMUNITY_POSTS.slice(0, 3);

  return (
    <div className="animate-fade-in bg-[#FAFAF9] min-h-screen">
      {/* Cover Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-charcoal">
        <img
          src={creator.coverImage}
          alt={creator.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="absolute top-6 left-6">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs uppercase tracking-wider font-semibold transition-colors border border-white/20"
          >
            <ArrowLeft size={14} />
            Back to Community
          </Link>
        </div>
      </div>

      {/* Profile Header Box */}
      <div className="section-container relative -mt-24 z-10 pb-8">
        <div className="bg-white border border-charcoal/10 shadow-editorial p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-md"
                />
                {creator.verified && (
                  <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-burgundy text-white flex items-center justify-center shadow" title="Verified Fashion Patron">
                    <ShieldCheck size={14} />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl md:text-3xl font-medium text-charcoal">{creator.name}</h1>
                  <span className="text-[10px] uppercase font-semibold bg-warm-white border border-charcoal/15 px-2 py-0.5 text-burgundy">
                    {creator.specialty}
                  </span>
                </div>
                <p className="text-sm font-mono text-on-surface-variant">{creator.handle}</p>
                <div className="flex items-center gap-2 text-xs text-charcoal/60 pt-1">
                  <MapPin size={13} className="text-charcoal/40" />
                  <span>{creator.location}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons & Metrics */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={handleFollowToggle}
                className={`px-6 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all border ${
                  isFollowing
                    ? "border-charcoal bg-charcoal text-white hover:bg-charcoal/80"
                    : "border-burgundy bg-burgundy text-white hover:bg-burgundy/90"
                }`}
              >
                {isFollowing ? "Following" : "+ Follow"}
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-2.5 border border-charcoal/20 hover:border-charcoal text-charcoal text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5"
                title="Share profile"
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 pt-6 border-t border-charcoal/10 max-w-3xl">
            <p className="text-sm text-charcoal/80 leading-relaxed font-serif">
              "{creator.bio}"
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 pt-6 border-t border-charcoal/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-warm-white border border-charcoal/5">
              <span className="font-display text-xl md:text-2xl text-charcoal font-medium">
                {followerCount.toLocaleString()}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-charcoal/50 block mt-0.5">Followers</span>
            </div>
            <div className="p-3 bg-warm-white border border-charcoal/5">
              <span className="font-display text-xl md:text-2xl text-charcoal font-medium">
                {creator.following.toLocaleString()}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-charcoal/50 block mt-0.5">Following</span>
            </div>
            <div className="p-3 bg-warm-white border border-charcoal/5">
              <span className="font-display text-xl md:text-2xl text-charcoal font-medium">
                {displayedPosts.length}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-charcoal/50 block mt-0.5">Runway Looks</span>
            </div>
            <div className="p-3 bg-warm-white border border-charcoal/5">
              <span className="font-display text-xl md:text-2xl text-charcoal font-medium">
                {creator.collaborationsCount}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-charcoal/50 block mt-0.5">Atelier Collabs</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex items-center gap-4 border-b border-charcoal/10 pb-3">
          <button
            onClick={() => setActiveTab("posts")}
            className={`text-xs uppercase tracking-wider font-semibold pb-2 transition-all border-b-2 ${
              activeTab === "posts"
                ? "border-burgundy text-burgundy"
                : "border-transparent text-charcoal/50 hover:text-charcoal"
            }`}
          >
            Curated Looks ({displayedPosts.length})
          </button>
          <button
            onClick={() => setActiveTab("curated")}
            className={`text-xs uppercase tracking-wider font-semibold pb-2 transition-all border-b-2 ${
              activeTab === "curated"
                ? "border-burgundy text-burgundy"
                : "border-transparent text-charcoal/50 hover:text-charcoal"
            }`}
          >
            Saved Haute Couture (12)
          </button>
        </div>

        {/* Posts Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            const isSaved = savedPosts.includes(post.id);

            return (
              <div key={post.id} className="bg-white border border-charcoal/10 shadow-editorial group flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/5] overflow-hidden bg-surface-low relative">
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 bg-charcoal/80 text-white text-[10px] uppercase font-mono px-2 py-0.5">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${
                          isLiked ? "text-burgundy font-semibold" : "text-charcoal/60 hover:text-burgundy"
                        }`}
                      >
                        <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                        <span>{post.likes + (isLiked ? 1 : 0)}</span>
                      </button>

                      <div className="flex items-center gap-1.5 text-xs text-charcoal/60">
                        <MessageCircle size={16} />
                        <span>{post.comments}</span>
                      </div>

                      <div className="ml-auto flex gap-2">
                        <button
                          onClick={() => handleToggleSave(post.id)}
                          className={`transition-colors ${isSaved ? "text-burgundy" : "text-charcoal/50 hover:text-charcoal"}`}
                          title="Save look"
                        >
                          <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-charcoal/80 leading-relaxed font-serif line-clamp-2">
                      {post.caption}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-burgundy font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    to={`/product/${post.productId}`}
                    className="w-full py-2 bg-surface-low hover:bg-charcoal hover:text-white text-charcoal text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={13} />
                    <span>Shop This Look (₹{post.productPrice.toLocaleString("en-IN")})</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default CreatorProfile;
