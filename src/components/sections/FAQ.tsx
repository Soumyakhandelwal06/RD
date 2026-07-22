"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 bg-gradient-to-b from-off-white via-[#F5F8FC] to-off-white relative overflow-hidden noise-bg">
      {/* Background radial glows */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-emerald-brand/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-gold-brand/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <span className="text-emerald-brand text-xs font-bold tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl text-navy tracking-tight">
            Got <span className="text-gold-brand">Questions?</span>
          </h2>
          <p className="text-navy/50 text-lg leading-relaxed">
            Everything you need to know about RD Classes.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4.5">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`faq-item ${isOpen ? "open bg-white" : "bg-white/75"} rounded-3xl border border-white/60 hover:border-emerald-brand/10 overflow-hidden shadow-premium-sm hover:shadow-premium-md transition-all duration-300`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-7 py-5.5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-clash font-bold text-lg text-navy pr-4 tracking-wide">
                    {item.question}
                  </span>
                  <div
                    className={`faq-icon ${
                      isOpen ? "open bg-gold-brand text-navy" : "bg-emerald-brand/10 text-emerald-brand"
                    } w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </button>
                <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                  <div className="faq-answer-inner">
                    <p className="px-7 pb-6 text-navy/60 leading-relaxed text-sm md:text-base font-medium">
                      {item.answer}
                    </p>
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
