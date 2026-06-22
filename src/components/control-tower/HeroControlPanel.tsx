"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Coins, 
  Map, 
  Backpack, 
  Rocket, 
  Database, 
  Settings, 
  ArrowRight, 
  LayoutDashboard, 
  Plus, 
  ShieldCheck 
} from "lucide-react";
import Link from "next/link";

export default function HeroControlPanel() {
  const floatingIcons = [
    { Icon: BarChart3, color: "text-game-cyan", shadow: "shadow-[0_0_20px_rgba(0,242,254,0.4)]", bgColor: "bg-game-cyan/10", borderColor: "border-game-cyan/30", top: "15%", left: "12%", delay: 0, label: "Analytics" },
    { Icon: Coins, color: "text-game-gold", shadow: "shadow-[0_0_20px_rgba(255,211,42,0.4)]", bgColor: "bg-game-gold/10", borderColor: "border-game-gold/30", top: "25%", right: "8%", delay: 1.2, label: "Finance" },
    { Icon: Map, color: "text-game-green", shadow: "shadow-[0_0_20px_rgba(0,255,135,0.4)]", bgColor: "bg-game-green/10", borderColor: "border-game-green/30", bottom: "25%", left: "8%", delay: 0.6, label: "Travel" },
    { Icon: Backpack, color: "text-game-blue", shadow: "shadow-[0_0_20px_rgba(0,114,255,0.4)]", bgColor: "bg-game-blue/10", borderColor: "border-game-blue/30", bottom: "18%", right: "14%", delay: 1.8, label: "Backpack" },
    { Icon: Rocket, color: "text-rose-400", shadow: "shadow-[0_0_20px_rgba(244,63,94,0.4)]", bgColor: "bg-rose-500/10", borderColor: "border-rose-500/30", top: "10%", right: "22%", delay: 2.4, label: "Hustles" },
    { Icon: Database, color: "text-game-purple", shadow: "shadow-[0_0_20px_rgba(123,47,247,0.4)]", bgColor: "bg-game-purple/10", borderColor: "border-game-purple/30", bottom: "8%", left: "28%", delay: 1.0, label: "Vault" },
    { Icon: Settings, color: "text-slate-400", shadow: "shadow-[0_0_20px_rgba(148,163,184,0.2)]", bgColor: "bg-slate-500/10", borderColor: "border-slate-500/20", top: "45%", left: "5%", delay: 3.0, label: "Control" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-game-purple/10 rounded-full filter blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-game-cyan/5 rounded-full filter blur-[100px] animate-pulse-glow" />

      {/* Floating Animated Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:flex items-center gap-2 z-0"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 6, -6, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <div className={`w-12 h-12 rounded-xl ${item.bgColor} border ${item.borderColor} ${item.shadow} flex items-center justify-center backdrop-blur-md hover:scale-110 transition-transform duration-300`}>
            <item.Icon className={`w-6 h-6 ${item.color}`} />
          </div>
          <span className="text-[9px] font-mono tracking-widest text-slate-400 bg-bg-dark/60 backdrop-blur-sm px-2 py-1 rounded border border-white/5 uppercase">
            {item.label}
          </span>
        </motion.div>
      ))}

      {/* Hero Content Panel */}
      <div className="max-w-4xl w-full z-10 text-center flex flex-col items-center gap-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-game-cyan/10 border border-game-cyan/35 px-4 py-1.5 rounded-full text-xs font-mono text-game-cyan uppercase tracking-widest shadow-[0_0_15px_rgba(0,242,254,0.15)] animate-pulse-glow"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-game-green animate-pulse" />
          <span className="font-bold">System Online</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col gap-3"
        >
          <span className="text-sm font-mono tracking-[0.25em] text-game-purple uppercase font-bold">
            Dylan's Control Tower
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight uppercase text-glow-cyan">
            Career & Life Command Center
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light mt-2">
            A centralized personal dashboard orchestrating my analytics portfolio, monthly income audits, investment watchlists, travel planning, and side hustle projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-6"
        >
          <Link
            href="/portfolio"
            className="btn-game-primary px-6 py-3.5 font-semibold text-xs flex items-center gap-2 text-white font-mono uppercase tracking-wider cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            Open Portfolio
          </Link>
          
          <a
            href="#dashboard-overview"
            className="btn-game-secondary px-6 py-3.5 font-semibold text-xs flex items-center gap-2 text-slate-300 font-mono uppercase tracking-wider cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
            View Dashboard
          </a>

          <Link
            href="/coming-soon"
            className="text-slate-400 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5 underline underline-offset-4 pl-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Module
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
