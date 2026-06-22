"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Settings2, Share2, Ship, Search, Layers, ShieldCheck } from "lucide-react";

interface SkillNode {
  name: string;
  level: "Master" | "Expert" | "Adept";
  description: string;
}

interface SkillBranch {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  borderColor: string;
  glowColor: string;
  skills: SkillNode[];
}

const getActiveStyles = (id: string) => {
  const base = "bg-[#131533]/80 text-white";
  switch (id) {
    case "vis":
      return `${base} border-game-cyan/60 shadow-[0_0_15px_rgba(0,242,254,0.2)] bg-game-cyan/5`;
    case "auto":
      return `${base} border-game-purple/60 shadow-[0_0_15px_rgba(123,47,247,0.2)] bg-game-purple/5`;
    case "pp":
      return `${base} border-game-blue/60 shadow-[0_0_15px_rgba(0,114,255,0.2)] bg-game-blue/5`;
    case "sc":
      return `${base} border-game-green/60 shadow-[0_0_15px_rgba(0,255,135,0.2)] bg-game-green/5`;
    case "ana":
      return `${base} border-game-gold/60 shadow-[0_0_15px_rgba(255,211,42,0.2)] bg-game-gold/5`;
    default:
      return `${base} border-slate-400/60 shadow-[0_0_15px_rgba(148,163,184,0.15)] bg-slate-500/5`;
  }
};

const getInactiveStyles = (id: string) => {
  const base = "bg-slate-900/40 border-white/5 text-slate-400";
  switch (id) {
    case "vis":
      return `${base} hover:border-game-cyan/40 hover:bg-game-cyan/5 hover:text-game-cyan`;
    case "auto":
      return `${base} hover:border-game-purple/40 hover:bg-game-purple/5 hover:text-game-purple`;
    case "pp":
      return `${base} hover:border-game-blue/40 hover:bg-game-blue/5 hover:text-game-blue`;
    case "sc":
      return `${base} hover:border-game-green/40 hover:bg-game-green/5 hover:text-game-green`;
    case "ana":
      return `${base} hover:border-game-gold/40 hover:bg-game-gold/5 hover:text-game-gold`;
    default:
      return `${base} hover:border-slate-400/40 hover:bg-slate-500/5 hover:text-slate-300`;
  }
};

