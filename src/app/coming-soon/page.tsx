"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function ComingSoonPage() {
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
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between">
      {/* HUD Navigation */}
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-game-purple/10 rounded-full filter blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-game-cyan/5 rounded-full filter blur-[100px] animate-pulse-glow" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel w-full max-w-lg p-8 sm:p-12 rounded-2xl border border-white/10 shadow-[0_0_35px_rgba(123,47,247,0.15)] flex flex-col items-center text-center relative"
        >
          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-game-cyan/40" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-game-cyan/40" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-game-cyan/40" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-game-cyan/40" />

          {/* Animated Tech Icon */}
          <div className="relative mb-8">
            <div className="absolute -inset-2 bg-gradient-to-r from-game-cyan via-game-blue to-game-purple rounded-full blur opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 bg-slate-950 border-2 border-game-cyan/80 rounded-full flex items-center justify-center">
              <Cpu className="w-10 h-10 text-game-cyan animate-spin-slow" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-900 border border-game-gold rounded-full flex items-center justify-center shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-game-gold" />
            </div>
          </div>

          <span className="text-[10px] font-mono tracking-widest text-game-gold border border-game-gold/30 bg-game-gold/10 px-3 py-1 rounded-full uppercase mb-4 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-game-gold" /> Module Offline
          </span>

          <h1 className="text-3xl font-extrabold text-white uppercase tracking-wider text-glow-cyan mb-2">
            Under Construction
          </h1>
          
          <p className="text-xs font-mono text-game-cyan uppercase tracking-widest mb-6">
            SECURE ACCESS PORTAL ENCRYPTED
          </p>

          <p className="text-slate-300 text-sm font-light leading-relaxed mb-8 max-w-sm">
            This module is planned in the Dylan's Control Tower development roadmap. Real-time data integration, APIs, and dashboard layouts will be deployed in the next updates.
          </p>

          {/* Action button */}
          <Link
            href="/"
            className="btn-game-primary w-full py-3 font-mono text-xs font-bold tracking-wider text-white flex items-center justify-center gap-2 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to Command Center
          </Link>
        </motion.div>
      </main>

      {/* Footer HUD */}
      <Footer />
    </div>
  );
}
