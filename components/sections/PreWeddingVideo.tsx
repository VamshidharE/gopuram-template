"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

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
      className="relative w-full overflow-hidden py-14 sm:py-18 md:py-24 bg-transparent"
    >
      {/* 
        1. FLOATING SECTION HEADING (No generic white box)
        "A GLIMPSE OF US"
        "Our story, captured in beautiful moments."
      */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12 px-4 relative z-30 flex flex-col items-center"
      >
        {/* Subtle gold crest */}
        <div className="flex items-center justify-center gap-2 mb-2 select-none">
          <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#b88636]" />
          <span className="text-[#b88636] text-xs">❦</span>
          <span className="font-cinzel text-[10.5px] sm:text-xs font-bold tracking-[0.26em] text-[#805527] uppercase">
            A CINEMATIC MEMORY
          </span>
          <span className="text-[#b88636] text-xs">❦</span>
          <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#b88636]" />
        </div>

        <h2 className="font-cinzel text-xl sm:text-3xl md:text-5xl font-extrabold tracking-wide sm:tracking-[0.16em] text-[#42100b] uppercase leading-tight px-2">
          {video.heading || "A GLIMPSE OF US"}
        </h2>

        <p className="font-cormorant text-base sm:text-lg md:text-xl italic text-[#744c2c] font-semibold mt-1.5">
          {video.subheading || "Our story, captured in beautiful moments."}
        </p>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#b88636] to-transparent mt-2.5" />
      </motion.div>

      {/* 
        2. CINEMATIC 16:9 VIDEO CONTAINER WITH GOLD-EDGED TREATMENT
      */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 md:px-8 z-20">
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(80,45,20,0.25)] border-2 border-[#b88636]/80 bg-[#16100c] group cursor-pointer"
          onClick={togglePlay}
        >
          {/* Thin inner gold rim */}
          <div className="absolute inset-1 rounded-xl sm:rounded-2xl border border-[#ffd700]/30 pointer-events-none z-20" />

          {/* 16:9 Aspect Ratio Frame */}
          <div className="relative aspect-[16/9] w-full bg-[#0d0a07]">
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src={video.videoSrc}
              poster={video.posterSrc}
              playsInline
              preload="metadata"
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Poster fallback image if video hasn't started */}
            {!hasStarted && (
              <div className="absolute inset-0 z-10">
                <Image
                  src={video.posterSrc}
                  alt="Pre-wedding video thumbnail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover filter brightness-[0.88] contrast-[1.02]"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
              </div>
            )}

            {/* Custom Play Button Overlay (when paused or unstarted) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-25 pointer-events-none">
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#fff7e6]/90 to-[#edd6a4]/90 backdrop-blur-md flex items-center justify-center border-2 border-[#d4af37] shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                >
                  {/* Subtle pulsing gold ring */}
                  <div className="absolute inset-[-6px] rounded-full border border-[#d4af37]/60 animate-ping opacity-60 pointer-events-none" />
                  <Play size={28} className="text-[#63140d] fill-[#63140d] ml-1 sm:ml-1.5" />
                </motion.div>
              </div>
            )}

            {/* Accessible Video Control Bar (Visible when video has started or on hover) */}
            {hasStarted && (
              <div
                className={`absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-black/85 via-black/50 to-transparent flex items-center justify-between px-4 sm:px-6 text-white text-xs z-30 transition-opacity duration-300 ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Play/Pause Toggle */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="p-1.5 rounded-full hover:bg-white/20 text-[#ffd700] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-[#ffd700]" />}
                </button>

                {/* Center Title */}
                <span className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-widest text-[#fffdf8] uppercase select-none">
                  A GLIMPSE OF US • PRE-WEDDING FILM
                </span>

                {/* Right controls: Mute + Fullscreen */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    className="p-1.5 rounded-full hover:bg-white/20 text-[#ffd700] transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    aria-label="Enter fullscreen"
                    className="p-1.5 rounded-full hover:bg-white/20 text-[#ffd700] transition-colors cursor-pointer"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
