"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURES } from "@/lib/constants";

const featureIcons: Record<string, React.ReactNode> = {
  live: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  revision: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  ),
  exam: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  visual: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  report: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  ),
  papers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  yoga: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v5l-3 5M12 12l3 5M7 20l5-8 5 8" />
    </svg>
  ),
  material: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  parent: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  model: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="why-choose-us" className="py-32 bg-gradient-to-b from-off-white via-[#F4F7FB] to-off-white relative overflow-hidden noise-bg" ref={sectionRef}>
      {/* Visual decorative blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-emerald-brand/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] bg-gold-brand/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left - Sticky heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="text-emerald-brand text-xs font-bold tracking-widest uppercase">
                Why Choose Us
              </span>
              <h2 className="font-clash font-bold text-4xl md:text-5xl text-navy leading-tight tracking-tight">
                The RD Classes <br />
                <span className="text-emerald-brand">Advantage</span>
              </h2>
              <p className="text-navy/60 text-lg leading-relaxed pt-2">
                We don&apos;t just prepare aspirants for exams — we build
                confident, well-prepared individuals ready to secure a
                government job.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-brand to-gold-dark rounded-full mt-8" />
            </motion.div>
          </div>

          {/* Right - Feature cards grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.06,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="feature-card group bg-white/[0.7] backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-premium-sm hover:bg-white hover:border-emerald-brand/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-premium-lg"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-brand/10 to-teal-accent/5 rounded-2xl flex items-center justify-center text-emerald-brand mb-6 shadow-premium-sm group-hover:from-emerald-brand group-hover:to-emerald-dark group-hover:text-white group-hover:scale-105 transition-all duration-500">
                  {featureIcons[feature.icon] || featureIcons.live}
                </div>
                <h3 className="font-clash font-bold text-xl text-navy mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-navy/55 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
