"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
};

const launchDate = new Date("2026-06-15T00:00:00+05:30");

function getTimeLeft(): TimeLeft {
  const difference = launchDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return { days, hours, minutes };
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  const items = useMemo(
    () => [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes }
    ],
    [timeLeft]
  );

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center shadow-sm"
        >
          <div className="text-2xl font-semibold tracking-tight text-brand sm:text-3xl">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
