"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "/reviews" },
    { name: "Book Now", path: "/book", highlight: true },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tighter text-luxury-slate">
            GLAM & GLOW{" "}
            <span className="text-primary font-normal italic">
              by Najifa
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                link.highlight
                  ? "bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark shadow-lg shadow-primary/20"
                  : "text-luxury-slate/70",
                pathname === link.path &&
                  !link.highlight &&
                  "text-primary font-semibold"
              )}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-luxury-slate/10">
              <Link
                href="/profile"
                className="text-luxury-slate/70 hover:text-primary transition-colors"
              >
                <User size={20} />
              </Link>

              <button
                onClick={() => supabase.auth.signOut()}
                className="text-luxury-slate/70 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="flex items-center gap-2 text-sm font-medium text-luxury-slate/70 hover:text-primary transition-colors ml-4 pl-4 border-l border-luxury-slate/10"
            >
              <User size={18} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-luxury-slate"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-luxury-cream mt-4 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2",
                    link.highlight
                      ? "text-primary"
                      : "text-luxury-slate/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-luxury-cream">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-luxury-slate/70"
                    >
                      <User size={18} />
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        supabase.auth.signOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 text-red-500"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-luxury-slate/70"
                  >
                    <User size={18} />
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}