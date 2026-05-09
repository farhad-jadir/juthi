"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

const services = [
  { id: "h1", name: "Signature Haircut", price: 85 },
  { id: "h2", name: "Balayage & Glow", price: 210 },
  { id: "s1", name: "Advanced Hydrafacial", price: 150 },
  { id: "s2", name: "Diamond Glow Facial", price: 185 },
  { id: "b1", name: "Grand Bridal Makeup", price: 350 },
  { id: "b2", name: "Bridal Vanity Package", price: 550 },
  { id: "n1", name: "Gel Sculpting", price: 75 },
];

export default function Booking() {
  const router = useRouter();
  
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAddress, setGuestAddress] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // URL থেকে service প্যারামিটার পড়া
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const service = params.get("service");
      if (service) {
        setSelectedService(service);
      }
    }
  }, []);

  // Get logged in user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !date || !time) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("appointments").insert([
        {
          user_id: user?.id || null,
          service_id: selectedService,
          date,
          time,
          notes: notes || null,
          guest_name: user ? null : guestName,
          guest_phone: user ? null : guestPhone,
          guest_address: user ? null : guestAddress,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      
      // 3 সেকেন্ড পরে হোম পেজে রিডাইরেক্ট
      setTimeout(() => {
        router.push("/");
      }, 3000);
      
    } catch (err: any) {
      console.error("Booking error:", err);
      alert(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-3xl text-center shadow-xl max-w-md mx-4"
        >
          <CheckCircle className="mx-auto text-green-500 mb-4" size={60} />
          <h2 className="text-2xl font-bold mb-2">Booking Successful! ✨</h2>
          <p className="text-gray-500 mb-6">
            Thank you for booking with us. We will contact you soon to confirm your appointment.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-6 bg-gradient-to-br from-luxury-cream to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-primary p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">
              Book Your <span className="text-white/90">Session</span>
            </h1>
            <p className="text-white/80 mt-2">Fill out the form below to schedule your appointment</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Service *
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                required
              >
                <option value="">Choose a service</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - ${s.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any allergies, preferences, or special requirements?"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                rows={3}
              />
            </div>

            {/* Guest Information (if not logged in) */}
            {!user && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-700">Guest Information</h3>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Address *"
                  value={guestAddress}
                  onChange={(e) => setGuestAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}