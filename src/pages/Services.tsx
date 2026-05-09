"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Sparkles,
  User,
  Wind,
  Check,
  ChevronRight,
} from "lucide-react";
import { cn, formatCurrency } from "../lib/utils";
import Link from "next/link";

const categories = [
  { id: "hair", name: "Hair Couture", icon: Scissors },
  { id: "skin", name: "Skin Rituals", icon: User },
  { id: "bridal", name: "Bridal Haven", icon: Sparkles },
  { id: "nails", name: "Nail Artistry", icon: Wind },
];

const services = [
  {
    id: "h1",
    category: "hair",
    name: "Signature Haircut",
    price: 85,
    duration: 60,
    desc: "Tailored precision cut by our master stylists including wash and blowout.",
  },
  {
    id: "h2",
    category: "hair",
    name: "Balayage & Glow",
    price: 210,
    duration: 180,
    desc: "Hand-painted highlights for a sun-kissed, natural-looking dimension.",
  },
  {
    id: "s1",
    category: "skin",
    name: "Advanced Hydrafacial",
    price: 150,
    duration: 75,
    desc: "Multi-step treatment that cleanses, exfoliates and hydrates with serums.",
  },
  {
    id: "s2",
    category: "skin",
    name: "Diamond Glow Facial",
    price: 185,
    duration: 90,
    desc: "Next-level skin surfacing for radiant, healthy-looking skin.",
  },
  {
    id: "b1",
    category: "bridal",
    name: "Grand Bridal Makeup",
    price: 350,
    duration: 120,
    desc: "High-definition bridal look with premium lashes and setting.",
  },
  {
    id: "b2",
    category: "bridal",
    name: "Bridal Vanity Package",
    price: 550,
    duration: 240,
    desc: "Complete makeup and hairstyling session for the big day.",
  },
  {
    id: "n1",
    category: "nails",
    name: "Gel Sculpting",
    price: 75,
    duration: 90,
    desc: "Artistic nail extension and gel coloring with premium lacquers.",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState("hair");

  return (
    <div className="pt-32 pb-24 bg-luxury-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our <span className="text-primary italic">Menu</span>
            </h1>

            <p className="text-luxury-gray max-w-2xl mx-auto font-light text-lg">
              Each service is a masterpiece of precision and luxury.
            </p>
          </motion.div>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 sticky top-24 z-30 py-4 bg-luxury-cream/80 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all duration-300",
                activeTab === cat.id
                  ? "bg-luxury-slate text-white"
                  : "bg-white text-luxury-slate border border-luxury-cream"
              )}
            >
              <cat.icon size={18} />
              <span className="text-sm">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {services
              .filter((s) => s.category === activeTab)
              .map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2.5rem] p-8 border shadow-sm"
                >
                  <div className="flex justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-luxury-cream">
                      <Check size={20} />
                    </div>
                    <span className="text-2xl font-serif">
                      {formatCurrency(service.price)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="text-sm text-luxury-gray mb-6">
                    {service.desc}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xs uppercase">
                      {service.duration} min
                    </span>

                    <Link
                      href={`/book?service=${service.id}`}
                      className="text-primary text-xs uppercase flex items-center gap-1"
                    >
                      Book <ChevronRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}