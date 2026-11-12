"use client";

import React from "react";
import Image from "next/image";
import { WeddingEvent } from "@/config/eventsConfig";
import { Calendar, Clock, MapPin, Sparkles, Navigation } from "lucide-react";

interface EventDetailsProps {
  event: WeddingEvent;
  eventIndex: number;
  totalEvents: number;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
}) => {
  // Construct genuine Google Maps destination query URL
  const queryText = event.mapQuery || `${event.venue}, ${event.address || ""}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`;

  return (
    <div className="relative flex flex-col items-center justify-center text-left w-full max-w-[295px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[390px] xl:max-w-[410px] select-text pointer-events-auto">
      {/* ------------------------------------------------------------- */}
      {/* AUTHENTIC USER PORTRAIT INVITATION CARD FRAME LAYER          */}
      {/* (Stepped tab, draped floral garland, etched lotus & spine)    */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full aspect-[658/994] max-h-[calc(100vh-170px)] max-w-[calc((100vh-170px)*(658/994))] mx-auto drop-shadow-[0_22px_50px_rgba(25,12,5,0.36)]">
        {/* Layer 1: Frame Artwork Image */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <Image
            src="/events/invitation-card-portrait.png"
            alt="Wedding Invitation Card"
            fill
            sizes="(max-width: 768px) 320px, 440px"
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Layer 2: Dynamic Structured Content Overlay (Balanced Spacing, No Gaps) */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between pl-[13%] pr-[10%] pt-[7%] md:pt-[6.5%] pb-[7%] md:pb-[6%] text-[#2c221e]">
          {/* Top Section: Auspicious Crest, Title & Subtitle */}
          <div className="text-center pt-0.5">
            {/* Auspicious Lotus Crest */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[#c49a45] mb-0.5">
              <span className="w-6 sm:w-10 h-px bg-gradient-to-r from-transparent to-[#cfa473]" />
              <span className="text-[11px] sm:text-xs font-serif leading-none select-none">🪷</span>
              <span className="w-6 sm:w-10 h-px bg-gradient-to-l from-transparent to-[#cfa473]" />
            </div>

            {/* Event Name */}
            <h3 className="font-cinzel text-base sm:text-xl md:text-2xl lg:text-[25px] font-extrabold tracking-wider text-[#742719] uppercase leading-tight drop-shadow-xs">
              {event.name}
            </h3>

            {/* Event Subtitle */}
            {event.subTitle && (
              <p className="font-cormorant text-xs sm:text-sm md:text-base italic text-[#8e422f] mt-0.5 font-medium leading-tight">
                {event.subTitle}
              </p>
            )}

            {/* Delicate Hairline Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent mt-1.5 mb-1 sm:mt-2 sm:mb-2" />
          </div>

          {/* Middle Section: 3 Well-Spaced Metadata Rows (Scaled up to eliminate dead gaps) */}
          <div className="flex flex-col gap-2.5 sm:gap-3.5 md:gap-2.5 lg:gap-3.5 py-0.5 md:py-1">
            {/* 1. Date & Day Section */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl bg-[#f5ece1]/95 text-[#7a281c] shrink-0 mt-0.5 border border-[#ebdccf] flex items-center justify-center shadow-2xs">
                <Calendar size={15} className="sm:w-4 sm:h-4 md:w-[17px] md:h-[17px]" />
              </div>
              <div className="leading-tight">
                <span className="text-[#8c6b58] block text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase font-mono font-bold tracking-widest leading-none mb-0.5">
                  Date & Day
                </span>
                <span className="font-cinzel text-xs sm:text-sm md:text-[15px] font-bold text-[#2a1e17] block leading-tight">
                  {event.date}
                </span>
                {event.dayOfWeek && (
                  <span className="text-[10.5px] sm:text-xs md:text-[12.5px] text-[#6b5447] font-cormorant italic block mt-0.5 font-medium leading-none">
                    {event.dayOfWeek}
                  </span>
                )}
              </div>
            </div>

            {/* 2. Time & Sumuhurtham Section */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl bg-[#f5ece1]/95 text-[#7a281c] shrink-0 mt-0.5 border border-[#ebdccf] flex items-center justify-center shadow-2xs">
                <Clock size={15} className="sm:w-4 sm:h-4 md:w-[17px] md:h-[17px]" />
              </div>
              <div className="leading-tight flex-1">
                <span className="text-[#8c6b58] block text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase font-mono font-bold tracking-widest leading-none mb-0.5">
                  Time
                </span>
                <span className="font-cinzel text-xs sm:text-sm md:text-[15px] font-bold text-[#2a1e17] block leading-tight">
                  {event.startTime}
                  {event.endTime ? ` – ${event.endTime}` : " Onwards"}
                </span>

                {/* Auspicious Sumuhurtham Badge if present */}
                {event.muhurthamTime && (
                  <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded border border-[#c49a45]/50 bg-[#faf1df] text-[#742719] text-[9.5px] sm:text-[10.5px] md:text-xs font-cinzel font-bold tracking-wide shadow-2xs leading-none">
                    <Sparkles size={10} className="text-[#b8860b] shrink-0" />
                    <span>{event.muhurthamTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Venue & Address Section */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl bg-[#f5ece1]/95 text-[#7a281c] shrink-0 mt-0.5 border border-[#ebdccf] flex items-center justify-center shadow-2xs">
                <MapPin size={15} className="sm:w-4 sm:h-4 md:w-[17px] md:h-[17px]" />
              </div>
              <div className="leading-tight flex-1 min-w-0">
                <span className="text-[#8c6b58] block text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase font-mono font-bold tracking-widest leading-none mb-0.5">
                  Venue
                </span>
                <span className="font-cinzel text-xs sm:text-sm md:text-[15px] font-bold text-[#2a1e17] block leading-tight">
                  {event.venue}
                </span>
                {event.address && (
                  <span className="text-[10px] sm:text-[11.5px] md:text-xs text-[#5c4a3f] font-sans block mt-0.5 leading-snug line-clamp-2">
                    {event.address}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section: Big Size Google Maps Preview & Action Button */}
          <div className="pt-1.5 sm:pt-2 border-t border-[#d9ba9b]/60 flex flex-col gap-1.5 sm:gap-2">
            {/* Big Size Google Maps Interactive Preview Box */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${event.venue} on Google Maps`}
              className="relative w-full h-22 sm:h-26 md:h-24 lg:h-26 xl:h-28 rounded-xl sm:rounded-2xl overflow-hidden border border-[#cfa473]/80 group shadow-sm cursor-pointer block"
            >
              <Image
                src="/events/map-preview-large.png"
                alt={`Google Map of ${event.venue}`}
                fill
                sizes="(max-width: 768px) 290px, 440px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                unoptimized
              />

              {/* Gentle Vignette & Interactive Hover Pill */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-between p-2">
                <span className="bg-[#ffffff]/90 backdrop-blur-xs text-[#2a1e17] text-[9.5px] sm:text-[10.5px] font-semibold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <Navigation size={10} className="text-[#8c3323]" />
                  <span>Navigate</span>
                </span>
                <span className="text-white text-[9.5px] sm:text-[10.5px] font-sans font-medium opacity-90 drop-shadow-sm group-hover:underline">
                  Tap to open map ↗
                </span>
              </div>
            </a>

            {/* View on Google Maps Terracotta Action Button */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#8c3323] via-[#9e3823] to-[#782417] hover:from-[#762012] hover:to-[#8c3323] text-[#fffdfa] shadow-md hover:shadow-lg text-xs sm:text-[13px] md:text-sm font-cinzel font-bold tracking-wider transition-all duration-200 cursor-pointer text-center"
            >
              <MapPin size={13} className="text-[#ffd700] shrink-0" />
              <span>View on Google Maps →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
