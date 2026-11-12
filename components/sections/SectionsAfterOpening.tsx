"use client";

import React from "react";
import Image from "next/image";
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
 * Continuous Wedding Celebration visual foundation spanning:
 * Section 2: Wedding Celebrations
 * Section 3: Pre-Wedding Video
 * Section 4: Our Journey Gallery
 * Section 5: Family Details
 * Section 6: RSVP / Celebration Attendance & Countdown
 * Section 7: Ahvaanam Footer (Preserves scenic sunset temple lake background)
 */
export const SectionsAfterOpening: React.FC = () => {
  return (
    <div className="relative w-full z-20">
      {/* 
        CONTINUOUS WEDDING CELEBRATION FOUNDATION (Sections 2 to 6)
        Authentic Indian floral botanical parchment foundation across all sections.
      */}
      <div className="relative w-full overflow-hidden bg-[#faedd4]">
        {/* Continuous Wedding Celebration Background Image (No random mandalas or corner sketches) */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0"
          style={{
            backgroundImage: "url('/decoration/invitation-background.png')",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "top center",
            backgroundSize: "100% auto",
          }}
        />

        {/* Live Content of Sections (Transparent over continuous celebration foundation) */}
        <div className="relative z-10">
          <GrandCoupleShowcase />
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
