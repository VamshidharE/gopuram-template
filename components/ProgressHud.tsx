"use client";

import React, { useState, useEffect } from "react";
import { MotionValue } from "framer-motion";
import { invitationConfig } from "@/config/invitationConfig";

interface ProgressHudProps {
  progressValue: MotionValue<number>;
  scrollToProgress: (targetProgress: number) => void;
}

export const ProgressHud: React.FC<ProgressHudProps> = ({
  progressValue,
  scrollToProgress,
}) => {
  const [progress, setProgress] = useState(() => progressValue.get() || 0);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setProgress(progressValue.get() || 0);
    const unsubscribe = progressValue.on("change", (latest) => {
      setProgress(latest);
    });
    return () => unsubscribe();
  }, [progressValue]);

  if (!invitationConfig.dev.showProgressHud) return null;

  const checkpoints = [
    { label: "0%", val: 0.0, desc: "Opening Scene" },
    { label: "12%", val: 0.12, desc: "Head Reveal Starts" },
    { label: "30%", val: 0.30, desc: "Mid Reveal" },
    { label: "50%", val: 0.50, desc: "Upper Body" },
    { label: "65%", val: 0.65, desc: "Fully Revealed" },
    { label: "100%", val: 1.0, desc: "Wedding Events Transition" },
  ];

  const { coupleRevealStart, coupleRevealComplete } = invitationConfig.animation;
  const revealProgress =
    progress < coupleRevealStart
      ? 0
      : progress >= coupleRevealComplete
      ? 100
      : Math.round(
          ((progress - coupleRevealStart) /
            (coupleRevealComplete - coupleRevealStart)) *
            100
        );

  const statusLabel =
    progress < coupleRevealStart
      ? "Concealed (0%)"
      : progress >= coupleRevealComplete
      ? "Fully Visible (100%)"
      : `${revealProgress}% (Physical Rise)`;

  return (
    <aside
      aria-label="Animation Inspection Controller"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 font-mono text-xs select-none"
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="px-3 py-1.5 rounded-lg bg-black/85 border border-[#d4af37]/60 text-[#f5ecd4] shadow-2xl backdrop-blur-md hover:bg-[#d4af37]/20 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold">
          Gopuram: {(progress * 100).toFixed(1)}%
        </span>
        <span className="text-[10px] text-[#edd99e] opacity-75">
          {collapsed ? "▲ Expand" : "▼ Hide"}
        </span>
      </button>

      {/* Expanded control panel */}
      {!collapsed && (
        <div className="w-80 p-3.5 rounded-xl bg-black/90 border border-[#d4af37]/50 text-[#edd99e] shadow-2xl backdrop-blur-md flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
            <span className="font-bold text-[#fff2cc] tracking-wide text-xs">
              Physical Reveal Inspector
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
              Live Link
            </span>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/5 p-2 rounded">
            <div>
              <span className="text-gray-400 block text-[9px]">GOPURAM PROGRESS</span>
              <span className="font-bold text-white">{(progress * 100).toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[9px]">PHYSICAL REVEAL</span>
              <span
                className={`font-bold ${
                  revealProgress === 100
                    ? "text-emerald-400"
                    : revealProgress > 0
                    ? "text-amber-400"
                    : "text-gray-500"
                }`}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          {/* Quick jump checkpoint buttons */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">
              Verification Checkpoints:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {checkpoints.map((cp) => (
                <button
                  key={cp.label}
                  onClick={() => scrollToProgress(cp.val)}
                  title={cp.desc}
                  className={`px-1.5 py-1.5 rounded text-[10px] font-semibold border transition-all cursor-pointer ${
                    Math.abs(progress - cp.val) < 0.02
                      ? "bg-[#d4af37] text-black border-[#ffd978] shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                      : "bg-white/5 border-white/15 text-gray-300 hover:bg-white/15 hover:border-[#d4af37]/50"
                  }`}
                >
                  <div>{cp.label}</div>
                  <div className="text-[7.5px] opacity-75 font-normal truncate">
                    {cp.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-gray-400 pt-1 border-t border-white/10 italic">
            * Couple cutout matches gopuram size and reveals right after 10% scroll.
          </div>
        </div>
      )}
    </aside>
  );
};
