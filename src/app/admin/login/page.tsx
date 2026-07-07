"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Success - Redirect to Dashboard
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080B14] flex items-center justify-center px-6 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] bg-[#047857]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-[#d4af37]/5 rounded-full blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Brand header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold text-3xl shadow-lg shadow-emerald-500/20 mb-4 select-none">
            A
          </div>
          <h1 className="font-clash font-bold text-3xl text-white tracking-wide">
            Ascend Academy
          </h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-widest font-semibold">
            Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-[2.25rem] border border-white/10 p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-gold-brand to-teal-400" />
          
          <h2 className="font-clash font-bold text-xl text-white mb-6">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm font-semibold"
              >
                {error}
              </motion.div>
            )}

            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-white/60 text-xs font-semibold uppercase tracking-wider">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white font-semibold outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all duration-300 placeholder-white/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-white/60 text-xs font-semibold uppercase tracking-wider">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white font-semibold outline-none focus:border-emerald-500/40 focus:bg-white/[0.06] transition-all duration-300 placeholder-white/20"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer disabled:opacity-50 select-none uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>

        {/* Footer info link */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="text-white/30 text-xs hover:text-white/60 transition-colors font-semibold hover:underline"
          >
            ← Back to Main Site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
