"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { invitationConfig } from "@/config/invitationConfig";

/**
 * Floating Petal Component for Grand Couple Showcase
 */
interface ShowcasePetal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  rotateEnd: number;
  color: string;
}

const SHOWCASE_PETALS: ShowcasePetal[] = [
  { id: 1, left: "12%", size: 12, duration: 8.5, delay: 0.3, driftX: 30, rotateEnd: 280, color: "#f43f5e" },
  { id: 2, left: "22%", size: 15, duration: 9.8, delay: 2.1, driftX: -25, rotateEnd: 360, color: "#fb7185" },
  { id: 3, left: "38%", size: 10, duration: 7.2, delay: 4.0, driftX: 20, rotateEnd: 210, color: "#fbbf24" },
  { id: 4, left: "62%", size: 14, duration: 8.9, delay: 1.2, driftX: -30, rotateEnd: 340, color: "#f43f5e" },
  { id: 5, left: "76%", size: 11, duration: 7.8, delay: 3.5, driftX: 25, rotateEnd: 270, color: "#fb7185" },
  { id: 6, left: "86%", size: 13, duration: 9.2, delay: 0.8, driftX: -22, rotateEnd: 390, color: "#f59e0b" },
];

/**
 * GrandCoupleShowcase
 *
 * Signature full-length South Indian wedding portrait section.
 * Placed immediately after Gopuram hero opening and before Wedding Celebrations.
 * Features:
 * - Natural unconfined full-length bride and groom cutout (/Couple.png)
 * - Rotating sacred Lotus Mandala halo backdrop (/decoration/Lotus-Mandala.png)
 * - Luminous warm golden backlight separating couple from parchment
 * - Deep maroon Cinzel typography with subtle subtitle
 * - Floating flower petals
 * - Voluminous, soft ivory-and-cream FOREGROUND cloud layer (z-30) overlapping
 *   the couple's lower attire and filling the entire region down to the section border.
 */
