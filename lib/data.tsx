import React from "react";
import { Trophy, Shield, Activity, Radio } from "lucide-react";

export const COUNTRIES = [
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

export const workflowSteps = [
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
