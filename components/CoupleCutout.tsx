"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import { invitationConfig } from "@/config/invitationConfig";

interface CoupleCutoutProps {
  progress: MotionValue<number>;
  isMobile: boolean;
}

export const CoupleCutout: React.FC<CoupleCutoutProps> = ({
  progress,
  isMobile,
}) => {
  const { assets, details, animation } = invitationConfig;
  const { coupleRevealStart, coupleRevealComplete } = animation;

  // At 15% scroll, head starts emerging from the bottom threshold of the screen
  // Continuously emerges until fully revealed at coupleRevealComplete (65%)
  // Then stops and locks into place
  const startYPercent = isMobile ? "27%" : "17%";

  const coupleY = useTransform(
    progress,
    [0, coupleRevealStart, coupleRevealComplete, 1],
    [startYPercent, startYPercent, "0%", "0%"]
  );

  const coupleVisibility = useTransform(progress, (p) =>
    p < coupleRevealStart ? 0 : 1
  );

  // Divine Golden Aura behind the couple
  const auraOpacity = useTransform(
    progress,
    [coupleRevealStart, coupleRevealComplete],
    [0, 0.45]
  );

  // Nameplate reveal
  const nameplateY = useTransform(
    progress,
    [coupleRevealComplete - 0.05, coupleRevealComplete],
    [15, 0]
  );
  const nameplateOpacity = useTransform(
    progress,
    [coupleRevealComplete - 0.05, coupleRevealComplete],
    [0, 1]
  );

  return (
    <div className="absolute inset-x-0 bottom-0 aspect-[2/3] w-full z-25 pointer-events-none select-none">
      {/* Divine Golden Aura behind couple */}
      <motion.div
        style={{
          opacity: auraOpacity,
          background:
            "radial-gradient(circle, rgba(245,200,100,0.55) 0%, rgba(210,150,50,0.2) 50%, transparent 75%)",
        }}
        className="absolute inset-x-4 bottom-0 top-[15%] rounded-full pointer-events-none blur-3xl"
      />

      {/* 
          Dedicated Reveal Container:
          Fills the gopuram width (w-full), maintains original 2:3 aspect ratio,
          and continues all the way till the bottom of the gopuram.
          Emerges gracefully from behind the threshold without being rushed.
      */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <motion.div
          style={{
            y: coupleY,
            opacity: coupleVisibility,
          }}
          className="relative w-full h-full will-change-transform drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
        >
          <Image
            src={assets.coupleCutout}
            alt={assets.coupleCutoutAlt}
            fill
            className="object-contain object-bottom"
            unoptimized
            priority
          />
        </motion.div>
      </div>

      {/* Elegant Couple Nameplate Tag anchored at the bottom of the gopuram */}
      <motion.div
        style={{
          y: nameplateY,
          opacity: nameplateOpacity,
        }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-[#d4af37]/50 bg-[#0f0e0c]/90 backdrop-blur-md text-center shadow-2xl flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
      >
        <span className="text-[#e8c766] text-[10px] font-serif">❦</span>
        <span className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-widest text-[#f5ecd4] uppercase">
          {details.groomName} & {details.brideName}
        </span>
        <span className="text-[#e8c766] text-[10px] font-serif">❦</span>
      </motion.div>
    </div>
  );
};
