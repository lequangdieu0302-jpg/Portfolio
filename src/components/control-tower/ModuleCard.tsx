"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Wallet, 
  LineChart, 
  Map, 
  Rocket, 
  BookOpen, 
  ShieldCheck, 
  ArrowUpRight,
  Lock
} from "lucide-react";
import Link from "next/link";

interface ModuleData {
  name: string;
  description: string;
  status: "Active" | "Planned";
  link: string;
  icon: React.ComponentType<any>;
  color: string;
  borderColor: string;
  glow: string;
  btnText: string;
}

export default function ModuleCard() {
  const modules: ModuleData[] = [
    {
      name: "Portfolio Module",
      description: "Showcase my Power BI, VBA, supply chain automation, and data analytics case studies.",
      status: "Active",
      link: "/portfolio",
      icon: Briefcase,
      color: "text-game-cyan",
      borderColor: "border-game-cyan/30 bg-game-cyan/5",
      glow: "shadow-[0_0_20px_rgba(0,242,254,0.15)]",
      btnText: "Open Portfolio",
    },
    {
      name: "Income Tracker",
      description: "Log and track monthly salary, allowances, bonuses, and side-hustle revenue audits.",
      status: "Planned",
      link: "/coming-soon",
      icon: Wallet,
      color: "text-game-gold",
      borderColor: "border-game-gold/30 bg-game-gold/5",
      glow: "shadow-[0_0_20px_rgba(255,211,42,0.15)]",
      btnText: "Coming Soon",
    },
    {
      name: "Investment Hub",
      description: "Monitor personal investment allocations, tickers watchlist, and fund growth stats.",
      status: "Planned",
      link: "/coming-soon",
      icon: LineChart,
      color: "text-game-blue",
      borderColor: "border-game-blue/30 bg-game-blue/5",
      glow: "shadow-[0_0_20px_rgba(0,114,255,0.15)]",
      btnText: "Coming Soon",
    },
    {
      name: "Travel Planner",
      description: "Explore interactive Vietnam travel map, log check-in locations with photos, dates and memories.",
      status: "Active",
      link: "/travel",
      icon: Map,
      color: "text-game-green",
      borderColor: "border-game-green/30 bg-game-green/5",
      glow: "shadow-[0_0_20px_rgba(0,255,135,0.15)]",
      btnText: "Open Travel Map",
    },
    {
      name: "Side Hustle Lab",
      description: "Manage business ideas, automated tools development plans, tasks, and launch trackers.",
      status: "Planned",
      link: "/coming-soon",
      icon: Rocket,
      color: "text-rose-400",
      borderColor: "border-rose-500/30 bg-rose-500/5",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
      btnText: "Coming Soon",
    },
    {
      name: "Knowledge Vault",
      description: "Store learning roadmaps, reference databases, interview prep guides, and English logs.",
      status: "Planned",
      link: "/coming-soon",
      icon: BookOpen,
      color: "text-game-purple",
      borderColor: "border-game-purple/30 bg-game-purple/5",
      glow: "shadow-[0_0_20px_rgba(123,47,247,0.15)]",
      btnText: "Coming Soon",
    },
  ];

  return (
    <section id="system-modules" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
          Command Gateways
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
          System Modules
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {modules.map((mod, idx) => {
          const Icon = mod.icon;
          const isActive = mod.status === "Active";
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-panel glass-panel-hover p-6 rounded-2xl border ${mod.borderColor} flex flex-col justify-between ${mod.glow} relative group`}
            >
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/10 group-hover:border-game-cyan/40 transition-colors" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/10 group-hover:border-game-cyan/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/10 group-hover:border-game-cyan/40 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/10 group-hover:border-game-cyan/40 transition-colors" />

              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    Gateway Module
                  </span>
                  <span className={`text-[8px] font-mono font-bold px-2.5 py-0.5 rounded border uppercase flex items-center gap-1 ${
                    isActive 
                      ? "text-game-green border-game-green/30 bg-game-green/10" 
                      : "text-slate-400 border-slate-700 bg-slate-900/40"
                  }`}>
                    {isActive ? (
                      <>
                        <ShieldCheck className="w-2.5 h-2.5 text-game-green" /> Ready
                      </>
                    ) : (
                      <>
                        <Lock className="w-2.5 h-2.5 text-slate-500" /> Planned
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl border flex-shrink-0 ${mod.borderColor} ${mod.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-game-cyan transition-colors">
                    {mod.name}
                  </h3>
                </div>

                <p className="text-slate-300 text-xs font-light leading-relaxed mb-6">
                  {mod.description}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 mt-auto">
                <Link
                  href={mod.link}
                  className={`w-full py-2.5 font-mono text-[10px] font-bold rounded flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "btn-game-primary text-white" 
                      : "bg-white/5 border border-white/10 text-slate-400 hover:text-game-cyan hover:bg-game-cyan/5 hover:border-game-cyan/35"
                  }`}
                >
                  {mod.btnText}
                  {isActive && <ArrowUpRight className="w-3.5 h-3.5" />}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
