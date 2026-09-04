import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "How does the AI Stylist work?", a: "Our AI Stylist, Aura, analyzes your body measurements, color palette, style preferences, and occasion requirements to generate personalized outfit recommendations. It uses generative AI to synthesize looks from our curated product catalog, ensuring every suggestion is tailored to you." },
  { q: "What is the Virtual Try-On feature?", a: "Virtual Try-On uses your uploaded photo or our 3D body avatar to simulate how a garment will look on your actual body. Our Neural Physics Engine replicates fabric drape, tension, and movement — giving you a realistic preview before purchase." },
  { q: "What is the Zero Alteration Guarantee?", a: "We guarantee that garments ordered with our AI size recommendation will fit correctly — without alterations. If micro-tailoring is needed (less than 0.5% of orders), we cover up to ₹3,500 in local alteration costs anywhere in India." },
  { q: "How long does custom clothing take?", a: "Custom garments via our Bespoke Studio are typically ready in 10–18 working days, depending on complexity. Rush orders with premium pricing are available for select tailors." },
  { q: "What is the return & exchange policy?", a: "Ready-to-wear items can be returned within 15 days for a full refund. Bespoke and customized items are non-returnable unless there is a manufacturing defect. All returns are handled via doorstep pickup." },
  { q: "How do I become a verified designer or tailor on Betees?", a: "Apply via the Designer/Tailor registration page. Our team reviews portfolios and conducts quality verification within 7 business days. Approved artisans are featured in our curated directory." },
  { q: "Is my payment information secure?", a: "Yes — all payments are processed through PCI-DSS compliant payment gateways. We support UPI, cards, net banking, EMI, and wallet payments. No card data is stored on our servers." },
  { q: "Can I cancel an order after placing it?", a: "Orders can be cancelled within 2 hours of placement for a full refund. After tailoring has started, cancellations are not accepted, but returns may apply for defects." },
];

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="bg-charcoal py-14 text-center">
        <p className="label-caps text-[10px] text-rose-gold mb-2">Help Center</p>
        <h1 className="font-display text-4xl text-white">Frequently Asked Questions</h1>
      </div>

      <div className="section-container py-14 max-w-3xl mx-auto">
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-outline-variant overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-low transition-colors"
              >
                <span className="font-semibold text-charcoal text-sm pr-4">{faq.q}</span>
                {open === i ? <ChevronUp size={16} className="text-burgundy shrink-0" /> : <ChevronDown size={16} className="text-on-surface-variant shrink-0" />}
              </button>
              {open === i && (
                <div className="px-5 pb-5 animate-slide-up">
                  <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-secondary-container/30 border border-burgundy/20 p-6 text-center">
          <p className="font-display text-lg text-charcoal mb-2">Still have questions?</p>
          <p className="text-sm text-on-surface-variant mb-4">Our concierge team is available 7 days a week</p>
          <a href="/contact" className="btn-primary text-sm justify-center inline-flex">Contact Support</a>
        </div>
      </div>
    </div>
  );
};
