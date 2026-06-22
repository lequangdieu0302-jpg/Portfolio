"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Shield, Activity, Sparkles, Download, Sun, Moon, Lock, Unlock } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    
    if (savedTheme === "light" || (!savedTheme && systemPrefersLight)) {
      setIsLight(true);
      document.body.classList.add("light");
    } else {
      setIsLight(false);
      document.body.classList.remove("light");
    }
  }, []);

  useEffect(() => {
    const unlocked = localStorage.getItem("portfolio_unlocked") === "true";
    setIsUnlocked(unlocked);

    // If locked and on a private page, redirect immediately to /portfolio
    const isPrivatePage = pathname === "/" || pathname === "/travel" || pathname === "/settings" || pathname?.startsWith("/coming-soon");
    if (!unlocked && isPrivatePage) {
      router.push("/portfolio");
    }
  }, [pathname]);

  const handleLock = () => {
    localStorage.removeItem("portfolio_unlocked");
    setIsUnlocked(false);
    
    // Redirect if on a private page
    const isPrivatePage = pathname === "/" || pathname === "/travel" || pathname === "/settings" || pathname?.startsWith("/coming-soon");
    if (isPrivatePage) {
      router.push("/portfolio");
    }
  };

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    const systemPasscode = localStorage.getItem("portfolio_passcode") || "dylan123";
    if (password === systemPasscode) {
      localStorage.setItem("portfolio_unlocked", "true");
      setIsUnlocked(true);
      setShowPasswordModal(false);
      setPassword("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const toggleTheme = () => {
    const nextTheme = !isLight;
    setIsLight(nextTheme);
    if (nextTheme) {
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Investment", href: "/coming-soon" },
    { name: "Travel", href: "/travel" },
    { name: "Notes", href: "/coming-soon" },
    { name: "Settings", href: "/settings" },
  ];

  const visibleLinks = isUnlocked
    ? navLinks
    : [{ name: "Portfolio", href: "/portfolio" }];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Player Identity */}
          <div className="flex items-center gap-1">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Circular Avatar masked in the center of the crest */}
              <div className="absolute left-[50%] top-[53%] -translate-x-1/2 -translate-y-1/2 w-[42%] h-[42%] rounded-full overflow-hidden border border-game-cyan/30 bg-slate-950 z-0">
                <img
                  src="/profile.png"
                  alt="Dylan Profile"
                  className="w-full h-full object-cover object-[center_18%] scale-[1.45]"
                />
              </div>

              {/* Premium High-Tech HUD Avatar Frame */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full absolute top-0 left-0 pointer-events-none z-10"
              >
                <style>{`
                  @keyframes tech-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  .animate-tech-spin {
                    animation: tech-spin 25s linear infinite;
                  }
                `}</style>
                <defs>
                  {/* Glowing purple-to-cyan gradient */}
                  <linearGradient id="tech-hud-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7b2ff7" />
                    <stop offset="50%" stopColor="#00f2fe" />
                    <stop offset="100%" stopColor="#0072ff" />
                  </linearGradient>
                </defs>

                {/* Outer Dashed Rotating Compass Ring */}
                <circle
                  cx="50"
                  cy="53"
                  r="30"
                  fill="none"
                  stroke="url(#tech-hud-glow)"
                  strokeWidth="0.75"
                  strokeDasharray="4 6"
                  opacity="0.4"
                  className="animate-tech-spin"
                  style={{ transformOrigin: "50px 53px" }}
                />

                {/* Outer Segmented Ring */}
                <circle
                  cx="50"
                  cy="53"
                  r="27.5"
                  fill="none"
                  stroke="#7b2ff7"
                  strokeWidth="0.5"
                  strokeDasharray="40 10 20 10"
                  opacity="0.5"
                />

                {/* Inner glowing framing circle */}
                <circle
                  cx="50"
                  cy="53"
                  r="21.5"
                  fill="none"
                  stroke="#00f2fe"
                  strokeWidth="1.5"
                  opacity="0.85"
                  style={{ filter: "drop-shadow(0 0 4px rgba(0, 242, 254, 0.6))" }}
                />
                
                <circle
                  cx="50"
                  cy="53"
                  r="23"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="0.5"
                />

                {/* Four Tech Corner Brackets */}
                {/* Top Left */}
                <path d="M 28 31 L 28 25 L 34 25" fill="none" stroke="#00f2fe" strokeWidth="0.75" opacity="0.8" />
                {/* Top Right */}
                <path d="M 72 31 L 72 25 L 66 25" fill="none" stroke="#00f2fe" strokeWidth="0.75" opacity="0.8" />
                {/* Bottom Left */}
                <path d="M 28 75 L 28 81 L 34 81" fill="none" stroke="#00f2fe" strokeWidth="0.75" opacity="0.8" />
                {/* Bottom Right */}
                <path d="M 72 75 L 72 81 L 66 81" fill="none" stroke="#00f2fe" strokeWidth="0.75" opacity="0.8" />

                {/* Cardinal Tech Ticks */}
                <line x1="50" y1="21.5" x2="50" y2="17.5" stroke="#00f2fe" strokeWidth="0.75" opacity="0.8" />
                <line x1="50" y1="84.5" x2="50" y2="88.5" stroke="#00f2fe" strokeWidth="0.75" opacity="0.8" />
                <line x1="17.5" y1="53" x2="21.5" y2="53" stroke="#00f2fe" strokeWidth="0.75" opacity="0.8" />
                <line x1="78.5" y1="53" x2="82.5" y2="53" stroke="#00f2fe" strokeWidth="0.75" opacity="0.8" />
              </svg>

              {/* Clean, Modern Experience Tech Tag */}
              <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 bg-[#090b1e]/95 border border-game-cyan/50 text-game-cyan text-[8px] font-bold tracking-wide px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.3)] font-mono z-20 whitespace-nowrap">
                6 Yrs
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-white hover:text-game-cyan transition-colors text-sm sm:text-base">
                Le Quang Dieu (Dylan)
              </span>
            </div>
          </div>

          {/* Desktop HUD Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {visibleLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative group text-sm font-medium text-slate-300 hover:text-game-cyan tracking-wide transition-colors duration-200"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-game-cyan transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#00f2fe]" />
                </a>
              ))}
            </div>

            {/* Theme Toggle & Lock/Unlock & Download CV */}
            <div className="border-l border-white/10 pl-6 flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-game-cyan/40 hover:bg-game-cyan/5 text-slate-300 hover:text-game-cyan transition-all duration-200 cursor-pointer"
                title={isLight ? "Dark Mode" : "Light Mode"}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  if (isUnlocked) {
                    handleLock();
                  } else {
                    setShowPasswordModal(true);
                  }
                }}
                className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isUnlocked
                    ? "bg-game-cyan/10 border-game-cyan/30 text-game-cyan hover:bg-game-cyan/20"
                    : "bg-white/5 border-white/10 text-slate-300 hover:border-game-purple/40 hover:bg-game-purple/5"
                }`}
                title={isUnlocked ? "Lock Secret Features" : "Unlock Secret Features"}
              >
                {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 focus:outline-none transition-colors border border-white/5"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-white/5 absolute w-full top-full left-0 py-4 px-6 animate-fade-in shadow-2xl">
          {/* Mobile Profile Header */}
          <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-3">
            <div className="w-9 h-9 rounded-full border border-game-cyan/60 overflow-hidden bg-slate-950 flex-shrink-0 shadow-[0_0_8px_rgba(0,242,254,0.3)]">
              <img
                src="/profile.png"
                alt="Dylan Profile"
                className="w-full h-full object-cover object-[center_18%] scale-[1.35]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-xs leading-none">Le Quang Dieu (Dylan)</span>
              <span className="text-[8px] font-mono text-game-cyan uppercase tracking-widest mt-1">SC Analyst</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {visibleLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-game-cyan text-base font-medium py-2 border-b border-white/5 last:border-0 block transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile CV download & Theme toggle & Lock/Unlock */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 font-mono text-xs font-bold rounded bg-white/5 border border-white/10 text-slate-300 hover:text-game-cyan flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLight ? (
                  <>
                    <Moon className="w-4 h-4" /> Switch to Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" /> Switch to Light Mode
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  if (isUnlocked) {
                    handleLock();
                  } else {
                    setShowPasswordModal(true);
                  }
                }}
                className={`w-full py-2.5 font-mono text-xs font-bold rounded border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isUnlocked
                    ? "bg-game-cyan/10 border-game-cyan/30 text-game-cyan"
                    : "bg-white/5 border-white/10 text-slate-300"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <Unlock className="w-4 h-4" /> Lock Secret Features
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Unlock Secret Features
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Futuristic HUD Passcode Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md mx-4 p-8 glass-panel border border-game-cyan/30 rounded-xl shadow-[0_0_50px_rgba(0,242,254,0.2)] bg-[#090b1e]/95 text-slate-100 relative overflow-hidden">
            
            {/* Cyberpunk corner lines */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-game-cyan" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-game-cyan" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-game-cyan" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-game-cyan" />

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-game-cyan/10 border border-game-cyan/45 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,242,254,0.2)] animate-pulse">
                <Shield className="w-8 h-8 text-game-cyan" />
              </div>
              
              <h3 className="font-mono text-xl font-bold tracking-widest text-white uppercase mb-2">
                System Access Key
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">
                [SECURITY LOG: ENTER AUTHORIZATION CODE]
              </p>

              <form onSubmit={handleUnlockAttempt} className="w-full">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className={`w-full py-3 px-4 bg-slate-950/80 border text-center font-mono tracking-widest text-lg text-white rounded-lg focus:outline-none focus:ring-1 transition-all ${
                    passwordError 
                      ? "border-red-500 focus:ring-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" 
                      : "border-game-cyan/30 focus:border-game-cyan focus:ring-game-cyan shadow-[0_0_10px_rgba(0,242,254,0.1)]"
                  }`}
                  autoFocus
                />
                
                {passwordError && (
                  <p className="text-red-400 text-[10px] font-mono mt-2 tracking-wide uppercase">
                    ❌ Decryption failed. Access denied.
                  </p>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPassword("");
                      setPasswordError(false);
                    }}
                    className="flex-1 py-2.5 font-mono text-xs font-bold rounded border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 font-mono text-xs font-bold rounded bg-gradient-to-r from-game-purple to-game-cyan text-white hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
                  >
                    DECRYPT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
