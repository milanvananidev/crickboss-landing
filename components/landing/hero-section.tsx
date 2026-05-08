"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, ArrowRight, BarChart3, CircleDot, Clock3, Phone, Radio, ShieldCheck, Trophy, Users } from "lucide-react";
import { COUNTRIES } from "../../lib/data";

import logoHorizontal from "../../logos/logo-horizontal-text.png";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [heroCountry, setHeroCountry] = useState(COUNTRIES[0]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/75 backdrop-blur-md supports-[backdrop-filter]:bg-white/55">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[90px] sm:px-6 lg:px-8">
          <Image src={logoHorizontal} alt="CrickBoss logo" className="h-auto w-[136px] sm:w-[164px]" />
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <span className="hidden min-[420px]:inline">Join Early Access</span>
            <span className="min-[420px]:hidden">Join</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </header>

      <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center bg-[radial-gradient(circle_at_top,rgba(26,35,126,0.06),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.96))] px-4 pb-14 pt-7 text-center sm:bg-transparent sm:px-6 sm:pb-20 sm:pt-14 lg:min-h-[calc(100vh-90px)] lg:px-8 lg:py-12">
        <div className="relative z-10 flex max-w-4xl flex-col items-center">
          <div className="inline-flex max-w-[18rem] items-center justify-center gap-1.5 rounded-full border border-brand/15 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand shadow-sm sm:max-w-full sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
            <Radio className="h-3.5 w-3.5" />
            Live scoring for players and teams
          </div>

          <h1 className="mt-5 max-w-3xl text-[clamp(1.85rem,8vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-slate-950 sm:mt-6 sm:leading-[0.98]">
            Score your cricket match and build your player profile.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-lg sm:leading-7">
            Track every ball, every run, every wicket, and every performance.
            Share live scorecards and keep your cricket stats in one place.
          </p>

          <MobileMatchPulse />

          <div className="mt-7 hidden w-full max-w-3xl flex-wrap justify-center gap-2 sm:flex">
            {[
              { icon: CircleDot, label: "Live scoring" },
              { icon: Trophy, label: "Scorecards" },
              { icon: BarChart3, label: "Player stats" },
              { icon: Users, label: "Team squads" }
            ].map(item => (
              <div key={item.label} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur sm:h-11 sm:gap-2 sm:px-4 sm:text-sm">
                <item.icon className="h-4 w-4 text-brand" />
                {item.label}
              </div>
            ))}
          </div>

          <form
            id="early-access"
            className="mt-5 grid w-full max-w-2xl grid-cols-[minmax(7.25rem,0.8fr)_1fr] gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur sm:mt-6 sm:flex sm:p-2.5"
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
            <div className="flex h-12 min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 sm:h-14 sm:rounded-2xl">
              <select
                aria-label="Country code"
                value={heroCountry.dial + "|" + heroCountry.name}
                onChange={e => {
                  const found = COUNTRIES.find(c => c.dial + "|" + c.name === e.target.value);
                  if (found) setHeroCountry(found);
                }}
                className="min-w-0 max-w-[4.85rem] cursor-pointer bg-transparent py-2 text-sm font-medium text-slate-700 outline-none sm:max-w-[6rem]"
              >
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.dial + "|" + c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <span className="whitespace-nowrap text-xs font-semibold text-slate-400">{heroCountry.dial}</span>
            </div>

            <label htmlFor="whatsapp" className="sr-only">WhatsApp number</label>
            <div className="relative min-w-0 flex-1">
              <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="whatsapp"
                type="tel"
                placeholder="98765 43210"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 sm:h-14 sm:rounded-2xl sm:pl-11 sm:pr-4 sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="col-span-2 inline-flex h-[3.25rem] flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-base font-semibold text-white shadow-[0_14px_38px_rgba(26,35,126,0.24)] transition hover:bg-brand-deep focus:outline-none focus:ring-4 focus:ring-brand/20 sm:h-14 sm:rounded-2xl"
            >
              Join Access
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-4 max-w-sm text-xs leading-5 text-slate-500 sm:max-w-none sm:text-sm">
            Built for players, captains, scorers, clubs, academies, and local cricket teams.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="relative z-10 mt-9 w-full max-w-5xl sm:mt-10"
        >
          <LiveScoringDashboard />
        </motion.div>
      </section>
    </>
  );
}

