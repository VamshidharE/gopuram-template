"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { invitationConfig } from "@/config/invitationConfig";
import { OpeningHeader } from "./OpeningHeader";
import { CoupleCutout } from "./CoupleCutout";
import { ScrollIndicator } from "./ScrollIndicator";
import { ProgressHud } from "./ProgressHud";
import { AmbientAudio } from "./AmbientAudio";

export const GopuramScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [viewport, setViewport] = useState<{ width: number; height: number }>({
    width: 1440,
    height: 900,
  });
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  // Framer Motion normalized scroll tracking on container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dedicated normalized gopuram progress value (0.0 to 1.0)
  const progressMotionValue = useMotionValue(0);

  // Synchronize scroll progress into our normalized progress motion value
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      progressMotionValue.set(latest);
    });
    return () => unsub();
  }, [scrollYProgress, progressMotionValue]);

  // Screen size detection & URL progress parameter handling
  useEffect(() => {
    setIsMounted(true);
    const updateViewport = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < 768);
      setViewport({ width: w, height: h });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);

    // Support ?progress=0.30 for direct verification and headless testing
    const params = new URLSearchParams(window.location.search);
    const progressParam = params.get("progress");
    if (progressParam !== null) {
      const target = parseFloat(progressParam);
      if (!isNaN(target)) {
        const clamped = Math.max(0, Math.min(1, target));
        progressMotionValue.set(clamped);
      }
    }

    return () => window.removeEventListener("resize", updateViewport);
  }, [progressMotionValue]);

  // Animation values from config + viewport-aware travel so bottom never disconnects
  const { animation, layout, assets } = invitationConfig;
  const gopuramWidthPct = isMobile
    ? (layout.mobile.gopuramWidthPercent ?? 92)
    : (layout.desktop.gopuramWidthPercent ?? 38);
  const gopuramMaxW = isMobile
    ? (layout.mobile.gopuramMaxWidthPx ?? 380)
    : (layout.desktop.gopuramMaxWidthPx ?? 480);

  const gopuramWidthPx = Math.min((viewport.width * gopuramWidthPct) / 100, gopuramMaxW);
  const gopuramHeightPx = gopuramWidthPx * 3; // aspect-[1/3]
  const gopuramInitialTopPx = isMobile
    ? viewport.height * ((layout.mobile.gopuramInitialTopVh ?? 26) / 100)
    : Math.max(215, viewport.height * 0.27);

  // Travel far enough so the gopuram stone steps and doorway are solidly grounded into the bottom cloud bed
  const targetBottomOffset = isMobile ? 36 : 60;
  const targetBottomPx = viewport.height + targetBottomOffset;
  const travelDistance = isMounted
    ? Math.max(0, gopuramInitialTopPx + gopuramHeightPx - targetBottomPx)
    : isMobile
      ? animation.gopuramTravelMobilePx
      : animation.gopuramTravelDesktopPx;

  const actualTravel = shouldReduceMotion ? travelDistance * 0.2 : travelDistance;
  const skyTravel = actualTravel * animation.skyParallaxIntensity;

  // Layer 1: Sky Parallax (moves upward synchronously, stopping when scene completes)
  const skyY = useTransform(
    progressMotionValue,
    [0, animation.coupleRevealComplete, 1],
    [0, -skyTravel, -skyTravel]
  );

  // Layer 2: Gopuram Travel (dynamic function ensures live viewport heights are always accurately applied)
  const gopuramY = useTransform(progressMotionValue, (p) => {
    const travel = shouldReduceMotion ? actualTravel * 0.2 : actualTravel;
    const progressClamped = Math.min(Math.max(p, 0), 1);
    return -progressClamped * travel;
  });

  // Layer 5: Opening Header fade & drift
  const headerOpacity = useTransform(
    progressMotionValue,
    [animation.headerFadeStart, animation.headerFadeEnd],
    [1, 0]
  );

  const headerY = useTransform(
    progressMotionValue,
    [animation.headerFadeStart, animation.headerFadeEnd],
    [0, shouldReduceMotion ? 0 : -35]
  );

  // Scroll indicator fade
  const scrollIndicatorOpacity = useTransform(
    progressMotionValue,
    [0, animation.headerFadeStart * 2],
    [1, 0]
  );

  // Programmatic scroll helper for verification & navigation
  const scrollToProgress = (targetProgress: number, smooth: boolean = true) => {
    progressMotionValue.set(targetProgress);
    if (!containerRef.current) return;
    const totalScrollableDistance =
      containerRef.current.scrollHeight - window.innerHeight;
    const targetScrollY = totalScrollableDistance * targetProgress;
    window.scrollTo({
      top: targetScrollY,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  return (
    <div
      ref={containerRef}
      style={{ height: `${animation.scrollTrackHeightVh}vh` }}
      className="relative w-full bg-[#0a0807]"
    >
      {/* Sacred ambient sound toggle */}
      <AmbientAudio />

      {/* Verification HUD */}
      {isMounted && (
        <ProgressHud
          progressValue={progressMotionValue}
          scrollToProgress={(p) => scrollToProgress(p, true)}
        />
      )}

      {/* Sticky Cinematic Viewport Stage (sticks for the entire scrollTrackHeightVh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none pointer-events-none">
        {/* ========================================================= */}
        {/* LAYER 1: SKY BACKGROUND (INDEPENDENT PARALLAX LAYER)     */}
        {/* ========================================================= */}
        <motion.div
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-[12vh] h-[135vh] w-full z-10"
        >
          <Image
            src={assets.skyBackground}
            alt="Majestic South Indian sunset sky"
            fill
            sizes="100vw"
            className="object-cover object-top filter brightness-[0.97] contrast-[1.04]"
            unoptimized
            priority
          />

          {/* Warm atmospheric depth overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 via-transparent to-black/25 opacity-70" />

          {/* Golden sunbeam radial glow behind upper tower */}
          <div
            className="absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(245,210,120,0.5) 0%, rgba(220,160,50,0.2) 45%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* ========================================================= */}
        {/* LAYER 2 & 4: TALL GOPURAM & SYNCHRONIZED COUPLE STAGE     */}
        {/* ========================================================= */}
        {/* 
            Using before gopuram image v2 (724x2172, 1:3 aspect ratio).
            The couple cutout fills the gopuram size at the base (aspect-[2/3], w-full)
            and continues all the way till the bottom of the gopuram.
        */}
        <motion.div
          style={{
            top: isMounted
              ? `${gopuramInitialTopPx}px`
              : isMobile
                ? `${layout.mobile.gopuramInitialTopVh}vh`
                : "max(215px, 27vh)",
            y: gopuramY,
          }}
          className="absolute inset-x-0 z-20 flex justify-center pointer-events-none"
        >
          <div
            className="relative aspect-[1/3] drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            style={{
              width: isMobile
                ? `${layout.mobile.gopuramWidthPercent}vw`
                : `${layout.desktop.gopuramWidthPercent}vw`,
              maxWidth: isMobile
                ? `${layout.mobile.gopuramMaxWidthPx}px`
                : `${layout.desktop.gopuramMaxWidthPx}px`,
            }}
          >
            {/* The Gopuram Image v2 (Full 1:3 height from top pinnacle to bottom doorway) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={assets.gopuramOverlay}
                alt="Tall Dravidian Temple Gopuram Tower"
                fill
                sizes="(max-width: 768px) 76vw, 440px"
                className="object-contain object-top filter contrast-[1.03] brightness-[1.01]"
                unoptimized
                priority
              />
            </div>

            {/* The Couple Cutout: Fills gopuram size, continues till bottom of gopuram */}
            <CoupleCutout
              progress={progressMotionValue}
              isMobile={isMobile}
            />
          </div>
        </motion.div>





        {/* ========================================================= */}
        {/* LAYER 5: OPENING HEADER (NAMES & INTRODUCTORY DETAILS)   */}
        {/* ========================================================= */}
        <OpeningHeader opacity={headerOpacity} y={headerY} />

        {/* Scroll down prompt */}
        <ScrollIndicator opacity={scrollIndicatorOpacity} />
      </div>

      {/* Cloud layer attached to the bottom of the Gopuram section (NOT attached to the screen) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 w-full z-30 pointer-events-none select-none overflow-hidden h-[90px] sm:h-[120px] md:h-[150px]"
      >
        <Image
          src="/decoration/couple-clouds-bed.png"
          alt="Section Bottom Cloud Transition"
          fill
          sizes="100vw"
          className="object-cover object-top"
          unoptimized
          priority
        />
      </div>
    </div>
  );
};
