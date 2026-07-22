"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

const StatIcon = ({ icon }: { icon: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    graduation: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    calendar: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    chart: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    users: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };
  return (
    <div className="w-16 h-16 bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/10 rounded-2xl flex items-center justify-center text-gold-brand mb-5 shadow-premium-sm group-hover:scale-110 group-hover:border-gold-brand/30 transition-all duration-500">
      {iconMap[icon] || iconMap.graduation}
    </div>
  );
};

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-gradient-to-b from-[#12192A] to-[#0A0D18] py-28 border-t border-white/5 noise-bg" id="stats">
      {/* Background decoration blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-emerald-brand/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-3xl p-8 text-center backdrop-blur-md shadow-premium-md transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex justify-center">
                <StatIcon icon={stat.icon} />
              </div>
              <p className="text-white font-clash font-bold text-xl md:text-2xl mb-2.5 leading-snug tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
