"use client";

import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  EventsConfig,
  defaultEventsConfig,
  getEventScrollProgressTarget,
} from "@/config/eventsConfig";
import { WeddingTitleBanner } from "./WeddingTitleBanner";
import { EventHorizontalTimeline } from "./EventHorizontalTimeline";
import { EventMobileNavRail } from "./EventMobileNavRail";
import { EventStage } from "./EventStage";

interface WeddingEventsSectionProps {
  config?: EventsConfig;
}

export const WeddingEventsSection: React.FC<WeddingEventsSectionProps> = ({
  config = defaultEventsConfig,
}) => {
  const { events, sectionTitle, scrollVhPerEvent, backgroundImage } = config;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isProgrammaticScrolling = useRef<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  // Handle empty events array gracefully
  const totalEvents = events.length;

  // Dynamic section track height based on event count
  const totalTrackHeightVh = useMemo(() => {
    if (totalEvents <= 0) return 0;
    if (totalEvents === 1) return 120;
    return totalEvents * scrollVhPerEvent;
  }, [totalEvents, scrollVhPerEvent]);

  // Framer Motion normalized scroll tracking dedicated to Wedding Events section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const sectionProgressValue = useMotionValue(0);

  // Synchronize scroll progress into motion value & derive active event index
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      sectionProgressValue.set(latest);

      if (totalEvents <= 1) {
        setActiveIndex(0);
        return;
      }

      // Determine active event index from normalized progress
      const step = 1 / totalEvents;
      const rawIndex = Math.floor(latest / step);
      const clampedIndex = Math.min(totalEvents - 1, Math.max(0, rawIndex));

      setActiveIndex(clampedIndex);
    });

    return () => unsub();
  }, [scrollYProgress, sectionProgressValue, totalEvents]);

  // Mobile detection & URL parameter testing support
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Support ?event=0..3 or ?eventProgress=0.xx for verification and direct testing
    const params = new URLSearchParams(window.location.search);
    const eventProgressParam = params.get("eventProgress");
    const eventParam = params.get("event");

    if (eventProgressParam !== null || eventParam !== null) {
      const timer = setTimeout(() => {
        if (!sectionRef.current) return;
        let targetProgress = 0;
        if (eventProgressParam !== null) {
          const parsed = parseFloat(eventProgressParam);
          if (!isNaN(parsed)) targetProgress = Math.max(0, Math.min(1, parsed));
        } else if (eventParam !== null) {
          const idx = parseInt(eventParam, 10);
          if (!isNaN(idx) && idx >= 0 && idx < totalEvents) {
            targetProgress = getEventScrollProgressTarget(idx, totalEvents);
          }
        }

        const totalScrollableDistance =
          sectionRef.current.scrollHeight - window.innerHeight;
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const currentScrollY = window.scrollY;
        const sectionTopY = currentScrollY + sectionRect.top;
        const targetScrollY = sectionTopY + totalScrollableDistance * targetProgress;

        window.scrollTo({ top: targetScrollY, behavior: "instant" });
        sectionProgressValue.set(targetProgress);

        const step = 1 / totalEvents;
        const rawIndex = Math.floor(targetProgress / step);
        const clampedIndex = Math.min(totalEvents - 1, Math.max(0, rawIndex));
        setActiveIndex(clampedIndex);
      }, 60);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", checkMobile);
      };
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, [sectionProgressValue, totalEvents]);

  // Click an event to navigate / return
  const handleSelectEvent = useCallback(
    (targetIndex: number) => {
      if (!sectionRef.current) return;
      if (isProgrammaticScrolling.current) return;

      isProgrammaticScrolling.current = true;

      const totalScrollableDistance =
        sectionRef.current.scrollHeight - window.innerHeight;
      const targetProgress = getEventScrollProgressTarget(targetIndex, totalEvents);
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY;
      const sectionTopY = currentScrollY + sectionRect.top;
      const targetScrollY = sectionTopY + totalScrollableDistance * targetProgress;

      window.scrollTo({
        top: targetScrollY,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });

      // Release debounce lock after smooth scroll settles
      setTimeout(() => {
        isProgrammaticScrolling.current = false;
      }, 800);
    },
    [totalEvents, shouldReduceMotion]
  );

  // Section Header smooth entrance
  const headerOpacity = useTransform(sectionProgressValue, [0, 0.05], [0.85, 1]);
  const headerY = useTransform(sectionProgressValue, [0, 0.05], [shouldReduceMotion ? 0 : -8, 0]);

  // If empty array, do not render broken sticky section
  if (totalEvents === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: `${totalTrackHeightVh}vh` }}
      aria-label="Wedding Celebrations Section"
      className="relative w-full text-[#2c221e]"
    >
      {/* ========================================================= */}
      {/* SEAMLESS BOUNDARY CLOUD TRANSITION (BRIDGES GOPURAM & EVENTS) */}
      {/* ========================================================= */}
      <div
        className="absolute -top-[55px] sm:-top-[68px] md:-top-[80px] inset-x-0 h-[105px] sm:h-[125px] md:h-[145px] z-30 pointer-events-none select-none overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 65%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/events/section-cloud-transition.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[1.03] contrast-[1.02]"
          unoptimized
          priority
        />
        {/* Soft atmospheric golden warmth blending the seam */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(251,191,36,0.22) 0%, rgba(245,158,11,0.06) 55%, transparent 85%)",
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* SIDE PILLARS: RELATIVE TO WEDDING CELEBRATIONS SECTION   */}
      {/* ========================================================= */}
      {/* Left Temple Pillar */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 w-[18px] sm:w-[26px] md:w-[48px] lg:w-[58px] xl:w-[68px] flex flex-col items-start pointer-events-none select-none z-35"
      >
        {/* Top Capital Bracket */}
        <div className="relative w-full aspect-[168/153] shrink-0">
          <Image
            src="/decoration/left-pillar-capital.png"
            alt=""
            fill
            sizes="(max-width: 768px) 26px, 68px"
            className="object-contain object-left-top"
            unoptimized
          />
        </div>

        {/* Seamless Repeating Vertical Shaft */}
        <div
          className="relative w-[62.5%] flex-1 shrink-0"
          style={{
            backgroundImage: "url('/decoration/pillar-segment-shaft.png')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "top left",
          }}
        />

        {/* Bottom Pedestal Base */}
        <div className="relative w-full aspect-[168/121] shrink-0">
          <Image
            src="/decoration/left-pillar-base.png"
            alt=""
            fill
            sizes="(max-width: 768px) 26px, 68px"
            className="object-contain object-left-bottom"
            unoptimized
          />
        </div>
      </div>

      {/* Right Temple Pillar */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 right-0 w-[18px] sm:w-[26px] md:w-[48px] lg:w-[58px] xl:w-[68px] flex flex-col items-end pointer-events-none select-none z-35"
      >
        {/* Top Capital Bracket */}
        <div className="relative w-full aspect-[168/153] shrink-0">
          <Image
            src="/decoration/right-pillar-capital.png"
            alt=""
            fill
            sizes="(max-width: 768px) 26px, 68px"
            className="object-contain object-right-top"
            unoptimized
          />
        </div>

        {/* Seamless Repeating Vertical Shaft (Mirrored for right symmetry) */}
        <div
          className="relative w-[62.5%] flex-1 shrink-0"
          style={{
            backgroundImage: "url('/decoration/pillar-segment-shaft-r.png')",
            backgroundRepeat: "repeat-y",
            backgroundSize: "100% auto",
            backgroundPosition: "top right",
          }}
        />

        {/* Bottom Pedestal Base */}
        <div className="relative w-full aspect-[168/121] shrink-0">
          <Image
            src="/decoration/right-pillar-base.png"
            alt=""
            fill
            sizes="(max-width: 768px) 26px, 68px"
            className="object-contain object-right-bottom"
            unoptimized
          />
        </div>
      </div>

      {/* Sticky Cinematic Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Layer 1: Photographic Sunset Temple Lake Scenery (wedding-events.png) */}
        <div className="absolute inset-0 -z-30 pointer-events-none overflow-hidden">
          <Image
            src={backgroundImage || "/wedding-events.png"}
            alt="South Indian Temple Lake at Golden Sunset"
            fill
            sizes="100vw"
            className={`object-cover ${
              isMobile ? "object-[center_top]" : "object-center"
            } filter brightness-[0.98] contrast-[1.02]`}
            unoptimized
            priority
          />

          {/* Subtle natural readability vignette (without dark top edge) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/35 pointer-events-none" />
        </div>

        {/* Soft atmospheric cloud canopy at top of events stage */}
        <div
          className="absolute top-0 inset-x-0 h-[65px] sm:h-[80px] md:h-[95px] -z-20 pointer-events-none overflow-hidden opacity-85"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
          }}
          aria-hidden="true"
        >
          <Image
            src="/events/section-cloud-transition.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom filter brightness-[1.03]"
            unoptimized
            priority
          />
        </div>

        {/* Top Header & Desktop Horizontal Timeline Navigation */}
        <div className="relative z-30 pt-2 sm:pt-3 md:pt-2.5 pb-0 flex flex-col items-center">
          {/* Royal Cartouche Title Banner */}
          <motion.div
            style={{
              opacity: headerOpacity,
              y: headerY,
            }}
          >
            <WeddingTitleBanner title={sectionTitle} />
          </motion.div>

          {/* Desktop Horizontal Event Timeline (Strictly Hidden on Mobile) */}
          {isMounted && (
            <div className="hidden md:block w-full">
              <EventHorizontalTimeline
                events={events}
                activeIndex={activeIndex}
                onSelectEvent={handleSelectEvent}
              />
            </div>
          )}
        </div>

        {/* Mobile Vertical Navigation Rail (Reverted back to Side Rail for Mobile) */}
        {isMounted && (
          <EventMobileNavRail
            events={events}
            activeIndex={activeIndex}
            onSelectEvent={handleSelectEvent}
          />
        )}

        {/* Main Stage Presentation Area (Strictly single active presentation, zero overlap) */}
        <main className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
          <EventStage
            events={events}
            progress={sectionProgressValue}
            isMobile={isMobile}
          />
        </main>

        {/* Subtle Grounding Footer */}
        <footer className="relative z-30 pb-2 sm:pb-3 text-center pointer-events-none flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#4a3a30] font-serif font-medium">
          <span className="bg-white/45 backdrop-blur-xs px-3 py-0.5 rounded-full border border-white/40 shadow-xs">
            Scroll to explore each sacred chapter <span className="text-[#8e3622]">↓</span>
          </span>
        </footer>
      </div>
    </section>
  );
};
