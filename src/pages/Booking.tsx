"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const serviceId = searchParams.get("service") || "";

  const [selectedService, setSelectedService] = useState(serviceId);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestAddress, setGuestAddress] = useState("");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    getUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !date || !time) return;

    setLoading(true);

    try {
      const { error } = await supabase.from("appointments").insert([
        {
          user_id: user?.id || null,
          service_id: selectedService,
          date,
          time,
          notes,
          guest_name: user ? null : guestName,
          guest_phone: user ? null : guestPhone,
          guest_address: user ? null : guestAddress,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setSuccess(true);
    } catch (err: any) {
      alert(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-3xl text-center"
        >
          <CheckCircle className="mx-auto text-green-500 mb-4" size={40} />
          <h2 className="text-2xl font-bold mb-2">Booking Successful</h2>
          <p className="text-gray-500 mb-6">
            We will contact you soon to confirm.
          </p>

          <button
            onClick={() => router.push("/")}
            className="bg-black text-white px-6 py-3 rounded-full"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 bg-luxury-cream">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl">

        <h1 className="text-3xl font-bold mb-6">
          Book Your <span className="text-primary">Session</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Service */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full p-4 bg-gray-100 rounded-xl"
            required
          >
            <option value="">Select Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} - ৳{s.price}
              </option>
            ))}
          </select>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-4 bg-gray-100 rounded-xl"
              required
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-4 bg-gray-100 rounded-xl"
              required
            />
          </div>

          {/* Notes */}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special request"
            className="w-full p-4 bg-gray-100 rounded-xl"
          />

          {/* Guest */}
          {!user && (
            <>
              <input
                placeholder="Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-xl"
                required
              />

              <input
                placeholder="Phone"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-xl"
                required
              />

              <input
                placeholder="Address"
                value={guestAddress}
                onChange={(e) => setGuestAddress(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-xl"
                required
              />
            </>
          )}

          <button
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}