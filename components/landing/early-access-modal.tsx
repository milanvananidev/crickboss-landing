"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { COUNTRIES } from "../../lib/data";

export function EarlyAccessModal({
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
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
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
