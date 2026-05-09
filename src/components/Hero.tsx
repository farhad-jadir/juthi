"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://scontent.fjsr14-1.fna.fbcdn.net/v/t39.30808-6/610800350_1480825130714603_4407093253604459153_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeG0gcz852KXxjHiv6Sl4OP-5DZWZbGPPw3kNlZlsY8_DakZrPz-gkYPLTehb0tunESZ2kaBC2EthKTeO2EuQRZ_&_nc_ohc=NkIR5OtFfR8Q7kNvwHF7q-Z&_nc_oc=Adr5bmOAhXCCo-J6Kx3-vraHEqwdzk8fnzND5-KG7uoh56nrEGvnQt9YE0L5EcOcMHk&_nc_zt=23&_nc_ht=scontent.fjsr14-1.fna&_nc_gid=GQPoL6j1plkmSF1ngsvcpQ&_nc_ss=7b2a8&oh=00_Af6XFVHjgGcC1qAPpc0nrobMnHIiXiPVo5s3BLdpFcCcWA&oe=6A04A6F8"
          alt="Luxury Salon Interior"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-luxury-cream via-luxury-cream/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-[1px] w-12 bg-primary"></span>

              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-primary flex items-center gap-2">
                <Sparkles size={14} className="animate-pulse" />
                Redefining Elegance
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 text-luxury-slate">
              Where <span className="text-primary italic">Glamour</span>{" "}
              <br />
              Meets <span className="font-light">Soul.</span>
            </h1>

            <p className="text-lg text-luxury-gray mb-10 max-w-lg leading-relaxed font-light">
              Indulge in a bespoke beauty experience tailored to your unique
              essence. From world-class hair artistry to rejuvenating skin
              rituals, discover the artistry of Najifa.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="/book"
                className="w-full sm:w-auto bg-luxury-slate text-white px-10 py-5 rounded-full font-medium tracking-wide hover:bg-primary transition-all duration-500 shadow-xl shadow-luxury-slate/20 flex items-center justify-center group uppercase text-sm"
              >
                Book Your Appointment

                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>

              <Link
                href="/services"
                className="text-luxury-slate font-semibold tracking-widest text-xs uppercase border-b border-primary/30 pb-1 hover:border-primary transition-all"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 border-t border-luxury-slate/5 pt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div>
              <p className="text-2xl font-serif font-bold text-luxury-slate">
                15k+
              </p>

              <p className="text-[10px] uppercase tracking-widest text-luxury-gray mt-1 font-medium">
                Happy Clients
              </p>
            </div>

            <div>
              <p className="text-2xl font-serif font-bold text-luxury-slate">
                12+
              </p>

              <p className="text-[10px] uppercase tracking-widest text-luxury-gray mt-1 font-medium">
                Expert Stylists
              </p>
            </div>

            <div>
              <p className="text-2xl font-serif font-bold text-luxury-slate">
                100%
              </p>

              <p className="text-[10px] uppercase tracking-widest text-luxury-gray mt-1 font-medium">
                Luxury Guaranteed
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Circle */}
      <motion.div
        className="absolute bottom-10 right-10 hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div className="w-48 h-48 rounded-full border border-primary/20 p-2 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=500"
            alt="Beauty Close-up"
            className="w-full h-full object-cover rounded-full rotate-12"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </section>
  );
}