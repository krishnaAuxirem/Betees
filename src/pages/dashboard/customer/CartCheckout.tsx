import { formatINR, PRODUCTS } from "@/constants/data";
import { useState } from "react";
import { Trash2, Plus, Minus, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const CartCheckout = () => {
  const [cartItems, setCartItems] = useState(PRODUCTS.slice(0, 2).map((p) => ({ product: p, qty: 1, size: "M" })));
  const [step, setStep] = useState(0);
  const { setCartCount } = useAuthStore();

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal > 2999 ? 0 : 299;
  const total = subtotal + shipping;

  const remove = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== id));
    setCartCount(cartItems.length - 1);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) => prev.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const placeOrder = () => {
    toast.success("Order placed successfully! You'll receive a confirmation email shortly.");
    setCartItems([]);
    setCartCount(0);
    setStep(3);
  };

  if (step === 3) return (
    <div className="p-8 md:p-16 text-center space-y-5">
      <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto">
        <Check size={28} className="text-white" />
      </div>
      <h2 className="font-display text-3xl text-charcoal">Order Confirmed!</h2>
      <p className="text-on-surface-variant">Your order #BT-{Math.floor(Math.random() * 9000 + 1000)} has been placed. Estimated delivery: 2-3 business days.</p>
      <Link to="/dashboard/customer/orders" className="btn-primary">Track Order <ArrowRight size={14} /></Link>
    </div>
  );

  return (
    <div className="p-5 md:p-8 space-y-6 animate-fade-in">
      <h1 className="font-display text-2xl text-charcoal">Cart & Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {["Cart", "Delivery", "Payment"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "bg-charcoal text-white" : "bg-surface-high text-on-surface-variant"}`}>
              {i < step ? <Check size={12} /> : i + 1}
            </div>
            <span className={`text-xs font-medium ${i === step ? "text-charcoal" : "text-on-surface-variant"}`}>{s}</span>
            {i < 2 && <div className={`w-8 h-0.5 ${i < step ? "bg-charcoal" : "bg-outline-color"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {step === 0 && (
            <>
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag size={32} className="text-on-surface-variant mx-auto mb-4" />
                  <p className="font-display text-xl text-charcoal">Your cart is empty</p>
                  <Link to="/shop" className="btn-primary mt-4 text-sm">Continue Shopping</Link>
                </div>
              ) : (
                cartItems.map(({ product, qty, size }) => (
                  <div key={product.id} className="bg-white shadow-editorial p-4 flex gap-4">
                    <div className="w-20 h-24 bg-surface-low overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-on-surface-variant">{product.brand}</p>
                      <p className="font-semibold text-charcoal text-sm">{product.name}</p>
                      <p className="text-xs text-on-surface-variant">Size: {size}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-outline-color">
                          <button onClick={() => updateQty(product.id, -1)} className="px-2 py-1 hover:bg-surface-low"><Minus size={12} /></button>
                          <span className="px-3 py-1 text-sm font-medium">{qty}</span>
                          <button onClick={() => updateQty(product.id, 1)} className="px-2 py-1 hover:bg-surface-low"><Plus size={12} /></button>
                        </div>
                        <span className="font-display font-semibold text-charcoal">{formatINR(product.price * qty)}</span>
                        <button onClick={() => remove(product.id)} className="text-red-400 hover:text-red-600 ml-auto"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {step === 1 && (
            <div className="bg-white shadow-editorial p-6 space-y-4">
              <h3 className="font-display text-lg text-charcoal">Delivery Address</h3>
              <div className="grid grid-cols-2 gap-4">
                {[["Full Name", "Priya Sharma"], ["Mobile", "+91 98765 43210"], ["Address", "204, Bandra West"], ["City", "Mumbai"], ["State", "Maharashtra"], ["Pincode", "400050"]].map(([k, v]) => (
                  <div key={k as string}>
                    <label className="label-caps text-[9px] text-on-surface-variant block mb-1">{k}</label>
                    <input defaultValue={v as string} className="input-editorial w-full text-sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white shadow-editorial p-6 space-y-4">
              <h3 className="font-display text-lg text-charcoal">Payment Method</h3>
              {[
                { id: "upi", label: "UPI / BHIM", sub: "Google Pay, PhonePe, Paytm" },
                { id: "card", label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
                { id: "netbanking", label: "Net Banking", sub: "All major banks supported" },
                { id: "cod", label: "Cash on Delivery", sub: "Available for orders under ₹10,000" },
              ].map((method) => (
                <label key={method.id} className="flex items-center gap-4 p-4 border border-outline-variant cursor-pointer hover:border-charcoal transition-all">
                  <input type="radio" name="payment" value={method.id} defaultChecked={method.id === "upi"} className="accent-burgundy" />
                  <div>
                    <p className="font-medium text-charcoal text-sm">{method.label}</p>
                    <p className="text-xs text-on-surface-variant">{method.sub}</p>
                  </div>
                </label>
              ))}
              <div className="flex items-center gap-2 text-xs text-emerald">
                <Check size={12} /> 256-bit SSL Encrypted · PCI-DSS Compliant
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-editorial p-5 space-y-4 h-fit">
          <h3 className="font-display text-lg text-charcoal border-b border-outline-variant pb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-on-surface-variant">Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-on-surface-variant">Shipping</span><span className={shipping === 0 ? "text-emerald" : ""}>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
            {shipping === 0 && <p className="text-xs text-emerald">Free shipping above ₹2,999!</p>}
            <div className="flex justify-between font-semibold border-t border-outline-variant pt-2">
              <span>Total</span>
              <span className="font-display text-lg text-charcoal">{formatINR(total)}</span>
            </div>
          </div>
          {step < 2 ? (
            <button onClick={() => setStep(step + 1)} className="w-full btn-primary justify-center py-3 text-sm">
              {step === 0 ? "Proceed to Delivery" : "Continue to Payment"} <ArrowRight size={14} />
            </button>
          ) : (
            <button onClick={placeOrder} className="w-full btn-secondary justify-center py-3 text-sm">
              Place Order · {formatINR(total)}
            </button>
          )}
          {step > 0 && <button onClick={() => setStep(step - 1)} className="w-full text-center text-sm text-on-surface-variant hover:text-charcoal">← Back</button>}
        </div>
      </div>
    </div>
  );
};
