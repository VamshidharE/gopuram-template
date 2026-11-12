"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const startTanpuraSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2.5);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Authentic Pa - Sa - Sa - Sa tanpura harmonic frequencies (C# / Panchama drone ~ 138.59 Hz)
      const freqs = [
        138.59, // Sa (Root)
        207.65, // Pa (Fifth)
        277.18, // High Sa
        278.20, // Gentle microtonal shimmer beat
      ];

      oscillatorsRef.current = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.3, ctx.currentTime);

        osc.connect(subGain);
        subGain.connect(masterGain);
        osc.start();
        return osc;
      });

      setIsPlaying(true);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const stopSound = () => {
    if (audioCtxRef.current && masterGainRef.current) {
      masterGainRef.current.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtxRef.current.currentTime + 1.2
      );
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
          } catch {}
        });
        audioCtxRef.current?.close();
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 1300);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startTanpuraSound();
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {}
      });
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      title={isPlaying ? "Mute sacred ambient drone" : "Play sacred ambient drone"}
      className="fixed top-5 right-5 z-40 p-2.5 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#f5ecd4] shadow-xl backdrop-blur-md hover:bg-[#d4af37]/20 transition-all flex items-center justify-center cursor-pointer group"
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-[#e8c766] group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-4 h-4 text-[#baa882] group-hover:scale-110 transition-transform" />
      )}
      <span className="sr-only">Toggle Ambient Sound</span>
    </button>
  );
};
