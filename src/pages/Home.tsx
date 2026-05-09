'use client';

import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { Scissors, Sparkles, User, Star } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    name: 'Hair Couture',
    icon: Scissors,
    desc: 'From precision cuts to artistic coloring.',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a294308ed?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Skincare Rituals',
    icon: User,
    desc: 'Bespoke facials and advanced skin rejuvenation.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Bridal Haven',
    icon: Sparkles,
    desc: 'Expert bridal makeup and full vanity services.',
    image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Home() {
  return (
    <div className="bg-luxury-cream">
      <Hero />

      {/* Services Highlight */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl mb-6">
              Unveiling our <span className="italic text-primary">Mastery</span>
            </h2>
            <p className="text-luxury-gray leading-relaxed font-light">
              We believe beauty is an art form. Our salon combines traditional expertise
              with modern techniques to provide an unparalleled experience in luxury beauty.
            </p>
          </div>

          <Link
            href="/services"
            className="text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1 group"
          >
            View All Services{' '}
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[450px] overflow-hidden rounded-3xl mb-6 bg-luxury-slate">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-luxury-slate to-transparent">
                  <div className="p-3 bg-primary rounded-full w-fit mb-4 text-white shadow-lg shadow-primary/30">
                    <cat.icon size={20} />
                  </div>
                  <h3 className="text-2xl text-white mb-2">{cat.name}</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-luxury-slate py-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-full overflow-hidden gold-border p-4">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800"
                alt="Our Philosophy"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute -bottom-10 -right-10 bg-primary text-white p-10 rounded-full flex flex-col items-center justify-center shadow-2xl rotate-12 hidden md:flex">
              <Star size={30} className="mb-2 fill-white" />
              <p className="text-xs font-bold tracking-widest uppercase">Certified</p>
              <p className="text-[10px] uppercase font-medium">Beauty Masters</p>
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-4xl md:text-6xl mb-8 leading-tight">
              The Art of <br />
              <span className="text-primary italic">Transformation</span>
            </h2>

            <p className="text-white/70 font-light leading-loose mb-10 text-lg">
              "Glam & Glow by Najifa" isn't just a salon; it's a sanctuary where
              we celebrate individual beauty.
            </p>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-3xl font-serif text-primary">0%</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
                  Harmful Chemicals
                </p>
              </div>

              <div className="h-10 w-[1px] bg-white/10"></div>

              <div>
                <p className="text-3xl font-serif text-primary">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
                  Vegan Products
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-[3rem] premium-gradient p-16 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              Ready for your <br />
              <span className="text-primary italic">Radiant Glow?</span>
            </h2>

            <p className="text-white/70 mb-10 max-w-lg mx-auto font-light">
              Join the elite circle of women who trust Najifa for their most important moments.
            </p>

            <Link
              href="/book"
              className="inline-block bg-white text-luxury-slate px-12 py-5 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl"
            >
              Secure Your Slot Now
            </Link>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </motion.div>
      </section>
    </div>
  );
}