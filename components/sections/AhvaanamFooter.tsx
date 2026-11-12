"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { weddingConfig } from "@/config/weddingConfig";

/**
 * Ahvaanam Brand Signature Footer
 *
 * Rich, sophisticated, self-highlighted brand signature.
 * Desktop:
 * - Left: Location & Contact information (high contrast, highlighted)
 * - Middle: AHVAANAM wordmark, divider, tagline & services sub-text (no heart symbols)
 * - Right: 5-Star interactive rating
 * Mobile:
 * - Vertically stacked with Ahvaanam at the top, contact in the middle, rating at bottom.
 */
export const AhvaanamFooter: React.FC = () => {
  const { footer } = weddingConfig;
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState<boolean>(false);

  return (
    <footer
      id="brand-footer"
      aria-label="Ahvaanam Brand Signature Footer"
      className="relative w-full overflow-hidden py-5 sm:py-6 md:py-7 text-[#3b0908] border-t-2 border-[#b88636]/40 bg-gradient-to-b from-transparent via-[#faedd4]/30 to-[#f3dec0]/40 select-none shadow-[0_-4px_20px_rgba(80,45,20,0.04)]"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-3 sm:gap-4 lg:gap-6">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN (Desktop): LOCATION & CONTACT INFORMATION        */}
          {/* ============================================================ */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-[#3d0706] font-serif font-semibold [text-shadow:_0_1px_8px_rgba(255,248,225,0.95)]">
              <span className="text-[#c2410c] text-sm select-none shrink-0 drop-shadow-xs">📍</span>
              <span>{footer.address || "Tirumala Printers, Metpally, Dist. Jagtial, Telangana"}</span>
            </div>
            <a
              href={`tel:${(footer.phone || "+918688178323").replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-[#8e2214] hover:text-[#5a1208] font-serif font-bold transition-colors mt-1 [text-shadow:_0_1px_8px_rgba(255,248,225,0.95)]"
            >
              <span className="text-[#a21caf] text-sm select-none shrink-0 drop-shadow-xs">📞</span>
              <span>{footer.phone || "+91 8688178323"}</span>
            </a>
          </div>

          {/* ============================================================ */}
          {/* MIDDLE COLUMN: AHVAANAM BRAND & SUB-TEXT (NO HEART SYMBOLS)  */}
          {/* ============================================================ */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center text-center order-1 lg:order-2">
            {/* Top Single Gold Diamond - No heart symbols */}
            <div className="flex items-center justify-center mb-0.5 select-none">
              <span className="text-[#b88636] text-[11px] drop-shadow-[0_0_6px_rgba(255,215,100,0.8)]">✦</span>
            </div>

            {/* Prominent Self-Highlighted Brand Wordmark */}
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-[26px] font-black tracking-[0.28em] text-[#3d0706] uppercase leading-none [text-shadow:_0_1px_12px_rgba(255,245,215,1),_0_2px_22px_rgba(220,165,60,0.35)] drop-shadow-xs">
              AHVAANAM
            </h2>

            {/* Slender Gold Ornamental Divider */}
            <div className="flex items-center justify-center gap-2 my-1.5 w-32 sm:w-44 select-none opacity-85">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#b88636]" />
              <span className="text-[#b88636] text-[8px]">✦</span>
              <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#b88636]" />
            </div>

            {/* Tagline - Self-Highlighted */}
            <p className="font-cormorant italic text-xs sm:text-sm md:text-[15px] text-[#541c0f] font-bold tracking-wide [text-shadow:_0_1px_8px_rgba(255,248,225,0.95)]">
              &ldquo;Beautiful beginnings, cherished forever.&rdquo;
            </p>

            {/* Sub-text */}
            <p className="font-cormorant text-[11px] sm:text-xs text-[#6e3518] font-semibold tracking-wider mt-0.5 [text-shadow:_0_1px_6px_rgba(255,248,225,0.8)]">
              {footer.services || "Digital Wedding Invitations & Card Services"}
            </p>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN (Desktop): 5-STAR RATING                        */}
          {/* ============================================================ */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-end text-center lg:text-right order-3">
            <span className="font-cinzel text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] text-[#7a3410] uppercase [text-shadow:_0_1px_8px_rgba(255,248,225,0.9)]">
              {footer.ratingTitle || "A LITTLE LOVE FOR AHVAANAM"}
            </span>

            <div className="flex items-center justify-center lg:justify-end gap-1.5 py-0.5 mt-0.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating ?? rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      setRating(star);
                      setHasRated(true);
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="transition-transform duration-200 hover:scale-125 focus:outline-none cursor-pointer"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      size={18}
                      className={`transition-all duration-200 ${
                        active
                          ? "text-[#cca038] fill-[#eab308] stroke-[#b88636] drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]"
                          : "text-[#c2962b] fill-transparent stroke-[#b88636]"
                      }`}
                      strokeWidth={1.8}
                    />
                  </button>
                );
              })}
            </div>

            {hasRated && (
              <motion.p
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10.5px] font-cormorant italic text-[#8e2214] font-bold mt-0.5 [text-shadow:_0_1px_6px_rgba(255,248,225,0.9)]"
              >
                Thank you for sharing your love with Ahvaanam! ❤️
              </motion.p>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
};