function MobileMatchPulse() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
      className="mt-6 w-full rounded-3xl border border-brand/10 bg-white p-2.5 text-left shadow-[0_22px_70px_rgba(26,35,126,0.12)] sm:hidden"
    >
      <div className="rounded-[1.25rem] bg-brand p-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
            Live match
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">18.2 ov</div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-white/60">Surat Strikers</div>
            <div className="mt-1 text-5xl font-semibold leading-none tracking-tight">
              158<span className="text-2xl text-white/55">/6</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/55">Need</div>
            <div className="text-sm font-semibold">31 from 10</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5">
          {["1", "4", "0", "W", "2", "6"].map(ball => (
            <span
              key={ball}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                ball === "W" ? "bg-red-500 text-white" : ball === "4" || ball === "6" ? "bg-white text-brand" : "bg-white/15 text-white"
              }`}
            >
              {ball}
            </span>
          ))}
          <span className="ml-auto text-xs font-semibold text-white/65">Current over</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-1 pt-2">
        {[
          ["Profile", "saved"],
          ["Scorecard", "live"],
          ["Stats", "updated"]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-brand px-3 py-2 text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">{label}</div>
            <div className="mt-0.5 text-xs font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LiveScoringDashboard() {
  const [score, setScore] = useState(158);
  const [wickets, setWickets] = useState(6);
  const [legalBalls, setLegalBalls] = useState(110);
  const [balls, setBalls] = useState(["1", "4", "0", "W", "2", "6"]);
  const controls = ["0", "1", "2", "3", "4", "6", "Wd", "Nb", "W", "Undo"];
  const target = 189;
  const ballsRemaining = Math.max(120 - legalBalls, 0);
  const runsNeeded = Math.max(target - score, 0);
  const overs = `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`;
  const runRate = legalBalls > 0 ? ((score / legalBalls) * 6).toFixed(2) : "0.00";
  const requiredRate = ballsRemaining > 0 ? ((runsNeeded / ballsRemaining) * 6).toFixed(2) : "0.00";

  function updateBall(control: string) {
    if (control === "Undo") {
      setScore(158);
      setWickets(6);
      setLegalBalls(110);
      setBalls(["1", "4", "0", "W", "2", "6"]);
      return;
    }

    const isWicket = control === "W";
    const isExtra = control === "Wd" || control === "Nb";
    const runs = isWicket ? 0 : isExtra ? 1 : Number(control);

    setScore(prev => prev + runs);
    setWickets(prev => isWicket ? Math.min(prev + 1, 10) : prev);
    setLegalBalls(prev => isExtra ? prev : Math.min(prev + 1, 120));
    setBalls(prev => [...prev.slice(-5), control]);
  }

  return (
    <div className="relative z-10">
      <div className="absolute inset-6 -z-10 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/70 bg-slate-950 p-2 shadow-[0_32px_110px_rgba(15,23,42,0.28)] ring-1 ring-slate-900/10 sm:rounded-[1.75rem] sm:p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,125,50,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(26,35,126,0.42),transparent_36%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="relative rounded-[1rem] border border-white/10 bg-white/[0.97] p-3 shadow-2xl sm:rounded-[1.25rem] sm:p-5">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 text-left sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-600">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                Match Live
              </div>
              <h2 className="mt-2 text-base font-semibold tracking-tight text-slate-950 sm:text-xl">Ahmedabad Falcons vs Surat Strikers</h2>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                ["Innings", "2nd"],
                ["Overs", overs],
                ["Target", "189"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 sm:px-3">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:text-[10px]">{label}</div>
                  <div className="mt-1 text-sm font-bold text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 py-3 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-2xl bg-brand p-3 text-white shadow-[0_18px_55px_rgba(26,35,126,0.28)] sm:p-4">
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65 sm:text-xs sm:tracking-[0.18em]">Surat Strikers need {runsNeeded} from {ballsRemaining}</div>
                  <div className="mt-2 flex items-end gap-2">
                    <motion.span
                      key={score}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="text-4xl font-semibold leading-none tracking-tight sm:text-6xl"
                    >
                      {score}
                    </motion.span>
                    <motion.span
                      key={wickets}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="pb-1 text-2xl font-semibold text-white/60 sm:pb-2 sm:text-3xl"
                    >
                      /{wickets}
                    </motion.span>
                  </div>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 px-2.5 py-2 text-right sm:px-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">CRR</div>
                  <div className="text-lg font-semibold">{runRate}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/60">RRR {requiredRate}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {balls.map((ball, index) => (
                  <motion.span
                    key={`${ball}-${index}-${score}-${legalBalls}`}
                    initial={{ scale: 0.78, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 ${
                      ball === "W" ? "bg-red-500 text-white" : ball === "4" || ball === "6" ? "bg-white text-brand" : "bg-white/15 text-white"
                    }`}
                  >
                    {ball}
                  </motion.span>
                ))}
                <span className="ml-1 text-xs font-semibold text-white/70 sm:ml-2">Current over</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { label: "Partnership", value: "47 (25)", icon: Users },
                { label: "Last wicket", value: "Mehta 12", icon: Activity },
                { label: "Scorer", value: "Online", icon: ShieldCheck },
                { label: "Sync", value: "0.8s", icon: Clock3 }
              ].map(item => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm">
                  <item.icon className="h-4 w-4 text-brand" />
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-950">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Batters</span>
                <span className="text-[11px] font-semibold text-accent sm:text-xs">Strike: Rahul P.</span>
              </div>
              {[
                ["Rahul P.", "74", "45", "7", "3", "164.4"],
                ["Aman S.", "28", "16", "2", "1", "175.0"]
              ].map(row => (
                <div key={row[0]} className="grid grid-cols-[minmax(2.75rem,1fr)_repeat(5,minmax(1.35rem,1.75rem))] items-center gap-1 border-t border-slate-200 py-2 text-[11px] sm:grid-cols-[1fr_repeat(5,2.25rem)] sm:gap-2 sm:text-xs">
                  <span className="font-semibold text-slate-900">{row[0]}</span>
                  {row.slice(1).map((cell, index) => (
                    <span key={index} className="text-right font-medium text-slate-600">{cell}</span>
                  ))}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Ball controls</div>
              <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
                {controls.map(control => (
                  <button
                    key={control}
                    type="button"
                    onClick={() => updateBall(control)}
                    className={`h-9 rounded-xl text-xs font-bold transition ${
                      control === "W"
                        ? "bg-red-50 text-red-600 ring-1 ring-red-100"
                        : control === "Undo"
                          ? "col-span-2 bg-slate-100 text-slate-600"
                          : "bg-brand/8 text-brand ring-1 ring-brand/10 hover:bg-brand hover:text-white"
                    }`}
                  >
                    {control}
                  </button>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                Bowler: <span className="font-semibold text-slate-950">N. Patel</span> 3.2-0-31-2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
