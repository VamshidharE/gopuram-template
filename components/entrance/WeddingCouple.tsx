"use client";

import React from "react";
import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";
import { invitationConfig } from "@/config/invitationConfig";

interface WeddingCoupleProps {
  progress: MotionValue<number>;
  isMobile: boolean;
  shouldReduceMotion?: boolean | null;
}

export const WeddingCouple: React.FC<WeddingCoupleProps> = ({
  progress,
  isMobile,
  shouldReduceMotion = false,
}) => {
  const { assets } = invitationConfig;

  // Divine Warm Golden Aura Glow behind couple (always active and luminous)
  const auraOpacity = 0.5;

  return (
    <div
      style={{
        // Slightly raised position with balanced couple cutout sizing
        bottom: isMobile ? "7.5%" : "7%",
        height: isMobile ? "63%" : "61%",
        width: isMobile ? "37%" : "33%",
      }}
      className="absolute left-1/2 -translate-x-1/2 z-22 pointer-events-none select-none flex flex-col items-center justify-end"
    >
      {/* Divine Warm Golden Aura Glow behind couple */}
      <div
        style={{
          opacity: auraOpacity,
          background:
            "radial-gradient(circle, rgba(255,215,120,0.65) 0%, rgba(230,160,50,0.25) 50%, transparent 75%)",
        }}
        className="absolute inset-x-[-25%] bottom-0 top-[-10%] rounded-full pointer-events-none blur-2xl"
      />

      {/* Couple Cutout Image - Always fully visible, no fade-in animation */}
      <div className="relative w-full h-full flex items-end justify-center">
        <Image
          src={assets.coupleCutout}
          alt={assets.coupleCutoutAlt}
          fill
          sizes="(max-width: 768px) 380px, 600px"
          className="object-contain object-bottom filter contrast-[1.02] brightness-[1.01] drop-shadow-[0_12px_30px_rgba(0,0,0,0.65)]"
          unoptimized
          priority
        />
      </div>
    </div>
  );
};
