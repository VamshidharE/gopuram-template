"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface PetalConfig {
  id: number;
  leftPercent: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  rotateEnd: number;
  flipDuration: number;
  petalType: "rose" | "lotus" | "marigold";
  opacity: number;
}

const PETALS_DATA: PetalConfig[] = [
  { id: 1, leftPercent: 6, size: 13, duration: 8.5, delay: 0.2, driftX: 35, rotateEnd: 320, flipDuration: 3.2, petalType: "rose", opacity: 0.88 },
  { id: 2, leftPercent: 14, size: 11, duration: 7.2, delay: 2.8, driftX: -28, rotateEnd: 260, flipDuration: 2.8, petalType: "lotus", opacity: 0.9 },
  { id: 3, leftPercent: 22, size: 15, duration: 9.8, delay: 1.1, driftX: 42, rotateEnd: 410, flipDuration: 4.1, petalType: "rose", opacity: 0.86 },
  { id: 4, leftPercent: 29, size: 10, duration: 6.8, delay: 4.2, driftX: -32, rotateEnd: 190, flipDuration: 3.0, petalType: "marigold", opacity: 0.82 },
  { id: 5, leftPercent: 37, size: 14, duration: 8.9, delay: 0.6, driftX: 30, rotateEnd: 350, flipDuration: 3.7, petalType: "rose", opacity: 0.92 },
  { id: 6, leftPercent: 45, size: 12, duration: 7.6, delay: 3.5, driftX: -36, rotateEnd: 280, flipDuration: 3.1, petalType: "lotus", opacity: 0.88 },
  { id: 7, leftPercent: 53, size: 16, duration: 10.4, delay: 1.8, driftX: 34, rotateEnd: 440, flipDuration: 4.3, petalType: "rose", opacity: 0.9 },
  { id: 8, leftPercent: 61, size: 10, duration: 7.0, delay: 4.9, driftX: -22, rotateEnd: 210, flipDuration: 2.7, petalType: "marigold", opacity: 0.84 },
  { id: 9, leftPercent: 69, size: 15, duration: 9.2, delay: 2.1, driftX: 40, rotateEnd: 380, flipDuration: 3.9, petalType: "rose", opacity: 0.88 },
  { id: 10, leftPercent: 77, size: 12, duration: 8.1, delay: 0.9, driftX: -34, rotateEnd: 310, flipDuration: 3.3, petalType: "lotus", opacity: 0.86 },
  { id: 11, leftPercent: 85, size: 15, duration: 10.0, delay: 3.2, driftX: 28, rotateEnd: 420, flipDuration: 4.0, petalType: "rose", opacity: 0.9 },
  { id: 12, leftPercent: 93, size: 11, duration: 7.4, delay: 1.5, driftX: -30, rotateEnd: 240, flipDuration: 2.9, petalType: "lotus", opacity: 0.87 },
  { id: 13, leftPercent: 18, size: 13, duration: 8.7, delay: 5.4, driftX: 32, rotateEnd: 360, flipDuration: 3.6, petalType: "rose", opacity: 0.88 },
  { id: 14, leftPercent: 33, size: 9, duration: 6.5, delay: 6.1, driftX: -24, rotateEnd: 180, flipDuration: 2.6, petalType: "marigold", opacity: 0.82 },
  { id: 15, leftPercent: 49, size: 14, duration: 9.5, delay: 4.7, driftX: 36, rotateEnd: 390, flipDuration: 3.8, petalType: "rose", opacity: 0.9 },
  { id: 16, leftPercent: 65, size: 12, duration: 8.3, delay: 6.8, driftX: -32, rotateEnd: 290, flipDuration: 3.4, petalType: "lotus", opacity: 0.89 },
  { id: 17, leftPercent: 81, size: 10, duration: 7.8, delay: 5.9, driftX: 28, rotateEnd: 330, flipDuration: 3.0, petalType: "marigold", opacity: 0.85 },
  { id: 18, leftPercent: 89, size: 14, duration: 9.0, delay: 7.3, driftX: -26, rotateEnd: 370, flipDuration: 3.7, petalType: "rose", opacity: 0.91 },
];

export const FallingPetals: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-25"
    >
      {/* SVG Filters & Gradients definitions */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          {/* Rose Petal Gradient */}
          <radialGradient id="roseGrad" cx="30%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fecdd3" />
            <stop offset="45%" stopColor="#fb7185" />
            <stop offset="85%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9f1239" />
          </radialGradient>

          {/* Lotus Petal Gradient */}
          <linearGradient id="lotusGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff1f2" />
            <stop offset="40%" stopColor="#fda4af" />
            <stop offset="80%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          {/* Marigold Petal Gradient */}
          <radialGradient id="marigoldGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
        </defs>
      </svg>

      {/* Falling Flower Petals */}
      {PETALS_DATA.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: -40,
            x: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.driftX, -p.driftX * 0.7, p.driftX * 0.5, 0],
            opacity: [0, p.opacity, p.opacity, p.opacity * 0.8, 0],
            rotate: [0, p.rotateEnd * 0.4, p.rotateEnd * 0.7, p.rotateEnd],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${p.leftPercent}%`,
            top: 0,
            width: p.size,
            height: p.size * 1.3,
            willChange: "transform, opacity",
          }}
        >
          {/* Subtle 3D tumbling flip effect */}
          <motion.div
            animate={{
              scaleX: [1, 0.4, 1, 0.5, 1],
              scaleY: [1, 0.85, 1, 0.9, 1],
            }}
            transition={{
              duration: p.flipDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full filter drop-shadow-[0_4px_10px_rgba(180,30,50,0.35)]"
          >
            {p.petalType === "rose" && (
              <svg viewBox="0 0 30 36" className="w-full h-full" fill="none">
                <path
                  d="M15 2 C8 3, 2 11, 3 20 C4 28, 11 34, 15 35 C19 34, 26 28, 27 20 C28 11, 22 3, 15 2 Z"
                  fill="url(#roseGrad)"
                />
                <path
                  d="M15 5 C13 12, 13 24, 15 32"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {p.petalType === "lotus" && (
              <svg viewBox="0 0 30 36" className="w-full h-full" fill="none">
                <path
                  d="M15 1 C9 8, 3 16, 5 24 C7 31, 12 34, 15 35 C18 34, 23 31, 25 24 C27 16, 21 8, 15 1 Z"
                  fill="url(#lotusGrad)"
                />
                <circle cx="15" cy="30" r="2" fill="#fef08a" opacity="0.6" />
              </svg>
            )}

            {p.petalType === "marigold" && (
              <svg viewBox="0 0 24 30" className="w-full h-full" fill="none">
                <path
                  d="M12 2 C7 4, 3 10, 4 17 C5 24, 9 28, 12 29 C15 28, 19 24, 20 17 C21 10, 17 4, 12 2 Z"
                  fill="url(#marigoldGrad)"
                />
              </svg>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
