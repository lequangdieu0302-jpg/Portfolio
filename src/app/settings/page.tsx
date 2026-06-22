"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Key, 
  Mail, 
  User, 
  Calendar, 
  AlertTriangle 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Passcode Settings State
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState(false);

  // Authentication Route Guard
  useEffect(() => {
    const unlocked = localStorage.getItem("portfolio_unlocked") === "true";
    if (!unlocked) {
      router.push("/portfolio");
    } else {
      setCheckingAuth(false);
      loadMessages();
    }
  }, [router]);

  const loadMessages = () => {
    try {
      const stored = localStorage.getItem("portfolio_messages");
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load messages", e);
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm("Are you sure you want to delete this transmission?")) {
      const updated = messages.filter((msg) => msg.id !== id);
      setMessages(updated);
      localStorage.setItem("portfolio_messages", JSON.stringify(updated));
    }
  };

  const handleClearAllMessages = () => {
    if (confirm("WARNING: Are you sure you want to completely erase all transmissions? This action cannot be undone.")) {
      setMessages([]);
      localStorage.removeItem("portfolio_messages");
    }
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess(false);

    const activePasscode = localStorage.getItem("portfolio_passcode") || "dylan123";

    if (currentPass !== activePasscode) {
      setPassError("❌ Current passcode is incorrect. Authorization failed.");
      return;
    }

    if (newPass.length < 4) {
      setPassError("❌ New passcode must be at least 4 characters long.");
      return;
    }

    if (newPass !== confirmPass) {
      setPassError("❌ New passcodes do not match.");
      return;
    }

    localStorage.setItem("portfolio_passcode", newPass);
    setPassSuccess(true);
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  };

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
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-game-purple/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Page Title */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
            System Control Panel
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
            Settings & Log Console
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Decrypted Transmissions (Inbox) - 8cols */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-game-cyan" />
                <h3 className="text-lg font-bold text-white tracking-wide font-mono uppercase">
                  Decrypted Transmissions ({messages.length})
                </h3>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={handleClearAllMessages}
                  className="px-3 py-1.5 font-mono text-[10px] font-bold rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer uppercase flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Erase Database
                </button>
              )}
            </div>

            {messages.length === 0 ? (
              <div className="glass-panel p-16 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                <ShieldAlert className="w-12 h-12 text-slate-500 mb-4 animate-pulse" />
                <p className="font-mono text-xs tracking-wider text-slate-400 uppercase">
                  [SYSTEM SECURED • NO INCOMING TRANSMISSIONS REPORTED]
                </p>
                <p className="text-[10px] text-slate-600 font-mono mt-1">
                  Submissions from the portfolio contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col gap-4 hover:border-white/10 transition-colors"
                    >
                      {/* Corner decoration lines */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
                      
                      {/* Header details */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b border-white/5 pb-3 font-mono text-[10px]">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-game-cyan font-bold flex items-center gap-1">
                            <User className="w-3.5 h-3.5" /> {msg.name}
                          </span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" /> {msg.email}
                          </span>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                          <span className="text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {new Date(msg.date).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-all cursor-pointer"
                            title="Delete message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="text-slate-200 text-xs font-light leading-relaxed whitespace-pre-line">
                        {msg.message}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Right Column: Passcode Configuration - 4cols */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="border-b border-white/10 pb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-game-purple" />
              <h3 className="text-lg font-bold text-white tracking-wide font-mono uppercase">
                System Credentials
              </h3>
            </div>

            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 relative">
              <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-game-purple/50" />
              <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-game-purple/50" />
              <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-game-purple/50" />
              <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-game-purple/50" />

              <form onSubmit={handleChangePasscode} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="currentPass" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    Current Passcode
                  </label>
                  <input
                    type="password"
                    id="currentPass"
                    required
                    placeholder="••••••••"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-game-purple/50 transition-all font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="newPass" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    New Passcode
                  </label>
                  <input
                    type="password"
                    id="newPass"
                    required
                    placeholder="••••••••"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-game-purple/50 transition-all font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPass" className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    id="confirmPass"
                    required
                    placeholder="••••••••"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-game-purple/50 transition-all font-mono"
                  />
                </div>

                {passError && (
                  <p className="text-[10px] font-mono text-red-400 leading-normal">
                    {passError}
                  </p>
                )}

                {passSuccess && (
                  <p className="text-[10px] font-mono text-game-green leading-normal flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Passcode updated successfully.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-game-purple to-game-blue text-white font-mono text-xs font-bold tracking-wider uppercase rounded-xl hover:shadow-[0_0_15px_rgba(123,47,247,0.3)] transition-all cursor-pointer mt-2"
                >
                  Update Passcode
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
