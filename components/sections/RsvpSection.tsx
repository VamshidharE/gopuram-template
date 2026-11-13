"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Send, X } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WEDDING_TARGET_DATE = new Date("2026-11-29T09:15:00+05:30").getTime();

export const RsvpSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Countdown state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 15, hours: 19, minutes: 50, seconds: 21 });
  const [isClient, setIsClient] = useState(false);

  // RSVP Form Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestWishes, setGuestWishes] = useState("");
  const [attendance, setAttendance] = useState<"attending" | "regrets">("attending");
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp-countdown"
      aria-label="Wedding Countdown and RSVP"
      className="relative w-full overflow-hidden bg-transparent py-10 sm:py-14 md:py-16 text-[#42100b] select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
       * BACKGROUND DECORATIVE ARTWORK (Kolam & Sacred Lotus Embellishments)
       * ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Sacred Lotus Mandala Kolam on Left */}
        <div className="absolute -top-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 opacity-[0.18]">
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt=""
            fill
            className="object-contain filter sepia"
            unoptimized
          />
        </div>

        {/* Sacred Lotus Mandala Kolam on Right */}
        <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 opacity-[0.18]">
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt=""
            fill
            className="object-contain filter sepia"
            unoptimized
          />
        </div>

        {/* Blooming Pink & Gold Lotus Accent */}
        <div className="absolute bottom-6 left-4 sm:left-10 w-22 sm:w-28 h-22 sm:h-28 opacity-[0.22]">
          <Image
            src="/events/lotus-corner.png"
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─────────────────────────────────────────────────────────────
         * 1. SECTION HEADER (Attractive Architectural Royal Plaque)
         * ───────────────────────────────────────────────────────────── */}
        <div className="text-center mb-8 sm:mb-10 flex flex-col items-center">
          {/* Auspicious Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fbf2e3] border border-[#d4af37]/70 shadow-2xs mb-2.5">
            <span className="text-[#b88636] text-[10px]">✦</span>
            <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#742719] uppercase">
              Auspicious Celebration
            </span>
            <span className="text-[#b88636] text-[10px]">✦</span>
          </div>

          {/* Royal Architectural Cartouche Heading Plaque */}
          <div className="relative inline-flex items-center justify-center px-6 sm:px-10 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-[#5a1012] via-[#7e181e] to-[#5a1012] border-2 border-[#d4af37] shadow-[0_8px_24px_rgba(90,20,10,0.25)]">
            {/* Corner Filigree Brackets */}
            <div className="absolute top-1 left-1.5 w-2.5 h-2.5 border-t border-l border-[#ffd700]/70 pointer-events-none" />
            <div className="absolute top-1 right-1.5 w-2.5 h-2.5 border-t border-r border-[#ffd700]/70 pointer-events-none" />
            <div className="absolute bottom-1 left-1.5 w-2.5 h-2.5 border-b border-l border-[#ffd700]/70 pointer-events-none" />
            <div className="absolute bottom-1 right-1.5 w-2.5 h-2.5 border-b border-r border-[#ffd700]/70 pointer-events-none" />

            {/* Left Gold Wing Flourish */}
            <span className="hidden sm:inline-block w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mr-3" />

            {/* Main Title Heading */}
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-[0.2em] sm:tracking-[0.24em] text-[#fffdf8] uppercase leading-tight [text-shadow:_0_1px_3px_rgba(0,0,0,0.6),_0_0_12px_rgba(255,215,0,0.35)]">
              Wedding Begins In
            </h2>

            {/* Right Gold Wing Flourish */}
            <span className="hidden sm:inline-block w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent ml-3" />
          </div>

          {/* Subtitle in Distinct Italic Serif */}
          <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-[#6e3a1f] font-bold tracking-wide mt-3 max-w-xl">
            &ldquo;Countdown to the sacred union of Arjun &amp; Meera&rdquo;
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         * 2. SCULPTED HORIZONTAL CARTOUCHE CARD (Matching Image 1)
         * ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-b from-[#ffd700] via-[#c99f58] to-[#8a5822] shadow-[0_12px_32px_rgba(80,45,20,0.18)]">
          <div className="relative w-full rounded-[14px] sm:rounded-[22px] bg-[#fffcf7]/95 px-4 sm:px-8 py-5 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* LEFT: 4 COUNTDOWN BOXES */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 w-full md:w-auto">
              {/* Days */}
              <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[68px] py-2 px-1.5 rounded-xl bg-[#faf2e4] border border-[#d9ba9b]/80 shadow-2xs">
                <span className="font-cinzel text-xl sm:text-2xl font-black text-[#541c15] leading-none">
                  {isClient ? String(timeLeft.days).padStart(2, "0") : "15"}
                </span>
                <span className="font-cinzel text-[9px] sm:text-[10px] font-bold text-[#805527] uppercase tracking-wider mt-1">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[68px] py-2 px-1.5 rounded-xl bg-[#faf2e4] border border-[#d9ba9b]/80 shadow-2xs">
                <span className="font-cinzel text-xl sm:text-2xl font-black text-[#541c15] leading-none">
                  {isClient ? String(timeLeft.hours).padStart(2, "0") : "19"}
                </span>
                <span className="font-cinzel text-[9px] sm:text-[10px] font-bold text-[#805527] uppercase tracking-wider mt-1">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[68px] py-2 px-1.5 rounded-xl bg-[#faf2e4] border border-[#d9ba9b]/80 shadow-2xs">
                <span className="font-cinzel text-xl sm:text-2xl font-black text-[#541c15] leading-none">
                  {isClient ? String(timeLeft.minutes).padStart(2, "0") : "50"}
                </span>
                <span className="font-cinzel text-[9px] sm:text-[10px] font-bold text-[#805527] uppercase tracking-wider mt-1">
                  Minutes
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center min-w-[56px] sm:min-w-[68px] py-2 px-1.5 rounded-xl bg-[#faf2e4] border border-[#d9ba9b]/80 shadow-2xs">
                <span className="font-cinzel text-xl sm:text-2xl font-black text-[#541c15] leading-none">
                  {isClient ? String(timeLeft.seconds).padStart(2, "0") : "21"}
                </span>
                <span className="font-cinzel text-[9px] sm:text-[10px] font-bold text-[#805527] uppercase tracking-wider mt-1">
                  Seconds
                </span>
              </div>
            </div>

            {/* VERTICAL DIVIDER (Desktop) */}
            <div className="hidden md:flex flex-col items-center justify-center h-14 select-none opacity-60">
              <div className="w-px h-full bg-gradient-to-b from-transparent via-[#b88636] to-transparent" />
            </div>

            {/* RIGHT: INVITATION TEXT & RSVP BUTTON */}
            <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right gap-2.5">
              <p className="font-cormorant italic text-sm sm:text-base text-[#7c4a2d] font-semibold">
                &ldquo;We would be delighted by your presence!&rdquo;
              </p>
              
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 py-2 px-6 sm:px-8 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border border-[#d4af37] shadow-md hover:shadow-lg font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-[1.03] active:scale-98 cursor-pointer"
              >
                <span>Confirm Your Presence</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">➔</span>
              </button>
            </div>

          </div>
        </div>

        {/* Auspicious Floating Lotus Petals on Bottom Corners */}
        <div className="flex items-center justify-between mt-4 px-2 select-none pointer-events-none opacity-70">
          <div className="relative w-8 h-8">
            <Image src="/decoration/Lotus-Mandala.png" alt="Lotus" fill className="object-contain" unoptimized />
          </div>
          <div className="relative w-8 h-8">
            <Image src="/decoration/Lotus-Mandala.png" alt="Lotus" fill className="object-contain" unoptimized />
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
       * 3. RSVP MODAL DIALOG
       * ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-[#fffdf8] p-6 sm:p-8 border-2 border-[#b88636] shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#faeed8] text-[#541c15] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="text-center mb-5">
                    <span className="font-cinzel text-xs font-bold text-[#805527] uppercase tracking-widest block mb-1">
                      ✦ Wedding Attendance ✦
                    </span>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#541c15] uppercase">
                      Confirm Your Presence
                    </h3>
                    <p className="font-cormorant italic text-sm text-[#7c4a2d] mt-1">
                      Please let us know if you will grace the occasion
                    </p>
                  </div>

                  {/* Name field */}
                  <div className="mb-4">
                    <label className="block font-cinzel text-xs font-bold text-[#541c15] mb-1.5 uppercase">
                      Your Full Name / Family Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Sri Ramesh & Family"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d9ba9b] bg-[#faf2e4]/60 text-[#42100b] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#8e3622]"
                    />
                  </div>

                  {/* Attendance choice */}
                  <div className="mb-4">
                    <label className="block font-cinzel text-xs font-bold text-[#541c15] mb-1.5 uppercase">
                      Will you attend?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttendance("attending")}
                        className={`py-2 px-3 rounded-xl border text-xs font-cinzel font-bold transition-all cursor-pointer ${
                          attendance === "attending"
                            ? "bg-[#63140d] text-[#fffcf5] border-[#d4af37]"
                            : "bg-[#faf2e4]/60 text-[#541c15] border-[#d9ba9b]"
                        }`}
                      >
                        ✓ Joyfully Attending
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttendance("regrets")}
                        className={`py-2 px-3 rounded-xl border text-xs font-cinzel font-bold transition-all cursor-pointer ${
                          attendance === "regrets"
                            ? "bg-[#63140d] text-[#fffcf5] border-[#d4af37]"
                            : "bg-[#faf2e4]/60 text-[#541c15] border-[#d9ba9b]"
                        }`}
                      >
                        ✕ Sending Wishes
                      </button>
                    </div>
                  </div>

                  {/* Blessings message */}
                  <div className="mb-5">
                    <label className="block font-cinzel text-xs font-bold text-[#541c15] mb-1.5 uppercase">
                      Blessings & Wishes
                    </label>
                    <textarea
                      rows={3}
                      value={guestWishes}
                      onChange={(e) => setGuestWishes(e.target.value)}
                      placeholder="Wishing Arjun & Meera an auspicious and blissful married life..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d9ba9b] bg-[#faf2e4]/60 text-[#42100b] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#8e3622] resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border border-[#d4af37] font-cinzel text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={14} className="text-[#ffd700]" />
                        <span>Send Blessings & Confirm</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-[#f7e7c4] text-[#63140d] border-2 border-[#b88636] flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Check size={28} className="stroke-[2.5]" />
                  </div>
                  <h3 className="font-cinzel text-xl font-black text-[#541c15] uppercase">
                    Namaskaram, {guestName}!
                  </h3>
                  <p className="font-cormorant italic text-base text-[#7c4a2d] mt-2">
                    Your response has been warmly received. Thank you for your loving blessings!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsModalOpen(false);
                    }}
                    className="mt-6 px-6 py-2 rounded-full bg-[#63140d] text-[#fffcf5] border border-[#d4af37] font-cinzel text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
