"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, BarChart3, Wrench, Cpu, Languages, Target, ExternalLink } from "lucide-react";
import Link from "next/link";

interface QuickLink {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  color: string;
  borderColor: string;
  link: string;
}

export default function QuickAccessPanel() {
  const links: QuickLink[] = [
    {
      title: "Resume / CV",
      desc: "Download full professional career history sheets.",
      icon: FileText,
      color: "text-game-cyan",
      borderColor: "border-game-cyan/20 hover:border-game-cyan/50",
      link: "#", // will trigger CV download alert
    },
    {
      title: "Power BI Projects",
      desc: "Open direct cloud reports dashboards preview.",
      icon: BarChart3,
      color: "text-game-purple",
      borderColor: "border-game-purple/20 hover:border-game-purple/50",
      link: "/portfolio#projects",
    },
    {
      title: "VBA Tools Repository",
      desc: "Check Excel macro script packages and modules.",
      icon: Wrench,
      color: "text-game-gold",
      borderColor: "border-game-gold/20 hover:border-game-gold/50",
      link: "/portfolio#projects",
    },
    {
      title: "Automation Ideas",
      desc: "Explore planned workflows and backlog tools.",
      icon: Cpu,
      color: "text-game-green",
      borderColor: "border-game-green/20 hover:border-game-green/50",
      link: "/coming-soon",
    },
    {
      title: "English Practice logs",
      desc: "Review English grammar exercises, vocabulary, and prompts.",
      icon: Languages,
      color: "text-game-blue",
      borderColor: "border-game-blue/20 hover:border-game-blue/50",
      link: "/coming-soon",
    },
    {
      title: "Personal Goals Map",
      desc: "Annual goals tracking checklists and logs.",
      icon: Target,
      color: "text-rose-400",
      borderColor: "border-rose-500/20 hover:border-rose-500/50",
      link: "/coming-soon",
    },
  ];

  return (
    <section id="quick-access" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col items-center mb-12 text-center">
        <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
          Quick Navigation
        </span>
        <h2 className="text-3xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
          Quick Access Resources
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {links.map((item, idx) => {
          const Icon = item.icon;
          const isCV = item.title === "Resume / CV";
          
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              {isCV ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("CV download triggered! (Placeholder link - substitute with real CV file)");
                  }}
                  className={`glass-panel p-5 rounded-xl border ${item.borderColor} flex items-center gap-4 transition-all duration-300 hover:bg-white/5 cursor-pointer group w-full`}
                >
                  <div className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${item.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left flex-grow">
                    <span className="text-xs font-bold text-white group-hover:text-game-cyan transition-colors flex items-center gap-1.5 leading-snug">
                      {item.title} <ExternalLink className="w-3 h-3 text-slate-500" />
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                      {item.desc}
                    </span>
                  </div>
                </a>
              ) : (
                <Link
                  href={item.link}
                  className={`glass-panel p-5 rounded-xl border ${item.borderColor} flex items-center gap-4 transition-all duration-300 hover:bg-white/5 cursor-pointer group w-full`}
                >
                  <div className={`p-2.5 rounded-lg bg-white/5 border border-white/10 ${item.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left flex-grow">
                    <span className="text-xs font-bold text-white group-hover:text-game-cyan transition-colors flex items-center gap-1.5 leading-snug">
                      {item.title} <ExternalLink className="w-3 h-3 text-slate-500" />
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 leading-normal">
                      {item.desc}
                    </span>
                  </div>
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
