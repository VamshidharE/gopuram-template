"use client";

import React from "react";
import Image from "next/image";
import { WeddingEvent } from "@/config/eventsConfig";

interface EventHorizontalTimelineProps {
  events: WeddingEvent[];
  activeIndex: number;
  onSelectEvent: (index: number) => void;
}

export const EventHorizontalTimeline: React.FC<EventHorizontalTimelineProps> = ({
  events,
  activeIndex,
  onSelectEvent,
}) => {
  if (events.length <= 1) return null;

  return (
    <nav
      aria-label="Wedding Events Desktop Timeline"
      className="relative z-30 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-1 pb-1 select-none"
    >
      <div className="flex items-center justify-center gap-4 sm:gap-7 lg:gap-10">
        {events.map((event, index) => {
          const isActive = index === activeIndex;

          return (
            <React.Fragment key={event.id}>
              {/* Event Item Button (Compact Size, No Dates) */}
              <button
                type="button"
                onClick={() => onSelectEvent(index)}
                aria-label={`Jump to ${event.name}`}
                aria-current={isActive ? "step" : undefined}
                className={`relative flex flex-col items-center gap-1 shrink-0 group cursor-pointer transition-all duration-300 py-1 px-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8e3622] ${
                  isActive ? "scale-105" : "opacity-85 hover:opacity-100 hover:scale-103"
                }`}
              >
                {/* Compact Transparent Event Illustration */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13 ${
                    isActive
                      ? "drop-shadow-[0_8px_16px_rgba(255,190,70,0.55)] scale-108"
                      : "drop-shadow-[0_4px_8px_rgba(0,0,0,0.20)] group-hover:scale-105"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={event.illustration}
                      alt={event.name}
                      fill
                      sizes="56px"
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Event Nav Label (Clean Uppercase) */}
                <span
                  className={`font-cinzel text-xs lg:text-[13px] tracking-wider uppercase transition-colors duration-200 ${
                    isActive
                      ? "font-extrabold text-[#742719]"
                      : "font-bold text-[#45362c] group-hover:text-[#742719]"
                  }`}
                >
                  {event.navLabel || event.name}
                </span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="w-6 sm:w-7 h-0.5 bg-[#8e3622] rounded-full mt-0.5 shadow-xs" />
                )}
              </button>

              {/* Connecting Line with Ornate Four-Point Diamond Marker */}
              {index < events.length - 1 && (
                <div className="flex items-center gap-1.5 text-[#d4af37]/80 shrink-0 select-none pb-4">
                  <span className="w-4 sm:w-6 lg:w-9 h-px bg-[#cfa473]/70" />
                  <span className="text-[9px] sm:text-[10px] text-[#8e3622]">✦</span>
                  <span className="w-4 sm:w-6 lg:w-9 h-px bg-[#cfa473]/70" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
