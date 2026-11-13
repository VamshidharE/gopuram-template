/**
 * Unified Wedding Invitation Configuration
 * All editable content for Sections 2-7, separated from presentation.
 */

export interface WeddingEventData {
  id: string;
  name: string;
  navLabel: string;
  shortDate: string;
  tamilName?: string;
  subTitle?: string;
  illustration: string;
  iconFallback?: "ring" | "turmeric" | "music" | "sacred-fire" | "flower" | "sparkles";
  date: string;
  dayOfWeek?: string;
  startTime: string;
  endTime?: string;
  muhurthamTime?: string;
  venue: string;
  address?: string;
  mapQuery?: string;
  accentColor?: string;
}

export interface FamilySide {
  title: string;
  portrait: string;
  portraitAlt: string;
  relationLabel?: string;
  members: { role?: string; name: string }[];
  location?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  rotation?: number; // degrees
}

export interface VideoSectionConfig {
  heading: string;
  subheading: string;
  videoSrc: string;
  posterSrc: string;
  coupleCutoutSrc: string;
  coupleCutoutAlt: string;
}

export interface FooterConfig {
  quote?: string;
  designedBy?: string;
  services?: string;
  address?: string;
  phone?: string;
  ratingTitle?: string;
  brandName?: string;
  tagline?: string;
  craftedText?: string;
  closingMessage?: string;
  backgroundSrc?: string;
}

export interface WeddingConfig {
  events: WeddingEventData[];
  video: VideoSectionConfig;
  gallery: {
    heading: string;
    subheading: string;
    photos: GalleryPhoto[];
  };
  families: {
    heading: string;
    subheading: string;
    bride: FamilySide;
    groom: FamilySide;
  };
  rsvp: {
    heading: string;
    subheading: string;
    submitLabel: string;
  };
  footer: FooterConfig;
}

