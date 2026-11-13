"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

/**
 * Hanging Brass Temple Bell Component
 * Gently sways with traditional temple acoustics visual feel
 */
const HangingTempleBell: React.FC<{ side: "left" | "right"; chainHeight?: number }> = ({
  side,
}) => {
  return (
    <motion.div
      animate={{ rotate: side === "left" ? [-2.5, 2.5, -2.5] : [2.5, -2.5, 2.5] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute top-0 pointer-events-none select-none z-20 flex flex-col items-center ${
        side === "left" ? "left-4 sm:left-10 lg:left-16" : "right-4 sm:right-10 lg:right-16"
      }`}
      style={{ transformOrigin: "top center" }}
    >
      <div className="relative w-10 sm:w-14 md:w-16 h-28 sm:h-36 md:h-44">
        <Image
          src="/events/hanging-temple-bell.png"
          alt="Traditional Brass Temple Bell"
          fill
          className="object-contain filter drop-shadow-[0_6px_14px_rgba(80,40,15,0.35)]"
          priority
          unoptimized
        />
      </div>
    </motion.div>
  );
};

export const PreWeddingVideo: React.FC = () => {
  const { video } = weddingConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pre-wedding-video"
      aria-label="Pre-Wedding Film"
      className="relative w-full overflow-hidden pt-8 pb-3 sm:pt-10 sm:pb-4 md:pt-12 md:pb-6 bg-transparent text-[#42100b] select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
       * BACKGROUND DECORATIVE ARTWORK (Kolam & Sacred Lotus Embellishments)
       * ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Sacred Lotus Mandala Kolam on Left */}
        <div className="absolute -top-10 -left-10 w-48 sm:w-64 h-48 sm:h-64 opacity-[0.18]">
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt=""
            fill
            className="object-contain filter sepia"
            unoptimized
          />
        </div>

        {/* Sacred Lotus Mandala Kolam on Right */}
        <div className="absolute -top-10 -right-10 w-48 sm:w-64 h-48 sm:h-64 opacity-[0.18]">
          <Image
            src="/decoration/Lotus-Mandala.png"
            alt=""
            fill
            className="object-contain filter sepia"
            unoptimized
          />
        </div>

        {/* Blooming Pink & Gold Lotus Accent */}
        <div className="absolute bottom-6 left-2 sm:left-6 w-20 sm:w-28 h-20 sm:h-28 opacity-[0.22]">
          <Image
            src="/events/lotus-corner.png"
            alt=""
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Swaying Traditional Brass Temple Bells (Image 1 Signature) */}
      <HangingTempleBell side="left" />
      <HangingTempleBell side="right" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─────────────────────────────────────────────────────────────
         * 1. SECTION HEADING (Attractive Architectural Royal Plaque)
         * ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 flex flex-col items-center"
        >
          {/* Auspicious Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fbf2e3] border border-[#d4af37]/70 shadow-2xs mb-2.5">
            <span className="text-[#b88636] text-[10px]">✦</span>
            <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.22em] text-[#742719] uppercase">
              Cinematic Glimpse
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
              {video.heading || "A Glimpse of Our Journey"}
            </h2>

            {/* Right Gold Wing Flourish */}
            <span className="hidden sm:inline-block w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent ml-3" />
          </div>

          {/* Subtitle in Distinct Italic Serif */}
          <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-[#6e3a1f] font-bold tracking-wide mt-3 max-w-xl">
            &ldquo;{video.subheading || "Moments that made our story special"}&rdquo;
          </p>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
         * 2. VIDEO PLAYER WITH ORNATE GOLD-CARVED CARTOUCHE FRAME (Enlarged)
         * ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full max-w-5xl lg:max-w-5xl xl:max-w-6xl mx-auto">
          
          {/* Subtle Golden Carved Cartouche Halo Backdrop */}
          <div
            className="absolute -inset-2.5 sm:-inset-4 rounded-3xl sm:rounded-[2rem] pointer-events-none -z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,225,130,0.4) 0%, rgba(212,175,55,0.15) 60%, transparent 80%)",
            }}
          />

          {/* Main Video Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-[#ffd700] via-[#c99f58] to-[#8a5822] shadow-[0_16px_48px_rgba(80,45,20,0.22)]"
          >
            {/* Corner Decorative Finials */}
            <div className="absolute top-2 left-2 z-20 w-3 h-3 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700]" />
            <div className="absolute top-2 right-2 z-20 w-3 h-3 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700]" />
            <div className="absolute bottom-2 left-2 z-20 w-3 h-3 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700]" />
            <div className="absolute bottom-2 right-2 z-20 w-3 h-3 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700]" />

            {/* Video Container */}
            <div
              className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black cursor-pointer group"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src={video.videoSrc}
                poster={video.posterSrc}
                playsInline
                loop
                preload="metadata"
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Big Center Golden Play Button */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-2xs transition-opacity duration-300">
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.6)]"
                    style={{
                      background: "linear-gradient(135deg, #ffd700 0%, #b88636 50%, #7a482b 100%)",
                    }}
                  >
                    <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-[#3d1308] border border-[#ffd700] flex items-center justify-center text-[#ffd700] pl-1">
                      <Play size={24} className="sm:w-7 sm:h-7 fill-[#ffd700]" />
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Bottom Subtle Overlay Controls */}
              {hasStarted && (
                <div
                  className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button
                      type="button"
                      onClick={handleFullscreen}
                      aria-label="Fullscreen video"
                      className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

        </div>

        {/* Auspicious Lotus Center Motif Divider */}
        <div className="flex items-center justify-center mt-4 sm:mt-6 select-none pointer-events-none">
          <div className="relative w-20 sm:w-24 h-8 sm:h-9">
            <Image
              src="/decoration/Lotus-Mandala.png"
              alt="Lotus Motif"
              fill
              className="object-contain drop-shadow-[0_4px_10px_rgba(180,120,30,0.3)]"
              unoptimized
            />
          </div>
        </div>

      </div>
    </section>
  );
};
