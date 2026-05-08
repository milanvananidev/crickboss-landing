"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bell, CalendarDays, Phone, Radio, ShieldCheck, Trophy } from "lucide-react";
import { COUNTRIES } from "../../lib/data";

export function CtaSection() {
  const [ctaCountry, setCtaCountry] = useState(COUNTRIES[0]);

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-950 px-5 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(46,125,50,0.18),transparent_30%),radial-gradient(circle_at_84%_24%,rgba(26,35,126,0.46),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />
        <svg className="absolute inset-x-0 bottom-[-7rem] h-[18rem] w-full text-white/7" preserveAspectRatio="none" viewBox="0 0 1200 360" fill="none">
          <ellipse cx="600" cy="360" rx="560" ry="230" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="600" cy="360" rx="320" ry="132" stroke="currentColor" strokeWidth="2" strokeDasharray="9 12" />
          <path d="M120 300C278 204 438 156 600 156C762 156 922 204 1080 300" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
            <Bell className="h-3.5 w-3.5 text-accent" />
            Early access for players and teams
          </div>

          <h2 className="mt-6 max-w-2xl text-[clamp(2.05rem,3.8vw,3.55rem)] font-semibold leading-[1] tracking-tight">
            Bring your next match live in minutes.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-7 text-white/68">
            Join the waitlist for ball-by-ball scoring, player stats, team scorecards, and live match sharing built for local cricket.
          </p>

          <div className="mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["Match Live", "18.2 OV"],
              ["Scorer", "Online"],
              ["Scorecard", "Shared"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{label}</div>
                <div className="mt-2 text-sm font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Early access opens soon</div>
                <div className="text-xs text-white/45">Priority invites for players, captains, and team scorers</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
              June 2026
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_32px_90px_rgba(0,0,0,0.28)] backdrop-blur sm:p-4"
        >
          <div className="rounded-[1.1rem] border border-white/10 bg-slate-950/82 p-4">
            <div className="grid gap-3 xl:grid-cols-[0.86fr_1.14fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-300">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                    Match Live
                  </div>
                  <div className="text-xs font-semibold text-white/50">Final</div>
                </div>

                <div className="mt-4 space-y-3">
                  <TeamRow name="Falcons" score="188/7" meta="20.0 overs" />
                  <TeamRow name="Strikers" score="158/6" meta="18.2 overs" />
                </div>

                <div className="mt-4 rounded-2xl bg-brand px-4 py-3 shadow-[0_14px_42px_rgba(26,35,126,0.38)]">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">Required Run Rate</span>
                    <span className="font-semibold text-white">18.60</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-[72%] rounded-full bg-accent" />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">CrickBoss beta</div>
                    <div className="mt-1 text-lg font-semibold text-white">Player access</div>
                  </div>
                  <div className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">Online</div>
                </div>

                <form
                  id="whatsapp-cta"
                  className="mt-4 flex w-full flex-col gap-3"
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
                        btn.innerHTML = "Joined";
                        btn.disabled = true;
                      }
                    } catch (err) {
                      console.error("Failed to save:", err);
                      if (btn) btn.innerHTML = "Try Again";
                    }
                  }}
                >
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex min-h-14 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.08] px-3">
                      <select
                        aria-label="Country code"
                        value={ctaCountry.dial + "|" + ctaCountry.name}
                        onChange={e => {
                          const found = COUNTRIES.find(c => c.dial + "|" + c.name === e.target.value);
                          if (found) setCtaCountry(found);
                        }}
                        className="max-w-[6rem] cursor-pointer bg-transparent py-2 text-sm font-medium text-slate-300 outline-none"
                        style={{ colorScheme: "dark" }}
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.name} value={c.dial + "|" + c.name} className="bg-slate-900 text-white">
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                      <span className="whitespace-nowrap text-xs font-semibold text-slate-400">{ctaCountry.dial}</span>
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
                    className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent text-base font-semibold text-white shadow-[0_8px_30px_rgba(46,125,50,0.30)] transition hover:bg-[#25692a] focus:outline-none focus:ring-4 focus:ring-accent/30"
                  >
                    Notify Me on WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { icon: ShieldCheck, label: "Scorer permissions" },
                { icon: Radio, label: "Live score sync" },
                { icon: Trophy, label: "Player stats saved" },
                { icon: Bell, label: "Match alerts" }
              ].map(item => (
                <div key={item.label} className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-white/62">
                  <item.icon className="h-3.5 w-3.5 flex-shrink-0 text-accent" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TeamRow({ name, score, meta }: { name: string; score: string; meta: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{name}</div>
        <div className="mt-0.5 text-xs text-white/40">{meta}</div>
      </div>
      <div className="text-2xl font-semibold text-white">{score}</div>
    </div>
  );
}
