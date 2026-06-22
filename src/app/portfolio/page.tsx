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
      longDescription: "Developed a centralized Power BI reporting solution for logistics operations. By extracting daily SAP transaction data and loading it into SharePoint lists, the dashboard automatically visualizes receiving velocity, pending queue aging (discrepancy reasons, physical hold, documents lag), and shift-level productivity. This replaced three separate manual spreadsheets and unified reporting across multiple warehouse sites."
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
      images: ["/kpi_dashboard.png"],
      longDescription: "Created an inventory health tracker mapping total stock holding value ($) against aging buckets (e.g. 0-90, 91-180, 180+ days). The system automatically highlights slow-moving material codes based on historical consumption velocity. Facilitated monthly inventory reviews by providing supply chain analysts with clickable filters for product categories, sites, and material owners, directly contributing to target dead-stock write-off reductions."
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
      images: ["/projects/VBA Check Shortage Material.jpg"],
      longDescription: "Designed a custom VBA-driven reconciliation tool that automates inventory auditing. The tool uses Excel scripting (Scripting.Dictionary for O(1) matching speed) to load, parse, and match raw SAP exports including inventory status, warehouse bin mapping, and transit lists. It auto-generates a discrepancy sheet highlighting variance categories (system vs. physical count), cutting audit prep times down from 4 hours to under 5 minutes while maintaining strict data consistency."
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
      images: ["/projects/PO Portal.png", "/projects/PO Portal1.png"],
      longDescription: "Developed a custom Canvas App in Microsoft Power Apps to replace email-based purchase requisitions (PR). The app integrates directly with a secured SharePoint backend, allowing users to submit new PR requests, upload quotations, and track approval states in real-time. It triggers a multi-level Power Automate approval workflow that notifies supervisors via Teams adaptive cards and email. Successfully deployed to over 150 team members, reducing PR cycle time by 60%."
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
      images: ["/projects/VBA SAP Automation.png", "/projects/VBA SAP Automation PGI.png"],
      longDescription: "Created a scheduled Python script leveraging the SAP GUI scripting API to automate standard operational reports. The script connects to the SAP session, logs in safely, navigates transaction codes (MB51, Z-tables), downloads reports in text format, and triggers a Python Pandas pipeline. Pandas parses the layout, cleans null/invalid rows, merges master records, and formats the output into executive-ready Excel files, distributing them automatically via Outlook to stakeholders."
    },
    {
      id: "project-6",
      title: "Freelance Small ERP Project",
      category: "Full-Stack / Next.js / Supabase",
      problem: "A small local business struggled to manage client invoices, purchase records, and inventory levels in a unified application.",
      solution: "Developed a lightweight Next.js and Supabase ERP application featuring real-time inventory tracking, supplier ordering, sales tracking, and PDF invoicing.",
      tools: ["Next.js", "Supabase", "React", "TypeScript", "Tailwind CSS"],
      impact: "Provided a unified, reliable dashboard for sales and inventory, eliminating manual bookkeeping errors.",
      difficulty: "Advanced",
      xpAward: "High Business Impact",
      images: [
        "/projects/Freelance small ERP Project.jpg",
        "/projects/Freelance small ERP Project1.png",
        "/projects/Freelance small ERP Project2.png"
      ],
      longDescription: "Designed and deployed a responsive web ERP system for a client. Built on Next.js for high performance and hosted on Vercel, it connects to a Supabase PostgreSQL database. Implemented role-based access control, allowing admins to track inventory adjustments, record sales, and draft purchase orders. The app utilizes client-side PDF generation to automate invoicing and features sales analytics charts for revenue, popular products, and profit margins."
    },
    {
      id: "project-7",
      title: "HR & Employee Management Dashboard",
      category: "Power BI / HR Analytics",
      problem: "HR personnel faced difficulties in tracking employee records, monitoring headcount changes, and identifying department-level turnover risks.",
      solution: "Built a Power BI HR Dashboard that aggregates employee records, tracks headcount trends, highlights turnover rates, and visualizes performance evaluations.",
      tools: ["Power BI", "Power Query", "DAX", "Excel"],
      impact: "Streamlined HR metrics reporting and enabled proactive turnover risk analysis.",
      difficulty: "Intermediate",
      xpAward: "Significant Impact",
      images: [
        "/projects/HR Dashboard.png",
        "/projects/HR Dashboard1.png",
        "/projects/HR Dashboard2.png"
      ],
      longDescription: "Created an HR analytics dashboard displaying key people metrics: active headcount, monthly additions/exits, average tenure, and performance distribution. Formulated DAX metrics to compute rolling annual turnover rate and categorize staff by tenure brackets. Features filters for location, department, and manager, enabling HR stakeholders to perform deep dives into employee lifecycle stages and identify teams with high turnover spikes."
    },
    {
      id: "project-8",
      title: "Indirect Material Control Report",
      category: "Power BI / Cost Control",
      problem: "Controlling non-production material costs across multiple departments was challenging due to fragmented purchase logs.",
      solution: "Created a Power BI report that consolidates indirect material invoices, purchase orders, and departmental budgets to track spending variances.",
      tools: ["Power BI", "Power Query", "DAX", "Excel", "SAP Data"],
      impact: "Improved departmental cost visibility, reducing indirect material waste by 12% in the first quarter.",
      difficulty: "Intermediate",
      xpAward: "Cost Optimization",
      images: ["/projects/Indirect material control report.png"],
      longDescription: "Designed a cost-control dashboard matching department budgets against actual indirect material expenses. By extracting SAP cost-center logs and merging them with monthly departmental budget sheets, the tool automatically calculates variances. Spenders can visualize their budget consumption velocity, receive warning indicators when approaching limits, and review list items driving the highest costs."
    },
    {
      id: "project-9",
      title: "Test Lab Report & Database Integration",
      category: "Web App / SQL / Operations",
      problem: "Test lab results were stored in scattered files, slowing down product quality assurance audits and search capability.",
      solution: "Developed a web portal integrated with an operational database to index, search, and view historical product test results and certificates.",
      tools: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      impact: "Improved QA audit times by 75% and secured historical records against loss.",
      difficulty: "Advanced",
      xpAward: "Process Optimized",
      images: [
        "/projects/Testlabreport.png",
        "/projects/Testlabreport1.png",
        "/projects/Testlabreport3.png",
        "/projects/Testlabreport4.png",
        "/projects/Testlabreport5.png",
        "/projects/Testlabreport6.png",
        "/projects/Testlabreport7.png",
        "/projects/Testlabreport8.png"
      ],
      longDescription: "Built a secure, centralized portal for lab test tracking. Quality assurance teams use the portal to search test records by batch number, product type, or date. Implemented a Node.js/Express backend querying a PostgreSQL database. Features detailed product compliance status reporting, automatic validation of test parameters against limits, and a clean, responsive web UI for mobile and desktop views."
    }
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
