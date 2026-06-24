"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    launchConfetti();
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
    <section id="contact" className="py-24 bg-off-white relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-emerald-brand text-sm font-bold tracking-widest uppercase">
              Get In Touch
            </span>
            <h2 className="font-clash font-bold text-4xl md:text-5xl text-navy mt-3 leading-tight">
              Start Your{" "}
              <span className="relative inline-block">
                Journey
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    className={`svg-draw ${isInView ? "drawn" : ""}`}
                    d="M2 8 C50 2, 100 2, 198 8"
                    stroke="#d4af37"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-navy/50 text-lg mt-4 leading-relaxed max-w-md">
              Take the first step towards academic excellence. Book a free demo class and experience the Ascend difference.
            </p>

            {/* Contact info */}
            <div className="mt-10 space-y-5">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-emerald-brand/10 rounded-xl flex items-center justify-center text-emerald-brand">
                    {info.icon}
                  </div>
                  <span className="text-navy/70 font-medium">{info.label}</span>
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
                className="bg-white rounded-3xl border border-gray-100 p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-emerald-brand rounded-full flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-clash font-bold text-2xl text-navy mb-2">
                  Thank You!
                </h3>
                <p className="text-navy/50">
                  We&apos;ll get back to you within 24 hours to schedule your free demo class.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-emerald-brand font-semibold text-sm hover:underline"
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-xl shadow-black/5 space-y-6"
              >
                <h3 className="font-clash font-bold text-xl text-navy mb-2">
                  Book a Free Demo Class
                </h3>

                {/* Student Name */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    className="form-input w-full bg-gray-50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-navy outline-none"
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
                    placeholder=" "
                    inputMode="tel"
                    className="form-input w-full bg-gray-50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-navy outline-none"
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
                    className="form-input w-full bg-gray-50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-navy outline-none appearance-none"
                    defaultValue=""
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
                  <label htmlFor="student-class" className="floating-label" style={{ top: "8px", transform: "none", fontSize: "11px", color: "#047857", fontWeight: 600 }}>
                    Class
                  </label>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Syllabus Dropdown */}
                <div className="relative">
                  <select
                    required
                    className="form-input w-full bg-gray-50 border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-navy outline-none appearance-none"
                    defaultValue=""
                    id="syllabus"
                  >
                    <option value="" disabled>
                      Select Syllabus
                    </option>
                    <option value="state">State Syllabus</option>
                    <option value="cbse">CBSE</option>
                    <option value="entrance">Entrance (NEET/KEAM)</option>
                  </select>
                  <label htmlFor="syllabus" className="floating-label" style={{ top: "8px", transform: "none", fontSize: "11px", color: "#047857", fontWeight: 600 }}>
                    Syllabus
                  </label>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-sweep w-full bg-emerald-brand text-white font-bold py-4 rounded-xl text-base hover:shadow-lg transition-shadow"
                >
                  Book Free Demo →
                </button>

                <p className="text-center text-navy/30 text-xs">
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
