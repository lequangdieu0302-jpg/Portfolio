"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Award, BookOpen, CheckCircle } from "lucide-react";

export default function ContactPortal() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");

    // Save message to localStorage
    const newMessage = {
      id: "msg-" + Date.now(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString(),
    };
    
    try {
      const existing = localStorage.getItem("portfolio_messages");
      const messages = existing ? JSON.parse(existing) : [];
      messages.unshift(newMessage); // Add new message to the beginning
      localStorage.setItem("portfolio_messages", JSON.stringify(messages));
    } catch (err) {
      console.error("Error saving message:", err);
    }

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  const achievements = [
    {
      title: "Bachelor's Degree",
      sub: "Logistics and Supply Chain Management",
      institution: "Ho Chi Minh University of Tech & Education (HCMUTE)",
      icon: BookOpen,
      color: "text-game-gold border-game-gold/30 bg-game-gold/10",
      glow: "shadow-[0_0_15px_rgba(255,211,42,0.2)]",
    },
  ];

  return (
    <section id="contact" className="py-24 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Visual glowing portal backpiece */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-game-purple/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Education / Achievement Badges */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col">
            <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
              Credentials
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
              Education & Certifications
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
          </div>

          <div className="flex flex-col gap-6">
            {achievements.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`glass-panel p-6 rounded-2xl border flex gap-4 items-start relative overflow-hidden ${item.glow}`}
                >
                  <div className={`p-3 rounded-xl border flex-shrink-0 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      VERIFIED CREDENTIAL
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-200 mt-0.5 font-medium leading-snug">
                      {item.sub}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                      {item.institution}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social details list */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4 font-mono text-xs text-slate-300">
            <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-white/5 pb-2 mb-1">
              Contact Coordinates
            </h4>
            
            <a href="mailto:lequangdieu0302@gmail.com" className="flex items-center gap-3 hover:text-game-cyan transition-colors">
              <Mail className="w-4 h-4 text-game-cyan" />
              <span>lequangdieu0302@gmail.com</span>
            </a>
            
            <a href="tel:+84337975050" className="flex items-center gap-3 hover:text-game-cyan transition-colors">
              <Phone className="w-4 h-4 text-game-cyan" />
              <span>+84 337 975 050</span>
            </a>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-game-cyan" />
              <span>Thu Duc, Ho Chi Minh City</span>
            </div>
            
            <a
              href="https://www.linkedin.com/in/di%E1%BB%87u-l%C3%AA-quang-7389101a8/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 hover:text-game-cyan transition-colors"
            >
              <svg
                className="w-4 h-4 text-game-cyan"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>Lê Quang Diệu (LinkedIn)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Connect Portal Form */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col">
            <span className="text-xs font-mono tracking-widest text-game-cyan uppercase">
              Get In Touch
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-1 uppercase tracking-wider text-glow-cyan">
              Contact Form
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-game-purple to-game-cyan mt-3 rounded-full" />
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 relative">
            {/* Corner Bracket styling */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-game-cyan/40" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-game-cyan/40" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-game-cyan/40" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-game-cyan/40" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-game-cyan/50 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-game-cyan/50 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  Your Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0a0c1f]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-game-cyan/50 focus:shadow-[0_0_15px_rgba(0,242,254,0.15)] transition-all placeholder:text-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className={`btn-game-primary py-3.5 px-6 font-mono text-sm font-bold tracking-wider uppercase text-white flex items-center justify-center gap-2 cursor-pointer ${
                  status !== "idle" ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {status === "sending" ? (
                  <>Sending...</>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-game-green" /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
