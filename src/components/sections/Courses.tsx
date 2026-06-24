"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COURSES } from "@/lib/constants";

export default function Courses() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="courses" className="py-24 bg-off-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-brand/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-brand text-sm font-bold tracking-widest uppercase">
            Our Programs
          </span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl text-navy mt-3">
            Choose Your <span className="text-gold-brand">Path</span>
          </h2>
          <p className="text-navy/50 text-lg mt-4 max-w-2xl mx-auto">
            Tailored coaching programs for every academic goal — from board exams to competitive entrances.
          </p>
        </motion.div>

        {/* Course cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`card-flip ${course.featured ? "md:-mt-8 md:scale-105" : ""}`}
            >
              <div className="card-flip-inner relative" style={{ minHeight: "380px" }}>
                {/* Front */}
                <div
                  className={`card-flip-front absolute inset-0 bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg ${
                    course.featured ? "ring-2 ring-gold-brand" : "border border-gray-100"
                  }`}
                >
                  {course.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-brand text-navy text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${course.color}15` }}
                  >
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={course.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <h3 className="font-clash font-bold text-2xl text-navy mb-2">
                    {course.name}
                  </h3>
                  <p className="text-navy/50 text-sm mb-6">{course.subtitle}</p>
                  <span className="text-emerald-brand text-sm font-semibold flex items-center gap-1">
                    Hover to explore
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Back */}
                <div
                  className="card-flip-back absolute inset-0 rounded-3xl p-8 flex flex-col justify-between text-white"
                  style={{ backgroundColor: course.color }}
                >
                  <div>
                    <h3 className="font-clash font-bold text-2xl mb-4">
                      {course.name}
                    </h3>
                    <ul className="space-y-3">
                      {course.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-white/90">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {f}
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
                    className="mt-6 bg-white text-navy font-bold text-center py-3 rounded-xl hover:bg-white/90 transition-colors block"
                  >
                    Explore Course →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
