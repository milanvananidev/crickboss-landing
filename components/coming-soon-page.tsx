"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronDown, Globe, Phone, Trophy, Shield, Activity, Radio, MapPin } from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import logoHorizontal from "../logos/logo-horizontal-text.png";
import logoIcon from "../logos/icon-icon.png";
import logoVertical from "../logos/logo-vertical-text.png";

// ─── Country list ──────────────────────────────────────────────────────────────
const COUNTRIES = [
  { flag: "🇮🇳", name: "India", dial: "+91" },
  { flag: "🇦🇺", name: "Australia", dial: "+61" },
  { flag: "🇬🇧", name: "England", dial: "+44" },
  { flag: "🇵🇰", name: "Pakistan", dial: "+92" },
  { flag: "🇱🇰", name: "Sri Lanka", dial: "+94" },
  { flag: "🇧🇩", name: "Bangladesh", dial: "+880" },
  { flag: "🇳🇿", name: "New Zealand", dial: "+64" },
  { flag: "🇿🇦", name: "South Africa", dial: "+27" },
  { flag: "🇦🇪", name: "UAE", dial: "+971" },
  { flag: "🇺🇸", name: "USA", dial: "+1" },
  { flag: "🇨🇦", name: "Canada", dial: "+1" },
];

const workflowSteps = [
  {
    index: "01",
    title: "Create match",
    description: "Choose format, overs, and match details to open the scoring flow.",
    icon: Trophy,
    visual: (
      <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4 shadow-inner ring-1 ring-slate-200">
        <div className="h-2 w-1/3 rounded-full bg-slate-300/60"></div>
        <div className="mt-1 flex justify-between gap-2">
          <div className="flex h-8 flex-1 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm">
            <span className="text-[10px] font-bold text-slate-400">T20</span>
          </div>
          <div className="flex h-8 flex-1 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm">
            <span className="text-[10px] font-bold text-slate-400">10 OVERS</span>
          </div>
        </div>
        <div className="mt-1 h-2 w-full rounded-full bg-brand/30"></div>
      </div>
    )
  },
  {
    index: "02",
    title: "Create team",
    description: "Set up both teams with clean match-ready structure.",
    icon: Shield,
    visual: (
      <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 shadow-inner ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="h-2 w-8 rounded-full bg-slate-300"></div>
          <div className="text-[8px] font-bold text-slate-400">VS</div>
          <div className="h-2 w-8 rounded-full bg-slate-300"></div>
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-brand/10"></div>
              <div className="h-1.5 flex-1 rounded-full bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    index: "03",
    title: "Start scoring",
    description: "Track every ball, run, wicket, and extra from one fast screen.",
    icon: Activity,
    visual: (
      <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4 shadow-inner ring-1 ring-slate-200">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-slate-900">124<span className="text-slate-400">/3</span></span>
          <span className="text-[10px] font-semibold text-slate-400">(14.2)</span>
        </div>
        <div className="mt-2 flex gap-1">
          {["0", "1", "W", "4", "4", "6"].map((ball, i) => (
            <div key={i} className={`flex h-6 flex-1 items-center justify-center rounded text-[10px] font-bold ${ball === 'W' ? 'bg-red-100 text-red-600' : ball === '4' || ball === '6' ? 'bg-brand/10 text-brand' : 'border border-slate-200 bg-white text-slate-600'}`}>
              {ball}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    index: "04",
    title: "Publish live",
    description: "Generate the scoreboard, live ticker, and updated player records automatically.",
    icon: Radio,
    visual: (
      <div className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 p-6 shadow-inner ring-1 ring-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.15),transparent_60%)]"></div>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/20">
          <div className="h-4 w-4 animate-pulse rounded-full bg-[#25D366]"></div>
        </div>
        <span className="relative mt-2 text-[10px] font-bold tracking-widest text-[#25D366]">LIVE BROADCAST</span>
      </div>
    )
  }
];

// ─── Early Access Modal (portal) ──────────────────────────────────────────────
function EarlyAccessModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative z-10 w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_40px_100px_rgba(15,23,42,0.22)]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
          <Phone className="h-3 w-3" />
          WhatsApp Early Access
        </div>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
          Get notified when we launch
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Drop your WhatsApp number — we&apos;ll reach out the moment CrickBoss goes live.
        </p>

        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={async e => {
            e.preventDefault();
            const phoneEl = e.currentTarget.elements.namedItem("whatsapp-modal") as HTMLInputElement;
            if (!phoneEl?.value) return;
            try {
              await fetch("/api/early-access", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: country.dial + " " + phoneEl.value })
              });
              onClose();
            } catch (err) {
              console.error("Failed to save:", err);
            }
          }}
        >
          <div className="flex gap-2">
            {/* Country selector */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3">
              <select
                aria-label="Country code"
                value={country.dial + "|" + country.name}
                onChange={e => {
                  const found = COUNTRIES.find(c => c.dial + "|" + c.name === e.target.value);
                  if (found) setCountry(found);
                }}
                className="max-w-[6rem] bg-transparent py-2 text-sm font-medium text-slate-700 outline-none cursor-pointer"
              >
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.dial + "|" + c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{country.dial}</span>
            </div>

            {/* Phone input */}
            <div className="relative flex-1">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="whatsapp-modal"
                type="tel"
                placeholder="98765 43210"
                autoFocus
                className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-14 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-base font-semibold text-white shadow-[0_8px_28px_rgba(37,211,102,0.30)] transition hover:bg-[#1fba58] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
          >
            Notify Me on WhatsApp
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-slate-400">No spam. We&apos;ll only reach out about CrickBoss.</p>
      </motion.div>
    </div>,
    document.body
  );
}

