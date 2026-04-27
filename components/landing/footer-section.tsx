"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function FooterSection() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-[linear-gradient(180deg,rgba(255,153,51,0.10)_0%,rgba(255,255,255,1)_50%,rgba(19,136,8,0.10)_100%)] px-5 pt-16 sm:px-6 lg:px-8 lg:pt-24">
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
    </section>
  );
}
