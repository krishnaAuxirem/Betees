import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const categories = [
  "All",
  "Fashion Trends",
  "AI & Fashion",
  "Styling",
  "Wardrobe",
  "Custom Fashion",
  "Designer Stories",
  "Fashion Tips",
];

const articles = [
  {
    slug: "future-of-personalized-fashion",
    category: "AI & Fashion",
    title: "The Future of Personalized Fashion",
    excerpt:
      "Discover how artificial intelligence is creating more personalized ways to discover, style, and experience fashion.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop",
    time: "6 min read",
    featured: true,
  },
  {
    slug: "how-to-build-your-personal-style",
    category: "Styling",
    title: "How to Build Your Personal Style",
    excerpt:
      "A practical guide to understanding your style preferences and creating looks that feel uniquely yours.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&auto=format&fit=crop",
    time: "5 min read",
  },
  {
    slug: "smart-wardrobe-guide",
    category: "Wardrobe",
    title: "A Smarter Approach to Your Wardrobe",
    excerpt:
      "Turn the clothes you already own into a more organized and versatile digital wardrobe.",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=700&auto=format&fit=crop",
    time: "4 min read",
  },
  {
    slug: "fashion-trends-to-watch",
    category: "Fashion Trends",
    title: "Fashion Trends to Watch",
    excerpt:
      "Explore emerging styles, colors, and fashion directions shaping the season.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=700&auto=format&fit=crop",
    time: "7 min read",
  },
  {
    slug: "custom-fashion-experience",
    category: "Custom Fashion",
    title: "Why Custom Fashion Is Becoming More Personal",
    excerpt:
      "From fabric and fit to colors and details, discover the growing world of personalized clothing.",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&auto=format&fit=crop",
    time: "5 min read",
  },
  {
    slug: "complete-look-styling-guide",
    category: "Fashion Tips",
    title: "The Complete Guide to Building a Look",
    excerpt:
      "Learn how to combine clothing, footwear, accessories, colors, and textures into a complete outfit.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&auto=format&fit=crop",
    time: "6 min read",
  },
];

export const Blog = () => {
  const featured = articles.find((article) => article.featured);
  const latest = articles.filter((article) => !article.featured);

  return (
    <div className="animate-fade-in bg-[#FAFAF9]">
      {/* Hero */}
      <section className="bg-charcoal py-20">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="label-caps text-[10px] text-rose-gold mb-4">
              BETEES JOURNAL
            </p>

            <h1 className="font-display text-5xl md:text-6xl text-white leading-tight">
              Fashion,
              <br />
              <span className="italic text-rose-gold">
                thoughtfully explored.
              </span>
            </h1>

            <p className="text-gray-400 max-w-2xl mt-6 leading-relaxed">
              Explore fashion trends, styling ideas, AI-powered fashion,
              wardrobe inspiration, and stories from the world of Betees.
            </p>
          </div>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="section-container pt-10">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white border border-gray-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-burgundy"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-2 text-xs ${
                  index === 0
                    ? "bg-burgundy text-white"
                    : "bg-white text-charcoal border border-gray-200 hover:border-burgundy hover:text-burgundy"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="section-container py-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-burgundy" />
            <p className="label-caps text-[10px] text-burgundy">
              Featured Story
            </p>
          </div>

          <Link
            to={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 bg-white overflow-hidden shadow-editorial"
          >
            <div className="h-[320px] lg:h-[440px] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.18em] text-burgundy font-medium">
                {featured.category}
              </span>

              <h2 className="font-display text-3xl lg:text-4xl text-charcoal mt-4 leading-tight">
                {featured.title}
              </h2>

              <p className="text-on-surface-variant leading-relaxed mt-5">
                {featured.excerpt}
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500 mt-6">
                <Clock3 size={14} />
                {featured.time}
              </div>

              <div className="flex items-center gap-2 text-sm text-burgundy mt-7">
                Read Story
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Latest Stories */}
      <section className="section-container pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="label-caps text-[10px] text-burgundy mb-2">
              Latest Stories
            </p>

            <h2 className="font-display text-3xl text-charcoal">
              From the Betees Journal
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-on-surface-variant">
            <TrendingUp size={16} className="text-burgundy" />
            Trending
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group bg-white shadow-editorial overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.16em] text-burgundy">
                  {article.category}
                </p>

                <h3 className="font-display text-xl font-semibold text-charcoal mt-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-on-surface-variant leading-relaxed mt-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <span className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock3 size={13} />
                    {article.time}
                  </span>

                  <span className="text-sm text-burgundy">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-surface-low py-16">
        <div className="section-container text-center">
          <p className="label-caps text-[10px] text-burgundy mb-3">
            Stay Inspired
          </p>

          <h2 className="font-display text-3xl text-charcoal">
            Fashion stories, delivered to you
          </h2>

          <p className="text-sm text-on-surface-variant max-w-lg mx-auto mt-4">
            Get the latest styling ideas, fashion stories, and trends from
            Betees.
          </p>

          <div className="flex max-w-md mx-auto mt-6">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white border border-gray-200 px-4 py-3 text-sm outline-none"
            />

            <button className="bg-burgundy text-white px-6 text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};