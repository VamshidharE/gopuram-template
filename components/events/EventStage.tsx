"use client";

import React from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import { WeddingEvent } from "@/config/eventsConfig";
import { EventIllustration } from "./EventIllustration";
import { EventDetails } from "./EventDetails";

interface EventStageProps {
  events: WeddingEvent[];
  progress: MotionValue<number>;
  isMobile: boolean;
}

interface SingleEventSlideProps {
  event: WeddingEvent;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isMobile: boolean;
}

const SingleEventSlide: React.FC<SingleEventSlideProps> = ({
  event,
  index,
  total,
  progress,
  isMobile,
}) => {
  // If only 1 event, remain fully visible and static throughout
  if (total <= 1) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-5 md:p-6">
        <div
          className={`w-full max-w-6xl mx-auto flex items-center ${
            isMobile
              ? "flex-col justify-center items-center gap-1 sm:gap-2 pl-14 sm:pl-16 pr-2 -mt-4 sm:-mt-6"
              : "flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16 px-6"
          }`}
        >
          <div className={`${isMobile ? "w-48 h-48 sm:w-56 sm:h-56 -mb-2" : "w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] xl:w-[400px] xl:h-[400px] max-h-[calc(100vh-200px)] max-w-[calc(100vh-200px)]"} shrink-0 flex items-center justify-center`}>
            <EventIllustration event={event} priority className="w-full h-full" />
          </div>
          <div className="flex-1 w-full max-w-[340px] md:max-w-[360px] lg:max-w-[390px] xl:max-w-[410px] flex justify-center items-center">
            <EventDetails event={event} eventIndex={index} totalEvents={total} />
          </div>
        </div>
      </div>
    );
  }

  const step = 1 / total;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // -------------------------------------------------------------------------
  // STRICTLY MUTUALLY DISJOINT LIFECYCLE WINDOWS (GUARANTEED ZERO OVERLAP)
  // -------------------------------------------------------------------------
  const baseStart = index * step;

  // 1. Entrance Window: [tEnter, enterComplete] (Snappy, seamless entrance)
  const tEnter = isFirst ? 0 : baseStart;
  const enterMid = isFirst ? 0 : baseStart + 0.06 * step;
  const enterComplete = isFirst ? 0 : baseStart + 0.18 * step;

  // 2. Stable Active Window: [enterComplete, holdEnd] (Comfortable reading window)
  const holdEnd = isLast ? 1.0 : baseStart + 0.70 * step;

  // 3. Exit Window: [holdEnd, tExit] (Completes before next event begins)
  const detailsGone = isLast ? 1.0 : baseStart + 0.92 * step;
  const tExit = isLast ? 1.0 : baseStart + 0.98 * step;

  // ----------------------------------------------------
  // 1. OVERALL SLIDE OPACITY & VISIBILITY (DISJOINT GAPS)
  // ----------------------------------------------------
  const slideVisibility = useTransform(progress, (p) => {
    if (p < tEnter || p > tExit) return "hidden";
    return "visible";
  });

  const pointerEvents = useTransform(progress, (p) => {
    if (p >= enterComplete && p <= holdEnd) return "auto";
    return "none";
  });

  // ----------------------------------------------------
  // 2. ILLUSTRATION TRANSFORMS
  // ----------------------------------------------------
  const illX = useTransform(
    progress,
    isFirst
      ? [0, enterComplete, holdEnd, tExit]
      : [tEnter, enterComplete, holdEnd, tExit],
    isFirst
      ? [0, 0, 0, isMobile ? -30 : -80]
      : [isMobile ? -30 : -80, 0, 0, isMobile ? -30 : -80]
  );

  const illScale = useTransform(
    progress,
    isFirst
      ? [0, enterComplete, holdEnd, tExit]
      : [tEnter, enterComplete, holdEnd, tExit],
    isFirst
      ? [1, 1, 1, 0.92]
      : [0.92, 1, 1, 0.92]
  );

  const illOpacity = useTransform(
    progress,
    isFirst
      ? [0, enterComplete, holdEnd, tExit]
      : [tEnter, enterComplete, holdEnd, tExit],
    isFirst
      ? [1, 1, 1, 0]
      : [0, 1, 1, 0]
  );

  // ----------------------------------------------------
  // 3. DETAILS PANEL TRANSFORMS
  // ----------------------------------------------------
  const detX = useTransform(
    progress,
    isFirst
      ? [0, enterComplete, holdEnd, detailsGone]
      : [enterMid, enterComplete, holdEnd, detailsGone],
    isFirst
      ? [0, 0, 0, isMobile ? 25 : 60]
      : [isMobile ? 30 : 70, 0, 0, isMobile ? 25 : 60]
  );

  const detOpacity = useTransform(
    progress,
    isFirst
      ? [0, enterComplete, holdEnd, detailsGone]
      : [enterMid, enterComplete, holdEnd, detailsGone],
    isFirst
      ? [1, 1, 1, 0]
      : [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        visibility: slideVisibility,
        pointerEvents,
      }}
      className="absolute inset-0 flex items-center justify-center p-2 sm:p-5 md:p-6"
    >
      <div
        className={`w-full max-w-6xl mx-auto flex items-center ${
          isMobile
            ? "flex-col justify-center items-center gap-1 sm:gap-1.5 pl-14 sm:pl-16 pr-2 -mt-4 sm:-mt-6 pb-1"
            : "flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16 px-6"
        }`}
      >
        {/* Transparent Event Illustration (Moved UP and Increased Size More) */}
        <motion.div
          style={{
            x: illX,
            scale: illScale,
            opacity: illOpacity,
          }}
          className={`shrink-0 will-change-transform z-20 flex items-center justify-center ${
            isMobile
              ? "w-48 h-48 sm:w-56 sm:h-56 -mb-2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
              : "w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] xl:w-[400px] xl:h-[400px] max-h-[calc(100vh-200px)] max-w-[calc(100vh-200px)] drop-shadow-[0_16px_32px_rgba(0,0,0,0.30)]"
          }`}
        >
          <EventIllustration
            event={event}
            priority={index <= 1}
            className="w-full h-full"
          />
        </motion.div>

        {/* Layered Ivory Event Information Panel */}
        <motion.div
          style={{
            x: detX,
            opacity: detOpacity,
          }}
          className="flex-1 will-change-transform z-10 w-full max-w-[340px] md:max-w-[360px] lg:max-w-[390px] xl:max-w-[410px] flex justify-center items-center"
        >
          <EventDetails
            event={event}
            eventIndex={index}
            totalEvents={total}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const EventStage: React.FC<EventStageProps> = ({
  events,
  progress,
  isMobile,
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {events.map((event, index) => (
        <SingleEventSlide
          key={event.id}
          event={event}
          index={index}
          total={events.length}
          progress={progress}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};
