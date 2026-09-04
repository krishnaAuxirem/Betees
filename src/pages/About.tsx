import { Link } from "react-router-dom";
import { ArrowRight, Users, Package, TrendingUp, Star } from "lucide-react";

export const About = () => (
  <div className="animate-fade-in">
    <div className="bg-charcoal py-20">
      <div className="section-container text-center space-y-4">
        <p className="label-caps text-[10px] text-rose-gold">Our Story</p>
        <h1 className="font-display text-5xl text-white">Redefining<br /><span className="italic text-rose-gold">Indian Fashion</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">Betees is India's first AI-powered unified fashion ecosystem — merging haute couture craftsmanship with cutting-edge generative intelligence.</p>
      </div>
    </div>

    <section className="section-container py-16 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <p className="label-caps text-[10px] text-burgundy">Our Mission</p>
          <h2 className="font-display text-3xl text-charcoal">Fashion that fits your life, perfectly</h2>
          <p className="text-on-surface-variant leading-relaxed">Founded in 2024, Betees was born from a simple insight: fashion should be as unique as the person wearing it. We built an AI engine that understands your body, your occasions, and your aesthetic — then connects you with India's finest designers, tailors, and brands.</p>
          <p className="text-on-surface-variant leading-relaxed">From bespoke wedding trousseau to everyday workwear, from luxury designer boutiques to independent artisans — Betees brings it all together, guided by intelligence.</p>
          <Link to="/shop" className="btn-primary text-sm">Explore the Platform <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { Icon: Users, value: "2.4M+", label: "Members" },
            { Icon: Package, value: "50K+", label: "Products" },
            { Icon: TrendingUp, value: "₹850Cr+", label: "Transacted" },
            { Icon: Star, value: "4.95★", label: "Rating" },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="bg-surface-low p-6 text-center">
              <Icon size={24} className="text-burgundy mx-auto mb-3" />
              <div className="font-display text-3xl font-semibold text-charcoal">{value}</div>
              <div className="label-caps text-[10px] text-on-surface-variant mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 className="font-display text-3xl text-charcoal mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "AI-First", desc: "Every recommendation, every fit, every style suggestion — powered by state-of-the-art generative intelligence.", icon: "🤖" },
            { title: "Craftsmanship", desc: "We work only with verified master tailors and designers who meet our exacting quality standards.", icon: "✂️" },
            { title: "Inclusivity", desc: "Fashion for every body type, every occasion, every budget — from ₹500 to ₹5,00,000.", icon: "🌈" },
          ].map((v) => (
            <div key={v.title} className="bg-white shadow-editorial p-6 space-y-3">
              <div className="text-3xl">{v.icon}</div>
              <h3 className="font-display text-xl font-semibold text-charcoal">{v.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="font-display text-3xl text-charcoal mb-8 text-center">Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Arjun Malhotra", role: "Co-Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
            { name: "Priya Nair", role: "Co-Founder & Chief Style Officer", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop" },
            { name: "Rahul Gupta", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" },
          ].map((m) => (
            <div key={m.name} className="text-center">
              <img src={m.image} alt={m.name} className="w-24 h-24 object-cover rounded-full mx-auto mb-3 border-4 border-white shadow-editorial" />
              <p className="font-display text-base font-semibold text-charcoal">{m.name}</p>
              <p className="text-sm text-on-surface-variant">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
