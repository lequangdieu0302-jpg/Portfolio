"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Package, Database, Cpu, Download, Mail, Play } from "lucide-react";

export default function Hero() {
  const floatingIcons = [
    {
      Icon: BarChart3,
      color: "text-game-cyan",
      shadow: "shadow-[0_0_20px_rgba(0,242,254,0.4)]",
      bgColor: "bg-game-cyan/10",
      borderColor: "border-game-cyan/30",
      top: "12%",
      left: "15%",
      delay: 0,
      label: "Dashboards",
    },
    {
      Icon: Package,
      color: "text-game-gold",
      shadow: "shadow-[0_0_20px_rgba(255,211,42,0.4)]",
      bgColor: "bg-game-gold/10",
      borderColor: "border-game-gold/30",
      top: "20%",
      right: "10%",
      delay: 1.5,
      label: "Inventory Control",
    },
    {
      Icon: Database,
      color: "text-game-blue",
      shadow: "shadow-[0_0_20px_rgba(0,114,255,0.4)]",
      bgColor: "bg-game-blue/10",
      borderColor: "border-game-blue/30",
      bottom: "22%",
      left: "8%",
      delay: 0.8,
      label: "SAP / databases",
    },
    {
      Icon: Cpu,
      color: "text-game-green",
      shadow: "shadow-[0_0_20px_rgba(0,255,135,0.4)]",
      bgColor: "bg-game-green/10",
      borderColor: "border-game-green/30",
      bottom: "15%",
      right: "20%",
      delay: 2.2,
      label: "VBA / Python Automation",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Visual background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-game-purple/10 rounded-full filter blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-game-cyan/5 rounded-full filter blur-[100px] animate-pulse-glow" />

      {/* Floating Animated Data Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:flex items-center gap-2"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <div
            className={`w-14 h-14 rounded-xl ${item.bgColor} border ${item.borderColor} ${item.shadow} flex items-center justify-center backdrop-blur-md cursor-pointer`}
          >
            <item.Icon className={`w-7 h-7 ${item.color}`} />
          </div>
          <span className="text-xs font-mono tracking-widest text-slate-400 bg-bg-dark/60 backdrop-blur-sm px-2 py-1 rounded border border-white/5 uppercase">
            {item.label}
          </span>
        </motion.div>
      ))}

      {/* Main Hero Card Panel */}
      <div className="max-w-5xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
        {/* Left column: Text Information */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex self-center lg:self-start items-center gap-2 bg-game-purple/20 border border-game-purple/40 px-3 py-1 rounded-full text-xs font-mono text-slate-300 uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-game-green animate-pulse" />
            Available for Opportunities
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-2"
          >
            <span className="text-sm font-mono tracking-widest text-game-cyan uppercase">
              Professional Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Le Quang Dieu (Dylan)
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-game-cyan via-game-blue to-game-purple tracking-wide">
              Supply Chain Analyst & Automation Builder
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            I transform supply chain, inventory, and warehouse data into clear dashboards, automation tools, and business insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4"
          >
            <a href="#projects" className="btn-game-primary px-6 py-3 font-semibold text-sm flex items-center gap-2 group text-white">
              <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
              View Projects
            </a>
            
            <a href="#contact" className="btn-game-secondary px-6 py-3 font-semibold text-sm flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right column: Game style profile card representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="glass-panel w-full max-w-[360px] p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(123,47,247,0.15)] flex flex-col gap-6 relative overflow-hidden">
            {/* Card corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-game-cyan" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-game-cyan" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-game-cyan" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-game-cyan" />

            {/* Profile Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                Professional Status
              </span>
              <span className="text-xs font-mono text-game-gold flex items-center gap-1">
                🏆 Top Rated
              </span>
            </div>

            {/* Profile Picture Mock & Stats */}
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-game-cyan via-game-blue to-game-purple rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative w-28 h-28 rounded-full bg-slate-900 border-2 border-game-cyan overflow-hidden">
                  <img
                    src="/profile.png"
                    alt="Le Quang Dieu (Dylan) Profile"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-bold text-lg text-white">Le Quang Dieu (Dylan)</h3>
                <p className="text-xs text-game-cyan font-mono tracking-wider">6 Years of Experience - Supply Chain Analyst</p>
              </div>
            </div>

            {/* Quick Status Attributes */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-400">Specialization:</span>
                <span className="text-white font-semibold">Inventory & Reporting</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-400">Main Tools:</span>
                <span className="text-game-green font-semibold">Power BI, VBA, SAP</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-slate-400">Location:</span>
                <span className="text-white font-semibold">Ho Chi Minh City, VN</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Current Focus:</span>
                <span className="text-game-gold font-semibold">Supply Chain Automation</span>
              </div>
            </div>

            {/* Experience bar progression visual */}
            <div className="flex flex-col gap-1.5 font-mono text-[10px] text-slate-400 mt-2">
              <div className="flex justify-between">
                <span>Experience (Mfg & Logistics)</span>
                <span>6 Years of Experience</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <div className="h-full bg-gradient-to-r from-game-purple via-game-blue to-game-cyan w-4/5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
