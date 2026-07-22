"use client";

import { useRef, useEffect, useState } from "react";
import { PHILOSOPHY_PANELS } from "@/lib/constants";

export default function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    let ctx: any = null;
    let mounted = true;

    const initGSAP = async () => {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        if (!mounted || !sectionRef.current || !trackRef.current) return;

        setGsapReady(true);

        const track = trackRef.current;
        const totalScroll = track.scrollWidth - window.innerWidth;

        ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${totalScroll}`,
              pin: true,
              scrub: 1.2,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          // Horizontal scroll of panels
          tl.to(track, {
            x: () => -totalScroll,
            ease: "none",
          });

          // Smooth reveal of the final quote
          tl.to("#philosophy-quote", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }, "-=0.15"); // Start animating slightly before track completes horizontal scroll
        }, sectionRef);
      } catch (e) {
        console.warn("GSAP failed to load for Philosophy section:", e);
      }
    };

    const timer = setTimeout(initGSAP, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  const quote = "Built by Excellence, Driven by Heart.";

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="bg-gradient-to-b from-[#0A0D18] to-[#05070A] relative noise-bg"
      style={{ overflow: gsapReady ? "visible" : "hidden" }}
    >
      {/* Background decoration radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[50vw] h-[50vw] bg-emerald-brand/5 rounded-full blur-[140px] pointer-events-none" />

      <div
        ref={trackRef}
        className="flex"
        style={{
          width: `${(PHILOSOPHY_PANELS.length + 1) * 100}vw`,
          minHeight: "100vh",
        }}
      >
        {PHILOSOPHY_PANELS.map((panel, i) => (
          <div
            key={panel.title}
            className="w-screen min-h-screen flex items-center justify-center px-8 md:px-20 relative flex-shrink-0"
          >
            {/* Panel number with subtle stroke outline */}
            <div className="absolute top-24 left-8 md:left-24 text-white/[0.02] font-clash font-bold text-[180px] md:text-[280px] leading-none select-none pointer-events-none tracking-tighter" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="max-w-2xl relative z-10 space-y-6">
              <span className="text-gold-brand text-xs font-bold tracking-widest uppercase block">
                {panel.subtitle}
              </span>
              <h2 className="font-clash font-bold text-4xl md:text-6xl text-white leading-tight tracking-tight">
                {panel.title}
              </h2>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                {panel.description}
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-brand to-gold-dark rounded-full mt-8" />
            </div>
          </div>
        ))}

        {/* Final quote panel */}
        <div className="w-screen min-h-screen flex items-center justify-center px-8 md:px-20 flex-shrink-0 relative">
          {/* Subtle glow behind quote */}
          <div className="absolute w-96 h-96 bg-gold-brand/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl text-center relative z-10 px-8 py-12 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-xl shadow-premium-lg">
            <div className="text-gold-brand/15 text-glow-orange font-clash text-[100px] md:text-[140px] leading-none mb-2">
              &ldquo;
            </div>
            <h2
              id="philosophy-quote"
              className="font-clash font-bold text-3xl md:text-5xl text-white leading-snug tracking-tight opacity-0 translate-y-8 px-4"
            >
              {quote}
            </h2>
            <div className="mt-8 text-white/40 text-xs font-bold tracking-widest uppercase">
              — The RD Classes Promise
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
