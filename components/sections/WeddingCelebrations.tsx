"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Calendar, Clock, MapPin, Navigation } from "lucide-react";
import { WeddingEventData, weddingConfig } from "@/config/weddingConfig";

/* ─────────────── Event Nav Marker ─────────────── */
interface EventMarkerProps {
  event: WeddingEventData;
  isActive: boolean;
  onClick: () => void;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`Select ${event.name} celebration`}
    aria-current={isActive ? "step" : undefined}
    className={`group relative flex flex-col items-center justify-between cursor-pointer transition-all duration-300 focus:outline-none shrink-0 ${
      isActive
        ? "scale-105 z-10"
        : "opacity-75 hover:opacity-100 hover:scale-102"
    }`}
  >
    {/* Architectural Arch Tab Card */}
    <div
      className={`relative w-[72px] h-[92px] sm:w-20 sm:h-24 md:w-24 md:h-28 flex flex-col items-center justify-between p-1.5 sm:p-2 transition-all duration-300 ${
        isActive
          ? "bg-[#fffdf8] shadow-[0_8px_22px_rgba(138,90,50,0.22)] border-2 border-[#b87d46]"
          : "bg-[#fcf6ea]/90 hover:bg-[#fffdf8] border border-[#e4d4bf]"
      }`}
      style={{
        borderRadius: "2rem 2rem 0.6rem 0.6rem", // Arch top
      }}
    >
      {/* Top subtle gold highlight on active */}
      {isActive && (
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent rounded-t-full" />
      )}

      {/* Mini illustration */}
      <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 mt-0.5">
        <Image
          src={event.illustration}
          alt={event.name}
          fill
          sizes="60px"
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Label and compact date */}
      <div className="flex flex-col items-center text-center pb-0.5 leading-none">
        <span
          className={`font-cinzel text-[10.5px] sm:text-xs md:text-[13px] tracking-wide font-bold transition-colors ${
            isActive ? "text-[#742719]" : "text-[#5e4332]"
          }`}
        >
          {event.navLabel}
        </span>
        <span className="font-cormorant text-[9px] sm:text-[10px] text-[#8c6b50] mt-0.5 font-medium">
          {event.date.split(",")[0] || event.date}
        </span>
      </div>
    </div>

    {/* Active Dot with Connector Track */}
    <div className="flex items-center justify-center mt-2 sm:mt-2.5">
      {isActive ? (
        <span className="w-2.5 h-2.5 rounded-full bg-[#8e3622] ring-2 ring-[#ffd700]/70 shadow-xs" />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a06c]/50 group-hover:bg-[#c9a06c]" />
      )}
    </div>
  </button>
);

