"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { BRAND } from "@/lib/constants";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-emerald-brand/30 border-t-emerald-brand rounded-full animate-spin" />
    </div>
  ),
});

const headlineWords = ["Engineering", "Tomorrow's", "Winners"];
const subtext = "Kerala's premier coaching centre transforming students into achievers through innovative teaching, proven systems, and unwavering dedication.";

const statCards = [
  { number: "1330+", label: "A+ Students" },
  { number: "15+", label: "Years" },
  { number: "98%", label: "Result Rate" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [dims, setDims] = useState({ width: 0, height: 0, left: 0, top: 0 });

  useEffect(() => {
    setLoaded(true);
    // Animated dot grid background
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.005;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const spacing = 40;
      const cx = w / 2;
      const cy = h / 2;

      for (let x = 0; x < w; x += spacing) {
        for (let y = 0; y < h; y += spacing) {
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.sqrt(cx * cx + cy * cy);
          const pulse = Math.sin(time * 2 - dist * 0.005) * 0.5 + 0.5;
          const alpha = 0.08 + pulse * 0.12;
          const radius = 1 + pulse * 0.8;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${alpha * (1 - dist / maxDist * 0.5)})`;
          ctx.fill();
        }
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();

    // ResizeObserver for tagline text dimensions
    const textEl = textRef.current;
    let observer: ResizeObserver | null = null;
    if (textEl) {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDims({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
            left: 0,
            top: 0,
          });
        }
      });
      observer.observe(textEl);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-navy overflow-hidden flex items-center"
    >
      {/* Dot grid background */}
      <canvas ref={canvasRef} className="dot-grid-canvas" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-[#2563EB]/8 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-center pt-28 pb-12 lg:pt-28 lg:pb-0">
        {/* Left side (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Brand badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2 }}
            className="inline-flex items-center gap-2 bg-emerald-brand/15 border border-emerald-brand/30 rounded-full px-4 py-1.5"
          >
            <div className="w-2 h-2 bg-emerald-brand rounded-full animate-pulse" />
            <span className="text-emerald-brand text-xs font-semibold tracking-wider uppercase">
              {BRAND.name}
            </span>
          </motion.div>

          {/* Headline - word by word with overlay loop covering the whole tagline */}
          <h1 className="relative font-clash font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] pb-3 pr-8 select-none">
            <span ref={textRef} className="inline-flex flex-col items-start relative w-fit">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 2.4 + i * 0.15,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block ${
                    i === 1 ? "text-gold-brand" : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}

              {dims.width > 0 && (
                <svg
                  className="absolute pointer-events-none z-10"
                  style={{
                    left: -(dims.width * 0.16),
                    top: -(dims.height * 0.125),
                    width: dims.width * 1.32,
                    height: dims.height * 1.25,
                  }}
                  viewBox="0 0 600 350"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={loaded ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{
                      delay: 3.3, // Draw exactly after headline words have animated in
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    d="M 250,30 C 400,20 580,75 580,175 C 580,275 450,325 300,325 C 150,325 20,275 20,175 C 20,75 200,25 300,25 C 350,25 400,30 420,40"
                    stroke="var(--color-emerald-brand)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed"
          >
            {subtext}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 3.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="glow-gold bg-gold-brand text-navy font-bold text-base px-8 py-4 rounded-full hover:bg-gold-light transition-all inline-flex items-center gap-2"
            >
              Book Free Demo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <button className="group border-2 border-white/20 text-white font-semibold text-base px-8 py-4 rounded-full hover:border-white/50 transition-all inline-flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
              Watch Our Story
            </button>
          </motion.div>

          {/* Floating Stat Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.7 + i * 0.15 }}
                className="stat-card bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3"
              >
                <span className="text-gold-brand font-clash font-bold text-2xl">
                  {stat.number}
                </span>
                <span className="text-white/50 text-sm font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right side (40%) — 3D Scene */}
        <div className="lg:col-span-2 h-[400px] lg:h-[550px] relative">
          <HeroScene />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-gold-brand rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
