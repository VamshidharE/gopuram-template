"use client";

import React from "react";
import Image from "next/image";
import { WeddingEvent } from "@/config/eventsConfig";

interface EventMobileNavRailProps {
  events: WeddingEvent[];
  activeIndex: number;
  onSelectEvent: (index: number) => void;
}

export const EventMobileNavRail: React.FC<EventMobileNavRailProps> = ({
  events,
  activeIndex,
  onSelectEvent,
}) => {
  if (events.length <= 1) return null;

  return (
    <nav
      aria-label="Wedding Events Mobile Rail"
      className="absolute left-6 sm:left-8 top-[46%] -translate-y-1/2 z-35 flex flex-col items-center gap-3.5 select-none md:hidden"
    >
      {/* Subtle Vertical Gold Connector Thread */}
      <div className="absolute top-4 bottom-4 w-px bg-gradient-to-b from-[#d4af37]/30 via-[#8e3622]/50 to-[#d4af37]/30 -z-10" />

      {events.map((event, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={event.id}
            type="button"
            onClick={() => onSelectEvent(index)}
            aria-label={`Jump to ${event.name} (${index + 1} of ${events.length})`}
            aria-current={isActive ? "step" : undefined}
            className={`relative rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#8e3622] ${
              isActive
                ? "w-12 h-12 sm:w-13 sm:h-13 bg-[#fdfaf3] ring-2 ring-[#8e3622] ring-offset-2 ring-offset-transparent shadow-lg scale-110"
                : "w-10 h-10 sm:w-11 sm:h-11 bg-[#fdfaf3]/90 border border-[#d9ba9b]/70 opacity-85 hover:opacity-100 hover:scale-105 shadow-xs"
            }`}
          >
            {/* Larger Image Icon of Event */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <Image
                src={event.illustration}
                alt=""
                fill
                sizes="40px"
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Terracotta Status Bead for active item */}
            {isActive && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#8e3622] border-2 border-[#fdfaf3] shadow-xs" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
