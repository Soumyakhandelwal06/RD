"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";
import { STATS } from "@/lib/constants";

const StatIcon = ({ icon }: { icon: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    graduation: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    calendar: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    chart: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    users: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  };
  return (
    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-3">
      {iconMap[icon] || iconMap.graduation}
    </div>
  );
};

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-navy diagonal-lines py-20" id="stats">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="group text-center relative">
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gold-brand/20" />
              )}
              <div className="flex justify-center">
                <StatIcon icon={stat.icon} />
              </div>
              <div className="text-white font-clash font-bold text-4xl md:text-5xl mb-2">
                {isInView ? (
                  <CountUp end={stat.number} duration={2.5} delay={i * 0.2} separator="," />
                ) : (
                  "0"
                )}
                <span className="text-gold-brand">{stat.suffix}</span>
              </div>
              <p className="text-white/50 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
