"use client";

import { motion } from "framer-motion";

const row1 = [
  { text: "NEET Medical Entrance", color: "text-emerald-600 bg-emerald-50/50 border-emerald-200/50 hover:bg-emerald-50" },
  { text: "JEE Mains & Advanced", color: "text-blue-600 bg-blue-50/50 border-blue-200/50 hover:bg-blue-50" },
  { text: "KEAM Kerala Engineering", color: "text-amber-600 bg-amber-50/50 border-amber-200/50 hover:bg-amber-50" },
  { text: "CBSE Plus Two Science", color: "text-purple-600 bg-purple-50/50 border-purple-200/50 hover:bg-purple-50" },
  { text: "Kerala SSLC (Class 10)", color: "text-red-500 bg-red-50/50 border-red-200/50 hover:bg-red-50" },
  { text: "Foundation Classes (8-10)", color: "text-pink-500 bg-pink-50/50 border-pink-200/50 hover:bg-pink-50" },
  { text: "Plus One Focus Batch", color: "text-slate-600 bg-slate-50/50 border-slate-200/50 hover:bg-slate-50" },
  { text: "Integrated Entrance Program", color: "text-emerald-600 bg-emerald-50/50 border-emerald-200/50 hover:bg-emerald-50" },
  { text: "Olympiads & NTSE", color: "text-blue-600 bg-blue-50/50 border-blue-200/50 hover:bg-blue-50" },
];

const row2 = [
  { text: "Pure & Applied Mathematics", color: "text-blue-600 bg-blue-50/50 border-blue-200/50 hover:bg-blue-50" },
  { text: "Quantum & Classical Physics", color: "text-red-500 bg-red-50/50 border-red-200/50 hover:bg-red-50" },
  { text: "Organic & Physical Chemistry", color: "text-amber-600 bg-amber-50/50 border-amber-200/50 hover:bg-amber-50" },
  { text: "Human Physiology & Biology", color: "text-pink-500 bg-pink-50/50 border-pink-200/50 hover:bg-pink-50" },
  { text: "Computer Science & Python", color: "text-purple-600 bg-purple-50/50 border-purple-200/50 hover:bg-purple-50" },
  { text: "Interactive Live Revision", color: "text-slate-600 bg-slate-50/50 border-slate-200/50 hover:bg-slate-50" },
  { text: "One-on-One Doubt Clearance", color: "text-emerald-600 bg-emerald-50/50 border-emerald-200/50 hover:bg-emerald-50" },
  { text: "Curated Board Study Material", color: "text-blue-600 bg-blue-50/50 border-blue-200/50 hover:bg-blue-50" },
  { text: "Mind Concentration Yoga", color: "text-emerald-600 bg-emerald-50/50 border-emerald-200/50 hover:bg-emerald-50" },
];

export default function ProgramMarquee() {
  return (
    <section className="py-16 bg-off-white border-y border-navy/5 relative overflow-hidden select-none">
      {/* Light gradient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[150px] bg-emerald-brand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <span className="text-emerald-brand text-xs font-bold tracking-widest uppercase">
          Comprehensive Coverage
        </span>
        <h3 className="font-clash font-bold text-3xl md:text-4xl text-navy mt-1">
          Target Programs & Specializations
        </h3>
      </div>

      <div className="marquee-container flex flex-col gap-4 relative z-10">
        {/* Row 1: Left scrolling */}
        <div className="overflow-hidden w-full">
          <div 
            className="flex gap-4 w-max marquee-left"
            style={{ display: "flex", flexDirection: "row", gap: "1rem", width: "max-content" }}
          >
            {[...row1, ...row1, ...row1].map((badge, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:z-20 relative"
              >
                <div 
                  className="animate-badge-float"
                  style={{ animationDelay: `${(idx % 6) * 0.4}s` }}
                >
                  <div className={`flex items-center gap-2 px-6 py-3 rounded-full border shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${badge.color}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    <span className="text-sm font-semibold tracking-wide">{badge.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right scrolling */}
        <div className="overflow-hidden w-full">
          <div 
            className="flex gap-4 w-max marquee-right"
            style={{ display: "flex", flexDirection: "row", gap: "1rem", width: "max-content" }}
          >
            {[...row2, ...row2, ...row2].map((badge, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:z-20 relative"
              >
                <div 
                  className="animate-badge-float"
                  style={{ animationDelay: `${((idx + 3) % 6) * 0.4}s` }}
                >
                  <div className={`flex items-center gap-2 px-6 py-3 rounded-full border shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${badge.color}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    <span className="text-sm font-semibold tracking-wide">{badge.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
