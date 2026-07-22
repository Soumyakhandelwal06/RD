"use client";

import { BRAND, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05070B] border-t border-white/5 noise-bg">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-brand to-teal-accent rounded-xl flex items-center justify-center shadow-lg shadow-emerald-brand/10">
                <span className="text-white font-clash font-bold text-xl">R</span>
              </div>
              <div>
                <span className="text-white font-clash font-bold text-lg block tracking-wide">
                  {BRAND.name}
                </span>
                <span className="text-gold-brand text-[9px] font-semibold tracking-widest uppercase block mt-0.5">
                  {BRAND.tagline}
                </span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mt-4">
              Ajmer&apos;s trusted coaching institute for Bank, SSC, and Railway exam aspirants. Expert faculty, structured courses, and result-oriented preparation — all under one roof.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-clash font-bold text-sm uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/45 text-sm hover:text-gold-brand transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-clash font-bold text-sm uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4 text-white/45 text-sm">
              <li className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-emerald-light group-hover:bg-white/[0.08] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span>{BRAND.phone}</span>
              </li>
              <li className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-emerald-light group-hover:bg-white/[0.08] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span>{BRAND.email}</span>
              </li>
              <li className="flex items-start gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-emerald-light mt-0.5 group-hover:bg-white/[0.08] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span>{BRAND.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-16 pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-wider">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/30 text-xs font-semibold uppercase tracking-wider hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/30 text-xs font-semibold uppercase tracking-wider hover:text-white/60 transition-colors">
              Terms of Service
            </a>
            <a href="/admin/login" className="text-white/30 text-xs font-semibold uppercase tracking-wider hover:text-emerald-light transition-colors">
              Admin Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
