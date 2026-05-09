'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, ChevronRight, Settings, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth');
        return;
      }

      setUser(user);

      const { data } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setAppointments(data || []);
      setLoading(false);
    }

    getProfile();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="pt-32 text-center text-luxury-gray">
        Tailoring your experience...
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-luxury-cream min-h-screen">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-luxury-slate rounded-full flex items-center justify-center text-white italic font-serif text-3xl border-4 border-white shadow-xl">
              {user?.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-serif">
                Welcome, <span className="text-primary italic">Vanity Member</span>
              </h1>
              <p className="text-luxury-gray text-sm font-light mt-1">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="p-4 bg-white rounded-2xl text-luxury-slate border border-luxury-cream hover:bg-luxury-cream transition-colors shadow-sm">
              <Settings size={20} />
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-4 bg-luxury-slate text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-red-500 transition-colors shadow-lg"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl uppercase tracking-widest font-bold text-luxury-slate/60 mb-6 flex items-center gap-3">
              <Calendar size={18} /> Your Appointments
            </h2>

            {appointments.length === 0 ? (
              <div className="bg-white p-12 rounded-[3rem] text-center border border-luxury-cream shadow-sm">
                <p className="text-luxury-gray font-light mb-8">
                  You haven't booked any transformations yet.
                </p>
                <button
                  onClick={() => router.push('/services')}
                  className="bg-primary text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest"
                >
                  Explore Services
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-[2.5rem] border border-luxury-cream shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-luxury-cream rounded-2xl flex items-center justify-center text-primary">
                        <Clock size={24} />
                      </div>

                      <div>
                        <h4 className="font-bold text-luxury-slate">
                          Appointment Request
                        </h4>
                        <p className="text-xs text-luxury-gray mt-1 uppercase tracking-tighter">
                          {apt.date
                            ? new Date(apt.date).toLocaleDateString()
                            : 'No date'}{' '}
                          at {apt.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full",
                          apt.status === 'confirmed'
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        )}
                      >
                        {apt.status}
                      </span>
                      <ChevronRight size={20} className="text-luxury-cream group-hover:text-primary transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">

            <div className="bg-primary text-white p-10 rounded-[3rem] shadow-xl">
              <h3 className="text-2xl mb-4">Elite Status</h3>
              <p className="text-sm text-white/70 font-light mb-6 leading-relaxed">
                You are 2 bookings away from becoming a "Glam Gold" member.
              </p>
              <div className="w-full bg-white/20 h-1 rounded-full mb-2">
                <div className="bg-white h-full w-2/3 rounded-full"></div>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest">
                75% to next tier
              </p>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-luxury-cream text-center shadow-sm">
              <div className="w-16 h-16 bg-luxury-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <User size={24} className="text-luxury-slate" />
              </div>
              <h4 className="font-bold mb-2">Refine Profile</h4>
              <p className="text-sm text-luxury-gray font-light mb-6">
                Keep your beauty preferences updated for better consultations.
              </p>
              <button className="text-xs font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-1">
                Edit Details
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}