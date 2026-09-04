import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-charcoal py-14">
        <div className="section-container text-center">
          <p className="label-caps text-[10px] text-rose-gold mb-2">Get In Touch</p>
          <h1 className="font-display text-4xl text-white">Contact Us</h1>
          <p className="text-gray-400 mt-2">We're here to help with any questions, queries, or collaboration requests.</p>
        </div>
      </div>

      <div className="section-container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { Icon: MapPin, title: "Our Office", desc: "Betees HQ, Bandra Kurla Complex\nMumbai, Maharashtra 400051" },
              { Icon: Phone, title: "Phone", desc: "+91 22 4500 6789\nMon–Sat, 10am–7pm" },
              { Icon: Mail, title: "Email", desc: "hello@betees.com\nsupport@betees.com" },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-burgundy flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">{title}</p>
                  <p className="text-sm text-on-surface-variant whitespace-pre-line">{desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-surface-low p-4 mt-6">
              <p className="label-caps text-[10px] text-burgundy mb-2">Office Hours</p>
              <p className="text-sm text-charcoal">Monday – Saturday: 10:00 AM – 7:00 PM</p>
              <p className="text-sm text-charcoal">Sunday: 11:00 AM – 4:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white shadow-editorial p-8 space-y-5">
              <h2 className="font-display text-2xl text-charcoal">Send a Message</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Your Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Priya Sharma" className="input-editorial" required />
                </div>
                <div>
                  <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Email Address</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="input-editorial" required />
                </div>
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-editorial" required>
                  <option value="">Select a topic...</option>
                  <option>Order Support</option>
                  <option>Returns & Exchanges</option>
                  <option>AI Stylist Help</option>
                  <option>Designer Partnership</option>
                  <option>Brand Onboarding</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div>
                <label className="label-caps text-[10px] text-on-surface-variant block mb-1.5">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." rows={5} className="input-editorial resize-none" required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary justify-center py-3 text-sm w-full disabled:opacity-60">
                {loading ? "Sending..." : "Send Message"} {!loading && <Send size={14} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
