"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;

        alert("Check your email for confirmation link!");
      }

      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-cream px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-3xl w-full max-w-md shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          {isLogin ? "Welcome Back" : "Join Us"}
        </h1>

        <p className="text-center text-gray-500 mb-8 text-sm">
          Beauty starts with your account
        </p>

        <form onSubmit={handleAuth} className="space-y-5">
          {/* Email */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl">
            <Lock size={18} />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm mt-6">
          {isLogin ? "New here?" : "Already have account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-bold"
          >
            {isLogin ? "Create account" : "Login"}
          </button>
        </p>

        {/* Social */}
        <div className="flex justify-center mt-6">
          <button className="p-3 bg-gray-100 rounded-full">
            <FaGithub size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}