function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(26,35,126,0.10),transparent_26%),linear-gradient(180deg,#fbfdff_0%,#ffffff_46%,#f3f6fb_100%)]" />
      
      {/* Cricket Ground Vector Accents */}
      <svg className="absolute inset-x-0 bottom-0 h-[60vh] w-full text-brand/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" preserveAspectRatio="none" viewBox="0 0 1000 400" fill="none">
        {/* 30 yard circle approximation */}
        <ellipse cx="500" cy="400" rx="400" ry="250" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" />
        {/* Boundary rope */}
        <ellipse cx="500" cy="400" rx="700" ry="380" stroke="currentColor" strokeWidth="4" />
        <ellipse cx="500" cy="400" rx="720" ry="395" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>

      <div className="absolute left-[-8%] top-[10%] h-[22rem] w-[22rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute right-[-8%] top-[20%] h-[18rem] w-[18rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,white,transparent_84%)]" />
    </div>
  );
}

function FloatingCricketElements() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Floating Action Chips */}
      <motion.div 
        animate={{ y: [0, -15, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-[25%] hidden rounded-full border border-red-200 bg-red-50/80 px-3 py-1 font-mono text-xs font-bold text-red-600 backdrop-blur-sm sm:block shadow-sm"
      >
        WICKET!
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[12%] top-[30%] hidden rounded-full border border-[var(--crickboss-accent)] bg-[var(--crickboss-accent)]/10 px-3 py-1 font-mono text-xs font-bold text-[var(--crickboss-accent)] backdrop-blur-sm sm:block shadow-sm"
      >
        SIX RUNS
      </motion.div>
      <motion.div 
        animate={{ y: [0, -10, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute left-[18%] bottom-[35%] hidden rounded-full border border-brand/20 bg-brand/5 px-3 py-1 font-mono text-xs font-bold text-brand backdrop-blur-sm sm:block shadow-sm"
      >
        CRR: 9.4
      </motion.div>

      {/* Mock Scoreboard Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: -2, y: [0, -8, 0] }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1 },
          scale: { duration: 1 }
        }}
        className="absolute right-[-2%] top-[55%] hidden w-64 rounded-2xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-md sm:block xl:right-[5%]"
      >
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span>Innings 1</span>
          <span className="flex items-center gap-1.5 text-red-500"><span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>LIVE</span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tighter text-slate-900">184<span className="text-xl text-slate-400">/4</span></span>
          <span className="text-sm font-semibold text-slate-500">(18.2 OV)</span>
        </div>
        <div className="mt-3.5 flex flex-col gap-2 border-t border-slate-200/60 pt-3">
          <div className="flex justify-between text-sm text-slate-800">
            <span className="font-medium">Virat K. *</span>
            <span className="font-bold">64 <span className="text-xs font-normal text-slate-400">(42)</span></span>
          </div>
          <div className="flex justify-between text-sm text-slate-800">
            <span className="font-medium">Hardik P.</span>
            <span className="font-bold">28 <span className="text-xs font-normal text-slate-400">(14)</span></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ComingSoonPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroCountry, setHeroCountry] = useState(COUNTRIES[0]);
  const [ctaCountry, setCtaCountry] = useState(COUNTRIES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isLoading]);

  return (
    <main className="bg-[#f8fafc] text-slate-950 overflow-x-clip relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#f8fafc]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image src={logoIcon} priority alt="CrickBoss loading..." className="h-20 w-20 animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isModalOpen && <EarlyAccessModal onClose={() => setIsModalOpen(false)} />}
      
      <div className="absolute inset-x-0 top-0 h-[100dvh] pointer-events-none z-0">
        <AmbientBackground />
        <FloatingCricketElements />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Nav */}
        <header className="w-full" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
            <Image src={logoHorizontal} alt="CrickBoss logo" className="h-auto w-[136px] sm:w-[164px]" />
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Join Early Access
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center px-5 pt-12 pb-24 sm:pt-20 sm:pb-32 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm">
            <Globe className="h-3.5 w-3.5" />
            crickboss.in
          </div>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-medium uppercase tracking-[0.28em] text-accent sm:text-base">
            Where Cricket Never Stops.
          </p>

          <h1 className="mx-auto mt-4 sm:mt-5 max-w-4xl text-[clamp(2.5rem,7vw,5.2rem)] font-semibold leading-[1.05] sm:leading-[0.94] tracking-tight text-slate-950">
            The smartest way to score cricket matches.
          </h1>

          <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-slate-600 sm:text-lg">
            Built for players, captains, scorers, and local leagues who want faster scoring,
            cleaner stats, and a more professional match-day workflow.
          </p>

          <form
            id="early-access"
            className="mx-auto mt-6 sm:mt-8 flex w-full max-w-2xl flex-col gap-2 sm:gap-3 rounded-[1.2rem] sm:rounded-[1.6rem] border border-slate-200 bg-white p-2.5 sm:p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:flex-row"
            onSubmit={async e => {
              e.preventDefault();
              const phoneEl = e.currentTarget.elements.namedItem("whatsapp") as HTMLInputElement;
              if (!phoneEl?.value) return;
              const btn = e.currentTarget.querySelector("button");
              try {
                if (btn) btn.innerHTML = "Joining...";
                await fetch("/api/early-access", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ phone: heroCountry.dial + " " + phoneEl.value })
                });
                if (btn) { btn.innerHTML = "Joined!"; btn.disabled = true; }
              } catch (err) {
                console.error("Failed to save:", err);
                if (btn) btn.innerHTML = "Try Again";
              }
            }}
          >
            {/* Country selector */}
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3">
              <select
                aria-label="Country code"
                value={heroCountry.dial + "|" + heroCountry.name}
                onChange={e => {
                  const found = COUNTRIES.find(c => c.dial + "|" + c.name === e.target.value);
                  if (found) setHeroCountry(found);
                }}
                className="max-w-[6rem] bg-transparent py-2 text-sm font-medium text-slate-700 outline-none cursor-pointer"
              >
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.dial + "|" + c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{heroCountry.dial}</span>
            </div>

            {/* Phone input */}
            <label htmlFor="whatsapp" className="sr-only">WhatsApp number</label>
            <div className="relative flex-1">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="whatsapp"
                type="tel"
                placeholder="98765 43210"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
              />
            </div>

            <button
              type="submit"
              className="h-14 flex-shrink-0 rounded-2xl bg-accent px-6 text-base font-semibold text-white shadow-[0_12px_35px_rgba(46,125,50,0.25)] transition hover:bg-[#25692a] focus:outline-none focus:ring-4 focus:ring-accent/20"
            >
              Join Early Access
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-500">
            We&apos;ll reach out on WhatsApp. No spam, ever.
          </p>
        </section>

        {/* Workflow Section (Timeline) */}
        <section className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm">
              <Globe className="h-3.5 w-3.5" />
              Process
            </div>
            <h2 className="mt-5 max-w-2xl text-[clamp(1.8rem,3.8vw,3rem)] font-semibold leading-[1] tracking-tight text-slate-950">
              One connected match flow from setup to live updates.
            </h2>
          </div>

          <div className="relative mt-16 sm:mt-24">
            {/* The vertical connecting line */}
            <div className="absolute bottom-10 left-6 top-10 w-[2px] bg-slate-200 lg:left-1/2 lg:-ml-[1px]"></div>

            <div className="flex flex-col gap-12 lg:gap-0">
              {workflowSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={step.index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className={`relative flex flex-col lg:flex-row items-start lg:items-center w-full ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-6 flex h-8 w-8 -translate-x-1/2 items-center justify-center lg:left-1/2 mt-[28px] lg:mt-0 z-10">
                      <div className="relative flex h-full w-full items-center justify-center">
                        <div className="absolute h-full w-full animate-ping rounded-full bg-brand/25 opacity-75"></div>
                        <div className="relative h-4 w-4 rounded-full border-[3px] border-white bg-brand shadow-sm"></div>
                      </div>
                    </div>

                    {/* Empty spacer for alternating sides on desktop */}
                    <div className="hidden lg:block lg:w-1/2"></div>
                    
                    {/* Card Container */}
                    <div className={`w-full pl-16 lg:w-1/2 lg:py-8 ${isEven ? 'lg:pl-0 lg:pr-16' : 'lg:pl-16 lg:pr-0'}`}>
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                        className="relative flex w-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] ring-1 ring-slate-100 backdrop-blur-sm transition hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8"
                      >
                        {/* Background Watermark Numeral */}
                        <div className="pointer-events-none absolute -right-2 -top-8 select-none text-[8rem] font-bold leading-none tracking-tighter text-slate-100/60 sm:-right-4 sm:-top-8 sm:text-[10rem]">
                          {step.index}
                        </div>

                        <div className="relative z-10 w-full">
                          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/5 text-brand shadow-sm">
                            <step.icon className="h-7 w-7" />
                          </div>
                          
                          <div className="text-xs font-medium uppercase tracking-[0.24em] text-brand">
                            Step {step.index}
                          </div>
                          
                          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                            {step.title}
                          </h3>
                          
                          <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
                            {step.description}
                          </p>

                          {/* App UI Visual */}
                          <div className="mt-8 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200/60 w-full max-w-sm">
                            {step.visual}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Combined Countdown + CTA Section */}
      <section className="relative overflow-hidden border-t border-slate-200 bg-white px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* ambient glows */}
        <div className="pointer-events-none absolute left-[-5%] top-[-20%] h-[28rem] w-[28rem] rounded-full bg-brand/6 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[-20%] right-[-5%] h-[22rem] w-[22rem] rounded-full bg-accent/6 blur-[100px]" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 lg:items-center">

          {/* LEFT — Countdown */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-start text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm"
            >
              <Globe className="h-3.5 w-3.5" />
              Launching Soon
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-6 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.05] tracking-tight text-slate-950"
            >
              CrickBoss goes live in
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-3 max-w-sm text-base text-slate-500"
            >
              Join the early access list and be among the first to score, track, and win with CrickBoss.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-10 w-full max-w-sm"
            >
              <CountdownTimer />
            </motion.div>
          </motion.div>

          {/* RIGHT — WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex flex-col items-start text-left rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-10 shadow-[0_32px_80px_rgba(15,23,42,0.14)] overflow-hidden"
          >
            {/* glow inside card */}
            <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[20rem] w-[20rem] rounded-full bg-brand/25 blur-[90px]" />
            <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[16rem] w-[16rem] rounded-full bg-[#25D366]/15 blur-[80px]" />

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-400 backdrop-blur-sm"
              >
                <Phone className="h-3.5 w-3.5" />
                Get Early Access on WhatsApp
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-tight text-white"
              >
                Be the first to score with CrickBoss.
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.28 }}
                viewport={{ once: true, amount: 0.3 }}
                className="mt-3 text-base leading-7 text-slate-400"
              >
                Drop your WhatsApp number and we&apos;ll notify you the moment CrickBoss goes live.
              </motion.p>

              <motion.form
                id="whatsapp-cta"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.36 }}
                viewport={{ once: true, amount: 0.3 }}
                className="mt-7 flex w-full flex-col gap-3"
                onSubmit={async e => {
                  e.preventDefault();
                  const phoneEl = e.currentTarget.elements.namedItem("whatsapp-bottom") as HTMLInputElement;
                  if (!phoneEl?.value) return;
                  const btn = e.currentTarget.querySelector("button");
                  try {
                    if (btn) btn.innerHTML = "Joining...";
                    await fetch("/api/early-access", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ phone: ctaCountry.dial + " " + phoneEl.value })
                    });
                    if (btn) {
                      btn.innerHTML = "Joined! <svg class='h-4 w-4 ml-2' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'></polyline></svg>";
                      btn.disabled = true;
                    }
                  } catch (err) {
                    console.error("Failed to save:", err);
                    if (btn) btn.innerHTML = "Try Again";
                  }
                }}
              >
                {/* Country + Phone row */}
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-3">
                    <select
                      aria-label="Country code"
                      value={ctaCountry.dial + "|" + ctaCountry.name}
                      onChange={e => {
                        const found = COUNTRIES.find(c => c.dial + "|" + c.name === e.target.value);
                        if (found) setCtaCountry(found);
                      }}
                      className="max-w-[6rem] bg-transparent py-2 text-sm font-medium text-slate-300 outline-none cursor-pointer"
                      style={{ colorScheme: "dark" }}
                    >
                      {COUNTRIES.map(c => (
                        <option key={c.name} value={c.dial + "|" + c.name} className="bg-slate-900 text-white">
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">{ctaCountry.dial}</span>
                  </div>

                  <label htmlFor="whatsapp-bottom" className="sr-only">WhatsApp number</label>
                  <div className="relative flex-1">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="whatsapp-bottom"
                      type="tel"
                      placeholder="98765 43210"
                      className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.08] pl-11 pr-4 text-base text-white outline-none placeholder:text-slate-500 focus:border-brand/60 focus:bg-white/[0.12] focus:ring-4 focus:ring-brand/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="h-14 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-base font-semibold text-white shadow-[0_8px_30px_rgba(37,211,102,0.30)] transition hover:bg-[#1fba58] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
                >
                  Notify Me on WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.form>

              <p className="mt-4 text-sm text-slate-600">We&apos;ll reach out on WhatsApp. No spam, ever.</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Made in India + Footer — unified */}
      <section className="relative overflow-hidden border-t border-slate-200 bg-[linear-gradient(180deg,rgba(255,153,51,0.10)_0%,rgba(255,255,255,1)_50%,rgba(19,136,8,0.10)_100%)] px-5 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        {/* <div className="absolute inset-x-0 top-0 h-16 bg-[#ff9933]/15" /> */}
        {/* <div className="absolute inset-x-0 bottom-0 h-20 bg-[#138808]/10" /> */}

        {/* Main content */}
        <div className="relative mx-auto flex max-w-6xl flex-col items-center text-center pb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm"
          >
            <Globe className="h-3.5 w-3.5" />
            Built with intent
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-6 text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-tight text-slate-950"
          >
            Proudly Made in India
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-4 max-w-3xl text-lg font-medium text-slate-700 sm:text-2xl"
          >
            By Engineers who love cricket
          </motion.p>
        </div>

        {/* Footer row — blended inside the India section */}
        {/* <div className="relative border-t border-slate-200/60 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <Image src={logoIcon} alt="CrickBoss icon" className="h-7 w-7 opacity-70" />
              <div>
                <div className="text-sm font-semibold text-slate-800">CrickBoss</div>
                <div className="text-xs text-slate-500">© 2026 CrickBoss. All rights reserved.</div>
              </div>
            </div>
            <div className="flex items-center gap-5 text-sm text-slate-500">
              <a className="transition hover:text-brand" href="https://crickboss.in">crickboss.in</a>
              <a className="transition hover:text-brand" href="mailto:hello@crickboss.in">hello@crickboss.in</a>
            </div>
          </div>
        </div> */}
      </section>
    </main>
  );
}
