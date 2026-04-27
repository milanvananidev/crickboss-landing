"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Phone, ArrowRight } from "lucide-react";
import { COUNTRIES } from "../../lib/data";

import logoHorizontal from "../../logos/logo-horizontal-text.png";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [heroCountry, setHeroCountry] = useState(COUNTRIES[0]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8 h-[90px]">
          <Image src={logoHorizontal} alt="CrickBoss logo" className="h-auto w-[136px] sm:w-[164px]" />
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Join Early Access
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero Content */}
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
    </>
  );
}
