"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import HeroControlPanel from "@/components/control-tower/HeroControlPanel";
import OverviewCard from "@/components/control-tower/OverviewCard";
import ModuleCard from "@/components/control-tower/ModuleCard";
import RoadmapTimeline from "@/components/control-tower/RoadmapTimeline";
import QuickAccessPanel from "@/components/control-tower/QuickAccessPanel";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unlocked = localStorage.getItem("portfolio_unlocked") === "true";
    if (!unlocked) {
      router.push("/portfolio");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#090b1e] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-game-cyan animate-spin mb-4" />
          <p className="font-mono text-xs tracking-widest text-game-cyan uppercase animate-pulse">
            Loading System Modules...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden">
      {/* HUD Navigation */}
      <Navbar />

      {/* Hero Control Tower Header */}
      <HeroControlPanel />

      {/* Metrics Dashboard */}
      <OverviewCard />

      {/* System Modules Quest Board */}
      <ModuleCard />

      {/* Map Timeline Build Roadmap */}
      <RoadmapTimeline />

      {/* Quick Access resource drawer */}
      <QuickAccessPanel />

      {/* Footer Credentials */}
      <Footer />
    </div>
  );
}
