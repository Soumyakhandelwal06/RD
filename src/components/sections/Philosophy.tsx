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
      className="bg-navy relative"
      style={{ overflow: gsapReady ? "visible" : "hidden" }}
    >
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
            {/* Panel number */}
            <div className="absolute top-20 left-8 md:left-20 text-white/5 font-clash font-bold text-[150px] md:text-[200px] leading-none select-none pointer-events-none">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="max-w-2xl relative z-10">
              <span className="text-gold-brand text-sm font-bold tracking-widest uppercase block mb-4">
                {panel.subtitle}
              </span>
              <h2 className="font-clash font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
                {panel.title}
              </h2>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                {panel.description}
              </p>
              <div className="w-20 h-1 bg-gold-brand rounded-full mt-8" />
            </div>
          </div>
        ))}

        {/* Final quote panel */}
        <div className="w-screen min-h-screen flex items-center justify-center px-8 md:px-20 flex-shrink-0">
          <div className="max-w-3xl text-center">
            <div className="text-gold-brand/20 font-clash text-[80px] md:text-[120px] leading-none mb-4">
              &ldquo;
            </div>
            <h2
              id="philosophy-quote"
              className="font-clash font-bold text-3xl md:text-5xl text-white leading-tight opacity-0 translate-y-8"
            >
              {quote}
            </h2>
            <div className="mt-8 text-white/40 text-sm font-medium tracking-wider uppercase">
              — The Ascend Academy Promise
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
