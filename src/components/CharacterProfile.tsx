"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Award, ShieldAlert, Zap, MapPin, Target } from "lucide-react";

export default function CharacterProfile() {
  const stats = [
    { name: "Data Analysis & ETL", value: 92, color: "bg-game-cyan", shadow: "shadow-[0_0_10px_rgba(0,242,254,0.4)]" },
    { name: "Workflow Automation", value: 95, color: "bg-game-purple", shadow: "shadow-[0_0_10px_rgba(123,47,247,0.4)]" },
    { name: "SAP & Systems Integration", value: 88, color: "bg-game-blue", shadow: "shadow-[0_0_10px_rgba(0,114,255,0.4)]" },
    { name: "Inventory Control & Audit", value: 90, color: "bg-game-green", shadow: "shadow-[0_0_10px_rgba(0,255,135,0.4)]" },
  ];

  const characterDetails = [
    { label: "Role", value: "Supply Chain Analyst", icon: User, color: "text-game-cyan" },
    { label: "Specialization", value: "Inventory & Reporting", icon: Target, color: "text-game-purple" },
    { label: "Special Skills", value: "Power BI, VBA, Power Platform, SAP", icon: Zap, color: "text-game-gold" },
    { label: "Location", value: "Ho Chi Minh City, Vietnam", icon: MapPin, color: "text-game-green" },
    { label: "Experience", value: "6 Years of Experience - Supply Chain Analyst", icon: Award, color: "text-game-blue" },
  ];

  return (
    <section id="about" className="py-24 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative section title */}
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
          Profile Summary
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
          About Me
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stats & Attributes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-game-purple/10 rounded-full filter blur-xl" />
          
          <h3 className="text-lg font-bold font-mono tracking-wide text-white uppercase border-b border-white/5 pb-3 mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-game-cyan" /> Core Attributes & Details
          </h3>

          <div className="flex flex-col gap-5">
            {characterDetails.map((detail, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10 flex-shrink-0 ${detail.color}`}>
                  <detail.icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {detail.label}
                  </span>
                  <span className="text-sm font-semibold text-white mt-0.5">
                    {detail.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase">
              Core Competency Levels
            </h4>
            
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>{stat.name}</span>
                  <span className="font-semibold text-white">{stat.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: idx * 0.1 }}
                    className={`h-full ${stat.color} ${stat.shadow} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Character Lore & Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          {/* Main Story Biography Panel */}
          <div className="glass-panel p-8 rounded-2xl border border-white/5 relative">
            {/* HUD Bracket Styling */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-game-purple/50" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-game-purple/50" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-game-purple/50" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-game-purple/50" />

            <h3 className="text-lg font-bold font-mono tracking-wider text-white uppercase mb-4 text-glow-cyan">
              Biography & Background
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-base mb-6 font-light">
              Supply Chain Analyst with 6 years of experience in manufacturing and logistics operations. I possess a strong background in inventory control, warehouse operations, data analysis, automation, and supply chain systems.
            </p>
            <p className="text-slate-300 leading-relaxed text-base mb-6 font-light">
              Highly experienced in <span className="text-game-cyan font-medium">Power BI, Power Apps, Power Automate, Excel VBA, Python, SAP, SharePoint,</span> and Microsoft 365, my primary focus lies in improving operational visibility, reducing manual reporting workloads, and supporting data-driven decisions across cross-functional teams.
            </p>
            <p className="text-slate-300 leading-relaxed text-base font-light">
              By merging deep domain expertise in warehousing operations with modern data engineering and automation workflows, I specialize in transforming messy enterprise data into clear actionable intelligence that drives efficiency and optimization.
            </p>
          </div>

          {/* Key Quote / Strategy Block */}
          <div className="bg-gradient-to-r from-game-purple/10 to-game-cyan/10 border border-game-cyan/20 p-6 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-game-cyan/10 border border-game-cyan/25 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-game-cyan animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-game-cyan font-semibold">
                Operational Philosophy
              </h4>
              <p className="text-slate-300 text-sm italic mt-1 font-light leading-relaxed">
                &ldquo;Automate the repetitive daily routines, structure the data streams correctly, and liberate operational teams to focus on critical strategic root-cause analysis and variance tracking.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
