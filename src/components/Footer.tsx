"use client";

import React from "react";
import { Shield, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#050610] py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-game-cyan" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold tracking-wider text-white text-xs">
              Le Quang Dieu (Dylan)
            </span>
            <span className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">
              Inventory & Supply Chain Analyst
            </span>
          </div>
        </div>

        {/* Status indicator log */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-game-gold" /> Status: Online
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline text-game-green font-bold">● Vercel Deploy Ready</span>
        </div>

        {/* Copyright */}
        <div className="text-[11px] font-mono text-slate-500 text-center md:text-right">
          <p>© {currentYear} Le Quang Dieu (Dylan). All rights reserved.</p>
          <p className="text-[9px] text-slate-600 mt-1 uppercase tracking-widest">
            Built with Next.js, Tailwind v4 & Framer Motion
          </p>
        </div>

      </div>
    </footer>
  );
}
