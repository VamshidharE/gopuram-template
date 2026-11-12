"use client";

import React from "react";
import { Sparkles, Flame, Music, Disc, Heart, Sun, Flower2 } from "lucide-react";

interface EventFallbackIconProps {
  type?: string;
  className?: string;
  size?: number;
}

export const EventFallbackIcon: React.FC<EventFallbackIconProps> = ({
  type,
  className = "w-6 h-6 text-[#d4af37]",
  size = 24,
}) => {
  switch (type) {
    case "ring":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Ornate interlocking wedding rings */}
          <circle cx="9" cy="14" r="5" />
          <circle cx="15" cy="14" r="5" />
          <path d="M9 9 L12 5 L15 9" />
          <polygon points="12,3 13.5,6 12,8 10.5,6" fill="currentColor" opacity="0.6" />
        </svg>
      );
    case "turmeric":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Auspicious Kalash / Pot with mango leaves & coconut */}
          <path d="M6 10 C6 7, 18 7, 18 10 C18 17, 15 21, 12 21 C9 21, 6 17, 6 10 Z" />
          <ellipse cx="12" cy="10" rx="6" ry="2" />
          <path d="M8 8 C9 4, 12 3, 12 3 C12 3, 15 4, 16 8" />
          <circle cx="12" cy="6" r="2" fill="currentColor" opacity="0.5" />
        </svg>
      );
    case "music":
      return <Music size={size} className={className} />;
    case "sacred-fire":
      return <Flame size={size} className={className} />;
    case "flower":
      return <Flower2 size={size} className={className} />;
    default:
      return <Sparkles size={size} className={className} />;
  }
};
