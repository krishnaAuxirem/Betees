import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";

const articles: Record<string, any> = {
  "future-of-personalized-fashion": {
    category: "AI & Fashion",
    title: "The Future of Personalized Fashion",
    excerpt:
      "Discover how artificial intelligence is creating more personalized ways to discover, style, and experience fashion.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop",
    time: "6 min read",
    content: [
      "Fashion has always been personal. What we wear reflects our personality, lifestyle, preferences, and the occasions we experience.",
      "Technology is now making it possible to create a more personalized fashion journey. Instead of showing everyone the same products, intelligent systems can understand preferences, styles, sizes, and wardrobe choices.",
      "AI-powered styling can help users discover outfit combinations, explore colors, find products, and make more confident fashion decisions.",
      "The future of fashion is not simply about buying more. It is about discovering better options that feel more relevant to each individual.",
    ],
  },

  "how-to-build-your-personal-style": {
    category: "Styling",
    title: "How to Build Your Personal Style",
    excerpt:
      "A practical guide to understanding your style preferences and creating looks that feel uniquely yours.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&auto=format&fit=crop",
    time: "5 min read",
    content: [
      "Personal style starts with understanding what you naturally feel comfortable and confident wearing.",
      "Begin by identifying the colors, silhouettes, fabrics, and clothing categories you repeatedly choose.",
      "From there, experiment with combinations and create a small collection of looks that represent your personality.",
      "The goal is not to follow every trend. The goal is to create a wardrobe and style that works for your everyday life.",
    ],
  },

  "smart-wardrobe-guide": {
    category: "Wardrobe",
    title: "A Smarter Approach to Your Wardrobe",
    excerpt:
      "Turn the clothes you already own into a more organized and versatile digital wardrobe.",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&auto=format&fit=crop",
    time: "4 min read",
    content: [
      "A wardrobe can become much more useful when every item is easy to discover and combine.",
      "Digital wardrobe tools allow users to organize clothing into categories, save favorite looks, and explore combinations using existing pieces.",
      "Instead of constantly searching for something new, you can rediscover items you already own and create fresh combinations.",
      "A smarter wardrobe is ultimately about making fashion easier and more intentional.",
    ],
  },

  "fashion-trends-to-watch": {
    category: "Fashion Trends",
    title: "Fashion Trends to Watch",
    excerpt:
      "Explore emerging styles, colors, and fashion directions shaping the season.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop",
    time: "7 min read",
    content: [
      "Fashion constantly evolves through changing colors, silhouettes, materials, and cultural influences.",
      "Understanding trends can help you experiment with new ideas while still maintaining your personal style.",
      "The most useful approach is to take inspiration from trends and adapt them to your own wardrobe.",
      "Trends are most powerful when they become a source of inspiration rather than a rule.",
    ],
  },

  "custom-fashion-experience": {
    category: "Custom Fashion",
    title: "Why Custom Fashion Is Becoming More Personal",
    excerpt:
      "From fabric and fit to colors and details, discover the growing world of personalized clothing.",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&auto=format&fit=crop",
    time: "5 min read",
    content: [
      "Custom fashion gives people the ability to create clothing around their own preferences.",
      "Fabric, color, patterns, fit, collars, sleeves, and measurements can all influence the final garment.",
      "Technology can make this customization process easier by bringing different options together in a guided experience.",
      "Personalization allows fashion to become more closely connected to the person wearing it.",
    ],
  },

  "complete-look-styling-guide": {
    category: "Fashion Tips",
    title: "The Complete Guide to Building a Look",
    excerpt:
      "Learn how to combine clothing, footwear, accessories, colors, and textures into a complete outfit.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop",
    time: "6 min read",
    content: [
      "A complete outfit is about more than choosing individual clothing pieces.",
      "Start with a key item and build around its color, silhouette, and occasion.",
      "Add complementary footwear and accessories while keeping the overall balance of the outfit in mind.",
      "Experiment with combinations and save the looks that work best for you.",
    ],
  },
};

export const BlogDetails = () => {
  const { slug } = useParams();

  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FAFAF9]">
        <div className="text-center">
          <h1 className="font-display text-4xl text-charcoal">
            Article Not Found
          </h1>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-burgundy mt-5"
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-[#FAFAF9]">
      {/* Article Header */}
      <section className="bg-charcoal py-16">
        <div className="section-container max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-10"
          >
            <ArrowLeft size={15} />
            Back to Journal
          </Link>

          <p className="text-[10px] uppercase tracking-[0.18em] text-rose-gold">
            {article.category}
          </p>

          <h1 className="font-display text-4xl md:text-6xl text-white mt-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-gray-400 max-w-2xl leading-relaxed mt-6">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-400 mt-6">
            <Clock3 size={14} />
            {article.time}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="section-container -mt-8">
        <div className="max-w-5xl mx-auto h-[300px] md:h-[520px] overflow-hidden shadow-editorial">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <article className="section-container py-16">
        <div className="max-w-3xl mx-auto">
          {article.content.map((paragraph: string, index: number) => (
            <p
              key={index}
              className="text-on-surface-variant text-base md:text-lg leading-8 mb-7"
            >
              {paragraph}
            </p>
          ))}

          <div className="border-t border-gray-200 mt-12 pt-8 flex justify-between items-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-burgundy"
            >
              <ArrowLeft size={15} />
              More Stories
            </Link>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-burgundy"
            >
              Explore Fashion
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};