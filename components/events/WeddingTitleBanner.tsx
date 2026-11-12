"use client";

import React from "react";

interface WeddingTitleBannerProps {
  title?: string;
}

export const WeddingTitleBanner: React.FC<WeddingTitleBannerProps> = ({
  title = "WEDDING CELEBRATIONS",
}) => {
  return (
    <div className="relative inline-flex flex-col items-center select-none max-w-full px-2">
      {/* Royal Temple Cartouche Title Plaque */}
      <div className="relative flex items-center justify-center">
        {/* SVG Royal Cartouche Contour & Framing */}
        <svg
          viewBox="0 0 560 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[300px] sm:w-[410px] md:w-[490px] lg:w-[540px] h-auto drop-shadow-[0_14px_30px_rgba(40,10,5,0.55)]"
        >
          <defs>
            {/* Deep Royal Temple Maroon / Terracotta Crimson Gradient (Matching Theme) */}
            <linearGradient id="themeMaroonBg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4e1008" />
              <stop offset="20%" stopColor="#731a10" />
              <stop offset="50%" stopColor="#96261a" />
              <stop offset="80%" stopColor="#731a10" />
              <stop offset="100%" stopColor="#4e1008" />
            </linearGradient>

            {/* Warm Antique Metallic Gold Outer Border */}
            <linearGradient id="antiqueGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#966d24" />
              <stop offset="15%" stopColor="#d4af37" />
              <stop offset="35%" stopColor="#fced9d" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="65%" stopColor="#fced9d" />
              <stop offset="85%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#966d24" />
            </linearGradient>

            {/* Champagne Gold Inner Hairline */}
            <linearGradient id="champagneGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff3cf" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>

            {/* Soft Warm Golden Ambient Center Glow */}
            <radialGradient id="innerAmberGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#731a10" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Main Royal Cartouche Silhouette with Concave Corner Brackets */}
          <path
            d="
              M 56 12
              L 230 12
              C 238 12, 246 6, 254 3
              C 260 1, 268 0, 280 0
              C 292 0, 300 1, 306 3
              C 314 6, 322 12, 330 12
              L 504 12
              C 518 12, 530 18, 530 34
              C 530 50, 518 56, 504 56
              L 330 56
              C 322 56, 314 62, 306 65
              C 300 67, 292 68, 280 68
              C 268 68, 260 67, 254 65
              C 246 62, 238 56, 230 56
              L 56 56
              C 42 56, 30 50, 30 34
              C 30 18, 42 12, 56 12
              Z
            "
            fill="url(#themeMaroonBg)"
            stroke="url(#antiqueGold)"
            strokeWidth="2.3"
          />

          {/* Warm Amber Center Glow */}
          <ellipse cx="280" cy="34" rx="150" ry="22" fill="url(#innerAmberGlow)" />

          {/* Inner Delicate Champagne Gold Hairline */}
          <path
            d="
              M 60 16
              L 232 16
              C 239 16, 247 10, 255 7
              C 261 5, 269 4, 280 4
              C 291 4, 299 5, 305 7
              C 313 10, 321 16, 328 16
              L 500 16
              C 512 16, 522 22, 522 34
              C 522 46, 512 52, 500 52
              L 328 52
              C 321 52, 313 58, 305 61
              C 299 63, 291 64, 280 64
              C 269 64, 261 63, 255 61
              C 247 58, 239 52, 232 52
              L 60 52
              C 48 52, 38 46, 38 34
              C 38 22, 48 16, 60 16
              Z
            "
            fill="none"
            stroke="url(#champagneGold)"
            strokeWidth="1.1"
            strokeOpacity="0.85"
          />

          {/* Top Ornate Palmette Filigree Crest */}
          <g transform="translate(280, 5) scale(0.72)" fill="#ffd700">
            <path d="M0 -6 C3 -2, 7 0, 10 3 C6 3, 3 2, 0 7 C-3 2, -6 3, -10 3 C-7 0, -3 -2, 0 -6 Z" />
            <circle cx="0" cy="-7" r="1.3" />
            <circle cx="-6" cy="-2" r="1.1" />
            <circle cx="6" cy="-2" r="1.1" />
          </g>

          {/* Bottom Ornate Pendant Drop Flourish */}
          <g transform="translate(280, 63) scale(0.62)" fill="#ffd700">
            <path d="M0 6 C2 2, 5 0, 7 -2 C4 -2, 2 -1, 0 -4 C-2 -1, -4 -2, -7 -2 C-5 0, -2 2, 0 6 Z" />
            <circle cx="0" cy="7" r="1.1" />
          </g>

          {/* Left 8-Point Rosette Star */}
          <g transform="translate(48, 34) scale(0.88)" fill="#fced9d">
            <path d="M0 -7 L1.6 -2 L6.2 -2.5 L2.7 0.8 L4.6 5 L0.4 2.8 L-3.8 5 L-1.9 0.8 L-5.4 -2.5 L-0.8 -2 Z" />
            <circle cx="0" cy="0" r="1.2" fill="#fff" />
          </g>

          {/* Right 8-Point Rosette Star */}
          <g transform="translate(512, 34) scale(0.88)" fill="#fced9d">
            <path d="M0 -7 L1.6 -2 L6.2 -2.5 L2.7 0.8 L4.6 5 L0.4 2.8 L-3.8 5 L-1.9 0.8 L-5.4 -2.5 L-0.8 -2 Z" />
            <circle cx="0" cy="0" r="1.2" fill="#fff" />
          </g>
        </svg>

        {/* Scaled Crisp Typography Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 sm:px-14">
          <div className="flex items-center justify-center gap-2 sm:gap-3.5">
            <span className="text-[#ffd700] text-xs sm:text-sm font-serif select-none drop-shadow-sm">
              ❖
            </span>
            <h2 className="font-cinzel text-xs sm:text-sm md:text-base lg:text-[19px] font-extrabold tracking-[0.2em] sm:tracking-[0.25em] text-[#fffdf7] uppercase whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {title}
            </h2>
            <span className="text-[#ffd700] text-xs sm:text-sm font-serif select-none drop-shadow-sm">
              ❖
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
