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
    <section id="faq" className="py-24 bg-off-white relative">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-brand text-sm font-bold tracking-widest uppercase">
            FAQ
          </span>
          <h2 className="font-clash font-bold text-4xl md:text-5xl text-navy mt-3">
            Got <span className="text-gold-brand">Questions?</span>
          </h2>
          <p className="text-navy/50 text-lg mt-4">
            Everything you need to know about Ascend Academy.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`faq-item ${isOpen ? "open" : ""} rounded-2xl border border-gray-100 overflow-hidden bg-white`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-clash font-semibold text-lg text-navy pr-4">
                    {item.question}
                  </span>
                  <div
                    className={`faq-icon ${isOpen ? "open" : ""} w-8 h-8 bg-emerald-brand/10 rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#047857"
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
                    <p className="px-6 pb-5 text-navy/60 leading-relaxed">
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
