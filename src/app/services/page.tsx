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
  Award,
  Crown,
  Gem,
  Leaf,
  Coffee,
  ArrowRight,
  Phone
} from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "hair", name: "Hair Couture", icon: Scissors, color: "from-amber-500 to-pink-500", bgColor: "bg-amber-50", activeColor: "bg-gradient-to-r from-amber-500 to-pink-500" },
  { id: "skin", name: "Skin Rituals", icon: User, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-50", activeColor: "bg-gradient-to-r from-emerald-500 to-teal-500" },
  { id: "bridal", name: "Bridal Haven", icon: Sparkles, color: "from-rose-500 to-purple-500", bgColor: "bg-rose-50", activeColor: "bg-gradient-to-r from-rose-500 to-purple-500" },
  { id: "nails", name: "Nail Artistry", icon: Wind, color: "from-violet-500 to-indigo-500", bgColor: "bg-violet-50", activeColor: "bg-gradient-to-r from-violet-500 to-indigo-500" },
];

const services = [
  {
    id: "h1",
    category: "hair",
    name: "Signature Haircut",
    price: 850,
    originalPrice: 1200,
    duration: 60,
    desc: "Tailored precision cut by our master stylists including wash and blowout.",
    features: ["Consultation", "Precision Cutting", "Luxury Shampoo", "Blowout Styling"],
    popular: true,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600"
  },
  
  
  {
    id: "s1",
    category: "skin",
    name: "Advanced Hydrafacial",
    price: 1500,
    originalPrice: 2000,
    duration: 75,
    desc: "Multi-step treatment that cleanses, exfoliates and hydrates with serums.",
    features: ["Deep Cleansing", "Exfoliation", "Extraction", "Hydration", "LED Light Therapy"],
    popular: true,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600"
  },
  {
    id: "s2",
    category: "skin",
    name: "Diamond Glow Facial",
    price: 1850,
    duration: 90,
    desc: "Next-level skin surfacing for radiant, healthy-looking skin.",
    features: ["Diamond Microdermabrasion", "Serum Infusion", "Facial Massage", "Mask Treatment"],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600"
  },
  {
    id: "s3",
    category: "skin",
    name: "Gold Radiance Facial",
    price: 2500,
    originalPrice: 3200,
    duration: 120,
    desc: "Luxurious 24k gold treatment for ageless radiance.",
    features: ["Gold Peel", "24k Mask", "Face Massage", "Gold Serum"],
    popular: true,
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600"
  },
  {
    id: "b1",
    category: "bridal",
    name: "Grand Bridal Makeup",
    price: 3500,
    originalPrice: 4500,
    duration: 120,
    desc: "High-definition bridal look with premium lashes and setting.",
    features: ["Consultation", "HD Foundation", "Premium Lashes", "Long-lasting Setting", "Touch-up Kit"],
    popular: true,
    image: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/487315149_1221505813313204_4608426252314443748_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEcvrGiMtPtotBraChc6O9FkoejpIvYMLmSh6Oki9gwuT9LRcNNYkICZKfiytMu13zyua4roYXZr0tg3KeJ6HX7&_nc_ohc=0-0RbsgXmZQQ7kNvwE9D49a&_nc_oc=AdrHtADNQDlK0NkJWZkP74tLP2JT4oA9I2GJq0Jnytj99C6JnvHTN_Lm7mLnFbI1xns&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=Ng16ESVzWrxkGOcQHyUtQQ&_nc_ss=7b2a8&oh=00_Af5D-Iw2ZdQTDIU7-x7MC7hJ_eRmIOZlqptJ2cZcfzllbA&oe=6A04CFFA"
  },
  {
    id: "b2",
    category: "bridal",
    name: "Bridal Vanity Package",
    price: 5500,
    duration: 240,
    desc: "Complete makeup and hairstyling session for the big day.",
    features: ["Bridal Makeup", "Hair Styling", "Draping", "Trial Session", "Touch-up Kit"],
    image: "https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/614794034_1489597173170732_8731103091452594285_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeF-xbay5xVZON4YB0soZBTgFkC8XOQ_mwQWQLxc5D-bBL9ODss_8hWPvbC3ZEDGGThAm4yO6xX326eW7xpGB2C2&_nc_ohc=0_ERq7iaVEkQ7kNvwGQl0J2&_nc_oc=AdoCZmCDqVCHcn3SNO1ul3PeqZQTc0TfuhXxKQETxjAh2fyC31l0kGW9HFx4TreV8BE&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=nOPY0AeijkaRPXfjsqylPg&_nc_ss=7b2a8&oh=00_Af5KuFV_K0QveWCz4FWJGsbrvsDr_2_E80CCqm8t49X2Pw&oe=6A04C0E2"
  },
  {
    id: "n1",
    category: "nails",
    name: "Gel Sculpting",
    price: 750,
    duration: 90,
    desc: "Artistic nail extension and gel coloring with premium lacquers.",
    features: ["Nail Prep", "Extension", "Gel Color", "Top Coat", "Cuticle Care"],
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600"
  },
  {
    id: "n2",
    category: "nails",
    name: "Nail Art Masterpiece",
    price: 950,
    duration: 120,
    desc: "Custom hand-painted nail art designs.",
    features: ["Design Consultation", "Hand Painting", "Gem Application", "Top Coat"],
    popular: true,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600"
  },
];

