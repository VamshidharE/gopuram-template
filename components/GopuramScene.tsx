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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

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

    return () => window.removeEventListener("resize", checkMobile);
  }, [progressMotionValue]);

  // Animation values from config
  const { animation, layout, assets } = invitationConfig;
  const travelDistance = isMobile
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

  // Layer 2: Gopuram Travel (moves upward with couple reveal, then STOPS when fully revealed)
  const gopuramY = useTransform(
    progressMotionValue,
    [0, animation.coupleRevealComplete, 1],
    [0, -actualTravel, -actualTravel]
  );

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

  // Cloud horizon fade-in as couple emerges (fully present from 65% onwards)
  const cloudOpacity = useTransform(
    progressMotionValue,
    [animation.coupleRevealStart + 0.15, animation.coupleRevealComplete],
    [0, 1]
  );
  const cloudY = useTransform(
    progressMotionValue,
    [animation.coupleRevealStart + 0.15, animation.coupleRevealComplete, 1],
    [15, 0, 0]
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
            top: isMobile
              ? `${layout.mobile.gopuramInitialTopVh}vh`
              : `${layout.desktop.gopuramInitialTopVh}vh`,
            y: gopuramY,
          }}
          className="absolute inset-x-0 z-20 flex justify-center pointer-events-none"
        >
          <div
            className="relative aspect-[1/3] transition-all duration-300 drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
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

        {/* ========================================================= */}
        {/* LAYER 6: SOFT GOLDEN SUNSET CLOUD HORIZON AT BASE         */}
        {/* ========================================================= */}
        <motion.div
          style={{
            opacity: cloudOpacity,
            y: cloudY,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 30%, black 100%)",
          }}
          className="absolute bottom-0 inset-x-0 h-[80px] sm:h-[95px] md:h-[115px] z-28 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <Image
            src="/events/section-cloud-transition.png"
            alt="Soft sunset cloud horizon"
            fill
            sizes="100vw"
            className="object-cover object-bottom filter brightness-[1.03] contrast-[1.02]"
            unoptimized
            priority
          />
          {/* Subtle warm golden ambient glow blending upward into sky */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(234,140,40,0.18) 0%, rgba(245,180,60,0.06) 50%, transparent 100%)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};
