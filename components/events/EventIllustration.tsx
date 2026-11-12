"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingEvent } from "@/config/eventsConfig";
import { EventFallbackIcon } from "./EventFallbackIcon";

interface EventIllustrationProps {
  event: WeddingEvent;
  className?: string;
  priority?: boolean;
}

export const EventIllustration: React.FC<EventIllustrationProps> = ({
  event,
  className = "",
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Subtle divine golden glow behind illustration */}
      <div
        className="absolute inset-4 rounded-full opacity-45 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${event.accentColor || "#d4af37"}55 0%, rgba(200,140,40,0.18) 50%, transparent 75%)`,
        }}
      />

      {/* Main Illustration or Ornate Fallback */}
      {!imageError && event.illustration ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={event.illustration}
            alt={event.name}
            fill
            sizes="(max-width: 768px) 80vw, 420px"
            className="object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)]"
            unoptimized
            priority={priority}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        /* Ornate Temple Medallion Fallback */
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-[#d4af37]/60 bg-gradient-to-b from-[#1c1612] to-[#0d0a08] flex flex-col items-center justify-center p-6 text-center shadow-[0_15px_45px_rgba(0,0,0,0.85)]">
            {/* Concentric gold rings */}
            <div className="absolute inset-2 rounded-full border border-[#d4af37]/30 border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-[#ffd978]/20" />

            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center shadow-inner">
                <EventFallbackIcon type={event.iconFallback} size={28} className="text-[#ffd978]" />
              </div>
              <span className="font-cinzel text-xs font-semibold tracking-wider text-[#f5ecd4] uppercase mt-1">
                {event.name}
              </span>
              <span className="text-[10px] text-[#d4af37]/75 font-serif italic">
                {event.subTitle || "Auspicious Celebration"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
