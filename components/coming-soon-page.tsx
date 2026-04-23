"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, Globe, Phone } from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import logoHorizontal from "../logos/logo-horizontal-text.png";
import logoIcon from "../logos/icon-icon.png";
import logoVertical from "../logos/logo-vertical-text.png";

gsap.registerPlugin(ScrollTrigger);

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
    description: "Choose format, overs, and match details to open the scoring flow."
  },
  {
    index: "02",
    title: "Create team",
    description: "Set up both teams with clean match-ready structure."
  },
  {
    index: "03",
    title: "Start scoring",
    description: "Track every ball, run, wicket, and extra from one fast screen."
  },
  {
    index: "04",
    title: "Publish live",
    description: "Generate the scoreboard, live ticker, and updated player records automatically."
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
      <div className="absolute left-[-8%] top-[10%] h-[22rem] w-[22rem] rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute right-[-8%] top-[20%] h-[18rem] w-[18rem] rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,white,transparent_84%)]" />
    </div>
  );
}

export function ComingSoonPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroCountry, setHeroCountry] = useState(COUNTRIES[0]);
  const [ctaCountry, setCtaCountry] = useState(COUNTRIES[0]);
  const [modalCountry, setModalCountry] = useState(COUNTRIES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const logoStageRef = useRef<HTMLDivElement | null>(null);
  const heroStageRef = useRef<HTMLDivElement | null>(null);
  const workflowStageRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Hide loader after a short aesthetic delay
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
    // Cleanup on unmount or state change
    return () => { document.body.style.overflow = ""; };
  }, [isLoading]);

  useEffect(() => {
    const section = sectionRef.current;
    const nav = navRef.current;
    const logoStage = logoStageRef.current;
    const heroStage = heroStageRef.current;
    const workflowStage = workflowStageRef.current;
    const scrollHint = scrollHintRef.current;

    if (!section || !nav || !logoStage || !heroStage || !workflowStage || !scrollHint) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(nav, { autoAlpha: 0 });
      gsap.set(heroStage, { autoAlpha: 0, y: 48 });
      gsap.set(workflowStage, { autoAlpha: 0, y: 48 });
      gsap.set(scrollHint, { autoAlpha: 1, y: 0 });
      gsap.set(".workflow-step", { autoAlpha: 0, y: 30 });
      gsap.set(".workflow-step-1", { autoAlpha: 1, y: 0 });
      gsap.set(".workflow-step-label", { autoAlpha: 0.35 });
      gsap.set(".workflow-step-label-1", { autoAlpha: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4800",
          scrub: 1.1,
          pin: true,
          anticipatePin: 1
        }
      });

      timeline
        .to(logoStage, { scale: 0.8, y: -70, autoAlpha: 0.75, duration: 1.2 })
        .to(scrollHint, { autoAlpha: 0, y: 16, duration: 0.5 }, "<")
        .to(logoStage, { scale: 0.42, y: -170, autoAlpha: 0, duration: 1.1 })
        .to(nav, { autoAlpha: 1, duration: 0.45 }, "-=0.45")
        .to(heroStage, { autoAlpha: 1, y: 0, duration: 1.1 })
        .to({}, { duration: 1.1 })
        .to(heroStage, { autoAlpha: 0, y: -30, duration: 0.8 })
        .to(workflowStage, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.15")
        .to({}, { duration: 0.8 })
        .to(".workflow-step-1", { autoAlpha: 0, y: -20, duration: 0.28 })
        .to(".workflow-step-label-1", { autoAlpha: 0.35, duration: 0.18 }, "<")
        .to(".workflow-step-2", { autoAlpha: 1, y: 0, duration: 0.32 }, "<")
        .to(".workflow-step-label-2", { autoAlpha: 1, duration: 0.18 }, "<")
        .to({}, { duration: 0.58 })
        .to(".workflow-step-2", { autoAlpha: 0, y: -20, duration: 0.28 })
        .to(".workflow-step-label-2", { autoAlpha: 0.35, duration: 0.18 }, "<")
        .to(".workflow-step-3", { autoAlpha: 1, y: 0, duration: 0.32 }, "<")
        .to(".workflow-step-label-3", { autoAlpha: 1, duration: 0.18 }, "<")
        .to({}, { duration: 0.58 })
        .to(".workflow-step-3", { autoAlpha: 0, y: -20, duration: 0.28 })
        .to(".workflow-step-label-3", { autoAlpha: 0.35, duration: 0.18 }, "<")
        .to(".workflow-step-4", { autoAlpha: 1, y: 0, duration: 0.32 }, "<")
        .to(".workflow-step-label-4", { autoAlpha: 1, duration: 0.18 }, "<")
        .to({}, { duration: 1.1 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#f8fafc] text-slate-950 overflow-x-clip">

      {/* Loading Overlay */}
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
      <section ref={sectionRef} className="relative min-h-screen">
        <div className="relative h-screen overflow-hidden">
          <AmbientBackground />

          <div ref={navRef} className="absolute inset-x-0 top-0 z-20">
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
          </div>

          <div ref={logoStageRef} className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
            <Image
              src={logoVertical}
              alt="CrickBoss logo"
              className="h-auto w-[220px] sm:w-[280px] lg:w-[330px]"
              priority
            />
          </div>

          <div
            ref={scrollHintRef}
            className="absolute inset-x-0 bottom-10 z-20 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-5 py-4 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm">
              <span>Scroll Down</span>
              <ChevronDown className="h-4 w-4 text-brand" />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 sm:px-6 lg:px-8">
            <div
              ref={heroStageRef}
              className="pointer-events-auto mx-auto flex w-full max-w-4xl flex-col items-center text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm">
                <Globe className="h-3.5 w-3.5" />
                crickboss.in
              </div>

              <p className="mt-6 text-sm font-medium uppercase tracking-[0.28em] text-accent sm:text-base">
                Where Cricket Never Stops.
              </p>

              <h1 className="mx-auto mt-5 max-w-4xl text-[clamp(2.9rem,7vw,5.2rem)] font-semibold leading-[0.94] tracking-tight text-slate-950">
                The smartest way to score cricket matches.
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Built for players, captains, scorers, and local leagues who want faster scoring,
                cleaner stats, and a more professional match-day workflow.
              </p>

              <form
                id="early-access"
                className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:flex-row"
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
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 pb-8 pt-36 sm:px-6 sm:pb-10 sm:pt-40 lg:px-8 lg:pb-12 lg:pt-44">
            <div
              ref={workflowStageRef}
              className="pointer-events-auto mx-auto flex max-h-full w-full max-w-5xl flex-col items-center justify-center text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-600 shadow-sm">
                <Globe className="h-3.5 w-3.5" />
                How It Works
              </div>

              <h2 className="mt-5 max-w-2xl text-[clamp(1.8rem,3.8vw,3rem)] font-semibold leading-[1] tracking-tight text-slate-950">
                One connected match flow from setup to live updates.
              </h2>

              <div className="relative mt-12 flex min-h-[300px] w-full items-center justify-center">
                {workflowSteps.map((step, itemIndex) => (
                  <div
                    key={step.index}
                    className={`workflow-step workflow-step-${itemIndex + 1} absolute inset-0 flex items-center justify-center`}
                  >
                    <div className="w-full max-w-[620px] rounded-[28px] border border-slate-200 bg-white px-6 py-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10">
                      <div className="text-xs font-medium uppercase tracking-[0.24em] text-brand">
                        Step {step.index}
                      </div>
                      <div className="mt-4 text-[clamp(2.2rem,4.2vw,3.6rem)] font-semibold tracking-tight text-slate-950">
                        {step.title}
                      </div>
                      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.18em]">
                {workflowSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`workflow-step-label workflow-step-label-${index + 1}`}
                  >
                    {step.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
