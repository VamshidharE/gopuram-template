"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { WeddingEventData, weddingConfig } from "@/config/weddingConfig";

/* ─────────────────────────────────────────────────────────────
 * Helper: Resolve ceremony artwork image for each event
 * Directly uses the realistic photograph of the event ceremony setup
 * ───────────────────────────────────────────────────────────── */
function getEventArtwork(event: WeddingEventData): string {
  return event.illustration;
}

/* ─────────────────────────────────────────────────────────────
 * Persistent Google Maps Embed Component (Instant Session Cache)
 * Pre-renders all venue map iframes in the DOM so that switching
 * between ceremonies is instant with zero reload across the entire session.
 * ───────────────────────────────────────────────────────────── */
const loadedMapsSessionSet = new Set<string>();

interface EventMapPreviewProps {
  activeEventId: string;
  events: WeddingEventData[];
}

const EventMapPreview: React.FC<EventMapPreviewProps> = ({ activeEventId, events }) => {
  const [loadedIds, setLoadedIds] = useState<Set<string>>(() => new Set(loadedMapsSessionSet));

  const handleMapLoad = (id: string) => {
    loadedMapsSessionSet.add(id);
    setLoadedIds((prev) => new Set(prev).add(id));
  };

  const currentEvent = events.find((e) => e.id === activeEventId);
  const currentQuery = currentEvent?.mapQuery || `${currentEvent?.venue || ""}, ${currentEvent?.address || ""}`;
  const isMapAvailable = Boolean(currentQuery.trim() && currentEvent?.venue);

  if (!isMapAvailable) return null;

  return (
    <div className="relative w-full aspect-[16/8] sm:aspect-[21/9] md:aspect-[16/7] max-h-[160px] sm:max-h-[180px] rounded-xl overflow-hidden border-2 border-[#b88636] shadow-[0_4px_18px_rgba(80,45,20,0.15)] bg-[#faedd4]">
      {/* Gold inner filigree border accent */}
      <div className="absolute inset-0 rounded-xl border border-[#ffd700]/40 pointer-events-none z-20" />

      {/* Persistent cached iframes for each event venue */}
      {events.map((e) => {
        const isCurrent = e.id === activeEventId;
        const q = e.mapQuery || `${e.venue}, ${e.address || ""}`;
        const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

        return (
          <iframe
            key={e.id}
            title={`Google Maps location for ${e.venue}`}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{
              border: 0,
              visibility: isCurrent ? "visible" : "hidden",
            }}
            loading="eager"
            allowFullScreen={false}
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => handleMapLoad(e.id)}
            className={`absolute inset-0 w-full h-full filter saturate-[0.9] contrast-[1.02] transition-opacity duration-300 ${
              isCurrent ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
 * MAIN SECTION: WeddingCelebrationsSection
 * Redesigned with:
 * - Ultra-realistic ceremony photographs (like user's Image 2 reference)
 * - Fixed event heading pill banner with ZERO clipping/cutting
 * - Warm antique-gold parchment & sculpted filigree frame
 * - Cached persistent venue map
 * - Clean mobile icon row
 * ───────────────────────────────────────────────────────────── */
export const WeddingCelebrationsSection: React.FC = () => {
  const { events } = weddingConfig;
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  // Gentle auto-cycle across events
  const startAutoCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 7000);
  }, [events.length]);

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      startAutoCycle();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isInView, shouldReduceMotion, startAutoCycle]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    startAutoCycle(); // Reset auto timer on manual interaction
  };

  const activeEvent = events[activeIndex] || events[0];

  // Active event navigation link
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    activeEvent.mapQuery || `${activeEvent.venue}, ${activeEvent.address || ""}`
  )}`;

  // SVG Geometry for Desktop Curved Timeline Ribbon
  const numEvents = events.length;
  const timelineSvgWidth = 800;
  const timelineSvgHeight = 90;

  const nodePositions = useMemo(() => {
    if (numEvents <= 1) return [timelineSvgWidth / 2];
    const margin = 110;
    const usableWidth = timelineSvgWidth - margin * 2;
    const step = usableWidth / (numEvents - 1);
    return events.map((_, i) => margin + i * step);
  }, [numEvents, events]);

  // Smooth undulating bezier curve path connecting nodes
  const timelinePathD = useMemo(() => {
    if (numEvents <= 1) return "";
    const pts = nodePositions;
    let p = `M ${pts[0] - 60} ${timelineSvgHeight / 2} `;
    p += `C ${pts[0] - 30} ${timelineSvgHeight / 2 - 8}, ${pts[0] - 15} ${timelineSvgHeight / 2 + 4}, ${pts[0]} ${timelineSvgHeight / 2} `;

    for (let i = 0; i < pts.length - 1; i++) {
      const x1 = pts[i];
      const x2 = pts[i + 1];
      const midX = (x1 + x2) / 2;
      const dx = x2 - x1;
      p += `C ${x1 + dx * 0.25} ${timelineSvgHeight / 2 - 14}, ${midX - dx * 0.2} ${timelineSvgHeight / 2 - 16}, ${midX} ${timelineSvgHeight / 2 - 6} `;
      p += `C ${midX + dx * 0.2} ${timelineSvgHeight / 2 + 4}, ${x2 - dx * 0.25} ${timelineSvgHeight / 2 + 12}, ${x2} ${timelineSvgHeight / 2} `;
    }
    p += `C ${pts[pts.length - 1] + 15} ${timelineSvgHeight / 2 - 4}, ${pts[pts.length - 1] + 30} ${timelineSvgHeight / 2 + 8}, ${pts[pts.length - 1] + 60} ${timelineSvgHeight / 2}`;
    return p;
  }, [numEvents, nodePositions]);

  return (
    <section
      ref={sectionRef}
      id="wedding-celebrations"
      aria-label="Wedding Celebrations"
      className="relative w-full overflow-hidden bg-transparent pt-8 pb-4 sm:pt-10 sm:pb-6 md:pt-12 md:pb-8 text-[#42100b] select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
       * BACKGROUND DECORATIVE ARTWORK (Kolam & Sacred Lotus Embellishments)
       * ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Top-Left Sacred Lotus Mandala Kolam */}
        <div className="absolute -top-10 -left-12 sm:-left-6 w-48 sm:w-64 h-48 sm:h-64 opacity-[0.18]">
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt=""
            fill
            className="object-contain filter sepia"
            unoptimized
          />
        </div>

        {/* Top-Right Sacred Lotus Mandala Kolam */}
        <div className="absolute -top-10 -right-12 sm:-right-6 w-48 sm:w-64 h-48 sm:h-64 opacity-[0.18]">
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt=""
            fill
            className="object-contain filter sepia"
            unoptimized
          />
        </div>

        {/* Subtle Blooming Lotus Accent on Left */}
        <div className="absolute top-1/3 -left-4 w-20 sm:w-28 h-20 sm:h-28 opacity-[0.22]">
          <Image
            src="/events/lotus-corner.png"
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </div>

        {/* Subtle Blooming Lotus Accent on Right */}
        <div className="absolute top-1/2 -right-4 w-20 sm:w-28 h-20 sm:h-28 opacity-[0.22] scale-x-[-1]">
          <Image
            src="/events/lotus-corner.png"
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─────────────────────────────────────────────────────────────
         * 1. SECTION HEADER (Attractive Architectural Royal Plaque)
         * ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 flex flex-col items-center"
        >
          {/* Auspicious Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fbf2e3] border border-[#d4af37]/70 shadow-2xs mb-2.5">
            <span className="text-[#b88636] text-[10px]">✦</span>
            <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#742719] uppercase">
              Sacred Ceremonies
            </span>
            <span className="text-[#b88636] text-[10px]">✦</span>
          </div>

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
              Wedding Celebrations
            </h2>

            {/* Right Gold Wing Flourish */}
            <span className="hidden sm:inline-block w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent ml-3" />
          </div>

          {/* Subtitle in Distinct Italic Serif */}
          <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-[#6e3a1f] font-bold tracking-wide mt-3 max-w-xl">
            &ldquo;Join us for these sacred moments of love and tradition&rdquo;
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
         * 2. CONNECTED ORNAMENTAL TIMELINE (Desktop & Mobile)
         * Uses authentic ceremony artwork images for each event
         * ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full max-w-3xl sm:max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10">
          
          {/* DESKTOP CURVED ORNAMENTAL RIBBON TIMELINE */}
          <div className="hidden sm:block relative w-full pt-4 pb-6">
            {/* SVG Undulating Gold Ribbon Line */}
            <div className="absolute inset-x-0 top-[40px] h-[48px] pointer-events-none select-none z-0">
              <svg viewBox={`0 0 ${timelineSvgWidth} ${timelineSvgHeight}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
                    <stop offset="15%" stopColor="#ffd700" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#b88636" stopOpacity="1" />
                    <stop offset="85%" stopColor="#ffd700" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0.2" />
                  </linearGradient>
                  <filter id="ribbonGlow" x="-10%" y="-30%" width="120%" height="160%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path
                  d={timelinePathD}
                  fill="none"
                  stroke="url(#goldRibbonGrad)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="url(#ribbonGlow)"
                  className="opacity-90"
                />
              </svg>
            </div>

            {/* Desktop Timeline Nodes along the Ribbon */}
            <div className="relative w-full flex items-center justify-between px-14 z-10">
              {events.map((event, index) => {
                const isActive = index === activeIndex;
                const artworkSrc = getEventArtwork(event);

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => handleSelect(index)}
                    className="group relative flex flex-col items-center justify-center focus:outline-none cursor-pointer transition-transform duration-300"
                    style={{ transform: isActive ? "scale(1.1)" : "scale(1.0)" }}
                  >
                    {/* Node Medallion Frame */}
                    <div
                      className={`relative w-16 h-16 md:w-18 md:h-18 rounded-full p-1 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-[#ffd700] via-[#c99f58] to-[#63140d] shadow-[0_8px_26px_rgba(133,24,32,0.5)] ring-4 ring-[#ffd700]"
                          : "bg-gradient-to-b from-[#fbf4e6] via-[#d4af37] to-[#8c5720] shadow-[0_4px_14px_rgba(80,45,20,0.15)] hover:scale-105"
                      }`}
                    >
                      {/* Inner Circular Artwork Window */}
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-[#241711] ring-1 ring-[#ffd700]/70 flex items-center justify-center">
                        <Image
                          src={artworkSrc}
                          alt={event.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="72px"
                          unoptimized
                        />
                        {/* Subtle warm amber overlay on inactive */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        )}
                      </div>
                    </div>

                    {/* Event Name & Date Label */}
                    <div className="flex flex-col items-center text-center mt-2.5">
                      <span
                        className={`font-cinzel text-xs md:text-sm font-bold tracking-wider uppercase transition-colors ${
                          isActive ? "text-[#741c14] font-black" : "text-[#5e4332] group-hover:text-[#741c14]"
                        }`}
                      >
                        {event.navLabel}
                      </span>
                      <span className="font-cormorant text-xs md:text-[13px] text-[#805527] font-semibold mt-0.5">
                        {event.dayOfWeek ? event.dayOfWeek.split(" ")[0] : event.date.split(",")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
           * MOBILE TIMELINE (Show JUST the Icons of Events in a Row)
           * ───────────────────────────────────────────────────────────── */}
          <div className="sm:hidden w-full py-2 px-2">
            <div className="flex items-center justify-center gap-4 mx-auto">
              {events.map((event, index) => {
                const isActive = index === activeIndex;
                const artworkSrc = getEventArtwork(event);

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => handleSelect(index)}
                    aria-label={`Select ${event.name} celebration`}
                    className={`relative flex items-center justify-center rounded-full p-0.5 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "w-14 h-14 bg-gradient-to-br from-[#ffd700] via-[#c99f58] to-[#63140d] shadow-[0_4px_18px_rgba(133,24,32,0.5)] ring-2 ring-[#ffd700] scale-110 z-10"
                        : "w-12 h-12 bg-gradient-to-b from-[#fbf4e6] via-[#d4af37] to-[#8c5720] shadow-sm opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-[#241711] ring-1 ring-[#ffd700]/70 flex items-center justify-center">
                      <Image
                        src={artworkSrc}
                        alt={event.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                        unoptimized
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
         * 3. SELECTED CEREMONY PRESENTATION CARD (Royal Antique Gold Theme)
         * Unclipped Event Heading Plaque + Realistic Ceremony Photography
         * ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full max-w-4xl mx-auto pt-6 sm:pt-8">
          
          {/* Main Ornate Carved Card Moulding Frame (Antique Gold Rim) */}
          <div className="relative rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-[#f7e4be] via-[#d4af37] to-[#8c5720] shadow-[0_20px_54px_rgba(90,45,15,0.22)]">
            
            {/* ── TOP CARTOUCHE BANNER (CEREMONY NAME) - Positioned with zero clipping ── */}
            <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                {/* Left Gold Wing Flourish */}
                <span className="hidden sm:inline-block w-8 md:w-14 h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent mr-2.5" />
                
                {/* Plaque Pill */}
                <div className="px-6 sm:px-9 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border-2 border-[#ffd700] shadow-[0_6px_20px_rgba(90,20,10,0.35)] flex items-center justify-center gap-2">
                  <span className="text-[#ffd700] text-xs">✦</span>
                  <span className="font-cinzel text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-[#ffd700]">
                    {activeEvent.name}
                  </span>
                  <span className="text-[#ffd700] text-xs">✦</span>
                </div>

                {/* Right Gold Wing Flourish */}
                <span className="hidden sm:inline-block w-8 md:w-14 h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent ml-2.5" />
              </div>
            </div>

            {/* Inner Antique Warm Parchment Card Canvas (overflow-visible to prevent any cut off) */}
            <div className="relative rounded-[14px] sm:rounded-[22px] bg-gradient-to-b from-[#fffbf2] via-[#fbf0dc] to-[#f5dfb8] pt-7 sm:pt-8 px-5 sm:px-8 pb-5 sm:pb-8 border border-[#ffd700]/60 overflow-visible">
              
              {/* Inner Fine Gold Hairline Contour */}
              <div className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border border-[#d4af37]/40 pointer-events-none" />

              {/* Corner Filigree Brackets */}
              <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 border-[#b88636] rounded-tl-sm pointer-events-none" />
              <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 border-[#b88636] rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 border-[#b88636] rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 border-[#b88636] rounded-br-sm pointer-events-none" />

              {/* Ceremony Subtitle Inscription */}
              <div className="text-center mb-5 sm:mb-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`subtitle-${activeEvent.id}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.3 }}
                    className="font-cormorant italic text-base sm:text-lg md:text-xl text-[#7c381c] font-bold"
                  >
                    {activeEvent.subTitle || "A sacred celebration with family and beloved guests"}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Card Content Grid: Left Photo Setup Showcase, Right Details & Map */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                
                {/* ============================================================ */}
                {/* LEFT: REALISTIC CEREMONY PHOTOGRAPHY SHOWCASE                */}
                {/* ============================================================ */}
                <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:w-[48%] lg:max-w-[430px] shrink-0 mx-auto">
                  {/* Sculpted Golden Frame with Corner Finials */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[14/11] rounded-2xl p-1 sm:p-1.5 bg-gradient-to-b from-[#ffd700] via-[#c99f58] to-[#8c5720] shadow-[0_12px_32px_rgba(80,45,20,0.25)]">
                    <div className="relative w-full h-full rounded-[12px] sm:rounded-[14px] overflow-hidden bg-[#241711] ring-1 ring-[#ffd700]/70">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`photo-${activeEvent.id}`}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={activeEvent.illustration}
                            alt={`${activeEvent.name} ceremony setup`}
                            fill
                            sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 430px"
                            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                            priority
                            unoptimized
                          />
                          {/* Warm golden vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* ============================================================ */}
                {/* RIGHT: CEREMONY DETAILS, VENUE & MAP PREVIEW                 */}
                {/* ============================================================ */}
                <div className="flex-1 w-full flex flex-col justify-start text-left">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`info-${activeEvent.id}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-3 mb-3.5"
                    >
                      {/* Date & Time Row (Warm Parchment Panels with Gold Hairlines) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        {/* Date Block */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#fffcf5]/95 to-[#faf0de]/95 border border-[#c99f58]/70 shadow-2xs">
                          <div className="w-8 h-8 rounded-lg bg-[#8e2424] text-[#ffd700] shrink-0 border border-[#ffd700]/50 flex items-center justify-center shadow-2xs">
                            <Calendar size={16} />
                          </div>
                          <div className="leading-tight">
                            <span className="font-cinzel text-xs sm:text-[13px] font-bold text-[#42100b] block">
                              {activeEvent.date}
                            </span>
                            {activeEvent.dayOfWeek && (
                              <span className="text-[11px] sm:text-xs text-[#744c2c] font-cormorant font-semibold block mt-0.5">
                                {activeEvent.dayOfWeek}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Time Block */}
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#fffcf5]/95 to-[#faf0de]/95 border border-[#c99f58]/70 shadow-2xs">
                          <div className="w-8 h-8 rounded-lg bg-[#8e2424] text-[#ffd700] shrink-0 border border-[#ffd700]/50 flex items-center justify-center shadow-2xs">
                            <Clock size={16} />
                          </div>
                          <div className="leading-tight">
                            <span className="font-cinzel text-xs sm:text-[13px] font-bold text-[#42100b] block">
                              {activeEvent.startTime}
                              {activeEvent.endTime && ` - ${activeEvent.endTime}`}
                            </span>
                            {activeEvent.muhurthamTime && (
                              <span className="text-[11px] sm:text-xs text-[#8e3622] font-cinzel font-semibold block mt-0.5">
                                ✦ {activeEvent.muhurthamTime}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Venue & Full Address Row (Warm Parchment Panel) */}
                      <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#fffcf5]/95 to-[#faf0de]/95 border border-[#c99f58]/70 shadow-2xs">
                        <div className="w-8 h-8 rounded-lg bg-[#8e2424] text-[#ffd700] shrink-0 border border-[#ffd700]/50 flex items-center justify-center shadow-2xs mt-0.5">
                          <MapPin size={16} />
                        </div>
                        <div className="flex-1">
                          <span className="font-cinzel text-xs sm:text-[13px] font-bold text-[#42100b] block leading-tight">
                            {activeEvent.venue}
                          </span>
                          {activeEvent.address && (
                            <span className="text-[11px] sm:text-xs text-[#744c2c] font-sans block mt-1 leading-snug">
                              {activeEvent.address}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Google Maps Preview (Instant Session Cached) */}
                  <div className="w-full mb-3">
                    <EventMapPreview activeEventId={activeEvent.id} events={events} />
                  </div>

                  {/* Get Directions Action Button */}
                  <div className="flex items-center justify-start">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 py-2 px-6 sm:px-8 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border-2 border-[#ffd700] shadow-md hover:shadow-lg text-xs sm:text-[13px] font-cinzel font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <Navigation size={13} className="text-[#ffd700]" />
                      <span>Get Directions</span>
                      <span className="text-xs transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
         * 4. BOTTOM AUSPICIOUS LOTUS TRANSITION DIVIDER
         * ───────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-center mt-6 sm:mt-8 select-none pointer-events-none">
          <div className="relative w-20 sm:w-24 h-8 sm:h-9 flex items-center justify-center">
            <Image
              src="/decoration/Lotus-Mandala.png"
              alt="Auspicious Lotus Motif"
              fill
              className="object-contain drop-shadow-[0_4px_12px_rgba(180,120,30,0.35)]"
              unoptimized
            />
          </div>
        </div>

      </div>
    </section>
  );
};