export default function SkillTree() {
  const [activeBranch, setActiveBranch] = useState<string>("vis");

  const skillBranches: SkillBranch[] = [
    {
      id: "vis",
      title: "Data Visualization",
      subtitle: "Reporting & Dashboarding",
      icon: Eye,
      color: "text-game-cyan",
      borderColor: "border-game-cyan/30",
      glowColor: "rgba(0, 242, 254, 0.4)",
      skills: [
        { name: "Power BI", level: "Master", description: "Design complex data models, dashboards, and row-level security parameters." },
        { name: "Power Query", level: "Master", description: "Advanced data shaping, column splitting, merging queries, and custom M functions." },
        { name: "KPI Dashboard", level: "Expert", description: "Creating target tracking and operations metrics dashboards." },
        { name: "Operational Reporting", level: "Master", description: "Daily receiving, shipping, and inventory variance reporting." },
      ],
    },
    {
      id: "auto",
      title: "Automation",
      subtitle: "Macros & Scripting",
      icon: Settings2,
      color: "text-game-purple",
      borderColor: "border-game-purple/30",
      glowColor: "rgba(123, 47, 247, 0.4)",
      skills: [
        { name: "Excel VBA", level: "Master", description: "Dictionary objects, collection classes, API calls, and automatic form creation." },
        { name: "Python", level: "Expert", description: "Data engineering using Pandas, openpyxl, and scripting for ETL files." },
        { name: "Power Automate", level: "Expert", description: "Cloud flows, scheduled automated alerts, and custom approvals." },
        { name: "SAP Export Automation", level: "Expert", description: "Automating SAP GUI scripting and batch report downloads." },
        { name: "Report Automation", level: "Master", description: "End-to-end automated excel templates and email distributions." },
      ],
    },
    {
      id: "pp",
      title: "Power Platform",
      subtitle: "App & Custom Workflows",
      icon: Share2,
      color: "text-game-blue",
      borderColor: "border-game-blue/30",
      glowColor: "rgba(0, 114, 255, 0.4)",
      skills: [
        { name: "Power Apps", level: "Expert", description: "Canvas apps for inventory checking, material requests, and mobile portals." },
        { name: "SharePoint", level: "Master", description: "Custom lists, document hubs, permission management, and metadata tagging." },
        { name: "Microsoft 365", level: "Expert", description: "Admin tools, MS Forms, Teams integrations, and planner automations." },
        { name: "Approval Workflow", level: "Expert", description: "Multi-stage organizational signoffs using Power Automate flows." },
      ],
    },
    {
      id: "sc",
      title: "Supply Chain",
      subtitle: "Logistics & Stock Control",
      icon: Ship,
      color: "text-game-green",
      borderColor: "border-game-green/30",
      glowColor: "rgba(0, 255, 135, 0.4)",
      skills: [
        { name: "Inventory Control", level: "Master", description: "Cycle counts, safety stock setups, physical audits, and scrap logs." },
        { name: "Material Planning", level: "Expert", description: "Demand planning, shortage monitoring, lead time management, and safety buffers." },
        { name: "Warehouse Operations", level: "Master", description: "GRN/GRS matching, pending aging resolution, putaway, and picking rules." },
        { name: "Replenishment", level: "Expert", description: "Trigger levels, reorder points, Kanban configurations, and stock transfers." },
        { name: "Stock Accuracy", level: "Master", description: "Ensuring 99%+ physical-to-system accuracy through regular audits." },
      ],
    },
    {
      id: "ana",
      title: "Analysis",
      subtitle: "Data Mining & Investigation",
      icon: Search,
      color: "text-game-gold",
      borderColor: "border-game-gold/30",
      glowColor: "rgba(255, 211, 42, 0.4)",
      skills: [
        { name: "ETL Processes", level: "Expert", description: "Extracting, transforming, and loading diverse files into data lakes." },
        { name: "Data Cleaning", level: "Master", description: "Handling nulls, duplicates, and data validation rules." },
        { name: "Root Cause Analysis", level: "Master", description: "5 Whys, Fishbone diagrams, and operational gap mapping." },
        { name: "Variance Analysis", level: "Master", description: "Comparing physical counts to SAP inventory data and detailing variances." },
        { name: "KPI Tracking", level: "Master", description: "Building, maintaining, and automating team performance dashboards." },
      ],
    },
    {
      id: "sys",
      title: "Systems",
      subtitle: "Digital Infrastructure Tools",
      icon: Layers,
      color: "text-slate-400",
      borderColor: "border-slate-700/50",
      glowColor: "rgba(148, 163, 184, 0.2)",
      skills: [
        { name: "SAP ERP", level: "Expert", description: "Mastering warehouse movement codes (MB51, MB52, LS24, LX02, etc.)." },
        { name: "Outlook Automation", level: "Expert", description: "Parsing inbox alerts, sending automated notifications with attachments." },
        { name: "SharePoint Portal", level: "Master", description: "Building department wiki portals and repository architectures." },
        { name: "Microsoft Teams", level: "Expert", description: "Setting up webhooks, adaptive cards, and automated channel alerts." },
      ],
    },
  ];

  const currentBranch = skillBranches.find((b) => b.id === activeBranch) || skillBranches[0];

  return (
    <section id="skills" className="py-24 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background grid representation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* Decorative section title */}
      <div className="flex flex-col items-center mb-16 text-center z-10 relative">
        <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
          Technical Skills
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
          Core Competencies
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left column: Tree Branches Selector */}
        <div className="flex flex-col gap-3 lg:col-span-4">
          <span className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-2 pl-2">
            Select Competency Category
          </span>
          {skillBranches.map((branch) => {
            const BranchIcon = branch.icon;
            const isActive = activeBranch === branch.id;
            return (
              <button
                key={branch.id}
                onClick={() => setActiveBranch(branch.id)}
                className={`skill-branch-btn w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all duration-300 cursor-pointer ${
                  isActive
                    ? getActiveStyles(branch.id)
                    : getInactiveStyles(branch.id)
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${
                      isActive ? branch.color : "text-slate-400"
                    }`}
                  >
                    <BranchIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-slate-300"}`}>
                      {branch.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {branch.subtitle}
                    </span>
                  </div>
                </div>
                {isActive && (
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: currentBranch.color.includes("cyan")
                        ? "var(--color-game-cyan)"
                        : currentBranch.color.includes("purple")
                        ? "var(--color-game-purple)"
                        : currentBranch.color.includes("blue")
                        ? "var(--color-game-blue)"
                        : currentBranch.color.includes("green")
                        ? "var(--color-game-green)"
                        : currentBranch.color.includes("gold")
                        ? "var(--color-game-gold)"
                        : "#94a3b8",
                      boxShadow: `0 0 10px ${currentBranch.glowColor}`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right column: Interactive Nodes of active branch */}
        <div className="lg:col-span-8 glass-panel p-8 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
          {/* Neon side border indicating current branch color */}
          <div
            className="absolute top-0 left-0 w-[4px] h-full"
            style={{
              backgroundColor: currentBranch.color.includes("cyan")
                ? "var(--color-game-cyan)"
                : currentBranch.color.includes("purple")
                ? "var(--color-game-purple)"
                : currentBranch.color.includes("blue")
                ? "var(--color-game-blue)"
                : currentBranch.color.includes("green")
                ? "var(--color-game-green)"
                : currentBranch.color.includes("gold")
                ? "var(--color-game-gold)"
                : "#94a3b8",
              boxShadow: `0 0 15px ${currentBranch.glowColor}`,
            }}
          />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className={`p-2 rounded-lg bg-white/5 border border-white/10 ${currentBranch.color}`}>
                <currentBranch.icon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wider">
                  {currentBranch.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  {currentBranch.subtitle}
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
              >
                {currentBranch.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl bg-bg-dark/60 border border-white/5 hover:border-white/15 transition-all duration-300 group flex flex-col gap-2 relative overflow-hidden"
                  >
                    {/* Glowing effect inside node on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex justify-between items-center z-10 relative">
                      <span className="font-semibold text-white group-hover:text-game-cyan transition-colors text-sm">
                        {skill.name}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-game-gold uppercase">
                        <ShieldCheck className="w-3 h-3" /> {skill.level}
                      </span>
                    </div>

                    <p className="text-slate-300 text-xs font-light leading-relaxed z-10 relative">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <span>Competency status: Certified</span>
            <span className="flex items-center gap-1 text-game-cyan">
              ⚡ Status: Active skills ready for deployment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
