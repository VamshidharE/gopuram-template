"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Check, Send, ArrowLeft } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_TARGET_DATE = new Date("2026-11-29T09:15:00+05:30").getTime();

/**
 * Integrated Traditional Gold Mandala & Floral Crest SVG
 */
const GoldMandalaOrnament: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full pointer-events-none ${className}`}
  >
    <defs>
      <linearGradient id="mandalaGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7e7c4" />
        <stop offset="35%" stopColor="#d4af37" />
        <stop offset="70%" stopColor="#b88636" />
        <stop offset="100%" stopColor="#8a631e" />
      </linearGradient>
    </defs>
    {/* Outer Sacred Ring */}
    <circle cx="150" cy="150" r="140" stroke="url(#mandalaGold)" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
    <circle cx="150" cy="150" r="132" stroke="url(#mandalaGold)" strokeWidth="0.8" opacity="0.45" />

    {/* Radiating 12 Lotus Petals */}
    {Array.from({ length: 12 }).map((_, i) => (
      <g key={i} transform={`rotate(${i * 30} 150 150)`}>
        <path
          d="M150 30 C138 65 142 95 150 110 C158 95 162 65 150 30Z"
          fill="url(#mandalaGold)"
          opacity="0.22"
          stroke="url(#mandalaGold)"
          strokeWidth="0.75"
        />
        <circle cx="150" cy="22" r="2.5" fill="url(#mandalaGold)" opacity="0.7" />
      </g>
    ))}

    {/* Middle Ring with Diamond Petals */}
    <circle cx="150" cy="150" r="95" stroke="url(#mandalaGold)" strokeWidth="1.2" opacity="0.5" />
    {Array.from({ length: 12 }).map((_, i) => (
      <g key={`mid-${i}`} transform={`rotate(${i * 30 + 15} 150 150)`}>
        <path
          d="M150 68 C144 86 146 100 150 112 C154 100 156 86 150 68Z"
          fill="url(#mandalaGold)"
          opacity="0.3"
        />
      </g>
    ))}

    {/* Inner Core Lotus & Star */}
    <circle cx="150" cy="150" r="56" stroke="url(#mandalaGold)" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
    <circle cx="150" cy="150" r="42" stroke="url(#mandalaGold)" strokeWidth="1.2" opacity="0.8" />
    <circle cx="150" cy="150" r="6" fill="url(#mandalaGold)" opacity="0.9" />
  </svg>
);

/**
 * Animated Celebration Sparkle Burst Component
 */
const SparkleBurst: React.FC = () => {
  const particles = Array.from({ length: 16 });
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 110;
        const y = Math.sin(rad) * 110;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [1, 0.9, 0],
              scale: [0, 1.4, 0.2],
              x,
              y,
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute text-[#d4af37] text-base"
          >
            {i % 2 === 0 ? "✨" : "🌸"}
          </motion.span>
        );
      })}
    </div>
  );
};

export const RsvpSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  // RSVP Interaction state
  const [step, setStep] = useState<"initial" | "form" | "submitted">("initial");
  const [showBurst, setShowBurst] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestWishes, setGuestWishes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const update = () => {
      const diff = WEDDING_TARGET_DATE - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleConfirmPresenceClick = () => {
    setShowBurst(true);
    setTimeout(() => {
      setStep("form");
      setShowBurst(false);
    }, 450);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("submitted");
    }, 850);
  };

  return (
    <section
      ref={sectionRef}
      id="wedding-countdown-rsvp"
      aria-label="Wedding Countdown and RSVP"
      className="relative w-full overflow-hidden py-8 sm:py-14 md:py-20 bg-transparent text-[#542D25]"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-3.5 sm:px-6 md:px-8">
        {/* 
          COMBINED COUNTDOWN & CELEBRATE WITH US ROYAL CARTOUCHE
          Unified background layout with warm ivory parchment, delicate gold borders & corner ornaments
        */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#fffefc]/92 via-[#fdf7ee]/88 to-[#fbf1e0]/92 backdrop-blur-xs border border-[#d4af37]/50 shadow-[0_14px_44px_rgba(80,45,20,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] p-4 sm:p-7 md:p-9 overflow-hidden">
          {/* Subtle Golden Corner Brackets */}
          <span className="absolute top-2 left-2 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-[#b88636]/60 rounded-tl pointer-events-none" />
          <span className="absolute top-2 right-2 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-[#b88636]/60 rounded-tr pointer-events-none" />
          <span className="absolute bottom-2 left-2 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-[#b88636]/60 rounded-bl pointer-events-none" />
          <span className="absolute bottom-2 right-2 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-[#b88636]/60 rounded-br pointer-events-none" />

          {/* Delicate Inner Inset Border */}
          <div className="absolute inset-1.5 sm:inset-2.5 rounded-[14px] sm:rounded-[22px] border border-[#d4af37]/25 pointer-events-none" />

          {/* Side-by-side on desktop, tightly stacked together on mobile */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-7 lg:gap-8 xl:gap-10">
            {/* ============================================================ */}
            {/* SIDE 1: ORNAMENTAL WEDDING COUNTDOWN */}
            {/* ============================================================ */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-[48%] flex flex-col items-center text-center relative"
            >
              {/* Integrated Gold Floral & Mandala Ornament Halo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] opacity-35 pointer-events-none select-none -z-0">
                <GoldMandalaOrnament />
              </div>

              {/* Heading: "Wedding Begins In" */}
              <div className="relative z-10 flex flex-col items-center mb-3 sm:mb-5 px-2">
                <div className="flex items-center justify-center gap-2 mb-1.5 select-none">
                  <span className="w-6 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#b88636]" />
                  <span className="text-[#b88636] text-xs">✦</span>
                  <span className="w-6 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#b88636]" />
                </div>

                <h2 className="font-cinzel text-lg sm:text-2xl md:text-3xl font-extrabold tracking-[0.12em] sm:tracking-[0.16em] text-[#42100b] uppercase leading-tight text-center">
                  Wedding Begins In
                </h2>

                <div className="w-10 sm:w-14 h-0.5 bg-gradient-to-r from-transparent via-[#b88636] to-transparent mt-1.5" />
              </div>

              {/* 4 Distinct Ornamental Countdown Units (Days, Hours, Minutes, Seconds) */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-3.5 w-full relative z-10 max-w-[320px] sm:max-w-[380px] md:max-w-[400px] px-1 sm:px-0">
                {[
                  { label: "DAYS", value: timeLeft.days },
                  { label: "HOURS", value: timeLeft.hours },
                  { label: "MINS", value: timeLeft.minutes },
                  { label: "SECS", value: timeLeft.seconds },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
                    className="relative flex flex-col items-center justify-center py-2 sm:py-3.5 md:py-4 px-1 rounded-lg sm:rounded-xl bg-gradient-to-b from-[#FFFDF8]/95 via-[#FDF5E6]/90 to-[#F7E7CE]/95 border border-[#b88636] shadow-[0_4px_14px_rgba(90,45,20,0.1)] overflow-hidden"
                  >
                    {/* Golden Corner Accents */}
                    <span className="absolute top-0.5 left-0.5 w-1.5 sm:w-2 h-1.5 sm:h-2 border-t border-l border-[#b88636] pointer-events-none" />
                    <span className="absolute top-0.5 right-0.5 w-1.5 sm:w-2 h-1.5 sm:h-2 border-t border-r border-[#b88636] pointer-events-none" />
                    <span className="absolute bottom-0.5 left-0.5 w-1.5 sm:w-2 h-1.5 sm:h-2 border-b border-l border-[#b88636] pointer-events-none" />
                    <span className="absolute bottom-0.5 right-0.5 w-1.5 sm:w-2 h-1.5 sm:h-2 border-b border-r border-[#b88636] pointer-events-none" />

                    {/* Golden top shine line */}
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-90" />

                    {/* Large, Elegant Maroon Numerals */}
                    <span className="font-cinzel text-lg sm:text-2xl md:text-3xl font-black text-[#42100b] tracking-tight leading-none tabular-nums drop-shadow-xs">
                      {isClient ? String(item.value).padStart(2, "0") : "--"}
                    </span>

                    {/* Small Uppercase Label */}
                    <span className="font-cinzel text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.14em] sm:tracking-[0.18em] text-[#805527] uppercase mt-1 sm:mt-1.5">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Wedding Date Pill Directly Under Countdown */}
              <div className="relative z-10 inline-flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 px-3 sm:px-4 py-1 rounded-full bg-[#fbf2e3]/90 border border-[#d4ba9b]/70 text-[#742719] text-[10px] sm:text-xs font-cinzel font-semibold tracking-wide select-none shadow-2xs max-w-[320px] sm:max-w-none">
                <span className="text-[#b88636] text-[8.5px] sm:text-[9.5px]">✦</span>
                <span className="truncate">Sunday, November 29, 2026 • 09:15 AM</span>
                <span className="text-[#b88636] text-[8.5px] sm:text-[9.5px]">✦</span>
              </div>
            </motion.div>

            {/* ============================================================ */}
            {/* DELICATE CENTRAL ORNAMENTAL GOLD DIVIDER */}
            {/* ============================================================ */}
            <div className="hidden lg:flex flex-col items-center justify-center self-stretch py-4 select-none">
              {/* Top Slender Golden Line */}
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#b88636]/60 to-[#b88636]" />

              {/* Central Auspicious Star Medallion */}
              <div className="my-3 relative flex items-center justify-center">
                <div className="w-7 h-7 rounded-full border border-[#b88636]/70 flex items-center justify-center bg-[#fff8eb]/90 shadow-xs">
                  <span className="text-[#b88636] text-xs">✦</span>
                </div>
              </div>

              {/* Bottom Slender Golden Line */}
              <div className="w-px flex-1 bg-gradient-to-b from-[#b88636] via-[#b88636]/60 to-transparent" />
            </div>

            {/* Mobile Slender Divider - tight and elegant, no excess spacing */}
            <div className="lg:hidden flex items-center justify-center gap-2 my-1 w-full max-w-[220px] mx-auto select-none opacity-80">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#b88636]/70" />
              <span className="text-[#b88636] text-xs">❦</span>
              <span className="text-[#b88636] text-xs">✦</span>
              <span className="text-[#b88636] text-xs">❦</span>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#b88636]/70" />
            </div>

            {/* ============================================================ */}
            {/* SIDE 2: ELEGANT CELEBRATE WITH US & RSVP ATTENDANCE */}
            {/* ============================================================ */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-[48%] flex flex-col items-center text-center relative"
            >
              {showBurst && <SparkleBurst />}

              <AnimatePresence mode="wait">
                {/* -------------------------------------------------------- */}
                {/* STEP 1: INITIAL VIEW — REFINED INVITATION MESSAGE */}
                {/* -------------------------------------------------------- */}
                {step === "initial" && (
                  <motion.div
                    key="step-initial"
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35 }}
                    className="flex flex-col items-center justify-center py-1 sm:py-3 px-2 sm:px-4 w-full max-w-md mx-auto"
                  >
                    {/* Delicate Gold Floral Crest */}
                    <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2 select-none">
                      <span className="text-[#b88636] text-xs">❦</span>
                      <span className="font-cinzel text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#805527] uppercase">
                        CELEBRATE WITH US
                      </span>
                      <span className="text-[#b88636] text-xs">❦</span>
                    </div>

                    {/* MAIN RSVP MESSAGE */}
                    <p className="font-cormorant text-lg sm:text-2xl md:text-3xl italic font-semibold text-[#42100b] leading-snug tracking-wide max-w-sm mx-auto">
                      &ldquo;We would be delighted by your presence&rdquo;
                    </p>

                    {/* Poetic Subtext */}
                    <p className="font-cormorant text-xs sm:text-sm md:text-base italic text-[#744c2c] font-medium mt-1.5 sm:mt-2.5 max-w-xs sm:max-w-sm leading-relaxed">
                      Your blessings and cherished company are our greatest joy as we step into this sacred chapter together.
                    </p>

                    {/* Subtle Ornamental Divider */}
                    <div className="flex items-center justify-center gap-2 mt-2 select-none">
                      <span className="w-10 h-px bg-gradient-to-r from-transparent via-[#b88636]/60 to-transparent" />
                      <span className="text-[#b88636] text-[10px]">✦</span>
                      <span className="w-10 h-px bg-gradient-to-r from-transparent via-[#b88636]/60 to-transparent" />
                    </div>

                    {/* DEEP MAROON RSVP BUTTON */}
                    <motion.button
                      type="button"
                      onClick={handleConfirmPresenceClick}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : { scale: 1.04, boxShadow: "0 10px 28px rgba(99,20,13,0.4)" }
                      }
                      whileTap={{ scale: 0.97 }}
                      className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border border-[#d4af37]/80 font-cinzel text-[10px] sm:text-xs md:text-[13px] font-extrabold tracking-[0.14em] sm:tracking-[0.18em] uppercase shadow-[0_6px_20px_rgba(99,20,13,0.3)] cursor-pointer transition-all duration-300 overflow-hidden mt-3.5 sm:mt-5 max-w-[290px] sm:max-w-none"
                    >
                      {/* Shimmer sweep animation on hover */}
                      <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                      <Heart size={13} className="text-[#ffd700] fill-[#ffd700] shrink-0" />
                      <span className="truncate">Confirm Your Presence</span>
                      <Sparkles size={13} className="text-[#ffd700] shrink-0" />
                    </motion.button>
                  </motion.div>
                )}

              {/* -------------------------------------------------------- */}
              {/* STEP 2: REFINED PARCHMENT GUEST ATTENDANCE & BLESSINGS FORM */}
              {/* -------------------------------------------------------- */}
              {step === "form" && (
                <motion.form
                  key="step-form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="relative z-10 w-full max-w-md mx-auto p-6 sm:p-7 rounded-2xl bg-[#fffbf2]/92 backdrop-blur-md border border-[#c99f58]/70 shadow-[0_12px_32px_rgba(84,45,37,0.12)] text-left"
                >
                  {/* Subtle inner gold rim */}
                  <div className="absolute inset-1 rounded-xl border border-[#d4af37]/25 pointer-events-none" />

                  {/* Header with Back button */}
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#d9ba9b]/40 relative z-10">
                    <button
                      type="button"
                      onClick={() => setStep("initial")}
                      className="inline-flex items-center gap-1.5 text-xs font-cinzel font-semibold text-[#805527] hover:text-[#542D25] cursor-pointer transition-colors"
                    >
                      <ArrowLeft size={13} />
                      <span>Back</span>
                    </button>
                    <span className="font-cinzel text-[11px] font-bold tracking-widest text-[#742719] uppercase">
                      Confirm Attendance
                    </span>
                  </div>

                  {/* Guest Full Name Field */}
                  <div className="mb-3.5 relative z-10">
                    <label className="block text-[11px] font-cinzel font-bold text-[#80644F] uppercase tracking-wider mb-1">
                      Your Full Name / Family Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g., Sri Ram & Family"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d9ba9b] bg-[#FAF0E0]/80 text-[#2c1d14] font-serif text-sm placeholder:text-[#9e836f] focus:outline-none focus:ring-2 focus:ring-[#8e3622]/40 shadow-2xs transition-all"
                    />
                  </div>

                  {/* Wishes & Blessings Field */}
                  <div className="mb-4 relative z-10">
                    <label className="block text-[11px] font-cinzel font-bold text-[#80644F] uppercase tracking-wider mb-1">
                      Your Blessings & Wishes for the Couple
                    </label>
                    <textarea
                      rows={2}
                      value={guestWishes}
                      onChange={(e) => setGuestWishes(e.target.value)}
                      placeholder="Wishing Arjun and Meera a blessed and blissful lifetime together..."
                      className="w-full px-4 py-2 rounded-xl border border-[#d9ba9b] bg-[#FAF0E0]/80 text-[#2c1d14] font-serif text-sm placeholder:text-[#9e836f] focus:outline-none focus:ring-2 focus:ring-[#8e3622]/40 shadow-2xs transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative z-10 w-full py-3.5 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border border-[#d4af37]/80 font-cinzel text-xs sm:text-sm font-bold tracking-widest shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending Blessings...</span>
                    ) : (
                      <>
                        <Send size={14} className="text-[#ffd700]" />
                        <span>SEND BLESSINGS & CONFIRM</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {/* -------------------------------------------------------- */}
              {/* STEP 3: CELEBRATION CONFIRMATION */}
              {/* -------------------------------------------------------- */}
              {step === "submitted" && (
                <motion.div
                  key="step-submitted"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="flex flex-col items-center justify-center py-4 px-4 w-full max-w-md mx-auto"
                >
                  {/* Auspicious Golden Checkmark Seal */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#fbf2e3] to-[#edd6a4] text-[#63140d] border-2 border-[#b88636] flex items-center justify-center mb-3.5 shadow-md">
                    <Check size={28} className="stroke-[2.5]" />
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#42100b] uppercase">
                    Namaskaram, {guestName}!
                  </h3>

                  <p className="font-cormorant text-base sm:text-lg italic text-[#744c2c] font-semibold mt-1.5 max-w-sm">
                    Your presence is warmly confirmed and your loving blessings have reached our hearts.
                  </p>

                  {guestWishes && (
                    <div className="mt-3.5 p-3.5 rounded-xl bg-[#fffbf2]/90 border border-[#DDC9A6] max-w-sm shadow-2xs">
                      <p className="font-cormorant text-sm italic text-[#542D25]">
                        &ldquo;{guestWishes}&rdquo;
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="mt-4 text-xs font-cinzel font-bold tracking-wider text-[#742719] hover:underline cursor-pointer"
                  >
                    Edit Response
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
};
