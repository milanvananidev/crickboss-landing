"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { workflowSteps } from "../../lib/data";
import { TimelineFloatingChips } from "./backgrounds";

export function TimelineSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 overflow-hidden">
      {/* Background Ambient Effects to fill white space */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="absolute left-[-10%] top-[15%] h-[40rem] w-[40rem] rounded-full bg-brand/5 blur-[100px]" />
        <div className="absolute right-[-10%] bottom-[25%] h-[35rem] w-[35rem] rounded-full bg-accent/5 blur-[100px]" />
        <div className="absolute left-[30%] top-[60%] h-[20rem] w-[20rem] rounded-full bg-blue-500/5 blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />
        <TimelineFloatingChips />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
}