export const GrandCoupleShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  const { details } = invitationConfig;
  const groomName = details?.groomName || "ARJUN";
  const brideName = details?.brideName || "MEERA";

  return (
    <section
      ref={sectionRef}
      id="grand-couple-showcase"
      aria-label="Grand Couple Showcase"
      className="relative w-full overflow-hidden pt-8 pb-0 sm:pt-12 sm:pb-0 md:pt-14 md:pb-0 text-[#42100b] select-none"
    >
      {/* Ambient Floating Flower Petals */}
      {!shouldReduceMotion && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-25">
          {SHOWCASE_PETALS.map((petal) => (
            <motion.div
              key={petal.id}
              initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
              animate={{
                y: ["0vh", "105vh"],
                x: [0, petal.driftX, 0],
                opacity: [0, 0.85, 0.9, 0],
                rotate: [0, petal.rotateEnd],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: petal.left,
                width: `${petal.size}px`,
                height: `${petal.size * 1.4}px`,
              }}
              className="absolute"
            >
              <svg viewBox="0 0 24 32" className="w-full h-full drop-shadow-xs">
                <path
                  d="M12 2 C18 10 22 18 20 25 C18 30 14 31 12 31 C10 31 6 30 4 25 C2 18 6 10 12 2 Z"
                  fill={petal.color}
                  opacity="0.88"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center">
        
        {/* ============================================================ */}
        {/* 1. SECTION PRE-HEADER & AUSPICIOUS SYMBOLS */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mb-3 sm:mb-4"
        >
          <div className="flex items-center justify-center gap-2 mb-1 select-none">
            <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#b88636]" />
            <span className="text-[#b88636] text-xs sm:text-sm">❦</span>
            <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.26em] text-[#8c5021] uppercase px-1">
              THE BRIDE &amp; GROOM
            </span>
            <span className="text-[#b88636] text-xs sm:text-sm">❦</span>
            <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#b88636]" />
          </div>

          {/* Couple Names - Grand Majestic Maroon Typography */}
          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#42100b] uppercase leading-tight mt-1">
            <span>{groomName}</span>
            <span className="font-cormorant italic text-2xl sm:text-4xl md:text-5xl text-[#b88636] font-normal mx-2 sm:mx-3.5 lowercase">
              &amp;
            </span>
            <span>{brideName}</span>
          </h2>

          {/* Subtitle Line: "Together begins forever." */}
          <p className="font-cormorant italic text-base sm:text-xl md:text-2xl text-[#7c2d12] font-semibold mt-1 tracking-wide">
            &ldquo;Together begins forever.&rdquo;
          </p>

          {/* Delicate Divider Ornament */}
          <div className="flex items-center justify-center gap-2 mt-2 select-none">
            <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#b88636]/60 to-transparent" />
            <span className="text-[#b88636] text-xs">✦</span>
            <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#b88636]/60 to-transparent" />
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 2. GRAND COUPLE COMPOSITION (UNCONFINED, DOMINANT FOCAL POINT) */}
        {/* ============================================================ */}
        <div className="relative w-full max-w-2xl sm:max-w-3xl flex items-center justify-center mt-2 sm:mt-4">
          
          {/* Luminous Warm Golden Backlight Glow */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] md:w-[620px] h-[340px] sm:h-[520px] md:h-[620px] rounded-full pointer-events-none -z-10 blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(255,215,120,0.7) 0%, rgba(230,160,50,0.35) 45%, rgba(180,100,30,0.1) 65%, transparent 75%)",
            }}
          />

          {/* Sacred Rotating Lotus Mandala Halo (Subtle secondary backdrop) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              isInView
                ? {
                    opacity: 0.55,
                    scale: 1,
                    rotate: shouldReduceMotion ? 0 : 360,
                  }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{
              opacity: { duration: 1.2, ease: "easeOut" },
              scale: { duration: 1.2, ease: "easeOut" },
              rotate: {
                repeat: Infinity,
                duration: 90,
                ease: "linear",
              },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[460px] md:w-[560px] h-[300px] sm:h-[460px] md:h-[560px] pointer-events-none -z-10 select-none"
          >
            <Image
              src="/decoration/Lotus-Mandala.png"
              alt="Sacred Lotus Mandala"
              fill
              className="object-contain filter sepia-[0.3] brightness-105 opacity-80"
              unoptimized
            />
          </motion.div>

          {/* Ground Soft Ambient Shadow */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[240px] sm:w-[380px] md:w-[460px] h-[28px] sm:h-[40px] rounded-full bg-black/25 blur-lg pointer-events-none -z-5"
          />

          {/* Full-Length Bride & Groom Cutout Image (Middle Layer: z-10) */}
          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.95 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 45, scale: 0.95 }
            }
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-[320px] sm:max-w-[440px] md:max-w-[540px] aspect-[1024/1536] flex items-end justify-center select-none z-10"
          >
            <Image
              src="/Couple.png"
              alt={`${groomName} & ${brideName} - South Indian Wedding Couple`}
              fill
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 440px, 540px"
              className="object-contain object-bottom filter contrast-[1.03] brightness-[1.01] drop-shadow-[0_16px_36px_rgba(60,20,10,0.35)]"
              priority
              unoptimized
            />
          </motion.div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. FOREGROUND CLOUD BED COVERING ONLY THE RED REGION        */}
      {/* Sits right at the base, covering the couple's feet & filling */}
      {/* the entire gap down to Wedding Celebrations with zero gap.   */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 w-full z-20 pointer-events-none select-none overflow-hidden h-[55px] sm:h-[75px] md:h-[95px]"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { x: ["-1.5%", "1.5%", "-1.5%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[110%] -left-[5%] h-full"
        >
          <Image
            src="/decoration/couple-clouds-bed.png"
            alt="Foreground Clouds Bed"
            fill
            sizes="110vw"
            className="object-cover object-top drop-shadow-[0_-4px_12px_rgba(215,185,145,0.25)]"
            priority
            unoptimized
          />
        </motion.div>
      </div>

    </section>
  );
};
