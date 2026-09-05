import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Shirt,
  WandSparkles,
  Ruler,
  ShoppingBag,
  Users,
  Heart,
} from "lucide-react";

export const About = () => (
  <div className="animate-fade-in">
    {/* Hero */}
    <div className="bg-charcoal py-20">
      <div className="section-container text-center space-y-4">
        <p className="label-caps text-[10px] text-rose-gold">
          About Betees
        </p>

        <h1 className="font-display text-5xl text-white">
          Your Style.
          <br />
          <span className="italic text-rose-gold">
            Your Fashion.
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Betees is an AI-powered fashion ecosystem designed to help users
          discover, style, customize, try, and purchase clothing while
          connecting them with brands, designers, tailors, and creators.
        </p>
      </div>
    </div>

    <section className="section-container py-16 space-y-16">
      {/* Product Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <p className="label-caps text-[10px] text-burgundy">
            The Betees Platform
          </p>

          <h2 className="font-display text-3xl text-charcoal">
            A smarter way to discover and experience fashion
          </h2>

          <p className="text-on-surface-variant leading-relaxed">
            Betees combines AI-powered styling, personalized fashion
            discovery, smart sizing, virtual try-on, custom clothing,
            digital wardrobe management, and fashion commerce into one
            connected platform.
          </p>

          <p className="text-on-surface-variant leading-relaxed">
            Users can discover products based on their preferences, build
            complete outfits, customize clothing, manage their wardrobe,
            connect with fashion professionals, and shop personalized
            fashion experiences.
          </p>

          <Link
            to="/shop"
            className="btn-primary text-sm"
          >
            Explore the Platform
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product Feature Visual */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              Icon: Sparkles,
              title: "AI Styling",
              desc: "Personalized outfit and fashion recommendations.",
            },
            {
              Icon: Shirt,
              title: "Fashion Discovery",
              desc: "Discover products, trends, styles, and inspiration.",
            },
            {
              Icon: Ruler,
              title: "Smart Fit",
              desc: "Intelligent size and fit recommendations.",
            },
            {
              Icon: WandSparkles,
              title: "Custom Fashion",
              desc: "Create and customize clothing based on your needs.",
            },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-surface-low p-6 space-y-3"
            >
              <Icon
                size={24}
                className="text-burgundy"
              />

              <h3 className="font-display text-xl font-semibold text-charcoal">
                {title}
              </h3>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Product Features */}
      <div>
        <div className="text-center mb-8">
          <p className="label-caps text-[10px] text-burgundy mb-2">
            What Betees Offers
          </p>

          <h2 className="font-display text-3xl text-charcoal">
            Everything you need for your fashion journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              Icon: Sparkles,
              title: "AI Personal Stylist",
              desc: "Get personalized styling suggestions, outfit combinations, color matching, occasion styling, and fashion recommendations.",
            },
            {
              Icon: ShoppingBag,
              title: "Fashion Marketplace",
              desc: "Discover clothing, footwear, accessories, new arrivals, and products from multiple fashion brands.",
            },
            {
              Icon: Shirt,
              title: "Digital Wardrobe",
              desc: "Organize your existing clothes, create outfit collections, save looks, and receive wardrobe recommendations.",
            },
            {
              Icon: WandSparkles,
              title: "Virtual Try-On",
              desc: "Visualize outfits, explore different styles and colors, compare looks, and save your favorite combinations.",
            },
            {
              Icon: Ruler,
              title: "Smart Size & Fit",
              desc: "Use your measurements, fit preferences, and purchase history to receive personalized size recommendations.",
            },
            {
              Icon: Heart,
              title: "Outfit Builder",
              desc: "Mix and match tops, bottoms, outerwear, footwear, and accessories to create complete looks.",
            },
            {
              Icon: Shirt,
              title: "Custom Clothing Studio",
              desc: "Customize fabrics, colors, patterns, collars, sleeves, fit, and measurements before placing a custom order.",
            },
            {
              Icon: Users,
              title: "Designer & Tailor Marketplace",
              desc: "Discover designers, tailors, stylists, and fashion professionals for custom fashion services.",
            },
            {
              Icon: Heart,
              title: "Fashion Community",
              desc: "Share outfits, follow creators, discover inspiration, participate in challenges, and interact with the fashion community.",
            },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white shadow-editorial p-6 space-y-3"
            >
              <Icon
                size={26}
                className="text-burgundy"
              />

              <h3 className="font-display text-xl font-semibold text-charcoal">
                {title}
              </h3>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ecosystem */}
      <div className="bg-surface-low p-8 lg:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p className="label-caps text-[10px] text-burgundy">
            One Connected Ecosystem
          </p>

          <h2 className="font-display text-3xl text-charcoal">
            From discovery to your wardrobe
          </h2>

          <p className="text-on-surface-variant leading-relaxed">
            Betees connects customers with fashion brands, designers,
            tailors, and creators while bringing AI styling, commerce,
            customization, virtual try-on, and wardrobe management
            together in one seamless experience.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 pt-4">
            {[
              "Discover",
              "Style",
              "Try",
              "Customize",
              "Buy",
              "Wear",
              "Manage Wardrobe",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <span className="px-4 py-2 bg-white text-sm font-medium text-charcoal shadow-sm">
                  {item}
                </span>

                {index < 6 && (
                  <ArrowRight
                    size={14}
                    className="text-burgundy"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center space-y-5">
        <p className="label-caps text-[10px] text-rose-gold">
          Discover Betees
        </p>

        <h2 className="font-display text-4xl text-charcoal">
          Your style. Your fit. Your fashion.
        </h2>

        <p className="text-on-surface-variant max-w-xl mx-auto">
          Discover personalized fashion, build your looks, customize your
          style, and explore everything Betees has to offer.
        </p>

        <Link
          to="/shop"
          className="btn-primary text-sm inline-flex"
        >
          Start Exploring
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  </div>
);