export const weddingConfig: WeddingConfig = {
  events: [
    {
      id: "nishchithartham",
      name: "Engagement",
      navLabel: "Engagement",
      shortDate: "Fri, Nov 27",
      tamilName: "நிச்சயதார்த்தம்",
      subTitle: "Traditional Engagement Ceremony",
      illustration: "/events/event-engagement-photo.jpg",
      iconFallback: "ring",
      date: "Friday, November 27, 2026",
      dayOfWeek: "Friday Evening",
      startTime: "06:00 PM",
      endTime: "09:30 PM",
      venue: "Sri Vijayalakshmi Kalyana Mandapam",
      address: "Grand Ballroom, Rajappa Nagar, Thanjavur",
      mapQuery: "Sri Vijayalakshmi Kalyana Mandapam, Rajappa Nagar, Thanjavur",
      accentColor: "#8e3622",
    },
    {
      id: "haldi",
      name: "Haldi",
      navLabel: "Haldi",
      shortDate: "Sat, Nov 28",
      tamilName: "மங்கள ஸ்நானம்",
      subTitle: "Auspicious Turmeric Cleansing Ritual",
      illustration: "/events/event-haldi-photo.jpg",
      iconFallback: "turmeric",
      date: "Saturday, November 28, 2026",
      dayOfWeek: "Saturday Morning",
      startTime: "08:30 AM",
      endTime: "11:30 AM",
      venue: "Royal Courtyard & Heritage Pavilion",
      address: "Chola Heritage Palace, Court Road, Thanjavur",
      mapQuery: "Chola Heritage Palace, Court Road, Thanjavur",
      accentColor: "#d97724",
    },
    {
      id: "sangeet",
      name: "Sangeet",
      navLabel: "Sangeet",
      shortDate: "Sat, Nov 28",
      tamilName: "சங்கீத மாலை",
      subTitle: "Musical Evening & Celebratory Banquet",
      illustration: "/events/event-sangeet-photo.jpg",
      iconFallback: "music",
      date: "Saturday, November 28, 2026",
      dayOfWeek: "Saturday Evening",
      startTime: "07:00 PM",
      endTime: "11:00 PM",
      venue: "The Grand Lotus Lawns",
      address: "Palace Gardens, Tanjore Expressway, Thanjavur",
      mapQuery: "The Grand Lotus Lawns, Palace Gardens, Thanjavur",
      accentColor: "#9c3f20",
    },
    {
      id: "wedding",
      name: "Wedding",
      navLabel: "Wedding",
      shortDate: "Sun, Nov 29",
      tamilName: "திருமங்கல தாரணம்",
      subTitle: "The Holy Vedic Wedding Ceremony",
      illustration: "/events/event-muhurtham-photo.jpg",
      iconFallback: "sacred-fire",
      date: "Sunday, November 29, 2026",
      dayOfWeek: "Sunday Morning",
      startTime: "08:15 AM",
      endTime: "12:30 PM",
      muhurthamTime: "Sumuhurtham: 09:15 AM - 09:45 AM (Dhanur Lagna)",
      venue: "Ananda Kalyana Mandapam",
      address: "Temple Sanctum Auditorium, South Rampart, Thanjavur",
      mapQuery: "Ananda Kalyana Mandapam, South Rampart, Thanjavur",
      accentColor: "#a3281d",
    },
  ],

  video: {
    heading: "A GLIMPSE OF US",
    subheading: "Our story, captured in beautiful moments.",
    videoSrc: "/video/pre-wedding.mp4",
    posterSrc: "/video/pre-wedding-poster.jpg",
    coupleCutoutSrc: "/Couple.png",
    coupleCutoutAlt: "Arjun & Meera",
  },

  gallery: {
    heading: "MOMENTS WE TREASURE",
    subheading: "Every picture tells a part of our story.",
    photos: [
      { id: "g1", src: "/gallery/photo-1.jpg", alt: "Together at the temple", rotation: -2 },
      { id: "g2", src: "/gallery/photo-2.jpg", alt: "First meeting", rotation: 1.5 },
      { id: "g3", src: "/gallery/photo-3.jpg", alt: "Sunset walk", rotation: -1 },
      { id: "g4", src: "/gallery/photo-4.jpg", alt: "Festival celebration", rotation: 2 },
      { id: "g5", src: "/gallery/photo-5.jpg", alt: "Garden moment", rotation: -1.5 },
    ],
  },

  families: {
    heading: "Our Families",
    subheading: "Two families united in tradition, blessings, and boundless love",
    bride: {
      title: "BRIDE'S FAMILY",
      portrait: "/family/bride-family.jpg",
      portraitAlt: "Bride's Family Portrait — Smt. Lakshmi Devi & Sri Ramesh Kumar",
      relationLabel: "Daughter of",
      members: [
        { name: "Smt. Lakshmi Devi" },
        { name: "Sri Ramesh Kumar" },
      ],
      location: "Thanjavur, Tamil Nadu",
    },
    groom: {
      title: "GROOM'S FAMILY",
      portrait: "/family/groom-family.jpg",
      portraitAlt: "Groom's Family Portrait — Smt. Padmaja & Sri Suresh Babu",
      relationLabel: "Son of",
      members: [
        { name: "Smt. Padmaja" },
        { name: "Sri Suresh Babu" },
      ],
      location: "Kumbakonam, Tamil Nadu",
    },
  },

  rsvp: {
    heading: "We would be delighted by your presence",
    subheading: "Your presence and heartfelt blessings are our greatest treasure as we begin this sacred union",
    submitLabel: "Confirm Your Presence",
  },

  footer: {
    quote: "“A beautiful beginning starts with a beautiful invitation.”",
    designedBy: "DESIGNED BY AHVAANAM",
    services: "Digital Wedding Invitations & Card Services",
    address: "Tirumala Printers, Metpally, Dist. Jagtial, Telangana",
    phone: "+91 8688178323",
    ratingTitle: "A LITTLE LOVE FOR AHVAANAM ✨",
  },
};