/* ─────────────── Session-Persistent Interactive Google Maps Component ─────────────── */
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

  const isCurrentLoaded = loadedIds.has(activeEventId);

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[16/8] max-h-[170px] sm:max-h-none rounded-xl overflow-hidden border border-[#c99f58]/80 shadow-[0_6px_18px_rgba(80,45,20,0.14)] bg-[#f8f1e4]">
      {/* Subtle inner gold rim */}
      <div className="absolute inset-0 rounded-xl border border-[#ffd700]/30 pointer-events-none z-20" />

      {/* Loading indicator shown only once when the active map hasn't loaded yet */}
      {!isCurrentLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#faf1e0] text-[#744c2c] text-xs font-cinzel font-semibold z-15">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8e3622] animate-ping" />
            <span>Loading Venue Map...</span>
          </div>
        </div>
      )}

      {/* Persistent iframes: load once, then reuse seamlessly for the entire session without reloading */}
      {events.map((e) => {
        const isCurrent = e.id === activeEventId;
        const q = e.mapQuery || `${e.venue}, ${e.address || ""}`;
        const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

        return (
          <iframe
            key={e.id}
            title={`Google Maps venue location for ${e.venue}`}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
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

/* ─────────────── Event Detail Showcase ─────────────── */
interface EventShowcaseProps {
  event: WeddingEventData;
  events: WeddingEventData[];
}

const EventShowcase: React.FC<EventShowcaseProps> = ({ event, events }) => {
  const queryText = event.mapQuery || `${event.venue}, ${event.address || ""}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryText)}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      {/* 
        DESKTOP LAYOUT: Balanced 2-Column (Left: Visual Illustration; Right: Details + Interactive Map + Action)
        MOBILE LAYOUT: Strictly Ordered (1. Title -> 2. Illustration -> 3. Date & Time -> 4. Venue -> 5. Map -> 6. Directions)
      */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 xl:gap-14">
        
        {/* ============================================================ */}
        {/* MOBILE ONLY: EVENT TITLE & DESCRIPTION (First in mobile order) */}
        {/* ============================================================ */}
        <div className="lg:hidden w-full text-center mb-1">
          <span className="inline-block px-3 py-0.5 rounded-full bg-[#fbf2e3] border border-[#d4ba9b]/60 font-cinzel text-[11px] font-bold tracking-[0.22em] text-[#742719] uppercase mb-1">
            CELEBRATION DETAILS
          </span>
          <h3 className="font-cinzel text-2xl font-black tracking-wide text-[#42100b] uppercase">
            {event.name}
          </h3>
          {event.subTitle && (
            <p className="font-cormorant text-base italic text-[#744c2c] font-semibold mt-0.5">
              {event.subTitle}
            </p>
          )}
        </div>

        {/* ============================================================ */}
        {/* LEFT COLUMN (Desktop) / STEP 2 (Mobile): PROMINENT ILLUSTRATION */}
        {/* ============================================================ */}
        <motion.div
          key={`illustration-${event.id}`}
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-[240px] sm:max-w-[280px] lg:w-[45%] lg:max-w-[400px] aspect-[1/1] sm:aspect-[4/5] shrink-0 flex items-center justify-center mx-auto my-0.5 sm:my-1"
        >
          {/* Soft ambient radial glow - unrestricted without harsh boundaries */}
          <div
            className="absolute inset-0 rounded-full opacity-35 blur-xl sm:blur-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${event.accentColor || "#d4af37"} 0%, transparent 70%)`,
            }}
          />

          {/* Visual Asset - boundary-free and enlarged */}
          <div className="relative w-full h-full">
            <Image
              src={event.illustration}
              alt={event.name}
              fill
              sizes="(max-width: 640px) 250px, (max-width: 1024px) 280px, 400px"
              className="object-contain drop-shadow-[0_10px_24px_rgba(80,45,20,0.22)]"
              unoptimized
              priority
            />
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN (Desktop) / STEPS 3-6 (Mobile): DETAILS & MAP */}
        {/* ============================================================ */}
        <motion.div
          key={`details-${event.id}`}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1 w-full max-w-lg flex flex-col justify-start text-left pt-1"
        >
          {/* DESKTOP TITLE & DESCRIPTION */}
          <div className="hidden lg:block mb-4">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#fbf2e3] border border-[#d4ba9b]/60 font-cinzel text-[11px] font-bold tracking-[0.24em] text-[#742719] uppercase mb-1.5">
              CEREMONY DETAILS
            </span>
            <h3 className="font-cinzel text-2xl lg:text-3xl font-extrabold tracking-wide text-[#42100b] uppercase leading-tight">
              {event.name}
            </h3>
            {event.subTitle && (
              <p className="font-cormorant text-base lg:text-lg italic text-[#744c2c] font-semibold mt-1">
                {event.subTitle}
              </p>
            )}
          </div>

          {/* DATE & TIME (Step 3) */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-6 mb-2.5 sm:mb-4 pb-2.5 sm:pb-3.5 border-b border-[#d9ba9b]/40">
            {/* Date */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fffdf8] text-[#742719] shrink-0 border border-[#d9ba9b]/70 flex items-center justify-center shadow-2xs mt-0.5">
                <Calendar size={14} />
              </div>
              <div>
                <span className="font-cinzel text-xs sm:text-sm font-bold text-[#42100b] block leading-snug">
                  {event.date}
                </span>
                {event.dayOfWeek && (
                  <span className="text-[11px] sm:text-xs text-[#705846] font-cormorant italic font-semibold block">
                    {event.dayOfWeek}
                  </span>
                )}
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fffdf8] text-[#742719] shrink-0 border border-[#d9ba9b]/70 flex items-center justify-center shadow-2xs mt-0.5">
                <Clock size={14} />
              </div>
              <div>
                <span className="font-cinzel text-xs sm:text-sm font-bold text-[#42100b] block leading-snug">
                  {event.startTime}
                  {event.endTime ? ` – ${event.endTime}` : " Onwards"}
                </span>
                {event.muhurthamTime && (
                  <span className="text-[11px] sm:text-xs text-[#8e3622] font-cinzel font-semibold block mt-0.5">
                    {event.muhurthamTime}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* VENUE (Step 4) */}
          <div className="flex items-start gap-2.5 mb-2.5 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fffdf8] text-[#742719] shrink-0 border border-[#d9ba9b]/70 flex items-center justify-center shadow-2xs mt-0.5">
              <MapPin size={14} />
            </div>
            <div>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-[#42100b] block leading-snug">
                {event.venue}
              </span>
              {event.address && (
                <span className="text-[11px] sm:text-xs text-[#744c2c] font-sans block mt-0.5 leading-snug">
                  {event.address}
                </span>
              )}
            </div>
          </div>

          {/* INTERACTIVE GOOGLE MAPS PREVIEW (Step 5) */}
          <div className="w-full mb-3 sm:mb-4">
            <EventMapPreview activeEventId={event.id} events={events} />
          </div>

          {/* DIRECTIONS BUTTON (Step 6) */}
          <div className="flex items-center justify-start">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 py-2 px-5 sm:py-2.5 sm:px-7 rounded-full bg-gradient-to-r from-[#63140d] via-[#7e1d13] to-[#63140d] text-[#fffcf5] border border-[#d4af37]/80 shadow-md hover:shadow-lg text-xs sm:text-sm font-cinzel font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <Navigation size={13} className="text-[#ffd700]" />
              <span>Get Directions</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─────────────── MAIN SECTION 2 COMPONENT ─────────────── */
export const WeddingCelebrationsSection: React.FC = () => {
  const { events } = weddingConfig;
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  // Continuous Auto-Cycle timer across events
  const startAutoCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 5000);
  }, [events.length]);

  useEffect(() => {
    startAutoCycle();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoCycle]);

  // Support ?event= URL parameter
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const eventParam = params.get("event")?.toLowerCase();
    if (eventParam) {
      const idx = events.findIndex(
        (e) =>
          e.id.toLowerCase() === eventParam ||
          e.name.toLowerCase() === eventParam ||
          e.navLabel.toLowerCase() === eventParam
      );
      if (idx !== -1) {
        setActiveIndex(idx);
      }
    }
  }, [events]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    startAutoCycle(); // Reset timer so active event is shown for a full duration before cycling
  }, [startAutoCycle]);

  if (events.length === 0) return null;

  const activeEvent = events[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="wedding-celebrations"
      aria-label="Wedding Celebrations"
      className="relative w-full overflow-hidden bg-transparent pt-0 pb-10 sm:pt-1 sm:pb-14 md:pt-2 md:pb-16"
    >
      {/* 
        SACRED ROTATING LOTUS MANDALA AT START OF WEDDING CELEBRATIONS
        Top half sits gracefully above, bottom half rotates continuously behind heading & event markers
      */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center">
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] md:w-[640px] md:h-[640px] opacity-80 sm:opacity-85 drop-shadow-[0_4px_28px_rgba(212,175,55,0.25)]"
        >
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt="Sacred Lotus Mandala"
            fill
            sizes="(max-width: 640px) 380px, (max-width: 768px) 520px, 640px"
            className="object-contain"
            priority
            unoptimized
          />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-20">
        {/* Floating Section Heading with Radiant Self-Highlighted Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-8 md:mb-10 px-4 flex flex-col items-center"
        >
          {/* Top Pill / Badge with warm translucent aura - text itself highlighted */}
          <div className="inline-flex items-center justify-center gap-2 mb-1.5 sm:mb-2 px-5 py-1 rounded-full bg-gradient-to-r from-transparent via-[#fffdf5]/85 to-transparent border-y border-[#d4af37]/40 select-none">
            <span className="text-[#b88636] text-[10px] sm:text-xs">✦</span>
            <span className="font-cinzel text-[11px] sm:text-xs font-black tracking-[0.26em] text-[#3d0706] uppercase [text-shadow:_0_1px_10px_rgba(255,248,220,1),_0_0_18px_rgba(255,230,150,0.9)]">
              AUSPICIOUS CEREMONIES
            </span>
            <span className="text-[#b88636] text-[10px] sm:text-xs">✦</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black tracking-wide sm:tracking-[0.16em] text-[#3d0706] uppercase leading-tight px-2 [text-shadow:_0_2px_16px_rgba(255,245,215,1),_0_0_30px_rgba(255,230,160,0.85)] drop-shadow-[0_3px_10px_rgba(80,25,10,0.15)]">
            Wedding Celebrations
          </h2>

          {/* Subtitle with warm translucent aura - text itself brightly highlighted */}
          <div className="mt-1.5 sm:mt-2 px-6 sm:px-8 py-1 rounded-full bg-gradient-to-r from-transparent via-[#fffdf5]/80 to-transparent inline-block">
            <p className="font-cormorant text-base sm:text-xl md:text-2xl italic text-[#4a1209] font-bold tracking-wide [text-shadow:_0_1px_12px_rgba(255,248,220,1),_0_0_24px_rgba(255,235,170,0.9)]">
              Join us for these sacred moments of love and tradition
            </p>
          </div>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#b88636] to-transparent mt-2" />
        </motion.div>

        {/* Event Navigation Row */}
        <div className="relative w-full max-w-2xl mx-auto mb-4 sm:mb-8 md:mb-10 px-2 sm:px-4">
          {/* Horizontal Track Line Behind Nav Dots */}
          <div className="absolute left-10 right-10 bottom-[4px] sm:bottom-[5px] h-px bg-[#d9c4ad]/70 -z-0 pointer-events-none" />

          {/* Event selectors */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-5 md:gap-7 overflow-x-auto scrollbar-hide py-1.5 sm:py-2 px-2 sm:px-3 relative z-10">
            {events.map((event, index) => (
              <EventMarker
                key={event.id}
                event={event}
                isActive={index === activeIndex}
                onClick={() => handleSelect(index)}
              />
            ))}
          </div>
        </div>

        {/* Selected Event Showcase - persistent across event auto-cycles to keep maps loaded */}
        <EventShowcase event={activeEvent} events={events} />
      </div>
    </section>
  );
};
