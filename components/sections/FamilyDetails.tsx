"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { weddingConfig } from "@/config/weddingConfig";
import { MapPin } from "lucide-react";

export const FamilyDetails: React.FC = () => {
  const { families } = weddingConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="our-families"
      aria-label="Our Families Section"
      className="relative w-full overflow-hidden bg-transparent pt-8 pb-3 sm:pt-10 sm:pb-4 md:pt-12 md:pb-6 text-[#42100b] select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
       * BACKGROUND DECORATIVE ARTWORK (Kolam & Sacred Lotus Embellishments)
       * ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Sacred Lotus Mandala Kolam on Left */}
        <div className="absolute -top-12 -left-10 w-52 sm:w-72 h-52 sm:h-72 opacity-[0.18]">
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt=""
            fill
            className="object-contain filter sepia"
            unoptimized
          />
        </div>

        {/* Sacred Lotus Mandala Kolam on Right */}
        <div className="absolute -top-12 -right-10 w-52 sm:w-72 h-52 sm:h-72 opacity-[0.18]">
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt=""
            fill
            className="object-contain filter sepia"
            unoptimized
          />
        </div>

        {/* Blooming Pink & Gold Lotus Accent */}
        <div className="absolute bottom-4 right-4 sm:right-10 w-22 sm:w-28 h-22 sm:h-28 opacity-[0.22] scale-x-[-1]">
          <Image
            src="/events/lotus-corner.png"
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─────────────────────────────────────────────────────────────
         * 1. SECTION HEADER (Attractive Royal Architectural Cartouche Plaque)
         * ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 flex flex-col items-center"
        >
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
              Our Families
            </h2>

            {/* Right Gold Wing Flourish */}
            <span className="hidden sm:inline-block w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent ml-3" />
          </div>

          {/* Subtitle in Distinct Italic Serif */}
          <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-[#6e3a1f] font-bold tracking-wide mt-3 max-w-xl">
            &ldquo;The families that made this union possible&rdquo;
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
         * 2. FAMILIES SHOWCASE (Enlarged Grand Portraits - Zero Unwanted Gap)
         * ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-14 lg:gap-20">
          
          {/* ────────────── LEFT: BRIDE'S FAMILY ────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] flex flex-col items-center text-center group"
          >
            {/* Arched Temple Frame with Gold Moulding */}
            <div
              className="relative w-full aspect-[4/5] p-2.5 sm:p-3 rounded-t-[8.5rem] sm:rounded-t-[10rem] md:rounded-t-[11rem] rounded-b-2xl shadow-[0_16px_38px_rgba(80,45,25,0.25)] transition-transform duration-500 group-hover:scale-[1.02]"
              style={{
                background: "linear-gradient(180deg, #f7e7c4 0%, #d4af37 25%, #996f2d 65%, #c99f58 100%)",
              }}
            >
              {/* Inner Inset Rim */}
              <div className="relative w-full h-full rounded-t-[8rem] sm:rounded-t-[9.5rem] md:rounded-t-[10.5rem] rounded-b-xl overflow-hidden bg-[#241711] ring-1 ring-[#ffd700]/70">
                <Image
                  src={families.bride.portrait}
                  alt={families.bride.portraitAlt}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 460px"
                  className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                  unoptimized
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Deep Maroon Cartouche Plaque Badge */}
            <div className="-mt-4 relative z-20 px-6 sm:px-7 py-1.5 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border border-[#d4af37] shadow-md">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#ffd700]">
                {families.bride.title}
              </span>
            </div>

            {/* Parents' Names */}
            <h3 className="font-cinzel text-base sm:text-lg md:text-xl font-bold text-[#42100b] tracking-wide mt-3.5 leading-snug">
              {families.bride.members.map((m) => m.name).join(" & ")}
            </h3>

            {/* Location with Pin */}
            {families.bride.location && (
              <div className="inline-flex items-center gap-1.5 mt-1.5 text-[#744c2c]">
                <MapPin size={14} className="text-[#8e3622] shrink-0" />
                <span className="font-cormorant text-sm sm:text-base font-semibold tracking-wide">
                  {families.bride.location}
                </span>
              </div>
            )}
          </motion.div>

          {/* ────────────── RIGHT: GROOM'S FAMILY ────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] flex flex-col items-center text-center group"
          >
            {/* Arched Temple Frame with Gold Moulding */}
            <div
              className="relative w-full aspect-[4/5] p-2.5 sm:p-3 rounded-t-[8.5rem] sm:rounded-t-[10rem] md:rounded-t-[11rem] rounded-b-2xl shadow-[0_16px_38px_rgba(80,45,25,0.25)] transition-transform duration-500 group-hover:scale-[1.02]"
              style={{
                background: "linear-gradient(180deg, #f7e7c4 0%, #d4af37 25%, #996f2d 65%, #c99f58 100%)",
              }}
            >
              {/* Inner Inset Rim */}
              <div className="relative w-full h-full rounded-t-[8rem] sm:rounded-t-[9.5rem] md:rounded-t-[10.5rem] rounded-b-xl overflow-hidden bg-[#241711] ring-1 ring-[#ffd700]/70">
                <Image
                  src={families.groom.portrait}
                  alt={families.groom.portraitAlt}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 460px"
                  className="object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                  unoptimized
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Deep Maroon Cartouche Plaque Badge */}
            <div className="-mt-4 relative z-20 px-6 sm:px-7 py-1.5 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border border-[#d4af37] shadow-md">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#ffd700]">
                {families.groom.title}
              </span>
            </div>

            {/* Parents' Names */}
            <h3 className="font-cinzel text-base sm:text-lg md:text-xl font-bold text-[#42100b] tracking-wide mt-3.5 leading-snug">
              {families.groom.members.map((m) => m.name).join(" & ")}
            </h3>

            {/* Location with Pin */}
            {families.groom.location && (
              <div className="inline-flex items-center gap-1.5 mt-1.5 text-[#744c2c]">
                <MapPin size={14} className="text-[#8e3622] shrink-0" />
                <span className="font-cormorant text-sm sm:text-base font-semibold tracking-wide">
                  {families.groom.location}
                </span>
              </div>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
