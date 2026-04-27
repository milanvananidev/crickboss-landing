"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import logoIcon from "../logos/icon-icon.png";

// Section imports
import { AmbientBackground, FloatingCricketElements } from "./landing/backgrounds";
import { EarlyAccessModal } from "./landing/early-access-modal";
import { HeroSection } from "./landing/hero-section";
import { TimelineSection } from "./landing/timeline-section";
import { CtaSection } from "./landing/cta-section";
import { FooterSection } from "./landing/footer-section";

export function ComingSoonPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isLoading]);

  return (
    <main className="bg-[#f8fafc] text-slate-950 overflow-x-clip relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#f8fafc]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image src={logoIcon} priority alt="CrickBoss loading..." className="h-20 w-20 animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isModalOpen && <EarlyAccessModal onClose={() => setIsModalOpen(false)} />}

      {/* Background visuals layer */}
      <div className="absolute inset-x-0 top-0 h-[100dvh] pointer-events-none z-0">
        <AmbientBackground />
        <FloatingCricketElements />
      </div>

      <div className="relative z-10 flex flex-col">
        <HeroSection onOpenModal={() => setIsModalOpen(true)} />
        <TimelineSection />
        <CtaSection />
        <FooterSection />
      </div>
    </main>
  );
}
