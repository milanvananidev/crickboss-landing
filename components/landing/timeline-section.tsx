"use client";

import type { ComponentType, ReactNode } from "react";
import { motion } from "framer-motion";
import { BarChart3, Radio, Share2, Smartphone, Trophy, UserRound, Users } from "lucide-react";

export function TimelineSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
            <UserRound className="h-3.5 w-3.5 text-brand" />
            Built around the player
          </div>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1] tracking-tight text-slate-950">
            Every innings becomes a profile, scorecard, and memory.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            CrickBoss keeps local cricket simple: score the match, share it live, and let every player carry their stats forward.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-6">
            <FeatureCard
              icon={UserRound}
              label="Player profile"
              title="Your cricket record, always with you."
              description="Every scored match adds runs, wickets, form, and recent performances to your profile."
            >
              <PlayerProfileVisual />
            </FeatureCard>

            <FeatureCard
              icon={Trophy}
              label="Recent form"
              title="Keep your best moments easy to find."
              description="See your last few innings, bowling spells, and standout contributions without digging through old chats."
            >
              <RecentFormVisual />
            </FeatureCard>
          </div>

          <div className="grid gap-6">
            <FeatureCard
              icon={Smartphone}
              label="Team scoring"
              title="Score from the boundary, dugout, or scorer desk."
              description="Fast ball controls for runs, extras, wickets, strike changes, bowler spells, and corrections."
            >
              <PhoneScorer />
            </FeatureCard>

            <FeatureCard
              icon={Share2}
              label="Live scorecards"
              title="Share the match with players and supporters."
              description="Every innings becomes a clean scorecard with batting, bowling, fall of wickets, and recent player contributions."
            >
              <ScorecardPreview />
            </FeatureCard>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <MiniFeature
            icon={Radio}
            title="Live for everyone"
            description="Players, teammates, families, and supporters can follow the same live score."
          />
          <MiniFeature
            icon={BarChart3}
            title="Stats that matter"
            description="Track strike rate, economy, partnerships, form, wickets, and innings impact."
          />
          <MiniFeature
            icon={Users}
            title="Team memory"
            description="Squads, lineups, match history, and scorecards stay organized for every team."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  label,
  title,
  description,
  children
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      className="grid min-h-[16.5rem] gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_18px_70px_rgba(15,23,42,0.07)] sm:grid-cols-[0.95fr_1.05fr] sm:p-6"
    >
      <div className="flex flex-col justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/8 text-brand">
          <Icon className="h-5 w-5" />
        </div>
        <div className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-brand">{label}</div>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-slate-950">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      {children}
    </motion.article>
  );
}

function MiniFeature({
  icon: Icon,
  title,
  description
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function PlayerProfileVisual() {
  return (
    <div className="bg-white">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-lg font-bold text-white">RP</div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Player profile</div>
              <div className="mt-1 text-xl font-semibold text-slate-950">Rahul Patel</div>
            </div>
          </div>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">In form</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            ["Batting avg", "38.9"],
            ["Strike rate", "146.2"],
            ["Best", "82*"],
            ["Wickets", "18"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-2xl font-semibold text-brand">{value}</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentFormVisual() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
      <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Recent matches</div>
      {[
        ["74 (45)", "vs Falcons", "Today"],
        ["2/24", "vs Titans", "2d ago"],
        ["41 (28)", "vs Royals", "3d ago"]
      ].map(([score, match, time]) => (
        <div key={`${score}-${match}`} className="flex items-center justify-between border-t border-slate-200 py-3 text-sm">
          <div>
            <div className="font-semibold text-slate-950">{score}</div>
            <div className="text-xs text-slate-500">{match}</div>
          </div>
          <span className="text-xs font-semibold text-slate-400">{time}</span>
        </div>
      ))}
    </div>
  );
}

function PhoneScorer() {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-slate-50 p-4">
      <div className="w-full max-w-[13rem] rounded-[1.75rem] border-[8px] border-slate-950 bg-white p-3 shadow-xl">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-red-600">
          <span>Live</span>
          <span>18.2 ov</span>
        </div>
        <div className="mt-3 rounded-2xl bg-brand p-3 text-white">
          <div className="text-xs text-white/60">Strikers need 31</div>
          <div className="text-4xl font-semibold leading-none">158/6</div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["0", "1", "2", "4", "6", "W", "Wd", "Nb", "Undo"].map(item => (
            <div key={item} className={`flex h-9 items-center justify-center rounded-xl text-xs font-bold ${item === "W" ? "bg-red-50 text-red-600" : "bg-brand/8 text-brand"}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScorecardPreview() {
  return (
    <div className="rounded-2xl bg-slate-950 p-4 text-white">
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Scorecard</div>
      <div className="mt-4 rounded-xl bg-brand p-3">
        <div className="text-xs text-white/60">Surat Strikers</div>
        <div className="mt-1 text-3xl font-semibold leading-none">158/6</div>
        <div className="mt-1 text-xs text-white/60">18.2 overs</div>
      </div>
      <div className="mt-3 space-y-1">
        {[
          ["Rahul P.", "74 (45)"],
          ["Aman S.", "28 (16)"],
          ["N. Patel", "2/31"]
        ].map(row => (
          <div key={row[0]} className="flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-2 text-xs">
            <span className="font-semibold">{row[0]}</span>
            <span className="text-white/66">{row[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
