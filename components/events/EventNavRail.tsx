"use client";

import React from "react";
import Image from "next/image";
import { WeddingEvent } from "@/config/eventsConfig";
import { EventFallbackIcon } from "./EventFallbackIcon";

interface EventNavRailProps {
  events: WeddingEvent[];
  activeIndex: number;
  visitedIndices: Set<number>;
  onSelectEvent: (index: number) => void;
  isMobile: boolean;
}

export const EventNavRail: React.FC<EventNavRailProps> = ({
  events,
  activeIndex,
  visitedIndices,
  onSelectEvent,
  isMobile,
}) => {
  if (events.length <= 1) return null;

  return (
    <nav
      aria-label="Wedding Events Itinerary Navigation"
      className={`z-35 select-none transition-all duration-300 ${
        isMobile
          ? "absolute top-4 left-3 sm:left-4 flex flex-col items-center gap-3"
          : "absolute left-6 md:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
      }`}
    >
      {/* Rail Title Badge (Desktop only) */}
      {!isMobile && (
        <div className="flex flex-col items-center mb-1">
          <span className="text-[#d4af37] text-[10px] font-serif">❦</span>
          <span className="font-cinzel text-[9px] tracking-widest text-[#d4af37]/80 uppercase writing-vertical -rotate-180 py-1">
            Events
          </span>
          <span className="text-[#d4af37] text-[10px] font-serif">❦</span>
        </div>
      )}

      {/* Vertical Rail Slots Container */}
      <div className="relative flex flex-col items-center gap-3 sm:gap-4">
        {/* Subtle Vertical Gold Connector Thread */}
        <div className="absolute top-4 bottom-4 w-px bg-gradient-to-b from-[#d4af37]/10 via-[#d4af37]/45 to-[#d4af37]/10 -z-10" />

        {events.map((event, index) => {
          const isActive = index === activeIndex;
          const isVisited = visitedIndices.has(index) && !isActive;
          const isUpcoming = !isActive && !isVisited;

          return (
            <div key={event.id} className="relative group flex items-center">
              <button
                type="button"
                onClick={() => onSelectEvent(index)}
                aria-label={`Jump to ${event.name} (${index + 1} of ${events.length})`}
                aria-current={isActive ? "step" : undefined}
                className={`relative rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#ffd978] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0807] ${
                  isMobile
                    ? "w-9 h-9 sm:w-10 sm:h-10"
                    : "w-11 h-11 md:w-12 md:h-12"
                } ${
                  isActive
                    ? "border-2 border-[#ffd978] bg-[#2a1e14] shadow-[0_0_18px_rgba(212,175,55,0.65)] scale-110"
                    : isVisited
                    ? "border border-[#d4af37]/70 bg-[#16120e]/90 hover:border-[#ffd978] hover:scale-105 shadow-md"
                    : "border border-white/20 bg-black/50 hover:border-[#d4af37]/50 hover:bg-[#1a1410] opacity-60 hover:opacity-100"
                }`}
              >
                {/* Active Pulsing Ring */}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full border border-[#ffd978]/40 animate-ping pointer-events-none" />
                )}

                {/* Content: Visited/Active thumbnail or fallback number/icon */}
                {isVisited || (isActive && event.illustration) ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden p-1 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={event.illustration}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-contain filter brightness-105"
                        unoptimized
                      />
                    </div>
                  </div>
                ) : (
                  /* Number or Fallback icon for upcoming/unvisited slot */
                  <div className="flex flex-col items-center justify-center">
                    <span
                      className={`font-cinzel text-xs font-semibold ${
                        isActive
                          ? "text-[#ffd978]"
                          : isVisited
                          ? "text-[#d4af37]"
                          : "text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                )}

                {/* Tiny Gold Status Dot for visited events */}
                {isVisited && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#d4af37] border border-[#0a0807] shadow-sm" />
                )}
              </button>

              {/* Desktop Hover / Active Tooltip Pill */}
              {!isMobile && (
                <div
                  className={`absolute left-full ml-3 px-3 py-1 rounded-lg backdrop-blur-md whitespace-nowrap pointer-events-none transition-all duration-200 z-50 ${
                    isActive
                      ? "opacity-100 translate-x-0 bg-[#1e1712]/95 border border-[#d4af37]/70 shadow-lg text-[#ffd978]"
                      : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 bg-black/85 border border-white/15 text-gray-300"
                  }`}
                >
                  <div className="font-cinzel text-xs font-semibold">
                    {event.name}
                  </div>
                  <div className="text-[10px] text-gray-400 font-serif">
                    {event.date}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
