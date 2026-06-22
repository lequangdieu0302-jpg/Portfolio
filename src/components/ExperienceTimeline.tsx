"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Milestone, ShieldAlert, Award, Wrench, Cpu, Globe } from "lucide-react";

interface JobRole {
  role: string;
  company: string;
  location: string;
  period: string;
  level: string;
  description: string;
  responsibilities: string[];
  color: string;
  glow: string;
  logoType: "milwaukee" | "jabil" | "schenker";
}

export default function ExperienceTimeline() {
  const experiences: JobRole[] = [
    {
      role: "IDM Supervisor / Data & System Support",
      company: "Milwaukee Tool Vietnam, TTI Group",
      location: "Binh Duong / HCMC, Vietnam",
      period: "Jul 2025 - Present",
      level: "Level 3 - Supervisor",
      description: "Manage IDM warehouse operations and drive automation & data reporting pipelines for inventory control.",
      responsibilities: [
        "Manage IDM warehouse operations, ensuring stock availability and warehouse efficiency.",
        "Monitor critical warehouse KPIs, including stock accuracy, usage trends, and replenishment performance.",
        "Develop advanced Power BI dashboards for operational performance tracking and metrics aggregation.",
        "Build custom Power Apps & Power Automate workflows for material requests and approval routing.",
        "Automate reports and raw data extraction from SAP and Microsoft 365 services.",
        "Perform root cause analysis for inventory variances, auditing discrepancy logs and process gaps.",
        "Collaborate closely with Planning, Procurement, and Production teams to optimize supply chain pipelines.",
      ],
      color: "text-rose-400 border-rose-500/30 bg-rose-500/5",
      glow: "rgba(244, 63, 94, 0.2)",
      logoType: "milwaukee",
    },
    {
      role: "Inventory Analyst",
      company: "Jabil Vietnam, High Tech Park",
      location: "Thu Duc City, Ho Chi Minh City, Vietnam",
      period: "Dec 2021 - Jul 2025",
      level: "Level 2 - Analyst Specialist",
      description: "Maintained inventory synchronization and automated daily reporting systems to save manual workloads.",
      responsibilities: [
        "Maintained inventory accuracy between physical floor stocks and SAP system balances.",
        "Analyzed complex supply chain and logistics data for material planning and resource allocations.",
        "Developed Power BI dashboards for Cycle Counts, FIFO compliance tracking, and output performance.",
        "Built custom ETL procedures from SAP, Outlook, and internal manufacturing control tables.",
        "Automated repetitive manual reporting tasks using Excel VBA, Python, and Power Automate flows.",
        "Conducted root cause investigations for count variances, outlining corrective action plans.",
      ],
      color: "text-game-cyan border-game-cyan/30 bg-game-cyan/5",
      glow: "rgba(0, 242, 254, 0.2)",
      logoType: "jabil",
    },
    {
      role: "Order Management Ground Controller",
      company: "DB Schenker Vietnam",
      location: "Ho Chi Minh City, Vietnam",
      period: "Nov 2020 - Dec 2021",
      level: "Level 1 - Operations Specialist",
      description: "Coordinated outbound order fulfillment and built tools for ground controller reporting.",
      responsibilities: [
        "Managed physical inventory allocations and order fulfillment logistics operations.",
        "Coordinated end-to-end shipment tracking and resolved complex freight and clearance bottlenecks.",
        "Developed Excel VBA tools to compile and automate daily controller reports.",
        "Collaborated with warehouse floor teams and logistics providers to improve overall workflow velocity.",
      ],
      color: "text-game-purple border-game-purple/30 bg-game-purple/5",
      glow: "rgba(123, 47, 247, 0.2)",
      logoType: "schenker",
    },
  ];

  const renderCompanyLogo = (type: string) => {
    switch (type) {
      case "milwaukee":
        return (
          <div className="w-16 h-10 rounded-lg flex items-center justify-center border border-rose-500/20 bg-white p-1 flex-shrink-0 shadow-md overflow-hidden">
            <img src="/logo_milwaukee.png" alt="Milwaukee Tool" className="w-full h-auto max-h-full object-contain scale-[1.1]" />
          </div>
        );
      case "jabil":
        return (
          <div className="w-16 h-10 rounded-lg flex items-center justify-center border border-game-cyan/20 bg-white p-1.5 flex-shrink-0 shadow-md overflow-hidden">
            <img src="/logo_jabil.png" alt="Jabil" className="w-full h-auto max-h-full object-contain scale-[1.15]" />
          </div>
        );
      case "schenker":
        return (
          <div className="w-16 h-10 rounded-lg flex items-center justify-center border border-game-purple/20 bg-white p-1 flex-shrink-0 shadow-md overflow-hidden">
            <img src="/logo_schenker.png" alt="DB Schenker" className="w-full h-auto max-h-full object-contain scale-[1.25]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="experience" className="py-24 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Visual background line */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-game-blue/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Decorative section title */}
      <div className="flex flex-col items-center mb-20 text-center">
        <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
          Chronological Timeline
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
          Career Journey
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
      </div>

      {/* Vertical Timeline container */}
      <div className="relative border-l border-white/10 md:border-l-0 max-w-5xl mx-auto flex flex-col gap-12 md:gap-0">
        {/* Central visual line in desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-game-cyan via-game-purple to-transparent -translate-x-1/2" />

        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={exp.period}
              className={`relative pl-8 md:pl-0 w-full md:w-1/2 ${
                isEven ? "md:self-start md:pr-12 md:text-right" : "md:self-end md:pl-12"
              } md:mb-12`}
            >
              {/* Central Node Dot */}
              <div
                className={`absolute top-2 w-5 h-5 rounded-full bg-[#0a0c1f] border-2 flex items-center justify-center z-10 transition-transform duration-300 hover:scale-125
                  left-[-10px] md:left-auto ${
                    isEven ? "md:left-full md:-translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                  }`}
                style={{
                  borderColor: exp.color.includes("rose")
                    ? "var(--color-game-rose)"
                    : exp.color.includes("cyan")
                    ? "var(--color-game-cyan)"
                    : "var(--color-game-purple)",
                  boxShadow: `0 0 10px ${exp.glow}`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: exp.color.includes("rose")
                      ? "var(--color-game-rose)"
                      : exp.color.includes("cyan")
                      ? "var(--color-game-cyan)"
                      : "var(--color-game-purple)",
                  }}
                />
              </div>

              {/* Box Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`glass-panel p-6 rounded-2xl border text-left relative overflow-hidden ${exp.color} hover:border-white/10 transition-colors`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.03] pointer-events-none">
                  <Milestone className="w-full h-full text-white" />
                </div>

                {/* Company Header with custom SVG logo */}
                <div className="flex gap-4 items-start border-b border-white/5 pb-3 mb-3">
                  {renderCompanyLogo(exp.logoType)}
                  <div className="flex flex-col gap-0.5 flex-grow">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                      {exp.level}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {exp.role}
                    </h3>
                    <h4 className="text-xs sm:text-sm font-semibold text-game-cyan mt-0.5">
                      {exp.company}
                    </h4>
                  </div>
                </div>

                {/* Meta Metadata row */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400 mb-4">
                  <span>📅 {exp.period}</span>
                  <span>📍 {exp.location}</span>
                </div>

                <p className="text-slate-300 text-xs font-light mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {/* Sub-Checklist of accomplishments */}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    Key Accomplishments & Responsibilities:
                  </span>
                  <div className="flex flex-col gap-2 text-[11px]">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex gap-2 items-start text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-game-green flex-shrink-0 mt-0.5" />
                        <span className="font-light leading-normal">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
