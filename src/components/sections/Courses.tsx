"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COURSES } from "@/lib/constants";

const courseThemes: Record<string, { gradient: string; accent: string; text: string; bg: string }> = {
  state: {
    gradient: "from-[#2563EB] to-[#1D4ED8]",
    accent: "#2563EB",
    text: "text-[#2563EB]",
    bg: "bg-[#2563EB]/10",
  },
  cbse: {
    gradient: "from-[#F97316] to-[#EA580C]",
    accent: "#F97316",
    text: "text-[#F97316]",
    bg: "bg-[#F97316]/10",
  },
  entrance: {
    gradient: "from-[#06B6D4] to-[#0891B2]",
    accent: "#06B6D4",
    text: "text-[#06B6D4]",
    bg: "bg-[#06B6D4]/10",
  },
};

export default function Courses() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="courses" className="py-32 bg-off-white relative overflow-hidden noise-bg">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-brand/5 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gold-brand/5 rounded-full blur-[130px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 space-y-4"
        >
          <span className="text-emerald-brand text-xs font-bold tracking-widest uppercase">
            Our Programs
          </span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl text-navy tracking-tight">
            Choose Your <span className="text-gold-brand">Path</span>
          </h2>
          <p className="text-navy/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Tailored coaching programs for every academic goal — from board exams to competitive entrances.
          </p>
        </motion.div>

        {/* Course cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {COURSES.map((course, i) => {
            const theme = courseThemes[course.id] || courseThemes.state;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className={`card-flip h-full min-h-[420px] ${
                  course.featured ? "md:-mt-6 md:mb-6" : ""
                }`}
              >
                <div className="card-flip-inner relative w-full h-full min-h-[420px]">
                  {/* Front */}
                  <div
                    className={`card-flip-front absolute inset-0 bg-white/[0.8] backdrop-blur-md rounded-3xl p-8 flex flex-col items-center justify-between text-center shadow-premium-md transition-all duration-500 hover:shadow-premium-lg ${
                      course.featured ? "border-2 border-gold-brand/80" : "border border-white/50"
                    }`}
                  >
                    {course.featured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-brand to-gold-dark text-navy text-[10px] font-bold tracking-widest uppercase px-4.5 py-1.5 rounded-full shadow-md shadow-gold-brand/20">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="w-full flex flex-col items-center mt-4">
                      {/* Icon */}
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-premium-sm"
                        style={{ backgroundColor: `${theme.accent}12`, border: `1px solid ${theme.accent}20` }}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      </div>
                      
                      <h3 className="font-clash font-bold text-2xl text-navy mb-2 tracking-wide">
                        {course.name}
                      </h3>
                      <p className="text-navy/45 text-xs font-semibold uppercase tracking-wider">{course.subtitle}</p>
                    </div>

                    <span className="text-emerald-brand text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer pb-2 group">
                      Hover to explore
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>

                  {/* Back */}
                  <div
                    className={`card-flip-back absolute inset-0 rounded-3xl p-8 flex flex-col justify-between text-white shadow-premium-lg bg-gradient-to-br ${theme.gradient}`}
                  >
                    <div>
                      <h3 className="font-clash font-bold text-2xl mb-2 tracking-wide">
                        {course.name}
                      </h3>
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-6">{course.subtitle}</p>
                      
                      <ul className="space-y-3.5">
                        {course.features.map((f) => (
                          <li key={f} className="flex items-start gap-3.5 text-sm text-white/95">
                            <div className="mt-1 w-4 h-4 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="font-medium">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-6 bg-white text-navy font-bold text-center py-3.5 rounded-xl hover:bg-[#F8FAFC] active:scale-95 transition-all duration-300 shadow-premium-md text-sm uppercase tracking-wider"
                    >
                      Explore Course
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
