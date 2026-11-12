export interface InvitationConfig {
  // Visual Assets
  assets: {
    skyBackground: string;
    pelliPandiri: string;
    coupleCutout: string;
    coupleCutoutAlt: string;
    templeArch: string;
    pelliToranam: string;
    toranamCenterPendant?: string;
    toranamStringLeft?: string;
    toranamStringRight?: string;
    gopuramOverlay: string;
  };

  // Wedding & Couple Details
  details: {
    invocation: string;
    familyName: string;
    introductoryMessage: string;
    groomName: string;
    brideName: string;
    weddingDate: string;
    subDateText: string;
    muhurthamTime?: string;
    venueCity?: string;
    celebrationText?: string;
  };

  // Motion & Animation Configuration
  animation: {
    scrollTrackHeightVh: number;
    skyParallaxIntensity: number;
    titleFadeStart: number;
    titleFadeEnd: number;
    toranamLiftStart: number;
    toranamLiftEnd: number;
    toranamLiftDesktopPx: number;
    toranamLiftMobilePx: number;
    toranamSwayDuration: number;
    toranamSwayDegrees: number;
    coupleRevealStart: number;
    coupleRevealComplete: number;
    headerFadeStart: number;
    headerFadeEnd: number;
    gopuramTravelDesktopPx: number;
    gopuramTravelMobilePx: number;
  };

  // Responsive Layout & Positioning for Temple Entrance Architecture
  layout: {
    desktop: {
      pandiriWidthPercent: number;
      pandiriMaxWidthPx: number;
      pandiriHeightVh: number;
      archWidthPercent: number;
      archMaxWidthPx: number;
      archTopVh: number;
      archBottomOffsetPx: number;
      toranamWidthPercent: number;
      toranamMaxWidthPx: number;
      toranamTopPercent: number;
      coupleWidthPx: number;
      coupleBottomOffsetPercent: number;
      coupleHorizontalCenter: boolean;
      titleTopOffsetVh: number;
      titleMaxWidthPx: number;
      gopuramWidthPercent?: number;
      gopuramMaxWidthPx?: number;
      gopuramInitialTopVh?: number;
    };
    mobile: {
      pandiriWidthPercent: number;
      pandiriMaxWidthPx: number;
      pandiriHeightVh: number;
      archWidthPercent: number;
      archMaxWidthPx: number;
      archTopVh: number;
      archBottomOffsetPx: number;
      toranamWidthPercent: number;
      toranamMaxWidthPx: number;
      toranamTopPercent: number;
      coupleWidthPx: number;
      coupleBottomOffsetPercent: number;
      coupleHorizontalCenter: boolean;
      titleTopOffsetVh: number;
      titleMaxWidthPx: number;
      gopuramWidthPercent?: number;
      gopuramMaxWidthPx?: number;
      gopuramInitialTopVh?: number;
    };
  };

  // Dev & Testing Utilities
  dev: {
    showProgressHud: boolean;
  };
}

export const invitationConfig: InvitationConfig = {
  assets: {
    skyBackground: "/sky-background-v2.png",
    pelliPandiri: "/decoration/pelli-pandiri-sunset.png",
    templeArch: "/decoration/temple-entrance-arch-unified.png",
    pelliToranam: "/decoration/pelli-toranam.png",
    toranamCenterPendant: "/decoration/toranam-center-pendant.png",
    toranamStringLeft: "/decoration/toranam-string-left.png",
    toranamStringRight: "/decoration/toranam-string-right.png",
    coupleCutout: "/Couple.png",
    coupleCutoutAlt: "Arjun and Meera — Wedding Couple",
    gopuramOverlay: "/temple-gopuram-v2.png",
  },

  details: {
    invocation: "|| श्री गणेशाय नमः ||",
    familyName: "BIRUDURAJU'S FAMILY",
    introductoryMessage: "TOGETHER WITH THEIR FAMILIES",
    groomName: "Arjun",
    brideName: "Meera",
    weddingDate: "SUNDAY, NOVEMBER 29, 2026",
    subDateText: "Karthika Masam • Shukla Paksha",
    muhurthamTime: "AT 09:15 AM",
    venueCity: "Thanjavur, Tamil Nadu",
    celebrationText: "Standing blessed beneath the sacred Pelli Pandiri",
  },

  animation: {
    scrollTrackHeightVh: 195,
    skyParallaxIntensity: 0.12,
    titleFadeStart: 0.05,
    titleFadeEnd: 0.42,
    toranamLiftStart: 0.08,
    toranamLiftEnd: 0.85,
    toranamLiftDesktopPx: 45,
    toranamLiftMobilePx: 30,
    toranamSwayDuration: 4.0,
    toranamSwayDegrees: 1.8,
    coupleRevealStart: 0.08,
    coupleRevealComplete: 1.0,
    headerFadeStart: 0.02,
    headerFadeEnd: 0.16,
    gopuramTravelDesktopPx: 740,
    gopuramTravelMobilePx: 475,
  },

  layout: {
    desktop: {
      pandiriWidthPercent: 82,
      pandiriMaxWidthPx: 1200,
      pandiriHeightVh: 145,
      archWidthPercent: 54,
      archMaxWidthPx: 740,
      archTopVh: 2.0,
      archBottomOffsetPx: 0,
      toranamWidthPercent: 35,
      toranamMaxWidthPx: 460,
      toranamTopPercent: 14.0,
      coupleWidthPx: 380,
      coupleBottomOffsetPercent: 0,
      coupleHorizontalCenter: true,
      titleTopOffsetVh: 39,
      titleMaxWidthPx: 460,
      gopuramWidthPercent: 38,
      gopuramMaxWidthPx: 480,
      gopuramInitialTopVh: 20,
    },
    mobile: {
      pandiriWidthPercent: 100,
      pandiriMaxWidthPx: 520,
      pandiriHeightVh: 135,
      archWidthPercent: 86,
      archMaxWidthPx: 335,
      archTopVh: 0,
      archBottomOffsetPx: 0,
      toranamWidthPercent: 64,
      toranamMaxWidthPx: 220,
      toranamTopPercent: 16.5,
      coupleWidthPx: 200,
      coupleBottomOffsetPercent: 0,
      coupleHorizontalCenter: true,
      titleTopOffsetVh: 36,
      titleMaxWidthPx: 230,
      gopuramWidthPercent: 92,
      gopuramMaxWidthPx: 380,
      gopuramInitialTopVh: 26,
    },
  },

  dev: {
    showProgressHud: false,
  },
};
