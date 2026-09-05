import { useState } from "react";
import { Users, Calendar, MapPin, Clock, Star, ShieldCheck, Video, Scissors, Check, X } from "lucide-react";
import { toast } from "sonner";
import { DESIGNERS } from "@/constants/data";

interface ConsultationBooking {
  id: string;
  designerName: string;
  designerRole: string;
  atelier: string;
  date: string;
  timeSlot: string;
  type: "Virtual Video Call" | "Atelier Studio Visit" | "Doorstep Master Fitting";
  notes: string;
  status: "Confirmed" | "Scheduled" | "Completed";
}

export const CustomerDesigners = () => {
  const [activeTab, setActiveTab] = useState<"explore" | "bookings">("explore");
  const [bookingModalDesigner, setBookingModalDesigner] = useState<(typeof DESIGNERS)[0] | null>(null);

  // Form state
  const [date, setDate] = useState("2026-09-18");
  const [timeSlot, setTimeSlot] = useState("3:00 PM - 4:00 PM");
  const [sessionType, setSessionType] = useState<ConsultationBooking["type"]>("Virtual Video Call");
  const [notes, setNotes] = useState("Bespoke charcoal tuxedo consultation with satin peak lapel.");

  const [bookings, setBookings] = useState<ConsultationBooking[]>([
    {
      id: "BK-8801",
      designerName: "Arjun Kapoor",
      designerRole: "Master Bespoke Tailor",
      atelier: "Atelier Vesper",
      date: "Sep 12, 2026",
      timeSlot: "11:00 AM - 12:00 PM",
      type: "Atelier Studio Visit",
      notes: "First fitting for Imperial Tuxedo & trouser hem calibration.",
      status: "Confirmed",
    },
  ]);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalDesigner) return;

    const newBooking: ConsultationBooking = {
      id: `BK-${Date.now().toString().slice(-4)}`,
      designerName: bookingModalDesigner.name,
      designerRole: bookingModalDesigner.role || "Couturier",
      atelier: bookingModalDesigner.brand || "Bespoke Atelier",
      date: date,
      timeSlot: timeSlot,
      type: sessionType,
      notes: notes,
      status: "Confirmed",
    };

    setBookings([newBooking, ...bookings]);
    setBookingModalDesigner(null);
    setActiveTab("bookings");
    toast.success(
      `Consultation with ${newBooking.designerName} booked successfully for ${newBooking.date}!`
    );
  };

  const handleCancelBooking = (id: string, name: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    toast.success(`Cancelled consultation appointment with ${name}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-burgundy text-xs uppercase tracking-widest font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Master Couturiers & Tailors</span>
          </div>
          <h1 className="font-display text-3xl font-medium text-charcoal">Designers & Tailors Directory</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            Collaborate directly with Savile Row-trained patternmakers, heritage zardozi embroiderers, and fashion directors.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-white p-1 border border-charcoal/10">
          <button
            onClick={() => setActiveTab("explore")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "explore" ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            Explore Ateliers ({DESIGNERS.length})
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === "bookings" ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal"
            }`}
          >
            My Consultations ({bookings.length})
          </button>
        </div>
      </div>

      {/* Tab: Explore Ateliers */}
      {activeTab === "explore" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESIGNERS.map((designer) => (
            <div
              key={designer.id}
              className="bg-white border border-charcoal/10 hover:border-burgundy/40 transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={designer.image}
                    alt={designer.name}
                    className="w-16 h-16 rounded-full object-cover border border-charcoal/10"
                  />
                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-semibold uppercase px-2 py-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Atelier</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg font-medium text-charcoal">{designer.name}</h3>
                  <span className="text-xs text-burgundy font-semibold uppercase tracking-wider block mt-0.5">
                    {designer.brand || "Bespoke House"}
                  </span>
                  <p className="text-xs text-charcoal/60 mt-2 line-clamp-2">
                    {designer.bio || "Specialist in bespoke silhouettes and architectural garment construction."}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-charcoal/5 text-xs text-charcoal/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-charcoal/40" />
                    <span>{designer.location || "Mumbai, India"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-charcoal/40" />
                    <span>Typical Lead Time: 3-4 Weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>4.95 / 5.0 (50+ Bespoke Commissions)</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-warm-white/50 border-t border-charcoal/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-charcoal/50 block">Consultation</span>
                  <span className="text-xs font-semibold text-charcoal">₹2,500 / Hr</span>
                </div>
                <button
                  onClick={() => setBookingModalDesigner(designer)}
                  className="bg-charcoal hover:bg-burgundy text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: My Consultations */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {bookings.length > 0 ? (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-charcoal/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-charcoal/10 px-2 py-0.5">{b.id}</span>
                    <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5">
                      {b.status}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-medium text-charcoal">
                    Consultation with {b.designerName} ({b.atelier})
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal/70 pt-1">
                    <span className="flex items-center gap-1 font-medium text-charcoal">
                      <Calendar className="w-3.5 h-3.5 text-burgundy" />
                      {b.date} • {b.timeSlot}
                    </span>
                    <span className="flex items-center gap-1">
                      {b.type === "Virtual Video Call" ? (
                        <Video className="w-3.5 h-3.5 text-charcoal/50" />
                      ) : (
                        <Scissors className="w-3.5 h-3.5 text-charcoal/50" />
                      )}
                      {b.type}
                    </span>
                  </div>
                  {b.notes && (
                    <p className="text-xs text-charcoal/60 italic mt-1 font-serif">
                      Notes: "{b.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCancelBooking(b.id, b.designerName)}
                    className="border border-charcoal/20 hover:border-rose-500 hover:text-rose-600 text-charcoal/70 px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-charcoal/10 p-12 text-center max-w-md mx-auto space-y-3">
              <Calendar className="w-10 h-10 text-charcoal/30 mx-auto" />
              <h3 className="font-display text-lg font-medium text-charcoal">No scheduled consultations</h3>
              <p className="text-xs text-charcoal/60">
                You haven't booked any fittings or design calls. Explore our atelier directory to schedule a bespoke consultation.
              </p>
              <button
                onClick={() => setActiveTab("explore")}
                className="bg-charcoal text-white hover:bg-burgundy text-xs uppercase tracking-wider font-semibold px-5 py-2.5 transition-colors"
              >
                Browse Couturiers
              </button>
            </div>
          )}
        </div>
      )}

      {/* Book Consultation Modal */}
      {bookingModalDesigner && (
        <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 md:p-8 space-y-5 border border-charcoal/20">
            <div className="flex items-center justify-between border-b border-charcoal/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-burgundy">
                  Bespoke Consultation
                </span>
                <h3 className="font-display text-xl font-medium text-charcoal">
                  Book Session with {bookingModalDesigner.name}
                </h3>
              </div>
              <button
                onClick={() => setBookingModalDesigner(null)}
                className="text-charcoal/50 hover:text-charcoal p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                  Format / Session Type
                </label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                >
                  <option value="Virtual Video Call">Virtual Video Call (High-Def 3D Draping)</option>
                  <option value="Atelier Studio Visit">Atelier Studio Visit (Flagship Studio)</option>
                  <option value="Doorstep Master Fitting">Doorstep Master Fitting (Private Residence)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                  >
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal/70 mb-1">
                  Commission Notes / Garment Goals
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe the occasion, preferred fabrics, or silhouette ideas..."
                  className="w-full px-3 py-2 border border-charcoal/20 focus:border-burgundy focus:outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal/10">
                <button
                  type="button"
                  onClick={() => setBookingModalDesigner(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-charcoal/20 text-charcoal/70 hover:border-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-burgundy hover:bg-burgundy/90 text-white text-xs uppercase tracking-wider font-semibold"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default CustomerDesigners;
