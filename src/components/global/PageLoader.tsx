"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2000);
    const removeTimer = setTimeout(() => setRemoved(true), 2600);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`page-loader ${hidden ? "hidden" : ""}`}>
      <div className="loader-content">
        {/* Animated open book with graduation cap */}
        <div className="loader-book-wrapper">
          <svg
            width="120"
            height="100"
            viewBox="0 0 120 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="loader-book-svg"
          >
            {/* Book spine / center */}
            <line
              className="loader-draw loader-draw-1"
              x1="60" y1="20" x2="60" y2="85"
              stroke="#d4af37"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Left page outline */}
            <path
              className="loader-draw loader-draw-2"
              d="M58 22C58 22 30 18 15 25C15 25 15 75 15 80C30 73 58 77 58 77"
              stroke="#047857"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Right page outline */}
            <path
              className="loader-draw loader-draw-3"
              d="M62 22C62 22 90 18 105 25C105 25 105 75 105 80C90 73 62 77 62 77"
              stroke="#047857"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Left page text lines */}
            <line className="loader-draw loader-draw-4" x1="25" y1="38" x2="50" y2="36" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line className="loader-draw loader-draw-4" x1="25" y1="46" x2="48" y2="44" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
            <line className="loader-draw loader-draw-4" x1="25" y1="54" x2="46" y2="52" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
            <line className="loader-draw loader-draw-5" x1="25" y1="62" x2="44" y2="60" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.2" />

            {/* Right page text lines */}
            <line className="loader-draw loader-draw-4" x1="70" y1="36" x2="95" y2="38" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            <line className="loader-draw loader-draw-4" x1="72" y1="44" x2="95" y2="46" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
            <line className="loader-draw loader-draw-4" x1="74" y1="52" x2="95" y2="54" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
            <line className="loader-draw loader-draw-5" x1="76" y1="60" x2="95" y2="62" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" opacity="0.2" />

            {/* Graduation cap on top of the book */}
            <path
              className="loader-draw loader-draw-6"
              d="M60 8L40 18L60 28L80 18Z"
              stroke="#d4af37"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Cap tassel */}
            <path
              className="loader-draw loader-draw-7"
              d="M60 18L60 8M80 18L80 24"
              stroke="#d4af37"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Tassel hanging thread */}
            <path
              className="loader-draw loader-draw-7"
              d="M80 24Q82 28 79 30"
              stroke="#d4af37"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Loading text */}
        <p className="loader-text">Preparing your journey&hellip;</p>

        {/* Loading dots */}
        <div className="loader-dots">
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
        </div>
      </div>
    </div>
  );
}
