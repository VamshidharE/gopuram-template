"use client";

import React from "react";
import Image from "next/image";

/**
 * TempleArchitecturalFrame
 *
 * Implements a continuous, stationary South Indian temple architectural frame:
 * 1. Left Pillar:
 *    - Top Capital (left-pillar-capital.png)
 *    - Repeating Shaft (pillar-segment-shaft.png) seamlessly tiled with background-repeat: repeat-y
 *    - Bottom Pedestal (left-pillar-base.png)
 * 2. Right Pillar:
 *    - Top Capital (right-pillar-capital.png)
 *    - Repeating Shaft (pillar-segment-shaft-r.png) seamlessly tiled with background-repeat: repeat-y
 *    - Bottom Pedestal (right-pillar-base.png)
 * 3. Top Corner Hanging Decoration:
 *    - Left: Mango leaves, flower malas, hanging diya (top-decoration-left.png)
 *    - Right: Symmetrical counterpart (top-decoration-right.png)
 *
 * All decorative elements are fixed relative to the viewport, stationary during scrolling,
 * and marked with pointer-events-none to prevent blocking interactive controls.
 */
export const TempleArchitecturalFrame: React.FC = () => {
  return (
    <aside
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-35 overflow-hidden"
    >
      {/* ========================================================= */}
      {/* 1. LEFT SIDE TEMPLE PILLAR                                */}
      {/* ========================================================= */}
      <div className="absolute top-0 bottom-0 left-0 w-[18px] sm:w-[26px] md:w-[110px] lg:w-[136px] xl:w-[150px] flex flex-col items-start z-35">
        {/* Top Capital Bracket */}
        <div className="relative w-full aspect-[168/153] shrink-0">
          <Image
            src="/decoration/left-pillar-capital.png"
            alt=""
            fill
            sizes="(max-width: 768px) 26px, 150px"
            className="object-contain object-left-top"
            priority
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
            sizes="(max-width: 768px) 26px, 150px"
            className="object-contain object-left-bottom"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. RIGHT SIDE TEMPLE PILLAR                               */}
      {/* ========================================================= */}
      <div className="absolute top-0 bottom-0 right-0 w-[18px] sm:w-[26px] md:w-[110px] lg:w-[136px] xl:w-[150px] flex flex-col items-end z-35">
        {/* Top Capital Bracket */}
        <div className="relative w-full aspect-[168/153] shrink-0">
          <Image
            src="/decoration/right-pillar-capital.png"
            alt=""
            fill
            sizes="(max-width: 768px) 26px, 150px"
            className="object-contain object-right-top"
            priority
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
            sizes="(max-width: 768px) 26px, 150px"
            className="object-contain object-right-bottom"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. TOP CORNER HANGING DECORATIONS (DIYAS, FLOWERS, LEAVES)*/}
      {/* ========================================================= */}
      <div className="absolute top-0 inset-x-0 flex justify-between pointer-events-none z-40">
        {/* Top-Left Hanging Toranam & Diya */}
        <div className="relative w-[85px] sm:w-[125px] md:w-[320px] lg:w-[380px] xl:w-[420px] aspect-[607/873] shrink-0">
          <Image
            src="/decoration/top-decoration-left.png"
            alt=""
            fill
            sizes="(max-width: 768px) 125px, 420px"
            className="object-contain object-left-top filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            priority
            unoptimized
          />
        </div>

        {/* Top-Right Hanging Toranam & Diya */}
        <div className="relative w-[85px] sm:w-[125px] md:w-[320px] lg:w-[380px] xl:w-[420px] aspect-[607/873] shrink-0">
          <Image
            src="/decoration/top-decoration-right.png"
            alt=""
            fill
            sizes="(max-width: 768px) 125px, 420px"
            className="object-contain object-right-top filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            priority
            unoptimized
          />
        </div>
      </div>
    </aside>
  );
};
