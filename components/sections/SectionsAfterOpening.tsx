"use client";

import React from "react";
import { GrandCoupleShowcase } from "./GrandCoupleShowcase";
import { WeddingCelebrationsSection } from "./WeddingCelebrations";
import { PreWeddingVideo } from "./PreWeddingVideo";
import { OurJourneyGallery } from "./OurJourneyGallery";
import { FamilyDetails } from "./FamilyDetails";
import { RsvpSection } from "./RsvpSection";
import { AhvaanamFooter } from "./AhvaanamFooter";

/**
 * SectionsAfterOpening
 *
 * Renders all sections after the Gopuram opening scene (Section 1).
 *
 * Architecture:
 * 1. Grand Couple Showcase:
 *    Dedicated couple showcase portrait with its own architectural background.
 *
 * 2. Continuous Wedding Celebration Canvas (Sections 2 to 7):
 *    Single continuous, unified canvas spanning:
 *    - Section 2: Wedding Celebrations
 *    - Section 3: Pre-Wedding Video
 *    - Section 4: Our Journey Gallery
 *    - Section 5: Family Details
 *    - Section 6: RSVP & Wedding Countdown
 *    - Section 7: Ahvaanam Brand Footer
 *
 *    Uses user-provided seamless repeating temple pillar parchment background
 *    tiling seamlessly (repeat-y, 100% auto) so sections can be shuffled in Ahvaanam
 *    with 100% continuous visual consistency.
 */
export const SectionsAfterOpening: React.FC = () => {
  return (
    <div className="relative w-full z-20">
      {/* 
        1. GRAND COUPLE SHOWCASE (Section 1.5)
        Has its own dedicated couple showcase theme and background.
      */}
      <GrandCoupleShowcase />

      {/* 
        2. CONTINUOUS WEDDING CELEBRATION FOUNDATION (Sections 2 to 7)
        Single unified seamless background across all celebration sections.
      */}
      <div className="relative w-full overflow-hidden bg-[#faedd4]">
        {/* Continuous Seamless Repeating Temple Pillar & Parchment Background */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            backgroundImage: "url('/decoration/invitation-background.png')",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "top center",
            backgroundSize: "100% auto",
          }}
        />

        {/* Live Content of Sections (Transparent over continuous canvas) */}
        <div className="relative z-10">
          <WeddingCelebrationsSection />
          <PreWeddingVideo />
          <OurJourneyGallery />
          <FamilyDetails />
          <RsvpSection />
          <AhvaanamFooter />
        </div>
      </div>
    </div>
  );
};
