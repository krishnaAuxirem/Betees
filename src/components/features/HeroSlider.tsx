import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    id: 1,
    image: hero1,
    tag: "AI-Powered Fashion",
    headline: "Your style.",
    headlineItalic: "Your fit.",
    headline2: "Your fashion.",
    subtext: "India's first unified AI fashion ecosystem. Discover curated luxury, virtual fitting, and bespoke tailoring — all in one place.",
    cta1: { label: "Discover Your Style", path: "/discover" },
    cta2: { label: "Try AI Stylist", path: "/ai-stylist" },
    stats: [
      { value: "98.4%", label: "Fit Precision" },
      { value: "3D Live", label: "Try-On Engine" },
      { value: "500+", label: "Verified Ateliers" },
    ],
  },
  {
    id: 2,
    image: hero2,
    tag: "Neural Couture Intelligence",
    headline: "AI that understands",
    headlineItalic: "your aesthetic",
    headline2: "like no other.",
    subtext: "Our generative style engine analyzes your body, palette, and occasions to curate looks that feel uniquely yours — every single time.",
    cta1: { label: "Explore AI Features", path: "/ai-stylist" },
    cta2: { label: "Virtual Try-On", path: "/virtual-try-on" },
    stats: [
      { value: "12M+", label: "Style Vectors" },
      { value: "99.2%", label: "AI Accuracy" },
      { value: "32 sec", label: "Style Synthesis" },
    ],
  },
  {
    id: 3,
    image: hero3,
    tag: "Bespoke Atelier",
    headline: "Master craft",
    headlineItalic: "meets digital",
    headline2: "precision.",
    subtext: "Commission bespoke garments from India's finest tailors, guided by AI measurements and delivered with the zero-alteration guarantee.",
    cta1: { label: "Commission Bespoke", path: "/custom-studio" },
    cta2: { label: "Meet Our Tailors", path: "/tailors" },
    stats: [
      { value: "₹0", label: "Alteration Cost" },
      { value: "14 Days", label: "Craft Time" },
      { value: "4.98★", label: "Tailor Rating" },
    ],
  },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden bg-charcoal" style={{ height: "min(90vh, 700px)" }}>
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={s.image}
            alt={s.headline}
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
      ))}

      {/* Content */}
      <div className={`relative z-10 h-full flex items-center section-container transition-all duration-700 ${isTransitioning ? "opacity-60" : "opacity-100"}`}>
        <div className="max-w-xl space-y-6 py-10">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-pulse" />
            <span className="label-caps text-[9px] text-white">{slide.tag}</span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] font-normal">
              {slide.headline}
              <br />
              <span className="italic text-rose-gold">{slide.headlineItalic}</span>
              <br />
              {slide.headline2}
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-md pt-2">{slide.subtext}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link to={slide.cta1.path} className="btn-secondary shadow-md group">
              {slide.cta1.label}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to={slide.cta2.path} className="flex items-center gap-2 px-5 py-3 bg-white/15 backdrop-blur-sm text-white border border-white/30 text-xs font-semibold uppercase tracking-widest hover:bg-white/25 transition-all">
              <Sparkles size={14} />
              {slide.cta2.label}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-4 pt-2">
            {slide.stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm px-3 py-2">
                <div className="font-display text-lg font-semibold text-white">{stat.value}</div>
                <div className="label-caps text-[9px] text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating AI Badge */}
      <div className="absolute bottom-20 right-8 hidden lg:flex items-center gap-3 bg-charcoal/90 backdrop-blur-sm p-3 shadow-xl animate-hero-float">
        <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center">
          <Sparkles size={15} className="text-white" />
        </div>
        <div>
          <p className="label-caps text-[9px] text-white">Live AI Synthesis</p>
          <p className="text-xs text-gray-300">Calibrated to your profile</p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm text-white hover:bg-white/25 transition-all flex items-center justify-center z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm text-white hover:bg-white/25 transition-all flex items-center justify-center z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-300 ${i === current ? "w-8 h-1.5 bg-white" : "w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white/80"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
