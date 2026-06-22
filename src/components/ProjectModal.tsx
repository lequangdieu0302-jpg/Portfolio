"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ShieldAlert, Award, ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import { ProjectData } from "./QuestCard";

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Render a visual preview mockup based on the project ID
  const renderVisualMockup = (id: string) => {
    switch (id) {
      case "project-1": // Receiving Operation Dashboard
        return (
          <div className="w-full bg-[#0a0c1f] rounded-xl border border-white/10 p-4 font-sans text-xs flex flex-col gap-4 shadow-inner">
            {/* Mock Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-semibold text-white">Receiving Operation Dashboard (Mock)</span>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded bg-game-cyan/20 border border-game-cyan/30 text-game-cyan text-[10px]">Site: All</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">Filter: Last 7 Days</span>
              </div>
            </div>
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { title: "GRN Total", val: "14,820", sub: "+12.5% vs LW", col: "text-game-cyan" },
                { title: "GRS Processed", val: "3,250", sub: "99.8% SLA", col: "text-game-green" },
                { title: "Pallets Received", val: "2,410", sub: "Avg: 344/day", col: "text-game-blue" },
                { title: "Pending Aging", val: "14 Items", sub: "> 24 hrs: 2", col: "text-rose-400" },
              ].map((kpi, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-white/5 flex flex-col">
                  <span className="text-slate-400 text-[9px] uppercase font-mono">{kpi.title}</span>
                  <span className={`text-base font-bold my-0.5 ${kpi.col}`}>{kpi.val}</span>
                  <span className="text-slate-500 text-[8px]">{kpi.sub}</span>
                </div>
              ))}
            </div>
            {/* Visual Charts Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5 flex flex-col h-28 justify-between">
                <span className="text-[9px] font-mono text-slate-400 uppercase">Receiving SLA Performance Trend</span>
                <div className="h-16 flex items-end justify-between px-2 gap-1.5 mt-2">
                  {[40, 50, 45, 60, 75, 80, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-game-cyan/30 border border-game-cyan/50 rounded-t" style={{ height: `${h}%` }} />
                      <span className="text-[8px] text-slate-500 font-mono">D{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-white/5 flex flex-col h-28 justify-between">
                <span className="text-[9px] font-mono text-slate-400 uppercase">Pending Aging by Category</span>
                <div className="flex flex-col gap-2 mt-3">
                  {[
                    { cat: "Documentation", count: 8, pct: "w-3/5", col: "bg-game-purple" },
                    { cat: "Physical Discrepancy", count: 4, pct: "w-2/5", col: "bg-game-gold" },
                    { cat: "SAP Post Lag", count: 2, pct: "w-1/5", col: "bg-game-green" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between text-[8px]">
                      <span className="w-20 text-slate-400 font-light truncate">{row.cat}</span>
                      <div className="flex-1 mx-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${row.col} rounded-full ${row.pct}`} />
                      </div>
                      <span className="text-white font-bold">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "project-2": // Inventory On-Hand & Slow-Moving Dashboard
        return (
          <div className="w-full bg-[#0a0c1f] rounded-xl border border-white/10 p-3 font-sans text-xs flex flex-col gap-3 shadow-inner relative overflow-hidden group">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 px-1">
              <span className="font-semibold text-white">Inventory On-Hand & Slow-Moving Dashboard</span>
              <span className="text-game-green text-[9px] font-mono animate-pulse flex items-center gap-1">
                ● Interactive Preview
              </span>
            </div>
            <a 
              href="/kpi_dashboard.png" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative rounded-lg overflow-hidden border border-white/5 bg-slate-900/60 aspect-[5/4] flex items-center justify-center cursor-zoom-in group/img animate-fade-in"
              title="Click to view full size image in new tab"
            >
              <img
                src="/kpi_dashboard.png"
                alt="Inventory On Hand Dashboard"
                className="w-full h-full object-contain group-hover/img:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <span className="bg-bg-dark/80 text-white font-mono text-[9px] px-2.5 py-1.5 rounded-md border border-white/10 tracking-widest uppercase">
                  🔍 View Full Size
                </span>
              </div>
            </a>
          </div>
        );
      case "project-3": // Inventory IN/OUT Count Automation
        return (
          <div className="w-full bg-[#0a0c1f] rounded-xl border border-white/10 p-4 font-mono text-[11px] flex flex-col gap-3 shadow-inner">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-[10px] text-slate-400">
              <span>EXCEL VBA - VARIANCE ENGINE v2.4</span>
              <span className="text-game-green font-semibold">Ready to Count</span>
            </div>
            {/* Mock Excel Table */}
            <div className="w-full overflow-x-auto border border-white/5 rounded">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-white/10 text-slate-300">
                    <th className="p-1.5 border-r border-white/5">BIN</th>
                    <th className="p-1.5 border-r border-white/5">MATERIAL</th>
                    <th className="p-1.5 border-r border-white/5 text-right">SYS QTY</th>
                    <th className="p-1.5 border-r border-white/5 text-right">PHYSICAL</th>
                    <th className="p-1.5 text-right">VAR</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { bin: "A-04-12", mat: "M-99104A", sys: 120, phys: 120, v: 0, row: "text-slate-400" },
                    { bin: "B-12-08", mat: "M-88402C", sys: 45, phys: 42, v: -3, row: "text-rose-400 font-semibold bg-rose-500/5" },
                    { bin: "A-08-01", mat: "M-11204B", sys: 820, phys: 820, v: 0, row: "text-slate-400" },
                    { bin: "C-01-22", mat: "M-33405X", sys: 0, phys: 5, v: 5, row: "text-game-green font-semibold bg-game-green/5" },
                    { bin: "D-15-14", mat: "M-45109E", sys: 18, phys: 18, v: 0, row: "text-slate-400" },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-white/5 ${row.row} hover:bg-white/5`}>
                      <td className="p-1.5 border-r border-white/5">{row.bin}</td>
                      <td className="p-1.5 border-r border-white/5">{row.mat}</td>
                      <td className="p-1.5 border-r border-white/5 text-right">{row.sys}</td>
                      <td className="p-1.5 border-r border-white/5 text-right">{row.phys}</td>
                      <td className="p-1.5 text-right font-bold">{row.v > 0 ? `+${row.v}` : row.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Script stats console */}
            <div className="bg-slate-900/80 p-2 rounded border border-white/5 text-[9px] text-slate-400 flex flex-col gap-1">
              <span>&gt; Import: 3 Files loaded successfully.</span>
              <span>&gt; Match Engine: dictionary mapping complete. 488 codes mapped.</span>
              <span className="text-game-cyan font-bold">&gt; Process complete. 2 discrepancies detected. Total Abs Variance: 8 units.</span>
            </div>
          </div>
        );
      case "project-4": // PR Tracking and Approval Portal
        return (
          <div className="w-full bg-[#0a0c1f] rounded-xl border border-white/10 p-4 font-sans text-xs flex gap-4 shadow-inner justify-center items-center">
            {/* Mock Mobile View */}
            <div className="w-[180px] h-[280px] bg-slate-900 border border-slate-700/60 rounded-xl overflow-hidden flex flex-col relative shadow-[0_0_15px_rgba(0,0,0,0.8)]">
              {/* Status Notch */}
              <div className="w-full h-4 bg-slate-950 flex items-center justify-center text-[7px] text-slate-500 font-mono">
                🔋 100% | 📱 PR Portal
              </div>
              {/* Header */}
              <div className="bg-game-purple/20 p-2 border-b border-white/5 text-[10px] font-bold text-white flex justify-between items-center">
                <span>PR Portal</span>
                <span className="px-1.5 py-0.5 rounded bg-game-purple text-[8px]">v1.2</span>
              </div>
              {/* Screen Content */}
              <div className="p-2 flex flex-col gap-2 flex-grow overflow-y-auto">
                <span className="text-[8px] font-mono text-slate-400 uppercase">My Requests</span>
                {[
                  { pr: "PR-2026-004", val: "$1,200", status: "Approved", col: "bg-game-green/20 border-game-green/40 text-game-green" },
                  { pr: "PR-2026-005", val: "$4,500", status: "Pending CEO", col: "bg-game-gold/20 border-game-gold/40 text-game-gold" },
                  { pr: "PR-2026-006", val: "  $420", status: "Draft", col: "bg-slate-800 border-white/10 text-slate-400" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-1.5 rounded border border-white/5 flex justify-between items-center text-[8px]">
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{item.pr}</span>
                      <span className="text-slate-500">{item.val}</span>
                    </div>
                    <span className={`px-1 rounded text-[7px] border font-semibold ${item.col}`}>{item.status}</span>
                  </div>
                ))}
                {/* Custom Action Button */}
                <button className="bg-gradient-to-r from-game-purple to-game-blue text-white py-1 rounded text-[8px] font-bold mt-auto border border-game-purple/50">
                  + Create New Request
                </button>
              </div>
            </div>
            {/* Flow Graph */}
            <div className="flex-1 flex flex-col gap-2 font-mono text-[9px]">
              <span className="text-[10px] font-bold text-white uppercase">Approval Workflow</span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1 text-game-green">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Submit Request (Power Apps)
                </div>
                <div className="h-3 w-0.5 bg-slate-600 ml-1.5" />
                <div className="flex items-center gap-1 text-game-green">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SharePoint triggers Flow
                </div>
                <div className="h-3 w-0.5 bg-slate-600 ml-1.5" />
                <div className="flex items-center gap-1 text-game-gold">
                  <span className="w-3.5 h-3.5 rounded-full border border-game-gold flex items-center justify-center text-[7px] font-bold">2</span>
                  Manager Approval (Teams / Email)
                </div>
                <div className="h-3 w-0.5 bg-slate-600 ml-1.5" />
                <div className="flex items-center gap-1 text-slate-500">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center text-[7px] font-bold">3</span>
                  Auto ERP PO Gen (Power Automate)
                </div>
              </div>
            </div>
          </div>
        );
      case "project-5": // SAP Reporting Automation
        return (
          <div className="w-full bg-[#03040c] rounded-xl border border-white/10 p-4 font-mono text-[10px] text-slate-300 flex flex-col gap-2 shadow-inner">
            <div className="flex justify-between items-center border-b border-white/5 pb-2 text-slate-400">
              <span className="flex items-center gap-1"><Terminal className="w-4 h-4 text-game-purple" /> automation_runner.py</span>
              <span className="text-slate-500">Task Scheduler: 06:00 AM</span>
            </div>
            {/* Terminal logs simulating python execution */}
            <div className="flex flex-col gap-1 h-44 overflow-y-auto px-1 py-1 font-mono leading-relaxed">
              <p className="text-slate-500">[2026-06-11 06:00:01] INFO - Scheduler triggered script run.</p>
              <p className="text-slate-300">[2026-06-11 06:00:03] INFO - Launching SAP GUI Scripting Engine (COM Interface)...</p>
              <p className="text-game-green">[2026-06-11 06:00:07] SUCCESS - SAP Connection established. Session ID: [0]</p>
              <p className="text-slate-300">[2026-06-11 06:00:08] INFO - Running MB51 transaction for code list: [PLANT_1010]</p>
              <p className="text-slate-300">[2026-06-11 06:00:15] INFO - Downloading raw text report MB51_110626.txt (size: 4.8MB)</p>
              <p className="text-slate-300">[2026-06-11 06:00:16] INFO - Running pandas parsing and data cleaning...</p>
              <p className="text-game-cyan">[2026-06-11 06:00:18] DATA - Read 44,812 rows. Cleaned NaN entries. Calculated aging fields.</p>
              <p className="text-slate-300">[2026-06-11 06:00:20] INFO - Generating final formatted Excel: Daily_Inventory_Report_11-Jun.xlsx</p>
              <p className="text-slate-300">[2026-06-11 06:00:22] INFO - Sending email notifications to 14 stakeholders...</p>
              <p className="text-game-green font-bold">[2026-06-11 06:00:25] SUCCESS - Job finished successfully. Total elapsed: 24.1s</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-44 bg-slate-900 border border-white/5 rounded-xl flex items-center justify-center text-slate-400 font-mono">
            Preview Not Available
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg-dark/85 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(123,47,247,0.3)] z-10 flex flex-col overflow-hidden relative"
        >
          {/* HUD Border Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-game-cyan" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-game-cyan" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-game-cyan" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-game-cyan" />

          {/* Modal Header */}
          <div className="flex justify-between items-center border-b border-white/5 px-6 py-4 bg-slate-950/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-game-green animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Project Details / {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-6 overflow-y-auto flex flex-col gap-6 max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left Column: Details */}
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white text-glow-cyan">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 items-center mt-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-game-gold/30 bg-game-gold/10 text-game-gold uppercase">
                      Complexity: {project.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Business Impact: {project.xpAward}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm mt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" /> The Problem
                    </span>
                    <p className="text-slate-300 font-light leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-game-green flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" /> The Solution
                    </span>
                    <p className="text-slate-300 font-light leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-game-cyan flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5" /> Strategic Business Impact
                    </span>
                    <p className="text-slate-300 font-light leading-relaxed">
                      {project.impact}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Tools Utilized
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md uppercase"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Mockup Showcase */}
              <div className="flex flex-col gap-3 w-full">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 pl-1">
                  Operational Preview Simulation
                </span>
                {renderVisualMockup(project.id)}
                <div className="text-[10px] text-slate-400 font-mono bg-white/5 border border-white/5 rounded-lg p-2.5 italic text-center">
                  🔒 Data masked in compliance with strict corporate data governance rules. No sensitive numbers or names are exposed.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
