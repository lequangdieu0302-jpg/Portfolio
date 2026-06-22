"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coins, LineChart, Globe, Rocket, ShieldAlert, Sparkles, Lock } from "lucide-react";

interface KPICard {
  title: string;
  value: string;
  subtitle: string;
  status: "Private" | "Coming Soon";
  icon: React.ComponentType<any>;
  color: string;
  borderColor: string;
  glow: string;
}

export default function OverviewCard() {
  const kpis: KPICard[] = [
    {
      title: "Monthly Income",
      value: "$X,XXX",
      subtitle: "Tracking salary, bonus, and side income",
      status: "Private",
      icon: Coins,
      color: "text-game-gold",
      borderColor: "border-game-gold/30 bg-game-gold/5",
      glow: "shadow-[0_0_20px_rgba(255,211,42,0.15)]",
    },
    {
      title: "Investment Portfolio",
      value: "0 assets",
      subtitle: "Stocks, funds, crypto, and long-term goals",
      status: "Coming Soon",
      icon: LineChart,
      color: "text-game-cyan",
      borderColor: "border-game-cyan/30 bg-game-cyan/5",
      glow: "shadow-[0_0_20px_rgba(0,242,254,0.15)]",
    },
    {
      title: "Travel Map",
      value: "0 trips planned",
      subtitle: "Places to visit, budget, checklist, and memories",
      status: "Coming Soon",
      icon: Globe,
      color: "text-game-green",
      borderColor: "border-game-green/30 bg-game-green/5",
      glow: "shadow-[0_0_20px_rgba(0,255,135,0.15)]",
    },
    {
      title: "Side Hustle Projects",
      value: "0 active projects",
      subtitle: "Ideas, MVPs, automation tools, and experiments",
      status: "Coming Soon",
      icon: Rocket,
      color: "text-rose-400",
      borderColor: "border-rose-500/30 bg-rose-500/5",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    },
  ];

  return (
    <section id="dashboard-overview" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
          Key Metrics
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
          Dashboard Overview
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`glass-panel glass-panel-hover p-6 rounded-2xl border ${kpi.borderColor} flex flex-col justify-between ${kpi.glow} relative overflow-hidden`}
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/10" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/10" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/10" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/10" />

              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    System KPI
                  </span>
                  <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border uppercase flex items-center gap-1.5 ${
                    kpi.status === "Private" 
                      ? "text-game-gold border-game-gold/30 bg-game-gold/10" 
                      : "text-game-cyan border-game-cyan/30 bg-game-cyan/10"
                  }`}>
                    {kpi.status === "Private" ? (
                      <>
                        <Lock className="w-2.5 h-2.5" /> Private
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-2.5 h-2.5 animate-pulse" /> Locked
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2.5 rounded-xl border flex-shrink-0 ${kpi.borderColor} ${kpi.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      {kpi.title}
                    </span>
                    <span className="text-xl font-bold text-white leading-tight mt-0.5 font-mono">
                      {kpi.value}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-xs font-light leading-relaxed mt-2 border-t border-white/5 pt-3">
                {kpi.subtitle}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
