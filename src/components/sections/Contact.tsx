"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const launchConfetti = useCallback(() => {
    const colors = ["#047857", "#d4af37", "#e5c158", "#10B981", "#aa8212", "#ffffff"];
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          studentClass,
          syllabus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit demo request.");
      }

      setSubmitted(true);
      launchConfetti();
      setName("");
      setPhone("");
      setStudentClass("");
      setSyllabus("");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: BRAND.phone,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: BRAND.email,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: BRAND.address,
    },
  ];

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-[#F3F6FB] via-off-white to-[#F0F4FA] relative overflow-hidden noise-bg">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
          }}
        />
      ))}

      {/* Radial glow background spots */}
      <div className="absolute top-[20%] left-[-15%] w-[450px] h-[450px] bg-emerald-brand/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[400px] h-[400px] bg-teal-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-emerald-brand text-xs font-bold tracking-widest uppercase">
              Get In Touch
            </span>
            <h2 className="font-clash font-bold text-4xl md:text-5xl text-navy leading-tight tracking-tight">
              Start Your{" "}
              <span className="relative inline-block pb-1">
                Journey
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    className={`svg-draw ${isInView ? "drawn" : ""}`}
                    d="M2 8 C50 2, 100 2, 198 8"
                    stroke="#d4af37"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-navy/55 text-lg leading-relaxed max-w-md">
              Take the first step towards academic excellence. Book a free demo class and experience the Ascend difference.
            </p>

            {/* Contact info */}
            <div className="mt-12 space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-5 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-white to-white/40 border border-navy/5 rounded-2xl flex items-center justify-center text-emerald-brand shadow-premium-sm group-hover:scale-105 transition-all duration-300">
                    {info.icon}
                  </div>
                  <span className="text-navy/85 font-semibold text-sm tracking-wide">{info.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/[0.8] backdrop-blur-xl rounded-[2.25rem] border border-white/80 p-12 text-center h-full flex flex-col items-center justify-center shadow-premium-lg"
              >
                <div className="w-16 h-16 bg-emerald-brand rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-brand/20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-clash font-bold text-2xl text-navy mb-2">
                  Thank You!
                </h3>
                <p className="text-navy/55 max-w-sm">
                  We&apos;ll get back to you within 24 hours to schedule your free demo class.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-emerald-brand font-bold text-sm hover:underline hover:text-emerald-light transition-colors"
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/[0.7] backdrop-blur-xl rounded-[2.25rem] border border-white/85 p-8 md:p-11 shadow-premium-lg space-y-6"
              >
                <h3 className="font-clash font-bold text-2xl text-navy mb-2 tracking-wide">
                  Book a Free Demo Class
                </h3>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-2xl p-4 text-xs font-semibold"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Student Name */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    className="form-input w-full bg-white/45 border border-navy/10 rounded-2xl px-5 pt-6.5 pb-2.5 text-navy font-semibold outline-none focus:bg-white focus:border-emerald-brand/40 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
                    id="student-name"
                  />
                  <label htmlFor="student-name" className="floating-label">
                    Student Name
                  </label>
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder=" "
                    inputMode="tel"
                    className="form-input w-full bg-white/45 border border-navy/10 rounded-2xl px-5 pt-6.5 pb-2.5 text-navy font-semibold outline-none focus:bg-white focus:border-emerald-brand/40 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
                    id="phone"
                  />
                  <label htmlFor="phone" className="floating-label">
                    Phone Number
                  </label>
                </div>

                {/* Class Dropdown */}
                <div className="relative">
                  <select
                    required
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="form-input w-full bg-white/45 border border-navy/10 rounded-2xl px-5 pt-6.5 pb-2.5 text-navy font-semibold outline-none focus:bg-white focus:border-emerald-brand/40 transition-all duration-300 appearance-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
                    id="student-class"
                  >
                    <option value="" disabled>
                      Select Class
                    </option>
                    {[8, 9, 10, 11, 12].map((c) => (
                      <option key={c} value={c}>
                        Class {c}
                      </option>
                    ))}
                    <option value="entrance">Entrance Prep</option>
                  </select>
                  <label htmlFor="student-class" className="floating-label" style={{ top: "8px", transform: "none", fontSize: "11px", color: "var(--color-emerald-brand)", fontWeight: 600 }}>
                    Class
                  </label>
                  <div className="absolute right-5 top-[55%] -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Syllabus Dropdown */}
                <div className="relative">
                  <select
                    required
                    value={syllabus}
                    onChange={(e) => setSyllabus(e.target.value)}
                    className="form-input w-full bg-white/45 border border-navy/10 rounded-2xl px-5 pt-6.5 pb-2.5 text-navy font-semibold outline-none focus:bg-white focus:border-emerald-brand/40 transition-all duration-300 appearance-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.01)]"
                    id="syllabus"
                  >
                    <option value="" disabled>
                      Select Syllabus
                    </option>
                    <option value="state">State Syllabus</option>
                    <option value="cbse">CBSE</option>
                    <option value="entrance">Entrance (NEET/KEAM)</option>
                  </select>
                  <label htmlFor="syllabus" className="floating-label" style={{ top: "8px", transform: "none", fontSize: "11px", color: "var(--color-emerald-brand)", fontWeight: 600 }}>
                    Syllabus
                  </label>
                  <div className="absolute right-5 top-[55%] -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-sweep w-full bg-gradient-to-r from-emerald-brand to-emerald-dark text-white font-bold py-4.5 rounded-2xl text-base hover:shadow-lg hover:shadow-emerald-brand/20 transition-all duration-300 cursor-pointer shadow-premium-sm uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Book Free Demo Class"
                  )}
                </button>

                <p className="text-center text-navy/30 text-xs font-semibold uppercase tracking-wider">
                  No commitment required. 100% free.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
