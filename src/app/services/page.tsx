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
  Clock,
  Star,
  Heart,
  Crown,
  Gem,
  Leaf,
  Coffee,
  ArrowRight,
  Phone,
} from "lucide-react";
import Link from "next/link";

// ==========================
// Categories
// ==========================

const categories = [
  {
    id: "hair",
    name: "Hair Couture",
    icon: Scissors,
    color: "from-amber-500 to-pink-500",
    bgColor: "bg-amber-50",
    activeColor: "from-amber-500 to-pink-500",
  },
  {
    id: "skin",
    name: "Skin Rituals",
    icon: User,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    activeColor: "from-emerald-500 to-teal-500",
  },
  {
    id: "bridal",
    name: "Bridal Haven",
    icon: Sparkles,
    color: "from-rose-500 to-purple-500",
    bgColor: "bg-rose-50",
    activeColor: "from-rose-500 to-purple-500",
  },
  {
    id: "nails",
    name: "Nail Artistry",
    icon: Wind,
    color: "from-violet-500 to-indigo-500",
    bgColor: "bg-violet-50",
    activeColor: "from-violet-500 to-indigo-500",
  },
];

// ==========================
// Services
// ==========================

const services = [
  {
    id: "h1",
    category: "hair",
    name: "Signature Haircut",
    price: 850,
    originalPrice: 1200,
    duration: 60,
    desc: "Tailored precision cut by our master stylists including wash and blowout.",
    features: [
      "Consultation",
      "Precision Cutting",
      "Luxury Shampoo",
      "Blowout Styling",
    ],
    popular: true,
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600",
  },

  {
    id: "s1",
    category: "skin",
    name: "Advanced Hydrafacial",
    price: 1500,
    originalPrice: 2000,
    duration: 75,
    desc: "Multi-step treatment that cleanses, exfoliates and hydrates with serums.",
    features: [
      "Deep Cleansing",
      "Exfoliation",
      "Extraction",
      "Hydration",
      "LED Light Therapy",
    ],
    popular: true,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
  },

  {
    id: "b1",
    category: "bridal",
    name: "Grand Bridal Makeup",
    price: 3500,
    originalPrice: 4500,
    duration: 120,
    desc: "High-definition bridal look with premium lashes and setting.",
    features: [
      "Consultation",
      "HD Foundation",
      "Premium Lashes",
      "Long-lasting Setting",
      "Touch-up Kit",
    ],
    popular: true,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  },

  {
    id: "n1",
    category: "nails",
    name: "Gel Sculpting",
    price: 750,
    duration: 90,
    desc: "Artistic nail extension and gel coloring with premium lacquers.",
    features: [
      "Nail Prep",
      "Extension",
      "Gel Color",
      "Top Coat",
      "Cuticle Care",
    ],
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600",
  },
];

// ==========================
// Types
// ==========================

type ServiceType = {
  id: string;
  category: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: number;
  desc: string;
  features: string[];
  popular?: boolean;
  image: string;
};

type ServiceCardProps = {
  service: ServiceType;
  categoryColor: string;
};

// ==========================
// Service Card
// ==========================

function ServiceCard({
  service,
  categoryColor,
}: ServiceCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      whileHover={{ y: -5 }}
      className="group relative"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Price */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-baseline gap-2">
              {service.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{service.originalPrice}
                </span>
              )}

              <span
                className={`text-2xl font-bold bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}
              >
                ৳{service.price}
              </span>
            </div>
          </div>

          {/* Popular */}
          {service.popular && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              Most Popular
            </div>
          )}

          {/* Like */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform"
          >
            <Heart
              size={16}
              className={
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600"
              }
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {service.name}
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            {service.desc}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {service.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span className="text-sm">
                {service.duration} min
              </span>
            </div>

            <Link
              href={`/book?service=${service.id}`}
              className={`
                inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300
                bg-gradient-to-r ${categoryColor} text-white shadow-md hover:shadow-xl hover:scale-105
              `}
            >
              Book Now
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Hover Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-64 bg-gray-900 text-white rounded-xl p-3 shadow-xl z-20 pointer-events-none"
            >
              <div className="text-xs space-y-1">
                <p className="font-semibold text-center mb-2">
                  ✨ Service Details
                </p>

                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1"
                  >
                    <Check
                      size={10}
                      className="text-green-400"
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ==========================
// Main Component
// ==========================

export default function Services() {
  const [activeTab, setActiveTab] = useState("hair");

  const currentCategory = categories.find(
    (c) => c.id === activeTab
  );

  const currentServices = services.filter(
    (s) => s.category === activeTab
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">

      {/* Tabs */}
      <section className="sticky top-20 z-30 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-medium transition-all duration-300 text-sm md:text-base
                  ${
                    activeTab === cat.id
                      ? `bg-gradient-to-r ${cat.activeColor} text-white shadow-lg`
                      : `bg-white text-gray-600 hover:bg-gray-50 shadow-sm`
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <cat.icon size={16} />
                  <span>{cat.name}</span>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {currentCategory?.name}
            </h2>

            <p className="text-gray-500">
              Discover our premium beauty services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="wait">
              {currentServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  categoryColor={
                    currentCategory?.color ||
                    "from-amber-500 to-pink-500"
                  }
                />
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-pink-50">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Crown,
                title: "Expert Stylists",
              },
              {
                icon: Gem,
                title: "Premium Products",
              },
              {
                icon: Leaf,
                title: "Clean & Safe",
              },
              {
                icon: Coffee,
                title: "VIP Experience",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-white rounded-2xl shadow-sm"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon
                    size={20}
                    className="text-white"
                  />
                </div>

                <h3 className="font-semibold text-gray-800">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-xl">

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for Your Transformation?
            </h2>

            <p className="text-gray-300 mb-8">
              Book your appointment today
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Book Appointment
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <Phone size={18} />
                Contact Us
              </Link>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}