// Service Card Component
function ServiceCard({ service, categoryColor }: { service: any; categoryColor: string }) {
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
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {/* Price Badge */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-baseline gap-2">
              {service.originalPrice && (
                <span className="text-sm text-gray-400 line-through">৳{service.originalPrice}</span>
              )}
              <span className={`text-2xl font-bold bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent`}>
                ৳{service.price}
              </span>
            </div>
          </div>

          {/* Popular Badge */}
          {service.popular && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              Most Popular
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform"
          >
            <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
          <p className="text-gray-500 text-sm mb-4">{service.desc}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {service.features.slice(0, 3).map((feature: string, idx: number) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{service.features.length - 3} more
              </span>
            )}
          </div>

          {/* Duration & Book Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-gray-500">
              <Clock size={16} />
              <span className="text-sm">{service.duration} min</span>
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

        {/* Details Popup on Hover */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 text-white rounded-xl p-3 shadow-xl z-20 pointer-events-none"
            >
              <div className="text-xs space-y-1">
                <p className="font-semibold text-center mb-2">✨ Service Details</p>
                {service.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-1">
                    <Check size={10} className="text-green-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState("hair");

  const currentCategory = categories.find(c => c.id === activeTab);
  const currentServices = services.filter(s => s.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50">
      
      {/* Category Tabs */}
      <section className="sticky top-20 z-30 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  relative group px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-medium transition-all duration-300 text-sm md:text-base
                  ${activeTab === cat.id
                    ? `bg-gradient-to-r ${cat.activeColor} text-white shadow-lg`
                    : `bg-white text-gray-600 hover:bg-gray-50 shadow-sm`
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <cat.icon size={16} />
                  <span className="hidden sm:inline">{cat.name}</span>
                  <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Category Header */}
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
              Discover our exquisite range of {currentCategory?.name.toLowerCase()} services
            </p>
          </motion.div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="wait">
              {currentServices.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  categoryColor={currentCategory?.color || "from-amber-500 to-pink-500"}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Why Choose <span className="text-amber-600">Us</span>
            </h2>
            <p className="text-gray-500">Experience excellence at every touchpoint</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Crown, title: "Expert Stylists", desc: "Certified professionals" },
              { icon: Gem, title: "Premium Products", desc: "Luxury brands only" },
              { icon: Leaf, title: "Clean & Safe", desc: "Strict hygiene standards" },
              { icon: Coffee, title: "VIP Experience", desc: "Complimentary beverages" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-4 md:p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <item.icon size={20} className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Ready for Your Transformation?
            </h2>
            <p className="text-gray-300 mb-8 text-sm md:text-base">
              Book your appointment today and experience the luxury difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Book Your Appointment
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <Phone size={18} />
                Call for Inquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}