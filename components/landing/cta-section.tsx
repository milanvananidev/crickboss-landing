"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Phone, ArrowRight } from "lucide-react";
import { COUNTRIES } from "../../lib/data";
import { CountdownTimer } from "../countdown-timer";

export function CtaSection() {
  const [ctaCountry, setCtaCountry] = useState(COUNTRIES[0]);

  return (
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
  );
}
