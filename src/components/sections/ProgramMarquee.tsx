"use client";

import { motion } from "framer-motion";

const row1 = [
  { text: "SBI PO", color: "text-[#2563EB] border-[#2563EB]/15 bg-white/60 hover:border-[#2563EB]/40 hover:bg-white" },
  { text: "IBPS Clerk", color: "text-[#3B82F6] border-[#3B82F6]/15 bg-white/60 hover:border-[#3B82F6]/40 hover:bg-white" },
  { text: "IBPS PO", color: "text-[#F97316] border-[#F97316]/15 bg-white/60 hover:border-[#F97316]/40 hover:bg-white" },
  { text: "IBPS RRB", color: "text-purple-600 border-purple-600/15 bg-white/60 hover:border-purple-600/40 hover:bg-white" },
  { text: "SBI Clerk", color: "text-red-500 border-red-500/15 bg-white/60 hover:border-red-500/40 hover:bg-white" },
  { text: "SSC CGL", color: "text-pink-500 border-pink-500/15 bg-white/60 hover:border-pink-500/40 hover:bg-white" },
  { text: "SSC CHSL", color: "text-slate-600 border-slate-200/50 bg-white/60 hover:bg-white" },
  { text: "SSC MTS", color: "text-[#2563EB] border-[#2563EB]/15 bg-white/60 hover:border-[#2563EB]/40 hover:bg-white" },
  { text: "SSC GD", color: "text-[#3B82F6] border-[#3B82F6]/15 bg-white/60 hover:border-[#3B82F6]/40 hover:bg-white" },
];

const row2 = [
  { text: "SSC JE", color: "text-[#3B82F6] border-[#3B82F6]/15 bg-white/60 hover:border-[#3B82F6]/40 hover:bg-white" },
  { text: "Railway NTPC", color: "text-red-500 border-red-500/15 bg-white/60 hover:border-red-500/40 hover:bg-white" },
  { text: "Railway Group D", color: "text-[#F97316] border-[#F97316]/15 bg-white/60 hover:border-[#F97316]/40 hover:bg-white" },
  { text: "Railway ALP", color: "text-pink-500 border-pink-500/15 bg-white/60 hover:border-pink-500/40 hover:bg-white" },
  { text: "RPF Constable", color: "text-purple-600 border-purple-600/15 bg-white/60 hover:border-purple-600/40 hover:bg-white" },
  { text: "Railway Technician", color: "text-slate-600 border-slate-200/50 bg-white/60 hover:bg-white" },
  { text: "Quantitative Aptitude", color: "text-[#2563EB] border-[#2563EB]/15 bg-white/60 hover:border-[#2563EB]/40 hover:bg-white" },
  { text: "Reasoning Ability", color: "text-[#3B82F6] border-[#3B82F6]/15 bg-white/60 hover:border-[#3B82F6]/40 hover:bg-white" },
  { text: "General Awareness", color: "text-[#2563EB] border-[#2563EB]/15 bg-white/60 hover:border-[#2563EB]/40 hover:bg-white" },
];


export default function ProgramMarquee() {
  return (
    <section className="py-24 bg-gradient-to-b from-off-white via-[#F1F5F9] to-off-white border-y border-navy/5 relative overflow-hidden select-none noise-bg">
      {/* Light gradient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-emerald-brand/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="text-emerald-brand text-xs font-bold tracking-widest uppercase">
          Comprehensive Coverage
        </span>
        <h3 className="font-clash font-bold text-3xl md:text-4xl text-navy tracking-tight mt-2">
          Target Programs & Specializations
        </h3>
      </div>

      <div className="marquee-container flex flex-col gap-5 relative z-10">
        {/* Row 1: Left scrolling */}
        <div className="overflow-hidden w-full">
          <div 
            className="flex gap-4 w-max marquee-left"
            style={{ display: "flex", flexDirection: "row", gap: "1rem", width: "max-content" }}
          >
            {[...row1, ...row1, ...row1].map((badge, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex-shrink-0 transition-all duration-300 hover:scale-105 hover:z-20 relative"
              >
                <div 
                  className="animate-badge-float"
                  style={{ animationDelay: `${(idx % 6) * 0.4}s` }}
                >
                  <div className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full border shadow-premium-sm backdrop-blur-md transition-colors duration-300 ${badge.color}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
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
                className="flex-shrink-0 transition-all duration-300 hover:scale-105 hover:z-20 relative"
              >
                <div 
                  className="animate-badge-float"
                  style={{ animationDelay: `${((idx + 3) % 6) * 0.4}s` }}
                >
                  <div className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full border shadow-premium-sm backdrop-blur-md transition-colors duration-300 ${badge.color}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
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
