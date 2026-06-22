"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDot, Shield, Flame } from "lucide-react";

interface Phase {
  phase: string;
  title: string;
  desc: string;
  status: "Completed" | "In Progress" | "Planned";
  color: string;
  glow: string;
}

export default function RoadmapTimeline() {
  const phases: Phase[] = [
    {
      phase: "Phase 1",
      title: "Control Tower & Portfolio Gateway",
      desc: "Develop Dylan's Control Tower gateway home page, migrate the existing analytics portfolio to /portfolio, and establish navigation mapping.",
      status: "Completed",
      color: "text-game-green border-game-green/40 bg-game-green/5",
      glow: "rgba(0, 255, 137, 0.2)",
    },
    {
      phase: "Phase 2",
      title: "Finance & Income Tracker",
      desc: "Implement local database or Google Sheets API integrations to logs monthly salary, allowances, side hustles, and format export templates.",
      status: "In Progress",
      color: "text-game-cyan border-game-cyan/40 bg-game-cyan/5",
      glow: "rgba(0, 242, 254, 0.2)",
    },
    {
      phase: "Phase 3",
      title: "Investment & Travel Modules",
      desc: "Establish financial watchlists, ticker sync widgets, and build out travel planners with budget aggregation metrics and checksheets.",
      status: "Planned",
      color: "text-game-gold border-game-gold/30 bg-game-gold/5",
      glow: "rgba(255, 211, 42, 0.1)",
    },
    {
      phase: "Phase 4",
      title: "Side Hustle Lab & Knowledge Vault",
      desc: "Integrate MVP task lists, idea validation checksheets, and notes repositories for interview roadmaps, English practice notes, and prompts.",
      status: "Planned",
      color: "text-game-purple border-game-purple/30 bg-game-purple/5",
      glow: "rgba(123, 47, 247, 0.1)",
    },
  ];

  return (
    <section id="build-roadmap" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
          Development Map
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
          Build Roadmap
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
      </div>

      {/* Horizontal / Vertical Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central connecting line for desktop */}
        <div className="hidden lg:block absolute top-[120px] left-0 right-0 h-[2px] bg-gradient-to-r from-game-green via-game-cyan to-white/10 z-0" />
        
        {/* Central connecting line for mobile */}
        <div className="block lg:hidden absolute top-0 bottom-0 left-[21px] w-[2px] bg-gradient-to-b from-game-green via-game-cyan to-white/5 z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
          {phases.map((item, index) => {
            const isCompleted = item.status === "Completed";
            const isInProgress = item.status === "In Progress";
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-row lg:flex-col items-start gap-4 lg:gap-6"
              >
                {/* Timeline node marker */}
                <div 
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-2 bg-slate-950 flex-shrink-0 z-10 transition-transform duration-300 hover:scale-110`}
                  style={{
                    borderColor: isCompleted ? "var(--color-game-green)" : isInProgress ? "var(--color-game-cyan)" : "rgba(255,255,255,0.1)",
                    boxShadow: `0 0 12px ${item.glow}`,
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-game-green" />
                  ) : isInProgress ? (
                    <CircleDot className="w-5 h-5 text-game-cyan animate-pulse" />
                  ) : (
                    <Shield className="w-5 h-5 text-slate-500" />
                  )}
                </div>

                {/* Content Box */}
                <div className={`glass-panel p-5 rounded-2xl border ${item.color} flex-grow w-full`}>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-2.5">
                    <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                      {item.phase}
                    </span>
                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                      isCompleted 
                        ? "text-game-green border-game-green/20 bg-game-green/10" 
                        : isInProgress 
                        ? "text-game-cyan border-game-cyan/20 bg-game-cyan/10"
                        : "text-slate-400 border-slate-700 bg-slate-900/40"
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-300 text-[11px] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
