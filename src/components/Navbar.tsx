"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    
    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Handle scroll
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    router.push("/");
  };

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter text-luxury-slate">
            GLAM & GLOW{" "}
            <span className="text-primary font-normal italic">
              by Najifa
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-primary",
                link.highlight
                  ? "bg-primary text-white px-5 py-2 rounded-full hover:bg-primary/90 shadow-lg shadow-primary/20"
                  : "text-luxury-slate/70",
                pathname === link.path &&
                  !link.highlight &&
                  "text-primary font-semibold"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-luxury-slate/10">
              <Link
                href="/profile"
                className="text-luxury-slate/70 hover:text-primary transition-colors"
                title="Profile"
              >
                <User size={20} />
              </Link>

              <button
                onClick={handleSignOut}
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
          className="md:hidden text-luxury-slate z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-0 bg-white shadow-xl rounded-b-2xl mt-16 mx-4"
          >
            <div className="flex flex-col p-6 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-3 px-4 rounded-xl transition-colors",
                    link.highlight
                      ? "text-primary bg-primary/5"
                      : "text-luxury-slate/70 hover:bg-gray-50",
                    pathname === link.path && !link.highlight && "text-primary bg-primary/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 mt-2 border-t border-luxury-cream">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 text-luxury-slate/70 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <User size={18} />
                      My Profile
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 py-3 px-4 text-red-500 hover:bg-red-50 rounded-xl transition-colors w-full text-left"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 text-luxury-slate/70 hover:bg-gray-50 rounded-xl transition-colors"
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

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-black/20 z-40"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}