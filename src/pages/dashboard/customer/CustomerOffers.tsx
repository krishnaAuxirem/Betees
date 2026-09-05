import { useState } from "react";
import { Tag, Gift, Copy, Check, Sparkles, Crown, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface OfferCoupon {
  code: string;
  title: string;
  discount: string;
  description: string;
  minSpend: number;
  validUntil: string;
  category: string;
}

export const CustomerOffers = () => {
  const [points, setPoints] = useState(4850);
  const [pointsToRedeem, setPointsToRedeem] = useState(1500);

  const coupons: OfferCoupon[] = [
    {
      code: "BETEESFESTIVE20",
      title: "Autumn Festive Couture Drop",
      discount: "20% OFF",
      description: "Applicable on all bespoke lehengas, bandhgalas, and silk outerwear above ₹35,000.",
      minSpend: 35000,
      validUntil: "Sep 30, 2026",
      category: "Bespoke Couture",
    },
    {
      code: "SAVILEROW5000",
      title: "Bespoke Suiting Privilege",
      discount: "₹5,000 FLAT OFF",
      description: "Direct atelier credit on full tuxedo suites with floating horsehair canvas.",
      minSpend: 45000,
      validUntil: "Oct 15, 2026",
      category: "Suiting & Tuxedos",
    },
    {
      code: "FIRSTATELIER15",
      title: "New Atelier Commission Welcome",
      discount: "15% OFF",
      description: "Valid across first-time bespoke orders placed with any verified independent couturier.",
      minSpend: 20000,
      validUntil: "Dec 31, 2026",
      category: "First Order",
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    toast.success(`Coupon code "${code}" copied to clipboard!`);
  };

  const handleRedeemPoints = () => {
    if (pointsToRedeem <= 0 || pointsToRedeem > points) {
      toast.error("Please enter a valid amount of points to redeem");
      return;
    }
    setPoints((prev) => prev - pointsToRedeem);
    toast.success(
      `Redeemed ${pointsToRedeem} points for a ₹${pointsToRedeem.toLocaleString("en-IN")} couture voucher!`
    );
  };

  const referralCode = "PRIYA-BETEES-BLACK";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Private Client Privileges</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">Offers & Loyalty Rewards</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Exclusive atelier privileges, seasonal discounts, and reward redemption points.
          </p>
        </div>
      </div>

      {/* Top Banner: Membership Tier & Points Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tier Card (7 cols) */}
        <div className="lg:col-span-7 bg-charcoal text-white p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-gold text-xs uppercase tracking-widest font-semibold">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Tier: Sovereign Black</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-mono bg-white/10 px-2.5 py-1">
                Member #88092
              </span>
            </div>

            <h2 className="font-display text-2xl font-medium">Betees Private Client Society</h2>
            <p className="text-xs text-white/70 leading-relaxed max-w-xl">
              As a Sovereign Black member, you receive complimentary doorstep master measuring, priority atelier scheduling, and personal couture consultation with our chief fashion directors.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-white/50 block text-[10px] uppercase">Doorstep Alterations</span>
                <span className="font-medium text-white">Unlimited Complimentary</span>
              </div>
              <div>
                <span className="text-white/50 block text-[10px] uppercase">Atelier Queue</span>
                <span className="font-medium text-emerald-400">Priority Tier 1</span>
              </div>
              <div>
                <span className="text-white/50 block text-[10px] uppercase">Personal Stylist</span>
                <span className="font-medium text-white">Assigned: Aurelia AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loyalty Points Redemption (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-charcoal/10 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal/50">
                Loyalty Point Balance
              </span>
              <Sparkles className="w-4 h-4 text-burgundy" />
            </div>

            <div>
              <div className="font-display text-3xl font-medium text-charcoal">
                {points.toLocaleString()} <span className="text-base text-charcoal/60 font-sans">Pts</span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold block mt-0.5">
                Redeemable value: ₹{points.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="pt-3 border-t border-charcoal/10 space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70">
                Redeem towards next commission:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={500}
                  max={points}
                  step={500}
                  value={pointsToRedeem}
                  onChange={(e) => setPointsToRedeem(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-sm font-mono"
                />
                <button
                  onClick={handleRedeemPoints}
                  className="bg-burgundy hover:bg-burgundy/90 text-white px-5 py-2 text-xs uppercase tracking-wider font-semibold transition-colors shrink-0"
                >
                  Redeem
                </button>
              </div>
              <span className="text-[10px] text-charcoal/50 block">
                Points are credited directly as a checkout discount on any bespoke order.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Coupons Section */}
      <div className="space-y-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-burgundy font-semibold">Available Vouchers</span>
          <h3 className="font-display text-2xl font-medium text-charcoal">Active Atelier Privilege Codes</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="bg-white border border-charcoal/10 hover:border-burgundy/40 transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-charcoal/50 mb-2">
                  <span className="font-semibold uppercase tracking-wider">{c.category}</span>
                  <span className="text-emerald-700 font-semibold">Valid till {c.validUntil}</span>
                </div>
                <div className="font-display text-2xl font-medium text-burgundy">{c.discount}</div>
                <h4 className="font-display text-base font-medium text-charcoal mt-1">{c.title}</h4>
                <p className="text-xs text-charcoal/60 mt-2 leading-relaxed">{c.description}</p>
              </div>

              <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between gap-3">
                <div className="bg-warm-white px-3 py-1.5 border border-charcoal/10 font-mono text-xs font-semibold text-charcoal tracking-wider">
                  {c.code}
                </div>
                <button
                  onClick={() => handleCopyCode(c.code)}
                  className="border border-charcoal/20 hover:border-charcoal bg-white p-2 text-charcoal text-xs flex items-center gap-1 transition-colors"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold uppercase">Copy</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program Section */}
      <div className="bg-warm-white border border-charcoal/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold">
            <Gift className="w-4 h-4" />
            <span>Private Invitation</span>
          </div>
          <h3 className="font-display text-2xl font-medium text-charcoal">
            Invite Fellow Connoisseurs, Both Receive ₹2,500
          </h3>
          <p className="text-xs text-charcoal/70 leading-relaxed">
            Share your private referral pass. When an invited guest places their first bespoke commission, both of your accounts receive ₹2,500 in atelier credit.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 border border-charcoal/20 shrink-0">
          <span className="font-mono text-xs font-semibold text-charcoal px-3 tracking-widest">
            {referralCode}
          </span>
          <button
            onClick={() => handleCopyCode(referralCode)}
            className="bg-charcoal hover:bg-burgundy text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 transition-colors flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CustomerOffers;
