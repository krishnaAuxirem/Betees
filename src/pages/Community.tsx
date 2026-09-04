import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, TrendingUp } from "lucide-react";
import { COMMUNITY_POSTS } from "@/constants/data";
import { Link } from "react-router-dom";

export const Community = () => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-charcoal py-12">
        <div className="section-container text-center space-y-3">
          <p className="label-caps text-[10px] text-rose-gold">Community Runway</p>
          <h1 className="font-display text-4xl text-white">Style Stories</h1>
          <p className="text-gray-400 max-w-lg mx-auto">Real people. Real style. Powered by Betees AI.</p>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {["All", "AI Curated", "Bridal", "Menswear", "Ethnic", "Street"].map((tag) => (
              <button key={tag} className="px-3 py-1.5 text-xs font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors uppercase tracking-wide">{tag}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="section-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMMUNITY_POSTS.map((post) => (
            <div key={post.id} className="bg-white shadow-editorial">
              {/* User Header */}
              <div className="p-3 flex items-center gap-2">
                <img src={post.avatar} alt={post.user} className="w-9 h-9 object-cover rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-charcoal">{post.user}</p>
                  <p className="text-xs text-on-surface-variant">{post.handle}</p>
                </div>
              </div>
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden bg-surface-low">
                <img src={post.image} alt={post.caption} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              {/* Actions */}
              <div className="p-3 space-y-2">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1 text-sm transition-colors ${likedPosts.includes(post.id) ? "text-burgundy" : "text-on-surface-variant hover:text-burgundy"}`}>
                    <Heart size={16} fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-charcoal transition-colors">
                    <MessageCircle size={16} /> {post.comments}
                  </button>
                  <div className="ml-auto flex gap-2">
                    <button className="text-on-surface-variant hover:text-charcoal transition-colors"><Bookmark size={16} /></button>
                    <button className="text-on-surface-variant hover:text-charcoal transition-colors"><Share2 size={16} /></button>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">{post.caption}</p>
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-burgundy hover:underline cursor-pointer">{tag}</span>
                  ))}
                </div>
                <button className="w-full py-1.5 bg-surface-low text-charcoal text-xs font-semibold uppercase tracking-wider hover:bg-charcoal hover:text-white transition-colors">
                  Shop This Look
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Hashtags */}
        <div className="mt-12 bg-surface-low border border-outline-variant p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-burgundy" />
            <h3 className="font-display text-lg text-charcoal">Trending Now</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["#BeteesStyle", "#AICouture", "#BeteesWedding", "#EditorialFashion", "#BespokeFashion", "#IndianCouture", "#AIFashion", "#ZeroWasteStyle"].map((tag) => (
              <button key={tag} className="px-3 py-1.5 bg-white border border-outline-variant text-sm text-burgundy hover:bg-secondary-container/30 transition-colors">{tag}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
