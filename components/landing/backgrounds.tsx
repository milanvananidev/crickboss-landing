"use client";

import { motion } from "framer-motion";

export function AmbientBackground() {
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

export function FloatingCricketElements() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      {/* Floating Action Chips */}
      <motion.div 
        animate={{ y: [0, -15, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[24%] hidden rounded-full border border-red-200 bg-red-50/80 px-3 py-1 font-mono text-xs font-bold text-red-600 backdrop-blur-sm sm:block shadow-sm xl:left-[10%]"
      >
        WICKET!
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[8%] top-[30%] hidden rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-xs font-bold text-accent backdrop-blur-sm sm:block shadow-sm xl:right-[12%]"
      >
        SIX RUNS
      </motion.div>
      <motion.div 
        animate={{ y: [0, -10, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute left-[12%] top-[62%] hidden rounded-full border border-brand/20 bg-brand/5 px-3 py-1 font-mono text-xs font-bold text-brand backdrop-blur-sm sm:block shadow-sm xl:left-[18%]"
      >
        CRR: 9.4
      </motion.div>

      {/* Mock Scoreboard Card */}
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: -2, y: [0, -8, 0] }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1 },
          scale: { duration: 1 }
        }}
        style={{}}
        className="absolute right-[2rem] top-[56%] hidden w-60 rounded-2xl border border-white/60 bg-white/75 p-4 shadow-xl backdrop-blur-md sm:block lg:right-[3rem] xl:right-[4.5rem] 2xl:right-[7rem]"
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
      </motion.div> */}
    </div>
  );
}

export function TimelineFloatingChips() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div 
        animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[15%] hidden rounded-full border border-blue-200 bg-blue-50/60 px-3 py-1 font-mono text-xs font-bold text-blue-600 backdrop-blur-sm sm:block shadow-sm"
      >
        FOUR!
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute right-[5%] top-[45%] hidden rounded-full border border-orange-200 bg-orange-50/60 px-3 py-1 font-mono text-xs font-bold text-orange-600 backdrop-blur-sm sm:block shadow-sm"
      >
        REFERRAL
      </motion.div>
      <motion.div 
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute left-[12%] bottom-[20%] hidden rounded-full border border-brand/20 bg-brand/5 px-3 py-1 font-mono text-xs font-bold text-brand backdrop-blur-sm sm:block shadow-sm"
      >
        REQ: 11.2
      </motion.div>
    </div>
  );
}
