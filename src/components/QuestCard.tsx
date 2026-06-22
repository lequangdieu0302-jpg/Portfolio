"use client";

import React from "react";
import { Play, Flame, ShieldAlert, Award } from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  tools: string[];
  impact: string;
  difficulty: string;
  xpAward: string;
  images?: string[];
  longDescription?: string;
}

interface QuestCardProps {
  project: ProjectData;
  onPreview: (project: ProjectData) => void;
}

export default function QuestCard({ project, onPreview }: QuestCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Advanced":
        return "text-rose-400 border-rose-500/30 bg-rose-500/10";
      case "Intermediate":
        return "text-game-gold border-game-gold/30 bg-game-gold/10";
      default:
        return "text-game-cyan border-game-cyan/30 bg-game-cyan/10";
    }
  };

  return (
    <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden h-full group">
      {/* HUD Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-game-cyan/50 transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-game-cyan/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-game-cyan/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-game-cyan/50 transition-colors" />

      <div>
        {/* Project Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 mb-4">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
            {project.category}
          </span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase flex items-center gap-1 ${getDifficultyColor(project.difficulty)}`}>
            <Flame className="w-3 h-3" /> {project.difficulty}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-bold text-lg text-white group-hover:text-game-cyan transition-colors line-clamp-1 mb-4">
          {project.title}
        </h3>

        {/* Project Details (Problem & Solution) */}
        <div className="flex flex-col gap-3 text-xs mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px] flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-rose-400" /> The Problem:
            </span>
            <p className="text-slate-300 font-light leading-relaxed line-clamp-2">
              {project.problem}
            </p>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <span className="text-slate-400 font-mono uppercase tracking-wider text-[10px] flex items-center gap-1">
              <Award className="w-3 h-3 text-game-green" /> The Solution:
            </span>
            <p className="text-slate-300 font-light leading-relaxed line-clamp-2">
              {project.solution}
            </p>
          </div>
        </div>
      </div>

      {/* Tools & CTA Section */}
      <div className="flex flex-col gap-4 mt-auto">
        {/* Tool Icons / Badges */}
        <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
          {project.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="text-[9px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded uppercase"
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span className="text-[9px] font-mono text-game-cyan bg-game-cyan/5 border border-game-cyan/10 px-2 py-0.5 rounded uppercase">
              +{project.tools.length - 4} More
            </span>
          )}
        </div>

        {/* Project Impact & View Button */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col text-[10px] font-mono text-slate-400">
            <span>PROJECT IMPACT</span>
            <span className="text-game-gold font-bold">{project.xpAward}</span>
          </div>

          <button
            onClick={() => onPreview(project)}
            className="px-4 py-2 font-mono text-xs font-semibold rounded bg-white/5 border border-white/15 hover:border-game-cyan/40 hover:bg-game-cyan/5 text-slate-300 hover:text-game-cyan transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Project Details
          </button>
        </div>
      </div>
    </div>
  );
}
