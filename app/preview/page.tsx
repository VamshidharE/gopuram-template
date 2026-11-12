"use client";

import React, { useState, useEffect } from "react";
import { GrandCoupleShowcase } from "@/components/sections/GrandCoupleShowcase";
import { WeddingCelebrationsSection } from "@/components/sections/WeddingCelebrations";
import { PreWeddingVideo } from "@/components/sections/PreWeddingVideo";
import { OurJourneyGallery } from "@/components/sections/OurJourneyGallery";
import { FamilyDetails } from "@/components/sections/FamilyDetails";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { AhvaanamFooter } from "@/components/sections/AhvaanamFooter";

export default function PreviewPage() {
  const [section, setSection] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("section") || "all";
    }
    return "all";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("section");
      if (s) setSection(s);
    }
  }, []);

  return (
    <main
      className="relative w-full min-h-screen bg-[#faedd4] py-8 overflow-x-hidden"
      style={{
        backgroundImage: "url('/decoration/invitation-background.png')",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
        backgroundSize: "100% auto",
      }}
    >
      {(section === "showcase" || section === "all") && <GrandCoupleShowcase />}
      {(section === "events" || section === "all") && <WeddingCelebrationsSection />}
      {(section === "video" || section === "all") && <PreWeddingVideo />}
      {(section === "gallery" || section === "all") && <OurJourneyGallery />}
      {(section === "family" || section === "all") && <FamilyDetails />}
      {(section === "rsvp" || section === "all") && <RsvpSection />}
      {(section === "footer" || section === "all") && <AhvaanamFooter />}
    </main>
  );
}
