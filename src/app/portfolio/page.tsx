"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CharacterProfile from "@/components/CharacterProfile";
import SkillTree from "@/components/SkillTree";
import QuestCard, { ProjectData } from "@/components/QuestCard";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactPortal from "@/components/ContactPortal";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const projects: ProjectData[] = [
    {
      id: "project-1",
      title: "Receiving Operation Dashboard",
      category: "Power BI / Operations",
      problem: "Daily receiving performance was tracked manually and lacked clear visibility by site, date, and pending status.",
      solution: "Built a Power BI dashboard to monitor GRN, GRS, pallets, pending aging, and daily/weekly receiving performance.",
      tools: ["Power BI", "Power Query", "DAX", "Excel", "SharePoint"],
      impact: "Improved daily operational visibility and supported faster management review.",
      difficulty: "Intermediate",
      xpAward: "Significant Impact",
    },
    {
      id: "project-2",
      title: "Inventory On-Hand & Slow-Moving Dashboard",
      category: "Power BI / Inventory Control",
      problem: "Slow-moving inventory and general stock on-hand value were difficult to monitor, analyze, and optimize across categories and material codes.",
      solution: "Built a Power BI dashboard tracking slow-moving value, stock on-hand trends, and key inventory metrics to reduce dead stock and optimize cash flow.",
      tools: ["Power BI", "Power Query", "DAX", "SAP Data"],
      impact: "Improved follow-up visibility and supported root cause analysis for aged/slow-moving inventory.",
      difficulty: "Intermediate",
      xpAward: "Significant Impact",
    },
    {
      id: "project-3",
      title: "Inventory IN/OUT Count Automation",
      category: "Excel VBA / Inventory Control",
      problem: "Inventory count preparation required checking multiple SAP export files manually.",
      solution: "Built a VBA tool to import Inventory, Direct Transfer, and Delivery files, match Material Code and Bin, then generate count-ready variance reports with IN, OUT, SYS, COUNT, and VAR.",
      tools: ["Excel VBA", "Dictionary Object", "SAP Export Files"],
      impact: "Reduced manual preparation time and improved count accuracy visibility.",
      difficulty: "Advanced",
      xpAward: "High Business Impact",
    },
    {
      id: "project-4",
      title: "PR Tracking and Approval Portal",
      category: "Power Apps / Power Automate",
      problem: "Purchase requests and approval tracking were handled manually through email and Excel.",
      solution: "Built a Power Apps portal with SharePoint data source and Power Automate flow for request tracking and approval workflow.",
      tools: ["Power Apps", "Power Automate", "SharePoint", "Microsoft 365"],
      impact: "Improved request transparency, approval tracking, and governance.",
      difficulty: "Advanced",
      xpAward: "High Business Impact",
    },
    {
      id: "project-5",
      title: "SAP Reporting Automation",
      category: "VBA / Python / Automation",
      problem: "Daily reports required repetitive SAP export, cleaning, and formatting.",
      solution: "Automated data extraction, transformation, and report generation using VBA and Python.",
      tools: ["VBA", "Python", "SAP", "Excel"],
      impact: "Reduced manual workload and improved reporting consistency.",
      difficulty: "Intermediate",
      xpAward: "Process Optimized",
    },
  ];

  return (
    <div className="relative min-h-screen text-slate-100">
      {/* Heads-up display Navigation */}
      <Navbar />

      {/* Start screen / profile landing */}
      <Hero />

      {/* About Section / Character Sheet */}
      <CharacterProfile />

      {/* Skills / Skill Tree Grid */}
      <SkillTree />

      {/* Projects / Quest Board */}
      <section id="projects" className="py-24 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
            Key Projects
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((proj) => (
            <QuestCard
              key={proj.id}
              project={proj}
              onPreview={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </section>

      {/* Experience / Journey Timeline */}
      <ExperienceTimeline />

      {/* Contact & Education Panel */}
      <ContactPortal />

      {/* Footer Credentials */}
      <Footer />

      {/* Dynamic Overlay Modal for Quest Details */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
